/**
 * Vista de Resumen General / Dashboard FCM 2027-1
 * Incluye visualización gráfica con Recharts del porcentaje de ocupación de las aulas por turno (matutino/vespertino)
 * Tema: Professional Polish
 */

import React, { useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
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
  BarChart3,
  Sun,
  Moon,
  PieChart as PieChartIcon,
  Filter,
  Check,
  TrendingUp,
  Info,
  ChevronRight,
  Calendar,
  Activity,
  ArrowUpRight,
  Flame
} from 'lucide-react';
import {
  Espacio,
  Curso,
  Grupo,
  Asignacion,
  ProgramaEducativo,
  Escenario,
  Conflicto,
  RoleUsuario,
  DiaSemana
} from '../types';
import { VistaActiva } from './Sidebar';
import { calcularMetricasInfraestructura } from '../utils/conflicts';

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
  onMoverAsignacion?: (asignacion: Asignacion) => void;
  roleUsuario?: RoleUsuario;
  onUnificarAula?: (variante: string, espacioOficialId: string) => Promise<any>;
  aulaMagnaUnificada?: boolean;
}

// Convertir hora HH:MM a minutos para cálculo exacto de duraciones
const horaAMinutos = (hora: string): number => {
  if (!hora) return 0;
  const [h, m] = hora.split(':').map((v) => parseInt(v, 10) || 0);
  return h * 60 + m;
};

