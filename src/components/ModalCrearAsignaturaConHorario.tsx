/**
 * Modal para Registrar una Asignatura Nueva con Horarios y Aula
 * Accesible tanto para Docentes (al ingresar/registrarse) como para Administradores
 */

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Building2,
  Users,
  Plus,
  X,
  Save,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import {
  Curso,
  Asignacion,
  Espacio,
  Usuario,
  ProgramaEducativo,
  DiaSemana,
  NivelEducativo,
  TipoActividadCurso,
  RoleUsuario
} from '../types';
import { validarAsignacion, sugerirEspaciosCompatibles } from '../utils/conflicts';
import { normalizarTexto } from '../utils/normalization';

interface ModalCrearAsignaturaConHorarioProps {
  abierto: boolean;
  usuarioActual: Usuario | null;
  roleUsuario?: RoleUsuario;
  espacios: Espacio[];
  docentes: Usuario[];
  programas: ProgramaEducativo[];
  asignacionesExistentes: Asignacion[];
  periodoActivoId: string;
  escenarioActivoId: string;
  onCerrar: () => void;
  onGuardarAsignaturaYHorario: (nuevoCurso: Curso, nuevaAsignacion: Asignacion) => Promise<void>;
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
  '07:00', '08:00', '08:30', '09:00', '10:00', '11:00', '11:30',
  '12:00', '13:00', '14:00', '14:30', '15:00', '16:00', '17:00',
  '17:30', '18:00', '19:00', '20:00'
];

