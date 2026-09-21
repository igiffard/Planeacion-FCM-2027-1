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
  const [busqueda, setBusqueda] = useState<string>('');

  const esAdmin = roleUsuario === 'admin';

  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);

  // Edificios únicos para filtro
  const edificiosDisponibles = useMemo(() => {
    const s = new Set<string>();
    espacios.forEach((e) => {
      if (e.edificio) s.add(e.edificio);
    });
    return Array.from(s);
  }, [espacios]);

  // Filtrado de espacios
  const espaciosFiltrados = useMemo(() => {
    return espacios.filter((e) => {
      if (filtroTipo !== 'todos' && e.tipo_espacio !== filtroTipo) return false;
      if (filtroEdificio !== 'todos' && e.edificio !== filtroEdificio) return false;
      if (busqueda.trim()) {
        const b = busqueda.toLowerCase();
        const coincide =
          e.nombre.toLowerCase().includes(b) ||
          e.codigo.toLowerCase().includes(b) ||
          e.edificio.toLowerCase().includes(b);
        if (!coincide) return false;
      }
      return true;
    });
  }, [espacios, filtroTipo, filtroEdificio, busqueda]);

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
              Supervisión de aulas, laboratorios y salones de posgrado para el periodo 2027-1
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Tipo de Espacio
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="todos">Todos los tipos</option>
              <option value="aula">Aulas de clase (S1-S8, etc.)</option>
              <option value="laboratorio">Laboratorios especializados</option>
              <option value="salon_posgrado">Salones de Posgrado (SP1, SP2)</option>
              <option value="aula_magna">Aulas Magnas (AM1, AM2)</option>
              <option value="taller">Talleres</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Edificio / Complejo
            </label>
            <select
              value={filtroEdificio}
              onChange={(e) => setFiltroEdificio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="todos">Todos los edificios</option>
              {edificiosDisponibles.map((ed) => (
                <option key={ed} value={ed}>
                  {ed}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Buscar</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Código o nombre de espacio..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 text-slate-800"
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
                <th className="p-3 font-semibold w-48 border-r border-slate-800 sticky left-0 bg-[#0c2d48] z-10">
                  Espacio / Capacidad
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
                  {/* Celda fija con nombre del espacio */}
                  <td className="p-3 font-medium bg-white border-r border-slate-200 sticky left-0 z-10 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{espacio.codigo}</span>
                        {/* Lápiz para editar el nombre de cada aula (solo administrador) */}
                        {esAdmin ? (
                          <button
                            onClick={() => onEditarEspacio && onEditarEspacio(espacio)}
                            className="p-1 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors"
                            title={`Editar nombre de aula: ${espacio.nombre} (Administrador)`}
                          >
                            <Pencil className="w-3.5 h-3.5 text-sky-600" />
                          </button>
                        ) : (
                          <span
                            className="p-1 text-slate-300 cursor-not-allowed inline-block"
                            title="Solo la administración puede editar el nombre de las aulas"
                          >
                            <Pencil className="w-3 h-3 opacity-30" />
                          </span>
                        )}
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-semibold border">
                        Cap: {espacio.capacidad_maxima}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700 font-medium truncate max-w-[160px] mt-0.5" title={espacio.nombre}>
                      {espacio.nombre}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {espacio.edificio}
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
                                <Move className="w-2.5 h-2.5 opacity-60 flex-shrink-0" />
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