const duracionHoras = (inicio: string, fin: string): number => {
  const min = horaAMinutos(fin) - horaAMinutos(inicio);
  return min > 0 ? min / 60 : 2;
};

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
  onMoverAsignacion,
  roleUsuario,
  onUnificarAula,
  aulaMagnaUnificada = false
}) => {
  // Cálculo de optimización y maximización de uso de infraestructura FCM
  const metricasInfra = useMemo(() => {
    return calcularMetricasInfraestructura(
      asignaciones,
      espacios,
      cursos,
      '2027-1',
      escenarioActivo?.id || 'oficial'
    );
  }, [asignaciones, espacios, cursos, escenarioActivo]);

  // Filtros interactivos para el Gráfico Circular de Ocupación por Turno
  const [tipoEspacioFiltro, setTipoEspacioFiltro] = useState<'todos' | 'aulas' | 'laboratorios' | 'posgrado'>('todos');
  const [diaFiltro, setDiaFiltro] = useState<'todos' | DiaSemana>('todos');
  const [modoGraficoCircular, setModoGraficoCircular] = useState<'tasa_ocupacion' | 'distribucion' | 'detalle_aulas'>('tasa_ocupacion');

  // Filtros interactivos para el Gráfico de Barras de Saturación Física por Día (Recharts)
  const [filtroEspacioBarras, setFiltroEspacioBarras] = useState<'todos' | 'aulas' | 'laboratorios' | 'posgrado'>('todos');
  const [filtroTurnoBarras, setFiltroTurnoBarras] = useState<'todos' | 'matutino' | 'vespertino'>('todos');
  const [metricaBarras, setMetricaBarras] = useState<'horas' | 'alumnos'>('horas');
  const [diaSeleccionadoBarras, setDiaSeleccionadoBarras] = useState<DiaSemana | null>(null);

  // Cálculos estadísticos generales
  const conflictosCriticos = conflictos.filter((c) => c.bloqueante);
  const totalEspacios = espacios.length;
  const espaciosAptosDocencia = espacios.filter((e) => e.apto_para_docencia !== false && e.activo !== false);
  const aulas = espacios.filter((e) => e.tipo_espacio === 'aula').length;
  const laboratorios = espacios.filter((e) => e.tipo_espacio === 'laboratorio').length;
  const posgradoEspacios = espacios.filter(
    (e) => e.tipo_espacio === 'salon_posgrado' || e.tipo_espacio === 'seminario'
  ).length;

  const asignacionesLic = asignaciones.filter((a) => a.nivel_educativo === 'licenciatura').length;
  const asignacionesPos = asignaciones.filter((a) => a.nivel_educativo === 'posgrado').length;

  // Filtrado de espacios para el cálculo de turnos
  const espaciosParaTurnos = useMemo(() => {
    return espaciosAptosDocencia.filter((e) => {
      if (tipoEspacioFiltro === 'aulas') return e.tipo_espacio === 'aula';
      if (tipoEspacioFiltro === 'laboratorios') return e.tipo_espacio === 'laboratorio';
      if (tipoEspacioFiltro === 'posgrado') {
        return (
          e.tipo_espacio === 'salon_posgrado' ||
          e.tipo_espacio === 'seminario' ||
          (e.codigo && e.codigo.startsWith('SP')) ||
          (e.edificio && e.edificio.toLowerCase().includes('posgrado'))
        );
      }
      return true;
    });
  }, [espaciosAptosDocencia, tipoEspacioFiltro]);

  const espaciosIdsSet = useMemo(() => new Set(espaciosParaTurnos.map((e) => e.id)), [espaciosParaTurnos]);

  // Filtrado de asignaciones según espacio y día seleccionado
  const asignacionesFiltradas = useMemo(() => {
    return asignaciones.filter((a) => {
      if (!espaciosIdsSet.has(a.espacio_id)) return false;
      if (diaFiltro !== 'todos' && a.dia !== diaFiltro) return false;
      return true;
    });
  }, [asignaciones, espaciosIdsSet, diaFiltro]);

  // -------------------------------------------------------------
  // CÁLCULO EXACTO DE HORAS Y OCUPACIÓN POR TURNO (MATUTINO / VESPERTINO)
  // Turno Matutino: 07:00 a 13:00 (420 min a 780 min = 6 hrs/día)
  // Turno Vespertino: 13:00 a 19:00 (780 min a 1140 min = 6 hrs/día)
  // -------------------------------------------------------------
  const metricasTurnos = useMemo(() => {
    const numEspacios = Math.max(1, espaciosParaTurnos.length);
    // Días laborables considerados:
    const diasMultiplicador = diaFiltro === 'todos' ? 5 : 1; // Lunes a Viernes base

    const capacidadHorasMatutino = numEspacios * 6 * diasMultiplicador;
    const capacidadHorasVespertino = numEspacios * 6 * diasMultiplicador;

    let horasOcupadasMatutino = 0;
    let horasOcupadasVespertino = 0;

    // Conteo por espacio para ranking de saturación
    const ocupacionPorAulaMap = new Map<string, { matutino: number; vespertino: number; total: number }>();
    espaciosParaTurnos.forEach((e) => {
      ocupacionPorAulaMap.set(e.id, { matutino: 0, vespertino: 0, total: 0 });
    });

    asignacionesFiltradas.forEach((a) => {
      const iniMin = horaAMinutos(a.hora_inicio);
      let finMin = horaAMinutos(a.hora_fin);
      if (finMin <= iniMin) finMin = iniMin + 120; // Salvaguarda

      // Solapamiento con ventana Matutina [420, 780]
      const overlapMatMin = Math.max(0, Math.min(finMin, 780) - Math.max(iniMin, 420));
      const horasMat = overlapMatMin / 60;

      // Solapamiento con ventana Vespertina [780, 1140] (o hasta 1200 / 20:00)
      const overlapVespMin = Math.max(0, Math.min(finMin, 1200) - Math.max(iniMin, 780));
      const horasVesp = overlapVespMin / 60;

      horasOcupadasMatutino += horasMat;
      horasOcupadasVespertino += horasVesp;

      if (ocupacionPorAulaMap.has(a.espacio_id)) {
        const item = ocupacionPorAulaMap.get(a.espacio_id)!;
        item.matutino += horasMat;
        item.vespertino += horasVesp;
        item.total += horasMat + horasVesp;
      }
    });

    const porcentajeOcupacionMatutino = capacidadHorasMatutino > 0
      ? Math.min(100, Math.round((horasOcupadasMatutino / capacidadHorasMatutino) * 100))
      : 0;

    const porcentajeOcupacionVespertino = capacidadHorasVespertino > 0
      ? Math.min(100, Math.round((horasOcupadasVespertino / capacidadHorasVespertino) * 100))
      : 0;

    const totalHorasOcupadas = horasOcupadasMatutino + horasOcupadasVespertino;
    const porcentajeShareMatutino = totalHorasOcupadas > 0
      ? Math.round((horasOcupadasMatutino / totalHorasOcupadas) * 100)
      : 50;
    const porcentajeShareVespertino = totalHorasOcupadas > 0
      ? 100 - porcentajeShareMatutino
      : 50;

    // Aulas con mayor saturación en cada turno y análisis de >90%
    const capTotalDia = 12 * diasMultiplicador;
    const rankingAulas = Array.from(ocupacionPorAulaMap.entries()).map(([espacioId, data]) => {
      const espacioObj = espacios.find((e) => e.id === espacioId);
      const capPorTurno = 6 * diasMultiplicador;
      const pctMat = Math.min(100, Math.round((data.matutino / capPorTurno) * 100));
      const pctVesp = Math.min(100, Math.round((data.vespertino / capPorTurno) * 100));
      const pctTotal = capTotalDia > 0 ? Math.min(100, Math.round((data.total / capTotalDia) * 100)) : 0;
      return {
        id: espacioId,
        codigo: espacioObj?.codigo || espacioId,
        nombre: espacioObj?.nombre || 'Espacio',
        tipo: espacioObj?.tipo_espacio || 'aula',
        edificio: espacioObj?.edificio || 'Campus',
        capacidad: espacioObj?.capacidad_alumnos || 0,
        horasMat: Number(data.matutino.toFixed(1)),
        horasVesp: Number(data.vespertino.toFixed(1)),
        pctMat,
        pctVesp,
        pctTotal,
        horasTotal: Number(data.total.toFixed(1))
      };
    });

    // Aulas con ocupación mayor al 90% (en matutino, vespertino o global)
    const aulasMasDe90 = rankingAulas.filter((a) => a.pctTotal > 90 || a.pctMat > 90 || a.pctVesp > 90);
    const aulasMasDe90Total = rankingAulas.filter((a) => a.pctTotal > 90);
    const aulasMasDe90Matutino = rankingAulas.filter((a) => a.pctMat > 90);
    const aulasMasDe90Vespertino = rankingAulas.filter((a) => a.pctVesp > 90);

    const capacidadTotalAmbosTurnos = capacidadHorasMatutino + capacidadHorasVespertino;
    const promedioGeneralOcupacion = capacidadTotalAmbosTurnos > 0
      ? Math.min(100, Math.round((totalHorasOcupadas / capacidadTotalAmbosTurnos) * 100))
      : 0;

    const topAulasMatutino = [...rankingAulas].sort((a, b) => b.pctMat - a.pctMat).slice(0, 5);
    const topAulasVespertino = [...rankingAulas].sort((a, b) => b.pctVesp - a.pctVesp).slice(0, 5);

    return {
      numEspacios,
      capacidadHorasMatutino,
      capacidadHorasVespertino,
      capacidadTotalAmbosTurnos,
      horasOcupadasMatutino: Number(horasOcupadasMatutino.toFixed(1)),
      horasOcupadasVespertino: Number(horasOcupadasVespertino.toFixed(1)),
      horasLibresMatutino: Number(Math.max(0, capacidadHorasMatutino - horasOcupadasMatutino).toFixed(1)),
      horasLibresVespertino: Number(Math.max(0, capacidadHorasVespertino - horasOcupadasVespertino).toFixed(1)),
      porcentajeOcupacionMatutino,
      porcentajeOcupacionVespertino,
      promedioGeneralOcupacion,
      totalHorasOcupadas: Number(totalHorasOcupadas.toFixed(1)),
      porcentajeShareMatutino,
      porcentajeShareVespertino,
      topAulasMatutino,
      topAulasVespertino,
      rankingAulas,
      aulasMasDe90,
      aulasMasDe90Total,
      aulasMasDe90Matutino,
      aulasMasDe90Vespertino
    };
  }, [espaciosParaTurnos, asignacionesFiltradas, diaFiltro, espacios]);

  // Datos para gráfico circular Donut Matutino (% Ocupado vs % Libre)
  const datosCircularMatutino = useMemo(() => [
    {
      name: 'Ocupado Matutino (07:00 - 13:00)',
      value: metricasTurnos.horasOcupadasMatutino,
      porcentaje: metricasTurnos.porcentajeOcupacionMatutino,
      color: '#0284c7', // Sky Blue institucional UABC
      tipo: 'ocupado'
    },
    {
      name: 'Disponible Matutino',
      value: metricasTurnos.horasLibresMatutino,
      porcentaje: 100 - metricasTurnos.porcentajeOcupacionMatutino,
      color: '#e2e8f0', // Slate 200
      tipo: 'libre'
    }
  ], [metricasTurnos]);

  // Datos para gráfico circular Donut Vespertino (% Ocupado vs % Libre)
  const datosCircularVespertino = useMemo(() => [
    {
      name: 'Ocupado Vespertino (13:00 - 19:00)',
      value: metricasTurnos.horasOcupadasVespertino,
      porcentaje: metricasTurnos.porcentajeOcupacionVespertino,
      color: '#f59e0b', // Amber 500
      tipo: 'ocupado'
    },
    {
      name: 'Disponible Vespertino',
      value: metricasTurnos.horasLibresVespertino,
      porcentaje: 100 - metricasTurnos.porcentajeOcupacionVespertino,
      color: '#e2e8f0', // Slate 200
      tipo: 'libre'
    }
  ], [metricasTurnos]);

  // Datos para gráfico circular de Distribución Comparativa Matutino vs Vespertino
  const datosCircularComparativo = useMemo(() => [
    {
      name: 'Turno Matutino (07:00 - 13:00)',
      value: metricasTurnos.horasOcupadasMatutino,
      porcentaje: metricasTurnos.porcentajeShareMatutino,
      tasaOcupacion: metricasTurnos.porcentajeOcupacionMatutino,
      color: '#0284c7', // Sky Blue institucional
      turno: 'matutino'
    },
    {
      name: 'Turno Vespertino (13:00 - 19:00)',
      value: metricasTurnos.horasOcupadasVespertino,
      porcentaje: metricasTurnos.porcentajeShareVespertino,
      tasaOcupacion: metricasTurnos.porcentajeOcupacionVespertino,
      color: '#f59e0b', // Amber 500
      turno: 'vespertino'
    }
  ], [metricasTurnos]);

  // Porcentaje estimado global de ocupación
  const porcentajeOcupacionGlobal = totalEspacios > 0
    ? Math.min(100, Math.round((asignaciones.length / (totalEspacios * 6)) * 100))
    : 72;

  // Componente de Tooltip personalizado para Recharts
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white text-xs p-3 rounded-xl shadow-xl border border-slate-700 space-y-1 backdrop-blur-xs">
          <div className="flex items-center gap-2 font-bold pb-1 border-b border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: data.color }} />
            <span>{data.name}</span>
          </div>
          <p className="text-slate-300 flex items-center justify-between gap-4">
            <span>Horas computadas:</span>
            <strong className="text-white font-mono">{Number(data.value).toFixed(1)} hrs</strong>
          </p>
          <p className="text-slate-300 flex items-center justify-between gap-4">
            <span>Porcentaje:</span>
            <strong className="text-emerald-400 font-mono text-sm">{data.porcentaje}%</strong>
          </p>
          {data.tasaOcupacion !== undefined && (
            <p className="text-sky-300 text-[10px] pt-1 border-t border-slate-800">
              Tasa de saturación del turno: {data.tasaOcupacion}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // =========================================================================
  // CÁLCULO DE OCUPACIÓN REAL VS. CAPACIDAD TEÓRICA POR DÍA DE LA SEMANA
  // =========================================================================
  const espaciosParaBarras = useMemo(() => {
    return espaciosAptosDocencia.filter((e) => {
      if (filtroEspacioBarras === 'aulas') return e.tipo_espacio === 'aula';
      if (filtroEspacioBarras === 'laboratorios') return e.tipo_espacio === 'laboratorio';
      if (filtroEspacioBarras === 'posgrado') {
        return (
          e.tipo_espacio === 'salon_posgrado' ||
          e.tipo_espacio === 'seminario' ||
          (e.codigo && e.codigo.startsWith('SP')) ||
          (e.edificio && e.edificio.toLowerCase().includes('posgrado'))
        );
      }
      return true;
    });
  }, [espaciosAptosDocencia, filtroEspacioBarras]);

  const espaciosBarrasIdsSet = useMemo(() => new Set(espaciosParaBarras.map((e) => e.id)), [espaciosParaBarras]);

  const metricasBarrasDias = useMemo(() => {
    const DIAS_CONFIG: { id: DiaSemana; nombre: string; corto: string; horasBase: number }[] = [
      { id: 'lunes', nombre: 'Lunes', corto: 'Lun', horasBase: 12 },
      { id: 'martes', nombre: 'Martes', corto: 'Mar', horasBase: 12 },
      { id: 'miercoles', nombre: 'Miércoles', corto: 'Mié', horasBase: 12 },
      { id: 'jueves', nombre: 'Jueves', corto: 'Jue', horasBase: 12 },
      { id: 'viernes', nombre: 'Viernes', corto: 'Vie', horasBase: 12 },
      { id: 'sabado', nombre: 'Sábado', corto: 'Sáb', horasBase: 6 }
    ];

    const numEspacios = Math.max(1, espaciosParaBarras.length);

    // Suma de capacidad física de asientos de los espacios evaluados
    const capacidadAlumnosPorAula = espaciosParaBarras.reduce((acc, esp) => {
      const cap = (esp as any).capacidad_alumnos || (esp.capacidad_operativa_por_periodo && esp.capacidad_operativa_por_periodo['2027-1']) || esp.capacidad_maxima || 40;
      return acc + cap;
    }, 0);

    const datosPorDia = DIAS_CONFIG.map((dia) => {
      let horasOperativasDia = dia.horasBase;
      if (filtroTurnoBarras === 'matutino') {
        horasOperativasDia = 6;
      } else if (filtroTurnoBarras === 'vespertino') {
        horasOperativasDia = dia.id === 'sabado' ? 0 : 6;
      }

      const capacidadTeoricaHoras = numEspacios * horasOperativasDia;

      // Capacidad de alumnos en bloques
      const turnosBloques = filtroTurnoBarras === 'todos' ? (dia.id === 'sabado' ? 3 : 6) : 3;
      const capacidadTeoricaAlumnos = capacidadAlumnosPorAula * turnosBloques;

      // Filtrar asignaciones de este día y espacios seleccionados
      const asignacionesDia = asignaciones.filter(
        (a) => a.dia === dia.id && espaciosBarrasIdsSet.has(a.espacio_id)
      );

      let horasOcupadasMatutino = 0;
      let horasOcupadasVespertino = 0;
      let alumnosTotales = 0;
      const aulasUsadasSet = new Set<string>();

      asignacionesDia.forEach((a) => {
        const iniMin = horaAMinutos(a.hora_inicio);
        let finMin = horaAMinutos(a.hora_fin);
        if (finMin <= iniMin) finMin = iniMin + 120;

        // Horas matutinas [420, 780]
        const overlapMatMin = Math.max(0, Math.min(finMin, 780) - Math.max(iniMin, 420));
        const horasMat = overlapMatMin / 60;

        // Horas vespertinas [780, 1200]
        const overlapVespMin = Math.max(0, Math.min(finMin, 1200) - Math.max(iniMin, 780));
        const horasVesp = overlapVespMin / 60;

        horasOcupadasMatutino += horasMat;
        horasOcupadasVespertino += horasVesp;

        if (horasMat > 0 || horasVesp > 0) {
          aulasUsadasSet.add(a.espacio_id);
          const duracion = (finMin - iniMin) / 60;
          alumnosTotales += (a.alumnos_programados || 30) * Math.max(1, Math.round(duracion / 1.5));
        }
      });

      let horasRealesOcupadas = 0;
      if (filtroTurnoBarras === 'matutino') {
        horasRealesOcupadas = horasOcupadasMatutino;
      } else if (filtroTurnoBarras === 'vespertino') {
        horasRealesOcupadas = horasOcupadasVespertino;
      } else {
        horasRealesOcupadas = horasOcupadasMatutino + horasOcupadasVespertino;
      }

      const ocupacionReal = metricaBarras === 'horas'
        ? Number(horasRealesOcupadas.toFixed(1))
        : alumnosTotales;

      const capacidadTeorica = metricaBarras === 'horas'
        ? capacidadTeoricaHoras
        : capacidadTeoricaAlumnos;

      const saturacionPct = capacidadTeorica > 0
        ? Math.min(100, Math.round((ocupacionReal / capacidadTeorica) * 100))
        : 0;

      const horasLibres = Math.max(0, capacidadTeoricaHoras - horasRealesOcupadas);

      let nivelSaturacion: 'critica' | 'alta' | 'moderada' | 'baja' = 'baja';
      if (saturacionPct >= 90) nivelSaturacion = 'critica';
      else if (saturacionPct >= 75) nivelSaturacion = 'alta';
      else if (saturacionPct >= 50) nivelSaturacion = 'moderada';

      const barColor = saturacionPct >= 90
        ? '#e11d48' // Rose-600
        : saturacionPct >= 75
        ? '#0284c7' // Sky-600 institucional
        : saturacionPct >= 50
        ? '#0ea5e9' // Sky-500
        : '#94a3b8'; // Slate-400

      return {
        diaId: dia.id,
        diaNombre: dia.nombre,
        diaCorto: dia.corto,
        nombreCompleto: dia.nombre,
        capacidadTeorica,
        ocupacionReal,
        capacidadTeoricaHoras,
        horasRealesOcupadas: Number(horasRealesOcupadas.toFixed(1)),
        horasLibres: Number(horasLibres.toFixed(1)),
        saturacionPct,
        alumnosTotales,
        capacidadTeoricaAlumnos,
        aulasUsadas: aulasUsadasSet.size,
        totalAulas: numEspacios,
        horasMatutino: Number(horasOcupadasMatutino.toFixed(1)),
        horasVespertino: Number(horasOcupadasVespertino.toFixed(1)),
        totalSesiones: asignacionesDia.length,
        nivelSaturacion,
        barColor
      };
    });

    const diasLaborables = datosPorDia.filter((d) => d.diaId !== 'sabado');
    const diasOrdenados = [...datosPorDia].sort((a, b) => b.saturacionPct - a.saturacionPct);
    const diaMaxSaturacion = diasOrdenados[0] || datosPorDia[0];

    const diasConClases = diasLaborables.filter((d) => d.horasRealesOcupadas > 0);
    const diaMinSaturacion = diasConClases.length > 0
      ? [...diasConClases].sort((a, b) => a.saturacionPct - b.saturacionPct)[0]
      : diasLaborables[diasLaborables.length - 1];

    const diasCriticos = datosPorDia.filter((d) => d.saturacionPct >= 90);
    const diasAltaDemanda = datosPorDia.filter((d) => d.saturacionPct >= 75 && d.saturacionPct < 90);

    const totalHorasRealesSemana = datosPorDia.reduce((acc, d) => acc + d.horasRealesOcupadas, 0);
    const totalCapacidadTeoricaSemana = datosPorDia.reduce((acc, d) => acc + d.capacidadTeoricaHoras, 0);
    const promedioSaturacionSemana = totalCapacidadTeoricaSemana > 0
      ? Math.min(100, Math.round((totalHorasRealesSemana / totalCapacidadTeoricaSemana) * 100))
      : 0;

    return {
      datosPorDia,
      diaMaxSaturacion,
      diaMinSaturacion,
      diasCriticos,
      diasAltaDemanda,
      totalHorasRealesSemana: Number(totalHorasRealesSemana.toFixed(1)),
      totalCapacidadTeoricaSemana,
      promedioSaturacionSemana,
      numEspacios
    };
  }, [espaciosParaBarras, espaciosBarrasIdsSet, asignaciones, filtroEspacioBarras, filtroTurnoBarras, metricaBarras]);

  // Tooltip personalizado para el Gráfico de Barras Recharts
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isCritico = data.saturacionPct >= 90;
      const isAlta = data.saturacionPct >= 75 && data.saturacionPct < 90;
      return (
        <div className="bg-slate-900/95 text-white text-xs p-3.5 rounded-xl shadow-2xl border border-slate-700 space-y-2 backdrop-blur-xs min-w-[240px]">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>{data.diaNombre}</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isCritico
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : isAlta
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {isCritico ? 'Saturación Crítica' : isAlta ? 'Alta Demanda' : 'Margen Óptimo'}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs inline-block" style={{ backgroundColor: data.barColor }} />
                <span>Ocupación Real:</span>
              </span>
              <strong className="text-white font-mono text-xs">
                {data.ocupacionReal} {metricaBarras === 'horas' ? 'hrs' : 'estudiantes'}
              </strong>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-400 inline-block" />
                <span>Capacidad Teórica:</span>
              </span>
              <strong className="text-slate-300 font-mono text-xs">
                {data.capacidadTeorica} {metricaBarras === 'horas' ? 'hrs' : 'asientos'}
              </strong>
            </div>

            <div className="flex justify-between items-center pt-1.5 border-t border-slate-800">
              <span className="text-slate-400">Tasa de Saturación Física:</span>
              <strong
                className={`font-mono text-sm ${
                  isCritico ? 'text-rose-400 font-black' : isAlta ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {data.saturacionPct}%
              </strong>
            </div>

            <div className="flex justify-between items-center text-slate-400 text-[10px]">
              <span>Margen Disponible:</span>
              <span className="font-mono text-emerald-400 font-semibold">{data.horasLibres} hrs disponibles</span>
            </div>

            <div className="flex justify-between items-center text-slate-400 text-[10px]">
              <span>Aulas en Uso:</span>
              <span className="font-mono text-slate-200">
                {data.aulasUsadas} de {data.totalAulas} aulas ({data.totalAulas > 0 ? Math.round((data.aulasUsadas / data.totalAulas) * 100) : 0}%)
              </span>
            </div>

            {metricaBarras === 'horas' && (
              <div className="pt-1.5 border-t border-slate-800 flex justify-between text-[10px] text-slate-400">
                <span>Mat: <strong className="text-sky-300 font-mono">{data.horasMatutino}h</strong></span>
                <span>Vesp: <strong className="text-amber-300 font-mono">{data.horasVespertino}h</strong></span>
                <span>Sesiones: <strong className="text-slate-200 font-mono">{data.totalSesiones}</strong></span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

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
            <span className="text-2xl font-black text-slate-800">{porcentajeOcupacionGlobal}%</span>
            <div className="w-full h-2 bg-slate-100 rounded-full mb-2 overflow-hidden flex-1">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${porcentajeOcupacionGlobal}%` }}
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

      {/* ========================================================================= */}
      {/* SECCIÓN: MAXIMIZAR USO DE INFRAESTRUCTURA (BEST FIT & EFICIENCIA DE ESPACIOS) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="p-1 rounded-md bg-emerald-100 text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </span>
              <h2 className="text-sm font-bold text-[#0c2d48]">
                Optimizador y Aprovechamiento de Infraestructura FCM 2027-1
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                Best-Fit Engine
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Monitoreo del cupo vs saturación real para maximizar la infraestructura y evitar aulas subutilizadas o sobrecupo
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavegar('matriz_espacios')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Matriz de Espacios</span>
            </button>
            <button
              type="button"
              onClick={() => onNavegar('comunicacion_estudiantes')}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Directorio y Tutorías</span>
            </button>
          </div>
        </div>

        {/* Indicadores de Infraestructura */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
              Aprovechamiento Global
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-800">
                {metricasInfra.tasaOcupacionGlobal}%
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">Capacidad instalada</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
              Espacios en Operación
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-800">
                {metricasInfra.espaciosEnUso}
              </span>
              <span className="text-[10px] text-slate-500">de {metricasInfra.espaciosTotales} salones</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mb-1">
              Ajuste Óptimo (60%-100%)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-emerald-900">
                {metricasInfra.aulasOptimas}
              </span>
              <span className="text-[10px] text-emerald-700">sesiones bien alineadas</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80">
            <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block mb-1">
              Oportunidades de Mejora
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-amber-900">
                {metricasInfra.aulasSubutilizadas}
              </span>
              <span className="text-[10px] text-amber-700">aulas subutilizadas (&lt;40%)</span>
            </div>
          </div>
        </div>

        {/* Sugerencias de Reubicación Inteligente para Maximizar Infraestructura */}
        {metricasInfra.sugerenciasOptimizacion.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Recomendaciones Automáticas de Reubicación (Maximizar Uso):</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {metricasInfra.sugerenciasOptimizacion.length} mejoras detectadas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {metricasInfra.sugerenciasOptimizacion.map((sug) => {
                const asigObj = asignaciones.find((a) => a.id === sug.asignacion_id);

                return (
                  <div
                    key={sug.id}
                    className="p-3 bg-gradient-to-r from-slate-50 to-indigo-50/30 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2 text-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-slate-900 truncate">{sug.curso_nombre}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                            sug.tipo === 'alivio_sobrecupo'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {sug.tipo === 'alivio_sobrecupo' ? 'Sobrecupo' : 'Subutilizada'}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600">
                        {sug.beneficio}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-1">
                        <span>{sug.dia.toUpperCase()} {sug.horario}</span>
                        <span>·</span>
                        <span>Actual: {sug.aula_actual_codigo} ({sug.tasa_actual}% uso)</span>
                        <span>&rarr;</span>
                        <span className="font-bold text-indigo-700">Sugerida: {sug.aula_sugerida_codigo} ({sug.tasa_proyectada}% uso)</span>
                      </div>
                    </div>

                    {asigObj && onMoverAsignacion && (
                      <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                        <button
                          type="button"
                          onClick={() => onMoverAsignacion(asigObj)}
                          className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-bold shadow-2xs transition flex items-center gap-1"
                        >
                          <span>Reubicar Sesión</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN PRINCIPAL: GRÁFICO CIRCULAR DE OCUPACIÓN POR TURNO (RECHARTS)      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Encabezado del Widget con Título y Controles */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-white to-sky-50/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shadow-2xs">
                  <PieChartIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0c2d48] flex items-center gap-2">
                    Porcentaje de Ocupación de Aulas por Turno
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full border border-sky-200">
                      Recharts
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Monitoreo en tiempo real de capacidad instalada: Turno Matutino (07:00 - 13:00) vs Turno Vespertino (13:00 - 19:00)
                  </p>
                </div>
              </div>
            </div>

            {/* Pestañas de modo de visualización circular */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/70 text-xs">
                <button
                  onClick={() => setModoGraficoCircular('tasa_ocupacion')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    modoGraficoCircular === 'tasa_ocupacion'
                      ? 'bg-white text-[#0c2d48] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PieChartIcon className="w-3.5 h-3.5 text-sky-600" />
                  <span>Tasa de Ocupación (Donuts)</span>
                </button>
                <button
                  onClick={() => setModoGraficoCircular('distribucion')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    modoGraficoCircular === 'distribucion'
                      ? 'bg-white text-[#0c2d48] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>Comparativa Matutino vs Vespertino</span>
                </button>
                <button
                  onClick={() => setModoGraficoCircular('detalle_aulas')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    modoGraficoCircular === 'detalle_aulas'
                      ? 'bg-white text-[#0c2d48] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Aulas más Demandadas</span>
                </button>
              </div>
            </div>
          </div>

          {/* Barra de Filtros secundarios: Tipo de Espacio y Día de la Semana */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" /> Espacios:
              </span>
              <button
                onClick={() => setTipoEspacioFiltro('todos')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  tipoEspacioFiltro === 'todos'
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({espaciosAptosDocencia.length})
              </button>
              <button
                onClick={() => setTipoEspacioFiltro('aulas')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  tipoEspacioFiltro === 'aulas'
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Aulas de Clase S1-S8 / AM1-AM2 ({aulas})
              </button>
              <button
                onClick={() => setTipoEspacioFiltro('laboratorios')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  tipoEspacioFiltro === 'laboratorios'
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Laboratorios ({laboratorios})
              </button>
              <button
                onClick={() => setTipoEspacioFiltro('posgrado')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  tipoEspacioFiltro === 'posgrado'
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Posgrado ({posgradoEspacios})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Día:
              </span>
              <select
                value={diaFiltro}
                onChange={(e) => setDiaFiltro(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-700 font-medium text-xs focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
              >
                <option value="todos">Semana Completa (Lun - Vie)</option>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miercoles">Miércoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sabado">Sábado (Posgrado/Talleres)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cuerpo del Widget: Gráficos Circulares y Tarjetas Analíticas */}
        <div className="p-6">
          {/* ========================================================================= */}
          {/* TARJETAS DE KPI RESUMEN SOBRE EL GRÁFICO CIRCULAR                        */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* KPI 1: Número Total de Aulas */}
            <div className="bg-gradient-to-br from-slate-50/90 via-white to-sky-50/30 p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-sky-100 text-sky-700">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  Total de Aulas
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {tipoEspacioFiltro === 'todos' ? 'Catálogo activo' : tipoEspacioFiltro}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#0c2d48] tracking-tight">
                  {metricasTurnos.numEspacios}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  espacios de clase evaluados
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Capacidad del período:</span>
                <span className="font-bold text-slate-700 font-mono">
                  {metricasTurnos.capacidadTotalAmbosTurnos} hrs instaladas
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">{aulas} teóricas (S1–S8, AM)</span>
                <span>•</span>
                <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">{laboratorios} laboratorios</span>
                <span>•</span>
                <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">{posgradoEspacios} posgrado</span>
              </div>
            </div>

            {/* KPI 2: Aulas con Ocupación Mayor al 90% */}
            <div
              onClick={() => setModoGraficoCircular('detalle_aulas')}
              className={`p-4 rounded-2xl border shadow-2xs hover:shadow-xs transition cursor-pointer group ${
                metricasTurnos.aulasMasDe90.length > 0
                  ? 'bg-gradient-to-br from-rose-50/80 via-white to-amber-50/30 border-rose-200/90 hover:border-rose-300'
                  : 'bg-gradient-to-br from-emerald-50/70 via-white to-slate-50/30 border-emerald-200/90 hover:border-emerald-300'
              }`}
              title="Haz clic para ver el ranking detallado de saturación de aulas"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-700">
                  <div className={`p-1 rounded-md ${
                    metricasTurnos.aulasMasDe90.length > 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  Ocupación &gt; 90%
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                  metricasTurnos.aulasMasDe90.length > 0
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}>
                  {metricasTurnos.aulasMasDe90.length > 0 ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      Saturación Crítica
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Margen Óptimo
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black tracking-tight ${
                    metricasTurnos.aulasMasDe90.length > 0 ? 'text-rose-600' : 'text-emerald-700'
                  }`}>
                    {metricasTurnos.aulasMasDe90.length}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {metricasTurnos.aulasMasDe90.length === 1 ? 'aula en sobrecupo' : 'aulas con &gt;90% saturación'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-700 transition font-medium flex items-center gap-0.5">
                  Ver detalle →
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                {metricasTurnos.aulasMasDe90.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-rose-800 font-medium">Aulas pico:</span>
                    {metricasTurnos.aulasMasDe90.slice(0, 4).map((a) => (
                      <span
                        key={a.id}
                        className="text-[10px] font-bold font-mono px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded border border-rose-300"
                        title={`${a.nombre} - Mat: ${a.pctMat}%, Vesp: ${a.pctVesp}%`}
                      >
                        {a.codigo} ({Math.max(a.pctMat, a.pctVesp)}%)
                      </span>
                    ))}
                    {metricasTurnos.aulasMasDe90.length > 4 && (
                      <span className="text-[10px] text-slate-500">+{metricasTurnos.aulasMasDe90.length - 4} más</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sin aulas en sobrecupo crítico (&gt;90%)</span>
                  </div>
                )}
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                <span>En Matutino: <strong className="text-slate-600 font-mono">{metricasTurnos.aulasMasDe90Matutino.length}</strong></span>
                <span>En Vespertino: <strong className="text-slate-600 font-mono">{metricasTurnos.aulasMasDe90Vespertino.length}</strong></span>
                <span>Global &gt;90%: <strong className="text-slate-600 font-mono">{metricasTurnos.aulasMasDe90Total.length}</strong></span>
              </div>
            </div>

            {/* KPI 3: Promedio General de Ocupación por Turno */}
            <div className="bg-gradient-to-br from-slate-50/90 via-white to-indigo-50/30 p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-indigo-100 text-indigo-700">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  Promedio por Turno
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Global: {metricasTurnos.promedioGeneralOcupacion}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {/* Matutino mini stat */}
                <div className="bg-sky-50/80 p-2.5 rounded-xl border border-sky-200/70">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-sky-800">
                      <Sun className="w-3 h-3 text-sky-600" /> Matutino
                    </div>
                    <span className="text-[9px] text-sky-600 font-mono">07-13h</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-black text-sky-950 font-mono">
                      {metricasTurnos.porcentajeOcupacionMatutino}%
                    </span>
                    <span className="text-[10px] text-sky-700 font-medium">promedio</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5 font-mono">
                    {metricasTurnos.horasOcupadasMatutino}h de {metricasTurnos.capacidadHorasMatutino}h
                  </p>
                </div>

                {/* Vespertino mini stat */}
                <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/70">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800">
                      <Moon className="w-3 h-3 text-amber-600" /> Vespertino
                    </div>
                    <span className="text-[9px] text-amber-600 font-mono">13-19h</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-black text-amber-950 font-mono">
                      {metricasTurnos.porcentajeOcupacionVespertino}%
                    </span>
                    <span className="text-[10px] text-amber-700 font-medium">promedio</span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5 font-mono">
                    {metricasTurnos.horasOcupadasVespertino}h de {metricasTurnos.capacidadHorasVespertino}h
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Diferencial:</span>
                <span className="font-bold text-slate-700 text-[10px]">
                  {metricasTurnos.porcentajeOcupacionMatutino > metricasTurnos.porcentajeOcupacionVespertino
                    ? `Matutino +${metricasTurnos.porcentajeOcupacionMatutino - metricasTurnos.porcentajeOcupacionVespertino}% más ocupado`
                    : metricasTurnos.porcentajeOcupacionVespertino > metricasTurnos.porcentajeOcupacionMatutino
                    ? `Vespertino +${metricasTurnos.porcentajeOcupacionVespertino - metricasTurnos.porcentajeOcupacionMatutino}% más ocupado`
                    : 'Turnos balanceados'}
                </span>
              </div>
            </div>
          </div>

          {/* MODO 1: TASA DE OCUPACIÓN POR TURNO (DONUTS DUALES RECHARTS) */}
          {modoGraficoCircular === 'tasa_ocupacion' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center">
              {/* Gráfico 1: Turno Matutino */}
              <div className="lg:col-span-4 bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 flex flex-col items-center relative group hover:border-sky-300 transition-colors">
                <div className="w-full flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-sky-100 text-sky-700 rounded-lg">
                      <Sun className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Turno Matutino</h3>
                      <p className="text-[11px] text-slate-500 font-mono">07:00 — 13:00 hrs</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-full">
                    {metricasTurnos.porcentajeOcupacionMatutino}% Ocupado
                  </span>
                </div>

                {/* Contenedor del gráfico circular Recharts */}
                <div className="w-full h-[220px] relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={datosCircularMatutino}
                        cx="50%"
                        cy="50%"
                        innerRadius={62}
                        outerRadius={88}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {datosCircularMatutino.map((entry, index) => (
                          <Cell
                            key={`cell-mat-${index}`}
                            fill={entry.color}
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Texto numérico central en el Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-sky-900 tracking-tight">
                      {metricasTurnos.porcentajeOcupacionMatutino}%
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Ocupación
                    </span>
                  </div>
                </div>

                {/* Métricas clave del turno matutino */}
                <div className="w-full grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-200/80 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Horas Asignadas</p>
                    <p className="text-sm font-bold text-sky-900 font-mono">
                      {metricasTurnos.horasOcupadasMatutino} hrs
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Capacidad Base</p>
                    <p className="text-sm font-bold text-slate-700 font-mono">
                      {metricasTurnos.capacidadHorasMatutino} hrs
                    </p>
                  </div>
                </div>

                <div className="w-full mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Horas disponibles:</span>
                  <span className="font-bold text-emerald-600 font-mono">{metricasTurnos.horasLibresMatutino} hrs libres</span>
                </div>
              </div>

              {/* Gráfico 2: Turno Vespertino */}
              <div className="lg:col-span-4 bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 flex flex-col items-center relative group hover:border-amber-300 transition-colors">
                <div className="w-full flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                      <Moon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Turno Vespertino</h3>
                      <p className="text-[11px] text-slate-500 font-mono">13:00 — 19:00 hrs</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                    {metricasTurnos.porcentajeOcupacionVespertino}% Ocupado
                  </span>
                </div>

                {/* Contenedor del gráfico circular Recharts */}
                <div className="w-full h-[220px] relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={datosCircularVespertino}
                        cx="50%"
                        cy="50%"
                        innerRadius={62}
                        outerRadius={88}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {datosCircularVespertino.map((entry, index) => (
                          <Cell
                            key={`cell-vesp-${index}`}
                            fill={entry.color}
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Texto numérico central en el Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-amber-900 tracking-tight">
                      {metricasTurnos.porcentajeOcupacionVespertino}%
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Ocupación
                    </span>
                  </div>
                </div>

                {/* Métricas clave del turno vespertino */}
                <div className="w-full grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-200/80 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Horas Asignadas</p>
                    <p className="text-sm font-bold text-amber-900 font-mono">
                      {metricasTurnos.horasOcupadasVespertino} hrs
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Capacidad Base</p>
                    <p className="text-sm font-bold text-slate-700 font-mono">
                      {metricasTurnos.capacidadHorasVespertino} hrs
                    </p>
                  </div>
                </div>

                <div className="w-full mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Margen de crecimiento:</span>
                  <span className="font-bold text-emerald-600 font-mono">{metricasTurnos.horasLibresVespertino} hrs libres</span>
                </div>
              </div>

              {/* Columna Derecha: Panel de Diagnóstico Estratégico y Balance */}
              <div className="lg:col-span-4 flex flex-col gap-3 justify-between h-full">
                {/* Diagnóstico de Saturación */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-sky-700" />
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Balance Operativo de Turnos
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {metricasTurnos.porcentajeOcupacionMatutino > 65 ? (
                      <span>
                        El <strong>Turno Matutino ({metricasTurnos.porcentajeOcupacionMatutino}%)</strong> presenta alta demanda y concentración de cursos teóricos. El Turno Vespertino cuenta con <strong>{metricasTurnos.horasLibresVespertino} hrs libres</strong> disponibles para reubicar materias y despresurizar aulas.
                      </span>
                    ) : (
                      <span>
                        Distribución estable: Las aulas cuentan con suficiente margen operativo tanto en la mañana ({metricasTurnos.porcentajeOcupacionMatutino}%) como en la tarde ({metricasTurnos.porcentajeOcupacionVespertino}%).
                      </span>
                    )}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-200/70 space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Proporción Matutino / Total:</span>
                      <strong className="text-sky-700 font-mono">{metricasTurnos.porcentajeShareMatutino}%</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Proporción Vespertino / Total:</span>
                      <strong className="text-amber-700 font-mono">{metricasTurnos.porcentajeShareVespertino}%</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex mt-1">
                      <div
                        className="h-full bg-sky-600 transition-all"
                        style={{ width: `${metricasTurnos.porcentajeShareMatutino}%` }}
                        title={`Matutino: ${metricasTurnos.porcentajeShareMatutino}%`}
                      />
                      <div
                        className="h-full bg-amber-500 transition-all"
                        style={{ width: `${metricasTurnos.porcentajeShareVespertino}%` }}
                        title={`Vespertino: ${metricasTurnos.porcentajeShareVespertino}%`}
                      />
                    </div>
                  </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-[#0c2d48] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      Optimización de Horarios FCM
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {espaciosParaTurnos.length} espacios analizados en {diaFiltro === 'todos' ? 'semana completa' : diaFiltro}.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavegar('matriz_espacios')}
                      className="flex-1 py-1.5 px-3 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition text-center shadow-2xs"
                    >
                      Matriz de Aulas
                    </button>
                    <button
                      onClick={() => onNavegar('reporte_avance')}
                      className="flex-1 py-1.5 px-3 bg-[#0c2d48] text-white text-xs font-bold rounded-lg hover:bg-[#164268] transition text-center shadow-2xs"
                    >
                      Reporte Completo →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODO 2: COMPARATIVA GLOBAL MATUTINO VS VESPERTINO (PIECHART GRANDE) */}
          {modoGraficoCircular === 'distribucion' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 bg-slate-50/60 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Distribución Relativa de Horas Impartidas por Turno
                </h3>
                <p className="text-xs text-slate-500 mb-4 text-center">
                  Participación porcentual de la carga docente semanal entre el turno de la mañana y de la tarde
                </p>

                <div className="w-full h-[280px]">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={datosCircularComparativo}
                        cx="50%"
                        cy="50%"
                        innerRadius={68}
                        outerRadius={105}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, porcentaje }) => `${name.split(' ')[1]}: ${porcentaje}%`}
                      >
                        {datosCircularComparativo.map((entry, index) => (
                          <Cell
                            key={`cell-comp-${index}`}
                            fill={entry.color}
                            stroke="#ffffff"
                            strokeWidth={3}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span className="text-xs text-slate-700 font-semibold">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tarjetas informativas de comparación */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-sky-600" />
                      Turno Matutino (07:00 a 13:00)
                    </span>
                    <span className="text-sm font-black text-sky-800 font-mono">
                      {metricasTurnos.porcentajeShareMatutino}%
                    </span>
                  </div>
                  <p className="text-xs text-sky-800 mt-1">
                    Concentra <strong>{metricasTurnos.horasOcupadasMatutino} horas</strong> semanales de clases. Corresponde a una tasa de ocupación del <strong>{metricasTurnos.porcentajeOcupacionMatutino}%</strong> de las aulas matutinas.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Moon className="w-4 h-4 text-amber-600" />
                      Turno Vespertino (13:00 a 19:00)
                    </span>
                    <span className="text-sm font-black text-amber-800 font-mono">
                      {metricasTurnos.porcentajeShareVespertino}%
                    </span>
                  </div>
                  <p className="text-xs text-amber-800 mt-1">
                    Concentra <strong>{metricasTurnos.horasOcupadasVespertino} horas</strong> semanales de clases. Corresponde a una tasa de ocupación del <strong>{metricasTurnos.porcentajeOcupacionVespertino}%</strong> de las aulas vespertinas.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs space-y-2">
                  <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                    Conclusión de Planificación
                  </span>
                  <p className="text-slate-600">
                    Existe una mayor concentración de actividades docentes en el bloque de 08:30 a 12:00. Se recomienda priorizar la asignación de laboratorios prácticos y materias optativas en el bloque vespertino para evitar saturación en aulas troncales.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MODO 3: AULAS MÁS DEMANDADAS POR TURNO */}
          {modoGraficoCircular === 'detalle_aulas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Aulas Matutino */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5 text-sky-900 font-bold text-xs">
                    <Sun className="w-4 h-4 text-sky-600" />
                    <span>Aulas con Mayor Ocupación Matutina</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 font-mono">Top 5</span>
                </div>
                <div className="space-y-3">
                  {metricasTurnos.topAulasMatutino.map((aula) => (
                    <div key={`top-mat-${aula.id}`} className="bg-white p-3 rounded-lg border border-slate-100 shadow-2xs">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>{aula.codigo} · {aula.nombre}</span>
                        <span className={`font-mono ${aula.pctMat >= 75 ? 'text-red-600' : 'text-sky-700'}`}>
                          {aula.pctMat}% ({aula.horasMat} hrs)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            aula.pctMat >= 75 ? 'bg-red-500' : 'bg-sky-500'
                          }`}
                          style={{ width: `${aula.pctMat}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                        <span>{aula.edificio}</span>
                        <span>Tipo: {aula.tipo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Aulas Vespertino */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <Moon className="w-4 h-4 text-amber-600" />
                    <span>Aulas con Mayor Ocupación Vespertina</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 font-mono">Top 5</span>
                </div>
                <div className="space-y-3">
                  {metricasTurnos.topAulasVespertino.map((aula) => (
                    <div key={`top-vesp-${aula.id}`} className="bg-white p-3 rounded-lg border border-slate-100 shadow-2xs">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>{aula.codigo} · {aula.nombre}</span>
                        <span className={`font-mono ${aula.pctVesp >= 75 ? 'text-red-600' : 'text-amber-700'}`}>
                          {aula.pctVesp}% ({aula.horasVesp} hrs)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            aula.pctVesp >= 75 ? 'bg-red-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${aula.pctVesp}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                        <span>{aula.edificio}</span>
                        <span>Tipo: {aula.tipo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN ADICIONAL: GRÁFICO DE BARRAS DE OCUPACIÓN REAL VS. CAPACIDAD TEÓRICA */}
      {/* POR DÍA DE LA SEMANA (RECHARTS) - IDENTIFICACIÓN DE DÍAS CON SATURACIÓN FÍSICA */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Encabezado del Widget con Título y Controles */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-white to-indigo-50/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-2xs">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0c2d48] flex items-center gap-2 flex-wrap">
                    Ocupación Real vs. Capacidad Teórica por Día
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200">
                      Recharts BarChart
                    </span>
                    {metricasBarrasDias.diaMaxSaturacion && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        metricasBarrasDias.diaMaxSaturacion.saturacionPct >= 90
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        <Flame className="w-3 h-3 text-rose-600" />
                        Día Pico: {metricasBarrasDias.diaMaxSaturacion.diaNombre} ({metricasBarrasDias.diaMaxSaturacion.saturacionPct}%)
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Comparativa de horas programadas frente a la capacidad física teórica instalada para identificar saturación y días críticos
                  </p>
                </div>
              </div>
            </div>

            {/* Controles de Vista de Métrica y Turno */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Toggle de Métrica: Horas de Aula vs Alumnos */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/70 text-xs">
                <button
                  onClick={() => setMetricaBarras('horas')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    metricaBarras === 'horas'
                      ? 'bg-white text-[#0c2d48] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Horas de Aula (hrs)</span>
                </button>
                <button
                  onClick={() => setMetricaBarras('alumnos')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    metricaBarras === 'alumnos'
                      ? 'bg-white text-[#0c2d48] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Capacidad de Alumnos</span>
                </button>
              </div>

              {/* Toggle de Turno evaluado */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/70 text-xs">
                <button
                  onClick={() => setFiltroTurnoBarras('todos')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    filtroTurnoBarras === 'todos'
                      ? 'bg-white text-slate-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Todo el día (07:00 a 19:00)"
                >
                  Jornada Completa
                </button>
                <button
                  onClick={() => setFiltroTurnoBarras('matutino')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1 ${
                    filtroTurnoBarras === 'matutino'
                      ? 'bg-white text-sky-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Turno Matutino (07:00 a 13:00)"
                >
                  <Sun className="w-3 h-3 text-sky-600" /> Matutino
                </button>
                <button
                  onClick={() => setFiltroTurnoBarras('vespertino')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1 ${
                    filtroTurnoBarras === 'vespertino'
                      ? 'bg-white text-amber-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Turno Vespertino (13:00 a 19:00)"
                >
                  <Moon className="w-3 h-3 text-amber-600" /> Vespertino
                </button>
              </div>
            </div>
          </div>

          {/* Barra de Filtro de Espacios para el Gráfico de Barras */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" /> Espacios analizados:
              </span>
              <button
                onClick={() => setFiltroEspacioBarras('todos')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  filtroEspacioBarras === 'todos'
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos los Espacios ({espaciosAptosDocencia.length})
              </button>
              <button
                onClick={() => setFiltroEspacioBarras('aulas')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  filtroEspacioBarras === 'aulas'
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Aulas de Clase S1-S8 / AM ({aulas})
              </button>
              <button
                onClick={() => setFiltroEspacioBarras('laboratorios')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  filtroEspacioBarras === 'laboratorios'
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Laboratorios ({laboratorios})
              </button>
              <button
                onClick={() => setFiltroEspacioBarras('posgrado')}
                className={`px-2.5 py-1 rounded-md font-semibold transition ${
                  filtroEspacioBarras === 'posgrado'
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Posgrado ({posgradoEspacios})
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span>Capacidad Teórica</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0284c7] ml-2"></span>
              <span>Ocupación Regular</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#e11d48] ml-2"></span>
              <span>Sobrecupo (&gt;90%)</span>
            </div>
          </div>
        </div>

        {/* Cuerpo del Widget de Barras */}
        <div className="p-6">
          {/* ========================================================================= */}
          {/* TARJETAS KPI DE RESUMEN SEMANAL DE SATURACIÓN FÍSICA                     */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* KPI Barras 1: Día Pico de Saturación */}
            <div className="bg-gradient-to-br from-rose-50/80 via-white to-amber-50/40 p-4 rounded-2xl border border-rose-200/90 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-rose-100 text-rose-700">
                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  Día Más Saturado
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  metricasBarrasDias.diaMaxSaturacion.saturacionPct >= 90
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}>
                  {metricasBarrasDias.diaMaxSaturacion.saturacionPct >= 90 ? 'Sobrecupo Crítico' : 'Demanda Máxima'}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-rose-900 tracking-tight">
                    {metricasBarrasDias.diaMaxSaturacion.diaNombre}
                  </span>
                  <span className="ml-2 text-xl font-bold text-rose-600 font-mono">
                    {metricasBarrasDias.diaMaxSaturacion.saturacionPct}%
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-rose-100 flex items-center justify-between text-[11px] text-slate-600">
                <span>Carga programada:</span>
                <span className="font-bold text-rose-950 font-mono">
                  {metricasBarrasDias.diaMaxSaturacion.horasRealesOcupadas}h de {metricasBarrasDias.diaMaxSaturacion.capacidadTeoricaHoras}h
                </span>
              </div>
              <p className="mt-1 text-[10px] text-slate-500">
                {metricasBarrasDias.diaMaxSaturacion.aulasUsadas} aulas en uso simultáneo · {metricasBarrasDias.diaMaxSaturacion.totalSesiones} sesiones
              </p>
            </div>

            {/* KPI Barras 2: Día con Mayor Disponibilidad */}
            <div className="bg-gradient-to-br from-emerald-50/80 via-white to-slate-50/40 p-4 rounded-2xl border border-emerald-200/90 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  Mayor Disponibilidad
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Margen Operativo
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-emerald-900 tracking-tight">
                    {metricasBarrasDias.diaMinSaturacion.diaNombre}
                  </span>
                  <span className="ml-2 text-xl font-bold text-emerald-600 font-mono">
                    {metricasBarrasDias.diaMinSaturacion.saturacionPct}%
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-emerald-100 flex items-center justify-between text-[11px] text-slate-600">
                <span>Horas disponibles:</span>
                <span className="font-bold text-emerald-700 font-mono">
                  {metricasBarrasDias.diaMinSaturacion.horasLibres} hrs libres
                </span>
              </div>
              <p className="mt-1 text-[10px] text-slate-500">
                Espacio ideal para reprogramar materias y despresurizar días pico
              </p>
            </div>

            {/* KPI Barras 3: Promedio Semanal */}
            <div className="bg-gradient-to-br from-indigo-50/80 via-white to-slate-50/40 p-4 rounded-2xl border border-indigo-200/90 shadow-2xs hover:shadow-xs transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-indigo-100 text-indigo-700">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  Promedio Semanal
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                  Lunes — Viernes
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#0c2d48] tracking-tight font-mono">
                  {metricasBarrasDias.promedioSaturacionSemana}%
                </span>
                <span className="text-xs text-slate-500 font-medium">ocupación global</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-indigo-100 flex items-center justify-between text-[11px] text-slate-600">
                <span>Total computado:</span>
                <span className="font-bold text-slate-700 font-mono">
                  {metricasBarrasDias.totalHorasRealesSemana}h / {metricasBarrasDias.totalCapacidadTeoricaSemana}h
                </span>
              </div>
              <p className="mt-1 text-[10px] text-slate-500">
                {metricasBarrasDias.numEspacios} espacios físicos evaluados en total
              </p>
            </div>

            {/* KPI Barras 4: Días en Saturación Crítica */}
            <div className={`p-4 rounded-2xl border shadow-2xs hover:shadow-xs transition ${
              metricasBarrasDias.diasCriticos.length > 0
                ? 'bg-gradient-to-br from-rose-50/90 via-white to-amber-50/30 border-rose-300'
                : 'bg-gradient-to-br from-slate-50/90 via-white to-sky-50/30 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <div className={`p-1 rounded-md ${
                    metricasBarrasDias.diasCriticos.length > 0 ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-700'
                  }`}>
                    <AlertOctagon className="w-3.5 h-3.5" />
                  </div>
                  Saturación &gt; 90%
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  metricasBarrasDias.diasCriticos.length > 0
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {metricasBarrasDias.diasCriticos.length > 0 ? 'Cuello de Botella' : 'Sin Alertas'}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black tracking-tight ${
                  metricasBarrasDias.diasCriticos.length > 0 ? 'text-rose-600' : 'text-slate-700'
                }`}>
                  {metricasBarrasDias.diasCriticos.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {metricasBarrasDias.diasCriticos.length === 1 ? 'día con sobrecupo' : 'días con &gt;90%'}
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                {metricasBarrasDias.diasCriticos.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {metricasBarrasDias.diasCriticos.map((d) => (
                      <span
                        key={`crit-${d.diaId}`}
                        className="text-[10px] font-bold font-mono px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded border border-rose-300"
                      >
                        {d.diaNombre} ({d.saturacionPct}%)
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ningún día supera el 90% de ocupación</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-[10px] text-slate-400">
                {metricasBarrasDias.diasAltaDemanda.length} días adicionales con demanda alta (75–89%)
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* GRÁFICO DE BARRAS RECHARTS: OCUPACIÓN REAL VS CAPACIDAD TEÓRICA          */}
          {/* ========================================================================= */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/90 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-2 border-b border-slate-200/80 gap-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-700" />
                <h3 className="text-sm font-bold text-slate-800">
                  Comparativa de Ocupación Real vs. Capacidad Teórica por Día
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[11px] text-slate-500 font-medium">
                  {metricaBarras === 'horas'
                    ? 'Unidad: Horas de Aula Programadas'
                    : 'Unidad: Estudiantes Programados en Asientos'}
                </span>
              </div>
            </div>

            {/* Contenedor del Gráfico de Barras Recharts */}
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={metricasBarrasDias.datosPorDia}
                  margin={{ top: 20, right: 25, left: 10, bottom: 15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="diaNombre"
                    tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    unit={metricaBarras === 'horas' ? 'h' : ''}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: 12 }}
                    formatter={(value) => <span className="text-xs font-bold text-slate-700">{value}</span>}
                  />
                  {/* Línea de referencia del umbral crítico (90% de la capacidad del día pico) */}
                  <ReferenceLine
                    y={Math.round(metricasBarrasDias.diaMaxSaturacion.capacidadTeorica * 0.9)}
                    stroke="#e11d48"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: `Límite Crítico 90% (${Math.round(metricasBarrasDias.diaMaxSaturacion.capacidadTeorica * 0.9)} ${metricaBarras === 'horas' ? 'hrs' : 'alumnos'})`,
                      position: 'top',
                      fill: '#e11d48',
                      fontSize: 10,
                      fontWeight: 'bold'
                    }}
                  />
                  <Bar
                    dataKey="capacidadTeorica"
                    name={metricaBarras === 'horas' ? 'Capacidad Teórica Instalada (hrs)' : 'Capacidad Teórica de Asientos'}
                    fill="#cbd5e1"
                    radius={[6, 6, 0, 0]}
                    barSize={26}
                  />
                  <Bar
                    dataKey="ocupacionReal"
                    name={metricaBarras === 'horas' ? 'Ocupación Real Programada (hrs)' : 'Alumnos Programados'}
                    radius={[6, 6, 0, 0]}
                    barSize={26}
                  >
                    {metricasBarrasDias.datosPorDia.map((entry, index) => (
                      <Cell
                        key={`bar-cell-${entry.diaId}-${index}`}
                        fill={
                          entry.saturacionPct >= 90
                            ? '#e11d48' // Rose 600 - Sobrecupo Crítico
                            : entry.saturacionPct >= 75
                            ? '#0284c7' // Sky 600 institucional - Alta Ocupación
                            : entry.saturacionPct >= 50
                            ? '#0ea5e9' // Sky 500 - Ocupación Moderada
                            : '#94a3b8' // Slate 400 - Baja Ocupación
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TIRA DE DÍAS DE LA SEMANA CON INDICADORES INDIVIDUALES DE SATURACIÓN      */}
          {/* ========================================================================= */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Desglose Diario de Saturación Física (Lunes a Sábado)
              </h4>
              <span className="text-[11px] text-slate-400">
                Haz clic en cualquier día para sincronizar el análisis en el gráfico circular
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {metricasBarrasDias.datosPorDia.map((d) => {
                const esPico = d.diaId === metricasBarrasDias.diaMaxSaturacion.diaId;
                const esMin = d.diaId === metricasBarrasDias.diaMinSaturacion.diaId && d.horasRealesOcupadas > 0;
                const esDiaFiltroActivo = diaFiltro === d.diaId;

                return (
                  <div
                    key={`dia-strip-${d.diaId}`}
                    onClick={() => {
                      setDiaFiltro(esDiaFiltroActivo ? 'todos' : d.diaId);
                      setDiaSeleccionadoBarras(diaSeleccionadoBarras === d.diaId ? null : d.diaId);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                      esDiaFiltroActivo
                        ? 'bg-sky-50 border-sky-400 shadow-sm ring-2 ring-sky-300'
                        : d.saturacionPct >= 90
                        ? 'bg-rose-50/60 border-rose-200/90 hover:border-rose-400'
                        : d.saturacionPct >= 75
                        ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-400'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Badge superior si es pico semanal */}
                    {esPico && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider rounded shadow-xs flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" /> Pico
                      </span>
                    )}
                    {esMin && !esPico && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider rounded shadow-xs">
                        Libre
                      </span>
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-800">
                        {d.diaNombre}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {d.diaCorto}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 my-1">
                      <span className={`text-xl font-black font-mono ${
                        d.saturacionPct >= 90
                          ? 'text-rose-600'
                          : d.saturacionPct >= 75
                          ? 'text-[#0284c7]'
                          : 'text-slate-700'
                      }`}>
                        {d.saturacionPct}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">saturación</span>
                    </div>

                    {/* Barra de progreso visual */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden my-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          d.saturacionPct >= 90
                            ? 'bg-rose-500'
                            : d.saturacionPct >= 75
                            ? 'bg-[#0284c7]'
                            : d.saturacionPct >= 50
                            ? 'bg-sky-400'
                            : 'bg-slate-300'
                        }`}
                        style={{ width: `${Math.min(100, d.saturacionPct)}%` }}
                      />
                    </div>

                    <div className="space-y-0.5 text-[10px] text-slate-500 font-mono">
                      <div className="flex justify-between">
                        <span>Ocupado:</span>
                        <strong className="text-slate-800">{d.horasRealesOcupadas} hrs</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacidad:</span>
                        <span>{d.capacidadTeoricaHoras} hrs</span>
                      </div>
                      <div className="flex justify-between text-[9px] pt-1 border-t border-slate-100 text-slate-400">
                        <span>Aulas en uso:</span>
                        <strong className="text-slate-700">{d.aulasUsadas}/{d.totalAulas}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PANEL DE DIAGNÓSTICO ESTRATÉGICO DE SATURACIÓN FÍSICA                    */}
          {/* ========================================================================= */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-50 via-sky-50/30 to-indigo-50/20 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-[#0c2d48] flex items-center gap-1.5 uppercase tracking-wider">
                <Info className="w-4 h-4 text-sky-600" />
                Diagnóstico de Capacidad y Despresurización de Horarios
              </h4>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                {metricasBarrasDias.diaMaxSaturacion.saturacionPct >= 85 ? (
                  <span>
                    El <strong>{metricasBarrasDias.diaMaxSaturacion.diaNombre}</strong> representa el cuello de botella físico de la facultad con una saturación del <strong>{metricasBarrasDias.diaMaxSaturacion.saturacionPct}%</strong> ({metricasBarrasDias.diaMaxSaturacion.horasRealesOcupadas} hrs asignadas). Se recomienda reasignar materias de este día hacia el <strong>{metricasBarrasDias.diaMinSaturacion.diaNombre} ({metricasBarrasDias.diaMinSaturacion.horasLibres} hrs libres)</strong> para garantizar holgura operativa y evitar traslapes.
                  </span>
                ) : (
                  <span>
                    La saturación física semanal está distribuida de forma homogénea con un promedio del <strong>{metricasBarrasDias.promedioSaturacionSemana}%</strong>. El día con mayor margen disponible es el <strong>{metricasBarrasDias.diaMinSaturacion.diaNombre}</strong> con <strong>{metricasBarrasDias.diaMinSaturacion.horasLibres} horas libres</strong> para programación académica adicional.
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavegar('planificacion')}
                className="py-2 px-3 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition shadow-2xs flex items-center gap-1.5"
              >
                <span>Ver Retícula</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => onNavegar('matriz_espacios')}
                className="py-2 px-3 bg-[#0c2d48] text-white text-xs font-bold rounded-lg hover:bg-[#164268] transition shadow-2xs flex items-center gap-1.5"
              >
                <span>Matriz de Aulas</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>
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
            {/* 07:00 - 08:30 Licenciatura */}
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
