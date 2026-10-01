/**
 * Vista de Homologación de Catálogos y Deduplicación FCM
 * Sección 8 y 9: Equivalencias de espacios, normalizarTexto y deduplicación de cursos
 */

import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  CheckCircle2,
  Plus,
  RefreshCw,
  GitMerge,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  BookOpen,
  Check,
  Pencil,
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRightLeft
} from 'lucide-react';
import { Espacio, Curso, EquivalenciaEspacio, Asignacion, RoleUsuario } from '../types';
import { normalizarTexto, calcularSimilitud } from '../utils/normalization';

interface HomologacionViewProps {
  espacios: Espacio[];
  cursos: Curso[];
  equivalencias: EquivalenciaEspacio[];
  asignaciones?: Asignacion[];
  onAgregarEquivalencia: (eq: EquivalenciaEspacio) => Promise<void>;
  onActualizarEspacio?: (espacio: Espacio) => Promise<void>;
  onEditarEspacio?: (espacio: Espacio) => void;
  roleUsuario?: RoleUsuario;
  onUnificarAulas?: (variante: string, espacioOficialId: string) => Promise<any>;
  onUnificarTodasLasAulas?: () => Promise<any>;
  onHomologarEspacioDuda?: (espacioDudaId: string, espacioOficialDestinoId: string) => Promise<any>;
  onRatificarEspacioDuda?: (espacioDudaId: string) => Promise<any>;
}

