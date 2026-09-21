/**
 * Componente ReporteAvanceView
 * Visualización ejecutiva del porcentaje de asignación de horas docentes por departamento
 * y el nivel de ocupación de las aulas para la toma de decisiones de la Subdirección FCM.
 * Desarrollado con Recharts y Tailwind CSS.
 */

import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';
import {
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Printer,
  Download,
  Filter,
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
  AlertCircle,
  BarChart3,
  Search,
  FileDown
} from 'lucide-react';
import {
  ProgramaEducativo,
  Curso,
  Grupo,
  Asignacion,
  Espacio,
  Usuario,
  DiaSemana
} from '../types';
import { VistaActiva } from './Sidebar';
import { ModalReportePDFSubdireccion } from './ModalReportePDFSubdireccion';

interface ReporteAvanceViewProps {
  programas: ProgramaEducativo[];
  cursos: Curso[];
  grupos: Grupo[];
  asignaciones: Asignacion[];
  espacios: Espacio[];
  docentes: Usuario[];
  escenarioActivoId: string;
  onNavegarVista?: (vista: VistaActiva) => void;
  onSeleccionarAula?: (aulaId: string) => void;
}

// Convertir hora HH:MM a minutos para cálculo exacto de duraciones
const horaAMinutos = (hora: string): number => {
  if (!hora) return 0;
  const [h, m] = hora.split(':').map((v) => parseInt(v, 10) || 0);
  return h * 60 + m;
};

const duracionHoras = (inicio: string, fin: string): number => {
  const min = horaAMinutos(fin) - horaAMinutos(inicio);
  return min > 0 ? min / 60 : 2; // Por defecto 2 horas si falta dato
};

