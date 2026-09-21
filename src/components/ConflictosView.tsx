/**
 * Vista de Auditoría y Detección de Conflictos Horarios FCM 2027-1
 * Sección 11: Detección exhaustiva de traslapes y reglas de bloqueo
 */

import React, { useMemo } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Users,
  Clock,
  ShieldCheck,
  ArrowRight,
  Layers
} from 'lucide-react';
import {
  Asignacion,
  Espacio,
  Curso,
  Usuario,
  PreferenciaDocente,
  Conflicto,
  Escenario
} from '../types';
import { hayTraslapeHorario } from '../utils/conflicts';

interface ConflictosViewProps {
  asignaciones: Asignacion[];
  espacios: Espacio[];
  cursos: Curso[];
  docentes: Usuario[];
  preferenciasDocentes: PreferenciaDocente[];
  escenarioActivo: Escenario | undefined;
  onEditarAsignacion: (asignacion: Asignacion) => void;
}

export const ConflictosView: React.FC<ConflictosViewProps> = ({
  asignaciones,
  espacios,
  cursos,
  docentes,
  preferenciasDocentes,
  escenarioActivo,
  onEditarAsignacion
}) => {
  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);
  const espaciosMap = useMemo(() => new Map(espacios.map((e) => [e.id, e])), [espacios]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);

  // Auditoría exhaustiva de conflictos en el escenario activo
  const resultadosAuditoria = useMemo(() => {
    const conflictosEspacio: { asigA: Asignacion; asigB: Asignacion; espacio: Espacio; mensaje: string }[] = [];
    const conflictosDocente: { asigA: Asignacion; asigB: Asignacion; docente: Usuario; mensaje: string }[] = [];
    const advertenciasCapacidad: { asig: Asignacion; espacio: Espacio; exceso: number; mensaje: string }[] = [];
    const advertenciasDocentePref: { asig: Asignacion; docente: Usuario; tipo: string; mensaje: string }[] = [];

    const asignacionesActivas = asignaciones.filter(
      (a) => a.escenario_id === escenarioActivo?.id && a.estatus !== 'cancelado'
    );

    // 1. REGLA CRÍTICA 1: TRASLAPE DE ESPACIOS
    for (let i = 0; i < asignacionesActivas.length; i++) {
      for (let j = i + 1; j < asignacionesActivas.length; j++) {
        const a1 = asignacionesActivas[i];
        const a2 = asignacionesActivas[j];

        if (a1.espacio_id === a2.espacio_id && a1.dia === a2.dia) {
          if (hayTraslapeHorario(a1.hora_inicio, a1.hora_fin, a2.hora_inicio, a2.hora_fin)) {
            const esp = espaciosMap.get(a1.espacio_id);
            const c1 = cursosMap.get(a1.curso_id);
            const c2 = cursosMap.get(a2.curso_id);

            conflictosEspacio.push({
              asigA: a1,
              asigB: a2,
              espacio: esp || ({} as any),
              mensaje: `El espacio ${esp?.nombre || a1.espacio_id} (${esp?.codigo}) tiene dos sesiones traslapadas el ${a1.dia}: "${c1?.nombre}" (${a1.hora_inicio}-${a1.hora_fin}) y "${c2?.nombre}" (${a2.hora_inicio}-${a2.hora_fin}).`
            });
          }
        }
      }
    }

    // 2. REGLA CRÍTICA 2: TRASLAPE DE DOCENTES
    for (let i = 0; i < asignacionesActivas.length; i++) {
      for (let j = i + 1; j < asignacionesActivas.length; j++) {
        const a1 = asignacionesActivas[i];
        const a2 = asignacionesActivas[j];

        if (a1.dia === a2.dia) {
          // Revisar si comparten docentes
          const docentesComunes = (a1.profesores_ids || []).filter((id) =>
            (a2.profesores_ids || []).includes(id)
          );

          if (docentesComunes.length > 0) {
            if (hayTraslapeHorario(a1.hora_inicio, a1.hora_fin, a2.hora_inicio, a2.hora_fin)) {
              for (const docId of docentesComunes) {
                const doc = docentesMap.get(docId);
                const c1 = cursosMap.get(a1.curso_id);
                const c2 = cursosMap.get(a2.curso_id);

                conflictosDocente.push({
                  asigA: a1,
                  asigB: a2,
                  docente: doc || ({} as any),
                  mensaje: `El profesor ${doc?.nombre || docId} está asignado simultáneamente el ${a1.dia} a "${c1?.nombre}" (${a1.hora_inicio}-${a1.hora_fin}) y a "${c2?.nombre}" (${a2.hora_inicio}-${a2.hora_fin}).`
                });
              }
            }
          }
        }
      }
    }

    // 3. CAPACIDAD INSUFICIENTE
    for (const a of asignacionesActivas) {
      const esp = espaciosMap.get(a.espacio_id);
      if (esp && a.alumnos_programados > esp.capacidad_maxima) {
        const exceso = a.alumnos_programados - esp.capacidad_maxima;
        const c = cursosMap.get(a.curso_id);
        advertenciasCapacidad.push({
          asig: a,
          espacio: esp,
          exceso,
          mensaje: `Sobrecupo de ${exceso} alumnos en "${c?.nombre}": programados ${a.alumnos_programados}, capacidad de ${esp.nombre} es ${esp.capacidad_maxima}.`
        });
      }
    }

    // 4. COLISIÓN CON RESTRICCIONES DOCENTES
    for (const a of asignacionesActivas) {
      for (const docId of a.profesores_ids || []) {
        const pref = preferenciasDocentes.find((p) => p.profesor_id === docId);
        if (pref) {
          const doc = docentesMap.get(docId);
          const c = cursosMap.get(a.curso_id);

          if (pref.dias_no_disponibles && pref.dias_no_disponibles.includes(a.dia)) {
            advertenciasDocentePref.push({
              asig: a,
              docente: doc || ({} as any),
              tipo: pref.nivel_restriccion,
              mensaje: `El docente ${doc?.nombre} declaró el ${a.dia} como día no disponible (${pref.nivel_restriccion}), pero se le programó "${c?.nombre}".`
            });
          }

          if (pref.rangos_no_disponibles) {
            for (const r of pref.rangos_no_disponibles) {
              if (r.dia === a.dia && hayTraslapeHorario(a.hora_inicio, a.hora_fin, r.hora_inicio, r.hora_fin)) {
                advertenciasDocentePref.push({
                  asig: a,
                  docente: doc || ({} as any),
                  tipo: pref.nivel_restriccion,
                  mensaje: `El docente ${doc?.nombre} tiene franja bloqueada el ${a.dia} de ${r.hora_inicio} a ${r.hora_fin} (${r.motivo}), colisionando con "${c?.nombre}".`
                });
              }
            }
          }
        }
      }
    }

    return {
      conflictosEspacio,
      conflictosDocente,
      advertenciasCapacidad,
      advertenciasDocentePref,
      totalCriticos: conflictosEspacio.length + conflictosDocente.length,
      totalAdvertencias: advertenciasCapacidad.length + advertenciasDocentePref.length
    };
  }, [asignaciones, escenarioActivo, espaciosMap, cursosMap, docentesMap, preferenciasDocentes]);

  return (
    <div className="space-y-5">
      {/* Encabezado y Resumen */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0c2d48] flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            <span>Auditoría y Diagnóstico de Horarios FCM 2027-1</span>
          </h2>
          <p className="text-xs text-slate-500">
            Escenario evaluado: <span className="font-semibold text-slate-800">{escenarioActivo?.nombre}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
            <AlertOctagon className="w-4 h-4 text-red-600" />
            <span>{resultadosAuditoria.totalCriticos} Críticos Bloqueantes</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{resultadosAuditoria.totalAdvertencias} Advertencias</span>
          </div>
        </div>
      </div>

      {/* Si no hay conflictos */}
      {resultadosAuditoria.totalCriticos === 0 && resultadosAuditoria.totalAdvertencias === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-emerald-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Exclusividad y Coherencia Total Garantizada
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
            No se detectó ningún traslape de aula ni de profesor en el escenario activo. Todas las
            capacidades de salones y preferencias docentes se encuentran en cumplimiento.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* SECCIÓN 1: TRASLAPES CRÍTICOS DE ESPACIO */}
          {resultadosAuditoria.conflictosEspacio.length > 0 && (
            <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-red-50/80 border-b border-red-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-red-600" />
                  <span>Traslapes de Espacio / Aula Ocupada ({resultadosAuditoria.conflictosEspacio.length})</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-200 text-red-900">
                  BLOQUEANTE
                </span>
              </div>

              <div className="divide-y divide-red-100">
                {resultadosAuditoria.conflictosEspacio.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-red-900">{item.mensaje}</div>
                      <div className="text-[11px] text-slate-600">
                        Espacio: <span className="font-semibold">{item.espacio.codigo}</span> - {item.espacio.nombre}
                      </div>
                    </div>

                    <button
                      onClick={() => onEditarAsignacion(item.asigB)}
                      className="flex-shrink-0 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-2xs transition"
                    >
                      Reubicar Sesión
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN 2: TRASLAPES CRÍTICOS DE DOCENTES */}
          {resultadosAuditoria.conflictosDocente.length > 0 && (
            <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-red-50/80 border-b border-red-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
                  <Users className="w-4 h-4 text-red-600" />
                  <span>Docente en Dos Sesiones Simultáneas ({resultadosAuditoria.conflictosDocente.length})</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-200 text-red-900">
                  BLOQUEANTE
                </span>
              </div>

              <div className="divide-y divide-red-100">
                {resultadosAuditoria.conflictosDocente.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-red-900">{item.mensaje}</div>
                      <div className="text-[11px] text-slate-600">
                        Profesor: <span className="font-semibold">{item.docente.nombre}</span> ({item.docente.email})
                      </div>
                    </div>

                    <button
                      onClick={() => onEditarAsignacion(item.asigB)}
                      className="flex-shrink-0 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-2xs transition"
                    >
                      Ajustar Horario
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN 3: ADVERTENCIAS DE CAPACIDAD */}
          {resultadosAuditoria.advertenciasCapacidad.length > 0 && (
            <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-amber-50/80 border-b border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Capacidad Operativa Insuficiente ({resultadosAuditoria.advertenciasCapacidad.length})</span>
                </div>
              </div>

              <div className="divide-y divide-amber-100">
                {resultadosAuditoria.advertenciasCapacidad.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                    <div className="text-amber-900 font-medium">{item.mensaje}</div>
                    <button
                      onClick={() => onEditarAsignacion(item.asig)}
                      className="flex-shrink-0 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition"
                    >
                      Asignar Aula Mayor
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN 4: COLISIONES CON PREFERENCIAS DOCENTES */}
          {resultadosAuditoria.advertenciasDocentePref.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Avisos de Disponibilidad y Preferencias Docentes ({resultadosAuditoria.advertenciasDocentePref.length})</span>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {resultadosAuditoria.advertenciasDocentePref.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-0.5">
                      <div className="text-slate-800 font-medium">{item.mensaje}</div>
                      <span className="inline-block text-[10px] px-2 py-0.2 rounded bg-slate-100 text-slate-600 border font-semibold">
                        Prioridad: {item.tipo.replace('_', ' ')}
                      </span>
                    </div>

                    <button
                      onClick={() => onEditarAsignacion(item.asig)}
                      className="flex-shrink-0 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg border border-slate-300 transition"
                    >
                      Revisar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
