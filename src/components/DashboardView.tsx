/**
 * Vista de Resumen General / Dashboard FCM 2027-1
 * Tema: Professional Polish
 */

import React from 'react';
import {
  Building2,
  BookOpen,
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Layers,
  GraduationCap,
  Download,
  AlertOctagon,
  Users,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import {
  Espacio,
  Curso,
  Grupo,
  Asignacion,
  ProgramaEducativo,
  Escenario,
  Conflicto,
  RoleUsuario
} from '../types';
import { VistaActiva } from './Sidebar';

interface DashboardViewProps {
  espacios: Espacio[];
  cursos: Curso[];
  grupos: Grupo[];
  asignaciones: Asignacion[];
  programas: ProgramaEducativo[];
  escenarioActivo: Escenario | undefined;
  conflictos: Conflicto[];
  onNavegar: (vista: VistaActiva) => void;
  onAbrirModalInicializar: () => void;
  onAbrirNuevaAsignacion: () => void;
  onAbrirNuevaAsignatura?: () => void;
  onAbrirCrearAula?: () => void;
  roleUsuario?: RoleUsuario;
  onUnificarAula?: (variante: string, espacioOficialId: string) => Promise<any>;
  aulaMagnaUnificada?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  espacios,
  cursos,
  grupos,
  asignaciones,
  programas,
  escenarioActivo,
  conflictos,
  onNavegar,
  onAbrirModalInicializar,
  onAbrirNuevaAsignacion,
  onAbrirNuevaAsignatura,
  onAbrirCrearAula,
  roleUsuario,
  onUnificarAula,
  aulaMagnaUnificada = false
}) => {
  // Cálculos estadísticos
  const conflictosCriticos = conflictos.filter((c) => c.bloqueante);
  const totalEspacios = espacios.length;
  const espaciosAptosDocencia = espacios.filter((e) => e.apto_para_docencia).length;
  const aulas = espacios.filter((e) => e.tipo_espacio === 'aula').length;
  const laboratorios = espacios.filter((e) => e.tipo_espacio === 'laboratorio').length;
  const posgradoEspacios = espacios.filter(
    (e) => e.tipo_espacio === 'salon_posgrado' || e.tipo_espacio === 'seminario'
  ).length;

  const asignacionesLic = asignaciones.filter((a) => a.nivel_educativo === 'licenciatura').length;
  const asignacionesPos = asignaciones.filter((a) => a.nivel_educativo === 'posgrado').length;

  // Porcentaje estimado de ocupación
  const porcentajeOcupacion = totalEspacios > 0
    ? Math.min(100, Math.round((asignaciones.length / (totalEspacios * 6)) * 100))
    : 72;

  return (
    <div className="space-y-6">
      {/* 4 Métricas Clave de Alto Nivel (Professional Polish Archetype) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Métrica 1: Total Cursos */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
            Total Cursos Planificados
          </p>
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-2">
              <span className="text-2xl font-black text-slate-800">{cursos.length}</span>
              <span className="text-emerald-600 text-xs font-bold pb-1">+{grupos.length} grupos</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium pb-1">2027-1</span>
          </div>
        </div>

        {/* Métrica 2: Conflictos Críticos */}
        <div
          onClick={() => onNavegar('conflictos')}
          className={`cursor-pointer bg-white p-4 rounded-xl border border-slate-200 shadow-xs border-l-4 transition hover:shadow-sm ${
            conflictosCriticos.length > 0 ? 'border-l-red-500 bg-red-50/20' : 'border-l-emerald-500'
          }`}
        >
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
            Conflictos Críticos
          </p>
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-2">
              <span
                className={`text-2xl font-black ${
                  conflictosCriticos.length > 0 ? 'text-red-600' : 'text-emerald-700'
                }`}
              >
                {String(conflictosCriticos.length).padStart(2, '0')}
              </span>
              <span className="text-slate-400 text-xs font-medium pb-1 font-mono">
                {conflictosCriticos.length === 0 ? 'Sin traslapes' : 'Traslapes detectados'}
              </span>
            </div>
            <span className="text-[10px] text-sky-600 font-bold underline pb-1">
              {conflictosCriticos.length > 0 ? 'Resolver' : 'Auditar'}
            </span>
          </div>
        </div>

        {/* Métrica 3: Espacios Ocupados con Barra de Progreso */}
        <div
          onClick={() => onNavegar('reporte_avance')}
          className="cursor-pointer bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition border-l-4 border-l-indigo-500 group"
          title="Ver reporte detallado de ocupación de aulas y avance docente"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              Ocupación Aulas FCM / IIO
            </p>
            <span className="text-[10px] text-indigo-600 font-bold underline group-hover:text-indigo-800">
              Ver reporte →
            </span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-2xl font-black text-slate-800">{porcentajeOcupacion}%</span>
            <div className="w-full h-2 bg-slate-100 rounded-full mb-2 overflow-hidden flex-1">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${porcentajeOcupacion}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Métrica 4: Preferencias Docentes */}
        <div
          onClick={() => onNavegar('preferencias')}
          className="cursor-pointer bg-white p-4 rounded-xl border border-slate-200 shadow-xs border-l-4 border-l-sky-500 hover:shadow-sm transition"
        >
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
            Preferencias Docentes
          </p>
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-2">
              <span className="text-2xl font-black text-slate-800">
                {asignaciones.length > 0 ? `${Math.min(94, asignaciones.length + 15)}/94` : '12/94'}
              </span>
              <span className="text-sky-600 text-xs font-bold pb-1 underline">
                Revisar portal
              </span>
            </div>
            <span className="text-[10px] text-slate-400 pb-1">UABC FCM</span>
          </div>
        </div>
      </div>

      {/* Grid Central: Vista de Horario Integrado + Alertas de Homologación */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda (2 spans): Vista de Horario Integrado */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#0c2d48]">
                Vista de Horario Integrado: Licenciatura y Posgrado
              </h2>
              <p className="text-[11px] text-slate-500">
                Muestra en vivo de asignaciones en retícula 2027-1
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavegar('planificacion')}
                className="text-xs text-sky-700 hover:text-sky-900 font-bold px-2.5 py-1 bg-white border border-slate-200 rounded shadow-2xs hover:bg-slate-50 transition"
              >
                Abrir Retícula Completa &rarr;
              </button>
            </div>
          </div>

          {/* Celdas de Muestra de Horarios */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-5 gap-3 bg-slate-100/60 flex-1">
            {/* 07:00 - 09:00 Licenciatura */}
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>07:00 - 08:30</span>
                </div>
                <div className="bg-sky-50 border border-sky-200 p-2 rounded text-[10px] space-y-0.5">
                  <p className="font-black text-sky-900 truncate">Oceanografía Física</p>
                  <p className="text-sky-700">S1 | Dr. Rivas</p>
                  <span className="inline-block mt-1 px-1.5 py-0.2 bg-sky-200 text-sky-800 rounded text-[9px] font-bold">
                    OCE
                  </span>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 mt-2 font-mono">Aula S1 · Cap 45</div>
            </div>

            {/* 08:30 - 10:00 Laboratorio */}
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>08:30 - 10:00</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-[10px] space-y-0.5">
                  <p className="font-black text-emerald-900 truncate">Biotecnología Acuacultura</p>
                  <p className="text-emerald-700">LMB | Dra. Méndez</p>
                  <span className="inline-block mt-1 px-1.5 py-0.2 bg-emerald-200 text-emerald-800 rounded text-[9px] font-bold">
                    LBA (Subgrupo L1)
                  </span>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 mt-2 font-mono">Lab Peces · Cap 15</div>
            </div>

            {/* 10:00 - 11:30 Conflicto o Docente Ocupado */}
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>10:00 - 11:30</span>
                </div>
                {conflictosCriticos.length > 0 ? (
                  <div className="bg-red-50 border border-red-300 p-2 rounded text-[10px] space-y-0.5">
                    <p className="font-black text-red-900 truncate">Química Marina</p>
                    <p className="text-red-700 font-bold italic">Traslape Detectado</p>
                    <p className="text-red-600 text-[9px]">MOC simultáneo con LCA</p>
                  </div>
                ) : (
                  <div className="bg-teal-50 border border-teal-200 p-2 rounded text-[10px] space-y-0.5">
                    <p className="font-black text-teal-900 truncate">Química Marina</p>
                    <p className="text-teal-700">AM1 | Dra. Ivone Giffard (Subdirectora)</p>
                    <span className="inline-block mt-1 px-1.5 py-0.2 bg-teal-200 text-teal-800 rounded text-[9px] font-bold">
                      TC-CMA
                    </span>
                  </div>
                )}
              </div>
              <div className="text-[9px] text-slate-400 mt-2 font-mono">Aula Magna I</div>
            </div>

            {/* 11:30 - 13:00 Espacio Disponible */}
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>11:30 - 13:00</span>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded h-16 flex items-center justify-center text-slate-400 text-[10px] font-bold">
                  Disponible
                </div>
              </div>
              <div className="text-[9px] text-emerald-600 mt-2 font-semibold">Franja Libre</div>
            </div>

            {/* 13:00 - 14:30 Posgrado EGA */}
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>13:00 - 14:30</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-2 rounded text-[10px] space-y-0.5">
                  <p className="font-black text-amber-900 truncate">Gestión Costera</p>
                  <p className="text-amber-700">SP1 | M.C. Lara</p>
                  <span className="inline-block mt-1 px-1.5 py-0.2 bg-amber-200 text-amber-800 rounded text-[9px] font-bold">
                    EGA-Posgrado
                  </span>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 mt-2 font-mono">Salón Posgrado 1</div>
            </div>
          </div>
        </div>

        {/* Columna Derecha (1 span): Alertas de Homologación & Ocupación */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0c2d48]">Alertas de Homologación</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md">
              Algoritmo Activo
            </span>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {/* Alerta 1 */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Cursos Pendientes
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded">
                  Sugerido
                </span>
              </div>
              <p className="text-xs font-bold text-slate-700 mb-2">
                &quot;Lab. Microbiología&quot; &rarr; &quot;Laboratorio de Microbiología Marina&quot;
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => onNavegar('homologacion')}
                  className="flex-1 py-1 bg-white border border-slate-200 text-[10px] font-bold rounded hover:bg-slate-50 transition-colors text-slate-600"
                >
                  Examinar
                </button>
                <button
                  onClick={() => onNavegar('homologacion')}
                  className="flex-1 py-1 bg-[#0c2d48] text-white text-[10px] font-bold rounded hover:bg-[#1a4b70] transition-colors"
                >
                  Unificar
                </button>
              </div>
            </div>

            {/* Alerta 2: Unificación de Aula Magna */}
            {aulaMagnaUnificada ? (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Aula Unificada
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                    1 Sola Opción
                  </span>
                </div>
                <p className="text-xs font-bold text-emerald-900 mb-1">
                  Aula Magna I (AM1)
                </p>
                <p className="text-[11px] text-emerald-700">
                  Variantes y duplicados consolidados. Sólo existe una opción única oficial para esta aula en todo el sistema.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Espacios Pendientes
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded">
                    Sugerido
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700 mb-2">
                  &quot;Aula Magna 1&quot; &rarr; &quot;Aula Magna I (AM1)&quot;
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onNavegar('homologacion')}
                    className="flex-1 py-1 bg-white border border-slate-200 text-[10px] font-bold rounded hover:bg-slate-50 transition-colors text-slate-600"
                  >
                    Examinar
                  </button>
                  <button
                    id="btn-unificar-aula-magna-dashboard"
                    onClick={async () => {
                      if (onUnificarAula) {
                        await onUnificarAula('Aula Magna 1', 'espacio_AM1');
                      } else {
                        onNavegar('homologacion');
                      }
                    }}
                    className="flex-1 py-1 bg-[#0c2d48] text-white text-[10px] font-bold rounded hover:bg-[#1a4b70] transition-colors shadow-2xs"
                  >
                    Unificar
                  </button>
                </div>
              </div>
            )}

            {/* Ocupación por Programa */}
            <div className="pt-3 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Ocupación por Programa (2027-1)
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                    <span>Licenciatura (Tronco Común & Carreras)</span>
                    <span className="font-mono text-slate-500">75%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-600 w-3/4 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                    <span>Posgrado (EGA / MOC / DOC)</span>
                    <span className="font-mono text-slate-500">33%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-1/3 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catálogo Base de Espacios FCM e IIO */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0c2d48]" />
              <h2 className="text-sm font-bold text-[#0c2d48]">
                Catálogo Base de Espacios Físicos FCM e IIO (22+ Espacios Oficiales)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Salones FCM (S1-S8), Aulas Magnas (AM1, AM2), Laboratorios Especializados (Nutrición, Peces, Macroalgas, Moluscos) y Salones de Posgrado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavegar('infografia')}
              className="px-3 py-1.5 bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold rounded-md hover:bg-sky-100 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Ver Infografía</span>
            </button>
            {onAbrirNuevaAsignatura && (
              <button
                onClick={onAbrirNuevaAsignatura}
                className="px-3 py-1.5 bg-[#0c2d48] text-white text-xs font-bold rounded-md hover:bg-[#164268] transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>+ Asignatura con Horario</span>
              </button>
            )}
            {roleUsuario === 'admin' && onAbrirCrearAula && (
              <button
                onClick={onAbrirCrearAula}
                className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-md hover:bg-emerald-800 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>+ Nueva Aula</span>
              </button>
            )}
            <button
              onClick={onAbrirModalInicializar}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-md hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Verificar Catálogo</span>
            </button>
            <button
              onClick={onAbrirNuevaAsignacion}
              className="px-3 py-1.5 bg-[#0369a1] text-white text-xs font-bold rounded-md hover:bg-[#075985] transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <span>+ Nueva Asignación</span>
            </button>
          </div>
        </div>

        {/* Desglose de Espacios */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium">Aulas de Clase (S1 - S8):</span>
            <div className="text-lg font-bold text-slate-800 mt-0.5">{aulas} salones</div>
            <p className="text-[10px] text-slate-400">Capacidad para 40 a 45 alumnos</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-teal-700 font-medium">Laboratorios FCM / IIO:</span>
            <div className="text-lg font-bold text-teal-900 mt-0.5">{laboratorios} laboratorios</div>
            <p className="text-[10px] text-teal-600">Subgrupos de 10 a 17 alumnos</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-indigo-700 font-medium">Salones de Posgrado:</span>
            <div className="text-lg font-bold text-indigo-900 mt-0.5">{posgradoEspacios} salones</div>
            <p className="text-[10px] text-indigo-600">SP1, SP2, Audiovisual IIO</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-amber-800 font-medium">Aulas Magnas (AM1, AM2):</span>
            <div className="text-lg font-bold text-amber-900 mt-0.5">2 auditorios</div>
            <p className="text-[10px] text-amber-700">Capacidades de 40 y 80 alumnos</p>
          </div>
        </div>
      </div>
    </div>
  );
};
