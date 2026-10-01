const fs = require('fs');
const path = require('path');
const { DOCENTES_OFICIALES, CURSOS_OFICIALES, TUTORIAS_ESTUDIANTES } = require('./datos_oficiales_posgrado.cjs');

// Espacios
const espaciosPath = path.join(__dirname, '../src/data/espacios_iniciales_2027_1.json');
const espacios = JSON.parse(fs.readFileSync(espaciosPath, 'utf8'));
const espacioMap = new Map();
espacios.forEach(e => {
  espacioMap.set(e.id, e);
  if (e.codigo) espacioMap.set(e.codigo.toUpperCase(), e);
});

// Asegurar campos requeridos en docentes
const docentesTS = DOCENTES_OFICIALES.map(d => ({
  ...d,
  createdAt: d.createdAt || '2027-01-10T08:00:00.000Z',
  updatedAt: d.updatedAt || '2027-01-10T08:00:00.000Z'
}));

// Generar Cursos, Grupos, Componentes y Asignaciones
const cursosTS = [];
const gruposTS = [];
const componentesTS = [];
const asignacionesTS = [];
const preferenciasTS = [];
const avisosTS = [];

CURSOS_OFICIALES.forEach(c => {
  // 1. Curso
  cursosTS.push({
    id: c.id,
    codigo: c.codigo,
    codigo_normalizado: c.codigo.toLowerCase(),
    nombre: c.nombre,
    nombre_normalizado: c.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
    clave_curso_unica: `${c.codigo}_2027-1`,
    nivel_educativo: 'posgrado',
    programas_ids: ['MCOC', 'DOC'],
    tipo_actividad: c.tipo_actividad,
    horas_teoria_semana: c.horas_teoria_semana,
    horas_laboratorio_semana: c.horas_laboratorio_semana,
    horas_totales_semana: c.horas_totales_semana,
    duracion_bloque_minutos: 60,
    cupo_estimado: c.cupo_estimado,
    requiere_espacio_especial: c.horas_laboratorio_semana > 0,
    activo: true,
    periodo_id: '2027-1',
    notas: `Propuesta oficial Posgrado FCM 2027-1 · ${c.grupo_clave}`,
    createdAt: '2027-01-10T08:00:00.000Z',
    updatedAt: '2027-01-10T08:00:00.000Z'
  });

  // 2. Grupo
  gruposTS.push({
    id: c.grupo_id,
    curso_id: c.id,
    periodo_id: '2027-1',
    nivel_educativo: 'posgrado',
    programas_ids: ['MCOC', 'DOC'],
    semestre: 1,
    cohorte: '2027-1',
    clave_grupo: c.grupo_clave,
    nombre_visible: `${c.nombre} (${c.grupo_clave})`,
    turno: 'matutino',
    cupo_planeado: c.cupo_estimado,
    cupo_maximo: c.cupo_estimado + 5,
    inscritos_estimados: c.cupo_estimado,
    profesor_responsable_id: c.profesores_ids[0],
    profesores_ids: c.profesores_ids,
    requiere_subgrupos: false,
    numero_subgrupos_sugerido: 1,
    tamano_subgrupo_sugerido: c.cupo_estimado,
    tipo_grupo: 'regular',
    activo: true,
    notas: `Grupo oficial ${c.grupo_clave} de ${c.nombre}`,
    createdAt: '2027-01-10T08:00:00.000Z',
    updatedAt: '2027-01-10T08:00:00.000Z'
  });

  // 3. Componente
  const compId = `comp_${c.id}`;
  componentesTS.push({
    id: compId,
    periodo_id: '2027-1',
    curso_id: c.id,
    grupo_principal_id: c.grupo_id,
    nombre_componente: `${c.nombre} - Sesión Presencial/Aula`,
    tipo_componente: c.tipo_actividad === 'seminario' ? 'seminario' : (c.horas_laboratorio_semana > 0 ? 'laboratorio' : 'teoria'),
    horas_semanales: c.horas_totales_semana,
    duracion_sesion_minutos: 60,
    sesiones_por_semana: c.sesiones.length,
    alumnos_totales: c.cupo_estimado,
    requiere_division_subgrupos: false,
    tamano_maximo_subgrupo: c.cupo_estimado,
    numero_subgrupos_requerido: 1,
    tipo_espacio_requerido: c.horas_laboratorio_semana > 0 ? 'laboratorio' : 'aula',
    equipos_requeridos: ['proyector', 'computadora'],
    capacidad_minima_espacio: c.cupo_estimado,
    permite_sesiones_simultaneas: false,
    profesor_responsable_id: c.profesores_ids[0],
    profesores_ids: c.profesores_ids,
    activo: true,
    createdAt: '2027-01-10T08:00:00.000Z',
    updatedAt: '2027-01-10T08:00:00.000Z'
  });

  // 4. Asignaciones
  c.sesiones.forEach((s, sIdx) => {
    const asigId = `asig_${c.id}_${s.dia}_${s.hora_inicio.replace(':', '')}`;
    const esp = espacioMap.get(s.espacio_id) || { codigo: s.aula_codigo, nombre: s.aula_nombre, capacidad_maxima: 30 };

    asignacionesTS.push({
      id: asigId,
      periodo_id: '2027-1',
      escenario_id: 'oficial',
      curso_id: c.id,
      grupo_principal_id: c.grupo_id,
      componente_grupo_id: compId,
      nivel_programacion: 'grupo_principal',
      profesores_ids: c.profesores_ids,
      profesor_principal_id: c.profesores_ids[0],
      profesor_nombre: c.profesor_nombre,
      nombre_visible: `${c.nombre} (${s.tipo_sesion})`,
      programas_ids: ['MCOC', 'DOC'],
      nivel_educativo: 'posgrado',
      espacio_id: s.espacio_id,
      espacio_codigo_snapshot: s.aula_codigo,
      espacio_nombre_snapshot: s.aula_nombre,
      dia: s.dia,
      hora_inicio: s.hora_inicio,
      hora_fin: s.hora_fin,
      tipo_componente: s.tipo_componente,
      tipo_sesion: s.tipo_sesion,
      alumnos_programados: c.cupo_estimado,
      capacidad_espacio: esp.capacidad_maxima || 30,
      estatus: 'confirmado',
      notas: `Sesión oficial ${s.tipo_sesion} en ${s.aula_codigo} - ${c.profesor_nombre}`,
      createdAt: '2027-01-10T08:00:00.000Z',
      updatedAt: '2027-01-10T08:00:00.000Z'
    });
  });
});

