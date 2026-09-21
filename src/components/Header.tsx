/**
 * Componente Header Institucional FCM - UABC
 * Tema: Professional Polish
 */

import React, { useState } from 'react';
import {
  Layers,
  User,
  ShieldCheck,
  RefreshCw,
  LogOut,
  LogIn,
  ChevronDown,
  Download,
  UserCheck
} from 'lucide-react';
import { Escenario, Periodo, Usuario, RoleUsuario } from '../types';

interface HeaderProps {
  periodoActivo: Periodo;
  escenarios: Escenario[];
  escenarioActivoId: string;
  onCambiarEscenario: (escenarioId: string) => void;
  usuarioActual: Usuario | null;
  onCambiarUsuarioSimulado: (usuario: Usuario) => void;
  usuariosDisponibles: Usuario[];
  onIniciarSesionGoogle: () => void;
  onCerrarSesion: () => void;
  onAbrirModalInicializar: () => void;
  onNavegarExport?: () => void;
  onEditarPerfil?: () => void;
  estaCargando: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  periodoActivo,
  escenarios,
  escenarioActivoId,
  onCambiarEscenario,
  usuarioActual,
  onCambiarUsuarioSimulado,
  usuariosDisponibles,
  onIniciarSesionGoogle,
  onCerrarSesion,
  onAbrirModalInicializar,
  onNavegarExport,
  onEditarPerfil,
  estaCargando
}) => {
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);

  const getRoleBadge = (role?: RoleUsuario) => {
    switch (role) {
      case 'admin':
        return { label: usuarioActual?.cargo || 'Subdirectora FCM', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'coordinador':
        return { label: usuarioActual?.cargo || 'Coordinador Programa', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'profesor':
      default:
        return { label: usuarioActual?.cargo || 'Docente FCM', bg: 'bg-sky-100 text-sky-900 border-sky-300' };
    }
  };

  const badge = getRoleBadge(usuarioActual?.role);
  const escenarioActual = escenarios.find((e) => e.id === escenarioActivoId);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sm:px-8 sticky top-0 z-40">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl font-bold text-[#0c2d48] tracking-tight">
            Planeación Académica FCM 2027-1
          </h1>
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Modo Abierto
          </span>
        </div>
        <p className="text-xs text-slate-500 hidden sm:block">
          Plataforma abierta para programación de horarios · Licenciatura y Posgrado FCM - IIO
        </p>
      </div>

      {/* Actions & Escenario Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {/* Export button */}
          {onNavegarExport && (
            <button
              onClick={onNavegarExport}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0369a1] text-white text-xs font-bold rounded-md shadow-2xs hover:bg-[#075985] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Horarios (CSV)</span>
            </button>
          )}

          {/* Configuración de Escenario Selector */}
          <div className="flex items-center bg-slate-50 rounded-md border border-slate-200 px-2.5 py-1">
            <span className="text-[11px] font-semibold text-slate-500 mr-1.5 hidden lg:inline">
              Escenario:
            </span>
            <select
              id="header-escenario-selector"
              value={escenarioActivoId}
              onChange={(e) => onCambiarEscenario(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#0c2d48] outline-none cursor-pointer"
            >
              {escenarios.map((esc) => (
                <option key={esc.id} value={esc.id}>
                  {esc.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Catálogo Espacios modal button (Admin) */}
          {usuarioActual?.role === 'admin' && (
            <button
              id="btn-inicializar-espacios-header"
              onClick={onAbrirModalInicializar}
              disabled={estaCargando}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-md hover:bg-slate-50 transition-colors"
              title="Inicializar o verificar catálogo de espacios FCM y IIO"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${estaCargando ? 'animate-spin' : ''}`} />
              <span>Espacios FCM</span>
            </button>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

        {/* Escenario Status Pill Badge */}
        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded-full tracking-wider border border-amber-200/80 hidden sm:inline-block">
          {escenarioActual?.nombre || 'Borrador Oficial'}
        </span>

        {/* User Account / Role Switcher */}
        <div className="relative">
          <button
            id="header-user-menu-btn"
            onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#0c2d48] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
              {usuarioActual?.nombre.charAt(0) || 'U'}
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                {usuarioActual?.nombre || 'Usuario FCM'}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {badge.label}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu */}
          {mostrarMenuUsuario && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in slide-in-from-top-1">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{usuarioActual?.nombre}</p>
                <p className="text-[11px] text-slate-500 truncate font-mono">{usuarioActual?.email}</p>
                <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold border ${badge.bg}`}>
                  Rol: {badge.label}
                </span>
              </div>

              {/* Simulador rápido de perfiles para evaluación y pruebas */}
              <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  Cambiar Perfil (Demostración):
                </p>
                <div className="space-y-1">
                  {usuariosDisponibles.map((u) => (
                    <button
                      key={u.uid}
                      onClick={() => {
                        onCambiarUsuarioSimulado(u);
                        setMostrarMenuUsuario(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                        usuarioActual?.uid === u.uid
                          ? 'bg-sky-100 text-sky-900 font-semibold'
                          : 'hover:bg-slate-200/70 text-slate-700'
                      }`}
                    >
                      <span className="truncate">{u.nombre}</span>
                      <span className="text-[10px] uppercase text-slate-500 font-mono ml-1">
                        {u.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Autenticación Google y Perfil */}
              <div className="p-2 space-y-1">
                {onEditarPerfil && (
                  <button
                    id="btn-editar-perfil-header"
                    onClick={() => {
                      onEditarPerfil();
                      setMostrarMenuUsuario(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-sky-800 bg-sky-50 hover:bg-sky-100 font-bold rounded-md transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-sky-600" />
                    <span>Verificar / Editar Nombre Real</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onIniciarSesionGoogle();
                    setMostrarMenuUsuario(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <LogIn className="w-4 h-4 text-sky-600" />
                  <span>Conectar cuenta Google institucional</span>
                </button>

                <button
                  onClick={() => {
                    onCerrarSesion();
                    setMostrarMenuUsuario(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
