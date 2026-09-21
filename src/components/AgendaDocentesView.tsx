/**
 * Vista de Agenda y Carga Docente FCM 2027-1
 */

import React, { useState, useMemo } from 'react';
import {
  Users,
  Clock,
  BookOpen,
  Calendar,
  Download,
  AlertCircle,
  CheckCircle2,
  Building2,
  GraduationCap
} from 'lucide-react';
import { Usuario, Asignacion, Curso, Espacio, PreferenciaDocente, DiaSemana } from '../types';
import { exportarHorarioPDF } from '../utils/exportImport';

interface AgendaDocentesViewProps {
  docentes: Usuario[];
  asignaciones: Asignacion[];
  cursos: Curso[];
  espacios: Espacio[];
  preferenciasDocentes: PreferenciaDocente[];
  escenarioActivoId: string;
}

const DIAS_SEMANA: { id: DiaSemana; nombre: string }[] = [
  { id: 'lunes', nombre: 'Lunes' },
  { id: 'martes', nombre: 'Martes' },
  { id: 'miercoles', nombre: 'Miércoles' },
  { id: 'jueves', nombre: 'Jueves' },
  { id: 'viernes', nombre: 'Viernes' },
  { id: 'sabado', nombre: 'Sábado' }
];

export const AgendaDocentesView: React.FC<AgendaDocentesViewProps> = ({
  docentes,
  asignaciones,
  cursos,
  espacios,
  preferenciasDocentes,
  escenarioActivoId
}) => {
  const [docenteSeleccionadoId, setDocenteSeleccionadoId] = useState<string>(
    docentes[0]?.uid || ''
  );

  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);
  const espaciosMap = useMemo(() => new Map(espacios.map((e) => [e.id, e])), [espacios]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);

  const docenteActual = docentesMap.get(docenteSeleccionadoId);

  // Asignaciones del docente en el escenario actual
  const asignacionesDocente = useMemo(() => {
    return asignaciones.filter(
      (a) =>
        a.escenario_id === escenarioActivoId &&
        a.profesores_ids?.includes(docenteSeleccionadoId) &&
        a.estatus !== 'cancelado'
    );
  }, [asignaciones, escenarioActivoId, docenteSeleccionadoId]);

  // Preferencia o restricciones del docente
  const preferenciaActual = useMemo(() => {
    return preferenciasDocentes.find((p) => p.profesor_id === docenteSeleccionadoId);
  }, [preferenciasDocentes, docenteSeleccionadoId]);

  // Calcular horas totales semanales
  const estadisticasCarga = useMemo(() => {
    let horasLic = 0;
    let horasPos = 0;

    asignacionesDocente.forEach((a) => {
      const hIni = parseInt(a.hora_inicio.split(':')[0], 10) + parseInt(a.hora_inicio.split(':')[1], 10) / 60;
      const hFin = parseInt(a.hora_fin.split(':')[0], 10) + parseInt(a.hora_fin.split(':')[1], 10) / 60;
      const duracion = Math.max(0, hFin - hIni);

      if (a.nivel_educativo === 'posgrado') {
        horasPos += duracion;
      } else {
        horasLic += duracion;
      }
    });

    return {
      horasLic: Math.round(horasLic * 10) / 10,
      horasPos: Math.round(horasPos * 10) / 10,
      horasTotales: Math.round((horasLic + horasPos) * 10) / 10
    };
  }, [asignacionesDocente]);

  // Exportar horario individual a PDF
  const handleExportarPDF = () => {
    if (!docenteActual) return;
    exportarHorarioPDF(
      `Horario Docente: ${docenteActual.nombre}`,
      `Periodo 2027-1 | Facultad de Ciencias Marinas UABC | Carga Semanal: ${estadisticasCarga.horasTotales} hrs`,
      asignacionesDocente,
      cursosMap,
      espaciosMap,
      docentesMap,
      `horario_${docenteActual.nombre.replace(/\s+/g, '_')}_2027_1.pdf`
    );
  };

  return (
    <div className="space-y-5">
      {/* Selector de Profesor y Tarjetas de Carga */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-600" />
              <span>Agenda y Carga Horaria Docente</span>
            </h2>
            <p className="text-xs text-slate-500">
              Visualización integrada de actividades docentes en Licenciatura y Posgrado
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              id="select-agenda-docente"
              value={docenteSeleccionadoId}
              onChange={(e) => setDocenteSeleccionadoId(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              {docentes.map((d) => (
                <option key={d.uid} value={d.uid}>
                  {d.nombre} ({d.academia_area || d.role})
                </option>
              ))}
            </select>

            <button
              onClick={handleExportarPDF}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF Docente</span>
            </button>
          </div>
        </div>

        {/* Resumen de horas y restricciones del docente */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-medium">Carga Semanal Total:</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {estadisticasCarga.horasTotales} hrs/sem
            </div>
            <p className="text-[10px] text-slate-400">Horas frente a grupo 2027-1</p>
          </div>

          <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
            <span className="text-sky-700 font-medium">Licenciatura:</span>
            <div className="text-xl font-bold text-sky-900 mt-0.5">
              {estadisticasCarga.horasLic} hrs
            </div>
            <p className="text-[10px] text-sky-600">Tronco Común y Carreras</p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="text-emerald-700 font-medium">Posgrado (EGA, MOC, DOC):</span>
            <div className="text-xl font-bold text-emerald-900 mt-0.5">
              {estadisticasCarga.horasPos} hrs
            </div>
            <p className="text-[10px] text-emerald-600">Seminarios y Asignaturas</p>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span className="text-amber-800 font-medium">Disponibilidad Docente:</span>
            <div className="text-xs font-semibold text-amber-900 mt-1 truncate">
              {preferenciaActual?.nivel_restriccion
                ? `Restricción: ${preferenciaActual.nivel_restriccion.replace('_', ' ')}`
                : 'Sin restricciones registradas'}
            </div>
            <p className="text-[10px] text-amber-700 truncate">
              {preferenciaActual?.dias_no_disponibles?.length
                ? `No disponible: ${preferenciaActual.dias_no_disponibles.join(', ')}`
                : 'Disponible toda la semana'}
            </p>
          </div>
        </div>
      </div>

      {/* Calendario Semanal del Docente */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-[#0f2d4a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Horario Asignado a: {docenteActual?.nombre}
            </h3>
          </div>
          <span className="text-xs text-sky-200">
            {asignacionesDocente.length} sesiones en total
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 min-h-[400px] p-3 bg-slate-50/40 gap-2">
          {DIAS_SEMANA.map((dia) => {
            const sesiones = asignacionesDocente
              .filter((a) => a.dia === dia.id)
              .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio));

            const esDiaNoDisponible = preferenciaActual?.dias_no_disponibles?.includes(dia.id);

            return (
              <div key={dia.id} className="space-y-2">
                <div className="text-center font-bold text-xs py-1.5 bg-slate-200/80 rounded text-slate-700 uppercase flex items-center justify-center gap-1">
                  <span>{dia.nombre}</span>
                  {esDiaNoDisponible && (
                    <span className="w-2 h-2 rounded-full bg-red-500" title="Día no disponible según encuesta docente" />
                  )}
                </div>

                {sesiones.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-[10px] text-slate-400 italic">
                    Sin clases
                  </div>
                ) : (
                  sesiones.map((asig) => {
                    const curso = cursosMap.get(asig.curso_id);
                    const espacio = espaciosMap.get(asig.espacio_id);
                    const esPos = asig.nivel_educativo === 'posgrado';

                    return (
                      <div
                        key={asig.id}
                        className={`p-2 rounded-lg border text-xs leading-tight shadow-xs ${
                          esPos
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                            : 'bg-sky-50 border-sky-300 text-sky-950'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {asig.hora_inicio} - {asig.hora_fin}
                          </span>
                        </div>

                        <div className="font-bold text-[11px] mb-1 truncate" title={curso?.nombre}>
                          {curso?.codigo} · {curso?.nombre}
                        </div>

                        <div className="text-[10px] text-slate-600 flex items-center gap-1 truncate mb-0.5">
                          <Building2 className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span className="truncate">
                            {espacio?.codigo || asig.espacio_codigo_snapshot} ({espacio?.nombre})
                          </span>
                        </div>

                        <div className="text-[9px] text-slate-500">
                          {asig.subgrupo_id ? `Subgrupo ${asig.subgrupo_id}` : asig.grupo_principal_id} · {asig.alumnos_programados} alumnos
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
  );
};
