/**
 * Componente Sidebar de Navegación FCM
 * Tema: Professional Polish
 */

import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  Users,
  Layers,
  HeartHandshake,
  AlertOctagon,
  FileSpreadsheet,
  Waves,
  HelpCircle,
  BarChart3,
  History,
  MessageSquare
} from 'lucide-react';
import { RoleUsuario, Usuario } from '../types';

export type VistaActiva =
  | 'dashboard'
  | 'reporte_avance'
  | 'planificacion'
  | 'matriz_espacios'
  | 'agenda_docentes'
  | 'comunicacion_estudiantes'
  | 'homologacion'
  | 'preferencias'
  | 'conflictos'
  | 'historial_cambios'
  | 'import_export'
  | 'infografia';

interface SidebarProps {
  vistaActiva: VistaActiva;
  onSeleccionarVista: (vista: VistaActiva) => void;
  numeroConflictosCriticos: number;
  roleUsuario?: RoleUsuario;
  usuarioActual?: Usuario | null;
  onEditarPerfil?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  vistaActiva,
  onSeleccionarVista,
  numeroConflictosCriticos,
  roleUsuario,
  usuarioActual,
  onEditarPerfil
}) => {
  const items = [
    {
      id: 'dashboard' as VistaActiva,
      label: 'Dashboard General',
      descripcion: 'Ocupación por turno y métricas',
      icono: LayoutDashboard,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'reporte_avance' as VistaActiva,
      label: 'Reporte de Avance',
      descripcion: 'Avance docente y uso de aulas',
      icono: BarChart3,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'infografia' as VistaActiva,
      label: 'Infografía y Guía',
      descripcion: 'Cómo funciona la plataforma',
      icono: HelpCircle,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'planificacion' as VistaActiva,
      label: 'Planificación Académica',
      descripcion: 'Horarios, grupos y subgrupos',
      icono: CalendarDays,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'matriz_espacios' as VistaActiva,
      label: 'Espacios y Aulas',
      descripcion: 'Ocupación de aulas y laboratorios',
      icono: Building2,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'agenda_docentes' as VistaActiva,
      label: 'Docentes y Carga Horaria',
      descripcion: 'Horarios individuales y horas',
      icono: Users,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'comunicacion_estudiantes' as VistaActiva,
      label: 'Comunicación y Tutorías',
      descripcion: 'Directorio, cubículos y avisos',
      icono: MessageSquare,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'homologacion' as VistaActiva,
      label: 'Homologación de Catálogo',
      descripcion: 'Espacios, alias y deduplicación',
      icono: Layers,
      roles: ['admin', 'coordinador']
    },
    {
      id: 'preferencias' as VistaActiva,
      label: 'Portal de Preferencias',
      descripcion: 'Encuesta docente 2027-1',
      icono: HeartHandshake,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'conflictos' as VistaActiva,
      label: 'Auditoría de Conflictos',
      descripcion: 'Validación y bloqueo de traslapes',
      icono: AlertOctagon,
      badge: numeroConflictosCriticos > 0 ? numeroConflictosCriticos : undefined,
      roles: ['admin', 'coordinador']
    },
    {
      id: 'historial_cambios' as VistaActiva,
      label: 'Historial de Cambios',
      descripcion: 'Bitácora y auditoría de la Subdirección',
      icono: History,
      roles: ['admin', 'coordinador', 'profesor']
    },
    {
      id: 'import_export' as VistaActiva,
      label: 'Importar / Exportar',
      descripcion: 'Descarga PDF y carga CSV',
      icono: FileSpreadsheet,
      roles: ['admin', 'coordinador', 'profesor']
    }
  ];

  const getIniciales = (nombre?: string) => {
    if (!nombre) return 'ADM';
    const partes = nombre.split(' ');
    if (partes.length >= 2) {
      return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    }
    return nombre.substring(0, 3).toUpperCase();
  };

  return (
    <aside className="w-64 bg-[#0c2d48] text-white flex-shrink-0 flex flex-col justify-between border-r border-white/10 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <Waves className="w-5 h-5 text-[#0c2d48]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">FCM - UABC</span>
          </div>
          <p className="text-[11px] text-sky-200/60 uppercase font-bold tracking-widest pl-11">
            Periodo 2027-1
          </p>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {items.map((item) => {
            const Icon = item.icono;
            const estaActivo = vistaActiva === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSeleccionarVista(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors text-left ${
                  estaActivo
                    ? 'bg-white/10 text-sky-300 font-medium'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      estaActivo ? 'text-sky-300' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <div className="truncate">
                    <span className="truncate">{item.label}</span>
                  </div>
                </div>

                {item.badge !== undefined && (
                  <span className="ml-2 px-1.5 py-0.2 text-[10px] font-black rounded-full bg-red-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Area */}
      <div className="p-3.5 bg-[#081f31] border-t border-white/10">
        <div 
          onClick={onEditarPerfil}
          role="button"
          tabIndex={0}
          title="Haga clic para verificar o editar su Nombre Real y Perfil Docente"
          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 transition cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-sky-400 overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-xs group-hover:border-sky-300">
            {getIniciales(usuarioActual?.nombre)}
          </div>
          <div className="overflow-hidden min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold truncate text-white group-hover:text-sky-300 transition">
                {usuarioActual?.nombre || 'Dra. Ivone Giffard'}
              </p>
            </div>
            <p className="text-[10px] text-amber-300/90 font-semibold truncate">
              {usuarioActual?.cargo || (usuarioActual?.role === 'admin' ? 'Subdirectora FCM' : 'Docente FCM')}
            </p>
            <p className="text-[9px] text-sky-200/60 truncate font-mono">
              {usuarioActual?.email || 'subdireccion.fcm@uabc.edu.mx'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
