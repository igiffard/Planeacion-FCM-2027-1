/**
 * Componente de Historial de Cambios y Auditoría de Planeación FCM 2027-1
 * 
 * Permite a la Subdirección Académica auditar cronológicamente qué usuario
 * (docente, coordinador o subdirectora) realizó qué modificación en la planeación:
 * reubicación de aulas, cambios de horario, asignaciones de profesores, etc.
 * Los registros persisten en localStorage.
 */

import React, { useState, useMemo } from 'react';
import {
  History,
  Search,
  Filter,
  Download,
  Trash2,
  Calendar,
  Clock,
  Building2,
  User,
  Users,
  Move,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  RefreshCw,
  PlusCircle,
  Layers,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { RegistroHistorialCambio, TipoAccionHistorial, RolUsuario, Usuario } from '../types';

interface HistorialCambiosViewProps {
  historial: RegistroHistorialCambio[];
  usuarioActual: Usuario | null;
  onLimpiarHistorial: () => void;
  onRegistrarNotaAuditoria?: (nota: string) => void;
}

export const HistorialCambiosView: React.FC<HistorialCambiosViewProps> = ({
  historial,
  usuarioActual,
  onLimpiarHistorial,
  onRegistrarNotaAuditoria
}) => {
  // Filtros
  const [busqueda, setBusqueda] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroRol, setFiltroRol] = useState<string>('todos');
  const [vistaModo, setVistaModo] = useState<'timeline' | 'tabla'>('timeline');
  const [modalConfirmarLimpiar, setModalConfirmarLimpiar] = useState<boolean>(false);
  const [modalNotaAbierto, setModalNotaAbierto] = useState<boolean>(false);
  const [nuevaNotaTexto, setNuevaNotaTexto] = useState<string>('');

  // Estadísticas rápidas para la Subdirección
  const metricas = useMemo(() => {
    const total = historial.length;
    const movimientosAula = historial.filter((h) => h.tipo_accion === 'mover_aula' || h.tipo_accion === 'cambiar_dia_y_aula').length;
    const cambiosHorario = historial.filter((h) => h.tipo_accion === 'cambiar_horario' || h.tipo_accion === 'cambiar_dia_y_aula').length;
    const asignacionesDocente = historial.filter((h) => h.tipo_accion === 'asignar_docente').length;
    const cambiosSubdireccion = historial.filter((h) => h.usuario_rol === 'admin').length;
    const cambiosDocentes = historial.filter((h) => h.usuario_rol === 'profesor').length;

    return {
      total,
      movimientosAula,
      cambiosHorario,
      asignacionesDocente,
      cambiosSubdireccion,
      cambiosDocentes
    };
  }, [historial]);

  // Filtrado de registros
  const registrosFiltrados = useMemo(() => {
    return historial.filter((reg) => {
      // Filtro de texto
      if (busqueda.trim() !== '') {
        const query = busqueda.toLowerCase().trim();
        const coincideDesc = reg.descripcion.toLowerCase().includes(query);
        const coincideUsuario = reg.usuario_nombre.toLowerCase().includes(query) || reg.usuario_email.toLowerCase().includes(query);
        const coincideCurso = reg.detalles?.curso_nombre?.toLowerCase().includes(query) || reg.detalles?.curso_codigo?.toLowerCase().includes(query);
        const coincideAula = reg.detalles?.espacio_nuevo_codigo?.toLowerCase().includes(query) || reg.detalles?.espacio_anterior_codigo?.toLowerCase().includes(query);
        const coincideMotivo = reg.detalles?.motivo?.toLowerCase().includes(query);

        if (!coincideDesc && !coincideUsuario && !coincideCurso && !coincideAula && !coincideMotivo) {
          return false;
        }
      }

      // Filtro por tipo de acción
      if (filtroTipo !== 'todos' && reg.tipo_accion !== filtroTipo) {
        return false;
      }

      // Filtro por rol
      if (filtroRol !== 'todos' && reg.usuario_rol !== filtroRol) {
        return false;
      }

      return true;
    });
  }, [historial, busqueda, filtroTipo, filtroRol]);

  // Exportar historial a CSV
  const handleExportarCSV = () => {
    if (historial.length === 0) return;

    const encabezados = [
      'ID Registro',
      'Fecha y Hora (ISO)',
      'Fecha Formateada',
      'Usuario Nombre',
      'Usuario Email',
      'Rol',
      'Cargo',
      'Tipo de Acción',
      'Descripción Oficial',
      'Curso Clave',
      'Curso Nombre',
      'Grupo',
      'Aula Anterior',
      'Aula Nueva',
      'Día Anterior',
      'Día Nuevo',
      'Horario Anterior',
      'Horario Nuevo',
      'Docente Asignado',
      'Motivo / Justificación'
    ];

    const filas = registrosFiltrados.map((reg) => [
      `"${reg.id}"`,
      `"${reg.timestamp}"`,
      `"${reg.fecha_formateada}"`,
      `"${reg.usuario_nombre.replace(/"/g, '""')}"`,
      `"${reg.usuario_email}"`,
      `"${reg.usuario_rol}"`,
      `"${reg.usuario_cargo || ''}"`,
      `"${reg.tipo_accion}"`,
      `"${reg.descripcion.replace(/"/g, '""')}"`,
      `"${reg.detalles?.curso_codigo || ''}"`,
      `"${(reg.detalles?.curso_nombre || '').replace(/"/g, '""')}"`,
      `"${reg.detalles?.grupo_clave || ''}"`,
      `"${reg.detalles?.espacio_anterior_codigo || ''}"`,
      `"${reg.detalles?.espacio_nuevo_codigo || ''}"`,
      `"${reg.detalles?.dia_anterior || ''}"`,
      `"${reg.detalles?.dia_nuevo || ''}"`,
      `"${reg.detalles?.horario_anterior || ''}"`,
      `"${reg.detalles?.horario_nuevo || ''}"`,
      `"${(reg.detalles?.docente_nuevo_nombre || '').replace(/"/g, '""')}"`,
      `"${(reg.detalles?.motivo || '').replace(/"/g, '""')}"`
    ]);

    // Agregar BOM UTF-8 para apertura directa en Microsoft Excel
    const contenidoCSV = '\uFEFF' + [encabezados.join(','), ...filas.map((f) => f.join(','))].join('\r\n');
    const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Auditoria_Historial_Planeacion_FCM_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGuardarNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaNotaTexto.trim()) return;
    if (onRegistrarNotaAuditoria) {
      onRegistrarNotaAuditoria(nuevaNotaTexto.trim());
    }
    setNuevaNotaTexto('');
    setModalNotaAbierto(false);
  };

  // Helper para renderizar iconos según acción
  const getBadgeAccion = (tipo: TipoAccionHistorial) => {
    switch (tipo) {
      case 'mover_aula':
        return {
          label: 'Reubicación de Aula',
          icono: Building2,
          colorClase: 'bg-sky-50 text-sky-700 border-sky-200'
        };
      case 'cambiar_horario':
        return {
          label: 'Ajuste de Horario',
          icono: Clock,
          colorClase: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case 'cambiar_dia_y_aula':
        return {
          label: 'Reubicación y Horario',
          icono: Move,
          colorClase: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        };
      case 'asignar_docente':
        return {
          label: 'Asignación Docente',
          icono: Users,
          colorClase: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'crear_asignacion':
        return {
          label: 'Nueva Asignación',
          icono: PlusCircle,
          colorClase: 'bg-teal-50 text-teal-700 border-teal-200'
        };
      case 'eliminar_asignacion':
        return {
          label: 'Sesión Cancelada',
          icono: Trash2,
          colorClase: 'bg-rose-50 text-rose-700 border-rose-200'
        };
      case 'unificar_aulas':
        return {
          label: 'Unificación de Espacio',
          icono: Layers,
          colorClase: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      case 'crear_aula':
      case 'editar_aula':
        return {
          label: 'Catálogo de Aulas',
          icono: Building2,
          colorClase: 'bg-cyan-50 text-cyan-700 border-cyan-200'
        };
      case 'crear_materia':
        return {
          label: 'Nueva Materia',
          icono: Sparkles,
          colorClase: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'importar_csv':
        return {
          label: 'Carga Masiva CSV',
          icono: FileSpreadsheet,
          colorClase: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'restablecer_datos':
        return {
          label: 'Reinicio a Semilla',
          icono: RefreshCw,
          colorClase: 'bg-slate-100 text-slate-700 border-slate-300'
        };
      default:
        return {
          label: 'Modificación',
          icono: History,
          colorClase: 'bg-slate-50 text-slate-700 border-slate-200'
        };
    }
  };

  const getRolBadge = (rol: RolUsuario) => {
    switch (rol) {
      case 'admin':
        return {
          label: 'Subdirección FCM',
          clase: 'bg-amber-100 text-amber-900 border-amber-300'
        };
      case 'coordinador':
        return {
          label: 'Coordinador',
          clase: 'bg-sky-100 text-sky-800 border-sky-300'
        };
      default:
        return {
          label: 'Docente FCM',
          clase: 'bg-slate-100 text-slate-700 border-slate-200'
        };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Cabecera Institucional de Auditoría */}
      <div className="bg-gradient-to-r from-[#0c2d48] via-[#143d61] to-[#0a2339] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-radial from-amber-400/10 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/15 text-xs font-semibold backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Auditoría de Subdirección Académica · Periodo 2027-1</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <History className="w-7 h-7 text-amber-400" />
              <span>Historial de Cambios en la Planeación</span>
            </h1>
            <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
              Bitácora cronológica transparente que registra qué docente o directivo realizó modificaciones en aulas,
              franjas horarias y asignaturas. Los registros se conservan de forma permanente en almacenamiento local.
            </p>
          </div>

          {/* Acciones Rápidas de la Subdirección */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onRegistrarNotaAuditoria && (
              <button
                id="btn-nueva-nota-auditoria"
                onClick={() => setModalNotaAbierto(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition border border-white/15 cursor-pointer shadow-xs"
                title="Registrar nota manual o minuta de acuerdo de Subdirección"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>Agregar Nota de Auditoría</span>
              </button>
            )}

            <button
              id="btn-exportar-historial-csv"
              onClick={handleExportarCSV}
              disabled={historial.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
              title="Descargar bitácora de auditoría en formato CSV para Excel"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-900" />
              <span>Exportar Bitácora CSV</span>
            </button>

            {usuarioActual?.role === 'admin' && (
              <button
                id="btn-limpiar-historial"
                onClick={() => setModalConfirmarLimpiar(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white text-xs font-semibold transition border border-red-400/30 cursor-pointer"
                title="Borrar historial local de auditoría (exclusivo Subdirección)"
              >
                <Trash2 className="w-4 h-4 text-red-300" />
                <span>Limpiar Historial</span>
              </button>
            )}
          </div>
        </div>

        {/* Franja de Indicadores Clave de Auditoría */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-slate-300 font-medium block">Total Registros</span>
            <span className="text-xl font-bold text-white tracking-tight">{metricas.total}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-sky-200 font-medium block flex items-center gap-1">
              <Building2 className="w-3 h-3 text-sky-400" /> Aulas Reubicadas
            </span>
            <span className="text-xl font-bold text-sky-300 tracking-tight">{metricas.movimientosAula}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-amber-200 font-medium block flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> Horarios Movidos
            </span>
            <span className="text-xl font-bold text-amber-300 tracking-tight">{metricas.cambiosHorario}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-emerald-200 font-medium block flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-400" /> Asignaciones
            </span>
            <span className="text-xl font-bold text-emerald-300 tracking-tight">{metricas.asignacionesDocente}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-amber-200 font-medium block">Por Subdirección</span>
            <span className="text-xl font-bold text-amber-200 tracking-tight">{metricas.cambiosSubdireccion}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-slate-300 font-medium block">Por Docentes</span>
            <span className="text-xl font-bold text-slate-200 tracking-tight">{metricas.cambiosDocentes}</span>
          </div>
        </div>
      </div>

      {/* 2. Barra de Filtros y Selector de Vista */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
          {/* Buscador general */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por docente, clase, aula o motivo..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtro por tipo de acción */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 w-full sm:w-48 focus:ring-2 focus:ring-sky-500"
            >
              <option value="todos">Todos los tipos de cambio</option>
              <option value="mover_aula">Reubicación de Aula</option>
              <option value="cambiar_horario">Ajuste de Horario</option>
              <option value="cambiar_dia_y_aula">Día y Aula a la vez</option>
              <option value="asignar_docente">Asignación de Profesor</option>
              <option value="crear_asignacion">Nueva Asignación</option>
              <option value="eliminar_asignacion">Cancelación de Asignación</option>
              <option value="unificar_aulas">Unificación de Aulas</option>
              <option value="crear_materia">Nueva Materia</option>
              <option value="importar_csv">Importación CSV</option>
            </select>
          </div>

          {/* Filtro por Rol */}
          <div className="w-full sm:w-auto">
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 w-full sm:w-40 focus:ring-2 focus:ring-sky-500"
            >
              <option value="todos">Todos los roles</option>
              <option value="admin">Subdirección (Admin)</option>
              <option value="coordinador">Coordinadores</option>
              <option value="profesor">Docentes</option>
            </select>
          </div>
        </div>

        {/* Conmutador de Vista (Timeline / Tabla) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-end md:self-auto">
          <button
            onClick={() => setVistaModo('timeline')}
            className={`px-3 py-1.5 rounded-md font-semibold text-xs transition ${
              vistaModo === 'timeline'
                ? 'bg-white text-[#0c2d48] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Línea de Tiempo
          </button>
          <button
            onClick={() => setVistaModo('tabla')}
            className={`px-3 py-1.5 rounded-md font-semibold text-xs transition ${
              vistaModo === 'tabla'
                ? 'bg-white text-[#0c2d48] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tabla Compacta
          </button>
        </div>
      </div>

      {/* 3. Contenido Principal: Timeline o Tabla */}
      {registrosFiltrados.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No se encontraron registros de auditoría</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {busqueda || filtroTipo !== 'todos' || filtroRol !== 'todos'
              ? 'Prueba modificando los criterios de búsqueda o limpiando los filtros seleccionados.'
              : 'Aún no se han registrado modificaciones en esta sesión de planeación académica.'}
          </p>
          {(busqueda || filtroTipo !== 'todos' || filtroRol !== 'todos') && (
            <button
              onClick={() => {
                setBusqueda('');
                setFiltroTipo('todos');
                setFiltroRol('todos');
              }}
              className="text-xs text-sky-600 hover:text-sky-800 font-semibold"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      ) : vistaModo === 'timeline' ? (
        /* VISTA LÍNEA DE TIEMPO (TIMELINE) */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Mostrando <strong>{registrosFiltrados.length}</strong> de <strong>{historial.length}</strong> registros
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3.5 h-3.5" /> Ordenado por más recientes primero
            </span>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-6 pb-4">
            {registrosFiltrados.map((reg) => {
              const badgeAccion = getBadgeAccion(reg.tipo_accion);
              const badgeRol = getRolBadge(reg.usuario_rol);
              const IconoAccion = badgeAccion.icono;

              return (
                <div key={reg.id} className="relative pl-6 md:pl-8 group">
                  {/* Nodo circular del timeline */}
                  <div
                    className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 border-white shadow-xs flex items-center justify-center ${
                      reg.usuario_rol === 'admin'
                        ? 'bg-amber-500 text-white'
                        : reg.usuario_rol === 'coordinador'
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    <IconoAccion className="w-4 h-4" />
                  </div>

                  {/* Tarjeta del Registro */}
                  <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200 shadow-2xs hover:shadow-sm hover:border-slate-300 transition space-y-3">
                    {/* Fila Superior: Usuario, Rol, Tipo de Acción y Fecha */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Avatar o Iniciales */}
                        <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {reg.usuario_nombre.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">
                              {reg.usuario_nombre}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeRol.clase}`}
                            >
                              {badgeRol.label}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {reg.usuario_email} {reg.usuario_cargo ? `· ${reg.usuario_cargo}` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${badgeAccion.colorClase}`}
                        >
                          <IconoAccion className="w-3 h-3" />
                          <span>{badgeAccion.label}</span>
                        </span>
                        <span className="text-slate-400 text-[11px] flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {reg.fecha_formateada}
                        </span>
                      </div>
                    </div>

                    {/* Fila Central: Oración Descriptiva Principal */}
                    <div className="text-sm font-medium text-slate-800 leading-snug">
                      {reg.descripcion}
                    </div>

                    {/* Fila Inferior: Detalles de Transición Visual (Antes ➔ Después) */}
                    {reg.detalles && (
                      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 text-xs space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {/* Transición de Aula */}
                          {(reg.detalles.espacio_anterior_codigo || reg.detalles.espacio_nuevo_codigo) && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-sky-600" />
                                Movimiento de Espacio:
                              </span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 font-semibold line-through text-[11px]">
                                  {reg.detalles.espacio_anterior_codigo || 'Sin aula'}
                                </span>
                                <ArrowRight className="w-3 h-3 text-slate-400" />
                                <span className="px-2 py-1 bg-sky-100 border border-sky-300 rounded text-sky-900 font-bold text-[11px]">
                                  {reg.detalles.espacio_nuevo_codigo} ({reg.detalles.espacio_nuevo_nombre || 'Aula'})
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Transición de Horario / Día */}
                          {(reg.detalles.horario_anterior || reg.detalles.horario_nuevo || reg.detalles.dia_nuevo) && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-600" />
                                Franja Horaria:
                              </span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {reg.detalles.horario_anterior && (
                                  <>
                                    <span className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 font-semibold line-through text-[11px] capitalize">
                                      {reg.detalles.dia_anterior || ''} {reg.detalles.horario_anterior}
                                    </span>
                                    <ArrowRight className="w-3 h-3 text-slate-400" />
                                  </>
                                )}
                                <span className="px-2 py-1 bg-amber-100 border border-amber-300 rounded text-amber-900 font-bold text-[11px] capitalize">
                                  {reg.detalles.dia_nuevo || ''} {reg.detalles.horario_nuevo || reg.detalles.horario_anterior}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Docente Asignado */}
                          {reg.detalles.docente_nuevo_nombre && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                <User className="w-3 h-3 text-emerald-600" />
                                Docente Asignado:
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="px-2 py-1 bg-emerald-100 border border-emerald-300 rounded text-emerald-950 font-bold text-[11px]">
                                  {reg.detalles.docente_nuevo_nombre}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Motivo o Justificación */}
                        {reg.detalles.motivo && (
                          <div className="pt-1.5 border-t border-slate-200/60 flex items-start gap-1.5 text-[11px] text-slate-600">
                            <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>Motivo registrado:</strong> {reg.detalles.motivo}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VISTA TABLA COMPACTA */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">Fecha y Hora</th>
                  <th className="py-3 px-3">Usuario y Rol</th>
                  <th className="py-3 px-3">Tipo de Acción</th>
                  <th className="py-3 px-4">Descripción de la Modificación</th>
                  <th className="py-3 px-3">Espacio</th>
                  <th className="py-3 px-3">Horario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrosFiltrados.map((reg) => {
                  const badgeAccion = getBadgeAccion(reg.tipo_accion);
                  const badgeRol = getRolBadge(reg.usuario_rol);

                  return (
                    <tr key={reg.id} className="hover:bg-slate-50 transition">
                      <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap text-[11px]">
                        {reg.fecha_formateada}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-800">{reg.usuario_nombre}</div>
                        <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] border ${badgeRol.clase}`}>
                          {badgeRol.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeAccion.colorClase}`}
                        >
                          {badgeAccion.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-medium text-slate-800">
                        {reg.descripcion}
                        {reg.detalles?.motivo && (
                          <span className="block text-[10px] text-slate-500 italic mt-0.5">
                            Justificación: {reg.detalles.motivo}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-700 font-mono text-[11px]">
                        {reg.detalles?.espacio_nuevo_codigo ? (
                          <span className="font-bold text-sky-800">
                            {reg.detalles.espacio_nuevo_codigo}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-700 font-mono text-[11px] capitalize">
                        {reg.detalles?.dia_nuevo || reg.detalles?.horario_nuevo ? (
                          <span>
                            {reg.detalles.dia_nuevo} {reg.detalles.horario_nuevo}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para Agregar Nota de Auditoría */}
      {modalNotaAbierto && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Registrar Nota de Auditoría Oficial</span>
              </h3>
              <button
                onClick={() => setModalNotaAbierto(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGuardarNota} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Descripción o Minuta de Acuerdo de Subdirección:
                </label>
                <textarea
                  rows={4}
                  value={nuevaNotaTexto}
                  onChange={(e) => setNuevaNotaTexto(e.target.value)}
                  placeholder="Ej: Se acordó en reunión con la academia reubicar los laboratorios de Biología Marina al turno matutino..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                Esta nota quedará firmada con tu usuario actual (<strong>{usuarioActual?.nombre || 'Subdirección'}</strong>)
                y hora institucional.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setModalNotaAbierto(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c2d48] text-white font-bold rounded-lg hover:bg-[#153f64]"
                >
                  Guardar en Bitácora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Limpiar Historial */}
      {modalConfirmarLimpiar && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">¿Limpiar Bitácora de Auditoría?</h3>
                <p className="text-slate-500 text-xs">Acción de administración institucional</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Esta acción eliminará todos los registros de cambios almacenados en el navegador local.
              Se recomienda descargar una copia en CSV antes de continuar.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setModalConfirmarLimpiar(false)}
                className="px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onLimpiarHistorial();
                  setModalConfirmarLimpiar(false);
                }}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-sm"
              >
                Confirmar Limpieza
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
