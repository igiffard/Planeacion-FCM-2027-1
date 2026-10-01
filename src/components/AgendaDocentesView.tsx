/**
 * Vista de Agenda, Carga Horaria y Directorio Docente FCM 2027-1
 * Incluye barra de navegación A-Z, buscador inteligente por nombre/área/materia/cubículo,
 * selector rápido de salto, botones Anterior/Siguiente, gestión de profesores (Alta/Edición/Eliminación)
 * y auditoría de solapamientos con laboratorios especializados del plan de estudios.
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
  GraduationCap,
  Move,
  Search,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Filter,
  X,
  Sparkles,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  FileText,
  MapPin
} from 'lucide-react';
import {
  Usuario,
  Asignacion,
  Curso,
  Espacio,
  PreferenciaDocente,
  DiaSemana,
  RoleUsuario
} from '../types';
import { exportarHorarioPDF } from '../utils/exportImport';
import {
  identificarSolapamientosPosgradoYLaboratorios,
  REQUERIMIENTOS_CURRICULARES_LABORATORIO,
  esLaboratorioEspecializado
} from '../utils/conflicts';
import { ModalCrearEditarDocente } from './ModalCrearEditarDocente';

interface AgendaDocentesViewProps {
  docentes: Usuario[];
  asignaciones: Asignacion[];
  cursos: Curso[];
  espacios: Espacio[];
  preferenciasDocentes: PreferenciaDocente[];
  escenarioActivoId: string;
  periodoActivoId?: string;
  roleUsuario?: RoleUsuario;
  onMoverAsignacion?: (asignacion: Asignacion) => void;
  onCrearDocente?: (docente: Usuario) => Promise<void>;
  onActualizarDocente?: (docente: Usuario) => Promise<void>;
  onEliminarDocente?: (docenteUid: string) => Promise<void>;
}

const DIAS_SEMANA: { id: DiaSemana; nombre: string }[] = [
  { id: 'lunes', nombre: 'Lunes' },
  { id: 'martes', nombre: 'Martes' },
  { id: 'miercoles', nombre: 'Miércoles' },
  { id: 'jueves', nombre: 'Jueves' },
  { id: 'viernes', nombre: 'Viernes' },
  { id: 'sabado', nombre: 'Sábado' }
];

const ABECEDARIO = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const AgendaDocentesView: React.FC<AgendaDocentesViewProps> = ({
  docentes,
  asignaciones,
  cursos,
  espacios,
  preferenciasDocentes,
  escenarioActivoId,
  periodoActivoId = '2027-1',
  roleUsuario,
  onMoverAsignacion,
  onCrearDocente,
  onActualizarDocente,
  onEliminarDocente
}) => {
  // Filtros de navegación y búsqueda de profesores
  const [docenteSeleccionadoId, setDocenteSeleccionadoId] = useState<string>(
    docentes[0]?.uid || ''
  );
  const [busquedaTexto, setBusquedaTexto] = useState<string>('');
  const [letraSeleccionada, setLetraSeleccionada] = useState<string>('TODOS');
  const [filtroNivelDocente, setFiltroNivelDocente] = useState<
    'todos' | 'pdf_oficial' | 'posgrado' | 'con_carga' | 'sin_carga'
  >('todos');

  // Modales de docente
  const [modalDocenteAbierto, setModalDocenteAbierto] = useState<boolean>(false);
  const [docenteParaEditar, setDocenteParaEditar] = useState<Usuario | null>(null);
  const [docenteParaEliminar, setDocenteParaEliminar] = useState<Usuario | null>(null);
  const [eliminando, setEliminando] = useState<boolean>(false);

  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);
  const espaciosMap = useMemo(() => new Map(espacios.map((e) => [e.id, e])), [espacios]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);

  // Auditoría específica de solapamientos y laboratorios en Posgrado
  const auditoriaPosgrado = useMemo(() => {
    return identificarSolapamientosPosgradoYLaboratorios(
      asignaciones,
      cursos,
      espacios,
      docentes,
      periodoActivoId,
      escenarioActivoId
    );
  }, [asignaciones, cursos, espacios, docentes, periodoActivoId, escenarioActivoId]);

  // Conteo de horas y materias por cada docente
  const cargaPorDocente = useMemo(() => {
    const mapa = new Map<
      string,
      {
        horasTotales: number;
        horasPos: number;
        horasLic: number;
        numMaterias: number;
        cursosIds: Set<string>;
      }
    >();

    docentes.forEach((d) => {
      mapa.set(d.uid, {
        horasTotales: 0,
        horasPos: 0,
        horasLic: 0,
        numMaterias: 0,
        cursosIds: new Set()
      });
    });

    const asignacionesActivas = asignaciones.filter(
      (a) => a.escenario_id === escenarioActivoId && a.estatus !== 'cancelado'
    );

    asignacionesActivas.forEach((a) => {
      const hIni =
        parseInt(a.hora_inicio.split(':')[0], 10) +
        parseInt(a.hora_inicio.split(':')[1], 10) / 60;
      const hFin =
        parseInt(a.hora_fin.split(':')[0], 10) +
        parseInt(a.hora_fin.split(':')[1], 10) / 60;
      const duracion = Math.max(0, hFin - hIni);

      (a.profesores_ids || []).forEach((uid) => {
        const item = mapa.get(uid);
        if (item) {
          if (a.nivel_educativo === 'posgrado') {
            item.horasPos += duracion;
          } else {
            item.horasLic += duracion;
          }
          item.horasTotales += duracion;
          item.cursosIds.add(a.curso_id);
          item.numMaterias = item.cursosIds.size;
        }
      });
    });

    return mapa;
  }, [docentes, asignaciones, escenarioActivoId]);

  // Helper para extraer la primera letra significativa del apellido o nombre
  const obtenerLetraInicial = (nombre: string): string => {
    const sinTitulo = nombre
      .replace(/^(Dr\.|Dra\.|M\.C\.|M\.I\.|Biol\.|Lic\.|Prof\.)\s*/i, '')
      .trim();
    return sinTitulo.charAt(0).toUpperCase();
  };

  // Conteo de profesores por letra del abecedario
  const conteoPorLetra = useMemo(() => {
    const conteo: Record<string, number> = {};
    ABECEDARIO.forEach((letra) => {
      conteo[letra] = 0;
    });

    docentes.forEach((d) => {
      const letra = obtenerLetraInicial(d.nombre);
      if (conteo[letra] !== undefined) {
        conteo[letra]++;
      }
    });

    return conteo;
  }, [docentes]);

  // Lista de profesores filtrada por Barra de Búsqueda y Navegación A-Z
  const docentesFiltrados = useMemo(() => {
    return docentes.filter((d) => {
      // 1. Filtro por letra A-Z
      if (letraSeleccionada !== 'TODOS') {
        const primeraLetra = obtenerLetraInicial(d.nombre);
        if (primeraLetra !== letraSeleccionada) return false;
      }

      // 2. Filtro por nivel, origen PDF o estado de carga
      const carga = cargaPorDocente.get(d.uid);
      if (filtroNivelDocente === 'con_carga' && (!carga || carga.horasTotales === 0)) return false;
      if (filtroNivelDocente === 'sin_carga' && carga && carga.horasTotales > 0) return false;
      if (filtroNivelDocente === 'posgrado' && !d.niveles_asignados?.includes('posgrado')) return false;
      if (filtroNivelDocente === 'pdf_oficial' && d.origen_pdf_posgrado === false) return false;

      // 3. Filtro por texto de búsqueda inteligente
      if (busquedaTexto.trim()) {
        const query = busquedaTexto.toLowerCase().trim();
        const matchNombre = d.nombre.toLowerCase().includes(query);
        const matchEmail = (d.email || '').toLowerCase().includes(query);
        const matchArea = (d.academia_area || '').toLowerCase().includes(query);
        const matchCargo = (d.cargo || '').toLowerCase().includes(query);
        const matchCubiculo = (d.cubiculo || '').toLowerCase().includes(query);

        // Búsqueda por materias asignadas al docente
        const cargaDoc = cargaPorDocente.get(d.uid);
        let matchMateria = false;
        if (cargaDoc) {
          for (const cId of cargaDoc.cursosIds) {
            const cursoObj = cursosMap.get(cId);
            if (
              cursoObj?.nombre.toLowerCase().includes(query) ||
              cursoObj?.codigo.toLowerCase().includes(query)
            ) {
              matchMateria = true;
              break;
            }
          }
        }

        // Búsqueda por aulas donde imparte clases
        const matchAula = asignaciones.some(
          (a) =>
            a.profesores_ids?.includes(d.uid) &&
            (a.espacio_codigo_snapshot?.toLowerCase().includes(query) ||
              a.espacio_nombre_snapshot?.toLowerCase().includes(query))
        );

        return (
          matchNombre ||
          matchEmail ||
          matchArea ||
          matchCargo ||
          matchCubiculo ||
          matchMateria ||
          matchAula
        );
      }

      return true;
    });
  }, [
    docentes,
    letraSeleccionada,
    filtroNivelDocente,
    busquedaTexto,
    cargaPorDocente,
    cursosMap,
    asignaciones
  ]);

  // Docente actualmente activo
  const docenteActual = useMemo(() => {
    const buscado = docentesMap.get(docenteSeleccionadoId);
    if (buscado) return buscado;
    if (docentesFiltrados.length > 0) return docentesFiltrados[0];
    return docentes[0] || null;
  }, [docentesMap, docenteSeleccionadoId, docentesFiltrados, docentes]);

  // Índice del docente en la lista filtrada para botones Anterior/Siguiente
  const indiceActual = useMemo(() => {
    if (!docenteActual) return -1;
    return docentesFiltrados.findIndex((d) => d.uid === docenteActual.uid);
  }, [docentesFiltrados, docenteActual]);

  const handleDocenteAnterior = () => {
    if (docentesFiltrados.length === 0) return;
    const nuevoIndice = (indiceActual - 1 + docentesFiltrados.length) % docentesFiltrados.length;
    setDocenteSeleccionadoId(docentesFiltrados[nuevoIndice].uid);
  };

  const handleDocenteSiguiente = () => {
    if (docentesFiltrados.length === 0) return;
    const nuevoIndice = (indiceActual + 1) % docentesFiltrados.length;
    setDocenteSeleccionadoId(docentesFiltrados[nuevoIndice].uid);
  };

  // Asignaciones del docente actualmente seleccionado
  const asignacionesDocente = useMemo(() => {
    if (!docenteActual) return [];
    return asignaciones.filter(
      (a) =>
        a.escenario_id === escenarioActivoId &&
        a.profesores_ids?.includes(docenteActual.uid) &&
        a.estatus !== 'cancelado'
    );
  }, [asignaciones, escenarioActivoId, docenteActual]);

  // Estadísticas del docente seleccionado
  const estadisticasCarga = useMemo(() => {
    if (!docenteActual) return { horasLic: 0, horasPos: 0, horasTotales: 0, numMaterias: 0 };
    const carga = cargaPorDocente.get(docenteActual.uid);
    return {
      horasLic: Math.round((carga?.horasLic || 0) * 10) / 10,
      horasPos: Math.round((carga?.horasPos || 0) * 10) / 10,
      horasTotales: Math.round((carga?.horasTotales || 0) * 10) / 10,
      numMaterias: carga?.numMaterias || 0
    };
  }, [cargaPorDocente, docenteActual]);

  // Alertas específicas para el docente seleccionado
  const alertasDocenteActual = useMemo(() => {
    if (!docenteActual) return [];
    return auditoriaPosgrado.solapamientos.filter(
      (s) =>
        s.docentes_a_nombres.some(
          (n) => n.includes(docenteActual.nombre) || docenteActual.nombre.includes(n)
        ) ||
        s.docentes_b_nombres?.some(
          (n) => n.includes(docenteActual.nombre) || docenteActual.nombre.includes(n)
        )
    );
  }, [auditoriaPosgrado, docenteActual]);

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

  const handleAbrirCrear = () => {
    setDocenteParaEditar(null);
    setModalDocenteAbierto(true);
  };

  const handleAbrirEditar = (docente: Usuario) => {
    setDocenteParaEditar(docente);
    setModalDocenteAbierto(true);
  };

  const handleGuardarDocente = async (docente: Usuario) => {
    if (docenteParaEditar && onActualizarDocente) {
      await onActualizarDocente(docente);
    } else if (onCrearDocente) {
      await onCrearDocente(docente);
    }
    setDocenteSeleccionadoId(docente.uid);
  };

  const handleConfirmarEliminar = async () => {
    if (!docenteParaEliminar || !onEliminarDocente) return;
    setEliminando(true);
    try {
      await onEliminarDocente(docenteParaEliminar.uid);
      const restantes = docentes.filter((d) => d.uid !== docenteParaEliminar.uid);
      if (restantes.length > 0) {
        setDocenteSeleccionadoId(restantes[0].uid);
      }
      setDocenteParaEliminar(null);
    } catch (err) {
      console.error('Error al eliminar profesor:', err);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* ========================================================================= */}
      {/* BARRA DE NAVEGACIÓN Y BÚSQUEDA INTEGRAL DE PROFESORES */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        {/* Encabezado Principal y Acciones */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Users className="w-5 h-5 text-[#0369a1]" />
              <h2 className="text-base font-bold text-[#0c2d48]">
                Directorio y Agenda de Profesores FCM 2027-1
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-sky-100 text-sky-800 border border-sky-300">
                {docentes.length} Profesores Registrados
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Propuesta Oficial Posgrado (PDF)</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Barra de navegación alfabética A-Z, buscador inteligente por nombre o materia, y gestión de altas/bajas
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onCrearDocente && (
              <button
                type="button"
                onClick={handleAbrirCrear}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
                title="Dar de alta a un profesor que falte en la lista"
              >
                <Plus className="w-4 h-4" />
                <span>+ Alta de Profesor</span>
              </button>
            )}

            {docenteActual && onActualizarDocente && (
              <button
                type="button"
                onClick={() => handleAbrirEditar(docenteActual)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-300 transition"
                title="Editar datos, nombre o cubículo del docente"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>
            )}

            {docenteActual && onEliminarDocente && (
              <button
                type="button"
                onClick={() => setDocenteParaEliminar(docenteActual)}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition"
                title="Eliminar este profesor si no existe en el PDF o fue registrado por error"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar</span>
              </button>
            )}

            <button
              onClick={handleExportarPDF}
              disabled={!docenteActual}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0369a1] hover:bg-[#075985] text-white rounded-xl text-xs font-bold shadow-xs transition disabled:opacity-40"
              title="Descargar horario individual en PDF oficial"
            >
              <Download className="w-4 h-4" />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BARRA DE NAVEGACIÓN RÁPIDA: BUSCADOR + SELECTOR DIRECTO + ANTERIOR/SIGUIENTE */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-100 items-center">
          {/* Input de Búsqueda Inteligente */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              placeholder="Buscar por nombre, apellido, materia (ej. qPCR, Benjamín, Malpica, Bioquímica, S-208)..."
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {busquedaTexto && (
              <button
                onClick={() => setBusquedaTexto('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 absolute right-2.5 top-2"
                title="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Selector Desplegable Directo de Salto Inmediato */}
          <div className="md:col-span-3">
            <select
              value={docenteActual?.uid || ''}
              onChange={(e) => setDocenteSeleccionadoId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500 focus:bg-white transition truncate"
              title="Saltar directamente a cualquier profesor de la lista"
            >
              {docentesFiltrados.map((d) => {
                const carga = cargaPorDocente.get(d.uid);
                return (
                  <option key={d.uid} value={d.uid}>
                    {d.nombre} ({carga?.horasTotales || 0} hrs)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Navegador Anterior / Siguiente con Contador */}
          <div className="md:col-span-3 flex items-center justify-end gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={handleDocenteAnterior}
              disabled={docentesFiltrados.length <= 1}
              className="p-1.5 hover:bg-white rounded-lg text-slate-700 hover:text-slate-950 transition flex items-center gap-1 text-xs font-bold disabled:opacity-30"
              title="Profesor anterior en la lista"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <span className="px-2 py-1 bg-white rounded-lg text-[11px] font-black text-slate-800 shadow-2xs border border-slate-200/80">
              {indiceActual >= 0 ? indiceActual + 1 : 0} / {docentesFiltrados.length}
            </span>

            <button
              type="button"
              onClick={handleDocenteSiguiente}
              disabled={docentesFiltrados.length <= 1}
              className="p-1.5 hover:bg-white rounded-lg text-slate-700 hover:text-slate-950 transition flex items-center gap-1 text-xs font-bold disabled:opacity-30"
              title="Profesor siguiente en la lista"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHIPS DE FILTRO RÁPIDO */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            Filtrar:
          </span>

          <button
            onClick={() => setFiltroNivelDocente('todos')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
              filtroNivelDocente === 'todos'
                ? 'bg-[#0c2d48] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({docentes.length})
          </button>

          <button
            onClick={() => setFiltroNivelDocente('pdf_oficial')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1.5 ${
              filtroNivelDocente === 'pdf_oficial'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
            title="Mostrar únicamente los profesores de la base de datos oficial del PDF"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Oficiales PDF Posgrado</span>
          </button>

          <button
            onClick={() => setFiltroNivelDocente('con_carga')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
              filtroNivelDocente === 'con_carga'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
            }`}
          >
            Con Clases Asignadas
          </button>

          <button
            onClick={() => setFiltroNivelDocente('sin_carga')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
              filtroNivelDocente === 'sin_carga'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Sin Clases Asignadas
          </button>

          {(letraSeleccionada !== 'TODOS' || busquedaTexto || filtroNivelDocente !== 'todos') && (
            <button
              onClick={() => {
                setLetraSeleccionada('TODOS');
                setBusquedaTexto('');
                setFiltroNivelDocente('todos');
              }}
              className="ml-auto text-sky-700 hover:text-sky-900 font-bold text-xs hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* BARRA DE NAVEGACIÓN A-Z INTERACTIVA CON CONTEO */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400" />
            <span>Navegar A-Z:</span>
          </span>

          <div className="flex flex-wrap items-center gap-1 overflow-x-auto w-full pb-1">
            <button
              type="button"
              onClick={() => setLetraSeleccionada('TODOS')}
              className={`h-7 px-2.5 rounded-lg text-xs font-black transition flex items-center justify-center ${
                letraSeleccionada === 'TODOS'
                  ? 'bg-[#0369a1] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              TODAS
            </button>

            {ABECEDARIO.map((letra) => {
              const cantidad = conteoPorLetra[letra] || 0;
              const activa = letraSeleccionada === letra;
              const tieneProfes = cantidad > 0;

              return (
                <button
                  key={letra}
                  type="button"
                  disabled={!tieneProfes}
                  onClick={() => setLetraSeleccionada(letra)}
                  className={`min-w-[28px] h-7 px-1.5 rounded-lg text-[11px] font-black transition flex items-center justify-center gap-0.5 ${
                    activa
                      ? 'bg-[#0369a1] text-white shadow-xs scale-105 ring-2 ring-sky-300'
                      : tieneProfes
                      ? 'bg-slate-100 text-slate-800 hover:bg-sky-100 hover:text-sky-900'
                      : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                  }`}
                  title={tieneProfes ? `${cantidad} profesores con la letra ${letra}` : `Sin profesores con la letra ${letra}`}
                >
                  <span>{letra}</span>
                  {tieneProfes && (
                    <span
                      className={`text-[9px] font-bold ${
                        activa ? 'text-sky-100' : 'text-slate-400'
                      }`}
                    >
                      {cantidad}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PARRILLA VISUAL DE PROFESORES FILTRADOS */}
        {/* ========================================================================= */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>
              Mostrando {docentesFiltrados.length} de {docentes.length} profesores registrados
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 max-h-[240px] overflow-y-auto p-1.5 border border-slate-200/80 rounded-xl bg-slate-50/50">
            {docentesFiltrados.length === 0 ? (
              <div className="col-span-full p-6 text-center text-xs text-slate-500 space-y-2">
                <p className="font-semibold text-slate-700">
                  No se encontraron profesores con los filtros aplicados.
                </p>
                <p className="text-slate-400">
                  ¿Desea dar de alta un profesor que falte en la base de datos?
                </p>
                {onCrearDocente && (
                  <button
                    onClick={handleAbrirCrear}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Dar de Alta Profesor</span>
                  </button>
                )}
              </div>
            ) : (
              docentesFiltrados.map((doc) => {
                const seleccionado = docenteActual?.uid === doc.uid;
                const carga = cargaPorDocente.get(doc.uid);
                const tieneCarga = carga && carga.horasTotales > 0;
                const esOficial = doc.origen_pdf_posgrado !== false;
                const iniciales = doc.nombre
                  .replace(/^(Dr\.|Dra\.|M\.C\.|M\.I\.|Biol\.|Lic\.|Prof\.)\s*/i, '')
                  .trim()
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={doc.uid}
                    onClick={() => setDocenteSeleccionadoId(doc.uid)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 shadow-2xs ${
                      seleccionado
                        ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-400/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                          seleccionado
                            ? 'bg-[#0369a1] text-white'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {iniciales}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <h4
                            className="text-xs font-bold text-slate-900 truncate"
                            title={doc.nombre}
                          >
                            {doc.nombre}
                          </h4>
                        </div>
                        <p
                          className="text-[10px] text-slate-500 truncate"
                          title={doc.academia_area}
                        >
                          {doc.academia_area || doc.cargo || 'Facultad de Ciencias Marinas'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                          tieneCarga
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {carga?.horasTotales || 0} hrs
                      </span>
                      {esOficial && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                          PDF
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DETALLE DEL DOCENTE SELECCIONADO: CARGA, CONTACTO Y ALERTAS */}
      {/* ========================================================================= */}
      {docenteActual && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0c2d48] to-[#0369a1] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                {docenteActual.nombre
                  .replace(/^(Dr\.|Dra\.|M\.C\.|M\.I\.|Biol\.|Lic\.|Prof\.)\s*/i, '')
                  .trim()
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">
                    {docenteActual.nombre}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                    {docenteActual.cargo || 'Profesor Investigador'}
                  </span>
                  {docenteActual.origen_pdf_posgrado !== false ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>Oficial Posgrado FCM (PDF)</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      Docente Agregado
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1 font-medium">
                  {docenteActual.email && (
                    <span className="flex items-center gap-1 text-sky-700">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{docenteActual.email}</span>
                    </span>
                  )}
                  {docenteActual.cubiculo && (
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{docenteActual.cubiculo}</span>
                    </span>
                  )}
                  {docenteActual.telefono_extension && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{docenteActual.telefono_extension}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Métricas de Carga Semanal */}
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-center min-w-[90px]">
                <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">
                  Carga Total
                </div>
                <div className="text-xl font-black text-sky-950">
                  {estadisticasCarga.horasTotales} hrs
                </div>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center min-w-[90px]">
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Posgrado
                </div>
                <div className="text-xl font-black text-emerald-950">
                  {estadisticasCarga.horasPos} hrs
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-[90px]">
                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Materias
                </div>
                <div className="text-xl font-black text-slate-800">
                  {estadisticasCarga.numMaterias}
                </div>
              </div>
            </div>
          </div>

          {/* Banner de Auditoría de Laboratorios y Solapamientos en Posgrado */}
          {alertasDocenteActual.length > 0 && (
            <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Diagnóstico Curricular: {alertasDocenteActual.length} solapamiento(s) o requerimiento(s) de laboratorio detectados
                </span>
              </div>
              <div className="space-y-1.5 pl-6">
                {alertasDocenteActual.map((alerta) => (
                  <div key={alerta.id} className="text-xs text-amber-800">
                    <p className="font-semibold">• {alerta.titulo}: {alerta.mensaje}</p>
                    <p className="text-[11px] text-amber-700 italic">
                      Solución recomendada: {alerta.solucion_recomendada}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CUADRÍCULA SEMANAL DE CLASES DEL DOCENTE SELECCIONADO */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0369a1]" />
                <span>Horario Semanal de Clases (Periodo 2027-1)</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                {asignacionesDocente.length} sesión(es) programadas en la semana
              </span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[850px]">
                {/* Cabecera de Días */}
                <div className="grid grid-cols-6 bg-[#0c2d48] text-white text-xs font-bold py-2.5 text-center rounded-t-xl">
                  {DIAS_SEMANA.map((dia) => (
                    <div key={dia.id} className="uppercase tracking-wider">
                      {dia.nombre}
                    </div>
                  ))}
                </div>

                {/* Columnas por Día */}
                <div className="grid grid-cols-6 divide-x divide-slate-200 min-h-[380px] bg-slate-50/40 p-2 gap-2 border-x border-b border-slate-200 rounded-b-xl">
                  {DIAS_SEMANA.map((dia) => {
                    const sesionesDia = asignacionesDocente
                      .filter((a) => a.dia === dia.id)
                      .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio));

                    return (
                      <div key={dia.id} className="space-y-2">
                        {sesionesDia.length === 0 ? (
                          <div className="h-28 flex items-center justify-center text-[11px] text-slate-400 italic">
                            Sin sesiones
                          </div>
                        ) : (
                          sesionesDia.map((asig) => {
                            const curso = cursosMap.get(asig.curso_id);
                            const espacio = espaciosMap.get(asig.espacio_id);
                            const esPosgrado = asig.nivel_educativo === 'posgrado';
                            const esPractica =
                              asig.tipo_componente === 'laboratorio' ||
                              asig.tipo_sesion.includes('(T)') ||
                              asig.tipo_sesion.includes('(P)');
                            const reqLab = REQUERIMIENTOS_CURRICULARES_LABORATORIO[asig.curso_id];

                            return (
                              <div
                                key={asig.id}
                                className={`p-3 rounded-xl border shadow-2xs transition-all hover:shadow-md ${
                                  esPosgrado
                                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                                    : 'bg-sky-50/90 border-sky-300 text-sky-950'
                                }`}
                              >
                                <div className="flex items-center justify-between text-[10px] font-black text-slate-600 mb-1">
                                  <span className="flex items-center gap-1 font-bold text-slate-700">
                                    <Clock className="w-3 h-3 text-slate-500" />
                                    {asig.hora_inicio} - {asig.hora_fin}
                                  </span>
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                                      esPosgrado
                                        ? 'bg-emerald-200 text-emerald-900'
                                        : 'bg-sky-200 text-sky-900'
                                    }`}
                                  >
                                    {esPosgrado ? 'Posgrado' : 'Lic.'}
                                  </span>
                                </div>

                                <h5
                                  className="font-bold text-xs text-slate-900 leading-tight mb-1"
                                  title={curso?.nombre}
                                >
                                  {curso?.codigo || asig.curso_id} · {curso?.nombre || asig.tipo_sesion}
                                </h5>

                                <div className="text-[11px] text-slate-700 flex items-center justify-between font-semibold mt-1">
                                  <span className="flex items-center gap-1 truncate" title={espacio?.nombre}>
                                    <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                                    <span>{espacio?.codigo || asig.espacio_codigo_snapshot}</span>
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-normal">
                                    {asig.alumnos_programados} alumnos
                                  </span>
                                </div>

                                {reqLab && (
                                  <div className="mt-1.5 text-[9px] font-medium p-1 rounded bg-amber-50 text-amber-800 border border-amber-200" title={reqLab.requerimiento}>
                                    <span className="font-bold">Lab:</span> {reqLab.espaciosOptimosCodigos.join(', ')}
                                  </div>
                                )}

                                {onMoverAsignacion && (
                                  <div className="mt-2 pt-1.5 border-t border-slate-200 flex justify-end">
                                    <button
                                      type="button"
                                      onClick={() => onMoverAsignacion(asig)}
                                      className="text-[10px] font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1"
                                    >
                                      <Move className="w-3 h-3" />
                                      <span>Mover horario/aula</span>
                                    </button>
                                  </div>
                                )}
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
          </div>
        </div>
      )}

      {/* Modal para Crear / Editar Profesor */}
      <ModalCrearEditarDocente
        abierto={modalDocenteAbierto}
        docenteParaEditar={docenteParaEditar}
        onCerrar={() => {
          setModalDocenteAbierto(false);
          setDocenteParaEditar(null);
        }}
        onGuardar={handleGuardarDocente}
      />

      {/* Modal de Confirmación para Eliminar Profesor */}
      {docenteParaEliminar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 bg-rose-100 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  ¿Eliminar profesor del padrón?
                </h3>
                <p className="text-xs text-slate-500">
                  Esta acción retirará al docente de la base de datos oficial
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-800">{docenteParaEliminar.nombre}</p>
              <p className="text-slate-500">{docenteParaEliminar.cargo || 'Profesor'}</p>
              <p className="text-slate-500">{docenteParaEliminar.email}</p>
            </div>

            <p className="text-xs text-slate-600">
              Si este profesor no existe en el PDF o fue registrado por error, puede eliminarlo de forma segura. Si tiene clases asignadas, se retirará como profesor titular para que puedan ser reasignadas.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDocenteParaEliminar(null)}
                disabled={eliminando}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarEliminar}
                disabled={eliminando}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>{eliminando ? 'Eliminando...' : 'Sí, Eliminar Profesor'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
