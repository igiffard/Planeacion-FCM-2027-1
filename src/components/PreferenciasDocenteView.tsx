/**
 * Vista del Portal Docente / Encuesta de Preferencias y Restricciones FCM 2027-1
 * Sección 10 y Módulo de Restricciones Individuales & Comunicación Estudiantil
 */

import React, { useState, useMemo } from 'react';
import {
  HeartHandshake,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Plus,
  Trash2,
  Building2,
  BookOpen,
  Save,
  Sparkles,
  Info,
  Grid,
  Lock,
  Unlock,
  MessageSquare,
  Mail,
  Phone,
  UserCheck,
  ShieldAlert,
  Search,
  Check
} from 'lucide-react';
import {
  PreferenciaDocente,
  Usuario,
  Curso,
  DiaSemana,
  NivelRestriccion
} from '../types';

interface PreferenciasDocenteViewProps {
  docentes: Usuario[];
  cursos: Curso[];
  preferencias: PreferenciaDocente[];
  usuarioActual: Usuario | null;
  periodoActivoId: string;
  onGuardarPreferencia: (pref: PreferenciaDocente) => Promise<void>;
}

const DIAS_SEMANA: { id: DiaSemana; nombre: string }[] = [
  { id: 'lunes', nombre: 'Lunes' },
  { id: 'martes', nombre: 'Martes' },
  { id: 'miercoles', nombre: 'Miércoles' },
  { id: 'jueves', nombre: 'Jueves' },
  { id: 'viernes', nombre: 'Viernes' },
  { id: 'sabado', nombre: 'Sábado' }
];

const BLOQUES_HORAS = [
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00'
];

