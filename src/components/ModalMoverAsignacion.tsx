/**
 * Modal para Mover Asignación en el Tiempo y en el Espacio Físico
 * Permite a cualquier profesor o administrador cambiar día, franja horaria y aula
 * con verificación interactiva de colisiones en vivo.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Building2,
  AlertTriangle,
  CheckCircle2,
  X,
  Save,
  Trash2,
  Move,
  ArrowRight,
  Info
} from 'lucide-react';
import { Asignacion, Espacio, Curso, Usuario, DiaSemana } from '../types';
import { hayTraslapeHorario } from '../utils/conflicts';

interface ModalMoverAsignacionProps {
  abierto: boolean;
  asignacion: Asignacion | null;
  espacios: Espacio[];
  cursos: Curso[];
  docentes: Usuario[];
  todasAsignaciones: Asignacion[];
  onCerrar: () => void;
  onGuardar: (asignacionActualizada: Asignacion) => Promise<void> | void;
  onEliminar?: (asignacionId: string) => Promise<void> | void;
}

const DIAS_SEMANA: { id: DiaSemana; nombre: string }[] = [
  { id: 'lunes', nombre: 'Lunes' },
  { id: 'martes', nombre: 'Martes' },
  { id: 'miercoles', nombre: 'Miércoles' },
  { id: 'jueves', nombre: 'Jueves' },
  { id: 'viernes', nombre: 'Viernes' },
  { id: 'sabado', nombre: 'Sábado' }
];

const PRESETS_HORARIOS = [
  { label: '07:00 - 08:00 (1h)', inicio: '07:00', fin: '08:00' },
  { label: '07:00 - 09:00 (2h)', inicio: '07:00', fin: '09:00' },
  { label: '08:00 - 10:00 (2h)', inicio: '08:00', fin: '10:00' },
  { label: '10:00 - 11:00 (1h)', inicio: '10:00', fin: '11:00' },
  { label: '10:00 - 12:00 (2h)', inicio: '10:00', fin: '12:00' },
  { label: '10:00 - 13:00 (3h)', inicio: '10:00', fin: '13:00' },
  { label: '11:00 - 13:00 (2h)', inicio: '11:00', fin: '13:00' },
  { label: '12:00 - 14:00 (2h)', inicio: '12:00', fin: '14:00' },
  { label: '13:00 - 15:00 (2h)', inicio: '13:00', fin: '15:00' },
  { label: '14:00 - 16:00 (2h)', inicio: '14:00', fin: '16:00' },
  { label: '15:00 - 17:00 (2h)', inicio: '15:00', fin: '17:00' },
  { label: '17:00 - 19:00 (2h)', inicio: '17:00', fin: '19:00' },
  { label: '19:00 - 20:00 (1h)', inicio: '19:00', fin: '20:00' },
  { label: '19:00 - 21:00 (2h)', inicio: '19:00', fin: '21:00' },
  { label: '20:00 - 21:00 (1h)', inicio: '20:00', fin: '21:00' },
  { label: '21:00 - 22:00 (1h)', inicio: '21:00', fin: '22:00' }
];

export const ModalMoverAsignacion: React.FC<ModalMoverAsignacionProps> = ({
  abierto,
  asignacion,
  espacios,
  cursos,
  docentes,
  todasAsignaciones,
  onCerrar,
  onGuardar,
  onEliminar
}) => {
  if (!abierto || !asignacion) return null;

  const [dia, setDia] = useState<DiaSemana>(asignacion.dia);
  const [horaInicio, setHoraInicio] = useState<string>(asignacion.hora_inicio);
  const [horaFin, setHoraFin] = useState<string>(asignacion.hora_fin);
  const [espacioId, setEspacioId] = useState<string>(asignacion.espacio_id);
  const [alumnos, setAlumnos] = useState<number>(asignacion.alumnos_programados || 30);
  const [guardando, setGuardando] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);

  useEffect(() => {
    if (asignacion) {
      setDia(asignacion.dia);
      setHoraInicio(asignacion.hora_inicio);
      setHoraFin(asignacion.hora_fin);
      setEspacioId(asignacion.espacio_id);
      setAlumnos(asignacion.alumnos_programados || 30);
      setConfirmarEliminar(false);
    }
  }, [asignacion]);

  const curso = useMemo(() => cursos.find((c) => c.id === asignacion.curso_id), [cursos, asignacion]);
  const espacioActual = useMemo(() => espacios.find((e) => e.id === espacioId), [espacios, espacioId]);
  const docentesAsignados = useMemo(() => {
    return asignacion.profesores_ids
      .map((id) => docentes.find((d) => d.uid === id)?.nombre || id)
      .join(', ');
  }, [docentes, asignacion]);

  // Chequeo de colisiones en tiempo real
  const conflictosDetectados = useMemo(() => {
    const list: string[] = [];

    todasAsignaciones.forEach((otra) => {
      if (otra.id === asignacion.id) return;
      if (otra.escenario_id !== asignacion.escenario_id) return;
      if (otra.dia !== dia) return;

      const solapa = hayTraslapeHorario(horaInicio, horaFin, otra.hora_inicio, otra.hora_fin);
      if (!solapa) return;

      // Colisión de aula
      if (otra.espacio_id === espacioId && espacioId !== 'espacio_VIR' && espacioId !== 'espacio_PEND') {
        const otroCurso = cursos.find((c) => c.id === otra.curso_id);
        list.push(
          `El aula ${otra.espacio_codigo_snapshot || 'seleccionada'} ya está ocupada de ${otra.hora_inicio} a ${otra.hora_fin} por ${otroCurso?.nombre || 'otra clase'}.`
        );
      }

      // Colisión de profesor
      const docenteComun = asignacion.profesores_ids.find((pid) =>
        otra.profesores_ids?.includes(pid)
      );
      if (docenteComun) {
        const docObj = docentes.find((d) => d.uid === docenteComun);
        const otroCurso = cursos.find((c) => c.id === otra.curso_id);
        list.push(
          `El docente ${docObj?.nombre || 'asignado'} ya tiene clase programada (${otroCurso?.nombre || 'otra materia'}) de ${otra.hora_inicio} a ${otra.hora_fin}.`
        );
      }
    });

    // Validar capacidad
    if (espacioActual && alumnos > (espacioActual.capacidad_maxima || 40)) {
      list.push(
        `Capacidad excedida: El espacio tiene cupo máximo de ${espacioActual.capacidad_maxima} alumnos y se estiman ${alumnos}.`
      );
    }

    return list;
  }, [
    todasAsignaciones,
    asignacion,
    dia,
    horaInicio,
    horaFin,
    espacioId,
    alumnos,
    espacioActual,
    cursos,
    docentes
  ]);

  const handlePreset = (inicio: string, fin: string) => {
    setHoraInicio(inicio);
    setHoraFin(fin);
  };

  const handleGuardarCambios = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const espacioObj = espacios.find((e) => e.id === espacioId);

      const actualizada: Asignacion = {
        ...asignacion,
        dia,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        espacio_id: espacioId,
        espacio_codigo_snapshot: espacioObj?.codigo || asignacion.espacio_codigo_snapshot,
        espacio_nombre_snapshot: espacioObj?.nombre || asignacion.espacio_nombre_snapshot,
        alumnos_programados: alumnos,
        capacidad_espacio: espacioObj?.capacidad_maxima || asignacion.capacidad_espacio,
        conflictos_detectados: conflictosDetectados,
        updatedAt: new Date().toISOString()
      };

      await onGuardar(actualizada);
      onCerrar();
    } catch (error) {
      console.error('Error al guardar cambio de asignación:', error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-6">
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-sky-800">
              <Move className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Mover Asignación en Tiempo y Espacio Físico
              </h3>
              <p className="text-xs text-slate-500">
                Programación de Horarios FCM · Periodo 2027-1
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

        {/* Ficha del Curso Actual */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 text-sm">
              {curso?.codigo} · {curso?.nombre || 'Curso FCM'}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                asignacion.nivel_educativo === 'posgrado'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-sky-100 text-sky-900 border border-sky-300'
              }`}
            >
              {asignacion.nivel_educativo}
            </span>
          </div>
          <div className="text-slate-600">
            <span className="font-semibold">Docente(s):</span> {docentesAsignados || 'Sin docente'}
          </div>
          <div className="text-slate-500 text-[11px] flex items-center gap-1">
            <span>Ubicación anterior:</span>
            <span className="font-medium text-slate-700 capitalize">
              {asignacion.dia} de {asignacion.hora_inicio} a {asignacion.hora_fin} en{' '}
              {asignacion.espacio_codigo_snapshot} ({asignacion.espacio_nombre_snapshot})
            </span>
          </div>
        </div>

        <form onSubmit={handleGuardarCambios} className="space-y-4 text-xs">
          {/* 1. Mover en el Tiempo: Día y Franja Horaria */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>1. Cambiar Día de la Semana</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {DIAS_SEMANA.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setDia(d.id)}
                  className={`py-1.5 px-2 rounded-lg font-bold text-center border transition ${
                    dia === d.id
                      ? 'bg-[#0c2d48] text-white border-[#0c2d48] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {d.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Presets Rápidos de Horario */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>2. Seleccionar Franja Horaria</span>
              </label>
              <span className="text-[11px] text-slate-400">Clic para aplicar rápido</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-32 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-slate-200">
              {PRESETS_HORARIOS.map((p) => {
                const activo = horaInicio === p.inicio && horaFin === p.fin;
                return (
                  <button
                    type="button"
                    key={p.label}
                    onClick={() => handlePreset(p.inicio, p.fin)}
                    className={`py-1 px-2 text-[11px] rounded font-medium border text-left truncate transition ${
                      activo
                        ? 'bg-sky-600 text-white border-sky-600 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                    }`}
                  >
                    {p.inicio} - {p.fin}
                  </button>
                );
              })}
            </div>

            {/* Ajuste Fino Horas */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Hora Inicio:
                </span>
                <input
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-mono font-bold"
                  required
                />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Hora Fin:
                </span>
                <input
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-mono font-bold"
                  required
                />
              </div>
            </div>
          </div>

          {/* 2. Mover en el Espacio Físico */}
          <div className="space-y-2 pt-2 border-t">
            <label className="block font-bold text-slate-800 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>3. Asignar Espacio Físico / Aula FCM / IIO</span>
            </label>

            <select
              value={espacioId}
              onChange={(e) => setEspacioId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-sky-500"
              required
            >
              <optgroup label="Salas de Posgrado e IIO">
                {espacios
                  .filter(
                    (e) =>
                      e.nombre.toLowerCase().includes('posgrado') ||
                      e.nombre.toLowerCase().includes('sala') ||
                      e.nombre.toLowerCase().includes('iio') ||
                      e.nombre.toLowerCase().includes('totoaba') ||
                      e.nombre.toLowerCase().includes('asesor')
                  )
                  .map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.codigo} · {e.nombre} (Cap: {e.capacidad_maxima})
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Aulas Regulares y Magnas FCM">
                {espacios
                  .filter(
                    (e) =>
                      e.tipo_espacio === 'aula' ||
                      e.tipo_espacio === 'audiovisual' ||
                      e.codigo.startsWith('S') ||
                      e.codigo.startsWith('AM')
                  )
                  .map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.codigo} · {e.nombre} (Cap: {e.capacidad_maxima})
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Laboratorios Especializados y Cómputo">
                {espacios
                  .filter(
                    (e) =>
                      e.tipo_espacio === 'laboratorio' ||
                      e.tipo_espacio === 'aula_computo' ||
                      e.tipo_espacio === 'taller'
                  )
                  .map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.codigo} · {e.nombre} (Cap: {e.capacidad_maxima})
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Modalidad Virtual / Pendiente">
                {espacios
                  .filter(
                    (e) =>
                      e.tipo_espacio === 'virtual' ||
                      e.tipo_espacio === 'espacio_apoyo' ||
                      e.codigo === 'VIR' ||
                      e.codigo === 'PEND'
                  )
                  .map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.codigo} · {e.nombre}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          {/* Alumnos estimados */}
          <div className="pt-1">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Alumnos estimados para esta sesión:
            </label>
            <input
              type="number"
              min={1}
              max={150}
              value={alumnos}
              onChange={(e) => setAlumnos(Number(e.target.value))}
              className="w-32 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            />
          </div>

          {/* Detección y Alertas de Conflictos en Vivo */}
          {conflictosDetectados.length > 0 ? (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Atención: Se detectaron advertencias de traslape</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800">
                {conflictosDetectados.map((conf, idx) => (
                  <li key={idx}>{conf}</li>
                ))}
              </ul>
              <p className="text-[10px] text-amber-700 italic pt-1">
                Puede guardar de todos modos si cuenta con anuencia de coordinación.
              </p>
            </div>
          ) : (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] font-semibold">
                Espacio y horario 100% libres de colisión.
              </span>
            </div>
          )}

          {/* Acciones del Modal */}
          <div className="flex items-center justify-between pt-4 border-t">
            {onEliminar && (
              <div>
                {!confirmarEliminar ? (
                  <button
                    type="button"
                    onClick={() => setConfirmarEliminar(true)}
                    className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar Sesión</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onEliminar(asignacion.id);
                        onCerrar();
                      }}
                      className="px-2.5 py-1.5 bg-red-600 text-white rounded-lg text-[11px] font-bold hover:bg-red-700"
                    >
                      Confirmar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmarEliminar(false)}
                      className="px-2 py-1 text-slate-500 hover:text-slate-800 text-[11px]"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onCerrar}
                className="px-3.5 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-semibold"
              >
                Cerrar
              </button>
              <button
                type="submit"
                disabled={guardando}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0369a1] text-white rounded-lg hover:bg-[#075985] font-bold shadow-xs transition"
              >
                <Save className="w-4 h-4" />
                <span>{guardando ? 'Guardando...' : 'Aplicar Cambio de Horario y Aula'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
