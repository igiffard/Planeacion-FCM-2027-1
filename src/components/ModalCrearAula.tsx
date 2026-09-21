/**
 * Modal para Registrar una Nueva Aula / Espacio Físico FCM
 * EXCLUSIVO: Administrador (Dra. Ivone Giffard / Subdirección FCM)
 */

import React, { useState } from 'react';
import {
  Building2,
  Plus,
  X,
  Save,
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';
import { Espacio, TipoEspacio, RoleUsuario } from '../types';

interface ModalCrearAulaProps {
  abierto: boolean;
  roleUsuario?: RoleUsuario;
  onCerrar: () => void;
  onGuardar: (nuevaAula: Espacio) => Promise<void>;
}

const TIPOS_ESPACIO: { valor: TipoEspacio; label: string }[] = [
  { valor: 'aula', label: 'Aula Regular de Clases (S1-S8, etc.)' },
  { valor: 'laboratorio', label: 'Laboratorio Especializado FCM/IIO' },
  { valor: 'audiovisual', label: 'Auditorio / Aula Magna / Posgrado' },
  { valor: 'aula_computo', label: 'Laboratorio de Cómputo' },
  { valor: 'taller', label: 'Taller / Área Experimental' },
  { valor: 'espacio_apoyo', label: 'Espacio de Apoyo Docente' }
];

export const ModalCrearAula: React.FC<ModalCrearAulaProps> = ({
  abierto,
  roleUsuario,
  onCerrar,
  onGuardar
}) => {
  const esAdmin = roleUsuario === 'admin';

  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [edificio, setEdificio] = useState('Edificio 17');
  const [capacidadMaxima, setCapacidadMaxima] = useState<number>(40);
  const [tipoEspacio, setTipoEspacio] = useState<TipoEspacio>('aula');
  const [aptoParaDocencia, setAptoParaDocencia] = useState(true);
  const [equipamiento, setEquipamiento] = useState('Proyector, Aire Acondicionado');
  const [notas, setNotas] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!abierto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esAdmin) {
      setError('Solo la Subdirección FCM puede dar de alta nuevos espacios oficiales.');
      return;
    }
    if (!nombre.trim()) {
      setError('Por favor proporcione el nombre del aula.');
      return;
    }
    if (!codigo.trim()) {
      setError('Por favor proporcione el código de identificación del aula.');
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      const id = `espacio_${codigo.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_')}`;
      const cod = codigo.trim().toUpperCase();
      const nom = nombre.trim();
      const cap = Number(capacidadMaxima) || 40;

      const nuevaAula: Espacio = {
        id,
        codigo: cod,
        codigo_normalizado: cod,
        nombre: nom,
        nombre_normalizado: nom.toLowerCase(),
        aliases_normalizados: [],
        categoria:
          tipoEspacio === 'laboratorio'
            ? 'laboratorios_especializados'
            : tipoEspacio === 'aula_computo'
            ? 'centros_computo'
            : 'aulas_salones_teoricos',
        tipo_espacio: tipoEspacio,
        edificio: edificio.trim(),
        ubicacion: edificio.trim(),
        capacidad_original: cap,
        capacidad_maxima: cap,
        equipos: equipamiento
          .split(',')
          .map((eq) => eq.trim())
          .filter(Boolean),
        caracteristicas: [],
        niveles_educativos_permitidos: ['licenciatura', 'posgrado'],
        programas_preferentes_ids: [],
        disponible: true,
        disponible_periodos: ['2027-1'],
        activo: true,
        apto_para_docencia: aptoParaDocencia,
        es_modalidad_virtual: false,
        notas: notas.trim() || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await onGuardar(nuevaAula);
      // Reset
      setNombre('');
      setCodigo('');
      setNotas('');
      onCerrar();
    } catch (err: any) {
      setError(err.message || 'Error al registrar el aula en el catálogo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Registrar Nueva Aula o Laboratorio FCM
              </h3>
              <p className="text-[11px] text-slate-500">
                Inclusión oficial en catálogo y matriz de horarios 2027-1
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

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-xs text-red-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nombre Oficial Canónico del Aula *
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Salón 9, Aula Magna III, Laboratorio de Acuacultura II"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Código del Aula *
              </label>
              <input
                type="text"
                required
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej: S9, AM3, LAC2"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold uppercase focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Edificio / Ubicación
              </label>
              <input
                type="text"
                value={edificio}
                onChange={(e) => setEdificio(e.target.value)}
                placeholder="Ej: Edificio 17, Edificio 14, IIO"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Capacidad Máxima (Estudiantes)
              </label>
              <input
                type="number"
                min="1"
                max="250"
                value={capacidadMaxima}
                onChange={(e) => setCapacidadMaxima(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-semibold focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tipo de Espacio
              </label>
              <select
                value={tipoEspacio}
                onChange={(e) => setTipoEspacio(e.target.value as TipoEspacio)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-emerald-500"
              >
                {TIPOS_ESPACIO.map((t) => (
                  <option key={t.valor} value={t.valor}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Equipamiento (Separado por comas)
            </label>
            <input
              type="text"
              value={equipamiento}
              onChange={(e) => setEquipamiento(e.target.value)}
              placeholder="Ej: Proyector, Clima, Campana de extracción, Microscopios"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="chk-apto-docencia"
              checked={aptoParaDocencia}
              onChange={(e) => setAptoParaDocencia(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <label htmlFor="chk-apto-docencia" className="text-slate-700 font-semibold cursor-pointer">
              Espacio apto para docencia regular y asignación de horarios
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-sm transition disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{guardando ? 'Guardando...' : 'Crear Aula en Catálogo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
