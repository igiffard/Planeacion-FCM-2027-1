/**
 * Vista del Portal Docente / Encuesta de Preferencias y Restricciones FCM 2027-1
 * Sección 10 de las especificaciones
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
  Info
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

export const PreferenciasDocenteView: React.FC<PreferenciasDocenteViewProps> = ({
  docentes,
  cursos,
  preferencias,
  usuarioActual,
  periodoActivoId,
  onGuardarPreferencia
}) => {
  const [docenteSeleccionadoId, setDocenteSeleccionadoId] = useState<string>(
    usuarioActual?.uid || docentes[0]?.uid || ''
  );

  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);
  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);

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

  // Franjas horarias no disponibles
  const [rangosNoDisponibles, setRangosNoDisponibles] = useState<
    { dia: DiaSemana; hora_inicio: string; hora_fin: string; motivo: string }[]
  >(preferenciaExistente?.rangos_no_disponibles || []);

  const [nuevoRangoDia, setNuevoRangoDia] = useState<DiaSemana>('viernes');
  const [nuevoRangoInicio, setNuevoRangoInicio] = useState<string>('14:00');
  const [nuevoRangoFin, setNuevoRangoFin] = useState<string>('18:00');
  const [nuevoRangoMotivo, setNuevoRangoMotivo] = useState<string>('Salida de campo oceanográfica');

  const [guardando, setGuardando] = useState<boolean>(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Actualizar formulario cuando cambia el docente seleccionado
  const handleCambiarDocente = (uid: string) => {
    setDocenteSeleccionadoId(uid);
    setMensajeExito(null);
    const pref = preferencias.find(
      (p) => p.profesor_id === uid && p.periodo_id === periodoActivoId
    );
    if (pref) {
      setCursosSeleccionados(pref.cursos_interes_ids || []);
      setDiasNoDisponibles(pref.dias_no_disponibles || []);
      setNivelRestriccion(pref.nivel_restriccion || 'preferencia');
      setMotivoRestriccion(pref.motivo_restriccion || '');
      setObservaciones(pref.observaciones || '');
      setEquiposRequeridos(pref.equipos_requeridos?.join(', ') || '');
      setRangosNoDisponibles(pref.rangos_no_disponibles || []);
    } else {
      setCursosSeleccionados([]);
      setDiasNoDisponibles([]);
      setNivelRestriccion('preferencia');
      setMotivoRestriccion('');
      setObservaciones('');
      setEquiposRequeridos('');
      setRangosNoDisponibles([]);
    }
  };

  const toggleDiaNoDisponible = (dia: DiaSemana) => {
    if (diasNoDisponibles.includes(dia)) {
      setDiasNoDisponibles(diasNoDisponibles.filter((d) => d !== dia));
    } else {
      setDiasNoDisponibles([...diasNoDisponibles, dia]);
    }
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

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
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
      equipos_requeridos: equiposArray,
      observaciones,
      estatus_aprobacion: 'pendiente',
      updatedAt: new Date().toISOString()
    };

    try {
      await onGuardarPreferencia(prefPayload);
      setMensajeExito('Preferencias y restricciones registradas con éxito para el periodo 2027-1');
      setTimeout(() => setMensajeExito(null), 5000);
    } catch (err: any) {
      alert(err.message || 'Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-indigo-600" />
            <span>Portal Docente / Encuesta de Disponibilidad 2027-1</span>
          </h2>
          <p className="text-xs text-slate-500">
            Captura de asignaturas de interés, días no disponibles y restricciones justificadas (Sección 10)
          </p>
        </div>

        {/* Selector de Docente */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Profesor a registrar:</span>
          <select
            value={docenteSeleccionadoId}
            onChange={(e) => handleCambiarDocente(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-indigo-500"
          >
            {docentes.map((d) => (
              <option key={d.uid} value={d.uid}>
                {d.nombre} ({d.academia_area || d.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      {mensajeExito && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 font-medium shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{mensajeExito}</span>
        </div>
      )}

      {/* Formulario Principal */}
      <form onSubmit={handleGuardar} className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        {/* Columna 1: Asignaturas de Interés */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>1. Asignaturas de Interés</span>
            </h3>
            <span className="text-[10px] text-sky-600 font-bold">
              {cursosSeleccionados.length} seleccionadas
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            Seleccione las materias que puede o desea impartir en 2027-1 (Licenciatura y/o Posgrado):
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
                      ? 'bg-sky-50 border-sky-400 text-sky-950 font-medium'
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

        {/* Columna 2: Disponibilidad y Días No Disponibles */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>2. Días y Franjas Horarias</span>
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
                    className={`py-2 px-2 rounded-lg border font-semibold text-center text-xs transition ${
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

          {/* Franjas horarias específicas no disponibles */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="block font-semibold text-slate-700">
              Franja horaria específica bloqueada:
            </label>

            <div className="grid grid-cols-3 gap-2">
              <select
                value={nuevoRangoDia}
                onChange={(e) => setNuevoRangoDia(e.target.value as DiaSemana)}
                className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs"
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
                placeholder="Motivo (ej. Comité, Muestreo...)"
                value={nuevoRangoMotivo}
                onChange={(e) => setNuevoRangoMotivo(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs"
              />
              <button
                type="button"
                onClick={agregarRangoNoDisponible}
                className="px-3 py-1 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-slate-900 transition"
              >
                + Añadir
              </button>
            </div>

            {/* Lista de rangos registrados */}
            <div className="space-y-1 mt-2">
              {rangosNoDisponibles.map((rango, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded border text-[11px]"
                >
                  <div>
                    <span className="font-bold capitalize">{rango.dia}:</span> {rango.hora_inicio} - {rango.hora_fin}
                    {rango.motivo && <span className="text-slate-500 italic ml-1">({rango.motivo})</span>}
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

        {/* Columna 3: Nivel de Restricción y Equipamiento */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>3. Justificación y Equipamiento</span>
              </h3>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nivel de Restricción Horaria:
              </label>
              <select
                value={nivelRestriccion}
                onChange={(e) => setNivelRestriccion(e.target.value as NivelRestriccion)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold"
              >
                <option value="preferencia">Preferencia General (Deseable)</option>
                <option value="restriccion_importante">Restricción Importante (Justificada)</option>
                <option value="no_negociable">No Negociable (Comisión oficial / Salud / Ley)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Motivo de la Restricción:
              </label>
              <input
                type="text"
                placeholder="Ej. Campaña oceanográfica de cruceros..."
                value={motivoRestriccion}
                onChange={(e) => setMotivoRestriccion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Equipos o Software Especial Requerido:
              </label>
              <input
                type="text"
                placeholder="Ej. Proyector, Campana de extracción, MATLAB..."
                value={equiposRequeridos}
                onChange={(e) => setEquiposRequeridos(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Observaciones Adicionales:
              </label>
              <textarea
                rows={3}
                placeholder="Comentarios para la Subdirección o Coordinación..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 mt-4"
          >
            <Save className="w-4 h-4" />
            <span>{guardando ? 'Guardando...' : 'Guardar Encuesta de Disponibilidad'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
