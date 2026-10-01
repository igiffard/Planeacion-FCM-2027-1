/**
 * Modal para Verificación y Actualización de Perfil Docente con Nombre Real
 * Permite a cualquier profesor o a la Subdirectora verificar y guardar su nombre real oficial
 */

import React, { useState, useEffect } from 'react';
import { X, UserCheck, ShieldCheck, Mail, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { Usuario, RolUsuario } from '../types';

interface ModalEditarPerfilDocenteProps {
  abierto: boolean;
  onCerrar: () => void;
  usuario: Usuario | null;
  onGuardarUsuario: (usuarioActualizado: Usuario) => Promise<void>;
}

export const ModalEditarPerfilDocente: React.FC<ModalEditarPerfilDocenteProps> = ({
  abierto,
  onCerrar,
  usuario,
  onGuardarUsuario
}) => {
  const [nombre, setNombre] = useState('');
  const [titulo, setTitulo] = useState('Dr.');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [academiaArea, setAcademiaArea] = useState('');
  const [role, setRole] = useState<RolUsuario>('profesor');
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || '');
      setTitulo(usuario.titulo_academico || (usuario.nombre.startsWith('Dra.') ? 'Dra.' : usuario.nombre.startsWith('Dr.') ? 'Dr.' : usuario.nombre.startsWith('M.C.') ? 'M.C.' : 'Dr.'));
      setEmail(usuario.email || '');
      setCargo(usuario.cargo || (usuario.role === 'admin' ? 'Subdirectora FCM' : 'Profesor Investigador'));
      setAcademiaArea(usuario.academia_area || 'Oceanografía');
      setRole(usuario.role || 'profesor');
      setExito(false);
    }
  }, [usuario, abierto]);

  if (!abierto || !usuario) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    setGuardando(true);
    try {
      // Formatear nombre con título si no lo tiene
      let nombreFormateado = nombre.trim();
      if (titulo && !nombreFormateado.toLowerCase().startsWith(titulo.toLowerCase())) {
        nombreFormateado = `${titulo} ${nombreFormateado}`;
      }

      const usuarioActualizado: Usuario = {
        ...usuario,
        nombre: nombreFormateado,
        titulo_academico: titulo,
        cargo: cargo.trim(),
        email: email.trim(),
        email_normalizado: email.trim().toLowerCase(),
        academia_area: academiaArea.trim(),
        role: role,
        updatedAt: new Date().toISOString()
      };

      await onGuardarUsuario(usuarioActualizado);
      setExito(true);
      setTimeout(() => {
        setExito(false);
        onCerrar();
      }, 1000);
    } catch (err: any) {
      console.error('Error al guardar perfil docente:', err);
      setError(err?.message || 'Error al guardar los cambios del perfil');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cabecera */}
        <div className="bg-[#0c2d48] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Perfil y Nombre Real del Docente</h2>
              <p className="text-[11px] text-slate-300">
                Asegure que su nombre oficial y grado académico aparezcan en los horarios FCM 2027-1
              </p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs">
          {exito && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Nombre real y perfil docente actualizados exitosamente.</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg flex items-center gap-2 text-rose-800 font-bold">
              <X className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Grado Académico y Nombre Completo */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className="block font-bold text-slate-700 mb-1">Título / Grado *</label>
              <select
                id="perfil-titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 font-bold focus:ring-1 focus:ring-sky-500"
              >
                <option value="Dra.">Dra.</option>
                <option value="Dr.">Dr.</option>
                <option value="M.C.">M.C.</option>
                <option value="Biol.">Biol.</option>
                <option value="Ocean.">Ocean.</option>
                <option value="Ing.">Ing.</option>
                <option value="Lic.">Lic.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block font-bold text-slate-700 mb-1">
                Nombre Real Completo *
              </label>
              <input
                id="perfil-nombre"
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Ivone Giffard, Carlos Rodríguez Ramos..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-semibold focus:ring-1 focus:ring-sky-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Este nombre aparecerá en las actas de horario, agendas y descargas oficiales PDF/CSV.
              </p>
            </div>
          </div>

          {/* Correo Institucional */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Correo Institucional UABC *</span>
            </label>
            <input
              id="perfil-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@uabc.edu.mx"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Cargo Institucional y Rol */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-slate-500" />
                <span>Cargo Institucional</span>
              </label>
              <input
                id="perfil-cargo"
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Ej. Subdirectora FCM, Profesor de Tiempo Completo..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Rol en Plataforma</span>
              </label>
              <select
                id="perfil-role"
                value={role}
                onChange={(e) => setRole(e.target.value as RolUsuario)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-bold focus:ring-1 focus:ring-sky-500"
              >
                <option value="profesor">Docente FCM</option>
                <option value="coordinador">Coordinador de Programa</option>
                <option value="admin">Administrador / Subdirección FCM</option>
              </select>
            </div>
          </div>

          {/* Área o Academia */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Academia / Área de Especialidad</span>
            </label>
            <input
              id="perfil-academia"
              type="text"
              value={academiaArea}
              onChange={(e) => setAcademiaArea(e.target.value)}
              placeholder="Ej. Oceanografía Física, Biotecnología Acuícola, Química Marina..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Botones de acción */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              id="btn-guardar-perfil-docente"
              type="submit"
              disabled={guardando}
              className="px-5 py-2 bg-[#0369a1] hover:bg-[#075985] text-white font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
            >
              {guardando ? (
                <span>Guardando...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guardar Nombre Real</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
