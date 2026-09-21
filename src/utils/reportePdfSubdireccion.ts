/**
 * Generador de Reporte PDF Institucional para la Subdirección Académica FCM
 * Diseñado con jsPDF y jspdf-autotable para revisión offline completa
 * Periodo: 2027-1 · Universidad Autónoma de Baja California
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Asignacion,
  Espacio,
  Curso,
  Usuario,
  ProgramaEducativo,
  DiaSemana
} from '../types';

export interface OpcionesReporteSubdireccionPDF {
  titulo?: string;
  subtitulo?: string;
  periodoId?: string;
  escenarioNombre?: string;
  subdirectoraNombre?: string;
  subdirectoraCargo?: string;
  incluirResumenEjecutivo?: boolean;
  incluirEstadisticasAulas?: boolean;
  incluirListaCompleta?: boolean;
  filtroProgramaId?: string; // 'todos' | id
  filtroNivel?: 'todos' | 'licenciatura' | 'posgrado';
  nombreArchivo?: string;
}

// Convertir hora HH:MM a minutos para cálculo exacto de duraciones
const horaAMinutos = (hora: string): number => {
  if (!hora) return 0;
  const [h, m] = hora.split(':').map((v) => parseInt(v, 10) || 0);
  return h * 60 + m;
};

const duracionHoras = (inicio: string, fin: string): number => {
  const min = horaAMinutos(fin) - horaAMinutos(inicio);
  return min > 0 ? min / 60 : 2;
};

const ordenDias: Record<DiaSemana, number> = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6
};

const nombresDiasCorto: Record<DiaSemana, string> = {
  lunes: 'LUN',
  martes: 'MAR',
  miercoles: 'MIÉ',
  jueves: 'JUE',
  viernes: 'VIE',
  sabado: 'SÁB'
};

/**
 * Genera y descarga el reporte PDF oficial de planeación académica
 * optimizado para la Subdirección y cuerpo directivo FCM.
 */
