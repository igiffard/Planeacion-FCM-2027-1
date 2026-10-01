/**
 * Vista de Importación y Exportación de Horarios FCM 2027-1
 * Sección 13 de las especificaciones (CSV con BOM, PDF institucional y JSON)
 */

import React, { useState, useMemo, useRef } from 'react';
import {
  FileSpreadsheet,
  Download,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Layers,
  Sparkles,
  Info,
  Database,
  RotateCcw
} from 'lucide-react';
import {
  Asignacion,
  Curso,
  Espacio,
  Usuario,
  ProgramaEducativo,
  Escenario,
  DiaSemana
} from '../types';
import {
  exportarAsignacionesCSV,
  exportarHorarioPDF,
  parsearCSV
} from '../utils/exportImport';
import { normalizarTexto } from '../utils/normalization';
import { ModalReportePDFSubdireccion } from './ModalReportePDFSubdireccion';

interface ImportExportViewProps {
  asignaciones: Asignacion[];
  cursos: Curso[];
  espacios: Espacio[];
  docentes: Usuario[];
  programas: ProgramaEducativo[];
  escenarioActivo: Escenario | undefined;
  periodoActivoId: string;
  onImportarAsignaciones: (nuevas: Asignacion[]) => Promise<void>;
  onExportarJSON?: () => void;
  onImportarJSON?: (jsonStr: string) => void;
  onRestablecerDatos?: () => void;
}