export const ReporteAvanceView: React.FC<ReporteAvanceViewProps> = ({
  programas,
  cursos,
  grupos,
  asignaciones,
  espacios,
  docentes,
  escenarioActivoId,
  onNavegarVista,
  onSeleccionarAula
}) => {
  // Filtros de control
  const [agrupacionDocente, setAgrupacionDocente] = useState<'programa' | 'academia'>('programa');
  const [filtroNivel, setFiltroNivel] = useState<'todos' | 'licenciatura' | 'posgrado'>('todos');
  const [filtroTipoEspacio, setFiltroTipoEspacio] = useState<string>('todos');
  const [filtroEdificio, setFiltroEdificio] = useState<string>('todos');
  const [ordenAulas, setOrdenAulas] = useState<'ocupacion_desc' | 'ocupacion_asc' | 'codigo'>('ocupacion_desc');
  const [busquedaAula, setBusquedaAula] = useState<string>('');
  const [tabDetalleActivo, setTabDetalleActivo] = useState<'departamentos' | 'aulas' | 'recomendaciones'>('departamentos');
  const [mostrarModalPDF, setMostrarModalPDF] = useState<boolean>(false);

  // Mapa rápido de docentes y cursos
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);
  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);

  // 1. Filtrar asignaciones por escenario activo
  const asignacionesEscenario = useMemo(() => {
    return asignaciones.filter((a) => a.escenario_id === escenarioActivoId);
  }, [asignaciones, escenarioActivoId]);

  // 2. Cálculo de Horas Docentes por Departamento / Programa
  const metricasDocentesPorPrograma = useMemo(() => {
    return programas.map((prog) => {
      // Cursos activos de este programa
      const cursosProg = cursos.filter((c) => c.programas_ids?.includes(prog.id) && c.activo);
      const cursosProgIds = new Set(cursosProg.map((c) => c.id));

      // Asignaciones de este programa
      const asigsProg = asignacionesEscenario.filter(
        (a) => a.programas_ids?.includes(prog.id) || cursosProgIds.has(a.curso_id)
      );

      let horasConDocente = 0;
      let horasSinDocente = 0;
      const cursosSinDocenteSet = new Set<string>();

      asigsProg.forEach((a) => {
        const dur = duracionHoras(a.hora_inicio, a.hora_fin);
        const tieneDocente = a.profesor_principal_id && a.profesor_principal_id !== 'sin_asignar';
        if (tieneDocente) {
          horasConDocente += dur;
        } else {
          horasSinDocente += dur;
          if (a.curso_id) cursosSinDocenteSet.add(a.curso_id);
        }
      });

      const horasTotalesProgramadas = horasConDocente + horasSinDocente;
      // Horas curriculares estimadas (según plan de estudios del catálogo de cursos)
      const horasCurricularesPlan = cursosProg.reduce((acc, c) => acc + (c.horas_totales_semana || 4), 0);
      const horasBase = Math.max(horasTotalesProgramadas, horasCurricularesPlan);

      const porcentajeAsignacion = horasBase > 0
        ? Math.min(100, Math.round((horasConDocente / horasBase) * 100))
        : (horasTotalesProgramadas > 0 ? 100 : 0);

      // Profesores participantes en este programa
      const docentesAsignadosSet = new Set<string>();
      asigsProg.forEach((a) => {
        if (a.profesor_principal_id) docentesAsignadosSet.add(a.profesor_principal_id);
        a.profesores_ids?.forEach((pid) => docentesAsignadosSet.add(pid));
      });

      return {
        id: prog.id,
        nombre: prog.nombre,
        codigo: prog.id,
        nivel: prog.nivel_educativo,
        horasConDocente,
        horasSinDocente,
        horasTotalesProgramadas,
        horasBase,
        porcentajeAsignacion,
        totalCursos: cursosProg.length,
        cursosSinDocente: Array.from(cursosSinDocenteSet).map((cid) => cursosMap.get(cid)?.nombre || cid),
        numDocentes: docentesAsignadosSet.size,
        estado: porcentajeAsignacion >= 95 ? 'completo' : porcentajeAsignacion >= 75 ? 'bueno' : 'requiere_atencion'
      };
    });
  }, [programas, cursos, asignacionesEscenario, cursosMap]);

  // 2b. Cálculo por Academia / Área Docente
  const metricasPorAcademia = useMemo(() => {
    const areasMap = new Map<string, { docentes: Usuario[]; horasConDocente: number; horasTotales: number }>();

    // Inicializar áreas a partir de los docentes registrados
    docentes.forEach((d) => {
      const area = d.academia_area || 'Área General / Sin Especificar';
      if (!areasMap.has(area)) {
        areasMap.set(area, { docentes: [], horasConDocente: 0, horasTotales: 0 });
      }
      areasMap.get(area)!.docentes.push(d);
    });

    asignacionesEscenario.forEach((a) => {
      const dur = duracionHoras(a.hora_inicio, a.hora_fin);
      const prof = a.profesor_principal_id ? docentesMap.get(a.profesor_principal_id) : null;
      const area = prof?.academia_area || 'Área General / Sin Especificar';

      if (!areasMap.has(area)) {
        areasMap.set(area, { docentes: [], horasConDocente: 0, horasTotales: 0 });
      }
      const entry = areasMap.get(area)!;
      entry.horasTotales += dur;
      if (prof) {
        entry.horasConDocente += dur;
      }
    });

    return Array.from(areasMap.entries())
      .filter(([area]) => area !== 'Área General / Sin Especificar' || areasMap.get(area)!.horasTotales > 0)
      .map(([area, data]) => {
        const pct = data.horasTotales > 0 ? Math.round((data.horasConDocente / data.horasTotales) * 100) : 100;
        return {
          id: area,
          codigo: area.length > 22 ? area.substring(0, 20) + '...' : area,
          nombre: area,
          horasConDocente: data.horasConDocente,
          horasSinDocente: Math.max(0, data.horasTotales - data.horasConDocente),
          horasTotalesProgramadas: data.horasTotales,
          porcentajeAsignacion: pct,
          numDocentes: data.docentes.length
        };
      })
      .sort((a, b) => b.horasTotalesProgramadas - a.horasTotalesProgramadas);
  }, [docentes, asignacionesEscenario, docentesMap]);

  // Datos seleccionados para el gráfico de barras docente
  const datosGraficoDocentes = useMemo(() => {
    if (agrupacionDocente === 'programa') {
      return metricasDocentesPorPrograma.filter((p) => {
        if (filtroNivel === 'todos') return true;
        return p.nivel === filtroNivel;
      });
    }
    return metricasPorAcademia;
  }, [agrupacionDocente, metricasDocentesPorPrograma, metricasPorAcademia, filtroNivel]);

  // 3. Cálculo de Nivel de Ocupación de las Aulas (Espacios Físicos)
  // Base de cálculo semanal: 60 horas hábiles regulares (Lunes a Viernes 07:00 a 19:00 = 12 hrs/día x 5 días)
  const HORAS_HABIL_SEMANALES = 60;

  const metricasAulas = useMemo(() => {
    return espacios
      .filter((e) => e.apto_para_docencia !== false && e.activo !== false)
      .map((e) => {
        const asigsEspacio = asignacionesEscenario.filter((a) => a.espacio_id === e.id);
        const horasOcupadas = asigsEspacio.reduce(
          (acc, a) => acc + duracionHoras(a.hora_inicio, a.hora_fin),
          0
        );

        const porcentajeOcupacion = Math.min(
          100,
          Math.round((horasOcupadas / HORAS_HABIL_SEMANALES) * 100)
        );

        // Promedio de alumnos y uso de cupo
        const totalAlumnos = asigsEspacio.reduce((acc, a) => acc + (a.alumnos_programados || 0), 0);
        const promedioAlumnos = asigsEspacio.length > 0 ? Math.round(totalAlumnos / asigsEspacio.length) : 0;
        const porcentajeCupo = e.capacidad_maxima > 0
          ? Math.min(100, Math.round((promedioAlumnos / e.capacidad_maxima) * 100))
          : 0;

        // Distribución por turno
        let horasMatutino = 0; // 07:00 - 13:00
        let horasVespertino = 0; // 13:00 - 19:00

        asigsEspacio.forEach((a) => {
          const dur = duracionHoras(a.hora_inicio, a.hora_fin);
          const iniMin = horaAMinutos(a.hora_inicio);
          if (iniMin < 13 * 60) {
            horasMatutino += dur;
          } else {
            horasVespertino += dur;
          }
        });

        // Estado de saturación
        let estadoSaturacion: 'saturada' | 'optima' | 'disponible' = 'optima';
        if (porcentajeOcupacion >= 75) {
          estadoSaturacion = 'saturada';
        } else if (porcentajeOcupacion < 35) {
          estadoSaturacion = 'disponible';
        }

        return {
          id: e.id,
          codigo: e.codigo,
          nombre: e.nombre,
          edificio: e.edificio || 'Campus',
          edificio_codigo: e.edificio_codigo || e.edificio,
          tipo_espacio: e.tipo_espacio,
          categoria: e.categoria,
          capacidad: e.capacidad_maxima,
          horasOcupadas,
          horasDisponibles: Math.max(0, HORAS_HABIL_SEMANALES - horasOcupadas),
          porcentajeOcupacion,
          promedioAlumnos,
          porcentajeCupo,
          numSesiones: asigsEspacio.length,
          horasMatutino,
          horasVespertino,
          estadoSaturacion
        };
      });
  }, [espacios, asignacionesEscenario]);

  // Aulas filtradas y ordenadas
  const aulasFiltradas = useMemo(() => {
    return metricasAulas
      .filter((a) => {
        if (filtroTipoEspacio !== 'todos' && a.tipo_espacio !== filtroTipoEspacio) return false;
        if (filtroEdificio !== 'todos' && a.edificio !== filtroEdificio && a.edificio_codigo !== filtroEdificio) return false;
        if (busquedaAula) {
          const q = busquedaAula.toLowerCase();
          return a.codigo.toLowerCase().includes(q) || a.nombre.toLowerCase().includes(q) || a.edificio.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (ordenAulas === 'ocupacion_desc') return b.porcentajeOcupacion - a.porcentajeOcupacion;
        if (ordenAulas === 'ocupacion_asc') return a.porcentajeOcupacion - b.porcentajeOcupacion;
        return a.codigo.localeCompare(b.codigo);
      });
  }, [metricasAulas, filtroTipoEspacio, filtroEdificio, busquedaAula, ordenAulas]);

  // 4. Cálculo de Ocupación por Franja Horaria (Horas Pico vs Horas Valle)
  const ocupacionPorHora = useMemo(() => {
    const franjas = [
      { hora: '07:00 - 08:00', label: '07:00', horaIni: 7 * 60, horaFin: 8 * 60 },
      { hora: '08:00 - 09:00', label: '08:00', horaIni: 8 * 60, horaFin: 9 * 60 },
      { hora: '09:00 - 10:00', label: '09:00', horaIni: 9 * 60, horaFin: 10 * 60 },
      { hora: '10:00 - 11:00', label: '10:00', horaIni: 10 * 60, horaFin: 11 * 60 },
      { hora: '11:00 - 12:00', label: '11:00', horaIni: 11 * 60, horaFin: 12 * 60 },
      { hora: '12:00 - 13:00', label: '12:00', horaIni: 12 * 60, horaFin: 13 * 60 },
      { hora: '13:00 - 14:00', label: '13:00', horaIni: 13 * 60, horaFin: 14 * 60 },
      { hora: '14:00 - 15:00', label: '14:00', horaIni: 14 * 60, horaFin: 15 * 60 },
      { hora: '15:00 - 16:00', label: '15:00', horaIni: 15 * 60, horaFin: 16 * 60 },
      { hora: '16:00 - 17:00', label: '16:00', horaIni: 16 * 60, horaFin: 17 * 60 },
      { hora: '17:00 - 18:00', label: '17:00', horaIni: 17 * 60, horaFin: 18 * 60 },
      { hora: '18:00 - 19:00', label: '18:00', horaIni: 18 * 60, horaFin: 19 * 60 }
    ];

    const diasSemana: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

    return franjas.map((f) => {
      // Contar aulas ocupadas promedio en esta franja a lo largo de los 5 días
      let totalAulasOcupadasDias = 0;

      diasSemana.forEach((d) => {
        const ocupadasEnDia = new Set<string>();
        asignacionesEscenario.forEach((a) => {
          if (a.dia === d) {
            const aIni = horaAMinutos(a.hora_inicio);
            const aFin = horaAMinutos(a.hora_fin);
            if (aIni < f.horaFin && aFin > f.horaIni) {
              ocupadasEnDia.add(a.espacio_id);
            }
          }
        });
        totalAulasOcupadasDias += ocupadasEnDia.size;
      });

      const promedioAulasOcupadas = Math.round(totalAulasOcupadasDias / diasSemana.length);
      const totalEspaciosAptos = espacios.filter((e) => e.apto_para_docencia && e.activo).length || 1;
      const pctOcupacionFranja = Math.min(100, Math.round((promedioAulasOcupadas / totalEspaciosAptos) * 100));

      return {
        franja: f.label,
        franjaCompleta: f.hora,
        aulasOcupadas: promedioAulasOcupadas,
        porcentajeOcupacion: pctOcupacionFranja
      };
    });
  }, [asignacionesEscenario, espacios]);

  // 5. Métricas Resumen Globales para la Subdirección
  const resumenGlobal = useMemo(() => {
    const totalHorasProgramadas = asignacionesEscenario.reduce(
      (acc, a) => acc + duracionHoras(a.hora_inicio, a.hora_fin),
      0
    );

    const horasConDocente = asignacionesEscenario
      .filter((a) => a.profesor_principal_id && a.profesor_principal_id !== 'sin_asignar')
      .reduce((acc, a) => acc + duracionHoras(a.hora_inicio, a.hora_fin), 0);

    const horasSinDocente = totalHorasProgramadas - horasConDocente;
    const porcentajeGlobalDocente = totalHorasProgramadas > 0
      ? Math.round((horasConDocente / totalHorasProgramadas) * 100)
      : 0;

    const aulasAptas = metricasAulas.length;
    const promedioOcupacionAulas = aulasAptas > 0
      ? Math.round(metricasAulas.reduce((acc, a) => acc + a.porcentajeOcupacion, 0) / aulasAptas)
      : 0;

    const aulasSaturadas = metricasAulas.filter((a) => a.estadoSaturacion === 'saturada');
    const aulasDisponibles = metricasAulas.filter((a) => a.estadoSaturacion === 'disponible');

    // Docentes con carga
    const docentesConCargaSet = new Set<string>();
    asignacionesEscenario.forEach((a) => {
      if (a.profesor_principal_id) docentesConCargaSet.add(a.profesor_principal_id);
      a.profesores_ids?.forEach((pid) => docentesConCargaSet.add(pid));
    });

    return {
      totalHorasProgramadas,
      horasConDocente,
      horasSinDocente,
      porcentajeGlobalDocente,
      totalDocentesRegistrados: docentes.length,
      docentesConCarga: docentesConCargaSet.size,
      promedioOcupacionAulas,
      aulasAptas,
      aulasSaturadasCount: aulasSaturadas.length,
      aulasDisponiblesCount: aulasDisponibles.length,
      aulasSaturadas,
      aulasDisponibles
    };
  }, [asignacionesEscenario, metricasAulas, docentes]);

  // Lista única de edificios para filtro
  const edificiosDisponibles = useMemo(() => {
    const set = new Set<string>();
    espacios.forEach((e) => {
      if (e.edificio) set.add(e.edificio);
    });
    return Array.from(set).sort();
  }, [espacios]);

  // Exportar reporte a CSV
  const handleExportarCSV = () => {
    const rows = [
      ['FACULTAD DE CIENCIAS MARINAS - UABC', 'REPORTE DE AVANCE ACADEMICO E INFRAESTRUCTURA 2027-1'],
      ['Subdirección Académica FCM', `Generado el: ${new Date().toLocaleDateString('es-MX')}`],
      [''],
      ['=== ASIGNACION DOCENTE POR PROGRAMA / DEPARTAMENTO ==='],
      ['Código', 'Nombre', 'Nivel', 'Horas con Docente', 'Horas sin Docente', 'Total Horas', '% Avance', 'Cursos Totales', 'Docentes'],
      ...metricasDocentesPorPrograma.map((p) => [
        p.codigo,
        `"${p.nombre}"`,
        p.nivel,
        p.horasConDocente.toString(),
        p.horasSinDocente.toString(),
        p.horasTotalesProgramadas.toString(),
        `${p.porcentajeAsignacion}%`,
        p.totalCursos.toString(),
        p.numDocentes.toString()
      ]),
      [''],
      ['=== OCUPACION DE AULAS Y LABORATORIOS ==='],
      ['Código', 'Nombre Espacio', 'Edificio', 'Tipo', 'Capacidad', 'Horas Ocupadas/Semana', '% Ocupación', 'Estado Saturación'],
      ...metricasAulas.map((a) => [
        a.codigo,
        `"${a.nombre}"`,
        a.edificio,
        a.tipo_espacio,
        a.capacidad.toString(),
        a.horasOcupadas.toString(),
        `${a.porcentajeOcupacion}%`,
        a.estadoSaturacion
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte_avance_subdireccion_2027_1_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Ejecutivo de Subdirección */}
      <div className="bg-gradient-to-r from-[#0c2d48] via-[#144272] to-[#0c2d48] text-white p-6 rounded-2xl shadow-md border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-amber-400 text-slate-900 flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" /> Subdirección Académica FCM
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-white/15 text-sky-100">
                Periodo 2027-1 · Sauzal Ensenada
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                {escenarioActivoId === 'oficial' ? 'Propuesta Oficial' : 'Escenario de Ajustes'}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <BarChart3 className="w-7 h-7 text-sky-300" />
              Reporte de Avance Docente y Ocupación de Aulas
            </h1>
            <p className="text-sky-100/90 text-sm mt-1 max-w-3xl">
              Monitoreo analítico y visual de asignación de carga horaria profesoral y uso de la infraestructura física de la Unidad Sauzal para la toma de decisiones oportuna.
            </p>
          </div>

          {/* Acciones de Cabecera */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="btn-reporte-pdf-subdireccion"
              onClick={() => setMostrarModalPDF(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
              title="Generar y descargar dictamen PDF oficial con jsPDF y jsPDF-AutoTable para revisión offline"
            >
              <FileDown className="w-4 h-4 text-amber-300" />
              <span>Reporte PDF Subdirección</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors border border-white/15 cursor-pointer shadow-xs"
              title="Imprimir informe ejecutivo para junta de consejo"
            >
              <Printer className="w-4 h-4 text-sky-200" />
              Imprimir Vista
            </button>
            <button
              onClick={handleExportarCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold transition-colors shadow-sm cursor-pointer"
              title="Descargar matriz en formato CSV para Excel"
            >
              <Download className="w-4 h-4 text-slate-900" />
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tarjetas KPI Ejecutivas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Avance Global Docente */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Avance Docente Global
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${resumenGlobal.porcentajeGlobalDocente >= 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {resumenGlobal.porcentajeGlobalDocente}%
            </span>
            <span className="text-xs text-slate-500 font-medium">horas cubiertas</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${resumenGlobal.porcentajeGlobalDocente >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
              style={{ width: `${resumenGlobal.porcentajeGlobalDocente}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>{resumenGlobal.horasConDocente}h asignadas</span>
            <span className="font-semibold text-rose-600">{resumenGlobal.horasSinDocente}h pendientes</span>
          </p>
        </div>

        {/* KPI 2: Plantilla Docente Activa */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Docentes con Carga Asignada
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {resumenGlobal.docentesConCarga}
            </span>
            <span className="text-xs text-slate-500 font-medium">de {resumenGlobal.totalDocentesRegistrados} registrados</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            {Math.round((resumenGlobal.docentesConCarga / (resumenGlobal.totalDocentesRegistrados || 1)) * 100)}% de la plantilla cuenta con materias en 2027-1
          </p>
        </div>

        {/* KPI 3: Tasa Promedio de Ocupación de Aulas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Uso de Aulas y Labs
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {resumenGlobal.promedioOcupacionAulas}%
            </span>
            <span className="text-xs text-slate-500 font-medium">ocupación semanal</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${resumenGlobal.promedioOcupacionAulas}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Base 60 hrs hábiles/sem</span>
            <span className="font-semibold text-indigo-700">{resumenGlobal.aulasAptas} espacios aptos</span>
          </p>
        </div>

        {/* KPI 4: Cuellos de Botella / Aulas Saturadas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Alertas de Infraestructura
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${resumenGlobal.aulasSaturadasCount > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {resumenGlobal.aulasSaturadasCount}
            </span>
            <span className="text-xs text-rose-600 font-semibold">aulas saturadas (&gt;75%)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 flex items-center justify-between">
            <span>{resumenGlobal.aulasDisponiblesCount} espacios disponibles</span>
            <button
              onClick={() => {
                setTabDetalleActivo('recomendaciones');
              }}
              className="text-sky-700 hover:text-sky-900 font-bold hover:underline cursor-pointer"
            >
              Ver balance
            </button>
          </p>
        </div>
      </div>

      {/* 3. GRÁFICO 1: Asignación de Horas Docentes por Departamento / Programa */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-800 uppercase tracking-wide">
                Carga Docente
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Porcentaje de Asignación de Horas Docentes por Departamento
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Comparativa de horas programadas cubiertas con profesor titular vs. horas pendientes por asignar.
            </p>
          </div>

          {/* Selector de Agrupación y Filtro */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setAgrupacionDocente('programa')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${agrupacionDocente === 'programa' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Por Programa Educativo
              </button>
              <button
                onClick={() => setAgrupacionDocente('academia')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${agrupacionDocente === 'academia' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Por Academia / Área
              </button>
            </div>

            {agrupacionDocente === 'programa' && (
              <select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value as any)}
                className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="todos">Todos los Niveles</option>
                <option value="licenciatura">Solo Licenciatura</option>
                <option value="posgrado">Solo Posgrado</option>
              </select>
            )}
          </div>
        </div>

        {/* Gráfico de Barras con Recharts */}
        <div className="w-full h-80 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={datosGraficoDocentes}
              margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="codigo"
                tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                interval={0}
                angle={-12}
                textAnchor="end"
                height={45}
              />
              <YAxis
                unit="h"
                tick={{ fill: '#64748b', fontSize: 11 }}
                domain={[0, 'auto']}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs max-w-xs">
                        <p className="font-bold text-sky-300 mb-1">{data.nombre}</p>
                        <div className="space-y-1 text-slate-200">
                          <p className="flex justify-between gap-4">
                            <span>Horas con Docente:</span>
                            <span className="font-bold text-emerald-400">{data.horasConDocente} hrs</span>
                          </p>
                          <p className="flex justify-between gap-4">
                            <span>Horas sin Asignar:</span>
                            <span className="font-bold text-rose-400">{data.horasSinDocente} hrs</span>
                          </p>
                          <p className="flex justify-between gap-4 pt-1 border-t border-slate-700">
                            <span>Avance de Asignación:</span>
                            <span className="font-extrabold text-amber-300">{data.porcentajeAsignacion}%</span>
                          </p>
                          {data.numDocentes !== undefined && (
                            <p className="text-[11px] text-slate-400 mt-1">
                              {data.numDocentes} profesores activos en el área
                            </p>
                          )}
                          {data.cursosSinDocente && data.cursosSinDocente.length > 0 && (
                            <div className="pt-2 mt-1 border-t border-slate-700">
                              <p className="text-[10px] uppercase font-bold text-rose-300">Cursos pendientes:</p>
                              <p className="text-[10px] text-slate-300 truncate">
                                {data.cursosSinDocente.slice(0, 2).join(', ')}
                                {data.cursosSinDocente.length > 2 ? ` (+${data.cursosSinDocente.length - 2} más)` : ''}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 12, fontSize: 12, fontWeight: 500 }}
              />
              <Bar
                name="Horas con Docente Asignado"
                dataKey="horasConDocente"
                stackId="a"
                fill="#00723f" /* Verde Institucional UABC */
                radius={[0, 0, 4, 4]}
              />
              <Bar
                name="Horas Pendientes por Asignar"
                dataKey="horasSinDocente"
                stackId="a"
                fill="#f43f5e" /* Rosa/Rojo de Alerta */
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resumen al pie del gráfico de docentes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
          {datosGraficoDocentes.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800 truncate" title={item.nombre}>
                  {item.codigo}
                </span>
                <span className={`font-extrabold ${item.porcentajeAsignacion >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {item.porcentajeAsignacion}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.porcentajeAsignacion >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${item.porcentajeAsignacion}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                {item.horasConDocente}h de {item.horasTotalesProgramadas}h programadas
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. GRÁFICO 2: Nivel de Ocupación de las Aulas y Laboratorios */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-5 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wide">
                Infraestructura Física
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Nivel de Ocupación Semanal de Aulas y Laboratorios
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Porcentaje de ocupación calculado sobre 60 horas hábiles (Lunes a Viernes 07:00 a 19:00).
            </p>
          </div>

          {/* Filtros para el Gráfico de Aulas */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Buscador rápido */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={busquedaAula}
                onChange={(e) => setBusquedaAula(e.target.value)}
                placeholder="Buscar aula..."
                className="text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 w-32 sm:w-40 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Filtro por tipo de espacio */}
            <select
              value={filtroTipoEspacio}
              onChange={(e) => setFiltroTipoEspacio(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="todos">Todos los Tipos</option>
              <option value="aula">Aulas Teóricas</option>
              <option value="laboratorio">Laboratorios</option>
              <option value="aula_computo">Centros de Cómputo</option>
              <option value="audiovisual">Salas Audiovisuales</option>
              <option value="salon_posgrado">Posgrado / Seminarios</option>
            </select>

            {/* Filtro por edificio */}
            <select
              value={filtroEdificio}
              onChange={(e) => setFiltroEdificio(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="todos">Todos los Edificios</option>
              {edificiosDisponibles.map((ed) => (
                <option key={ed} value={ed}>{ed}</option>
              ))}
            </select>

            {/* Ordenamiento */}
            <select
              value={ordenAulas}
              onChange={(e) => setOrdenAulas(e.target.value as any)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="ocupacion_desc">Mayor Ocupación ↓</option>
              <option value="ocupacion_asc">Menor Ocupación ↑</option>
              <option value="codigo">Código A-Z</option>
            </select>
          </div>
        </div>

        {/* Semáforo Guía de Saturación */}
        <div className="flex items-center gap-4 mb-4 text-xs font-medium text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex-wrap">
          <span className="font-bold text-slate-700 text-[11px] uppercase">Rango de Ocupación:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span>Saturada (&ge; 75% · &gt; 45h/sem)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Óptima (35% - 74% · 21 a 44h/sem)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-500" />
            <span>Disponible (&lt; 35% · &lt; 21h/sem)</span>
          </div>
          <span className="ml-auto text-[11px] text-slate-400">
            Mostrando {Math.min(20, aulasFiltradas.length)} de {aulasFiltradas.length} espacios
          </span>
        </div>

        {/* Gráfico de Barras para las Aulas (Top 20 según filtro) */}
        <div className="w-full h-88 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aulasFiltradas.slice(0, 20)}
              margin={{ top: 15, right: 20, left: 0, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="codigo"
                tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis
                unit="%"
                domain={[0, 100]}
                tick={{ fill: '#64748b', fontSize: 11 }}
              />
              <ReferenceLine y={75} stroke="#e11d48" strokeDasharray="3 3" label={{ value: 'Límite Saturación 75%', fill: '#e11d48', fontSize: 10, position: 'top' }} />
              <ReferenceLine y={35} stroke="#0284c7" strokeDasharray="3 3" label={{ value: 'Umbral Disponible 35%', fill: '#0284c7', fontSize: 10, position: 'bottom' }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const aula = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs max-w-sm">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-extrabold text-sky-300 text-sm">{aula.codigo}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 text-white font-medium">
                            {aula.edificio}
                          </span>
                        </div>
                        <p className="font-medium text-slate-300 text-[11px] mb-2">{aula.nombre}</p>
                        <div className="space-y-1.5 border-t border-slate-700 pt-2 text-slate-200">
                          <p className="flex justify-between">
                            <span>Horas Ocupadas:</span>
                            <span className="font-bold text-amber-300">{aula.horasOcupadas} h / 60 h</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Tasa de Ocupación:</span>
                            <span className={`font-extrabold ${aula.porcentajeOcupacion >= 75 ? 'text-rose-400' : aula.porcentajeOcupacion >= 35 ? 'text-emerald-400' : 'text-sky-400'}`}>
                              {aula.porcentajeOcupacion}%
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span>Capacidad Máxima:</span>
                            <span className="font-semibold text-slate-200">{aula.capacidad} estudiantes</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Uso de Capacidad:</span>
                            <span className="font-semibold text-slate-200">{aula.promedioAlumnos} alumnos prom. ({aula.porcentajeCupo}%)</span>
                          </p>
                          <div className="pt-2 border-t border-slate-700 flex justify-between text-[11px] text-slate-400">
                            <span>Matutino: {aula.horasMatutino}h</span>
                            <span>Vespertino: {aula.horasVespertino}h</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                name="Tasa de Ocupación Semanal (%)"
                dataKey="porcentajeOcupacion"
                radius={[6, 6, 0, 0]}
              >
                {aulasFiltradas.slice(0, 20).map((entry) => {
                  let color = '#0ea5e9'; // Azul cielo para disponible (<35%)
                  if (entry.porcentajeOcupacion >= 75) {
                    color = '#e11d48'; // Rojo para saturado (>=75%)
                  } else if (entry.porcentajeOcupacion >= 35) {
                    color = '#10b981'; // Verde para óptimo (35%-74%)
                  }
                  return <Cell key={`cell-${entry.id}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. GRÁFICO 3: Franjas Horarias (Horas Pico vs Horas Valle en Sauzal) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wide">
                Distribución Temporal
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Horas Pico vs. Horas Valle de Utilización (Lunes a Viernes)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Promedio de espacios ocupados simultáneamente por hora para identificar saturación de turnos.
            </p>
          </div>
          <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
            Total Espacios Aptos: <strong className="text-slate-800">{resumenGlobal.aulasAptas}</strong>
          </span>
        </div>

        <div className="w-full h-56 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ocupacionPorHora}
              margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="franja"
                tick={{ fill: '#475569', fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 11 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-lg">
                        <p className="font-bold text-amber-300">{data.franjaCompleta}</p>
                        <p className="text-slate-200 mt-1">
                          Aulas Ocupadas: <strong className="text-white">{data.aulasOcupadas}</strong> de {resumenGlobal.aulasAptas}
                        </p>
                        <p className="text-emerald-400 font-bold">
                          {data.porcentajeOcupacion}% de infraestructura en uso
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                name="Aulas en Uso Simultáneo"
                dataKey="aulasOcupadas"
                fill="#0c2d48"
                radius={[4, 4, 0, 0]}
              >
                {ocupacionPorHora.map((entry, idx) => {
                  // Resaltar en ámbar si la ocupación es pico (e.g. > 60% de aulas)
                  const esPico = entry.porcentajeOcupacion >= 50;
                  return <Cell key={`franja-${idx}`} fill={esPico ? '#eab308' : '#0c2d48'} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Panel de Navegación por Pestañas de Detalle y Recomendaciones */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Encabezado de pestañas */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setTabDetalleActivo('departamentos')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${tabDetalleActivo === 'departamentos' ? 'border-sky-600 text-sky-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Detalle por Departamento / Programa ({metricasDocentesPorPrograma.length})
          </button>
          <button
            onClick={() => setTabDetalleActivo('aulas')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${tabDetalleActivo === 'aulas' ? 'border-sky-600 text-sky-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Matriz de Ocupación de Aulas ({metricasAulas.length})
          </button>
          <button
            onClick={() => setTabDetalleActivo('recomendaciones')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${tabDetalleActivo === 'recomendaciones' ? 'border-amber-600 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Decisiones Recomendadas para Subdirección
            {resumenGlobal.aulasSaturadasCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        </div>

        {/* Contenido de la pestaña 1: Detalle Departamental */}
        {tabDetalleActivo === 'departamentos' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Programa / Departamento</th>
                  <th className="py-3 px-4">Nivel</th>
                  <th className="py-3 px-4 text-center">Cursos</th>
                  <th className="py-3 px-4 text-center">Horas Cubiertas</th>
                  <th className="py-3 px-4 text-center">Horas Pendientes</th>
                  <th className="py-3 px-4 text-center">Total Horas</th>
                  <th className="py-3 px-4 text-center">Avance (%)</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metricasDocentesPorPrograma.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">
                      <div>{p.nombre}</div>
                      <span className="text-[10px] font-mono text-slate-400">{p.codigo}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${p.nivel === 'posgrado' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {p.nivel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700">{p.totalCursos}</td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-700">{p.horasConDocente}h</td>
                    <td className="py-3 px-4 text-center font-bold text-rose-600">
                      {p.horasSinDocente > 0 ? `${p.horasSinDocente}h` : '-'}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-700 font-medium">{p.horasTotalesProgramadas}h</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`font-extrabold ${p.porcentajeAsignacion >= 90 ? 'text-emerald-600' : p.porcentajeAsignacion >= 75 ? 'text-amber-600' : 'text-rose-600'}`}>
                          {p.porcentajeAsignacion}%
                        </span>
                        <div className="w-12 bg-slate-200 rounded-full h-1.5 overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${p.porcentajeAsignacion >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${p.porcentajeAsignacion}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {p.porcentajeAsignacion >= 95 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Completo
                        </span>
                      ) : p.porcentajeAsignacion >= 75 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3" /> En Proceso
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          <AlertCircle className="w-3 h-3" /> Requiere Atención
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onNavegarVista && onNavegarVista('planificacion')}
                        className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900 font-bold hover:underline cursor-pointer"
                      >
                        Asignar <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contenido de la pestaña 2: Matriz de Aulas */}
        {tabDetalleActivo === 'aulas' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Espacio / Código</th>
                  <th className="py-3 px-4">Nombre Oficial</th>
                  <th className="py-3 px-4">Edificio</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4 text-center">Capacidad</th>
                  <th className="py-3 px-4 text-center">Horas Semanales</th>
                  <th className="py-3 px-4 text-center">Tasa Ocupación</th>
                  <th className="py-3 px-4 text-center">Uso Cupo</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {aulasFiltradas.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold font-mono text-slate-900">{a.codigo}</td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{a.nombre}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {a.edificio}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 capitalize">{a.tipo_espacio.replace('_', ' ')}</td>
                    <td className="py-3 px-4 text-center text-slate-700 font-semibold">{a.capacidad} est.</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-800">{a.horasOcupadas}h / 60h</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-extrabold ${a.porcentajeOcupacion >= 75 ? 'text-rose-600' : a.porcentajeOcupacion >= 35 ? 'text-emerald-600' : 'text-sky-600'}`}>
                        {a.porcentajeOcupacion}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600">{a.porcentajeCupo}%</td>
                    <td className="py-3 px-4">
                      {a.estadoSaturacion === 'saturada' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          Saturada (&gt;75%)
                        </span>
                      )}
                      {a.estadoSaturacion === 'optima' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Óptima
                        </span>
                      )}
                      {a.estadoSaturacion === 'disponible' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                          Disponible
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (onSeleccionarAula) onSeleccionarAula(a.id);
                          if (onNavegarVista) onNavegarVista('matriz_espacios');
                        }}
                        className="text-sky-700 hover:text-sky-900 font-bold hover:underline cursor-pointer"
                      >
                        Ver Horario
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contenido de la pestaña 3: Decisiones y Recomendaciones para Subdirección */}
        {tabDetalleActivo === 'recomendaciones' && (
          <div className="p-6 space-y-6">
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950 text-sm mb-1">
                  Panel de Diagnóstico Académico e Infraestructura para la Subdirectora
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Este panel detecta automáticamente áreas de oportunidad, grupos sin cobertura profesoral y sobreutilización de espacios físicos en el Campus Sauzal, facilitando la toma de decisiones directivas y la reprogramación preventiva antes del inicio de clases en 2027-1.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recomendación 1: Descongestión de Aulas Saturadas */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
                <div className="flex items-center gap-2 mb-3 text-rose-700">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="font-bold text-sm text-slate-900">Descongestión de Aulas Saturadas</h3>
                </div>
                {resumenGlobal.aulasSaturadas.length === 0 ? (
                  <p className="text-xs text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    No se detectan aulas en estado de saturación crítica (&gt;75%). La carga de infraestructura se encuentra equilibrada.
                  </p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600">
                      Las siguientes aulas superan el 75% de ocupación semanal. Se sugiere transferir sesiones a aulas disponibles del mismo edificio:
                    </p>
                    <div className="space-y-2">
                      {resumenGlobal.aulasSaturadas.map((as) => (
                        <div key={as.id} className="p-3 bg-rose-50/50 rounded-lg border border-rose-200 text-xs">
                          <div className="flex justify-between items-center font-bold text-rose-900 mb-1">
                            <span>{as.codigo} · {as.nombre}</span>
                            <span>{as.porcentajeOcupacion}% ({as.horasOcupadas}h)</span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            Ubicado en {as.edificio}. Capacidad {as.capacidad} alumnos.
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[11px]">
                            <span className="text-slate-500">
                              Matutino: {as.horasMatutino}h | Vespertino: {as.horasVespertino}h
                            </span>
                            <button
                              onClick={() => onNavegarVista && onNavegarVista('matriz_espacios')}
                              className="text-sky-700 hover:text-sky-900 font-bold hover:underline cursor-pointer"
                            >
                              Reubicar clases
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Recomendación 2: Contratación y Asignación de Plazas Docentes */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
                <div className="flex items-center gap-2 mb-3 text-sky-700">
                  <Users className="w-4 h-4" />
                  <h3 className="font-bold text-sm text-slate-900">Cobertura de Plazas Docentes Pendientes</h3>
                </div>
                {resumenGlobal.horasSinDocente === 0 ? (
                  <p className="text-xs text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    Todas las materias programadas cuentan con profesor titular asignado. Cobertura del 100%.
                  </p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600">
                      Existen <strong>{resumenGlobal.horasSinDocente} horas-semana</strong> sin profesor asignado. Programas con mayor necesidad de asignación:
                    </p>
                    <div className="space-y-2">
                      {metricasDocentesPorPrograma
                        .filter((p) => p.horasSinDocente > 0)
                        .sort((a, b) => b.horasSinDocente - a.horasSinDocente)
                        .map((p) => (
                          <div key={p.id} className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-xs">
                            <div className="flex justify-between items-center font-bold text-slate-900 mb-1">
                              <span>{p.nombre} ({p.codigo})</span>
                              <span className="text-amber-800 font-extrabold">{p.horasSinDocente} hrs pendientes</span>
                            </div>
                            <p className="text-[11px] text-slate-600 mb-2">
                              Avance: {p.porcentajeAsignacion}% cubierto ({p.horasConDocente}h asignadas de {p.horasTotalesProgramadas}h).
                            </p>
                            {p.cursosSinDocente.length > 0 && (
                              <div className="bg-white p-2 rounded border border-amber-100 text-[11px] text-slate-700">
                                <strong>Cursos sin docente:</strong> {p.cursosSinDocente.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Recomendación 3: Optimización de Turno Vespertino */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs md:col-span-2">
                <div className="flex items-center gap-2 mb-2 text-indigo-700">
                  <TrendingUp className="w-4 h-4" />
                  <h3 className="font-bold text-sm text-slate-900">Estrategia de Balanceo Horario (Sauzal)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  El análisis de franjas horarias demuestra que el campus concentra la mayor demanda entre las <strong>09:00 y las 13:00 horas</strong>. Promover la apertura de grupos teóricos o seminarios de posgrado en el bloque de <strong>14:00 a 18:00 horas</strong> permitirá:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-800 mb-1">1. Liberar Laboratorios</p>
                    <p className="text-slate-600 text-[11px]">
                      Despejar los laboratorios de biología y química para prácticas continuas de campo y tesis.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-800 mb-1">2. Reducir Conflictos</p>
                    <p className="text-slate-600 text-[11px]">
                      Facilitar la programación de materias compartidas entre Licenciatura y Posgrado sin traslapes.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-800 mb-1">3. Tránsito en Sauzal</p>
                    <p className="text-slate-600 text-[11px]">
                      Distribuir el flujo vehicular y acceso al transporte público para la comunidad estudiantil.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Generación de Reporte PDF para Subdirección */}
      <ModalReportePDFSubdireccion
        isOpen={mostrarModalPDF}
        onClose={() => setMostrarModalPDF(false)}
        asignaciones={asignacionesEscenario}
        cursos={cursos}
        espacios={espacios}
        docentes={docentes}
        programas={programas}
        escenarioActivoNombre={escenarioActivoId === 'oficial' ? 'Propuesta Oficial' : 'Escenario de Ajustes'}
        periodoId="2027-1"
      />
    </div>
  );
};