export function generarReportePDFSubdireccion(
  asignaciones: Asignacion[],
  cursos: Curso[],
  espacios: Espacio[],
  docentes: Usuario[],
  programas: ProgramaEducativo[],
  opciones: OpcionesReporteSubdireccionPDF = {}
): void {
  const {
    titulo = 'DICTAMEN EJECUTIVO DE PLANEACIÓN ACADÉMICA Y ASIGNACIÓN DE AULAS',
    periodoId = '2027-1',
    escenarioNombre = 'Propuesta Oficial',
    subdirectoraNombre = 'Dra. Ivone Giffard Mena',
    subdirectoraCargo = 'Subdirectora de la Facultad de Ciencias Marinas',
    incluirResumenEjecutivo = true,
    incluirEstadisticasAulas = true,
    incluirListaCompleta = true,
    filtroProgramaId = 'todos',
    filtroNivel = 'todos',
    nombreArchivo = `dictamen_planeacion_academica_fcm_${periodoId.replace('-', '_')}_${Date.now()}.pdf`
  } = opciones;

  // Mapas rápidos de acceso
  const cursosMap = new Map(cursos.map((c) => [c.id, c]));
  const espaciosMap = new Map(espacios.map((e) => [e.id, e]));
  const docentesMap = new Map(docentes.map((d) => [d.uid, d]));
  const programasMap = new Map(programas.map((p) => [p.id, p]));

  // Filtrar asignaciones por programa o nivel si aplica
  const asignacionesFiltradas = asignaciones.filter((a) => {
    if (filtroProgramaId !== 'todos') {
      if (!a.programas_ids?.includes(filtroProgramaId)) return false;
    }
    if (filtroNivel !== 'todos') {
      if (a.nivel_educativo !== filtroNivel) return false;
    }
    return true;
  });

  // Inicializar documento en formato A4 Apaisado (Landscape)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const marginX = 14;

  // Paleta Institucional UABC - FCM
  const COLOR_PRIMARIO: [number, number, number] = [15, 45, 74];     // Azul Marino FCM (#0f2d4a)
  const COLOR_VERDE_UABC: [number, number, number] = [0, 114, 63];   // Verde UABC (#00723f)
  const COLOR_DORADO: [number, number, number] = [217, 119, 6];      // Dorado Ámbar (#d97706)
  const COLOR_FONDO_TABLA: [number, number, number] = [248, 250, 252]; // Gris slate-50
  const COLOR_TEXTO_OSCURO: [number, number, number] = [30, 41, 59];  // Slate-800

  // 1. Membrete Institucional de Cabecera (Página 1)
  const dibujarMembrete = () => {
    // Franja Azul Superior
    doc.setFillColor(...COLOR_PRIMARIO);
    doc.rect(0, 0, pageWidth, 24, 'F');

    // Filete Dorado UABC
    doc.setFillColor(...COLOR_DORADO);
    doc.rect(0, 24, pageWidth, 2, 'F');

    // Filete Verde UABC
    doc.setFillColor(...COLOR_VERDE_UABC);
    doc.rect(0, 26, pageWidth, 1, 'F');

    // Textos de Cabecera
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('UNIVERSIDAD AUTÓNOMA DE BAJA CALIFORNIA', marginX, 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('FACULTAD DE CIENCIAS MARINAS  ·  CAMPUS EL SAUZAL, ENSENADA, B.C.', marginX, 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(`SUBDIRECCIÓN ACADÉMICA  |  PERIODO ESCOLAR ${periodoId}`, marginX, 20);

    // Datos a la derecha
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const fechaStr = `Emisión: ${new Date().toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })} ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
    doc.text(fechaStr, pageWidth - marginX - doc.getTextWidth(fechaStr), 10);
    const escStr = `Escenario: ${escenarioNombre}`;
    doc.text(escStr, pageWidth - marginX - doc.getTextWidth(escStr), 15);
    const totalClasesStr = `Total de sesiones: ${asignacionesFiltradas.length}`;
    doc.text(totalClasesStr, pageWidth - marginX - doc.getTextWidth(totalClasesStr), 20);
  };

  dibujarMembrete();

  let cursorY = 33;

  // Título del Documento
  doc.setTextColor(...COLOR_PRIMARIO);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(titulo, marginX, cursorY);
  cursorY += 5;

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Documento oficial de control y revisión para la asignación de horarios, asignaturas y espacios físicos en campus y laboratorios FCM - IIO.`,
    marginX,
    cursorY
  );
  cursorY += 6;

  // 2. Resumen Ejecutivo (Métricas y Balance por Programa)
  if (incluirResumenEjecutivo) {
    // Cálculos estadísticos globales
    const totalHorasSemanales = asignacionesFiltradas.reduce(
      (acc, a) => acc + duracionHoras(a.hora_inicio, a.hora_fin),
      0
    );

    const horasConDocente = asignacionesFiltradas
      .filter((a) => a.profesor_principal_id && a.profesor_principal_id !== 'sin_asignar')
      .reduce((acc, a) => acc + duracionHoras(a.hora_inicio, a.hora_fin), 0);

    const horasSinDocente = totalHorasSemanales - horasConDocente;
    const porcentajeCobertura = totalHorasSemanales > 0
      ? Math.round((horasConDocente / totalHorasSemanales) * 100)
      : 0;

    const docentesParticipantes = new Set<string>();
    asignacionesFiltradas.forEach((a) => {
      if (a.profesor_principal_id) docentesParticipantes.add(a.profesor_principal_id);
      a.profesores_ids?.forEach((pid) => docentesParticipantes.add(pid));
    });

    const espaciosUtilizados = new Set(asignacionesFiltradas.map((a) => a.espacio_id));
    const cursosProgramados = new Set(asignacionesFiltradas.map((a) => a.curso_id));

    // Tarjetas de Indicadores Clave en formato tabla compacta
    autoTable(doc, {
      startY: cursorY,
      margin: { left: marginX, right: marginX },
      head: [
        [
          'SESIONES PROGRAMADAS',
          'CURSOS DISTINTOS',
          'HORAS SEMANALES',
          'COBERTURA DOCENTE',
          'DOCENTES ACTIVOS',
          'AULAS / LABS EN USO'
        ]
      ],
      body: [
        [
          `${asignacionesFiltradas.length} sesiones`,
          `${cursosProgramados.size} materias`,
          `${totalHorasSemanales} hrs / sem`,
          `${porcentajeCobertura}% (${horasConDocente}h cubiertas / ${horasSinDocente}h pendientes)`,
          `${docentesParticipantes.size} profesores`,
          `${espaciosUtilizados.size} de ${espacios.length} espacios`
        ]
      ],
      theme: 'grid',
      headStyles: {
        fillColor: COLOR_PRIMARIO,
        textColor: [255, 255, 255],
        fontSize: 7.5,
        fontStyle: 'bold',
        halign: 'center',
        cellPadding: 2
      },
      bodyStyles: {
        fontSize: 8,
        fontStyle: 'bold',
        textColor: COLOR_TEXTO_OSCURO,
        halign: 'center',
        cellPadding: 2.5
      }
    });

    cursorY = (doc as any).lastAutoTable.finalY + 5;

    // Tabla de Desglose por Programa Educativo
    const filasProgramas = programas.map((prog) => {
      const cursosProg = cursos.filter((c) => c.programas_ids?.includes(prog.id));
      const asigsProg = asignacionesFiltradas.filter(
        (a) => a.programas_ids?.includes(prog.id) || cursosProg.some((c) => c.id === a.curso_id)
      );

      let hrsProgDocente = 0;
      let hrsProgTotal = 0;
      const docentesProg = new Set<string>();

      asigsProg.forEach((a) => {
        const dur = duracionHoras(a.hora_inicio, a.hora_fin);
        hrsProgTotal += dur;
        if (a.profesor_principal_id && a.profesor_principal_id !== 'sin_asignar') {
          hrsProgDocente += dur;
          docentesProg.add(a.profesor_principal_id);
        }
      });

      const pctProg = hrsProgTotal > 0 ? Math.round((hrsProgDocente / hrsProgTotal) * 100) : 100;

      return [
        prog.id,
        prog.nombre,
        prog.nivel_educativo.toUpperCase(),
        cursosProg.length.toString(),
        asigsProg.length.toString(),
        `${hrsProgTotal} h`,
        `${hrsProgDocente} h`,
        `${pctProg}%`,
        docentesProg.size.toString(),
        pctProg >= 95 ? 'COMPLETO' : pctProg >= 75 ? 'EN PROCESO' : 'REQUIERE ATENCIÓN'
      ];
    });

    // Subtítulo de sección programas
    doc.setTextColor(...COLOR_PRIMARIO);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Resumen de Carga y Asignación por Programa Académico:', marginX, cursorY);
    cursorY += 2;

    autoTable(doc, {
      startY: cursorY,
      margin: { left: marginX, right: marginX },
      head: [
        [
          'Código',
          'Programa Educativo',
          'Nivel',
          'Cursos',
          'Sesiones',
          'Horas Totales',
          'Con Docente',
          '% Cobertura',
          'Docentes',
          'Estado'
        ]
      ],
      body: filasProgramas,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontSize: 7.5,
        fontStyle: 'bold',
        cellPadding: 2
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 1.8
      },
      alternateRowStyles: {
        fillColor: COLOR_FONDO_TABLA
      },
      columnStyles: {
        0: { cellWidth: 16, fontStyle: 'bold' },
        1: { cellWidth: 80 },
        2: { cellWidth: 24, halign: 'center' },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 16, halign: 'center' },
        5: { cellWidth: 20, halign: 'center' },
        6: { cellWidth: 20, halign: 'center' },
        7: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
        8: { cellWidth: 16, halign: 'center' },
        9: { cellWidth: 35, halign: 'center', fontStyle: 'bold' }
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 9) {
          const val = data.cell.raw;
          if (val === 'COMPLETO') {
            data.cell.styles.textColor = [0, 114, 63]; // Verde UABC
          } else if (val === 'EN PROCESO') {
            data.cell.styles.textColor = [217, 119, 6]; // Ámbar
          } else {
            data.cell.styles.textColor = [225, 29, 72]; // Rojo
          }
        }
      }
    });

    cursorY = (doc as any).lastAutoTable.finalY + 6;
  }

  // 3. Detalle Completo de Horarios, Asignaturas y Aulas Asignadas
  if (incluirListaCompleta) {
    // Si queda poco espacio en la primera página, saltar a una nueva
    if (cursorY > pageHeight - 50) {
      doc.addPage();
      cursorY = 20;
    }

    doc.setTextColor(...COLOR_PRIMARIO);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('Relación Completa de Horarios, Asignaturas y Aulas Asignadas:', marginX, cursorY);
    cursorY += 3;

    // Ordenar asignaciones: Día -> Hora Inicio -> Aula -> Asignatura
    const asignacionesOrdenadas = [...asignacionesFiltradas].sort((a, b) => {
      const diaA = ordenDias[a.dia] || 7;
      const diaB = ordenDias[b.dia] || 7;
      if (diaA !== diaB) return diaA - diaB;
      const hDiff = a.hora_inicio.localeCompare(b.hora_inicio);
      if (hDiff !== 0) return hDiff;
      return (a.espacio_codigo_snapshot || '').localeCompare(b.espacio_codigo_snapshot || '');
    });

    const filasDetalladas = asignacionesOrdenadas.map((asig) => {
      const curso = cursosMap.get(asig.curso_id);
      const espacio = espaciosMap.get(asig.espacio_id);

      // Docentes asociados
      let docenteTexto = '⚠️ PENDIENTE DE ASIGNAR';
      if (asig.profesor_principal_id && asig.profesor_principal_id !== 'sin_asignar') {
        const prof = docentesMap.get(asig.profesor_principal_id);
        docenteTexto = prof?.nombre || asig.profesor_principal_id;
        if (asig.profesores_ids && asig.profesores_ids.length > 1) {
          const otros = asig.profesores_ids
            .filter((id) => id !== asig.profesor_principal_id)
            .map((id) => docentesMap.get(id)?.nombre || id);
          if (otros.length > 0) {
            docenteTexto += ` (+ ${otros.join(', ')})`;
          }
        }
      }

      // Espacio format
      const codigoEspacio = espacio?.codigo || asig.espacio_codigo_snapshot || 'Por asignar';
      const nombreEspacio = espacio?.nombre || asig.espacio_nombre_snapshot || '';
      const edificioEspacio = espacio?.edificio ? ` (${espacio.edificio})` : '';

      // Tipo de sesión y grupo
      const sesionTipo = asig.subgrupo_id
        ? `Gpo ${asig.grupo_principal_id} · Subg. ${asig.subgrupo_id}`
        : `Gpo ${asig.grupo_principal_id} · ${asig.tipo_sesion ? asig.tipo_sesion.toUpperCase() : 'TEORÍA'}`;

      // Capacidad vs Alumnos
      const capStr = `${asig.alumnos_programados || 0} / ${asig.capacidad_espacio || espacio?.capacidad_maxima || '-'}`;

      // Programa(s)
      const progSiglas = asig.programas_ids?.join(', ') || asig.nivel_educativo || 'FCM';

      return [
        nombresDiasCorto[asig.dia] || asig.dia.toUpperCase().slice(0, 3),
        `${asig.hora_inicio} - ${asig.hora_fin}`,
        `${curso?.codigo || ''} ${curso?.nombre || 'Asignatura'}`,
        progSiglas,
        sesionTipo,
        `${codigoEspacio} - ${nombreEspacio}${edificioEspacio}`,
        docenteTexto,
        capStr,
        asig.estatus ? asig.estatus.toUpperCase() : 'CONFIRMADA'
      ];
    });

    autoTable(doc, {
      startY: cursorY,
      margin: { left: marginX, right: marginX },
      head: [
        [
          'Día',
          'Horario',
          'Asignatura / Clave',
          'Programa',
          'Grupo / Sesión',
          'Aula / Laboratorio (Mapa Oficial)',
          'Docente Titular',
          'Alum/Cap',
          'Estatus'
        ]
      ],
      body: filasDetalladas,
      theme: 'grid',
      headStyles: {
        fillColor: COLOR_PRIMARIO,
        textColor: [255, 255, 255],
        fontSize: 7.5,
        fontStyle: 'bold',
        cellPadding: 2
      },
      styles: {
        fontSize: 7,
        cellPadding: 1.6,
        overflow: 'linebreak'
      },
      alternateRowStyles: {
        fillColor: COLOR_FONDO_TABLA
      },
      columnStyles: {
        0: { cellWidth: 12, fontStyle: 'bold', halign: 'center' },
        1: { cellWidth: 23, halign: 'center' },
        2: { cellWidth: 54 },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 26 },
        5: { cellWidth: 50 },
        6: { cellWidth: 48 },
        7: { cellWidth: 16, halign: 'center' },
        8: { cellWidth: 20, halign: 'center', fontStyle: 'bold' }
      },
      didParseCell: (data) => {
        if (data.section === 'body') {
          // Destacar materias sin profesor
          if (data.column.index === 6 && data.cell.raw.toString().includes('PENDIENTE')) {
            data.cell.styles.textColor = [225, 29, 72];
            data.cell.styles.fontStyle = 'bold';
          }
          // Color por día
          if (data.column.index === 0) {
            data.cell.styles.textColor = COLOR_PRIMARIO;
          }
        }
      }
    });

    cursorY = (doc as any).lastAutoTable.finalY + 8;
  }

  // 4. Estadísticas de Uso de Aulas y Laboratorios (Si se solicita)
  if (incluirEstadisticasAulas) {
    if (cursorY > pageHeight - 60) {
      doc.addPage();
      cursorY = 20;
    }

    doc.setTextColor(...COLOR_PRIMARIO);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('Análisis de Utilización y Ocupación de Aulas y Laboratorios FCM - IIO:', marginX, cursorY);
    cursorY += 3;

    // Calcular ocupación por espacio
    const filasAulas = espacios
      .filter((e) => e.apto_para_docencia !== false && e.activo !== false)
      .map((e) => {
        const asigsEspacio = asignacionesFiltradas.filter((a) => a.espacio_id === e.id);
        const horasOcupadas = asigsEspacio.reduce(
          (acc, a) => acc + duracionHoras(a.hora_inicio, a.hora_fin),
          0
        );
        const pctOcupacion = Math.min(100, Math.round((horasOcupadas / 60) * 100));

        let estado = 'ÓPTIMA';
        if (pctOcupacion >= 75) estado = 'SATURADA';
        else if (pctOcupacion < 35) estado = 'DISPONIBLE';

        return [
          e.codigo,
          e.nombre,
          e.edificio || 'Campus',
          e.tipo_espacio || 'Aula',
          e.capacidad_maxima?.toString() || '-',
          asigsEspacio.length.toString(),
          `${horasOcupadas} hrs`,
          `${pctOcupacion}%`,
          estado
        ];
      })
      .sort((a, b) => {
        const pctA = parseInt(a[7]) || 0;
        const pctB = parseInt(b[7]) || 0;
        return pctB - pctA;
      });

    autoTable(doc, {
      startY: cursorY,
      margin: { left: marginX, right: marginX },
      head: [
        [
          'Código',
          'Nombre del Espacio',
          'Edificio',
          'Tipo de Espacio',
          'Capacidad',
          'Sesiones',
          'Horas/Sem',
          '% Ocupación',
          'Diagnóstico'
        ]
      ],
      body: filasAulas,
      theme: 'grid',
      headStyles: {
        fillColor: [12, 74, 110], // Sky-900
        textColor: [255, 255, 255],
        fontSize: 7.5,
        fontStyle: 'bold',
        cellPadding: 2
      },
      styles: {
        fontSize: 7,
        cellPadding: 1.6
      },
      alternateRowStyles: {
        fillColor: COLOR_FONDO_TABLA
      },
      columnStyles: {
        0: { cellWidth: 18, fontStyle: 'bold' },
        1: { cellWidth: 70 },
        2: { cellWidth: 26 },
        3: { cellWidth: 32 },
        4: { cellWidth: 20, halign: 'center' },
        5: { cellWidth: 20, halign: 'center' },
        6: { cellWidth: 24, halign: 'center' },
        7: { cellWidth: 25, halign: 'center', fontStyle: 'bold' },
        8: { cellWidth: 34, halign: 'center', fontStyle: 'bold' }
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 8) {
          const v = data.cell.raw;
          if (v === 'SATURADA') {
            data.cell.styles.textColor = [225, 29, 72];
          } else if (v === 'ÓPTIMA') {
            data.cell.styles.textColor = [0, 114, 63];
          } else {
            data.cell.styles.textColor = [2, 132, 199];
          }
        }
      }
    });

    cursorY = (doc as any).lastAutoTable.finalY + 12;
  }

  // 5. Bloque de Validación y Firma Oficial de Subdirección
  if (cursorY > pageHeight - 40) {
    doc.addPage();
    cursorY = 25;
  }

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  const firmaX = pageWidth / 2 - 45;
  doc.line(firmaX, cursorY + 18, firmaX + 90, cursorY + 18);

  doc.setTextColor(...COLOR_PRIMARIO);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(subdirectoraNombre, pageWidth / 2, cursorY + 23, { align: 'center' });

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(subdirectoraCargo, pageWidth / 2, cursorY + 28, { align: 'center' });
  doc.text('Facultad de Ciencias Marinas · UABC', pageWidth / 2, cursorY + 32, { align: 'center' });

  // 6. Pie de Página y Numeración Universal (Dos Pasadas)
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Si no es la primera página, dibujar mini-franja superior
    if (i > 1) {
      doc.setFillColor(...COLOR_PRIMARIO);
      doc.rect(0, 0, pageWidth, 6, 'F');
      doc.setFillColor(...COLOR_DORADO);
      doc.rect(0, 6, pageWidth, 0.8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text(
        `UABC  ·  FACULTAD DE CIENCIAS MARINAS  ·  PLANEACIÓN ACADÉMICA Y ASIGNACIÓN DE AULAS ${periodoId}`,
        marginX,
        4.5
      );
      doc.setFont('helvetica', 'normal');
      doc.text(`Escenario: ${escenarioNombre}`, pageWidth - marginX - 35, 4.5);
    }

    // Pie de página oficial
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 9, pageWidth - marginX, pageHeight - 9);

    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(
      `Documento Oficial de Planeación Académica FCM · Aprobado para Revisión Offline por la Subdirección Académica`,
      marginX,
      pageHeight - 5
    );

    const paginaTexto = `Página ${i} de ${totalPages}`;
    doc.text(paginaTexto, pageWidth - marginX - doc.getTextWidth(paginaTexto), pageHeight - 5);
  }

  // Descargar el archivo PDF en el navegador
  doc.save(nombreArchivo);
}
