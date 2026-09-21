/**
 * Modal para Editar el Nombre y Atributos de un Aula FCM
 * EXCLUSIVO: Solo Administrador (Dra. Ivone Giffard / Subdirección FCM)
 */

import React, { useState, useEffect } from 'react';
import {
  Building2,
  X,
  Save,
  Pencil,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { Espacio, TipoEspacio, RoleUsuario } from '../types';

interface ModalEditarAulaProps {
  abierto: boolean;
  espacio: Espacio | null;
  roleUsuario?: RoleUsuario;
  onCerrar: () => void;
  onGuardar: (espacioActualizado: Espacio) => Promise<void>;
}

const TIPOS_ESPACIO: { valor: TipoEspacio; label: string }[] = [
  { valor: 'aula', label: 'Aula Regular de Clases (S1-S8, etc.)' },
  { valor: 'laboratorio', label: 'Laboratorio Especializado FCM/IIO' },
  { valor: 'audiovisual', label: 'Auditorio / Aula Magna / Posgrado' },
  { valor: 'aula_computo', label: 'Laboratorio de Cómputo' },
  { valor: 'taller', label: 'Taller / Área Experimental' },
  { valor: 'espacio_apoyo', label: 'Espacio de Apoyo Docente' }
];

export const ModalEditarAula: React.FC<ModalEditarAulaProps> = ({
  abierto,
  espacio,
  roleUsuario,
  onCerrar,
  onGuardar
}) => {
  const esAdmin = roleUsuario === 'admin';

  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [edificio, setEdificio] = useState('');
  const [capacidadMaxima, setCapacidadMaxima] = useState<number>(40);
  const [tipoEspacio, setTipoEspacio] = useState<TipoEspacio>('aula');
  const [notas, setNotas] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (espacio) {
      setNombre(espacio.nombre || '');
      setCodigo(espacio.codigo || '');
      setEdificio(espacio.edificio || '');
      setCapacidadMaxima(espacio.capacidad_maxima || 40);
      setTipoEspacio(espacio.tipo_espacio || 'aula');
      setNotas(espacio.notas || '');
      setError(null);
    }
  }, [espacio]);

  if (!abierto || !espacio) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esAdmin) {
      setError('Solo el administrador (Subdirección FCM) tiene permisos para modificar nombres de aulas.');
      return;
    }
    if (!nombre.trim()) {
      setError('El nombre del aula es obligatorio.');
      return;
    }
    if (!codigo.trim()) {
      setError('El código del aula es obligatorio.');
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      const cod = codigo.trim().toUpperCase();
      const nom = nombre.trim();
      const cap = Number(capacidadMaxima) || 40;

      const espacioActualizado: Espacio = {
        ...espacio,
        nombre: nom,
        nombre_normalizado: nom.toLowerCase(),
        codigo: cod,
        codigo_normalizado: cod,
        edificio: edificio.trim(),
        ubicacion: edificio.trim(),
        capacidad_maxima: cap,
        capacidad_original: espacio.capacidad_original || cap,
        tipo_espacio: tipoEspacio,
        notas: notas.trim() || undefined,
        updatedAt: new Date().toISOString()
      };

      await onGuardar(espacioActualizado);
      onCerrar();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el aula en la base de datos.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-800">
              <Pencil className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Editar Nombre y Catálogo de Aula
              </h3>
              <p className="text-[11px] text-slate-500">
                Control Oficial de Espacios · Facultad de Ciencias Marinas
              </p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerta de permisos si no es admin */}
        {!esAdmin && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Permiso Exclusivo de Administración</p>
              <p className="text-[11px] text-amber-800">
                Solo la Dra. Ivone Giffard (Subdirectora FCM) o los administradores institucionales pueden editar los nombres de los espacios para garantizar la consistencia en el catálogo.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-xs text-red-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Nombre Oficial */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nombre Oficial Canónico del Aula *
            </label>
            <input
              type="text"
              required
              disabled={!esAdmin || guardando}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Aula Magna I, Salón 1, Laboratorio de Nutrición"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-sky-500 disabled:opacity-60"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Este nombre se mostrará en las matrices horarias, listas oficiales y actas de examen.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Código */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Código del Aula *
              </label>
              <input
                type="text"
                required
                disabled={!esAdmin || guardando}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej: AM1, S1, LNU"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:ring-1 focus:ring-sky-500 disabled:opacity-60 uppercase"
              />
            </div>

            {/* Edificio */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Edificio / Ubicación
              </label>
              <input
                type="text"
                disabled={!esAdmin || guardando}
                value={edificio}
                onChange={(e) => setEdificio(e.target.value)}
                placeholder="Ej: Edificio 17, Edificio 14, IIO"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Capacidad Máxima */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Capacidad Máxima (Estudiantes)
              </label>
              <input
                type="number"
                min="1"
                max="200"
                disabled={!esAdmin || guardando}
                value={capacidadMaxima}
                onChange={(e) => setCapacidadMaxima(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-sky-500 disabled:opacity-60"
              />
            </div>

            {/* Tipo de Espacio */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tipo de Espacio
              </label>
              <select
                disabled={!esAdmin || guardando}
                value={tipoEspacio}
                onChange={(e) => setTipoEspacio(e.target.value as TipoEspacio)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 disabled:opacity-60"
              >
                {TIPOS_ESPACIO.map((t) => (
                  <option key={t.valor} value={t.valor}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notas / Observaciones */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Notas de Equipamiento o Disponibilidad
            </label>
            <textarea
              rows={2}
              disabled={!esAdmin || guardando}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Ej: Proyector HDMI, aire acondicionado, tomas de agua..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-sky-500 disabled:opacity-60"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-lg transition"
            >
              Cancelar
            </button>
            {esAdmin ? (
              <button
                type="submit"
                disabled={guardando}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0c2d48] hover:bg-[#1a4b70] text-white font-bold rounded-lg shadow-sm transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{guardando ? 'Guardando...' : 'Guardar Cambios Oficiales'}</span>
              </button>
            ) : (
              <div className="text-[11px] text-slate-400 italic">
                Modo sólo lectura para profesores
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