// Preferencias para docentes
DOCENTES_OFICIALES.forEach(d => {
  preferenciasTS.push({
    id: `pref_2027-1_${d.uid}`,
    periodo_id: '2027-1',
    profesor_id: d.uid,
    profesor_nombre: d.nombre,
    nivel_educativo: 'posgrado',
    programas_ids: ['MCOC', 'DOC'],
    dias_no_disponibles: [],
    rangos_no_disponibles: [],
    nivel_restriccion: 'preferencia',
    cubiculo: d.cubiculo,
    horario_tutorias: d.horario_tutorias,
    canal_contacto_estudiantes: d.canal_contacto_estudiantes,
    telefono_extension: d.telefono_extension,
    equipos_requeridos: ['proyector', 'red_uabc'],
    updatedAt: '2027-01-10T08:00:00.000Z'
  });
});

// Avisos de tutorías y bienvenida de posgrado
avisosTS.push({
  id: 'aviso_posgrado_bienvenida',
  periodo_id: '2027-1',
  profesor_id: 'admin_igiffard',
  profesor_nombre: 'Dra. Ivone Giffard (Subdirección FCM)',
  titulo: 'Horario Oficial de Posgrado FCM (MCOC / DCOC) 2027-1',
  contenido: 'Se ha publicado la programación oficial de materias para Grupos 1, 2, 3 y las asignaciones de Tutorías Académicas para el periodo 2027-1.',
  tipo: 'aviso_general',
  prioridad: 'urgente',
  fecha_publicacion: '2027-01-15T09:00:00.000Z',
  contacto: 'igiffard@uabc.edu.mx'
});

