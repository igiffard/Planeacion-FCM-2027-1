/**
 * Vista de Planificación de Cursos, Grupos, Subgrupos y Horarios FCM 2027-1
 */

import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Plus,
  Filter,
  Search,
  Users,
  Building2,
  Clock,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  Sparkles,
  Info,
  ChevronDown,
  BookOpen,
  Move
} from 'lucide-react';
import {
  Asignacion,
  Curso,
  Espacio,
  Grupo,
  ComponenteGrupo,
  Subgrupo,
  Usuario,
  ProgramaEducativo,
  Escenario,
  DiaSemana,
  NivelEducativo,
  PreferenciaDocente,
  RoleUsuario
} from '../types';
import { validarAsignacion, sugerirEspaciosCompatibles } from '../utils/conflicts';

interface PlanificacionViewProps {
  asignaciones: Asignacion[];
  cursos: Curso[];
  espacios: Espacio[];
  grupos: Grupo[];
  componentes: ComponenteGrupo[];
  subgrupos: Subgrupo[];
  docentes: Usuario[];
  programas: ProgramaEducativo[];
  escenarioActivoId: string;
  periodoActivoId: string;
  preferenciasDocentes: PreferenciaDocente[];
  roleUsuario?: RoleUsuario;
  onGuardarAsignacion: (asignacion: Asignacion) => Promise<void>;
  onEliminarAsignacion: (asignacionId: string) => Promise<void>;
  onMoverAsignacion?: (asignacion: Asignacion) => void;
  onCrearSubgruposAutomaticos?: (grupoId: string, cupoTotal: number, capacidadSubgrupo: number) => Promise<void>;
  esModalNuevaAbierto?: boolean;
  onCerrarModalNueva?: () => void;
  onAbrirNuevaAsignaturaConHorario?: () => void;
  onAbrirCrearAula?: () => void;
}

const DIAS_SEMANA: { id: DiaSemana; nombre: string }[] = [
  { id: 'lunes', nombre: 'Lunes' },
  { id: 'martes', nombre: 'Martes' },
  { id: 'miercoles', nombre: 'Miércoles' },
  { id: 'jueves', nombre: 'Jueves' },
  { id: 'viernes', nombre: 'Viernes' },
  { id: 'sabado', nombre: 'Sábado' }
];

