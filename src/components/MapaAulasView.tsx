/**
 * Vista de Mapa de la Unidad FCM y Ubicación de Aulas
 * Periodo 2027-1 · Facultad de Ciencias Marinas (FCM - UABC)
 * Mapeo 1:1 con lámina oficial 4K de ubicación física de aulas y laboratorios
 */

import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Building2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  Maximize2,
  X,
  Users,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { Espacio, Asignacion, CategoriaEspacio } from '../types';

interface MapaAulasViewProps {
  espacios: Espacio[];
  asignaciones: Asignacion[];
  onNavegarVista: (vista: any) => void;
  onVerOcupacionEspacio?: (espacioId: string) => void;
}

const EDIFICIOS_OFICIALES = [
  { id: 'todos', label: 'Todos los Edificios' },
  { id: 'E-13', label: 'E-13 · Almacenes' },
  { id: 'E-14', label: 'E-14 · Dirección FCM' },
  { id: 'E-15', label: 'E-15 · Zoología / Bioquímica' },
  { id: 'E-16', label: 'E-16 · Física / Sedimentos' },
  { id: 'E-17', label: 'E-17 · Aulas Magna / Fluidos' },
  { id: 'E-18', label: 'E-18 · Salones 1-7 / Ecotecnias' },
  { id: 'E-20', label: 'E-20 · Moluscos / Totoaba' },
  { id: 'E-21', label: 'E-21 · Topografía / Geomática' },
  { id: 'E-25', label: 'E-25 · IIO (Oceanológicas)' },
  { id: 'E-41', label: 'E-41 · Cultivos / Fisiología' },
  { id: 'E-56', label: 'E-56 · Totoaba A-B / Peces' },
  { id: 'Generales', label: 'Gimnasio / Cafetería / SMU' },
  { id: 'VIR', label: 'Modalidad Virtual' }
];

const CATEGORIAS_FILTRO: { id: string; label: string }[] = [
  { id: 'todas', label: 'Todas las categorías' },
  { id: 'aulas_salones_teoricos', label: 'Aulas / Salones Teóricos' },
  { id: 'laboratorios_especializados', label: 'Laboratorios Especializados' },
  { id: 'centros_computo', label: 'Centros de Cómputo' },
  { id: 'audiovisuales_auditorios', label: 'Auditorios y Audiovisuales' },
  { id: 'talleres_practicas', label: 'Talleres y Prácticas' },
  { id: 'espacios_apoyo', label: 'Espacios de Apoyo' }
];