avisosTS.push({
  id: 'aviso_tutorias_mcoc',
  periodo_id: '2027-1',
  profesor_id: 'admin_igiffard',
  profesor_nombre: 'Subdirección FCM · Coordinación de Posgrado',
  titulo: 'Asignación de Tutores Académicos Grupo A (Lunes) y Grupo B (Martes)',
  contenido: `Se encuentran asignados 26 estudiantes con sus respectivos tutores académicos:
- Grupo A (Lunes 19:00 - 21:00 VIR): 22 alumnos asesorados por sus respectivos profesores investigadores.
- Grupo B (Martes 19:00 - 21:00 VIR): 4 alumnos asesorados en modalidades de Tutoría I y II.`,
  tipo: 'tutorias',
  prioridad: 'importante',
  fecha_publicacion: '2027-01-15T10:00:00.000Z',
  contacto: 'igiffard@uabc.edu.mx'
});

// Guardar lista detallada de estudiantes con tutores para que las vistas puedan accederla directamente
const fileOutput = `/**
 * Datos semilla iniciales para la Facultad de Ciencias Marinas (FCM) - UABC
 * Periodo Oficial 2027-1 · Posgrado en Oceanografía Costera (MCOC / DCOC)
 * Transcripción fiel 1:1 de los horarios oficiales (Grupos 1, 2, 3 y Tutorías A/B)
 */

import {
  ProgramaEducativo,
  Periodo,
  Escenario,
  EquivalenciaEspacio,
  Curso,
  Grupo,
  ComponenteGrupo,
  Subgrupo,
  Asignacion,
  Usuario,
  PreferenciaDocente,
  AvisoEstudiantes
} from '../types';

export const PERIODO_INICIAL: Periodo = {
  id: '2027-1',
  nombre: '2027-1',
  activo: true,
  fecha_inicio: '2027-01-25',
  fecha_fin: '2027-06-18'
};

export const PROGRAMAS_INICIALES: ProgramaEducativo[] = [
  {
    id: 'MCOC',
    nombre: 'Maestría en Oceanografía Costera',
    nivel_educativo: 'posgrado',
    tipo_programa: 'maestria',
    activo: true,
    periodos_activos: ['2027-1'],
    notas: 'Posgrado en el Sistema Nacional de Posgrados (SNP - CONAHCYT)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'DOC',
    nombre: 'Doctorado en Oceanografía Costera',
    nivel_educativo: 'posgrado',
    tipo_programa: 'doctorado',
    activo: true,
    periodos_activos: ['2027-1'],
    notas: 'Posgrado consolidado de competencia internacional',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'EGA',
    nombre: 'Especialidad en Gestión Ambiental',
    nivel_educativo: 'posgrado',
    tipo_programa: 'especialidad',
    activo: true,
    periodos_activos: ['2027-1'],
    notas: 'Especialidad profesionalizante de Posgrado FCM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'TC-CMA',
    nombre: 'Tronco Común de Ciencias del Mar y del Ambiente',
    nivel_educativo: 'licenciatura',
    tipo_programa: 'tronco_comun',
    activo: true,
    periodos_activos: ['2027-1'],
    notas: 'Etapa básica común para licenciaturas FCM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'OCE',
    nombre: 'Oceanología',
    nivel_educativo: 'licenciatura',
    tipo_programa: 'licenciatura',
    activo: true,
    periodos_activos: ['2027-1'],
    notas: 'Programa académico acreditado FCM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'LBA',
    nombre: 'Licenciatura en Biotecnología en Acuacultura',
    nivel_educativo: 'licenciatura',
    tipo_programa: 'licenciatura',
    activo: true,
    periodos_activos: ['2027-1'],
    notas: 'Programa académico acreditado',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'LCA',
    nombre: 'Licenciatura en Ciencias Ambientales',
    nivel_educativo: 'licenciatura',
    tipo_programa: 'licenciatura',
    activo: true,
    periodos_activos: ['2027-1'],
    notas: 'Programa académico interdisciplinario',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const ESCENARIOS_INICIALES: Escenario[] = [
  {
    id: 'oficial',
    periodo_id: '2027-1',
    nombre: 'Propuesta Oficial 2027-1',
    descripcion: 'Horario coordinado FCM y propuesta del Coordinador de Posgrado e Investigación',
    activo: true,
    estatus: 'oficial',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'borrador_1',
    periodo_id: '2027-1',
    nombre: 'Borrador de Ajustes',
    descripcion: 'Espacio de trabajo abierto para docentes',
    activo: true,
    estatus: 'borrador',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const EQUIVALENCIAS_ESPACIOS_INICIALES: EquivalenciaEspacio[] = [
  { id: 'eq_cpb', texto_entrada: 'E-14 CPB', texto_normalizado: 'e 14 cpb', espacio_id: 'espacio_CPB', codigo_oficial: 'CPB', nombre_oficial: 'Centro de Cómputo de Posgrado, Sala B', tipo_equivalencia: 'codigo', activo: true },
  { id: 'eq_sp1', texto_entrada: 'E-25 SP1', texto_normalizado: 'e 25 sp1', espacio_id: 'espacio_SP1', codigo_oficial: 'SP1', nombre_oficial: 'Salón de Posgrado 1 (IIO)', tipo_equivalencia: 'codigo', activo: true },
  { id: 'eq_spd', texto_entrada: 'E14 SPD', texto_normalizado: 'e14 spd', espacio_id: 'espacio_SPD', codigo_oficial: 'SPD', nombre_oficial: 'Sala de Procesamiento de Datos Oceanográficos', tipo_equivalencia: 'codigo', activo: true },
  { id: 'eq_toa', texto_entrada: 'E-56 TOA', texto_normalizado: 'e 56 toa', espacio_id: 'espacio_TOA', codigo_oficial: 'TOA', nombre_oficial: 'Salón Totoaba A', tipo_equivalencia: 'codigo', activo: true },
  { id: 'eq_sa', texto_entrada: 'E-14 SA', texto_normalizado: 'e 14 sa', espacio_id: 'espacio_SA', codigo_oficial: 'SA', nombre_oficial: 'Salón de Asesorías', tipo_equivalencia: 'codigo', activo: true },
  { id: 'eq_avi', texto_entrada: 'E-25 AVI', texto_normalizado: 'e 25 avi', espacio_id: 'espacio_AVI', codigo_oficial: 'AVI', nombre_oficial: 'Audiovisual IIO', tipo_equivalencia: 'codigo', activo: true },
  { id: 'eq_vir', texto_entrada: 'VIR', texto_normalizado: 'vir', espacio_id: 'espacio_VIR', codigo_oficial: 'VIR', nombre_oficial: 'Modalidad Virtual', tipo_equivalencia: 'codigo', activo: true }
];

export const USUARIOS_INICIALES: Usuario[] = ${JSON.stringify(docentesTS, null, 2)};

export const CURSOS_INICIALES: Curso[] = ${JSON.stringify(cursosTS, null, 2)};

export const GRUPOS_INICIALES: Grupo[] = ${JSON.stringify(gruposTS, null, 2)};

export const COMPONENTES_INICIALES: ComponenteGrupo[] = ${JSON.stringify(componentesTS, null, 2)};

export const SUBGRUPOS_INICIALES: Subgrupo[] = [];

export const ASIGNACIONES_INICIALES: Asignacion[] = ${JSON.stringify(asignacionesTS, null, 2)};

export const PREFERENCIAS_INICIALES: PreferenciaDocente[] = ${JSON.stringify(preferenciasTS, null, 2)};

export const AVISOS_INICIALES: AvisoEstudiantes[] = ${JSON.stringify(avisosTS, null, 2)};

export const TUTORIAS_ESTUDIANTES_INICIALES = ${JSON.stringify(TUTORIAS_ESTUDIANTES, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/seed_data.ts'), fileOutput, 'utf8');

console.log('Generación completada con éxito:');
console.log('- Docentes:', DOCENTES_OFICIALES.length);
console.log('- Cursos:', cursosTS.length);
console.log('- Grupos:', gruposTS.length);
console.log('- Asignaciones:', asignacionesTS.length);
console.log('- Tutorías alumnos:', TUTORIAS_ESTUDIANTES.length);
