/**
 * Vista de Matriz de Espacios y Ocupación Horaria FCM / IIO
 */

import React, { useState, useMemo } from 'react';
import {
  Building2,
  Filter,
  CheckCircle2,
  Clock,
  Search,
  Layers,
  Sparkles,
  Info,
  Pencil,
  Plus,
  Move
} from 'lucide-react';
import { Espacio, Asignacion, Curso, Usuario, DiaSemana, RoleUsuario } from '../types';
import { hayTraslapeHorario } from '../utils/conflicts';

interface MatrizEspaciosViewProps {
  espacios: Espacio[];
  asignaciones: Asignacion[];
  cursos: Curso[];
  docentes: Usuario[];
  escenarioActivoId: string;
  roleUsuario?: RoleUsuario;
  onEditarEspacio?: (espacio: Espacio) => void;
  onAbrirCrearAula?: () => void;
  onMoverAsignacion?: (asignacion: Asignacion) => void;
}

const DIAS_SEMANA: { id: DiaSemana; nombre: string }[] = [
  { id: 'lunes', nombre: 'Lunes' },
  { id: 'martes', nombre: 'Martes' },
  { id: 'miercoles', nombre: 'Miércoles' },
  { id: 'jueves', nombre: 'Jueves' },
  { id: 'viernes', nombre: 'Viernes' },
  { id: 'sabado', nombre: 'Sábado' }
];

const BLOQUES_HORARIOS = [
  { inicio: '07:00', fin: '08:30', etiqueta: '07:00 - 08:30' },
  { inicio: '08:30', fin: '10:00', etiqueta: '08:30 - 10:00' },
  { inicio: '10:00', fin: '11:30', etiqueta: '10:00 - 11:30' },
  { inicio: '11:30', fin: '13:00', etiqueta: '11:30 - 13:00' },
  { inicio: '13:00', fin: '14:30', etiqueta: '13:00 - 14:30' },
  { inicio: '14:30', fin: '16:00', etiqueta: '14:30 - 16:00' },
  { inicio: '16:00', fin: '17:30', etiqueta: '16:00 - 17:30' },
  { inicio: '17:30', fin: '19:00', etiqueta: '17:30 - 19:00' },
  { inicio: '19:00', fin: '20:30', etiqueta: '19:00 - 20:30' }
];

