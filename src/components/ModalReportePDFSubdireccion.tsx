/**
 * Modal de Configuración y Descarga del Reporte PDF Oficial de Planeación Académica
 * Diseñado especialmente para la Subdirección Académica FCM (Dra. Ivone Giffard)
 * Permite revisión offline de horarios, asignaturas y aulas asignadas
 */

import React, { useState, useMemo } from 'react';
import {
  FileDown,
  X,
  FileText,
  CheckCircle2,
  Calendar,
  Building2,
  Users,
  GraduationCap,
  Filter,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import {
  Asignacion,
  Espacio,
  Curso,
  Usuario,
  ProgramaEducativo
} from '../types';
import { generarReportePDFSubdireccion } from '../utils/reportePdfSubdireccion';

interface ModalReportePDFSubdireccionProps {
  isOpen: boolean;
  onClose: () => void;
  asignaciones: Asignacion[];
  cursos: Curso[];
  espacios: Espacio[];
  docentes: Usuario[];
  programas: ProgramaEducativo[];
  escenarioActivoNombre?: string;
  periodoId?: string;
}

export const ModalReportePDFSubdireccion: React.FC<ModalReportePDFSubdireccionProps> = ({
  isOpen,
  onClose,
  asignaciones,
  cursos,
  espacios,
  docentes,
  programas,
  escenarioActivoNombre = 'Propuesta Oficial',
  periodoId = '2027-1'
}) => {
  const [filtroPrograma, setFiltroPrograma] = useState<string>('todos');
  const [filtroNivel, setFiltroNivel] = useState<'todos' | 'licenciatura' | 'posgrado'>('todos');
  const [incluirResumen, setIncluirResumen] = useState<boolean>(true);
  const [incluirAulas, setIncluirAulas] = useState<boolean>(true);
  const [generando, setGenerando] = useState<boolean>(false);
  const [descargaExitosa, setDescargaExitosa] = useState<boolean>(false);

  // Filtrado reactivo para mostrar previsualización de datos incluidos
  const asignacionesFiltradas = useMemo(() => {
    return asignaciones.filter((a) => {
      if (filtroPrograma !== 'todos' && !a.programas_ids?.includes(filtroPrograma)) {
        return false;
      }
      if (filtroNivel !== 'todos' && a.nivel_educativo !== filtroNivel) {
        return false;
      }
      return true;
    });
  }, [asignaciones, filtroPrograma, filtroNivel]);

  // Métricas rápidas de la selección
  const metricas = useMemo(() => {
    const cursosSet = new Set(asignacionesFiltradas.map((a) => a.curso_id));
    const docentesSet = new Set<string>();
    let horasTotales = 0;
    let horasConDocente = 0;

    asignacionesFiltradas.forEach((a) => {
      const [hIni, mIni] = (a.hora_inicio || '08:00').split(':').map(Number);
      const [hFin, mFin] = (a.hora_fin || '10:00').split(':').map(Number);
      const dur = Math.max(1, (hFin * 60 + mFin - (hIni * 60 + mIni)) / 60);
      horasTotales += dur;

      if (a.profesor_principal_id && a.profesor_principal_id !== 'sin_asignar') {
        horasConDocente += dur;
        docentesSet.add(a.profesor_principal_id);
      }
      a.profesores_ids?.forEach((pid) => docentesSet.add(pid));
    });

    const aulasSet = new Set(asignacionesFiltradas.map((a) => a.espacio_id));

    return {
      totalSesiones: asignacionesFiltradas.length,
      totalCursos: cursosSet.size,
      totalDocentes: docentesSet.size,
      totalAulas: aulasSet.size,
      horasTotales,
      coberturaPct: horasTotales > 0 ? Math.round((horasConDocente / horasTotales) * 100) : 100
    };
  }, [asignacionesFiltradas]);

  if (!isOpen) return null;

  const handleDescargar = () => {
    setGenerando(true);
    setDescargaExitosa(false);

    setTimeout(() => {
      try {
        const progNombre =
          filtroPrograma !== 'todos'
            ? programas.find((p) => p.id === filtroPrograma)?.nombre || filtroPrograma
            : 'General';

        const nombreLimpio = `reporte_planeacion_fcm_${periodoId.replace('-', '_')}_${progNombre.replace(/\s+/g, '_').toLowerCase()}`;

        generarReportePDFSubdireccion(
          asignacionesFiltradas,
          cursos,
          espacios,
          docentes,
          programas,
          {
            periodoId,
            escenarioNombre: escenarioActivoNombre,
            incluirResumenEjecutivo: incluirResumen,
            incluirEstadisticasAulas: incluirAulas,
            incluirListaCompleta: true,
            filtroProgramaId: 'todos', // Ya prefiltradas
            filtroNivel: 'todos',
            nombreArchivo: `${nombreLimpio}.pdf`
          }
        );

        setDescargaExitosa(true);
      } catch (err) {
        console.error('Error al generar PDF de planeación:', err);
      } finally {
        setGenerando(false);
      }
    }, 150);
  };

  return (
    <div
      id="modal-reporte-pdf-subdireccion"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal con Membrete FCM */}
        <div className="bg-[#0f2d4a] px-6 py-5 text-white flex items-start justify-between relative border-b-2 border-amber-500">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] tracking-wider uppercase">
                Subdirección Académica
              </span>
              <span className="text-amber-400 font-bold text-xs">FCM · UABC</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Reporte Oficial de Planeación Académica (PDF)
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Generación de informe consolidado con horarios, asignaturas y aulas para revisión offline.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 space-y-5">
          {/* Tarjeta de Métricas Rápidas del Documento a Generar */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Alcance de la Revisión ({escenarioActivoNombre})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-semibold block">Clases / Sesiones</span>
                <span className="text-lg font-black text-slate-800">{metricas.totalSesiones}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-semibold block">Materias Activas</span>
                <span className="text-lg font-black text-slate-800">{metricas.totalCursos}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-semibold block">Aulas / Labs</span>
                <span className="text-lg font-black text-slate-800">{metricas.totalAulas}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-semibold block">Cobertura Docente</span>
                <span className="text-lg font-black text-emerald-700">{metricas.coberturaPct}%</span>
              </div>
            </div>
          </div>

          {/* Filtros de Alcance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                Programa Educativo
              </label>
              <select
                value={filtroPrograma}
                onChange={(e) => setFiltroPrograma(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-hidden font-medium"
              >
                <option value="todos">Todos los Programas (Planeación Global FCM)</option>
                {programas.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.id} - {prog.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                Nivel Académico
              </label>
              <select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value as any)}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-hidden font-medium"
              >
                <option value="todos">Ambos Niveles (Licenciatura y Posgrado)</option>
                <option value="licenciatura">Únicamente Licenciatura</option>
                <option value="posgrado">Únicamente Posgrados (MOC, DOC, EGA)</option>
              </select>
            </div>
          </div>

          {/* Opciones de Secciones a Incluir en el PDF */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Secciones del Documento PDF:
            </span>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={incluirResumen}
                onChange={(e) => setIncluirResumen(e.target.checked)}
                className="mt-0.5 rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">
                  Resumen Ejecutivo y Balance por Carrera
                </span>
                <span className="text-slate-500 text-[11px]">
                  Incluye indicadores clave de cobertura docente, total de horas de docencia y tabla sintética por programa académico.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={incluirAulas}
                onChange={(e) => setIncluirAulas(e.target.checked)}
                className="mt-0.5 rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">
                  Matriz de Uso y Ocupación de Aulas (FCM / IIO)
                </span>
                <span className="text-slate-500 text-[11px]">
                  Diagnóstico de saturación física por espacio, porcentaje de horas ocupadas a la semana y capacidad por edificio.
                </span>
              </div>
            </label>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 flex items-center justify-between">
              <span className="font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Catálogo Detallado de Horarios, Materias y Aulas (Siempre incluido)
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Obligatorio</span>
            </div>
          </div>

          {descargaExitosa && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>¡Reporte generado con éxito!</strong> El archivo PDF se ha descargado a su dispositivo para su revisión y archivo.
              </span>
            </div>
          )}
        </div>

        {/* Pie de Acciones del Modal */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Formato oficial A4 apaisado compatible con cualquier lector PDF o impresión.
          </p>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
            >
              Cerrar
            </button>
            <button
              id="btn-confirmar-descarga-pdf"
              onClick={handleDescargar}
              disabled={generando || metricas.totalSesiones === 0}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0f2d4a] hover:bg-[#091b2c] text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generando ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Compilando PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-amber-400" />
                  <span>Descargar Reporte PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