export const ModalCrearAsignaturaConHorario: React.FC<ModalCrearAsignaturaConHorarioProps> = ({
  abierto,
  usuarioActual,
  roleUsuario,
  espacios,
  docentes,
  programas,
  asignacionesExistentes,
  periodoActivoId,
  escenarioActivoId,
  onCerrar,
  onGuardarAsignaturaYHorario,
  onAbrirCrearAula
}) => {
  const esAdmin = roleUsuario === 'admin';

  // Datos de la Asignatura
  const [nombreMateria, setNombreMateria] = useState('');
  const [codigoMateria, setCodigoMateria] = useState('');
  const [programaId, setProgramaId] = useState(programas[0]?.id || 'OCE');
  const [nivelEducativo, setNivelEducativo] = useState<NivelEducativo>('licenciatura');
  const [tipoActividad, setTipoActividad] = useState<TipoActividadCurso>('teorico');
  const [horasTeoria, setHorasTeoria] = useState(3);
  const [horasLab, setHorasLab] = useState(0);
  const [cupoEstimado, setCupoEstimado] = useState(35);

  // Datos del Horario y Sesión
  const [dia, setDia] = useState<DiaSemana>('lunes');
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('10:00');
  const [grupoClave, setGrupoClave] = useState('111');
  const [esSubgrupo, setEsSubgrupo] = useState(false);
  const [subgrupoId, setSubgrupoId] = useState('');
  const [espacioId, setEspacioId] = useState(espacios[0]?.id || '');
  const [docenteId, setDocenteId] = useState(
    !esAdmin && usuarioActual ? usuarioActual.uid : docentes[0]?.uid || ''
  );

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mapas
  const espaciosMap = useMemo(() => new Map(espacios.map((e) => [e.id, e])), [espacios]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);

  // Espacio seleccionado
  const espacioSeleccionado = useMemo(() => espaciosMap.get(espacioId), [espaciosMap, espacioId]);

  // Validación de traslapes en vivo
  const validacionConflicto = useMemo(() => {
    if (!espacioId || !horaInicio || !horaFin || !dia) {
      return { esValido: true, bloqueante: false, conflictos: [] };
    }

    const profesoresIds = docenteId ? [docenteId] : [];
    const propuesta: Partial<Asignacion> = {
      id: 'temp_nueva_asig',
      periodo_id: periodoActivoId,
      escenario_id: escenarioActivoId,
      espacio_id: espacioId,
      dia,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      profesores_ids: profesoresIds,
      alumnos_programados: cupoEstimado
    };

    return validarAsignacion(propuesta, asignacionesExistentes, espaciosMap, []);
  }, [
    espacioId,
    dia,
    horaInicio,
    horaFin,
    docenteId,
    cupoEstimado,
    periodoActivoId,
    escenarioActivoId,
    asignacionesExistentes,
    espaciosMap
  ]);

  if (!abierto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreMateria.trim()) {
      setError('Por favor proporcione el nombre de la asignatura.');
      return;
    }
    if (!espacioId) {
      setError('Por favor seleccione un aula o espacio físico.');
      return;
    }
    if (horaInicio >= horaFin) {
      setError('La hora de inicio debe ser anterior a la hora de fin.');
      return;
    }

    if (validacionConflicto.bloqueante && !esAdmin) {
      setError(
        'Existe un conflicto bloqueante (el aula o docente ya están ocupados en este horario). Por favor elija otra aula o franja horaria.'
      );
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      const codigoFinal =
        codigoMateria.trim() ||
        `${programaId}-${Math.floor(100 + Math.random() * 899)}`;

      const nuevoCursoId = `curso_${codigoFinal.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;

      const ht = Number(horasTeoria) || 3;
      const hl = Number(horasLab) || 0;

      const nuevoCurso: Curso = {
        id: nuevoCursoId,
        codigo: codigoFinal.toUpperCase(),
        codigo_normalizado: codigoFinal.toUpperCase().trim(),
        nombre: nombreMateria.trim(),
        nombre_normalizado: normalizarTexto(nombreMateria.trim()),
        clave_curso_unica: `${codigoFinal.toUpperCase()}-${periodoActivoId}`,
        nivel_educativo: nivelEducativo,
        tipo_actividad: tipoActividad,
        programas_ids: [programaId],
        horas_teoria_semana: ht,
        horas_laboratorio_semana: hl,
        horas_totales_semana: ht + hl,
        duracion_bloque_minutos: 90,
        cupo_estimado: Number(cupoEstimado) || 35,
        requiere_espacio_especial: tipoActividad === 'laboratorio',
        activo: true,
        periodo_id: periodoActivoId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docObj = docentesMap.get(docenteId);
      const nuevaAsignacion: Asignacion = {
        id: `asig_nueva_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        periodo_id: periodoActivoId,
        escenario_id: escenarioActivoId,
        curso_id: nuevoCursoId,
        grupo_principal_id: grupoClave.trim() || '111',
        componente_grupo_id: `comp_${grupoClave}_${tipoActividad}`,
        subgrupo_id: esSubgrupo ? subgrupoId.trim() || 'L1' : undefined,
        nivel_programacion: esSubgrupo ? 'subgrupo' : 'grupo_principal',
        profesores_ids: docenteId ? [docenteId] : [],
        profesor_principal_id: docenteId,
        programas_ids: [programaId],
        nivel_educativo: nivelEducativo,
        espacio_id: espacioId,
        espacio_codigo_snapshot: espacioSeleccionado?.codigo || 'AULA',
        espacio_nombre_snapshot: espacioSeleccionado?.nombre || 'Aula FCM',
        dia,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        tipo_componente: tipoActividad === 'laboratorio' ? 'laboratorio' : 'teoria',
        tipo_sesion: tipoActividad === 'laboratorio' ? 'Laboratorio' : 'Teoría',
        alumnos_programados: Number(cupoEstimado) || 30,
        capacidad_espacio: espacioSeleccionado?.capacidad_maxima || 40,
        estatus: 'confirmado',
        notas: `Asignatura creada: ${nuevoCurso.nombre}. Docente: ${docObj?.nombre || 'Docente FCM'}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: usuarioActual?.nombre || 'Docente'
      };

      await onGuardarAsignaturaYHorario(nuevoCurso, nuevaAsignacion);

      // Limpiar y cerrar
      setNombreMateria('');
      setCodigoMateria('');
      onCerrar();
    } catch (err: any) {
      setError(err.message || 'Error al guardar la nueva asignatura con horario.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0c2d48] flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Registrar Nueva Asignatura con Horario y Aula
              </h3>
              <p className="text-[11px] text-slate-500">
                Facultad de Ciencias Marinas · Periodo 2027-1
              </p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-xs text-red-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* SECCIÓN 1: DATOS DE LA ASIGNATURA */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-sky-700" />
              <span>1. Datos de la Materia / Asignatura FCM</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nombre de la Asignatura *
              </label>
              <input
                type="text"
                required
                value={nombreMateria}
                onChange={(e) => setNombreMateria(e.target.value)}
                placeholder="Ej: Oceanografía Geológica Avanzada, Ecología Pesquera, Seminario de Tesis..."
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Código (Opcional)
                </label>
                <input
                  type="text"
                  value={codigoMateria}
                  onChange={(e) => setCodigoMateria(e.target.value)}
                  placeholder="Ej: OCE-401, BIO-302"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold uppercase focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Programa Educativo *
                </label>
                <select
                  value={programaId}
                  onChange={(e) => setProgramaId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 font-medium"
                >
                  {programas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nivel Educativo
                </label>
                <select
                  value={nivelEducativo}
                  onChange={(e) => setNivelEducativo(e.target.value as NivelEducativo)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 font-medium"
                >
                  <option value="licenciatura">Licenciatura</option>
                  <option value="posgrado">Posgrado (EGA/MOC/DOC)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tipo de Actividad
                </label>
                <select
                  value={tipoActividad}
                  onChange={(e) => setTipoActividad(e.target.value as TipoActividadCurso)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 font-medium"
                >
                  <option value="teorico">Teórico</option>
                  <option value="laboratorio">Laboratorio</option>
                  <option value="mixto">Mixto</option>
                  <option value="taller">Taller</option>
                  <option value="seminario">Seminario</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Horas Teoría / Sem
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={horasTeoria}
                  onChange={(e) => setHorasTeoria(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Horas Lab / Sem
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={horasLab}
                  onChange={(e) => setHorasLab(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Cupo de Alumnos
                </label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={cupoEstimado}
                  onChange={(e) => setCupoEstimado(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: HORARIO, GRUPO Y PROFESOR */}
          <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-200 space-y-3">
            <div className="flex items-center gap-2 text-sky-950 font-bold text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-sky-700" />
              <span>2. Horario Propuesto y Docente Responsable</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Día de la Semana *
                </label>
                <select
                  value={dia}
                  onChange={(e) => setDia(e.target.value as DiaSemana)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 font-semibold"
                >
                  {DIAS_SEMANA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Hora de Inicio *
                </label>
                <select
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 font-mono font-bold"
                >
                  {HORAS_DIA.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Hora de Fin *
                </label>
                <select
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 font-mono font-bold"
                >
                  {HORAS_DIA.concat(['20:30', '21:00']).map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Clave de Grupo *
                </label>
                <input
                  type="text"
                  required
                  value={grupoClave}
                  onChange={(e) => setGrupoClave(e.target.value)}
                  placeholder="Ej: 111, 211, 311, 811"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  Profesor Responsable *
                </label>
                <select
                  value={docenteId}
                  onChange={(e) => setDocenteId(e.target.value)}
                  disabled={!esAdmin && Boolean(usuarioActual)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100"
                >
                  {docentes.map((d) => (
                    <option key={d.uid} value={d.uid}>
                      {d.nombre} ({d.email})
                    </option>
                  ))}
                </select>
                {!esAdmin && (
                  <p className="text-[10px] text-slate-500 mt-1">
                    Asignado automáticamente a su perfil docente actual.
                  </p>
                )}
              </div>
            </div>

            {/* Subgrupo para laboratorio */}
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chk-es-subgrupo"
                  checked={esSubgrupo}
                  onChange={(e) => setEsSubgrupo(e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
                <label htmlFor="chk-es-subgrupo" className="text-slate-700 font-semibold cursor-pointer">
                  Dividir en Subgrupo de Laboratorio (ej. 111-1, Lab-A)
                </label>
              </div>
              {esSubgrupo && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={subgrupoId}
                    onChange={(e) => setSubgrupoId(e.target.value)}
                    placeholder="Identificador del subgrupo (ej: 111-1, L1)"
                    className="w-full max-w-xs bg-white border border-sky-300 rounded-lg px-3 py-1.5 text-slate-900 font-medium"
                  />
                </div>
              )}
            </div>
          </div>

          {/* SECCIÓN 3: AULA Y VERIFICACIÓN DE TRASLAPE */}
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>3. Aula / Espacio Físico FCM</span>
              </div>
              {esAdmin && onAbrirCrearAula && (
                <button
                  type="button"
                  onClick={onAbrirCrearAula}
                  className="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Registrar Nueva Aula</span>
                </button>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Seleccionar Aula o Laboratorio *
              </label>
              <select
                value={espacioId}
                onChange={(e) => setEspacioId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-emerald-500"
              >
                {espacios.map((esp) => (
                  <option key={esp.id} value={esp.id}>
                    {esp.codigo} - {esp.nombre} ({esp.edificio} · Capacidad: {esp.capacidad_maxima} alumnos)
                  </option>
                ))}
              </select>
            </div>

            {/* Alerta de traslape en vivo */}
            {validacionConflicto.conflictos.length > 0 ? (
              <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-xs space-y-1">
                <p className="font-bold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Conflicto Detectado en este Horario:</span>
                </p>
                {validacionConflicto.conflictos.map((c, idx) => (
                  <p key={idx} className="text-red-700 text-[11px] pl-5">
                    • {c.mensaje}
                  </p>
                ))}
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-100/70 border border-emerald-300 rounded-lg text-[11px] text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>
                  <strong>Horario y Aula Compatibles:</strong> No se detectan colisiones ni traslapes para {dia} de {horaInicio} a {horaFin}.
                </span>
              </div>
            )}
          </div>

          {/* Botones finales */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0c2d48] hover:bg-[#1a4b70] text-white font-bold rounded-lg shadow-sm transition disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-sky-400" />
              <span>
                {guardando ? 'Registrando...' : 'Registrar Asignatura y Horario Oficial'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