export const MatrizEspaciosView: React.FC<MatrizEspaciosViewProps> = ({
  espacios,
  asignaciones,
  cursos,
  docentes,
  escenarioActivoId,
  roleUsuario,
  onEditarEspacio,
  onAbrirCrearAula,
  onMoverAsignacion
}) => {
  const [diaSeleccionado, setDiaSeleccionado] = useState<DiaSemana>('lunes');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroEdificio, setFiltroEdificio] = useState<string>('todos');
  const [filtroPlanta, setFiltroPlanta] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  const esAdmin = roleUsuario === 'admin';

  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);

  // Edificios oficiales con metadatos
  const CATALOGO_EDIFICIOS = useMemo(() => [
    { id: 'E-14', nombre: 'Edificio 14 · Dirección FCM / Cómputo / Posgrado' },
    { id: 'E-15', nombre: 'Edificio 15 · Biología Marina y Química' },
    { id: 'E-16', nombre: 'Edificio 16 · Física y Oceanografía' },
    { id: 'E-17', nombre: 'Edificio 17 · Aulas Teóricas S8, AM1, AM2 y Biología' },
    { id: 'E-18', nombre: 'Edificio 18 · Pabellón de Docencia S1-S7 y Talleres' },
    { id: 'E-20', nombre: 'Edificio 20 · Moluscos y Totoaba' },
    { id: 'E-21', nombre: 'Edificio 21 · Geomática, Topografía y Especialidad' },
    { id: 'E-25', nombre: 'Edificio 25 · Inst. Investigaciones Oceanológicas (IIO)' },
    { id: 'E-41', nombre: 'Edificio 41 · Acuacultura y Fisiología' },
    { id: 'E-56', nombre: 'Edificio 56 · Pabellón Totoaba y Peces' },
    { id: 'E-13', nombre: 'Edificio 13 · Almacén General y Buceo' },
    { id: 'GEN', nombre: 'Instalaciones Generales (Gimnasio, Cafetería, SMU)' },
    { id: 'VIR', nombre: 'Modalidad Virtual (VIR)' }
  ], []);

  // Filtrado de espacios
  const espaciosFiltrados = useMemo(() => {
    return espacios.filter((e) => {
      if (filtroTipo !== 'todos' && e.tipo_espacio !== filtroTipo) return false;
      if (filtroEdificio !== 'todos') {
        const ed = e.edificio_codigo || '';
        const edNom = e.edificio || '';
        if (filtroEdificio === 'GEN') {
          if (ed !== 'Gimnasio' && ed !== 'Cafetería' && ed !== 'Sala de usos múltiples' && ed !== 'GEN') return false;
        } else if (filtroEdificio === 'VIR') {
          if (ed !== 'VIR' && !e.es_modalidad_virtual) return false;
        } else if (ed !== filtroEdificio && !edNom.includes(filtroEdificio)) {
          return false;
        }
      }
      if (filtroPlanta !== 'todos' && e.planta !== filtroPlanta) return false;
      if (busqueda.trim()) {
        const b = busqueda.toLowerCase();
        const coincide =
          e.nombre.toLowerCase().includes(b) ||
          e.codigo.toLowerCase().includes(b) ||
          (e.edificio && e.edificio.toLowerCase().includes(b)) ||
          (e.edificio_codigo && e.edificio_codigo.toLowerCase().includes(b)) ||
          (e.planta && e.planta.toLowerCase().includes(b));
        if (!coincide) return false;
      }
      return true;
    });
  }, [espacios, filtroTipo, filtroEdificio, filtroPlanta, busqueda]);

  // Asignaciones del escenario y día activo
  const asignacionesDia = useMemo(() => {
    return asignaciones.filter(
      (a) =>
        a.escenario_id === escenarioActivoId &&
        a.dia === diaSeleccionado &&
        a.estatus !== 'cancelado'
    );
  }, [asignaciones, escenarioActivoId, diaSeleccionado]);

  return (
    <div className="space-y-5">
      {/* Barra de Filtros y Día */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-[#0c2d48] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0369a1]" />
                <span>Matriz de Ocupación de Espacios FCM / IIO</span>
              </h2>
              {esAdmin && onAbrirCrearAula && (
                <button
                  onClick={onAbrirCrearAula}
                  className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-md transition shadow-2xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Nueva Aula</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Supervisión de aulas, laboratorios y salones de posgrado para el periodo 2027-1 · {espaciosFiltrados.length} espacios visibles
            </p>
          </div>

          {/* Selector de Días en Pestañas */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {DIAS_SEMANA.map((dia) => (
              <button
                key={dia.id}
                onClick={() => setDiaSeleccionado(dia.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                  diaSeleccionado === dia.id
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {dia.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros secundarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Edificio Oficial FCM / IIO
            </label>
            <select
              value={filtroEdificio}
              onChange={(e) => setFiltroEdificio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500 font-medium"
            >
              <option value="todos">Todos los edificios (Campus FCM / IIO)</option>
              {CATALOGO_EDIFICIOS.map((ed) => (
                <option key={ed.id} value={ed.id}>
                  {ed.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Planta / Nivel
            </label>
            <select
              value={filtroPlanta}
              onChange={(e) => setFiltroPlanta(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value="todos">Todas las plantas</option>
              <option value="Planta Baja">Planta Baja</option>
              <option value="Planta Alta">Planta Alta</option>
              <option value="Parte Posterior">Parte Posterior</option>
              <option value="General">General / Exterior</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Tipo de Espacio
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value="todos">Todos los tipos</option>
              <option value="aula">Aulas teóricas (S1-S8, TOA, TOB, etc.)</option>
              <option value="laboratorio">Laboratorios especializados</option>
              <option value="aula_computo">Centros de Cómputo (CPB, CCL, SPD, GEO)</option>
              <option value="audiovisual">Auditorios y Audiovisuales (AM1, AM2, SC, AVI)</option>
              <option value="taller">Talleres y Prácticas</option>
              <option value="virtual">Modalidad Virtual</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Buscar Aula</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Código, nombre o edificio..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Matriz Cuadricular: Espacios vs Bloques Horarios */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#0c2d48] text-white">
                <th className="p-3 font-semibold w-56 border-r border-slate-800 sticky left-0 bg-[#0c2d48] z-10">
                  Espacio / Ubicación / Cap.
                </th>
                {BLOQUES_HORARIOS.map((bloque) => (
                  <th key={bloque.etiqueta} className="p-2.5 font-semibold text-center border-r border-slate-800 min-w-[120px]">
                    <div className="text-[11px]">{bloque.inicio}</div>
                    <div className="text-[10px] text-sky-200 font-normal">{bloque.fin}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {espaciosFiltrados.map((espacio) => (
                <tr key={espacio.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Celda fija con nombre del espacio y datos de arquitectura */}
                  <td className="p-3 font-medium bg-white border-r border-slate-200 sticky left-0 z-10 shadow-xs">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-xs border border-slate-200">
                          {espacio.codigo}
                        </span>
                        {espacio.edificio_codigo && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-100 text-sky-800">
                            {espacio.edificio_codigo}
                          </span>
                        )}
                        {espacio.planta && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {espacio.planta === 'Planta Baja' ? 'PB' : espacio.planta === 'Planta Alta' ? 'PA' : espacio.planta}
                          </span>
                        )}
                        {esAdmin && (
                          <button
                            onClick={() => onEditarEspacio && onEditarEspacio(espacio)}
                            className="p-0.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors"
                            title={`Editar nombre de aula: ${espacio.nombre}`}
                          >
                            <Pencil className="w-3 h-3 text-sky-600" />
                          </button>
                        )}
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-semibold border shrink-0">
                        Cap: {espacio.capacidad_maxima}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-800 font-semibold truncate max-w-[200px]" title={espacio.nombre}>
                      {espacio.nombre}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate" title={espacio.ubicacion || espacio.edificio}>
                      {espacio.ubicacion || espacio.edificio}
                    </div>
                  </td>

                  {/* Celdas de cada franja horaria */}
                  {BLOQUES_HORARIOS.map((bloque) => {
                    // Encontrar si hay sesión asignada que se traslape con este bloque
                    const sesion = asignacionesDia.find(
                      (a) =>
                        a.espacio_id === espacio.id &&
                        hayTraslapeHorario(bloque.inicio, bloque.fin, a.hora_inicio, a.hora_fin)
                    );

                    if (sesion) {
                      const curso = cursosMap.get(sesion.curso_id);
                      const docenteNom = sesion.profesores_ids
                        .map((id) => docentesMap.get(id)?.nombre.split(' ')[0] || id)
                        .join(', ');

                      const esPos = sesion.nivel_educativo === 'posgrado';

                      return (
                        <td
                          key={bloque.etiqueta}
                          className="p-1 border-r border-slate-200 text-center align-top bg-opacity-30"
                        >
                          <div
                            onClick={() => onMoverAsignacion && onMoverAsignacion(sesion)}
                            className={`h-full p-1.5 rounded text-[10px] border shadow-2xs text-left leading-tight transition-all ${
                              onMoverAsignacion ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : ''
                            } ${
                              esPos
                                ? 'bg-emerald-100/90 border-emerald-300 text-emerald-950'
                                : 'bg-sky-100/90 border-sky-300 text-sky-950'
                            }`}
                            title={`${curso?.nombre} (${sesion.hora_inicio}-${sesion.hora_fin}) · Clic para mover en tiempo o aula`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold truncate">{curso?.codigo || 'Curso'}</span>
                              {onMoverAsignacion && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onMoverAsignacion(sesion);
                                  }}
                                  className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#0c2d48] text-white hover:bg-sky-700 shadow-2xs transition shrink-0"
                                  title="Mover aula u horario"
                                >
                                  <Move className="w-2 h-2" />
                                  <span>Mover</span>
                                </button>
                              )}
                            </div>
                            <div className="truncate text-[9px] text-slate-700">{docenteNom}</div>
                            <div className="text-[9px] font-semibold text-slate-600">
                              {sesion.hora_inicio}-{sesion.hora_fin}
                            </div>
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={bloque.etiqueta}
                        className="p-1 border-r border-slate-100 text-center align-middle"
                      >
                        <span className="text-[10px] text-slate-300 font-mono">libre</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