export const ImportExportView: React.FC<ImportExportViewProps> = ({
  asignaciones,
  cursos,
  espacios,
  docentes,
  programas,
  escenarioActivo,
  periodoActivoId,
  onImportarAsignaciones,
  onExportarJSON,
  onImportarJSON,
  onRestablecerDatos
}) => {
  const [tipoExportacion, setTipoExportacion] = useState<string>('todos');
  const [filtroProgramaId, setFiltroProgramaId] = useState<string>('todos');
  const [filtroDocenteId, setFiltroDocenteId] = useState<string>('todos');
  const [filtroEspacioId, setFiltroEspacioId] = useState<string>('todos');
  const [mostrarModalPDF, setMostrarModalPDF] = useState<boolean>(false);

  // Estado de Importación CSV
  const [contenidoCSV, setContenidoCSV] = useState<string>('');
  const [filasParseadas, setFilasParseadas] = useState<{ encabezados: string[]; filas: string[][] }>({
    encabezados: [],
    filas: []
  });
  const [analisisImportacion, setAnalisisImportacion] = useState<{
    total: number;
    validas: number;
    conflictosOInconsistencias: number;
  } | null>(null);
  const [importando, setImportando] = useState<boolean>(false);
  const [mensajeImportacion, setMensajeImportacion] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);
  const espaciosMap = useMemo(() => new Map(espacios.map((e) => [e.id, e])), [espacios]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);
  const programasMap = useMemo(() => new Map(programas.map((p) => [p.id, p])), [programas]);

  // Filtrar asignaciones según los selectores de exportación
  const asignacionesParaExportar = useMemo(() => {
    return asignaciones.filter((asig) => {
      if (asig.escenario_id !== escenarioActivo?.id) return false;
      if (filtroProgramaId !== 'todos' && !asig.programas_ids?.includes(filtroProgramaId)) return false;
      if (filtroDocenteId !== 'todos' && !asig.profesores_ids?.includes(filtroDocenteId)) return false;
      if (filtroEspacioId !== 'todos' && asig.espacio_id !== filtroEspacioId) return false;
      return true;
    });
  }, [asignaciones, escenarioActivo, filtroProgramaId, filtroDocenteId, filtroEspacioId]);

  // Exportar CSV oficial con BOM
  const handleDescargarCSV = () => {
    const nombreArchivo = `horario_fcm_2027_1_${escenarioActivo?.id || 'oficial'}.csv`;
    exportarAsignacionesCSV(
      asignacionesParaExportar,
      cursosMap,
      espaciosMap,
      docentesMap,
      programasMap,
      nombreArchivo
    );
  };

  // Exportar PDF institucional con membrete UABC - FCM
  const handleDescargarPDF = () => {
    let titulo = 'Horario General de Clases 2027-1';
    let subtitulo = `Periodo 2027-1 | Escenario: ${escenarioActivo?.nombre || 'Oficial'} | FCM - UABC`;

    if (filtroDocenteId !== 'todos') {
      const doc = docentesMap.get(filtroDocenteId);
      titulo = `Horario Docente: ${doc?.nombre || 'Docente'}`;
    } else if (filtroEspacioId !== 'todos') {
      const esp = espaciosMap.get(filtroEspacioId);
      titulo = `Ocupación de Espacio: ${esp?.codigo} - ${esp?.nombre}`;
    } else if (filtroProgramaId !== 'todos') {
      const prog = programasMap.get(filtroProgramaId);
      titulo = `Horario Académico: ${prog?.nombre}`;
    }

    const nombreArchivo = `horario_fcm_2027_1_${Date.now()}.pdf`;

    exportarHorarioPDF(
      titulo,
      subtitulo,
      asignacionesParaExportar,
      cursosMap,
      espaciosMap,
      docentesMap,
      nombreArchivo
    );
  };

  // Manejar selección de archivo CSV
  const handleSeleccionarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const texto = event.target?.result as string;
      setContenidoCSV(texto);
      procesarTextoCSV(texto);
    };
    reader.readAsText(file);
  };

  // Procesar y previsualizar CSV
  const procesarTextoCSV = (texto: string) => {
    const { encabezados, filas } = parsearCSV(texto);
    setFilasParseadas({ encabezados, filas });

    let validas = 0;
    let inconsistencias = 0;

    filas.forEach((f) => {
      if (f.length >= 5) validas++;
      else inconsistencias++;
    });

    setAnalisisImportacion({
      total: filas.length,
      validas,
      conflictosOInconsistencias: inconsistencias
    });
  };

  // Confirmar e importar filas analizadas
  const handleConfirmarImportacion = async () => {
    if (filasParseadas.filas.length === 0) return;
    setImportando(true);
    setMensajeImportacion(null);

    try {
      const nuevasAsignaciones: Asignacion[] = [];

      for (let i = 0; i < filasParseadas.filas.length; i++) {
        const f = filasParseadas.filas[i];
        if (f.length < 5) continue;

        // Mapeo flexible de columnas
        const diaEntrada = (f[8] || 'lunes').toLowerCase().trim() as DiaSemana;
        const horaIni = f[9] || '08:00';
        const horaFn = f[10] || '10:00';
        const espCodigo = f[11] || 'S1';
        const cursoCodigo = f[4] || 'TC101';

        // Buscar espacio por código o nombre
        const espacio =
          espacios.find((e) => normalizarTexto(e.codigo) === normalizarTexto(espCodigo)) ||
          espacios[0];
        const curso =
          cursos.find((c) => normalizarTexto(c.codigo) === normalizarTexto(cursoCodigo)) ||
          cursos[0];

        if (espacio && curso) {
          nuevasAsignaciones.push({
            id: `asig_imp_${Date.now()}_${i}`,
            periodo_id: periodoActivoId,
            escenario_id: escenarioActivo?.id || 'oficial',
            curso_id: curso.id,
            grupo_principal_id: f[6] || '111',
            componente_grupo_id: `comp_${Date.now()}_${i}`,
            subgrupo_id: f[7] || undefined,
            nivel_programacion: f[7] ? 'subgrupo' : 'grupo_principal',
            profesores_ids: [docentes[0]?.uid || 'prof_giffard'],
            profesor_principal_id: docentes[0]?.uid || 'prof_giffard',
            programas_ids: curso.programas_ids,
            nivel_educativo: curso.nivel_educativo,
            espacio_id: espacio.id,
            espacio_codigo_snapshot: espacio.codigo,
            espacio_nombre_snapshot: espacio.nombre,
            dia: diaEntrada,
            hora_inicio: horaIni,
            hora_fin: horaFn,
            tipo_componente: curso.tipo_actividad,
            tipo_sesion: 'Importado',
            alumnos_programados: parseInt(f[14], 10) || 30,
            capacidad_espacio: espacio.capacidad_maxima,
            estatus: 'confirmado',
            conflictos_detectados: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      }

      await onImportarAsignaciones(nuevasAsignaciones);
      setMensajeImportacion(`Se importaron con éxito ${nuevasAsignaciones.length} asignaciones al escenario ${escenarioActivo?.nombre}.`);
      setFilasParseadas({ encabezados: [], filas: [] });
      setContenidoCSV('');
      setAnalisisImportacion(null);
    } catch (err: any) {
      setMensajeImportacion(`⚠️ ${err.message || 'Error durante la importación'}`);
    } finally {
      setImportando(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sección 0: Respaldo y Portabilidad de Base de Datos Local */}
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50/50 rounded-xl p-6 border border-sky-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-700" />
              <h2 className="text-base font-bold text-[#0c2d48]">
                Respaldo y Portabilidad de Horarios FCM 2027-1 (JSON)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Almacenamiento Local Activo
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Permite respaldar todos los cambios de horarios, aulas, asignaturas y profesores en un solo archivo JSON descargable, restaurarlo en cualquier equipo o restablecer a la propuesta oficial 2027-1.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onExportarJSON && (
              <button
                type="button"
                onClick={onExportarJSON}
                className="flex items-center gap-2 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-md shadow-2xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Respaldo (.JSON)</span>
              </button>
            )}

            {onImportarJSON && (
              <label className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs rounded-md shadow-2xs transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-sky-600" />
                <span>Restaurar (.JSON)</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        const content = evt.target?.result as string;
                        if (content && onImportarJSON) {
                          onImportarJSON(content);
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </label>
            )}

            {onRestablecerDatos && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('¿Desea restablecer a la base oficial de Posgrado 2027-1? Esto cargará los horarios oficiales de Posgrado y dejará Licenciatura en blanco y lista para captura.')) {
                    onRestablecerDatos();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-md transition-colors"
                title="Restablecer a la base oficial de Posgrado 2027-1 (Licenciatura lista para captura)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer Posgrado Oficial</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sección 1: Exportación Oficial de Horarios */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#0c2d48] flex items-center gap-2">
              <Download className="w-5 h-5 text-[#0369a1]" />
              <span>Exportar Horarios Oficiales (CSV y PDF Institucional)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Generación de archivos para difusión estudiantil, gaceta o planeación docente
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              id="btn-descargar-csv"
              onClick={handleDescargarCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-xs rounded-md shadow-2xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Descargar CSV (Excel UTF-8)</span>
            </button>

            <button
              id="btn-reporte-pdf-subdireccion-view"
              onClick={() => setMostrarModalPDF(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-md shadow-2xs transition-colors"
              title="Generar dictamen consolidado para Subdirección con balance de carga y uso de aulas"
            >
              <FileDown className="w-4 h-4 text-amber-300" />
              <span>Reporte Subdirección (PDF Offline)</span>
            </button>

            <button
              id="btn-descargar-pdf"
              onClick={handleDescargarPDF}
              className="flex items-center gap-2 px-4 py-2 bg-[#0c2d48] hover:bg-[#1a4b70] text-white font-bold text-xs rounded-md shadow-2xs transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>PDF Horario Filtrado</span>
            </button>
          </div>
        </div>

        {/* Filtros de Exportación */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Filtrar por Programa Educativo:
            </label>
            <select
              value={filtroProgramaId}
              onChange={(e) => setFiltroProgramaId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="todos">Todos los programas (FCM Completa)</option>
              {programas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Filtrar por Docente:
            </label>
            <select
              value={filtroDocenteId}
              onChange={(e) => setFiltroDocenteId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="todos">Todos los profesores</option>
              {docentes.map((d) => (
                <option key={d.uid} value={d.uid}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Filtrar por Espacio / Aula:
            </label>
            <select
              value={filtroEspacioId}
              onChange={(e) => setFiltroEspacioId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
            >
              <option value="todos">Todos los espacios (FCM + IIO)</option>
              {espacios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.codigo} - {s.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 pt-1">
          Sesiones listas para exportar:{' '}
          <span className="font-bold text-slate-800">{asignacionesParaExportar.length}</span> en escenario{' '}
          <span className="font-semibold text-slate-800">{escenarioActivo?.nombre}</span>.
        </div>
      </div>

      {/* Sección 2: Importación Masiva de CSV */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-teal-600" />
            <span>Importación Masiva de Asignaciones (CSV)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Cargue archivos generados en ciclos previos para migrarlos al periodo 2027-1 con verificación de conflictos
          </p>
        </div>

        {mensajeImportacion && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-medium text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{mensajeImportacion}</span>
          </div>
        )}

        {/* Zona Drag & Drop o selección */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-6 text-center cursor-pointer bg-slate-50/60 transition"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleSeleccionarArchivo}
            className="hidden"
          />
          <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-800">
            Haga clic para seleccionar archivo CSV o arrástrelo aquí
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Formato UTF-8 con columnas: Periodo, Escenario, Nivel, Programa, Clave, Nombre, Grupo, Día, Horas, Espacio...
          </p>
        </div>

        {/* O pegar texto directamente */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            O pegue el contenido CSV directamente:
          </label>
          <textarea
            rows={3}
            placeholder="Periodo,Escenario,Nivel,Programa,Clave,Nombre,Grupo,Subgrupo,Día,Inicio,Fin,Espacio..."
            value={contenidoCSV}
            onChange={(e) => {
              setContenidoCSV(e.target.value);
              procesarTextoCSV(e.target.value);
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-mono text-slate-800"
          />
        </div>

        {/* Previsualización de Datos Importados */}
        {analisisImportacion && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">
                Resumen de validación:{' '}
                <span className="text-emerald-700 font-bold">{analisisImportacion.validas} válidas</span> de {analisisImportacion.total} filas.
              </span>

              <button
                id="btn-confirmar-importacion"
                onClick={handleConfirmarImportacion}
                disabled={importando || analisisImportacion.validas === 0}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg shadow-xs transition"
              >
                {importando ? 'Procesando...' : `Confirmar e Importar ${analisisImportacion.validas} Asignaciones`}
              </button>
            </div>

            {/* Tabla con primeros 5 registros de muestra */}
            <div className="border border-slate-200 rounded-lg overflow-x-auto text-[11px]">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    {filasParseadas.encabezados.slice(0, 8).map((h, i) => (
                      <th key={i} className="p-2 border-b">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filasParseadas.filas.slice(0, 5).map((f, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      {f.slice(0, 8).map((celda, cIdx) => (
                        <td key={cIdx} className="p-2 truncate max-w-[120px]">
                          {celda}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Modal Reporte PDF para Subdirección */}
      <ModalReportePDFSubdireccion
        isOpen={mostrarModalPDF}
        onClose={() => setMostrarModalPDF(false)}
        asignaciones={asignaciones.filter((a) => a.escenario_id === escenarioActivo?.id)}
        cursos={cursos}
        espacios={espacios}
        docentes={docentes}
        programas={programas}
        escenarioActivoNombre={escenarioActivo?.nombre || 'Propuesta Oficial'}
        periodoId={periodoActivoId || '2027-1'}
      />
    </div>
  );
};
