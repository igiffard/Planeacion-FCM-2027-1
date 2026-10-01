/**
 * Modal para Dar de Alta o Editar un Profesor en el Catálogo FCM
 * Permite resolver nombres faltantes o corregir información docente
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  X,
  Save,
  GraduationCap,
  Mail,
  Building,
  Phone,
  Clock,
  BookOpen,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Usuario, RolUsuario, NivelEducativo } from '../types';

interface ModalCrearEditarDocenteProps {
  abierto: boolean;
  docenteParaEditar: Usuario | null;
  onCerrar: () => void;
  onGuardar: (docente: Usuario) => Promise<void>;
}

export const ModalCrearEditarDocente: React.FC<ModalCrearEditarDocenteProps> = ({
  abierto,
  docenteParaEditar,
  onCerrar,
  onGuardar
}) => {
  const [tituloAcademico, setTituloAcademico] = useState('Dr.');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [academiaArea, setAcademiaArea] = useState('');
  const [cargo, setCargo] = useState('Profesor Investigador');
  const [cubiculo, setCubiculo] = useState('');
  const [telefonoExtension, setTelefonoExtension] = useState('');
  const [horarioTutorias, setHorarioTutorias] = useState('');
  const [canalContacto, setCanalContacto] = useState('Correo institucional / Microsoft Teams');
  const [nivelEducativo, setNivelEducativo] = useState<NivelEducativo>('posgrado');
  const [rol, setRol] = useState<RolUsuario>('profesor');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (docenteParaEditar) {
      setTituloAcademico(docenteParaEditar.titulo_academico || 'Dr.');
      setNombre(docenteParaEditar.nombre || '');
      setEmail(docenteParaEditar.email || '');
      setAcademiaArea(docenteParaEditar.academia_area || '');
      setCargo(docenteParaEditar.cargo || 'Profesor Investigador');
      setCubiculo(docenteParaEditar.cubiculo || '');
      setTelefonoExtension(docenteParaEditar.telefono_extension || '');
      setHorarioTutorias(docenteParaEditar.horario_tutorias || '');
      setCanalContacto(docenteParaEditar.canal_contacto_estudiantes || 'Correo institucional / Microsoft Teams');
      setNivelEducativo(docenteParaEditar.niveles_asignados?.[0] || 'posgrado');
      setRol(docenteParaEditar.role || 'profesor');
    } else {
      setTituloAcademico('Dr.');
      setNombre('');
      setEmail('');
      setAcademiaArea('');
      setCargo('Profesor Investigador Posgrado');
      setCubiculo('');
      setTelefonoExtension('');
      setHorarioTutorias('');
      setCanalContacto('Correo institucional / Microsoft Teams');
      setNivelEducativo('posgrado');
      setRol('profesor');
    }
    setError(null);
  }, [docenteParaEditar, abierto]);

  if (!abierto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError('El nombre del profesor es obligatorio.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Ingrese un correo institucional válido (@uabc.edu.mx).');
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      const emailNorm = email.trim().toLowerCase();
      const nombreCompleto = nombre.startsWith(tituloAcademico)
        ? nombre.trim()
        : `${tituloAcademico} ${nombre.trim()}`;

      const uid =
        docenteParaEditar?.uid ||
        `prof_${emailNorm.split('@')[0].replace(/[^a-z0-9]/g, '_')}_${Date.now().toString(36)}`;

      const niveles: NivelEducativo[] =
        nivelEducativo === 'posgrado'
          ? ['posgrado', 'licenciatura']
          : ['licenciatura'];

      const usuarioFinal: Usuario = {
        uid,
        nombre: nombreCompleto,
        titulo_academico: tituloAcademico,
        email: emailNorm,
        email_normalizado: emailNorm,
        role: rol,
        cargo: cargo.trim() || 'Docente FCM',
        academia_area: academiaArea.trim() || 'Oceanografía / Ciencias Marinas',
        cubiculo: cubiculo.trim(),
        telefono_extension: telefonoExtension.trim(),
        horario_tutorias: horarioTutorias.trim(),
        canal_contacto_estudiantes: canalContacto.trim(),
        programas_asignados_ids: docenteParaEditar?.programas_asignados_ids || ['MOC', 'DOC'],
        niveles_asignados: niveles,
        activo: true,
        createdAt: docenteParaEditar?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await onGuardar(usuarioFinal);
      onCerrar();
    } catch (err: any) {
      setError(err?.message || 'Error al guardar el profesor.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-[#0c2d48] to-[#145374] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Users className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {docenteParaEditar ? 'Editar Datos del Profesor' : 'Alta de Nuevo Profesor'}
              </h3>
              <p className="text-xs text-sky-200">
                Facultad de Ciencias Marinas e Instituto de Investigaciones Oceanológicas
              </p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Título y Nombre */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Grado
              </label>
              <select
                value={tituloAcademico}
                onChange={(e) => setTituloAcademico(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500"
              >
                <option value="Dr.">Dr.</option>
                <option value="Dra.">Dra.</option>
                <option value="M.C.">M.C.</option>
                <option value="M.I.">M.I.</option>
                <option value="Biol.">Biol.</option>
                <option value="Lic.">Lic.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre Completo <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ej. Benjamín Martín o Laura Liliana López"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Correo y Cargo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Correo Institucional UABC <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="email"
                required
                placeholder="usuario@uabc.edu.mx"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>Cargo Académico</span>
              </label>
              <input
                type="text"
                placeholder="ej. Profesor de Posgrado / Investigador IIO"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Área / Academia y Nivel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>Academia / Área de Especialidad</span>
              </label>
              <input
                type="text"
                placeholder="ej. Estadística y Modelación, Genómica, Acuacultura..."
                value={academiaArea}
                onChange={(e) => setAcademiaArea(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nivel Asignado Principal
              </label>
              <select
                value={nivelEducativo}
                onChange={(e) => setNivelEducativo(e.target.value as NivelEducativo)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              >
                <option value="posgrado">Posgrado (MOC / DOC / EGA)</option>
                <option value="licenciatura">Licenciatura (OCE / LBA / LCA / TC)</option>
              </select>
            </div>
          </div>

          {/* Cubículo y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Cubículo / Laboratorio</span>
              </label>
              <input
                type="text"
                placeholder="ej. Edificio S · Planta Alta S-208"
                value={cubiculo}
                onChange={(e) => setCubiculo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Extensión Telefónica</span>
              </label>
              <input
                type="text"
                placeholder="ej. Ext. 43215"
                value={telefonoExtension}
                onChange={(e) => setTelefonoExtension(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Horario de Tutorías y Canal de Contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Horario de Asesorías / Tutorías</span>
              </label>
              <input
                type="text"
                placeholder="ej. Martes y Jueves 11:00 - 13:00"
                value={horarioTutorias}
                onChange={(e) => setHorarioTutorias(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Canal de Contacto con Estudiantes
              </label>
              <input
                type="text"
                placeholder="ej. Microsoft Teams / Presencial"
                value={canalContacto}
                onChange={(e) => setCanalContacto(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0369a1] hover:bg-[#075985] text-white rounded-lg text-xs font-bold shadow-xs transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{guardando ? 'Guardando...' : docenteParaEditar ? 'Actualizar Profesor' : 'Registrar Profesor'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