const HORAS_DIA = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export const PlanificacionView: React.FC<PlanificacionViewProps> = ({
  asignaciones,
  cursos,
  espacios,
  grupos,
  componentes,
  subgrupos,
  docentes,
  programas,
  escenarioActivoId,
  periodoActivoId,
  preferenciasDocentes,
  roleUsuario,
  onGuardarAsignacion,
  onEliminarAsignacion,
  onMoverAsignacion,
  esModalNuevaAbierto = false,
  onCerrarModalNueva,
  onAbrirNuevaAsignaturaConHorario,
  onAbrirCrearAula
}) => {
  // Filtros
  const [filtroNivel, setFiltroNivel] = useState<string>('todos');
  const [filtroPrograma, setFiltroPrograma] = useState<string>('todos');
  const [filtroEspacio, setFiltroEspacio] = useState<string>('todos');
  const [filtroDocente, setFiltroDocente] = useState<string>('todos');
  const [busquedaTexto, setBusquedaTexto] = useState<string>('');

  // Modales
  const [modalAbierto, setModalAbierto] = useState<boolean>(esModalNuevaAbierto);
  const [asignacionEnEdicion, setAsignacionEnEdicion] = useState<Asignacion | null>(null);
  const [asignacionDetalle, setAsignacionDetalle] = useState<Asignacion | null>(null);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [errorGuardado, setErrorGuardado] = useState<string | null>(null);

  // Estado del Formulario
  const [formCursoId, setFormCursoId] = useState<string>('');
  const [formGrupoId, setFormGrupoId] = useState<string>('');
  const [formComponenteId, setFormComponenteId] = useState<string>('');
  const [formSubgrupoId, setFormSubgrupoId] = useState<string>('');
  const [formNivelProg, setFormNivelProg] = useState<'grupo_principal' | 'subgrupo'>('grupo_principal');
  const [formDia, setFormDia] = useState<DiaSemana>('lunes');
  const [formHoraInicio, setFormHoraInicio] = useState<string>('08:00');
  const [formHoraFin, setFormHoraFin] = useState<string>('10:00');
  const [formEspacioId, setFormEspacioId] = useState<string>('');
  const [formDocenteId, setFormDocenteId] = useState<string>('');
  const [formAlumnos, setFormAlumnos] = useState<number>(30);
  const [formTipoSesion, setFormTipoSesion] = useState<string>('Teoría');

  // Mapas rápidos
  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);
  const espaciosMap = useMemo(() => new Map(espacios.map((e) => [e.id, e])), [espacios]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);
  const gruposMap = useMemo(() => new Map(grupos.map((g) => [g.id, g])), [grupos]);
  const programasMap = useMemo(() => new Map(programas.map((p) => [p.id, p])), [programas]);

  // Asignaciones filtradas por escenario activo y criterios de UI
  const asignacionesFiltradas = useMemo(() => {
    return asignaciones.filter((asig) => {
      if (asig.escenario_id !== escenarioActivoId) return false;
      if (filtroNivel !== 'todos' && asig.nivel_educativo !== filtroNivel) return false;
      if (filtroPrograma !== 'todos' && !asig.programas_ids?.includes(filtroPrograma)) return false;
      if (filtroEspacio !== 'todos' && asig.espacio_id !== filtroEspacio) return false;
      if (filtroDocente !== 'todos' && !asig.profesores_ids?.includes(filtroDocente)) return false;

      if (busquedaTexto.trim()) {
        const busq = busquedaTexto.toLowerCase();
        const curso = cursosMap.get(asig.curso_id);
        const espacio = espaciosMap.get(asig.espacio_id);
        const docNombres = asig.profesores_ids
          .map((id) => docentesMap.get(id)?.nombre.toLowerCase() || '')
          .join(' ');

        const coincide =
          curso?.nombre.toLowerCase().includes(busq) ||
          curso?.codigo.toLowerCase().includes(busq) ||
          espacio?.nombre.toLowerCase().includes(busq) ||
          espacio?.codigo.toLowerCase().includes(busq) ||
          docNombres.includes(busq) ||
          asig.grupo_principal_id.toLowerCase().includes(busq);

        if (!coincide) return false;
      }

      return true;
    });
  }, [
    asignaciones,
    escenarioActivoId,
    filtroNivel,
    filtroPrograma,
    filtroEspacio,
    filtroDocente,
    busquedaTexto,
    cursosMap,
    espaciosMap,
    docentesMap
  ]);

  // Validación en tiempo real dentro del formulario
  const validacionFormulario = useMemo(() => {
    if (!formEspacioId || !formHoraInicio || !formHoraFin || !formDia) {
      return { esValido: false, bloqueante: false, conflictos: [], erroresCriticos: [], advertencias: [] };
    }

    const profesoresIds = formDocenteId ? [formDocenteId] : [];
    const asignacionPropuesta: Partial<Asignacion> = {
      id: asignacionEnEdicion?.id || 'temp_eval',
      periodo_id: periodoActivoId,
      escenario_id: escenarioActivoId,
      espacio_id: formEspacioId,
      dia: formDia,
      hora_inicio: formHoraInicio,
      hora_fin: formHoraFin,
      profesores_ids: profesoresIds,
      alumnos_programados: formAlumnos
    };

    return validarAsignacion(asignacionPropuesta, asignaciones, espaciosMap, preferenciasDocentes);
  }, [
    formEspacioId,
    formHoraInicio,
    formHoraFin,
    formDia,
    formDocenteId,
    formAlumnos,
    asignacionEnEdicion,
    periodoActivoId,
    escenarioActivoId,
    asignaciones,
    espaciosMap,
    preferenciasDocentes
  ]);

  // Espacios sugeridos para el horario seleccionado
  const espaciosSugeridos = useMemo(() => {
    const curso = cursosMap.get(formCursoId);
    const tipoEspReq = curso?.tipo_actividad === 'laboratorio' ? 'laboratorio' : 'aula';
    return sugerirEspaciosCompatibles(
      tipoEspReq,
      formAlumnos,
      formDia,
      formHoraInicio,
      formHoraFin,
      periodoActivoId,
      escenarioActivoId,
      espacios,
      asignaciones
    );
  }, [
    formCursoId,
    cursosMap,
    formAlumnos,
    formDia,
    formHoraInicio,
    formHoraFin,
    periodoActivoId,
    escenarioActivoId,
    espacios,
    asignaciones
  ]);

  // Abrir modal de nueva asignación
  const abrirNueva = () => {
    setAsignacionEnEdicion(null);
    setErrorGuardado(null);
    const primerCurso = cursos[0];
    setFormCursoId(primerCurso?.id || '');
    setFormGrupoId(grupos[0]?.id || '');
    setFormNivelProg('grupo_principal');
    setFormSubgrupoId('');
    setFormDia('lunes');
    setFormHoraInicio('08:00');
    setFormHoraFin('10:00');
    setFormEspacioId(espacios[0]?.id || '');
    setFormDocenteId(docentes[0]?.uid || '');
    setFormAlumnos(30);
    setFormTipoSesion('Teoría');
    setModalAbierto(true);
  };

  // Abrir modal para editar asignación
  const abrirEdicion = (asig: Asignacion) => {
    setAsignacionEnEdicion(asig);
    setErrorGuardado(null);
    setFormCursoId(asig.curso_id);
    setFormGrupoId(asig.grupo_principal_id);
    setFormNivelProg(asig.nivel_programacion);
    setFormSubgrupoId(asig.subgrupo_id || '');
    setFormDia(asig.dia);
    setFormHoraInicio(asig.hora_inicio);
    setFormHoraFin(asig.hora_fin);
    setFormEspacioId(asig.espacio_id);
    setFormDocenteId(asig.profesores_ids[0] || '');
    setFormAlumnos(asig.alumnos_programados);
    setFormTipoSesion(asig.tipo_sesion || 'Teoría');
    setAsignacionDetalle(null);
    setModalAbierto(true);
  };

  // Guardar asignación
  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validacionFormulario.bloqueante) {
      setErrorGuardado(validacionFormulario.erroresCriticos[0] || 'Existe un conflicto bloqueante');
      return;
    }

    const curso = cursosMap.get(formCursoId);
    const espacio = espaciosMap.get(formEspacioId);
    if (!curso || !espacio) return;

    setGuardando(true);
    setErrorGuardado(null);

    const asigId = asignacionEnEdicion?.id || `asig_${Date.now()}`;
    const profesoresIds = formDocenteId ? [formDocenteId] : [];

    const nuevaAsig: Asignacion = {
      id: asigId,
      periodo_id: periodoActivoId,
      escenario_id: escenarioActivoId,
      curso_id: formCursoId,
      grupo_principal_id: formGrupoId,
      componente_grupo_id: formComponenteId || `comp_${asigId}`,
      subgrupo_id: formNivelProg === 'subgrupo' ? formSubgrupoId : undefined,
      nivel_programacion: formNivelProg,
      profesores_ids: profesoresIds,
      profesor_principal_id: formDocenteId,
      programas_ids: curso.programas_ids,
      nivel_educativo: curso.nivel_educativo,
      espacio_id: formEspacioId,
      espacio_codigo_snapshot: espacio.codigo,
      espacio_nombre_snapshot: espacio.nombre,
      dia: formDia,
      hora_inicio: formHoraInicio,
      hora_fin: formHoraFin,
      tipo_componente: curso.tipo_actividad,
      tipo_sesion: formTipoSesion,
      alumnos_programados: formAlumnos,
      capacidad_espacio: espacio.capacidad_maxima,
      estatus: 'confirmado',
      conflictos_detectados: validacionFormulario.conflictos,
      createdAt: asignacionEnEdicion?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await onGuardarAsignacion(nuevaAsig);
      setModalAbierto(false);
      if (onCerrarModalNueva) onCerrarModalNueva();
    } catch (err: any) {
      console.error(err);
      setErrorGuardado(err.message || 'Error al guardar asignación');
    } finally {
      setGuardando(false);
    }
  };

  // Eliminar asignación
  const handleEliminar = async (id: string) => {
    if (!window.confirm('¿Desea eliminar esta sesión del horario?')) return;
    try {
      await onEliminarAsignacion(id);
      setAsignacionDetalle(null);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    }
  };

  return (
    <div className="space-y-5">
      {/* Barra superior de herramientas y filtros */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#0c2d48] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0369a1]" />
              <span>Horario Semanal Unificado 2027-1</span>
            </h2>
            <p className="text-xs text-slate-500">
              {asignacionesFiltradas.length} sesiones programadas en el escenario seleccionado
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-2">
            {onAbrirNuevaAsignaturaConHorario && (
              <button
                id="btn-nueva-asignatura-horario"
                onClick={onAbrirNuevaAsignaturaConHorario}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0c2d48] hover:bg-[#164268] text-white text-xs font-bold rounded-md shadow-2xs transition-colors"
                title="Introducir una asignatura nueva con sus horarios asignados"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>+ Asignatura con Horario</span>
              </button>
            )}

            {roleUsuario === 'admin' && onAbrirCrearAula && (
              <button
                id="btn-crear-aula-planif"
                onClick={onAbrirCrearAula}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-md shadow-2xs transition-colors"
                title="Crear nueva aula o laboratorio en el catálogo (Administrador)"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>+ Nueva Aula</span>
              </button>
            )}

            <button
              id="btn-nueva-asignacion"
              onClick={abrirNueva}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0369a1] hover:bg-[#075985] text-white text-xs font-bold rounded-md shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Sesión</span>
            </button>
          </div>
        </div>

        {/* Fila de Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {/* Nivel */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Nivel Educativo</label>
            <select
              id="filtro-nivel"
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value="todos">Todos los niveles</option>
              <option value="licenciatura">Licenciatura</option>
              <option value="posgrado">Posgrado</option>
            </select>
          </div>

          {/* Programa */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Programa Educativo</label>
            <select
              id="filtro-programa"
              value={filtroPrograma}
              onChange={(e) => setFiltroPrograma(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value="todos">Todos los programas</option>
              {programas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Espacio */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Espacio / Aula / Lab.</label>
            <select
              id="filtro-espacio"
              value={filtroEspacio}
              onChange={(e) => setFiltroEspacio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value="todos">Todos los espacios</option>
              {espacios.map((esp) => (
                <option key={esp.id} value={esp.id}>
                  {esp.codigo} - {esp.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Docente */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Docente</label>
            <select
              id="filtro-docente"
              value={filtroDocente}
              onChange={(e) => setFiltroDocente(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value="todos">Todos los docentes</option>
              {docentes.map((d) => (
                <option key={d.uid} value={d.uid}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Búsqueda de texto */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Buscar</label>
            <div className="relative">
              <input
                id="input-busqueda-horario"
                type="text"
                placeholder="Materia, código, etc..."
                value={busquedaTexto}
                onChange={(e) => setBusquedaTexto(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-sky-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Cuadrícula Interactiva Semanal */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Cabecera de Días */}
            <div className="grid grid-cols-6 bg-[#0c2d48] text-white text-xs font-bold py-2.5 border-b border-white/10">
              {DIAS_SEMANA.map((dia) => (
                <div key={dia.id} className="text-center">
                  <span className="uppercase tracking-wider">{dia.nombre}</span>
                </div>
              ))}
            </div>

            {/* Columnas por día con las sesiones programadas */}
            <div className="grid grid-cols-6 divide-x divide-slate-200 min-h-[500px] bg-slate-50/50 p-2 gap-2">
              {DIAS_SEMANA.map((dia) => {
                const asignacionesDia = asignacionesFiltradas
                  .filter((a) => a.dia === dia.id)
                  .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio));

                return (
                  <div key={dia.id} className="space-y-2">
                    {asignacionesDia.length === 0 ? (
                      <div className="h-32 flex items-center justify-center text-[11px] text-slate-400 italic">
                        Sin sesiones
                      </div>
                    ) : (
                      asignacionesDia.map((asig) => {
                        const curso = cursosMap.get(asig.curso_id);
                        const espacio = espaciosMap.get(asig.espacio_id);
                        const nombresDocentes = asig.profesores_ids
                          .map((id) => docentesMap.get(id)?.nombre || id)
                          .join(', ');

                        const esPosgrado = asig.nivel_educativo === 'posgrado';

                        return (
                          <div
                            key={asig.id}
                            onClick={() => setAsignacionDetalle(asig)}
                            className={`p-2.5 rounded-lg border shadow-xs cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md ${
                              esPosgrado
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:border-emerald-500'
                                : 'bg-sky-50 border-sky-300 text-sky-950 hover:border-sky-500'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-500" />
                                {asig.hora_inicio} - {asig.hora_fin}
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                                  esPosgrado
                                    ? 'bg-emerald-200 text-emerald-900'
                                    : 'bg-sky-200 text-sky-900'
                                }`}
                              >
                                {esPosgrado ? 'Posgrado' : 'Licenciatura'}
                              </span>
                            </div>

                            <div className="font-bold text-xs leading-tight mb-1 truncate" title={curso?.nombre}>
                              {curso?.codigo} · {curso?.nombre}
                            </div>

                            <div className="text-[11px] font-semibold text-slate-700 flex items-center justify-between mb-1">
                              <span className="flex items-center gap-1 truncate">
                                <Building2 className="w-3 h-3 text-slate-500 flex-shrink-0" />
                                {espacio?.codigo || asig.espacio_codigo_snapshot} ({espacio?.nombre || asig.espacio_nombre_snapshot})
                              </span>
                              <span className="text-[10px] text-slate-500 font-normal">
                                {asig.alumnos_programados}/{asig.capacidad_espacio}
                              </span>
                            </div>

                            <div className="text-[10px] text-slate-600 truncate flex items-center gap-1">
                              <Users className="w-3 h-3 text-slate-400 flex-shrink-0" />
                              <span className="truncate">{nombresDocentes || 'Sin docente asignado'}</span>
                            </div>

                            {asig.subgrupo_id && (
                              <div className="mt-1.5 inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                                Subgrupo: {asig.subgrupo_id}
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/60">
                              <span className="text-[10px] text-slate-500 font-medium truncate">
                                {asig.modalidad || 'Presencial'}
                              </span>
                              {onMoverAsignacion && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onMoverAsignacion(asig);
                                  }}
                                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0c2d48] text-white hover:bg-sky-700 shadow-2xs transition-colors"
                                  title="Mover aula o horario"
                                >
                                  <Move className="w-2.5 h-2.5" />
                                  <span>Mover</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETALLE DE ASIGNACIÓN */}
      {asignacionDetalle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                  Detalle de Asignación FCM 2027-1
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {cursosMap.get(asignacionDetalle.curso_id)?.nombre}
                </h3>
              </div>
              <button
                onClick={() => setAsignacionDetalle(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Clave y Código:</span>
                <span className="font-bold text-slate-800">
                  {cursosMap.get(asignacionDetalle.curso_id)?.codigo}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Nivel y Tipo:</span>
                <span className="font-bold text-slate-800 uppercase">
                  {asignacionDetalle.nivel_educativo} · {asignacionDetalle.tipo_componente}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Horario y Día:</span>
                <span className="font-bold text-slate-800 capitalize">
                  {asignacionDetalle.dia}, {asignacionDetalle.hora_inicio} - {asignacionDetalle.hora_fin}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Espacio Asignado:</span>
                <span className="font-bold text-slate-800">
                  {asignacionDetalle.espacio_codigo_snapshot} · {asignacionDetalle.espacio_nombre_snapshot}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 col-span-2">
                <span className="text-slate-400 block font-medium">Profesor(es) Responsables:</span>
                <span className="font-bold text-slate-800">
                  {asignacionDetalle.profesores_ids
                    .map((id) => docentesMap.get(id)?.nombre || id)
                    .join(', ')}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Alumnos / Capacidad:</span>
                <span className="font-bold text-slate-800">
                  {asignacionDetalle.alumnos_programados} alumnos (Capacidad: {asignacionDetalle.capacidad_espacio})
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block font-medium">Grupo / Subgrupo:</span>
                <span className="font-bold text-slate-800">
                  {asignacionDetalle.subgrupo_id ? `Subgrupo ${asignacionDetalle.subgrupo_id}` : asignacionDetalle.grupo_principal_id}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <button
                onClick={() => handleEliminar(asignacionDetalle.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar Sesión</span>
              </button>

              <div className="flex items-center gap-2">
                {onMoverAsignacion && (
                  <button
                    onClick={() => {
                      const asig = asignacionDetalle;
                      setAsignacionDetalle(null);
                      onMoverAsignacion(asig);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-lg shadow-xs transition"
                  >
                    <Move className="w-4 h-4" />
                    <span>Mover en Tiempo y Espacio</span>
                  </button>
                )}
                <button
                  onClick={() => abrirEdicion(asignacionDetalle)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4 text-sky-600" />
                  <span>Editar Completo</span>
                </button>
                <button
                  onClick={() => setAsignacionDetalle(null)}
                  className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-900 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORMULARIO: CREAR O EDITAR ASIGNACIÓN CON DETECCIÓN Y BLOQUEO DE TRASLAPES */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {asignacionEnEdicion ? 'Modificar Asignación Horaria' : 'Programar Nueva Asignación FCM'}
                </h3>
                <p className="text-xs text-slate-500">
                  Periodo 2027-1 · Validación automática de exclusividad de aula y docente
                </p>
              </div>
              <button
                onClick={() => {
                  setModalAbierto(false);
                  if (onCerrarModalNueva) onCerrarModalNueva();
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardar} className="space-y-4 text-xs">
              {/* Selección de Curso */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-slate-700">
                    Curso / Asignatura FCM (Licenciatura o Posgrado) *
                  </label>
                  {onAbrirNuevaAsignaturaConHorario && (
                    <button
                      type="button"
                      onClick={() => {
                        setModalAbierto(false);
                        if (onCerrarModalNueva) onCerrarModalNueva();
                        onAbrirNuevaAsignaturaConHorario();
                      }}
                      className="text-[11px] text-sky-700 hover:text-sky-900 font-bold underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Introducir Asignatura Nueva</span>
                    </button>
                  )}
                </div>
                <select
                  id="form-curso"
                  value={formCursoId}
                  onChange={(e) => {
                    setFormCursoId(e.target.value);
                    const sel = cursosMap.get(e.target.value);
                    if (sel) {
                      setFormAlumnos(sel.cupo_estimado || 30);
                      setFormTipoSesion(sel.tipo_actividad === 'laboratorio' ? 'Laboratorio' : 'Teoría');
                    }
                  }}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                >
                  <option value="">Seleccione una materia...</option>
                  {cursos.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.nivel_educativo.toUpperCase()}] {c.codigo} - {c.nombre} ({c.programas_ids.join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Fila: Grupo, División de Subgrupos y Alumnos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grupo Base *</label>
                  <select
                    id="form-grupo"
                    value={formGrupoId}
                    onChange={(e) => setFormGrupoId(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                  >
                    {grupos.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.nombre_visible || g.clave_grupo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nivel Programación</label>
                  <select
                    id="form-nivel-prog"
                    value={formNivelProg}
                    onChange={(e) => setFormNivelProg(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="grupo_principal">Grupo Completo (Teoría)</option>
                    <option value="subgrupo">Subgrupo (Laboratorio / Taller)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estudiantes Programados</label>
                  <input
                    id="form-alumnos"
                    type="number"
                    min="1"
                    max="100"
                    value={formAlumnos}
                    onChange={(e) => setFormAlumnos(parseInt(e.target.value, 10) || 1)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Subgrupo selector si aplica */}
              {formNivelProg === 'subgrupo' && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <label className="block font-semibold text-amber-900 mb-1">
                    Identificador de Subgrupo (ej. 111-1, 111-2, 211-1)
                  </label>
                  <input
                    id="form-subgrupo-id"
                    type="text"
                    placeholder="Ej. Subgrupo 1, Lab-1, 111-1..."
                    value={formSubgrupoId}
                    onChange={(e) => setFormSubgrupoId(e.target.value)}
                    required
                    className="w-full bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-slate-800 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                  <p className="text-[11px] text-amber-700 mt-1">
                    Permite dividir el grupo para laboratorios de química, biología o nutrición sin sobrepasar la capacidad de los laboratorios (10-17 cupos).
                  </p>
                </div>
              )}

              {/* Fila: Día, Hora Inicio, Hora Fin */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Día de la Semana *</label>
                  <select
                    id="form-dia"
                    value={formDia}
                    onChange={(e) => setFormDia(e.target.value as DiaSemana)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                  >
                    {DIAS_SEMANA.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hora Inicio *</label>
                  <select
                    id="form-hora-inicio"
                    value={formHoraInicio}
                    onChange={(e) => setFormHoraInicio(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                  >
                    {HORAS_DIA.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hora Fin *</label>
                  <select
                    id="form-hora-fin"
                    value={formHoraFin}
                    onChange={(e) => setFormHoraFin(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                  >
                    {HORAS_DIA.concat(['21:00']).map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selección de Espacio con Sugerencias */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-slate-700">
                    Espacio Físico (Aula / Laboratorio / Posgrado) *
                  </label>
                  <div className="flex items-center gap-2">
                    {roleUsuario === 'admin' && onAbrirCrearAula && (
                      <button
                        type="button"
                        onClick={() => {
                          setModalAbierto(false);
                          if (onCerrarModalNueva) onCerrarModalNueva();
                          onAbrirCrearAula();
                        }}
                        className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>+ Nueva Aula</span>
                      </button>
                    )}
                    <span className="text-[11px] text-slate-500">
                      Capacidad recomendada ≥ {formAlumnos}
                    </span>
                  </div>
                </div>
                <select
                  id="form-espacio"
                  value={formEspacioId}
                  onChange={(e) => setFormEspacioId(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                >
                  <option value="">Seleccione un espacio...</option>
                  {espaciosSugeridos.map(({ espacio, capacidad, disponible }) => (
                    <option key={espacio.id} value={espacio.id}>
                      {disponible ? '✓ LIBRE' : '✗ OCUPADO'} · {espacio.codigo} - {espacio.nombre} (Cap: {capacidad}, {espacio.edificio})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selección de Docente */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Profesor Responsable *
                </label>
                <select
                  id="form-docente"
                  value={formDocenteId}
                  onChange={(e) => setFormDocenteId(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-sky-500"
                >
                  <option value="">Seleccione docente...</option>
                  {docentes.map((d) => (
                    <option key={d.uid} value={d.uid}>
                      {d.nombre} ({d.academia_area || d.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* ALERTA DE CONFLICTOS EN TIEMPO REAL */}
              {validacionFormulario.conflictos.length > 0 && (
                <div
                  className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    validacionFormulario.bloqueante
                      ? 'bg-red-50 border-red-300 text-red-900'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {validacionFormulario.bloqueante ? (
                      <AlertOctagon className="w-4 h-4 text-red-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    <span>
                      {validacionFormulario.bloqueante
                        ? 'CONFLICTO CRÍTICO BLOQUEANTE (NO SE PUEDE GUARDAR)'
                        : 'ADVERTENCIA DE PLANIFICACIÓN'}
                    </span>
                  </div>

                  {validacionFormulario.erroresCriticos.map((err, i) => (
                    <p key={`err_${i}`} className="text-red-800 leading-tight">
                      • {err}
                    </p>
                  ))}

                  {validacionFormulario.advertencias.map((adv, i) => (
                    <p key={`adv_${i}`} className="text-amber-800 leading-tight">
                      • {adv}
                    </p>
                  ))}
                </div>
              )}

              {errorGuardado && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-900 rounded-lg text-xs">
                  {errorGuardado}
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setModalAbierto(false);
                    if (onCerrarModalNueva) onCerrarModalNueva();
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando || validacionFormulario.bloqueante}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold text-white shadow transition flex items-center gap-2 ${
                    validacionFormulario.bloqueante
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-700'
                  }`}
                >
                  {guardando ? (
                    <span>Guardando en Firestore...</span>
                  ) : (
                    <span>{asignacionEnEdicion ? 'Actualizar Horario' : 'Guardar Asignación'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
