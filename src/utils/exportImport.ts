/**
 * Utilidades de Importación y Exportación de Horarios
 * CSV y PDF (jsPDF + autoTable) para la Facultad de Ciencias Marinas (FCM)
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Asignacion, Espacio, Curso, Usuario, ProgramaEducativo } from '../types';

/**
 * Genera un archivo CSV con BOM para compatibilidad perfecta con Microsoft Excel
 */
export function exportarAsignacionesCSV(
  asignaciones: Asignacion[],
  cursosMap: Map<string, Curso>,
  espaciosMap: Map<string, Espacio>,
  docentesMap: Map<string, Usuario>,
  programasMap: Map<string, ProgramaEducativo>,
  nombreArchivo = 'horarios_fcm_2027_1.csv'
): void {
  const encabezados = [
    'Periodo',
    'Escenario',
    'Nivel Educativo',
    'Programa(s)',
    'Clave Curso',
    'Nombre Curso',
    'Grupo',
    'Subgrupo / Sesión',
    'Día',
    'Hora Inicio',
    'Hora Fin',
    'Código Espacio',
    'Nombre Espacio',
    'Profesor(es)',
    'Alumnos Programados',
    'Capacidad Espacio',
    'Estatus'
  ];

  const filas = asignaciones.map((asig) => {
    const curso = cursosMap.get(asig.curso_id);
    const espacio = espaciosMap.get(asig.espacio_id);
    const nombresDocentes = asig.profesores_ids
      .map((id) => docentesMap.get(id)?.nombre || id)
      .join('; ');
    const programas = asig.programas_ids
      .map((id) => programasMap.get(id)?.nombre || id)
      .join('; ');

    return [
      asig.periodo_id,
      asig.escenario_id,
      asig.nivel_educativo,
      `"${programas.replace(/"/g, '""')}"`,
      curso?.codigo || '',
      `"${(curso?.nombre || '').replace(/"/g, '""')}"`,
      asig.grupo_principal_id,
      asig.subgrupo_id || asig.tipo_sesion || 'Grupo completo',
      asig.dia,
      asig.hora_inicio,
      asig.hora_fin,
      espacio?.codigo || asig.espacio_codigo_snapshot || '',
      `"${(espacio?.nombre || asig.espacio_nombre_snapshot || '').replace(/"/g, '""')}"`,
      `"${nombresDocentes.replace(/"/g, '""')}"`,
      asig.alumnos_programados,
      asig.capacidad_espacio,
      asig.estatus
    ].join(',');
  });

  // Agregar UTF-8 BOM (\uFEFF)
  const csvContent = '\uFEFF' + [encabezados.join(','), ...filas].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', nombreArchivo);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Genera PDF institucional de horarios oficiales o de un docente/espacio/programa
 */
export function exportarHorarioPDF(
  titulo: string,
  subtitulo: string,
  asignaciones: Asignacion[],
  cursosMap: Map<string, Curso>,
  espaciosMap: Map<string, Espacio>,
  docentesMap: Map<string, Usuario>,
  nombreArchivo = 'horario_fcm_2027_1.pdf'
): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Encabezado institucional UABC - FCM
  doc.setFillColor(15, 45, 74); // Azul marino profundo FCM (#0f2d4a)
  doc.rect(0, 0, 297, 26, 'F');

  // Franja dorada decorativa
  doc.setFillColor(217, 119, 6); // Ámbar / Dorado UABC
  doc.rect(0, 26, 297, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('UNIVERSIDAD AUTÓNOMA DE BAJA CALIFORNIA', 14, 10);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('FACULTAD DE CIENCIAS MARINAS  |  PLANEACIÓN ACADÉMICA 2027-1', 14, 16);
  doc.text(`Generado: ${new Date().toLocaleDateString('es-MX')} ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`, 220, 16);

  // Título del reporte
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(titulo, 14, 36);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(subtitulo, 14, 42);

  // Mapear días a orden estándar
  const ordenDias: Record<string, number> = {
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6
  };

  const asignacionesOrdenadas = [...asignaciones].sort((a, b) => {
    const diaA = ordenDias[a.dia] || 7;
    const diaB = ordenDias[b.dia] || 7;
    if (diaA !== diaB) return diaA - diaB;
    return a.hora_inicio.localeCompare(b.hora_inicio);
  });

  const filasTabla = asignacionesOrdenadas.map((asig) => {
    const curso = cursosMap.get(asig.curso_id);
    const espacio = espaciosMap.get(asig.espacio_id);
    const profesores = asig.profesores_ids
      .map((id) => docentesMap.get(id)?.nombre || id)
      .join(', ');

    return [
      asig.dia.toUpperCase().slice(0, 3),
      `${asig.hora_inicio} - ${asig.hora_fin}`,
      `${curso?.codigo || ''} ${curso?.nombre || 'Curso'}`,
      asig.subgrupo_id ? `Subg. ${asig.subgrupo_id}` : asig.grupo_principal_id,
      `${espacio?.codigo || asig.espacio_codigo_snapshot || ''} - ${espacio?.nombre || asig.espacio_nombre_snapshot || ''}`,
      profesores,
      `${asig.alumnos_programados} / ${asig.capacidad_espacio}`,
      asig.nivel_educativo.toUpperCase()
    ];
  });

  autoTable(doc, {
    startY: 46,
    head: [
      [
        'Día',
        'Horario',
        'Asignatura / Curso',
        'Grupo / Subg.',
        'Espacio / Aula / Lab.',
        'Docente(s)',
        'Cupo / Cap.',
        'Nivel'
      ]
    ],
    body: filasTabla,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 45, 74],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left'
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 15, fontStyle: 'bold' },
      1: { cellWidth: 26 },
      2: { cellWidth: 60 },
      3: { cellWidth: 28 },
      4: { cellWidth: 50 },
      5: { cellWidth: 60 },
      6: { cellWidth: 24, halign: 'center' },
      7: { cellWidth: 20, halign: 'center' }
    }
  });

  doc.save(nombreArchivo);
}

/**
 * Parsea archivo CSV en texto plano a registros de asignación/curso
 */
export function parsearCSV(contenido: string): { encabezados: string[]; filas: string[][] } {
  const lineas = contenido
    .split(/\r\n|\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lineas.length === 0) {
    return { encabezados: [], filas: [] };
  }

  const parseLinea = (linea: string): string[] => {
    const valores: string[] = [];
    let insideQuotes = false;
    let valorActual = '';

    for (let i = 0; i < linea.length; i++) {
      const char = linea[i];
      if (char === '"') {
        if (insideQuotes && linea[i + 1] === '"') {
          valorActual += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        valores.push(valorActual.trim());
        valorActual = '';
      } else {
        valorActual += char;
      }
    }
    valores.push(valorActual.trim());
    return valores;
  };

  const encabezados = parseLinea(lineas[0]);
  const filas = lineas.slice(1).map(parseLinea);

  return { encabezados, filas };
}

export {
  generarReportePDFSubdireccion,
  type OpcionesReporteSubdireccionPDF
} from './reportePdfSubdireccion';
