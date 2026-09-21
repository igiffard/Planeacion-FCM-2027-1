/**
 * Modal de Confirmación para Inicializar el Catálogo de Espacios FCM / IIO
 */

import React, { useState } from 'react';
import {
  Building2,
  RefreshCw,
  X,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';
import espaciosInicialesRaw from '../data/espacios_iniciales_2027_1.json';

interface ModalInicializarEspaciosProps {
  abierto: boolean;
  onCerrar: () => void;
  onConfirmar: (sobrescribir: boolean) => Promise<any>;
}

export const ModalInicializarEspacios: React.FC<ModalInicializarEspaciosProps> = ({
  abierto,
  onCerrar,
  onConfirmar
}) => {
  const [sobrescribir, setSobrescribir] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);
  const [resultado, setResultado] = useState<any>(null);

  if (!abierto) return null;

  const listaEspacios = (espaciosInicialesRaw as any).espacios || espaciosInicialesRaw;

  const handleEjecutar = async () => {
    setCargando(true);
    try {
      const res = await onConfirmar(sobrescribir);
      setResultado(res);
      setTimeout(() => {
        setResultado(null);
        onCerrar();
      }, 2500);
    } catch (err: any) {
      alert(err.message || 'Error durante la inicialización');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">
              Inicializar Catálogo Oficial de Espacios 2027-1
            </h3>
          </div>
          <button onClick={onCerrar} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {resultado ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              ¡Catálogo Inicializado con Éxito!
            </h4>
            <p className="text-xs text-slate-500">
              Se han sincronizado {resultado.espaciosCargados} espacios, {resultado.programasCargados} programas y {resultado.escenariosCargados} escenarios en Firestore.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-600 leading-relaxed">
              Esta acción verificará y registrará en la base de datos Firestore todos los espacios
              oficiales de la Facultad de Ciencias Marinas y del Instituto de Investigaciones
              Oceanológicas (IIO) para la planeación del periodo 2027-1:
            </p>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1.5 max-h-48 overflow-y-auto">
              <div className="font-semibold text-slate-700 mb-1">
                Espacios a configurar ({listaEspacios.length} en total):
              </div>
              <ul className="space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <strong>Aulas Regulares FCM:</strong> S1, S2, S3, S5, S6, S7, S8 (cap. 40-45).
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <strong>Aulas Magnas:</strong> AM1 (cap. 80), AM2 (cap. 40).
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <strong>Laboratorios Acuacultura y Marinos:</strong> Nutrición, Peces, Macroalgas (IIO), Moluscos (IIO), Cultivos de Apoyo (LCA).
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <strong>Laboratorios Químicos:</strong> Fisicoquímica, Química Orgánica, Bromatología.
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <strong>Salones de Posgrado:</strong> SP1, SP2, Audiovisual IIO, Geomática, Especialidad (EGA).
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-700">
              <input
                id="check-sobrescribir"
                type="checkbox"
                checked={sobrescribir}
                onChange={(e) => setSobrescribir(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="check-sobrescribir" className="cursor-pointer">
                Sobrescribir registros existentes si ya fueron modificados previamente
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={onCerrar}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                id="btn-confirmar-inicializacion"
                type="button"
                onClick={handleEjecutar}
                disabled={cargando}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white rounded-lg shadow-sm transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${cargando ? 'animate-spin' : ''}`} />
                <span>{cargando ? 'Inicializando...' : 'Proceder con Inicialización'}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