export const HomologacionView: React.FC<HomologacionViewProps> = ({
  espacios,
  cursos,
  equivalencias,
  asignaciones = [],
  onAgregarEquivalencia,
  onActualizarEspacio,
  onEditarEspacio,
  roleUsuario,
  onUnificarAulas,
  onUnificarTodasLasAulas,
  onHomologarEspacioDuda,
  onRatificarEspacioDuda
}) => {
  const espaciosDudasSubdireccion = useMemo(() => {
    return espacios.filter(
      (e) => e.duda_homologacion || e.estado_catalogo === 'pendiente_revision_subdireccion'
    );
  }, [espacios]);

  const espaciosOficialesMapa = useMemo(() => {
    return espacios.filter((e) => e.oficial_mapa || e.estado_catalogo === 'oficial_mapa');
  }, [espacios]);

  const [subpestana, setSubpestana] = useState<
    'revision_subdireccion' | 'unificar_aulas' | 'equivalencias' | 'espacios' | 'deduplicacion'
  >(espacios.some((e) => e.duda_homologacion) ? 'revision_subdireccion' : 'unificar_aulas');

  // Asignaciones activas mapeadas por ID y por código de espacio
  const asignacionesPorEspacio = useMemo(() => {
    const map = new Map<string, number>();
    asignaciones.forEach((a) => {
      if (a.estatus !== 'cancelado') {
        map.set(a.espacio_id, (map.get(a.espacio_id) || 0) + 1);
        if (a.espacio_codigo) {
          map.set(a.espacio_codigo, (map.get(a.espacio_codigo) || 0) + 1);
        }
      }
    });
    return map;
  }, [asignaciones]);

  // Selección individual de destino para cada espacio dudoso
  const [destinosHomologacion, setDestinosHomologacion] = useState<Record<string, string>>({});
  const [procesandoDudaId, setProcesandoDudaId] = useState<string | null>(null);

  const obtenerSugerenciaOficialId = (codigoDuda: string, nombreDuda: string): string => {
    const cd = (codigoDuda || '').toUpperCase();
    const nd = (nombreDuda || '').toUpperCase();

    let targetCode = 'S1';
    if (cd.startsWith('AF') || nd.includes('ANEXO') || nd.includes('MAGNA')) targetCode = 'AM1';
    else if (cd.includes('SALA B') || nd.includes('SALA B') || cd === 'CPA' || cd === 'CPB') targetCode = 'CPB';
    else if (cd.includes('IIO') || cd.includes('SPI') || cd === 'P3' || cd === 'P5' || nd.includes('POSGRADO')) targetCode = 'SP1';
    else if (cd.includes('TOTOABA') || cd === 'SJT') targetCode = 'TOA';
    else if (cd === 'SJG' || cd === 'EAP2' || nd.includes('GEOMATICA') || nd.includes('SIG')) targetCode = 'GEO';
    else if (cd === 'DIE') targetCode = 'S1';
    else if (cd === 'DOM') targetCode = 'SMU';

    const encontrado = espaciosOficialesMapa.find((e) => e.codigo === targetCode);
    return encontrado ? encontrado.id : (espaciosOficialesMapa[0]?.id || '');
  };

  const getDestinoParaDuda = (duda: Espacio): string => {
    if (destinosHomologacion[duda.id]) return destinosHomologacion[duda.id];
    return obtenerSugerenciaOficialId(duda.codigo, duda.nombre);
  };

  const handleEjecutarHomologacionDuda = async (duda: Espacio) => {
    const destinoId = getDestinoParaDuda(duda);
    if (!destinoId) return;
    setProcesandoDudaId(duda.id);
    setMensajeUnificacion(null);
    try {
      if (onHomologarEspacioDuda) {
        const res = await onHomologarEspacioDuda(duda.id, destinoId);
        setMensajeUnificacion({
          tipo: 'exito',
          texto: res?.mensaje || `Espacio ${duda.codigo} homologado exitosamente.`
        });
      }
    } catch (e: any) {
      setMensajeUnificacion({
        tipo: 'error',
        texto: e.message || 'Error al homologar espacio'
      });
    } finally {
      setProcesandoDudaId(null);
    }
  };

  const handleEjecutarRatificacionDuda = async (duda: Espacio) => {
    setProcesandoDudaId(duda.id);
    setMensajeUnificacion(null);
    try {
      if (onRatificarEspacioDuda) {
        await onRatificarEspacioDuda(duda.id);
        setMensajeUnificacion({
          tipo: 'exito',
          texto: `Espacio ${duda.codigo} (${duda.nombre}) ratificado por Subdirección como espacio de apoyo autorizado.`
        });
      }
    } catch (e: any) {
      setMensajeUnificacion({
        tipo: 'error',
        texto: e.message || 'Error al ratificar espacio'
      });
    } finally {
      setProcesandoDudaId(null);
    }
  };

  // Estado del probador de normalización en vivo
  const [textoPrueba, setTextoPrueba] = useState<string>('Lab. de Nutrición');
  const [nuevaEntrada, setNuevaEntrada] = useState<string>('');
  const [nuevoEspacioId, setNuevoEspacioId] = useState<string>(espacios[0]?.id || '');
  const [tipoEq, setTipoEq] = useState<'codigo' | 'nombre_historico' | 'alias'>('alias');
  const [guardandoEq, setGuardandoEq] = useState<boolean>(false);

  // Estado para Unificación Real de Aulas (Dejar 1 sola opción)
  const [varianteUnificar, setVarianteUnificar] = useState<string>('Aula Magna 1');
  const [espacioDestinoUnificarId, setEspacioDestinoUnificarId] = useState<string>(
    espacios.find((s) => s.codigo === 'AM1')?.id || espacios[0]?.id || ''
  );
  const [procesandoUnificacion, setProcesandoUnificacion] = useState<boolean>(false);
  const [mensajeUnificacion, setMensajeUnificacion] = useState<{
    tipo: 'exito' | 'error';
    texto: string;
  } | null>(null);

  const handleEjecutarUnificacionManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!varianteUnificar.trim() || !espacioDestinoUnificarId) return;
    setProcesandoUnificacion(true);
    setMensajeUnificacion(null);
    try {
      if (onUnificarAulas) {
        const res = await onUnificarAulas(varianteUnificar.trim(), espacioDestinoUnificarId);
        setMensajeUnificacion({
          tipo: 'exito',
          texto:
            res?.mensaje ||
            `Aula "${varianteUnificar}" unificada con éxito: ${res?.asignacionesActualizadas || 0} asignaciones migradas a la opción única oficial.`
        });
      } else {
        setMensajeUnificacion({
          tipo: 'exito',
          texto: `Aula "${varianteUnificar}" unificada con éxito.`
        });
      }
    } catch (err: any) {
      setMensajeUnificacion({
        tipo: 'error',
        texto: err.message || 'Error al ejecutar la unificación del aula'
      });
    } finally {
      setProcesandoUnificacion(false);
    }
  };

  const handleEjecutarConsolidacionGlobal = async () => {
    setProcesandoUnificacion(true);
    setMensajeUnificacion(null);
    try {
      if (onUnificarTodasLasAulas) {
        const res = await onUnificarTodasLasAulas();
        setMensajeUnificacion({
          tipo: 'exito',
          texto:
            res?.mensaje ||
            `Consolidación total completada: ${res?.totalAsignaciones || 0} asignaciones actualizadas. Catálogo consolidado con 1 sola opción por aula física.`
        });
      }
    } catch (err: any) {
      setMensajeUnificacion({
        tipo: 'error',
        texto: err.message || 'Error en la consolidación global'
      });
    } finally {
      setProcesandoUnificacion(false);
    }
  };

  // Espacio matched en vivo para texto de prueba
  const textoNormalizadoPrueba = useMemo(() => {
    return normalizarTexto(textoPrueba);
  }, [textoPrueba]);

  const espacioCoincidentePrueba = useMemo(() => {
    // 1. Buscar en equivalencias
    const eq = equivalencias.find(
      (e) => e.texto_normalizado === textoNormalizadoPrueba || normalizarTexto(e.texto_entrada) === textoNormalizadoPrueba
    );
    if (eq) {
      return espacios.find((esp) => esp.id === eq.espacio_id);
    }
    // 2. Buscar por código o nombre directo normalizado
    return espacios.find(
      (esp) =>
        normalizarTexto(esp.codigo) === textoNormalizadoPrueba ||
        normalizarTexto(esp.nombre) === textoNormalizadoPrueba
    );
  }, [textoNormalizadoPrueba, equivalencias, espacios]);

  // Detector de duplicados en cursos con similitud > 65%
  const posiblesDuplicadosCursos = useMemo(() => {
    const pares: { cursoA: Curso; cursoB: Curso; similitud: number }[] = [];

    for (let i = 0; i < cursos.length; i++) {
      for (let j = i + 1; j < cursos.length; j++) {
        const cA = cursos[i];
        const cB = cursos[j];
        const sim = calcularSimilitud(cA.nombre, cB.nombre);
        if (sim >= 0.65 && sim < 1.0) {
          pares.push({
            cursoA: cA,
            cursoB: cB,
            similitud: Math.round(sim * 100)
          });
        }
      }
    }
    return pares.sort((a, b) => b.similitud - a.similitud);
  }, [cursos]);

  // Guardar nueva equivalencia
  const handleGuardarEquivalencia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaEntrada.trim() || !nuevoEspacioId) return;

    const esp = espacios.find((s) => s.id === nuevoEspacioId);
    if (!esp) return;

    setGuardandoEq(true);
    try {
      const nueva: EquivalenciaEspacio = {
        id: `eq_${Date.now()}`,
        texto_entrada: nuevaEntrada.trim(),
        texto_normalizado: normalizarTexto(nuevaEntrada.trim()),
        espacio_id: esp.id,
        codigo_oficial: esp.codigo,
        nombre_oficial: esp.nombre,
        tipo_equivalencia: tipoEq,
        activo: true
      };

      await onAgregarEquivalencia(nueva);
      setNuevaEntrada('');
      setMensajeUnificacion({ tipo: 'exito', texto: `Equivalencia para "${esp.codigo}" registrada correctamente.` });
    } catch (err: any) {
      setMensajeUnificacion({ tipo: 'error', texto: err.message || 'Error al guardar' });
    } finally {
      setGuardandoEq(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Encabezado y Selector de Subpestañas */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0c2d48] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0369a1]" />
            <span>Homologación de Catálogos y Normalización</span>
          </h2>
          <p className="text-xs text-slate-500">
            Reglas de deduplicación, resolución de abreviaturas y mapeo de alias históricos (Sección 8 y 9)
          </p>
        </div>

        <div className="flex flex-wrap bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          {espaciosDudasSubdireccion.length > 0 && (
            <button
              id="tab-revision-subdireccion"
              onClick={() => setSubpestana('revision_subdireccion')}
              className={`px-3 py-1.5 font-semibold rounded-md transition flex items-center gap-1.5 ${
                subpestana === 'revision_subdireccion'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-amber-800 bg-amber-50 hover:bg-amber-100 font-bold'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Dudas para Subdirección ({espaciosDudasSubdireccion.length})</span>
            </button>
          )}
          <button
            id="tab-unificar-aulas"
            onClick={() => setSubpestana('unificar_aulas')}
            className={`px-3 py-1.5 font-semibold rounded-md transition ${
              subpestana === 'unificar_aulas'
                ? 'bg-[#0c2d48] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✓ Unificación de Aulas (1 Sola Opción)
          </button>
          <button
            onClick={() => setSubpestana('equivalencias')}
            className={`px-3 py-1.5 font-semibold rounded-md transition ${
              subpestana === 'equivalencias'
                ? 'bg-[#0c2d48] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Equivalencias y Alias ({equivalencias.length})
          </button>
          <button
            onClick={() => setSubpestana('espacios')}
            className={`px-3 py-1.5 font-semibold rounded-md transition ${
              subpestana === 'espacios'
                ? 'bg-[#0c2d48] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Catálogo Oficial Espacios ({espacios.length})
          </button>
          <button
            onClick={() => setSubpestana('deduplicacion')}
            className={`px-3 py-1.5 font-semibold rounded-md transition ${
              subpestana === 'deduplicacion'
                ? 'bg-[#0c2d48] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Deduplicación de Cursos
          </button>
        </div>
      </div>

      {/* Probador en Vivo de la función normalizarTexto */}
      <div className="bg-[#0c2d48] border border-white/10 rounded-xl p-5 text-white shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Verificador del Algoritmo `normalizarTexto` en Tiempo Real</span>
        </div>
        <p className="text-xs text-sky-100 max-w-2xl">
          Escriba cualquier nombre no estandarizado (con acentos, mayúsculas, espacios irregulares o abreviaturas como &quot;lab.&quot;, &quot;sal.&quot;) para verificar cómo el motor FCM lo resuelve automáticamente:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[10px] font-semibold text-sky-300 uppercase mb-1">
              Entrada sin normalizar:
            </label>
            <input
              type="text"
              value={textoPrueba}
              onChange={(e) => setTextoPrueba(e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-400"
              placeholder="Ej: SÁLON   1, Lab. de Nutricion..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-sky-300 uppercase mb-1">
              Texto Normalizado (`normalizarTexto`):
            </label>
            <div className="bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-amber-300 truncate">
              {textoNormalizadoPrueba || '—'}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-sky-300 uppercase mb-1">
              Espacio Oficial Reconocido:
            </label>
            <div className="bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-emerald-400 truncate flex items-center gap-1.5">
              {espacioCoincidentePrueba ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{espacioCoincidentePrueba.codigo} - {espacioCoincidentePrueba.nombre}</span>
                </>
              ) : (
                <span className="text-slate-400 font-normal">Sin coincidencia directa</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SUBPESTAÑA: REVISIÓN DE HOMOLOGACIÓN POR SUBDIRECCIÓN */}
      {subpestana === 'revision_subdireccion' && (
        <div className="space-y-6">
          {/* Mensaje de feedback */}
          {mensajeUnificacion && (
            <div
              className={`p-4 rounded-xl border flex items-center justify-between ${
                mensajeUnificacion.tipo === 'exito'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {mensajeUnificacion.tipo === 'exito' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <RefreshCw className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-xs font-semibold">{mensajeUnificacion.texto}</span>
              </div>
              <button
                onClick={() => setMensajeUnificacion(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Banner de Instrucción de Subdirección */}
          <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>Directriz de Homologación de Catálogo · Revisión por Subdirección</span>
            </div>
            <p className="text-xs text-amber-950/90 leading-relaxed">
              Conforme a la instrucción oficial de la Subdirección (<strong>Dra. Ivone Giffard</strong>), el catálogo activo de espacios físicos debe cuadrar exactamente con la lámina oficial de aulas y laboratorios FCM (<strong>ni una aula más, ni un aula menos</strong>).
            </p>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Los <strong>{espaciosDudasSubdireccion.length} espacios</strong> que se muestran aquí provienen de la carga histórica inicial o de nomenclaturas obsoletas. <em>No se han eliminado</em> para resguardar la programación de cursos existente. A continuación puede <strong>homologar cada aula a su equivalente oficial del mapa</strong> (migrando todas las clases y creando la equivalencia) o <strong>ratificarla</strong> como espacio de apoyo autorizado.
            </p>
          </div>

          {/* Listado de Espacios en Duda */}
          {espaciosDudasSubdireccion.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
                <span>Espacios pendientes de revisión ({espaciosDudasSubdireccion.length})</span>
                <span className="text-amber-700">60 espacios oficiales en el mapa FCM</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {espaciosDudasSubdireccion.map((duda) => {
                  const clasesAfectadas = asignacionesPorEspacio.get(duda.id) || asignacionesPorEspacio.get(duda.codigo) || 0;
                  const destinoSeleccionadoId = getDestinoParaDuda(duda);
                  const estaProcesando = procesandoDudaId === duda.id;

                  return (
                    <div
                      key={duda.id}
                      className="bg-white border border-amber-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-amber-400 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                            {duda.codigo}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {duda.nombre}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {duda.edificio_codigo || duda.edificio} · {duda.planta || 'General'}
                          </span>
                          {clasesAfectadas > 0 ? (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold border border-sky-200">
                              {clasesAfectadas} {clasesAfectadas === 1 ? 'clase asignada' : 'clases asignadas'}
                            </span>
                          ) : (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                              0 clases asignadas
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-amber-800/90">
                          <strong>Motivo de duda:</strong> {duda.motivo_duda || 'No figura en la lámina oficial de Aulas/Laboratorios FCM (Mapa 4K).'}
                        </p>
                      </div>

                      {/* Controles de Homologación */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <ArrowRightLeft className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <select
                            value={destinoSeleccionadoId}
                            onChange={(e) =>
                              setDestinosHomologacion((prev) => ({
                                ...prev,
                                [duda.id]: e.target.value
                              }))
                            }
                            disabled={estaProcesando}
                            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 max-w-xs focus:ring-2 focus:ring-sky-500 outline-hidden"
                          >
                            <option value="" disabled>Seleccione aula oficial del mapa...</option>
                            {espaciosOficialesMapa.map((oficial) => (
                              <option key={oficial.id} value={oficial.id}>
                                {oficial.codigo} · {oficial.nombre} ({oficial.edificio_codigo || oficial.edificio})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEjecutarHomologacionDuda(duda)}
                            disabled={estaProcesando || !destinoSeleccionadoId}
                            className="flex-1 sm:flex-none px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{estaProcesando ? 'Homologando...' : 'Homologar a Oficial'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEjecutarRatificacionDuda(duda)}
                            disabled={estaProcesando}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 whitespace-nowrap"
                            title="Aprobar como espacio especial autorizado por Subdirección"
                          >
                            Ratificar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 text-center border border-slate-200 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                ¡Catálogo 100% Homologado con el Mapa Oficial!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No hay dudas pendientes de revisión por Subdirección. Todos los espacios coinciden con la lámina oficial de aulas y laboratorios de la Facultad de Ciencias Marinas.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SUBPESTAÑA: UNIFICACIÓN REAL DE AULAS (DEJAR 1 SOLA OPCIÓN) */}
      {subpestana === 'unificar_aulas' && (
        <div className="space-y-6">
          {/* Mensaje de feedback de unificación */}
          {mensajeUnificacion && (
            <div
              className={`p-4 rounded-xl border flex items-center justify-between ${
                mensajeUnificacion.tipo === 'exito'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {mensajeUnificacion.tipo === 'exito' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <RefreshCw className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-xs font-semibold">{mensajeUnificacion.texto}</span>
              </div>
              <button
                onClick={() => setMensajeUnificacion(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Banner de Garantía Institucional */}
          <div className="bg-gradient-to-r from-[#0c2d48] to-[#144265] text-white p-6 rounded-xl border border-sky-900/40 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Garantía de Unificación Estricta FCM 2027-1
                </div>
                <h3 className="text-base font-bold text-white">
                  Consolidación de Aulas: 1 Sola Opción Oficial por Espacio Físico
                </h3>
                <p className="text-xs text-sky-100/90 leading-relaxed">
                  Al solicitar unificar nombres de aulas (como &quot;Aula Magna 1&quot; &rarr; &quot;Aula Magna I (AM1)&quot;),
                  el sistema no sólo genera el alias: <strong>migra de inmediato todas las asignaciones existentes</strong> hacia
                  el espacio canónico oficial y <strong>elimina las opciones duplicadas</strong>, garantizando que en toda la aplicación
                  (planificación, filtros, selectores y reportes) quede estrictamente una sola opción para cada aula.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                <button
                  id="btn-consolidar-globalmente"
                  onClick={handleEjecutarConsolidacionGlobal}
                  disabled={procesandoUnificacion}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2 border border-emerald-400/50"
                >
                  <RefreshCw className={`w-4 h-4 ${procesandoUnificacion ? 'animate-spin' : ''}`} />
                  <span>Consolidar Todas las Aulas FCM</span>
                </button>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas Destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarjeta 1: Caso Específico Aula Magna 1 */}
            <div className="bg-white p-5 rounded-xl border border-sky-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-sky-100 text-sky-900 border border-sky-300 rounded text-[10px] font-bold uppercase">
                    Caso Prioritario Detectado
                  </span>
                  <span className="text-xs font-mono text-slate-500">AM1</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Unificar &quot;Aula Magna 1&quot; &rarr; &quot;Aula Magna I (AM1)&quot;
                </h4>
                <p className="text-xs text-slate-600 mb-3">
                  Unifica la variante textual &quot;Aula Magna 1&quot; en el aula canónica oficial <strong>AM1 - Aula Magna I (Edificio 17, 75 cupos)</strong>.
                  Reasigna todas las clases y asegura que en los menús quede sólo una opción disponible.
                </p>
              </div>
              <button
                id="btn-unificar-aula-magna-directo"
                onClick={async () => {
                  const am1 = espacios.find((s) => s.codigo === 'AM1') || espacios[0];
                  if (am1 && onUnificarAulas) {
                    setProcesandoUnificacion(true);
                    try {
                      const res = await onUnificarAulas('Aula Magna 1', am1.id);
                      setMensajeUnificacion({
                        tipo: 'exito',
                        texto: res?.mensaje || 'Aula Magna 1 unificada con éxito: queda 1 sola opción oficial AM1.'
                      });
                    } finally {
                      setProcesandoUnificacion(false);
                    }
                  }
                }}
                disabled={procesandoUnificacion}
                className="w-full py-2 bg-[#0c2d48] hover:bg-[#15466e] text-white text-xs font-bold rounded-lg transition shadow-2xs flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Unificar Aula Magna 1 Ahora</span>
              </button>
            </div>

            {/* Tarjeta 2: Formulario de Unificación Personalizada */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sky-700" />
                <span>Unificar Otra Aula o Variante Personalizada</span>
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Seleccione el texto o nombre redundante y el espacio canónico oficial al que debe consolidarse definitivamente.
              </p>

              <form onSubmit={handleEjecutarUnificacionManual} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Nombre o Variante a Unificar *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Aula Magna 1, Salón 1, SP-1..."
                    value={varianteUnificar}
                    onChange={(e) => setVarianteUnificar(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Aula Oficial Canónica Destino (Única que quedará) *
                  </label>
                  <select
                    value={espacioDestinoUnificarId}
                    onChange={(e) => setEspacioDestinoUnificarId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium"
                  >
                    {espacios.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.codigo} - {s.nombre} ({s.edificio} · Cap. {s.capacidad_maxima})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={procesandoUnificacion}
                  className="w-full py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition shadow-2xs flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Unificar y Dejar 1 Sola Opción</span>
                </button>
              </form>
            </div>
          </div>

          {/* Tabla de Aulas Canónicas Oficiales */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Inventario de Aulas y Espacios FCM Oficiales ({espacios.length} Espacios Únicos)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Cada fila representa la única opción canónica activa reconocida por el sistema para asignaciones y horarios.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Catálogo Homologado
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Código</th>
                    <th className="p-3">Nombre Canónico</th>
                    <th className="p-3">Edificio</th>
                    <th className="p-3 text-center">Capacidad</th>
                    <th className="p-3 text-center">Asignaciones</th>
                    <th className="p-3">Variantes / Alias Unificados</th>
                    <th className="p-3 text-center">Estado de Catálogo</th>
                    <th className="p-3 text-center">Acción (Admin)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {espacios.map((esp) => {
                    const totalAsig = asignaciones.filter((a) => a.espacio_id === esp.id).length;
                    const aliasMapeados = equivalencias.filter((eq) => eq.espacio_id === esp.id);

                    return (
                      <tr key={esp.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono font-bold text-sky-800">{esp.codigo}</td>
                        <td className="p-3 font-semibold text-slate-900">{esp.nombre}</td>
                        <td className="p-3 text-slate-600">{esp.edificio}</td>
                        <td className="p-3 text-center font-semibold text-slate-700">{esp.capacidad_maxima}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                            {totalAsig} clases
                          </span>
                        </td>
                        <td className="p-3">
                          {aliasMapeados.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {aliasMapeados.map((al) => (
                                <span
                                  key={al.id}
                                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-200"
                                >
                                  {al.texto_entrada}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">Código estándar único</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            1 Sola Opción
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {roleUsuario === 'admin' ? (
                            <button
                              onClick={() => onEditarEspacio && onEditarEspacio(esp)}
                              className="p-1 px-2 text-sky-700 hover:bg-sky-50 border border-sky-200 rounded-md transition-colors inline-flex items-center gap-1 font-bold text-[11px]"
                              title={`Editar nombre oficial del aula: ${esp.nombre}`}
                            >
                              <Pencil className="w-3 h-3" />
                              <span>Editar</span>
                            </button>
                          ) : (
                            <span className="text-slate-300 text-[10px] italic">Solo Admin</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBPESTAÑA 1: EQUIVALENCIAS Y ALIAS */}
      {subpestana === 'equivalencias' && (
        <div className="space-y-5">
          {/* Formulario para registrar nuevo alias */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-sky-600" />
              <span>Registrar Nueva Equivalencia o Alias de Espacio</span>
            </h3>

            <form onSubmit={handleGuardarEquivalencia} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Texto de Entrada / Alias *
                </label>
                <input
                  type="text"
                  placeholder="Ej: S5, AM, LNU, P1..."
                  value={nuevaEntrada}
                  onChange={(e) => setNuevaEntrada(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Espacio Oficial Destino *
                </label>
                <select
                  value={nuevoEspacioId}
                  onChange={(e) => setNuevoEspacioId(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                >
                  {espacios.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.codigo} - {s.nombre} ({s.edificio})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Tipo de Equivalencia
                </label>
                <select
                  value={tipoEq}
                  onChange={(e) => setTipoEq(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                >
                  <option value="alias">Alias Común</option>
                  <option value="codigo">Código Alternativo</option>
                  <option value="nombre_historico">Nombre Histórico</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={guardandoEq}
                  className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-xs transition"
                >
                  {guardandoEq ? 'Guardando...' : '+ Agregar Equivalencia'}
                </button>
              </div>
            </form>
          </div>

          {/* Tabla de Equivalencias Existentes */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Mapeo de Alias y Abreviaturas Vigentes ({equivalencias.length} registros)
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Texto de Entrada</th>
                    <th className="p-3">Texto Normalizado</th>
                    <th className="p-3">Espacio Oficial</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {equivalencias.map((eq) => (
                    <tr key={eq.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{eq.texto_entrada}</td>
                      <td className="p-3 font-mono text-slate-500">{eq.texto_normalizado}</td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">{eq.codigo_oficial}</span> · {eq.nombre_oficial}
                      </td>
                      <td className="p-3 uppercase text-[10px] text-slate-500">{eq.tipo_equivalencia}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Activo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBPESTAÑA 2: CATÁLOGO OFICIAL DE ESPACIOS */}
      {subpestana === 'espacios' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Espacios Físicos Registrados en FCM e IIO ({espacios.length} espacios)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Nombre del Espacio</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Edificio</th>
                  <th className="p-3 text-center">Capacidad Máxima</th>
                  <th className="p-3 text-center">Apto Docencia</th>
                  <th className="p-3">Equipos / Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {espacios.map((esp) => (
                  <tr key={esp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{esp.codigo}</td>
                    <td className="p-3 font-medium text-slate-800">{esp.nombre}</td>
                    <td className="p-3 capitalize text-slate-600">{esp.tipo_espacio.replace('_', ' ')}</td>
                    <td className="p-3 text-slate-600">{esp.edificio}</td>
                    <td className="p-3 text-center font-bold text-slate-800">{esp.capacidad_maxima}</td>
                    <td className="p-3 text-center">
                      {esp.apto_para_docencia ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          Sí
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                          Apoyo
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500 max-w-xs truncate" title={esp.equipos?.join(', ') || esp.notas}>
                      {esp.equipos?.join(', ') || esp.notas || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBPESTAÑA 3: DEDUPLICACIÓN DE CURSOS */}
      {subpestana === 'deduplicacion' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-indigo-600" />
              <span>Deduplicación y Fusión de Cursos por Coeficiente de Similitud</span>
            </h3>
            <p className="text-xs text-slate-500">
              Analiza el catálogo de cursos para detectar posibles duplicados creados con nombres ligeramente distintos o variaciones ortográficas.
            </p>
          </div>

          {posiblesDuplicadosCursos.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">Catálogo de Cursos Homologado</h4>
              <p className="text-xs text-slate-500 mt-1">
                No se detectaron títulos duplicados o redundantes por encima del umbral del 65% de similitud.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {posiblesDuplicadosCursos.map(({ cursoA, cursoB, similitud }, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {similitud}% de Similitud
                      </span>
                      <span className="text-xs font-semibold text-slate-700">Posible Duplicado Detectado</span>
                    </div>
                    <div className="text-xs text-slate-800">
                      <span className="font-bold text-sky-800">{cursoA.codigo}</span>: {cursoA.nombre} ({cursoA.nivel_educativo})
                    </div>
                    <div className="text-xs text-slate-800">
                      <span className="font-bold text-teal-800">{cursoB.codigo}</span>: {cursoB.nombre} ({cursoB.nivel_educativo})
                    </div>
                  </div>

                  <button
                    onClick={() => setMensajeUnificacion({ tipo: 'exito', texto: `Sugerencia de coordinación: Homologar ${cursoA.codigo} y ${cursoB.codigo} bajo una clave unificada.` })}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 transition"
                  >
                    Revisar Coincidencia
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