export const MapaAulasView: React.FC<MapaAulasViewProps> = ({
  espacios,
  asignaciones,
  onNavegarVista,
  onVerOcupacionEspacio
}) => {
  const [filtroEdificio, setFiltroEdificio] = useState<string>('todos');
  const [filtroPlanta, setFiltroPlanta] = useState<string>('todas');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');
  const [modalMapaExpandido, setModalMapaExpandido] = useState<boolean>(false);
  const [aulaSeleccionadaId, setAulaSeleccionadaId] = useState<string | null>(null);

  // Contar asignaciones por espacio en periodo 2027-1
  const conteoAsignaciones = useMemo(() => {
    const mapa = new Map<string, number>();
    asignaciones.forEach((a) => {
      if (a.estatus !== 'cancelado') {
        mapa.set(a.espacio_id, (mapa.get(a.espacio_id) || 0) + 1);
      }
    });
    return mapa;
  }, [asignaciones]);

  // Espacios filtrados
  const espaciosFiltrados = useMemo(() => {
    return espacios.filter((e) => {
      // Búsqueda libre
      if (busqueda.trim()) {
        const q = busqueda.toLowerCase().trim();
        const coincideCodigo = e.codigo.toLowerCase().includes(q);
        const coincideNombre = e.nombre.toLowerCase().includes(q);
        const coincideEdificio = e.edificio.toLowerCase().includes(q);
        if (!coincideCodigo && !coincideNombre && !coincideEdificio) return false;
      }

      // Edificio
      if (filtroEdificio !== 'todos') {
        if (filtroEdificio === 'Generales') {
          if (!['Gimnasio', 'Cafetería', 'Sala de usos múltiples'].some((g) => e.edificio.includes(g))) {
            return false;
          }
        } else if (filtroEdificio === 'VIR') {
          if (e.codigo !== 'VIR' && !e.es_modalidad_virtual) return false;
        } else {
          const matchCode = e.edificio_codigo === filtroEdificio || e.edificio.includes(filtroEdificio.replace('E-', 'Edificio '));
          if (!matchCode) return false;
        }
      }

      // Planta
      if (filtroPlanta !== 'todas') {
        if (e.planta !== filtroPlanta && !e.ubicacion.includes(filtroPlanta)) return false;
      }

      // Categoría
      if (filtroCategoria !== 'todas') {
        if (e.categoria !== filtroCategoria) return false;
      }

      return true;
    });
  }, [espacios, busqueda, filtroEdificio, filtroPlanta, filtroCategoria]);

  // Métricas de catálogo oficial
  const totalOficiales = useMemo(() => espacios.filter((e) => e.oficial_mapa).length, [espacios]);
  const totalDudas = useMemo(
    () => espacios.filter((e) => e.duda_homologacion || e.estado_catalogo === 'pendiente_revision_subdireccion').length,
    [espacios]
  );

  const aulaDetalle = useMemo(() => {
    return espacios.find((e) => e.id === aulaSeleccionadaId) || null;
  }, [espacios, aulaSeleccionadaId]);

  const asignacionesAulaDetalle = useMemo(() => {
    if (!aulaDetalle) return [];
    return asignaciones.filter((a) => a.espacio_id === aulaDetalle.id && a.estatus !== 'cancelado');
  }, [asignaciones, aulaDetalle]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Encabezado Principal */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
              Campus El Sauzal · Ensenada
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Periodo Oficial 2027-1
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0c2d48] tracking-tight">
            Mapa de la Unidad FCM y Catálogo Oficial de Aulas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Ubicación física exacta de aulas, laboratorios, talleres y centros de cómputo conforme a la lámina oficial de la Subdirección FCM. Ni una aula más, ni un aula menos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setModalMapaExpandido(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2d48] hover:bg-[#14426b] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Ver Lámina del Campus en 4K</span>
          </button>

          {totalDudas > 0 && (
            <button
              type="button"
              onClick={() => onNavegarVista('homologacion')}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold rounded-lg transition-colors"
              title="Revisar aulas pendientes de homologación"
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Dudas para Subdirección ({totalDudas})</span>
            </button>
          )}
        </div>
      </div>

      {/* Banner de Homologación de Subdirección */}
      {totalDudas > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Directriz de Subdirección: Catálogo Homologado con el Mapa Oficial
              </h4>
              <p className="text-xs text-amber-800/90 mt-0.5">
                El catálogo oficial cuenta con exactamente <strong>{totalOficiales} espacios oficiales</strong> correspondientes a la lámina del campus. Se han detectado <strong>{totalDudas} espacios adicionales</strong> provenientes de registros históricos; <em>no han sido eliminados</em> y se canalizaron al botón de <strong>Homologación de Catálogo</strong> para revisión exclusiva de la Dra. Ivone Giffard.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavegarVista('homologacion')}
            className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-md shadow-2xs transition-colors whitespace-nowrap"
          >
            <span>Ir a Homologación</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Vista Previa del Mapa Ilustrado del Campus */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Distribución Arquitectónica y Fachada FCM (Sauzal de Rodríguez, Ensenada)
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setModalMapaExpandido(true)}
            className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
          >
            <span>Expandir mapa</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative group cursor-pointer overflow-hidden bg-slate-900 max-h-72 sm:max-h-80 flex items-center justify-center" onClick={() => setModalMapaExpandido(true)}>
          <img
            src="/images/mapa_fcm_campus.jpg"
            alt="Mapa Arquitectónico FCM Campus Ensenada"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300 opacity-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 pointer-events-none">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/80 text-white backdrop-blur-xs">
                  Vista Aérea e Identificación de Edificios
                </span>
                <span className="text-xs text-slate-300">Haz clic para ver en pantalla completa</span>
              </div>
              <p className="text-xs text-slate-200 max-w-2xl hidden sm:block">
                Edificios 13, 14 (Dirección), 15, 16, 17, 18, 20, 21, 25 (IIO), 41 y 56 distribuidos frente a la Bahía de Todos Santos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros Rápidos */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por código (ej. AM1, S1, CPB, LOB, SP1) o nombre del aula..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-hidden bg-slate-50 focus:bg-white"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filtroPlanta}
              onChange={(e) => setFiltroPlanta(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 bg-white"
            >
              <option value="todas">Todas las plantas</option>
              <option value="Planta Baja">Planta Baja</option>
              <option value="Planta Alta">Planta Alta</option>
              <option value="Parte Posterior">Parte Posterior</option>
            </select>

            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 bg-white"
            >
              {CATEGORIAS_FILTRO.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pestañas de Edificios Rápidas */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          {EDIFICIOS_OFICIALES.map((ed) => {
            const activo = filtroEdificio === ed.id;
            return (
              <button
                key={ed.id}
                type="button"
                onClick={() => setFiltroEdificio(ed.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  activo
                    ? 'bg-[#0c2d48] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ed.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resultados y Cuadrícula de Aulas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Mostrando {espaciosFiltrados.length} espacios físicos</span>
          <span>{totalOficiales} oficiales en mapa · {totalDudas} en revisión</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {espaciosFiltrados.map((aula) => {
            const clases = conteoAsignaciones.get(aula.id) || 0;
            const esDuda = aula.duda_homologacion || aula.estado_catalogo === 'pendiente_revision_subdireccion';

            return (
              <div
                key={aula.id}
                className={`rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                  esDuda
                    ? 'bg-amber-50/40 border-amber-300 hover:shadow-md'
                    : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {aula.edificio_codigo || aula.edificio}
                    </span>

                    {esDuda ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Revisión Subdirección
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Oficial Mapa
                      </span>
                    )}
                  </div>

                  {/* Room Code & Name */}
                  <div className="mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-[#0c2d48] tracking-tight">
                        {aula.codigo}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {aula.planta || 'General'}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">
                      {aula.nombre}
                    </h3>
                  </div>

                  {/* Specs */}
                  <div className="space-y-1 text-xs text-slate-600 mb-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Capacidad:</span>
                      <span className="font-semibold text-slate-700">{aula.capacidad_maxima} alumnos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Carga 2027-1:</span>
                      <span className={`font-semibold ${clases > 0 ? 'text-sky-700' : 'text-slate-400'}`}>
                        {clases} {clases === 1 ? 'clase' : 'clases'} programadas
                      </span>
                    </div>
                  </div>

                  {/* Equipos */}
                  {aula.equipos && aula.equipos.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {aula.equipos.slice(0, 3).map((eq, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {eq}
                        </span>
                      ))}
                      {aula.equipos.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400">
                          +{aula.equipos.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setAulaSeleccionadaId(aula.id)}
                    className="flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver detalle</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onVerOcupacionEspacio) {
                        onVerOcupacionEspacio(aula.id);
                      } else {
                        onNavegarVista('matriz_espacios');
                      }
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded transition-colors"
                  >
                    Ver Horario
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {espaciosFiltrados.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No se encontraron aulas con los filtros seleccionados</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Intenta cambiar la búsqueda o seleccionar otro edificio para ver las aulas disponibles.
            </p>
            <button
              onClick={() => {
                setBusqueda('');
                setFiltroEdificio('todos');
                setFiltroPlanta('todas');
                setFiltroCategoria('todas');
              }}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>

      {/* Modal Lightbox de Pantalla Completa del Mapa 4K */}
      {modalMapaExpandido && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-700" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Lámina Oficial de Ubicación de Aulas y Laboratorios FCM · UABC
                  </h3>
                  <p className="text-xs text-slate-500">
                    Facultad de Ciencias Marinas · Campus El Sauzal de Rodríguez, Ensenada B.C.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalMapaExpandido(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-slate-950 flex items-center justify-center">
              <img
                src="/images/mapa_fcm_campus.jpg"
                alt="Mapa Campus FCM Completo"
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
              <div className="flex items-center gap-4">
                <span><strong>E-13 a E-18:</strong> Aulas y Laboratorios Centrales</span>
                <span><strong>E-20 / E-21 / E-56:</strong> Acuacultura y Geomática</span>
                <span><strong>E-25:</strong> IIO Posgrados</span>
              </div>
              <button
                onClick={() => setModalMapaExpandido(false)}
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 text-xs"
              >
                Cerrar vista
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ficha Detalle de Aula */}
      {aulaDetalle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-5 bg-gradient-to-r from-[#0c2d48] to-[#14426b] text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-white/20 font-bold">
                    {aulaDetalle.edificio_codigo || aulaDetalle.edificio}
                  </span>
                  <span className="text-xs text-sky-200 font-medium">
                    {aulaDetalle.planta || aulaDetalle.ubicacion}
                  </span>
                </div>
                <h3 className="text-xl font-black">{aulaDetalle.codigo} · {aulaDetalle.nombre}</h3>
              </div>
              <button
                onClick={() => setAulaSeleccionadaId(null)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block mb-1">Capacidad Máxima</span>
                  <span className="text-base font-bold text-slate-800">{aulaDetalle.capacidad_maxima} alumnos</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block mb-1">Tipo de Espacio</span>
                  <span className="text-base font-bold text-slate-800 capitalize">
                    {aulaDetalle.tipo_espacio.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {aulaDetalle.duda_homologacion && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                  <span className="font-bold flex items-center gap-1.5 mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Estado: Pendiente de Revisión por Subdirección
                  </span>
                  <p className="text-[11px] text-amber-800">
                    {aulaDetalle.motivo_duda || 'No figura en la lámina oficial de Aulas/Laboratorios FCM (Mapa 4K).'}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-800 mb-2">Clases asignadas en este espacio (2027-1):</h4>
                {asignacionesAulaDetalle.length > 0 ? (
                  <div className="space-y-1.5">
                    {asignacionesAulaDetalle.map((asig) => (
                      <div key={asig.id} className="p-2.5 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-800 block">{asig.nombre_visible || asig.curso_id}</span>
                          <span className="text-slate-500 text-[11px]">{asig.profesor_nombre || 'Docente por asignar'}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-sky-700 capitalize block">{asig.dia}</span>
                          <span className="text-[11px] text-slate-500">{asig.hora_inicio} - {asig.hora_fin}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">No hay clases programadas en este espacio actualmente.</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setAulaSeleccionadaId(null)}
                className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 text-xs"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setAulaSeleccionadaId(null);
                  if (onVerOcupacionEspacio) {
                    onVerOcupacionEspacio(aulaDetalle.id);
                  } else {
                    onNavegarVista('matriz_espacios');
                  }
                }}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-lg text-xs"
              >
                Ver Matriz de Ocupación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