export const PreferenciasDocenteView: React.FC<PreferenciasDocenteViewProps> = ({
  docentes,
  cursos,
  preferencias,
  usuarioActual,
  periodoActivoId,
  onGuardarPreferencia
}) => {
  const [pestanaActiva, setPestanaActiva] = useState<'formulario' | 'matriz_semanal' | 'resumen_claustro'>('formulario');
  const [docenteSeleccionadoId, setDocenteSeleccionadoId] = useState<string>(
    usuarioActual?.uid || docentes[0]?.uid || ''
  );
  const [filtroDocenteResumen, setFiltroDocenteResumen] = useState('');

  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);
  const docenteActual = useMemo(() => docentesMap.get(docenteSeleccionadoId), [docentesMap, docenteSeleccionadoId]);

  const preferenciaExistente = useMemo(() => {
    return preferencias.find(
      (p) => p.profesor_id === docenteSeleccionadoId && p.periodo_id === periodoActivoId
    );
  }, [preferencias, docenteSeleccionadoId, periodoActivoId]);

  // Estado del Formulario
  const [cursosSeleccionados, setCursosSeleccionados] = useState<string[]>(
    preferenciaExistente?.cursos_interes_ids || []
  );
  const [diasNoDisponibles, setDiasNoDisponibles] = useState<DiaSemana[]>(
    preferenciaExistente?.dias_no_disponibles || []
  );
  const [nivelRestriccion, setNivelRestriccion] = useState<NivelRestriccion>(
    preferenciaExistente?.nivel_restriccion || 'preferencia'
  );
  const [motivoRestriccion, setMotivoRestriccion] = useState<string>(
    preferenciaExistente?.motivo_restriccion || ''
  );
  const [observaciones, setObservaciones] = useState<string>(
    preferenciaExistente?.observaciones || ''
  );
  const [equiposRequeridos, setEquiposRequeridos] = useState<string>(
    preferenciaExistente?.equipos_requeridos?.join(', ') || ''
  );

  // Restricciones individuales adicionales
  const [horaMinimaInicio, setHoraMinimaInicio] = useState<string>(
    preferenciaExistente?.hora_minima_inicio || '07:00'
  );
  const [horaMaximaFin, setHoraMaximaFin] = useState<string>(
    preferenciaExistente?.hora_maxima_fin || '20:00'
  );
  const [maxHorasDia, setMaxHorasDia] = useState<number>(
    preferenciaExistente?.max_horas_dia || 6
  );
  const [maxHorasContinuas, setMaxHorasContinuas] = useState<number>(
    preferenciaExistente?.max_horas_continuas || 4
  );
  const [bloqueosMatrizSemanal, setBloqueosMatrizSemanal] = useState<Record<string, boolean>>(
    preferenciaExistente?.bloqueos_matriz_semanal || {}
  );

  // Comunicación con estudiantes
  const [cubiculo, setCubiculo] = useState<string>(
    preferenciaExistente?.cubiculo || docenteActual?.cubiculo || ''
  );
  const [horarioTutorias, setHorarioTutorias] = useState<string>(
    preferenciaExistente?.horario_tutorias || docenteActual?.horario_tutorias || ''
  );
  const [canalContactoEstudiantes, setCanalContactoEstudiantes] = useState<string>(
    preferenciaExistente?.canal_contacto_estudiantes || docenteActual?.canal_contacto_estudiantes || 'Correo UABC / Teams'
  );
  const [telefonoExtension, setTelefonoExtension] = useState<string>(
    preferenciaExistente?.telefono_extension || docenteActual?.telefono_extension || ''
  );
  const [mensajeEstudiantes, setMensajeEstudiantes] = useState<string>(
    preferenciaExistente?.mensaje_estudiantes || ''
  );

  // Franjas horarias no disponibles
  const [rangosNoDisponibles, setRangosNoDisponibles] = useState<
    { dia: DiaSemana; hora_inicio: string; hora_fin: string; motivo: string }[]
  >(preferenciaExistente?.rangos_no_disponibles || []);

  const [nuevoRangoDia, setNuevoRangoDia] = useState<DiaSemana>('viernes');
  const [nuevoRangoInicio, setNuevoRangoInicio] = useState<string>('14:00');
  const [nuevoRangoFin, setNuevoRangoFin] = useState<string>('18:00');
  const [nuevoRangoMotivo, setNuevoRangoMotivo] = useState<string>('Muestreo de campo oceanográfico');

  const [guardando, setGuardando] = useState<boolean>(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  // Actualizar formulario cuando cambia el docente seleccionado
  const handleCambiarDocente = (uid: string) => {
    setDocenteSeleccionadoId(uid);
    setMensajeExito(null);
    const pref = preferencias.find(
      (p) => p.profesor_id === uid && p.periodo_id === periodoActivoId
    );
    const doc = docentesMap.get(uid);

    if (pref) {
      setCursosSeleccionados(pref.cursos_interes_ids || []);
      setDiasNoDisponibles(pref.dias_no_disponibles || []);
      setNivelRestriccion(pref.nivel_restriccion || 'preferencia');
      setMotivoRestriccion(pref.motivo_restriccion || '');
      setObservaciones(pref.observaciones || '');
      setEquiposRequeridos(pref.equipos_requeridos?.join(', ') || '');
      setRangosNoDisponibles(pref.rangos_no_disponibles || []);
      setHoraMinimaInicio(pref.hora_minima_inicio || '07:00');
      setHoraMaximaFin(pref.hora_maxima_fin || '20:00');
      setMaxHorasDia(pref.max_horas_dia || 6);
      setMaxHorasContinuas(pref.max_horas_continuas || 4);
      setBloqueosMatrizSemanal(pref.bloqueos_matriz_semanal || {});
      setCubiculo(pref.cubiculo || doc?.cubiculo || '');
      setHorarioTutorias(pref.horario_tutorias || doc?.horario_tutorias || '');
      setCanalContactoEstudiantes(pref.canal_contacto_estudiantes || doc?.canal_contacto_estudiantes || 'Correo UABC / Teams');
      setTelefonoExtension(pref.telefono_extension || doc?.telefono_extension || '');
      setMensajeEstudiantes(pref.mensaje_estudiantes || '');
    } else {
      setCursosSeleccionados([]);
      setDiasNoDisponibles([]);
      setNivelRestriccion('preferencia');
      setMotivoRestriccion('');
      setObservaciones('');
      setEquiposRequeridos('');
      setRangosNoDisponibles([]);
      setHoraMinimaInicio('07:00');
      setHoraMaximaFin('20:00');
      setMaxHorasDia(6);
      setMaxHorasContinuas(4);
      setBloqueosMatrizSemanal({});
      setCubiculo(doc?.cubiculo || '');
      setHorarioTutorias(doc?.horario_tutorias || '');
      setCanalContactoEstudiantes(doc?.canal_contacto_estudiantes || 'Correo UABC / Teams');
      setTelefonoExtension(doc?.telefono_extension || '');
      setMensajeEstudiantes('');
    }
  };

  const toggleDiaNoDisponible = (dia: DiaSemana) => {
    if (diasNoDisponibles.includes(dia)) {
      setDiasNoDisponibles(diasNoDisponibles.filter((d) => d !== dia));
    } else {
      setDiasNoDisponibles([...diasNoDisponibles, dia]);
    }
  };

  const toggleBloqueMatriz = (dia: DiaSemana, hora: string) => {
    const key = `${dia}_${hora}`;
    setBloqueosMatrizSemanal((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const agregarRangoNoDisponible = () => {
    setRangosNoDisponibles([
      ...rangosNoDisponibles,
      {
        dia: nuevoRangoDia,
        hora_inicio: nuevoRangoInicio,
        hora_fin: nuevoRangoFin,
        motivo: nuevoRangoMotivo
      }
    ]);
    setNuevoRangoMotivo('');
  };

  const eliminarRangoNoDisponible = (index: number) => {
    setRangosNoDisponibles(rangosNoDisponibles.filter((_, i) => i !== index));
  };

  const toggleCursoInteres = (cursoId: string) => {
    if (cursosSeleccionados.includes(cursoId)) {
      setCursosSeleccionados(cursosSeleccionados.filter((id) => id !== cursoId));
    } else {
      setCursosSeleccionados([...cursosSeleccionados, cursoId]);
    }
  };

  const handleGuardar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setGuardando(true);
    setMensajeExito(null);

    const docente = docentesMap.get(docenteSeleccionadoId);
    if (!docente) return;

    const equiposArray = equiposRequeridos
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const prefPayload: PreferenciaDocente = {
      id: preferenciaExistente?.id || `pref_${docenteSeleccionadoId}_${periodoActivoId}`,
      profesor_id: docenteSeleccionadoId,
      profesor_nombre: docente.nombre,
      periodo_id: periodoActivoId,
      cursos_interes_ids: cursosSeleccionados,
      dias_preferidos: DIAS_SEMANA.map((d) => d.id).filter((d) => !diasNoDisponibles.includes(d)),
      dias_no_disponibles: diasNoDisponibles,
      rangos_no_disponibles: rangosNoDisponibles,
      nivel_restriccion: nivelRestriccion,
      motivo_restriccion: motivoRestriccion,
      hora_minima_inicio: horaMinimaInicio,
      hora_maxima_fin: horaMaximaFin,
      max_horas_dia: maxHorasDia,
      max_horas_continuas: maxHorasContinuas,
      bloqueos_matriz_semanal: bloqueosMatrizSemanal,
      cubiculo,
      horario_tutorias: horarioTutorias,
      canal_contacto_estudiantes: canalContactoEstudiantes,
      telefono_extension: telefonoExtension,
      mensaje_estudiantes: mensajeEstudiantes,
      equipos_requeridos: equiposArray,
      observaciones,
      estatus_aprobacion: 'aprobado',
      updatedAt: new Date().toISOString()
    };

    try {
      await onGuardarPreferencia(prefPayload);
      setMensajeExito(`Restricciones y preferencias individuales registradas exitosamente para ${docente.nombre}`);
      setMensajeError(null);
      setTimeout(() => setMensajeExito(null), 5000);
    } catch (err: any) {
      setMensajeError(err.message || 'Error al guardar');
      setMensajeExito(null);
      setTimeout(() => setMensajeError(null), 6000);
    } finally {
      setGuardando(false);
    }
  };

  const totalBloqueosActivos = useMemo(() => {
    return Object.values(bloqueosMatrizSemanal).filter(Boolean).length;
  }, [bloqueosMatrizSemanal]);

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-indigo-600" />
            <span>Portal de Disponibilidad y Restricciones Docentes 2027-1</span>
          </h2>
          <p className="text-xs text-slate-500">
            Captura de restricciones individuales de horario, franjas bloqueadas y datos de tutorías para alumnos
          </p>
        </div>

        {/* Selector de Docente y Controles de Pestañas */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs bg-slate-50 p-1.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-semibold pl-1">Profesor:</span>
            <select
              value={docenteSeleccionadoId}
              onChange={(e) => handleCambiarDocente(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-indigo-500 shadow-2xs"
            >
              {[...docentes]
                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                .map((d) => (
                  <option key={d.uid} value={d.uid}>
                    {d.nombre} ({d.academia_area || d.role})
                  </option>
                ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => handleGuardar()}
            disabled={guardando}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{guardando ? 'Guardando...' : 'Guardar Restricciones'}</span>
          </button>
        </div>
      </div>

      {mensajeExito && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 font-medium shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{mensajeExito}</span>
        </div>
      )}

      {mensajeError && (
        <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 flex items-center gap-2 font-medium shadow-2xs">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{mensajeError}</span>
        </div>
      )}

      {/* Navegación por Pestañas */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-2 text-xs">
        <button
          type="button"
          onClick={() => setPestanaActiva('formulario')}
          className={`py-2.5 px-4 font-bold border-b-2 transition flex items-center gap-2 ${
            pestanaActiva === 'formulario'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>1. Restricciones Individuales & Tutorías</span>
        </button>

        <button
          type="button"
          onClick={() => setPestanaActiva('matriz_semanal')}
          className={`py-2.5 px-4 font-bold border-b-2 transition flex items-center gap-2 ${
            pestanaActiva === 'matriz_semanal'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>2. Matriz Semanal de Bloqueos ({totalBloqueosActivos} bloques)</span>
        </button>

        <button
          type="button"
          onClick={() => setPestanaActiva('resumen_claustro')}
          className={`py-2.5 px-4 font-bold border-b-2 transition flex items-center gap-2 ${
            pestanaActiva === 'resumen_claustro'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>3. Resumen Claustro FCM ({preferencias.length}/{docentes.length})</span>
        </button>
      </div>

      {/* PESTAÑA 1: FORMULARIO PRINCIPAL */}
      {pestanaActiva === 'formulario' && (
        <form onSubmit={handleGuardar} className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
          {/* Columna 1: Asignaturas de Interés */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span>Asignaturas de Interés</span>
              </h3>
              <span className="text-[10px] text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                {cursosSeleccionados.length} seleccionadas
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Materias que {docenteActual?.nombre || 'el docente'} puede impartir en 2027-1:
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {cursos.map((c) => {
                const seleccionado = cursosSeleccionados.includes(c.id);
                const esPos = c.nivel_educativo === 'posgrado';

                return (
                  <div
                    key={c.id}
                    onClick={() => toggleCursoInteres(c.id)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition ${
                      seleccionado
                        ? 'bg-sky-50 border-sky-400 text-sky-950 font-medium shadow-2xs'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                      <span className="font-bold text-slate-900">{c.codigo}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-semibold ${
                          esPos ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {c.nivel_educativo}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold truncate">{c.nombre}</div>
                    <div className="text-[10px] text-slate-400">
                      {c.programas_ids.join(', ')} · {c.horas_totales_semana} hrs/sem
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Columna 2: Restricciones Individuales de Horario */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Restricciones de Días y Horas</span>
              </h3>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Días de la semana NO disponibles:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DIAS_SEMANA.map((dia) => {
                  const noDisponible = diasNoDisponibles.includes(dia.id);
                  return (
                    <button
                      type="button"
                      key={dia.id}
                      onClick={() => toggleDiaNoDisponible(dia.id)}
                      className={`py-2 px-2 rounded-lg border font-bold text-center text-xs transition ${
                        noDisponible
                          ? 'bg-red-500 text-white border-red-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {dia.nombre}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ventana Horaria Permitida y Límites Diarios */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Límites Horarios Individuales</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                    Hora más temprana:
                  </label>
                  <select
                    value={horaMinimaInicio}
                    onChange={(e) => setHoraMinimaInicio(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                  >
                    <option value="07:00">07:00</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                    Hora más tardía:
                  </label>
                  <select
                    value={horaMaximaFin}
                    onChange={(e) => setHoraMaximaFin(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                  >
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                    Máx. horas continuas:
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={6}
                    value={maxHorasContinuas}
                    onChange={(e) => setMaxHorasContinuas(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                    Tope horas al día:
                  </label>
                  <input
                    type="number"
                    min={3}
                    max={10}
                    value={maxHorasDia}
                    onChange={(e) => setMaxHorasDia(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-center font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Franjas horarias específicas bloqueadas */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block font-semibold text-slate-700">
                Bloqueo de franja específica:
              </label>

              <div className="grid grid-cols-3 gap-2">
                <select
                  value={nuevoRangoDia}
                  onChange={(e) => setNuevoRangoDia(e.target.value as DiaSemana)}
                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-semibold"
                >
                  {DIAS_SEMANA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nombre}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="08:00"
                  value={nuevoRangoInicio}
                  onChange={(e) => setNuevoRangoInicio(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs text-center"
                />

                <input
                  type="text"
                  placeholder="12:00"
                  value={nuevoRangoFin}
                  onChange={(e) => setNuevoRangoFin(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs text-center"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Motivo (ej. Muestreo, Comité, Salud...)"
                  value={nuevoRangoMotivo}
                  onChange={(e) => setNuevoRangoMotivo(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs"
                />
                <button
                  type="button"
                  onClick={agregarRangoNoDisponible}
                  className="px-3 py-1 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-slate-900 transition"
                >
                  + Bloquear
                </button>
              </div>

              {/* Lista de rangos registrados */}
              <div className="space-y-1 mt-2">
                {rangosNoDisponibles.map((rango, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-rose-50 border border-rose-200 rounded text-[11px] text-rose-900"
                  >
                    <div>
                      <span className="font-bold capitalize">{rango.dia}:</span> {rango.hora_inicio} - {rango.hora_fin}
                      {rango.motivo && <span className="text-rose-700 italic ml-1">({rango.motivo})</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => eliminarRangoNoDisponible(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna 3: Justificación y Comunicación con Estudiantes */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Nivel y Comunicación con Alumnos</span>
                </h3>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nivel de Restricción Horaria:
                </label>
                <select
                  value={nivelRestriccion}
                  onChange={(e) => setNivelRestriccion(e.target.value as NivelRestriccion)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs font-bold ${
                    nivelRestriccion === 'no_negociable'
                      ? 'bg-red-50 border-red-300 text-red-800'
                      : nivelRestriccion === 'restriccion_importante'
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                >
                  <option value="preferencia">Preferencia General (Deseable)</option>
                  <option value="restriccion_importante">Restricción Importante (Justificada)</option>
                  <option value="no_negociable">No Negociable (Comisión oficial / Salud / Ley)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Motivo o Justificación de la Restricción:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Campaña oceanográfica de cruceros / SNII..."
                  value={motivoRestriccion}
                  onChange={(e) => setMotivoRestriccion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              {/* Sección de Comunicación Estudiante-Docente */}
              <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2.5">
                <div className="font-bold text-sky-950 text-[11px] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-700" />
                  <span>Facilitar Comunicación con Estudiantes</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-600 font-semibold mb-0.5">
                      Cubículo / Oficina FCM:
                    </label>
                    <input
                      type="text"
                      placeholder="Edif. S, Cubículo S-204"
                      value={cubiculo}
                      onChange={(e) => setCubiculo(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-600 font-semibold mb-0.5">
                      Extensión telefónica:
                    </label>
                    <input
                      type="text"
                      placeholder="Ext. 43210"
                      value={telefonoExtension}
                      onChange={(e) => setTelefonoExtension(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-600 font-semibold mb-0.5">
                    Horario de Tutorías y Asesorías para Alumnos:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Martes y Jueves 11:00 - 13:00"
                    value={horarioTutorias}
                    onChange={(e) => setHorarioTutorias(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-600 font-semibold mb-0.5">
                    Canal preferente de atención a estudiantes:
                  </label>
                  <input
                    type="text"
                    placeholder="Correo institucional UABC / Microsoft Teams"
                    value={canalContactoEstudiantes}
                    onChange={(e) => setCanalContactoEstudiantes(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-600 font-semibold mb-0.5">
                    Mensaje o aviso para los alumnos:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Instrucciones para inicio de semestre, material requerido..."
                    value={mensajeEstudiantes}
                    onChange={(e) => setMensajeEstudiantes(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Equipos o Software Especial Requerido:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Proyector, Campana de extracción, MATLAB, RStudio..."
                  value={equiposRequeridos}
                  onChange={(e) => setEquiposRequeridos(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={guardando}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2 mt-4"
            >
              <Save className="w-4 h-4" />
              <span>{guardando ? 'Guardando...' : 'Guardar Restricciones y Perfil Docente'}</span>
            </button>
          </div>
        </form>
      )}

      {/* PESTAÑA 2: MATRIZ SEMANAL VISUAL DE BLOQUEOS HORARIOS */}
      {pestanaActiva === 'matriz_semanal' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Grid className="w-4 h-4 text-indigo-600" />
                <span>Matriz Semanal de Disponibilidad Individual: {docenteActual?.nombre}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Haga clic sobre cualquier celda para alternar entre "Disponible" (verde) o "Bloqueado por Restricción" (rojo con candado).
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Disponible
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                Bloqueado
              </span>
              <button
                type="button"
                onClick={() => setBloqueosMatrizSemanal({})}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold"
              >
                Limpiar todos
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-2.5 text-left font-bold text-slate-600 w-20">Hora</th>
                  {DIAS_SEMANA.map((d) => (
                    <th key={d.id} className="p-2.5 text-center font-bold text-slate-700">
                      {d.nombre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BLOQUES_HORAS.map((hora) => (
                  <tr key={hora} className="hover:bg-slate-50/50">
                    <td className="p-2 font-mono font-bold text-slate-500 bg-slate-50/60 border-r border-slate-200">
                      {hora}
                    </td>
                    {DIAS_SEMANA.map((dia) => {
                      const slotKey = `${dia.id}_${hora}`;
                      const estaBloqueado = Boolean(bloqueosMatrizSemanal[slotKey]);
                      const diaCompletoNoDisponible = diasNoDisponibles.includes(dia.id);

                      const bloqueadoTotal = estaBloqueado || diaCompletoNoDisponible;

                      return (
                        <td
                          key={dia.id}
                          onClick={() => {
                            if (!diaCompletoNoDisponible) {
                              toggleBloqueMatriz(dia.id, hora);
                            }
                          }}
                          className={`p-2 text-center cursor-pointer transition select-none border-r border-slate-100 ${
                            diaCompletoNoDisponible
                              ? 'bg-rose-100/70 text-rose-900 cursor-not-allowed'
                              : bloqueadoTotal
                              ? 'bg-rose-500 text-white font-bold hover:bg-rose-600'
                              : 'bg-emerald-50/40 text-emerald-900 hover:bg-emerald-100/70'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1 text-[11px]">
                            {diaCompletoNoDisponible ? (
                              <span className="text-[10px] font-bold text-rose-800">Día bloqueado</span>
                            ) : bloqueadoTotal ? (
                              <>
                                <Lock className="w-3 h-3" />
                                <span>No disponible</span>
                              </>
                            ) : (
                              <span className="text-slate-400 font-medium">Libre</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t flex justify-end">
            <button
              type="button"
              onClick={() => handleGuardar()}
              disabled={guardando}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Matriz de Bloqueos Semanales</span>
            </button>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: RESUMEN DE CLAUSTRO DOCENTE */}
      {pestanaActiva === 'resumen_claustro' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>Auditoría de Restricciones del Claustro Docente FCM</span>
              </h3>
              <p className="text-xs text-slate-500">
                Consulte las restricciones individuales, cubículos y horarios de tutorías de cada profesor
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar docente..."
                  value={filtroDocenteResumen}
                  onChange={(e) => setFiltroDocenteResumen(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs w-52"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <th className="p-3 text-left">Docente</th>
                  <th className="p-3 text-left">Nivel Restricción</th>
                  <th className="p-3 text-left">Días No Disponibles</th>
                  <th className="p-3 text-left">Límites Horarios</th>
                  <th className="p-3 text-left">Cubículo / Oficina</th>
                  <th className="p-3 text-left">Horario Tutorías Alumnos</th>
                  <th className="p-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {docentes
                  .filter((d) =>
                    d.nombre.toLowerCase().includes(filtroDocenteResumen.toLowerCase()) ||
                    (d.email || '').toLowerCase().includes(filtroDocenteResumen.toLowerCase())
                  )
                  .sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((doc) => {
                    const pref = preferencias.find(
                      (p) => p.profesor_id === doc.uid && p.periodo_id === periodoActivoId
                    );
                    const tieneRestriccion = Boolean(pref);
                    const nivel = pref?.nivel_restriccion || 'Sin registro';

                    return (
                      <tr key={doc.uid} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{doc.nombre}</div>
                          <div className="text-[10px] text-slate-400">
                            {doc.email} · {doc.academia_area || doc.role}
                          </div>
                        </td>

                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              nivel === 'no_negociable'
                                ? 'bg-red-100 text-red-800'
                                : nivel === 'restriccion_importante'
                                ? 'bg-amber-100 text-amber-800'
                                : tieneRestriccion
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {nivel.replace(/_/g, ' ')}
                          </span>
                        </td>

                        <td className="p-3">
                          {pref?.dias_no_disponibles && pref.dias_no_disponibles.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {pref.dias_no_disponibles.map((dia) => (
                                <span
                                  key={dia}
                                  className="px-1.5 py-0.2 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[10px] font-semibold capitalize"
                                >
                                  {dia}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">Disponibilidad completa</span>
                          )}
                        </td>

                        <td className="p-3">
                          <div className="text-[11px] text-slate-700">
                            {pref?.hora_minima_inicio || '07:00'} - {pref?.hora_maxima_fin || '20:00'}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Máx {pref?.max_horas_dia || 6}h/día · {pref?.max_horas_continuas || 4}h continuas
                          </div>
                        </td>

                        <td className="p-3">
                          <span className="font-semibold text-slate-700">
                            {pref?.cubiculo || doc.cubiculo || 'Pendiente'}
                          </span>
                        </td>

                        <td className="p-3">
                          <span className="text-indigo-700 font-semibold">
                            {pref?.horario_tutorias || doc.horario_tutorias || 'Por definir'}
                          </span>
                        </td>

                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              handleCambiarDocente(doc.uid);
                              setPestanaActiva('formulario');
                            }}
                            className="px-2.5 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded border border-indigo-200 transition"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
