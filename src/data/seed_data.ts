/**
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

export const USUARIOS_INICIALES: Usuario[] = [
  {
    "uid": "prof_enriquezandrad",
    "nombre": "Dr. Enriquez Andrade Roberto Ramón",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "eramon@uabc.edu.mx",
    "email_normalizado": "eramon@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_trueconaldavid",
    "nombre": "Dr. Conal David True",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "ctrue@uabc.edu.mx",
    "email_normalizado": "ctrue@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Biotecnología y Cultivo de Peces Marinos (Totoaba)",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_arredondogarci",
    "nombre": "Dra. María Concepción Arredondo García",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "marredondo@uabc.edu.mx",
    "email_normalizado": "marredondo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Biología Marina y Fisiología",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_villegasvicenc",
    "nombre": "Dr. Luis Javier Villegas Vicencio",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "lvillegas@uabc.edu.mx",
    "email_normalizado": "lvillegas@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Oceanografía Física e Instrumentación",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_wagnergutierre",
    "nombre": "Dr. Juan Manuel Wagner Gutiérrez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jwagner@uabc.edu.mx",
    "email_normalizado": "jwagner@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ecología Marina y Zooplancton",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_schrammurrutia",
    "nombre": "Dra. Yolanda Schramm Urrutia",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "yschramm@uabc.edu.mx",
    "email_normalizado": "yschramm@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Mastozoología Marina y Mamíferos Marinos",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jvaca",
    "nombre": "Dr. Juan Guillermo Vaca Rodríguez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jvaca@uabc.edu.mx",
    "email_normalizado": "jvaca@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Pesquerías y Dinámica de Poblaciones",
    "cubiculo": "Edificio 18 · Cubículo 201",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43157",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lopezacunalusm",
    "nombre": "Dra. Lus Mercedes López Acuña",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "llopeza@uabc.edu.mx",
    "email_normalizado": "llopeza@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Química Marina y Contaminación Acuática",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_palvarado",
    "nombre": "Dra. Patricia Alvarado Graef",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "palvarado@uabc.edu.mx",
    "email_normalizado": "palvarado@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Modelación Numérica del Océano y Dinámica Geofísica",
    "cubiculo": "Edificio 16 · Cubículo 115",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43145",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_spelzmaderoron",
    "nombre": "Dr. Ronald Michael Spelz Madero",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "rspelz@uabc.edu.mx",
    "email_normalizado": "rspelz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Geología Marina y Tectónica Costera",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_garciagastelum",
    "nombre": "Dr. Alejandro García Gastélum",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "agarcia@uabc.edu.mx",
    "email_normalizado": "agarcia@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Físico-Química Marina y Procesos de Transporte",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_bmartin",
    "nombre": "Dra. Beatriz Martín Atienza",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "bmartin@uabc.edu.mx",
    "email_normalizado": "bmartin@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Estadística Multivariada y Modelación Bioestadística",
    "cubiculo": "Edificio 14 · Cubículo 104",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43120",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gonzalezsilver",
    "nombre": "Dra. Adriana González Silvera",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "agonzalez@uabc.edu.mx",
    "email_normalizado": "agonzalez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Bio-óptica Marina y Percepción Remota",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gsandoval",
    "nombre": "Dr. Gerardo Sandoval Garibaldi",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "gsandoval@uabc.edu.mx",
    "email_normalizado": "gsandoval@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Bioluminiscencia y Oceanografía Biológica",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lenriquez",
    "nombre": "Dr. Luis Manuel Enríquez Paredes",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "lenriquez@uabc.edu.mx",
    "email_normalizado": "lenriquez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ecología Molecular y Genética de Poblaciones",
    "cubiculo": "Edificio 17 · Cubículo 105",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43135",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_reaton",
    "nombre": "Dr. Ricardo Bernardino Eaton González",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "reaton@uabc.edu.mx",
    "email_normalizado": "reaton@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Oceanografía Física y Modelación Numérica",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_seingiergeorge",
    "nombre": "Dr. Georges Seingier",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "gseingier@uabc.edu.mx",
    "email_normalizado": "gseingier@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Gestión Ambiental Costera y Ordenamiento Territorial",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "admin_igiffard",
    "nombre": "Dra. Ivone Giffard Mena",
    "cargo": "Subdirectora FCM · Docente de Posgrado",
    "titulo_academico": "Dra.",
    "email": "igiffard@uabc.edu.mx",
    "email_normalizado": "igiffard@uabc.edu.mx",
    "role": "admin",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Subdirección FCM · Fisiología y Osmorregulación Acuática",
    "cubiculo": "Edificio 14 (Dirección) · Cubículo Subdirección",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43102",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mtorres",
    "nombre": "Dra. Mónica Torres Beltrán",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mtorres@uabc.edu.mx",
    "email_normalizado": "mtorres@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Bioinformática, Microbiología Marina y Genómica",
    "cubiculo": "Edificio 14 · Cubículo 108",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43118",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_riverahuertahi",
    "nombre": "Dr. Hiram Rivera Huerta",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "hrivera@uabc.edu.mx",
    "email_normalizado": "hrivera@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Oceanografía Geológica y Sedimentología",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_tanahararomero",
    "nombre": "Dra. Tanahara Romero Sarayda Aimé",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "taime@uabc.edu.mx",
    "email_normalizado": "taime@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_moraleschavezr",
    "nombre": "Dr. Rafael Morales Chávez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "rmorales@uabc.edu.mx",
    "email_normalizado": "rmorales@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Oceanografía Física Costera",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_cardozacontrer",
    "nombre": "Dra. Cardoza Contreras Marlene Nohemi",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "cnohemi@uabc.edu.mx",
    "email_normalizado": "cnohemi@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_velazquezgonza",
    "nombre": "Dra. Ernestina Karen Velázquez González",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "kvelazquez@uabc.edu.mx",
    "email_normalizado": "kvelazquez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Biología y Fisiología Marina",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_vfernandez",
    "nombre": "Dra. Violeta Zetzangari Fernández Díaz",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "vfernandez@uabc.edu.mx",
    "email_normalizado": "vfernandez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Oceanografía Biológica y Avances de Tesis",
    "cubiculo": "Edificio 18 · Cubículo 205",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43160",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mgalaviz",
    "nombre": "Dr. Mario Galaviz Espinoza",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "mgalaviz@uabc.edu.mx",
    "email_normalizado": "mgalaviz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Bioquímica Nutricional Acuícola y Fisiología Digestiva",
    "cubiculo": "Edificio 14 · Cubículo 107",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43117",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_reyesortamaris",
    "nombre": "Dra. Marisa Reyes Orta",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mreyes@uabc.edu.mx",
    "email_normalizado": "mreyes@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Oceanografía Química y Ciclos Biogeoquímicos",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_klugo",
    "nombre": "Dra. Karina del Carmen Lugo Ibarra",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "klugo@uabc.edu.mx",
    "email_normalizado": "klugo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Microbiología Acuícola y Sanidad Marina",
    "cubiculo": "Edificio 17 · Cubículo 106",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43134",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jaramontanezro",
    "nombre": "Dra. Rosario Jara Montañez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "rjara@uabc.edu.mx",
    "email_normalizado": "rjara@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Educación Ambiental y Recursos Marinos",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mruiz",
    "nombre": "Dra. Mary Carmen Ruíz de la Torre",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mruiz@uabc.edu.mx",
    "email_normalizado": "mruiz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Oceanografía Química y Percepción Remota",
    "cubiculo": "Edificio 14 · Cubículo 105",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43116",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_sancheznavaama",
    "nombre": "Dra. Amara Thaydé Sánchez Nava",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "asanchezn@uabc.edu.mx",
    "email_normalizado": "asanchezn@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Biología de la Conservación y Vertebrados Marinos",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_floresmoralesa",
    "nombre": "Dra. Ana Laura Flores Morales",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "afloresm@uabc.edu.mx",
    "email_normalizado": "afloresm@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ecología Marina y Recursos Costeros",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_rbeas",
    "nombre": "Dr. Rodrigo Beas Luna",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "rbeas@uabc.edu.mx",
    "email_normalizado": "rbeas@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ecología Marina, Comunidades Bentónicas y Bosques de Macroalgas",
    "cubiculo": "Edificio 18 · Cubículo 206",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43164",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_aabadia",
    "nombre": "Dra. Alicia Abadía Cardoso",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "aabadia@uabc.edu.mx",
    "email_normalizado": "aabadia@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Genética Marina y Conservación de Recursos Acuáticos",
    "cubiculo": "Edificio 17 · Cubículo 102",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43131",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_vivancoarandam",
    "nombre": "Dra. Miroslava Vivanco Aranda",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mvivanco@uabc.edu.mx",
    "email_normalizado": "mvivanco@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Biotecnología y Cultivo de Microalgas",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_evangelistaher",
    "nombre": "Dra. Viridiana Evangelista Hernández",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "vevangelista@uabc.edu.mx",
    "email_normalizado": "vevangelista@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Biología Marina y Ecosistemas Costeros",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_fbarreto",
    "nombre": "Dr. Fernando Barreto Curiel",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "fbarreto@uabc.edu.mx",
    "email_normalizado": "fbarreto@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Sistemas Acuícolas y Bioquímica Nutricional",
    "cubiculo": "Edificio 18 · Cubículo 202",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43158",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_herreragutierr",
    "nombre": "Dr. Ángel Raúl Herrera Gutiérrez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "aherrera@uabc.edu.mx",
    "email_normalizado": "aherrera@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Oceanografía Física e Hidrología Costera",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_yarbuhlugousam",
    "nombre": "Dr. Usama Ismael Yarbuh Lugo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "uyarbuh@uabc.edu.mx",
    "email_normalizado": "uyarbuh@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Geología Marina y Geofísica Sísmica",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_nmillan",
    "nombre": "Dra. Natalie Millán Aguiñaga",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "nmillan@uabc.edu.mx",
    "email_normalizado": "nmillan@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Biotecnología Marina y Seminarios de Posgrado",
    "cubiculo": "Edificio 14 (SPD) · Cubículo 102",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43105",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_villegasmendoz",
    "nombre": "Dr. Josué Rodolfo Villegas Mendoza",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jvillegas@uabc.edu.mx",
    "email_normalizado": "jvillegas@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Química Ambiental Marina",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lopezcalderonj",
    "nombre": "Dr. Jorge Manuel López Calderón",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jlopezc@uabc.edu.mx",
    "email_normalizado": "jlopezc@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ecología Marina y Recursos Bentónicos",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mejiapinakarla",
    "nombre": "Dra. Karla Gabriela Mejía Piña",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "kmejia@uabc.edu.mx",
    "email_normalizado": "kmejia@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Biotecnología Marina y Acuacultura",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_msantiago",
    "nombre": "Dr. Mauro Wilfrido Santiago García",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "msantiago@uabc.edu.mx",
    "email_normalizado": "msantiago@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Oceanografía Biológica y Tutoría Académica",
    "cubiculo": "Edificio 16 · Cubículo 118",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43149",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jazepeda",
    "nombre": "Dr. José Alberto Zepeda Domínguez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jazepeda@uabc.edu.mx",
    "email_normalizado": "jazepeda@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Sistemas Socioecológicos y Manejo Pesquero Comunitario",
    "cubiculo": "Edificio 18 · Cubículo 209",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43163",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lubinskyjinich",
    "nombre": "Dra. Mónica Lubinsky Jinich",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mlubinsky@uabc.edu.mx",
    "email_normalizado": "mlubinsky@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Ambientales y Conservación",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lopezcastillej",
    "nombre": "Dr. Julio López Castillejos",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jlopezcast@uabc.edu.mx",
    "email_normalizado": "jlopezcast@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Oceanografía Geológica y Métodos Geofísicos",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_arenasislasdia",
    "nombre": "Dra. Diana Arenas Islas",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "darenas@uabc.edu.mx",
    "email_normalizado": "darenas@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Microbiología y Biología Molecular",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_cdominguez",
    "nombre": "Dr. Carlos Alejandro Domínguez Pérez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "cdominguez@uabc.edu.mx",
    "email_normalizado": "cdominguez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Oceanografía Física e Instrumentación Marina",
    "cubiculo": "Edificio 16 · Cubículo 114",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43147",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_romeroarteagaa",
    "nombre": "Dra. Angélica María Romero Arteaga",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "aromero@uabc.edu.mx",
    "email_normalizado": "aromero@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Ambientales y Educación Superior",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jgcorreaperez",
    "nombre": "Dr. Juan Gabriel Correa Pérez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jgcorrea@uabc.edu.mx",
    "email_normalizado": "jgcorrea@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Sistemas Acuícolas y Calidad de Agua",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_acastillo",
    "nombre": "Dra. Alejandra de Jesús Castillo Ramírez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "acastillo@uabc.edu.mx",
    "email_normalizado": "acastillo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Percepción Remota del Color del Océano y Bio-óptica",
    "cubiculo": "Edificio 14 · Cubículo 106",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43115",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_villasusopalom",
    "nombre": "Dr. Villasuso Palomares Salvador",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "vsalvador@uabc.edu.mx",
    "email_normalizado": "vsalvador@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gomezhernandez",
    "nombre": "Dra. Guadalupe Gómez Hernández",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "ggomez@uabc.edu.mx",
    "email_normalizado": "ggomez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Ambientales y Gestión de Residuos",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_saenzavalosmar",
    "nombre": "Dra. Mariana Ana Laura Saenz-Ávalos",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "msaenz@uabc.edu.mx",
    "email_normalizado": "msaenz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ecología Marina y Dinámica Trófica",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jennyferschong",
    "nombre": "Dra. Jennyfers Chong Robles",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "jrobles@uabc.edu.mx",
    "email_normalizado": "jrobles@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gustavoalexisc",
    "nombre": "Dr. Gustavo Alexis Cardenas López",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "glopez@uabc.edu.mx",
    "email_normalizado": "glopez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_victormanuello",
    "nombre": "Dr. Victor Manuel Lomeli Quintero",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "vquintero@uabc.edu.mx",
    "email_normalizado": "vquintero@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_astridhernande",
    "nombre": "Dra. Astrid Hernández Cruz",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "acruz@uabc.edu.mx",
    "email_normalizado": "acruz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_poulettecaroli",
    "nombre": "Dra. Poulette Carolina Álvarez Rosales",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "prosales@uabc.edu.mx",
    "email_normalizado": "prosales@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_eulalioarambul",
    "nombre": "Dr. Eulalio Arámbul Muñoz",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "emunoz@uabc.edu.mx",
    "email_normalizado": "emunoz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_abraga",
    "nombre": "Dr. Andre Luiz Braga de Souza",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "asouza@uabc.edu.mx",
    "email_normalizado": "asouza@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 222",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43232",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_victorfroylanc",
    "nombre": "Dr. Victor Froylán Camacho Ibar",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "vibar@uabc.edu.mx",
    "email_normalizado": "vibar@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_scastellanos",
    "nombre": "Dra. Sheila Castellanos Martínez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "smartinez@uabc.edu.mx",
    "email_normalizado": "smartinez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 17 · Cubículo 110",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43138",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gabrielayareli",
    "nombre": "Dra. Gabriela Yareli Cervantes Díaz",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "gdiaz@uabc.edu.mx",
    "email_normalizado": "gdiaz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jgcorrea",
    "nombre": "Dr. Juan Gabriel Correa Reyes",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jreyes@uabc.edu.mx",
    "email_normalizado": "jreyes@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 215",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43225",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_rcruz",
    "nombre": "Dr. Ricardo Cruz López",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "rlopez@uabc.edu.mx",
    "email_normalizado": "rlopez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 225",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43235",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_eduardoamircue",
    "nombre": "Dr. Eduardo Amir Cuevas Flores",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "eflores@uabc.edu.mx",
    "email_normalizado": "eflores@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_luiswalterdaes",
    "nombre": "Dr. Luis Walter Daessle Heuser",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "lheuser@uabc.edu.mx",
    "email_normalizado": "lheuser@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_odelrio",
    "nombre": "Dr. Oscar Basilio del Rio Zaragoza",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "ozaragoza@uabc.edu.mx",
    "email_normalizado": "ozaragoza@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 17 · Cubículo 108",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43136",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_franciscodelga",
    "nombre": "Dr. Francisco Delgadillo Hinojosa",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "fhinojosa@uabc.edu.mx",
    "email_normalizado": "fhinojosa@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_afelix",
    "nombre": "Dr. Armando Félix Bermudez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "abermudez@uabc.edu.mx",
    "email_normalizado": "abermudez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 220",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43230",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_alejandraferre",
    "nombre": "Dra. Alejandra Ferreira Arrieta",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "aarrieta@uabc.edu.mx",
    "email_normalizado": "aarrieta@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_hgnava",
    "nombre": "Dr. Hector García Nava",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "hnava@uabc.edu.mx",
    "email_normalizado": "hnava@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 210",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43220",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_ngudino",
    "nombre": "Dr. Napoleon Gudiño Elizondo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "nelizondo@uabc.edu.mx",
    "email_normalizado": "nelizondo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 212",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43222",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_ricardoaarongu",
    "nombre": "Dr. Ricardo Aaron Gutiérrez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "rgutierrez@uabc.edu.mx",
    "email_normalizado": "rgutierrez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_josemanuelguzm",
    "nombre": "Dr. Jose Manuel Guzman Calderon",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jcalderon@uabc.edu.mx",
    "email_normalizado": "jcalderon@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_ramirohernande",
    "nombre": "Dr. Ramiro Hernández García",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "rgarcia@uabc.edu.mx",
    "email_normalizado": "rgarcia@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_felixaugustohe",
    "nombre": "Dr. Félix Augusto Hernández Guzman",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "fguzman@uabc.edu.mx",
    "email_normalizado": "fguzman@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_bjuarez",
    "nombre": "Dr. Braulio Juarez Araiza",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "baraiza@uabc.edu.mx",
    "email_normalizado": "baraiza@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 16 · Cubículo 112",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43144",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jessicaabethla",
    "nombre": "Dra. Jessica Abeth Lagos Fregoso",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "jfregoso@uabc.edu.mx",
    "email_normalizado": "jfregoso@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_cristinalandac",
    "nombre": "Dra. Cristina Landa Cansigno",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "ccansigno@uabc.edu.mx",
    "email_normalizado": "ccansigno@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_juanaclaudiale",
    "nombre": "Dra. Juana Claudia Leyva Aguilera",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "jaguilera@uabc.edu.mx",
    "email_normalizado": "jaguilera@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_llopez",
    "nombre": "Dra. Laura Liliana López Galindo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "lgalindo@uabc.edu.mx",
    "email_normalizado": "lgalindo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 208",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43215",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_victoralfonsom",
    "nombre": "Dr. Victor Alfonso Macias Carranza",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "vcarranza@uabc.edu.mx",
    "email_normalizado": "vcarranza@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lmalpica",
    "nombre": "Dr. Luis Malpica Cruz",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "lcruz@uabc.edu.mx",
    "email_normalizado": "lcruz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 218",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43228",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_leopoldoguille",
    "nombre": "Dr. Leopoldo Guillermo Mendoza Espinosa",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "lespinosa@uabc.edu.mx",
    "email_normalizado": "lespinosa@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_onorzagaray",
    "nombre": "Dr. Carlos Orión Norzagaray López",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "clopez@uabc.edu.mx",
    "email_normalizado": "clopez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Cubículo 208",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43161",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_tolivares",
    "nombre": "Dra. Tatiana Nenetzen Olivares Bañuelos",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "tbanuelos@uabc.edu.mx",
    "email_normalizado": "tbanuelos@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Cubículo 207",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43162",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_alexandroorozc",
    "nombre": "Dr. Alexandro Orozco Duran",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "aduran@uabc.edu.mx",
    "email_normalizado": "aduran@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_emyrsaulpenama",
    "nombre": "Dr. Emyr Saúl Peña Marin",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "emarin@uabc.edu.mx",
    "email_normalizado": "emarin@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_cristinaquezad",
    "nombre": "Dra. Cristina Quezada Hernández",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "chernandez@uabc.edu.mx",
    "email_normalizado": "chernandez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_nancyramirezal",
    "nombre": "Dra. Nancy Ramírez Álvarez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "nalvarez@uabc.edu.mx",
    "email_normalizado": "nalvarez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mauriciomoises",
    "nombre": "Dr. Mauricio Moisés Reyes Bravo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "mbravo@uabc.edu.mx",
    "email_normalizado": "mbravo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_isaacrodriguez",
    "nombre": "Dr. Isaac Rodríguez Padilla",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "ipadilla@uabc.edu.mx",
    "email_normalizado": "ipadilla@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_marianasanchez",
    "nombre": "Dra. Mariana Sánchez Barredo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mbarredo@uabc.edu.mx",
    "email_normalizado": "mbarredo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_hildajanetsanc",
    "nombre": "Dra. Hilda Janet Sánchez Sánchez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "hsanchez@uabc.edu.mx",
    "email_normalizado": "hsanchez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jmsandoval",
    "nombre": "Dr. Jose Miguel Sandoval Gil",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jgil@uabc.edu.mx",
    "email_normalizado": "jgil@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 17 · Cubículo 103",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43132",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_hortenciasilva",
    "nombre": "Dra. Hortencia Silva Jiménez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "hjimenez@uabc.edu.mx",
    "email_normalizado": "hjimenez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mariadanielata",
    "nombre": "Dra. Maria Daniela Tazzo Rangel",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mrangel@uabc.edu.mx",
    "email_normalizado": "mrangel@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_eunisevanessat",
    "nombre": "Dra. Eunise Vanessa Torres Delgado",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "edelgado@uabc.edu.mx",
    "email_normalizado": "edelgado@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_christinaveron",
    "nombre": "Dra. Christina Veronica Treinen Crespo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "ccrespo@uabc.edu.mx",
    "email_normalizado": "ccrespo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jacobalbertova",
    "nombre": "Dr. Jacob Alberto Valdivieso Ojeda",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jojeda@uabc.edu.mx",
    "email_normalizado": "jojeda@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_joseaugustoval",
    "nombre": "Dr. Jose Augusto Valencia Gasti",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jgasti@uabc.edu.mx",
    "email_normalizado": "jgasti@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_enriquevalenzu",
    "nombre": "Dr. Enrique Valenzuela Wood",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "ewood@uabc.edu.mx",
    "email_normalizado": "ewood@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jorgearmandove",
    "nombre": "Dr. Jorge Armando Velásquez Aristizábal",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jaristizabal@uabc.edu.mx",
    "email_normalizado": "jaristizabal@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mariateresavia",
    "nombre": "Dra. Maria Teresa Viana Castrillón",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mcastrillon@uabc.edu.mx",
    "email_normalizado": "mcastrillon@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_marianavillada",
    "nombre": "Dra. Mariana Villada Canela",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mcanela@uabc.edu.mx",
    "email_normalizado": "mcanela@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_amaiaruizdeale",
    "nombre": "Dra. Amaia Ruiz de Alegría Arzaburu",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "aarzaburu@uabc.edu.mx",
    "email_normalizado": "aarzaburu@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_omarezequielag",
    "nombre": "Dr. Omar Ezequiel Aguillón Hernández",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "ohernandez@uabc.edu.mx",
    "email_normalizado": "ohernandez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_nancyalarconge",
    "nombre": "Dra. Nancy Alarcon Geraldo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "ngeraldo@uabc.edu.mx",
    "email_normalizado": "ngeraldo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lucycoralalarc",
    "nombre": "Dra. Lucy Coral Alarcon Ortega",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "lortega@uabc.edu.mx",
    "email_normalizado": "lortega@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_dantenocalvare",
    "nombre": "Dr. Dantenoc Álvarez Millan",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "dmillan@uabc.edu.mx",
    "email_normalizado": "dmillan@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_osmarrobertoar",
    "nombre": "Dr. Osmar Roberto Araujo Leyva",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "oleyva@uabc.edu.mx",
    "email_normalizado": "oleyva@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_josepedroarces",
    "nombre": "Dr. Jose Pedro Arce Serrano",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jserrano@uabc.edu.mx",
    "email_normalizado": "jserrano@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gabrieladejesu",
    "nombre": "Dra. Gabriela de Jesus Arreguín Rodríguez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "grodriguez@uabc.edu.mx",
    "email_normalizado": "grodriguez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_brendaguadalup",
    "nombre": "Dra. Brenda Guadalupe Bonett Calzada",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "bcalzada@uabc.edu.mx",
    "email_normalizado": "bcalzada@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_karlaroxanacer",
    "nombre": "Dra. Karla Roxana Cervantes Flores",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "kflores@uabc.edu.mx",
    "email_normalizado": "kflores@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_luzdelourdesau",
    "nombre": "Dra. Luz de Lourdes Aurora Coronado Álvarez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "lalvarez@uabc.edu.mx",
    "email_normalizado": "lalvarez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gabrieladelape",
    "nombre": "Dra. Gabriela de la Peña Nettel",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "gnettel@uabc.edu.mx",
    "email_normalizado": "gnettel@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_marianadelgado",
    "nombre": "Dra. Mariana Delgado Fernandez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "mfernandez@uabc.edu.mx",
    "email_normalizado": "mfernandez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_guadalupediazg",
    "nombre": "Dra. Guadalupe Díaz Gutiérrez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "ggutierrez@uabc.edu.mx",
    "email_normalizado": "ggutierrez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_danielalbertod",
    "nombre": "Dr. Daniel Alberto Díaz Guzman",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "dguzman@uabc.edu.mx",
    "email_normalizado": "dguzman@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_juancarlosdomi",
    "nombre": "Dr. Juan Carlos Dominguez Vargas",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jvargas@uabc.edu.mx",
    "email_normalizado": "jvargas@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_arturofajardoy",
    "nombre": "Dr. Arturo Fajardo Yamamoto",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "ayamamoto@uabc.edu.mx",
    "email_normalizado": "ayamamoto@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_robertoantonio",
    "nombre": "Dr. Roberto Antonio Flores Aguilar",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "raguilar@uabc.edu.mx",
    "email_normalizado": "raguilar@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_brisamarisolfl",
    "nombre": "Dra. Brisa Marisol Flores Miranda",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "bmiranda@uabc.edu.mx",
    "email_normalizado": "bmiranda@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_berthagarciaca",
    "nombre": "Dra. Bertha García Capitanachi",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "bcapitanachi@uabc.edu.mx",
    "email_normalizado": "bcapitanachi@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_almadeliagiles",
    "nombre": "Dra. Alma Delia Giles Guzman",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "aguzman@uabc.edu.mx",
    "email_normalizado": "aguzman@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_elianagomezoca",
    "nombre": "Dra. Eliana Gomez Ocampo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "eocampo@uabc.edu.mx",
    "email_normalizado": "eocampo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_abrahamgonzale",
    "nombre": "Dr. Abraham González Mena",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "amena@uabc.edu.mx",
    "email_normalizado": "amena@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lizzgonzalezmo",
    "nombre": "Dra. Lizz González Moreno",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "lmoreno@uabc.edu.mx",
    "email_normalizado": "lmoreno@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_luisandresguer",
    "nombre": "Dr. Luis Andres Guerrero Murcia",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "lmurcia@uabc.edu.mx",
    "email_normalizado": "lmurcia@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_dulceguadalupe",
    "nombre": "Dra. Dulce Guadalupe Guillén Matus",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "dmatus@uabc.edu.mx",
    "email_normalizado": "dmatus@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_claramariahere",
    "nombre": "Dra. Clara Maria Hereu",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "chereu@uabc.edu.mx",
    "email_normalizado": "chereu@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_carlosemiliohe",
    "nombre": "Dr. Carlos Emilio Hernández Rodríguez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "crodriguez@uabc.edu.mx",
    "email_normalizado": "crodriguez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_agustinjaimega",
    "nombre": "Dr. Agustin Jaime Garcilazo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "agarcilazo@uabc.edu.mx",
    "email_normalizado": "agarcilazo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_coniejaramonta",
    "nombre": "Dra. Conie Jara Montañez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "cmontanez@uabc.edu.mx",
    "email_normalizado": "cmontanez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_oscaralbertoji",
    "nombre": "Dr. Oscar Alberto Jiménez Orocio",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "oorocio@uabc.edu.mx",
    "email_normalizado": "oorocio@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_tadashikonomar",
    "nombre": "Dr. Tadashi Kono Martínez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "tmartinez@uabc.edu.mx",
    "email_normalizado": "tmartinez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_ernestolarioss",
    "nombre": "Dr. Ernesto Larios Soriano",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "esoriano@uabc.edu.mx",
    "email_normalizado": "esoriano@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lorenapatricia",
    "nombre": "Dra. Lorena Patricia Linacre Rojas",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "lrojas@uabc.edu.mx",
    "email_normalizado": "lrojas@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_deniselubinsky",
    "nombre": "Dra. Denise Lubinsky Jinich",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "djinich@uabc.edu.mx",
    "email_normalizado": "djinich@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_evnikazariname",
    "nombre": "Dra. Evnika Zarina Medina Romo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "eromo@uabc.edu.mx",
    "email_normalizado": "eromo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_rebecamorenosa",
    "nombre": "Dra. Rebeca Moreno Santoyo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "rsantoyo@uabc.edu.mx",
    "email_normalizado": "rsantoyo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_estrellaazalia",
    "nombre": "Dra. Estrella Azalia Nuñez Zarco",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "ezarco@uabc.edu.mx",
    "email_normalizado": "ezarco@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_normalidiaoliv",
    "nombre": "Dra. Norma Lidia Oliva Méndez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "nmendez@uabc.edu.mx",
    "email_normalizado": "nmendez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_carlosfrancisc",
    "nombre": "Dr. Carlos Francisco Peynador Sánchez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "csanchez@uabc.edu.mx",
    "email_normalizado": "csanchez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gabrielrendonm",
    "nombre": "Dr. Gabriel Rendon Marquez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "gmarquez@uabc.edu.mx",
    "email_normalizado": "gmarquez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_nataliaalejand",
    "nombre": "Dra. Natalia Alejandra Rodríguez Revelo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "nrevelo@uabc.edu.mx",
    "email_normalizado": "nrevelo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_joseernestosam",
    "nombre": "Dr. Jose Ernesto Sampedro Ávila",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "javila@uabc.edu.mx",
    "email_normalizado": "javila@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_joseluissanche",
    "nombre": "Dr. Jose Luis Sánchez Osorio",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "josorio@uabc.edu.mx",
    "email_normalizado": "josorio@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_eduardosantiag",
    "nombre": "Dr. Eduardo Santiago Ojeda",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "eojeda@uabc.edu.mx",
    "email_normalizado": "eojeda@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_marisoltorresa",
    "nombre": "Dra. Marisol Torres Aguilar",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "maguilar@uabc.edu.mx",
    "email_normalizado": "maguilar@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_idalytrejoesca",
    "nombre": "Dra. Idaly Trejo Escamilla",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "iescamilla@uabc.edu.mx",
    "email_normalizado": "iescamilla@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_doraalejandrat",
    "nombre": "Dra. Dora Alejandra Trejo Ramos",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "dramos@uabc.edu.mx",
    "email_normalizado": "dramos@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_auribe",
    "nombre": "Dra. Alicia Guadalupe Uribe López",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "alopez@uabc.edu.mx",
    "email_normalizado": "alopez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Cubículo 211",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43165",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_alfredovenegas",
    "nombre": "Dr. Alfredo Venegas Vega",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "avega@uabc.edu.mx",
    "email_normalizado": "avega@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_samanthavictor",
    "nombre": "Dra. Samantha Victoria Cota",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "scota@uabc.edu.mx",
    "email_normalizado": "scota@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_claudiamariawa",
    "nombre": "Dra. Claudia Maria Wall Medrano",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "cmedrano@uabc.edu.mx",
    "email_normalizado": "cmedrano@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_andreayazminza",
    "nombre": "Dra. Andrea Yazmin Zamora Quintero",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "aquintero@uabc.edu.mx",
    "email_normalizado": "aquintero@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gsamperio",
    "nombre": "Dr. Guillermo Alberto Samperio Ramos",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "gramos@uabc.edu.mx",
    "email_normalizado": "gramos@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC",
      "OCE"
    ],
    "niveles_asignados": [
      "posgrado",
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Cubículo 204",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43159",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_pumachavezadri",
    "nombre": "Dra. Adriana Puma Chávez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "achavez@uabc.edu.mx",
    "email_normalizado": "achavez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_naylaberenicem",
    "nombre": "Dra. Nayla Berenice Muñoz Euán",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "neuan@uabc.edu.mx",
    "email_normalizado": "neuan@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jeremielouisna",
    "nombre": "Dr. Jeremie Louis Natan Bauer",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jbauer@uabc.edu.mx",
    "email_normalizado": "jbauer@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_arlettemarimar",
    "nombre": "Dra. Arlette Marimar Pacheco Sandoval",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "asandoval@uabc.edu.mx",
    "email_normalizado": "asandoval@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_emilianonelson",
    "nombre": "Dr. Emiliano Nelson Gorr",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "egorr@uabc.edu.mx",
    "email_normalizado": "egorr@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_julioenriquema",
    "nombre": "Dr. Julio Enrique Martínez García",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jgarcia@uabc.edu.mx",
    "email_normalizado": "jgarcia@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_andradesanchez",
    "nombre": "Dr. Jorge Alberto Andrade Sánchez",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jsanchez@uabc.edu.mx",
    "email_normalizado": "jsanchez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_alejandrogonza",
    "nombre": "Dr. Alejandro González Rojas",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "arojas@uabc.edu.mx",
    "email_normalizado": "arojas@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_normapatriciae",
    "nombre": "Dra. Norma Patricia Esprius Sanches",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dra.",
    "email": "nsanches@uabc.edu.mx",
    "email_normalizado": "nsanches@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "OCE",
      "TC-CMA",
      "LBA",
      "LCA"
    ],
    "niveles_asignados": [
      "licenciatura"
    ],
    "activo": true,
    "origen_pdf_posgrado": false,
    "academia_area": "Ciencias Marinas y del Ambiente",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43100",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  }
];

export const CURSOS_INICIALES: Curso[] = [
  {
    "id": "curso_EST_MULT",
    "codigo": "MCOC-101",
    "codigo_normalizado": "mcoc-101",
    "nombre": "Estadística Multivariada",
    "nombre_normalizado": "estadistica multivariada",
    "clave_curso_unica": "MCOC-101_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 3,
    "horas_laboratorio_semana": 3,
    "horas_totales_semana": 6,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_QPCR",
    "codigo": "MCOC-102",
    "codigo_normalizado": "mcoc-102",
    "nombre": "Análisis de Expresión Génica en qPCR Tiempo Real",
    "nombre_normalizado": "analisis de expresion genica en qpcr tiempo real",
    "clave_curso_unica": "MCOC-102_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_BIOINF",
    "codigo": "MCOC-103",
    "codigo_normalizado": "mcoc-103",
    "nombre": "Bioinformática",
    "nombre_normalizado": "bioinformatica",
    "clave_curso_unica": "MCOC-103_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 3,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 5,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_HIDRO_EST",
    "codigo": "MCOC-104",
    "codigo_normalizado": "mcoc-104",
    "nombre": "Introducción a la Hidrodinámica de Estuarios",
    "nombre_normalizado": "introduccion a la hidrodinamica de estuarios",
    "clave_curso_unica": "MCOC-104_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 1,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 3,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_MOD_OCE",
    "codigo": "MCOC-105",
    "codigo_normalizado": "mcoc-105",
    "nombre": "Modelación Numérica del Océano",
    "nombre_normalizado": "modelacion numerica del oceano",
    "clave_curso_unica": "MCOC-105_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_SEM_TESIS",
    "codigo": "MCOC-106",
    "codigo_normalizado": "mcoc-106",
    "nombre": "Seminario de Tesis",
    "nombre_normalizado": "seminario de tesis",
    "clave_curso_unica": "MCOC-106_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "seminario",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 0,
    "horas_totales_semana": 2,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 20,
    "requiere_espacio_especial": false,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_AVANCE_TESIS_I",
    "codigo": "MCOC-107",
    "codigo_normalizado": "mcoc-107",
    "nombre": "Avance de Tesis I",
    "nombre_normalizado": "avance de tesis i",
    "clave_curso_unica": "MCOC-107_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "seminario",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 0,
    "horas_totales_semana": 2,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": false,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_AVANCE_TESIS_II",
    "codigo": "MCOC-108",
    "codigo_normalizado": "mcoc-108",
    "nombre": "Avance de Tesis II",
    "nombre_normalizado": "avance de tesis ii",
    "clave_curso_unica": "MCOC-108_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "seminario",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 0,
    "horas_totales_semana": 2,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": false,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_SIST_SOCIOECOL",
    "codigo": "MCOC-109",
    "codigo_normalizado": "mcoc-109",
    "nombre": "Análisis de sistemas socioecológicos",
    "nombre_normalizado": "analisis de sistemas socioecologicos",
    "clave_curso_unica": "MCOC-109_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_ECOFIS_MACRO",
    "codigo": "MCOC-110",
    "codigo_normalizado": "mcoc-110",
    "nombre": "Ecofisiología de Macrófitas Marinas",
    "nombre_normalizado": "ecofisiologia de macrofitas marinas",
    "clave_curso_unica": "MCOC-110_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 1,
    "horas_totales_semana": 3,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 20,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G1",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_ECOL_MOL",
    "codigo": "MCOC-201",
    "codigo_normalizado": "mcoc-201",
    "nombre": "Ecología Molecular",
    "nombre_normalizado": "ecologia molecular",
    "clave_curso_unica": "MCOC-201_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 30,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G2",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_AVANCE_TESIS_III",
    "codigo": "MCOC-202",
    "codigo_normalizado": "mcoc-202",
    "nombre": "Avance de Tesis III",
    "nombre_normalizado": "avance de tesis iii",
    "clave_curso_unica": "MCOC-202_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "seminario",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 0,
    "horas_totales_semana": 2,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 30,
    "requiere_espacio_especial": false,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G2",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_PROGRAMACION",
    "codigo": "MCOC-203",
    "codigo_normalizado": "mcoc-203",
    "nombre": "Programación",
    "nombre_normalizado": "programacion",
    "clave_curso_unica": "MCOC-203_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 1,
    "horas_totales_semana": 3,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G2",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_SEM_ACUACULTURA",
    "codigo": "MCOC-204",
    "codigo_normalizado": "mcoc-204",
    "nombre": "Seminario de Acuacultura",
    "nombre_normalizado": "seminario de acuacultura",
    "clave_curso_unica": "MCOC-204_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "seminario",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 0,
    "horas_totales_semana": 2,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 20,
    "requiere_espacio_especial": false,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G2",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_PROC_LITORALES",
    "codigo": "MCOC-205",
    "codigo_normalizado": "mcoc-205",
    "nombre": "Procesos Litorales y Manejo de la Erosión Costera",
    "nombre_normalizado": "procesos litorales y manejo de la erosion costera",
    "clave_curso_unica": "MCOC-205_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 0,
    "horas_laboratorio_semana": 4,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G2",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_PAT_BIOSEG",
    "codigo": "MCOC-206",
    "codigo_normalizado": "mcoc-206",
    "nombre": "Patología y Bioseguridad Acuícola",
    "nombre_normalizado": "patologia y bioseguridad acuicola",
    "clave_curso_unica": "MCOC-206_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G2",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_SIST_ACUA",
    "codigo": "MCOC-207",
    "codigo_normalizado": "mcoc-207",
    "nombre": "Sistemas en Acuacultura",
    "nombre_normalizado": "sistemas en acuacultura",
    "clave_curso_unica": "MCOC-207_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 3,
    "horas_laboratorio_semana": 1,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G2",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_COLOR_OCEANO",
    "codigo": "MCOC-301",
    "codigo_normalizado": "mcoc-301",
    "nombre": "Temas Selectos de Percepción Remota del Color del Océano",
    "nombre_normalizado": "temas selectos de percepcion remota del color del oceano",
    "clave_curso_unica": "MCOC-301_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 15,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G3",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_ECOL_R",
    "codigo": "MCOC-302",
    "codigo_normalizado": "mcoc-302",
    "nombre": "Ecological Data in R",
    "nombre_normalizado": "ecological data in r",
    "clave_curso_unica": "MCOC-302_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 2,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G3",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_BIOQ_NUT_ACU",
    "codigo": "MCOC-303",
    "codigo_normalizado": "mcoc-303",
    "nombre": "Bioquímica Nutricional Acuícola",
    "nombre_normalizado": "bioquimica nutricional acuicola",
    "clave_curso_unica": "MCOC-303_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "mixto",
    "horas_teoria_semana": 0,
    "horas_laboratorio_semana": 4,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": true,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G3",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_SEM_BIOGEOQUIM",
    "codigo": "MCOC-304",
    "codigo_normalizado": "mcoc-304",
    "nombre": "Seminario de Biogeoquímica Acuática Avanzado",
    "nombre_normalizado": "seminario de biogeoquimica acuatica avanzado",
    "clave_curso_unica": "MCOC-304_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "seminario",
    "horas_teoria_semana": 4,
    "horas_laboratorio_semana": 0,
    "horas_totales_semana": 4,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 45,
    "requiere_espacio_especial": false,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · G3",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_TUTORIA_A",
    "codigo": "POS-TUT-A",
    "codigo_normalizado": "pos-tut-a",
    "nombre": "Tutoría Académica (Grupo A)",
    "nombre_normalizado": "tutoria academica (grupo a)",
    "clave_curso_unica": "POS-TUT-A_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "direccion_tutorial",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 0,
    "horas_totales_semana": 2,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 25,
    "requiere_espacio_especial": false,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · Tut-A",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "curso_TUTORIA_B",
    "codigo": "POS-TUT-B",
    "codigo_normalizado": "pos-tut-b",
    "nombre": "Tutoría Académica (Grupo B)",
    "nombre_normalizado": "tutoria academica (grupo b)",
    "clave_curso_unica": "POS-TUT-B_2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "tipo_actividad": "direccion_tutorial",
    "horas_teoria_semana": 2,
    "horas_laboratorio_semana": 0,
    "horas_totales_semana": 2,
    "duracion_bloque_minutos": 60,
    "cupo_estimado": 10,
    "requiere_espacio_especial": false,
    "activo": true,
    "periodo_id": "2027-1",
    "notas": "Propuesta oficial Posgrado FCM 2027-1 · Tut-B",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  }
];

export const GRUPOS_INICIALES: Grupo[] = [
  {
    "id": "grupo_G1_EST_MULT",
    "curso_id": "curso_EST_MULT",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Estadística Multivariada (G1)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_bmartin",
    "profesores_ids": [
      "prof_bmartin"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Estadística Multivariada",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_QPCR",
    "curso_id": "curso_QPCR",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Análisis de Expresión Génica en qPCR Tiempo Real (G1)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_llopez",
    "profesores_ids": [
      "prof_llopez"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Análisis de Expresión Génica en qPCR Tiempo Real",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_BIOINF",
    "curso_id": "curso_BIOINF",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Bioinformática (G1)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_mtorres",
    "profesores_ids": [
      "prof_mtorres"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Bioinformática",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_HIDRO_EST",
    "curso_id": "curso_HIDRO_EST",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Introducción a la Hidrodinámica de Estuarios (G1)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_bjuarez",
    "profesores_ids": [
      "prof_bjuarez"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Introducción a la Hidrodinámica de Estuarios",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_MOD_OCE",
    "curso_id": "curso_MOD_OCE",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Modelación Numérica del Océano (G1)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_palvarado",
    "profesores_ids": [
      "prof_palvarado",
      "prof_stanahara",
      "prof_reaton"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Modelación Numérica del Océano",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_SEM_TESIS",
    "curso_id": "curso_SEM_TESIS",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Seminario de Tesis (G1)",
    "turno": "matutino",
    "cupo_planeado": 20,
    "cupo_maximo": 25,
    "inscritos_estimados": 20,
    "profesor_responsable_id": "prof_nmillan",
    "profesores_ids": [
      "prof_nmillan"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 20,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Seminario de Tesis",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_AVANCE_TESIS_I",
    "curso_id": "curso_AVANCE_TESIS_I",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Avance de Tesis I (G1)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_vfernandez",
    "profesores_ids": [
      "prof_vfernandez"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Avance de Tesis I",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_AVANCE_TESIS_II",
    "curso_id": "curso_AVANCE_TESIS_II",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Avance de Tesis II (G1)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "admin_igiffard",
    "profesores_ids": [
      "admin_igiffard"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Avance de Tesis II",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_SIST_SOCIOECOL",
    "curso_id": "curso_SIST_SOCIOECOL",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Análisis de sistemas socioecológicos (G1)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_jazepeda",
    "profesores_ids": [
      "prof_jazepeda"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Análisis de sistemas socioecológicos",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G1_ECOFIS_MACRO",
    "curso_id": "curso_ECOFIS_MACRO",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G1",
    "nombre_visible": "Ecofisiología de Macrófitas Marinas (G1)",
    "turno": "matutino",
    "cupo_planeado": 20,
    "cupo_maximo": 25,
    "inscritos_estimados": 20,
    "profesor_responsable_id": "prof_jmsandoval",
    "profesores_ids": [
      "prof_jmsandoval"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 20,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G1 de Ecofisiología de Macrófitas Marinas",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G2_ECOL_MOL",
    "curso_id": "curso_ECOL_MOL",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G2",
    "nombre_visible": "Ecología Molecular (G2)",
    "turno": "matutino",
    "cupo_planeado": 30,
    "cupo_maximo": 35,
    "inscritos_estimados": 30,
    "profesor_responsable_id": "prof_lenriquez",
    "profesores_ids": [
      "prof_lenriquez"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 30,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G2 de Ecología Molecular",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G2_AVANCE_TESIS_III",
    "curso_id": "curso_AVANCE_TESIS_III",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G2",
    "nombre_visible": "Avance de Tesis III (G2)",
    "turno": "matutino",
    "cupo_planeado": 30,
    "cupo_maximo": 35,
    "inscritos_estimados": 30,
    "profesor_responsable_id": "prof_lenriquez",
    "profesores_ids": [
      "prof_lenriquez"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 30,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G2 de Avance de Tesis III",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G2_PROGRAMACION",
    "curso_id": "curso_PROGRAMACION",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G2",
    "nombre_visible": "Programación (G2)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_hgnava",
    "profesores_ids": [
      "prof_hgnava"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G2 de Programación",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G2_SEM_ACUACULTURA",
    "curso_id": "curso_SEM_ACUACULTURA",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G2",
    "nombre_visible": "Seminario de Acuacultura (G2)",
    "turno": "matutino",
    "cupo_planeado": 20,
    "cupo_maximo": 25,
    "inscritos_estimados": 20,
    "profesor_responsable_id": "prof_tolivares",
    "profesores_ids": [
      "prof_tolivares",
      "prof_scastellanos"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 20,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G2 de Seminario de Acuacultura",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G2_PROC_LITORALES",
    "curso_id": "curso_PROC_LITORALES",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G2",
    "nombre_visible": "Procesos Litorales y Manejo de la Erosión Costera (G2)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_ngudino",
    "profesores_ids": [
      "prof_ngudino"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G2 de Procesos Litorales y Manejo de la Erosión Costera",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G2_PAT_BIOSEG",
    "curso_id": "curso_PAT_BIOSEG",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G2",
    "nombre_visible": "Patología y Bioseguridad Acuícola (G2)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_odelrio",
    "profesores_ids": [
      "prof_odelrio",
      "prof_scastellanos"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G2 de Patología y Bioseguridad Acuícola",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G2_SIST_ACUA",
    "curso_id": "curso_SIST_ACUA",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G2",
    "nombre_visible": "Sistemas en Acuacultura (G2)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_jgcorrea",
    "profesores_ids": [
      "prof_jgcorrea",
      "prof_fbarreto"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G2 de Sistemas en Acuacultura",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G3_COLOR_OCEANO",
    "curso_id": "curso_COLOR_OCEANO",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G3",
    "nombre_visible": "Temas Selectos de Percepción Remota del Color del Océano (G3)",
    "turno": "matutino",
    "cupo_planeado": 15,
    "cupo_maximo": 20,
    "inscritos_estimados": 15,
    "profesor_responsable_id": "prof_acastillo",
    "profesores_ids": [
      "prof_acastillo"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 15,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G3 de Temas Selectos de Percepción Remota del Color del Océano",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G3_ECOL_R",
    "curso_id": "curso_ECOL_R",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G3",
    "nombre_visible": "Ecological Data in R (G3)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_lmalpica",
    "profesores_ids": [
      "prof_lmalpica"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G3 de Ecological Data in R",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G3_BIOQ_NUT_ACU",
    "curso_id": "curso_BIOQ_NUT_ACU",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G3",
    "nombre_visible": "Bioquímica Nutricional Acuícola (G3)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_mgalaviz",
    "profesores_ids": [
      "prof_mgalaviz",
      "prof_fbarreto"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G3 de Bioquímica Nutricional Acuícola",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_G3_SEM_BIOGEOQUIM",
    "curso_id": "curso_SEM_BIOGEOQUIM",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "G3",
    "nombre_visible": "Seminario de Biogeoquímica Acuática Avanzado (G3)",
    "turno": "matutino",
    "cupo_planeado": 45,
    "cupo_maximo": 50,
    "inscritos_estimados": 45,
    "profesor_responsable_id": "prof_afelix",
    "profesores_ids": [
      "prof_afelix",
      "prof_gsamperio"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 45,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial G3 de Seminario de Biogeoquímica Acuática Avanzado",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_TUTORIA_A",
    "curso_id": "curso_TUTORIA_A",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "Tut-A",
    "nombre_visible": "Tutoría Académica (Grupo A) (Tut-A)",
    "turno": "matutino",
    "cupo_planeado": 25,
    "cupo_maximo": 30,
    "inscritos_estimados": 25,
    "profesor_responsable_id": "prof_auribe",
    "profesores_ids": [
      "prof_auribe",
      "prof_aabadia",
      "prof_abraga",
      "prof_bjuarez",
      "prof_fbarreto",
      "prof_hgnava",
      "prof_jvaca",
      "prof_klugo",
      "prof_llopez",
      "prof_cdominguez",
      "prof_onorzagaray",
      "prof_odelrio",
      "prof_rbeas",
      "prof_jazepeda",
      "prof_jmsandoval",
      "prof_mgalaviz",
      "prof_mruiz",
      "prof_mtorres",
      "prof_msantiago",
      "prof_rcruz",
      "prof_gsamperio"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 25,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial Tut-A de Tutoría Académica (Grupo A)",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "grupo_TUTORIA_B",
    "curso_id": "curso_TUTORIA_B",
    "periodo_id": "2027-1",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "semestre": 1,
    "cohorte": "2027-1",
    "clave_grupo": "Tut-B",
    "nombre_visible": "Tutoría Académica (Grupo B) (Tut-B)",
    "turno": "matutino",
    "cupo_planeado": 10,
    "cupo_maximo": 15,
    "inscritos_estimados": 10,
    "profesor_responsable_id": "prof_bjuarez",
    "profesores_ids": [
      "prof_bjuarez",
      "prof_msantiago",
      "prof_fbarreto",
      "prof_jazepeda"
    ],
    "requiere_subgrupos": false,
    "numero_subgrupos_sugerido": 1,
    "tamano_subgrupo_sugerido": 10,
    "tipo_grupo": "regular",
    "activo": true,
    "notas": "Grupo oficial Tut-B de Tutoría Académica (Grupo B)",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  }
];

export const COMPONENTES_INICIALES: ComponenteGrupo[] = [
  {
    "id": "comp_curso_EST_MULT",
    "periodo_id": "2027-1",
    "curso_id": "curso_EST_MULT",
    "grupo_principal_id": "grupo_G1_EST_MULT",
    "nombre_componente": "Estadística Multivariada - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 6,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 4,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_bmartin",
    "profesores_ids": [
      "prof_bmartin"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_QPCR",
    "periodo_id": "2027-1",
    "curso_id": "curso_QPCR",
    "grupo_principal_id": "grupo_G1_QPCR",
    "nombre_componente": "Análisis de Expresión Génica en qPCR Tiempo Real - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_llopez",
    "profesores_ids": [
      "prof_llopez"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_BIOINF",
    "periodo_id": "2027-1",
    "curso_id": "curso_BIOINF",
    "grupo_principal_id": "grupo_G1_BIOINF",
    "nombre_componente": "Bioinformática - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 5,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_mtorres",
    "profesores_ids": [
      "prof_mtorres"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_HIDRO_EST",
    "periodo_id": "2027-1",
    "curso_id": "curso_HIDRO_EST",
    "grupo_principal_id": "grupo_G1_HIDRO_EST",
    "nombre_componente": "Introducción a la Hidrodinámica de Estuarios - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 3,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_bjuarez",
    "profesores_ids": [
      "prof_bjuarez"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_MOD_OCE",
    "periodo_id": "2027-1",
    "curso_id": "curso_MOD_OCE",
    "grupo_principal_id": "grupo_G1_MOD_OCE",
    "nombre_componente": "Modelación Numérica del Océano - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_palvarado",
    "profesores_ids": [
      "prof_palvarado",
      "prof_stanahara",
      "prof_reaton"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_SEM_TESIS",
    "periodo_id": "2027-1",
    "curso_id": "curso_SEM_TESIS",
    "grupo_principal_id": "grupo_G1_SEM_TESIS",
    "nombre_componente": "Seminario de Tesis - Sesión Presencial/Aula",
    "tipo_componente": "seminario",
    "horas_semanales": 2,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 1,
    "alumnos_totales": 20,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 20,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "aula",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 20,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_nmillan",
    "profesores_ids": [
      "prof_nmillan"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_AVANCE_TESIS_I",
    "periodo_id": "2027-1",
    "curso_id": "curso_AVANCE_TESIS_I",
    "grupo_principal_id": "grupo_G1_AVANCE_TESIS_I",
    "nombre_componente": "Avance de Tesis I - Sesión Presencial/Aula",
    "tipo_componente": "seminario",
    "horas_semanales": 2,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 1,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "aula",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_vfernandez",
    "profesores_ids": [
      "prof_vfernandez"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_AVANCE_TESIS_II",
    "periodo_id": "2027-1",
    "curso_id": "curso_AVANCE_TESIS_II",
    "grupo_principal_id": "grupo_G1_AVANCE_TESIS_II",
    "nombre_componente": "Avance de Tesis II - Sesión Presencial/Aula",
    "tipo_componente": "seminario",
    "horas_semanales": 2,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 1,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "aula",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "admin_igiffard",
    "profesores_ids": [
      "admin_igiffard"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_SIST_SOCIOECOL",
    "periodo_id": "2027-1",
    "curso_id": "curso_SIST_SOCIOECOL",
    "grupo_principal_id": "grupo_G1_SIST_SOCIOECOL",
    "nombre_componente": "Análisis de sistemas socioecológicos - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 3,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_jazepeda",
    "profesores_ids": [
      "prof_jazepeda"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_ECOFIS_MACRO",
    "periodo_id": "2027-1",
    "curso_id": "curso_ECOFIS_MACRO",
    "grupo_principal_id": "grupo_G1_ECOFIS_MACRO",
    "nombre_componente": "Ecofisiología de Macrófitas Marinas - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 3,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 20,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 20,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 20,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_jmsandoval",
    "profesores_ids": [
      "prof_jmsandoval"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_ECOL_MOL",
    "periodo_id": "2027-1",
    "curso_id": "curso_ECOL_MOL",
    "grupo_principal_id": "grupo_G2_ECOL_MOL",
    "nombre_componente": "Ecología Molecular - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 30,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 30,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 30,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_lenriquez",
    "profesores_ids": [
      "prof_lenriquez"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_AVANCE_TESIS_III",
    "periodo_id": "2027-1",
    "curso_id": "curso_AVANCE_TESIS_III",
    "grupo_principal_id": "grupo_G2_AVANCE_TESIS_III",
    "nombre_componente": "Avance de Tesis III - Sesión Presencial/Aula",
    "tipo_componente": "seminario",
    "horas_semanales": 2,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 1,
    "alumnos_totales": 30,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 30,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "aula",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 30,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_lenriquez",
    "profesores_ids": [
      "prof_lenriquez"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_PROGRAMACION",
    "periodo_id": "2027-1",
    "curso_id": "curso_PROGRAMACION",
    "grupo_principal_id": "grupo_G2_PROGRAMACION",
    "nombre_componente": "Programación - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 3,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_hgnava",
    "profesores_ids": [
      "prof_hgnava"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_SEM_ACUACULTURA",
    "periodo_id": "2027-1",
    "curso_id": "curso_SEM_ACUACULTURA",
    "grupo_principal_id": "grupo_G2_SEM_ACUACULTURA",
    "nombre_componente": "Seminario de Acuacultura - Sesión Presencial/Aula",
    "tipo_componente": "seminario",
    "horas_semanales": 2,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 1,
    "alumnos_totales": 20,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 20,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "aula",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 20,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_tolivares",
    "profesores_ids": [
      "prof_tolivares",
      "prof_scastellanos"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_PROC_LITORALES",
    "periodo_id": "2027-1",
    "curso_id": "curso_PROC_LITORALES",
    "grupo_principal_id": "grupo_G2_PROC_LITORALES",
    "nombre_componente": "Procesos Litorales y Manejo de la Erosión Costera - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 3,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_ngudino",
    "profesores_ids": [
      "prof_ngudino"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_PAT_BIOSEG",
    "periodo_id": "2027-1",
    "curso_id": "curso_PAT_BIOSEG",
    "grupo_principal_id": "grupo_G2_PAT_BIOSEG",
    "nombre_componente": "Patología y Bioseguridad Acuícola - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_odelrio",
    "profesores_ids": [
      "prof_odelrio",
      "prof_scastellanos"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_SIST_ACUA",
    "periodo_id": "2027-1",
    "curso_id": "curso_SIST_ACUA",
    "grupo_principal_id": "grupo_G2_SIST_ACUA",
    "nombre_componente": "Sistemas en Acuacultura - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 3,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_jgcorrea",
    "profesores_ids": [
      "prof_jgcorrea",
      "prof_fbarreto"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_COLOR_OCEANO",
    "periodo_id": "2027-1",
    "curso_id": "curso_COLOR_OCEANO",
    "grupo_principal_id": "grupo_G3_COLOR_OCEANO",
    "nombre_componente": "Temas Selectos de Percepción Remota del Color del Océano - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 15,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 15,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 15,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_acastillo",
    "profesores_ids": [
      "prof_acastillo"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_ECOL_R",
    "periodo_id": "2027-1",
    "curso_id": "curso_ECOL_R",
    "grupo_principal_id": "grupo_G3_ECOL_R",
    "nombre_componente": "Ecological Data in R - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_lmalpica",
    "profesores_ids": [
      "prof_lmalpica"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_BIOQ_NUT_ACU",
    "periodo_id": "2027-1",
    "curso_id": "curso_BIOQ_NUT_ACU",
    "grupo_principal_id": "grupo_G3_BIOQ_NUT_ACU",
    "nombre_componente": "Bioquímica Nutricional Acuícola - Sesión Presencial/Aula",
    "tipo_componente": "laboratorio",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "laboratorio",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_mgalaviz",
    "profesores_ids": [
      "prof_mgalaviz",
      "prof_fbarreto"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_SEM_BIOGEOQUIM",
    "periodo_id": "2027-1",
    "curso_id": "curso_SEM_BIOGEOQUIM",
    "grupo_principal_id": "grupo_G3_SEM_BIOGEOQUIM",
    "nombre_componente": "Seminario de Biogeoquímica Acuática Avanzado - Sesión Presencial/Aula",
    "tipo_componente": "seminario",
    "horas_semanales": 4,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 2,
    "alumnos_totales": 45,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 45,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "aula",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 45,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_afelix",
    "profesores_ids": [
      "prof_afelix",
      "prof_gsamperio"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_TUTORIA_A",
    "periodo_id": "2027-1",
    "curso_id": "curso_TUTORIA_A",
    "grupo_principal_id": "grupo_TUTORIA_A",
    "nombre_componente": "Tutoría Académica (Grupo A) - Sesión Presencial/Aula",
    "tipo_componente": "teoria",
    "horas_semanales": 2,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 1,
    "alumnos_totales": 25,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 25,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "aula",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 25,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_auribe",
    "profesores_ids": [
      "prof_auribe",
      "prof_aabadia",
      "prof_abraga",
      "prof_bjuarez",
      "prof_fbarreto",
      "prof_hgnava",
      "prof_jvaca",
      "prof_klugo",
      "prof_llopez",
      "prof_cdominguez",
      "prof_onorzagaray",
      "prof_odelrio",
      "prof_rbeas",
      "prof_jazepeda",
      "prof_jmsandoval",
      "prof_mgalaviz",
      "prof_mruiz",
      "prof_mtorres",
      "prof_msantiago",
      "prof_rcruz",
      "prof_gsamperio"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "comp_curso_TUTORIA_B",
    "periodo_id": "2027-1",
    "curso_id": "curso_TUTORIA_B",
    "grupo_principal_id": "grupo_TUTORIA_B",
    "nombre_componente": "Tutoría Académica (Grupo B) - Sesión Presencial/Aula",
    "tipo_componente": "teoria",
    "horas_semanales": 2,
    "duracion_sesion_minutos": 60,
    "sesiones_por_semana": 1,
    "alumnos_totales": 10,
    "requiere_division_subgrupos": false,
    "tamano_maximo_subgrupo": 10,
    "numero_subgrupos_requerido": 1,
    "tipo_espacio_requerido": "aula",
    "equipos_requeridos": [
      "proyector",
      "computadora"
    ],
    "capacidad_minima_espacio": 10,
    "permite_sesiones_simultaneas": false,
    "profesor_responsable_id": "prof_bjuarez",
    "profesores_ids": [
      "prof_bjuarez",
      "prof_msantiago",
      "prof_fbarreto",
      "prof_jazepeda"
    ],
    "activo": true,
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  }
];

export const SUBGRUPOS_INICIALES: Subgrupo[] = [];

export const ASIGNACIONES_INICIALES: Asignacion[] = [
  {
    "id": "asig_curso_EST_MULT_lunes_0800",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_EST_MULT",
    "grupo_principal_id": "grupo_G1_EST_MULT",
    "componente_grupo_id": "comp_curso_EST_MULT",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_bmartin"
    ],
    "profesor_principal_id": "prof_bmartin",
    "profesor_nombre": "Dra. Beatriz Martín Atienza",
    "nombre_visible": "Estadística Multivariada (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "lunes",
    "hora_inicio": "08:00",
    "hora_fin": "10:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 CPB - Dra. Beatriz Martín Atienza",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_EST_MULT_miercoles_0900",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_EST_MULT",
    "grupo_principal_id": "grupo_G1_EST_MULT",
    "componente_grupo_id": "comp_curso_EST_MULT",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_bmartin"
    ],
    "profesor_principal_id": "prof_bmartin",
    "profesor_nombre": "Dra. Beatriz Martín Atienza",
    "nombre_visible": "Estadística Multivariada (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "miercoles",
    "hora_inicio": "09:00",
    "hora_fin": "10:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 CPB - Dra. Beatriz Martín Atienza",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_EST_MULT_miercoles_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_EST_MULT",
    "grupo_principal_id": "grupo_G1_EST_MULT",
    "componente_grupo_id": "comp_curso_EST_MULT",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_bmartin"
    ],
    "profesor_principal_id": "prof_bmartin",
    "profesor_nombre": "Dra. Beatriz Martín Atienza",
    "nombre_visible": "Estadística Multivariada (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "miercoles",
    "hora_inicio": "10:00",
    "hora_fin": "11:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dra. Beatriz Martín Atienza",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_EST_MULT_viernes_0800",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_EST_MULT",
    "grupo_principal_id": "grupo_G1_EST_MULT",
    "componente_grupo_id": "comp_curso_EST_MULT",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_bmartin"
    ],
    "profesor_principal_id": "prof_bmartin",
    "profesor_nombre": "Dra. Beatriz Martín Atienza",
    "nombre_visible": "Estadística Multivariada (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "viernes",
    "hora_inicio": "08:00",
    "hora_fin": "10:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dra. Beatriz Martín Atienza",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_QPCR_martes_0800",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_QPCR",
    "grupo_principal_id": "grupo_G1_QPCR",
    "componente_grupo_id": "comp_curso_QPCR",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_llopez"
    ],
    "profesor_principal_id": "prof_llopez",
    "profesor_nombre": "Dra. Laura Liliana López Galindo",
    "nombre_visible": "Análisis de Expresión Génica en qPCR Tiempo Real (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "martes",
    "hora_inicio": "08:00",
    "hora_fin": "10:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-25 SP1 - Dra. Laura Liliana López Galindo",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_QPCR_jueves_0800",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_QPCR",
    "grupo_principal_id": "grupo_G1_QPCR",
    "componente_grupo_id": "comp_curso_QPCR",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_llopez"
    ],
    "profesor_principal_id": "prof_llopez",
    "profesor_nombre": "Dra. Laura Liliana López Galindo",
    "nombre_visible": "Análisis de Expresión Génica en qPCR Tiempo Real (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "jueves",
    "hora_inicio": "08:00",
    "hora_fin": "10:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-25 SP1 - Dra. Laura Liliana López Galindo",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_BIOINF_lunes_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_BIOINF",
    "grupo_principal_id": "grupo_G1_BIOINF",
    "componente_grupo_id": "comp_curso_BIOINF",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_mtorres"
    ],
    "profesor_principal_id": "prof_mtorres",
    "profesor_nombre": "Dra. Mónica Torres Beltrán",
    "nombre_visible": "Bioinformática (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "lunes",
    "hora_inicio": "10:00",
    "hora_fin": "12:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 CPB - Dra. Mónica Torres Beltrán",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_BIOINF_viernes_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_BIOINF",
    "grupo_principal_id": "grupo_G1_BIOINF",
    "componente_grupo_id": "comp_curso_BIOINF",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_mtorres"
    ],
    "profesor_principal_id": "prof_mtorres",
    "profesor_nombre": "Dra. Mónica Torres Beltrán",
    "nombre_visible": "Bioinformática (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "viernes",
    "hora_inicio": "10:00",
    "hora_fin": "13:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dra. Mónica Torres Beltrán",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_HIDRO_EST_martes_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_HIDRO_EST",
    "grupo_principal_id": "grupo_G1_HIDRO_EST",
    "componente_grupo_id": "comp_curso_HIDRO_EST",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_bjuarez"
    ],
    "profesor_principal_id": "prof_bjuarez",
    "profesor_nombre": "Dr. Braulio Juárez Araiza",
    "nombre_visible": "Introducción a la Hidrodinámica de Estuarios (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "martes",
    "hora_inicio": "10:00",
    "hora_fin": "11:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dr. Braulio Juárez Araiza",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_HIDRO_EST_jueves_1200",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_HIDRO_EST",
    "grupo_principal_id": "grupo_G1_HIDRO_EST",
    "componente_grupo_id": "comp_curso_HIDRO_EST",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_bjuarez"
    ],
    "profesor_principal_id": "prof_bjuarez",
    "profesor_nombre": "Dr. Braulio Juárez Araiza",
    "nombre_visible": "Introducción a la Hidrodinámica de Estuarios (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "jueves",
    "hora_inicio": "12:00",
    "hora_fin": "14:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 CPB - Dr. Braulio Juárez Araiza",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_MOD_OCE_martes_1300",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_MOD_OCE",
    "grupo_principal_id": "grupo_G1_MOD_OCE",
    "componente_grupo_id": "comp_curso_MOD_OCE",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_palvarado",
      "prof_stanahara",
      "prof_reaton"
    ],
    "profesor_principal_id": "prof_palvarado",
    "profesor_nombre": "Dra. Patricia Alvarado Graef, Dra. Sarayda Aimé Tanahara Romero y Dr. Ricardo Bernardino Eaton González",
    "nombre_visible": "Modelación Numérica del Océano (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "martes",
    "hora_inicio": "13:00",
    "hora_fin": "15:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 CPB - Dra. Patricia Alvarado Graef, Dra. Sarayda Aimé Tanahara Romero y Dr. Ricardo Bernardino Eaton González",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_MOD_OCE_viernes_1300",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_MOD_OCE",
    "grupo_principal_id": "grupo_G1_MOD_OCE",
    "componente_grupo_id": "comp_curso_MOD_OCE",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_palvarado",
      "prof_stanahara",
      "prof_reaton"
    ],
    "profesor_principal_id": "prof_palvarado",
    "profesor_nombre": "Dra. Patricia Alvarado Graef, Dra. Sarayda Aimé Tanahara Romero y Dr. Ricardo Bernardino Eaton González",
    "nombre_visible": "Modelación Numérica del Océano (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "viernes",
    "hora_inicio": "13:00",
    "hora_fin": "15:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dra. Patricia Alvarado Graef, Dra. Sarayda Aimé Tanahara Romero y Dr. Ricardo Bernardino Eaton González",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SEM_TESIS_lunes_1400",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SEM_TESIS",
    "grupo_principal_id": "grupo_G1_SEM_TESIS",
    "componente_grupo_id": "comp_curso_SEM_TESIS",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_nmillan"
    ],
    "profesor_principal_id": "prof_nmillan",
    "profesor_nombre": "Dra. Natalie Millán Aguiñaga",
    "nombre_visible": "Seminario de Tesis (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SPD",
    "espacio_codigo_snapshot": "E-14 SPD",
    "espacio_nombre_snapshot": "Sala de Procesamiento de Datos Oceanográficos",
    "dia": "lunes",
    "hora_inicio": "14:00",
    "hora_fin": "16:00",
    "tipo_componente": "seminario",
    "tipo_sesion": "T",
    "alumnos_programados": 20,
    "capacidad_espacio": 20,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 SPD - Dra. Natalie Millán Aguiñaga",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_AVANCE_TESIS_I_martes_1500",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_AVANCE_TESIS_I",
    "grupo_principal_id": "grupo_G1_AVANCE_TESIS_I",
    "componente_grupo_id": "comp_curso_AVANCE_TESIS_I",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_vfernandez"
    ],
    "profesor_principal_id": "prof_vfernandez",
    "profesor_nombre": "Dra. Violeta Zetzangari Fernández Díaz",
    "nombre_visible": "Avance de Tesis I (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "martes",
    "hora_inicio": "15:00",
    "hora_fin": "17:00",
    "tipo_componente": "seminario",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dra. Violeta Zetzangari Fernández Díaz",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_AVANCE_TESIS_II_lunes_1700",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_AVANCE_TESIS_II",
    "grupo_principal_id": "grupo_G1_AVANCE_TESIS_II",
    "componente_grupo_id": "comp_curso_AVANCE_TESIS_II",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "admin_igiffard"
    ],
    "profesor_principal_id": "admin_igiffard",
    "profesor_nombre": "Dra. Ivone Giffard Mena",
    "nombre_visible": "Avance de Tesis II (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "lunes",
    "hora_inicio": "17:00",
    "hora_fin": "19:00",
    "tipo_componente": "seminario",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dra. Ivone Giffard Mena",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SIST_SOCIOECOL_jueves_1700",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SIST_SOCIOECOL",
    "grupo_principal_id": "grupo_G1_SIST_SOCIOECOL",
    "componente_grupo_id": "comp_curso_SIST_SOCIOECOL",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_jazepeda"
    ],
    "profesor_principal_id": "prof_jazepeda",
    "profesor_nombre": "Dr. José Alberto Zepeda Domínguez",
    "nombre_visible": "Análisis de sistemas socioecológicos (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "jueves",
    "hora_inicio": "17:00",
    "hora_fin": "18:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 CPB - Dr. José Alberto Zepeda Domínguez",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SIST_SOCIOECOL_jueves_1800",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SIST_SOCIOECOL",
    "grupo_principal_id": "grupo_G1_SIST_SOCIOECOL",
    "componente_grupo_id": "comp_curso_SIST_SOCIOECOL",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_jazepeda"
    ],
    "profesor_principal_id": "prof_jazepeda",
    "profesor_nombre": "Dr. José Alberto Zepeda Domínguez",
    "nombre_visible": "Análisis de sistemas socioecológicos (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "jueves",
    "hora_inicio": "18:00",
    "hora_fin": "20:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dr. José Alberto Zepeda Domínguez",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SIST_SOCIOECOL_viernes_2000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SIST_SOCIOECOL",
    "grupo_principal_id": "grupo_G1_SIST_SOCIOECOL",
    "componente_grupo_id": "comp_curso_SIST_SOCIOECOL",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_jazepeda"
    ],
    "profesor_principal_id": "prof_jazepeda",
    "profesor_nombre": "Dr. José Alberto Zepeda Domínguez",
    "nombre_visible": "Análisis de sistemas socioecológicos (P)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "viernes",
    "hora_inicio": "20:00",
    "hora_fin": "21:00",
    "tipo_componente": "practica",
    "tipo_sesion": "P",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial P en E-14 CPB - Dr. José Alberto Zepeda Domínguez",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_ECOFIS_MACRO_miercoles_1900",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_ECOFIS_MACRO",
    "grupo_principal_id": "grupo_G1_ECOFIS_MACRO",
    "componente_grupo_id": "comp_curso_ECOFIS_MACRO",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_jmsandoval"
    ],
    "profesor_principal_id": "prof_jmsandoval",
    "profesor_nombre": "Dr. José Miguel Sandoval Gil",
    "nombre_visible": "Ecofisiología de Macrófitas Marinas (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_VIR",
    "espacio_codigo_snapshot": "VIR",
    "espacio_nombre_snapshot": "Modalidad Virtual",
    "dia": "miercoles",
    "hora_inicio": "19:00",
    "hora_fin": "21:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 20,
    "capacidad_espacio": 100,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en VIR - Dr. José Miguel Sandoval Gil",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_ECOFIS_MACRO_miercoles_2100",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_ECOFIS_MACRO",
    "grupo_principal_id": "grupo_G1_ECOFIS_MACRO",
    "componente_grupo_id": "comp_curso_ECOFIS_MACRO",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_jmsandoval"
    ],
    "profesor_principal_id": "prof_jmsandoval",
    "profesor_nombre": "Dr. José Miguel Sandoval Gil",
    "nombre_visible": "Ecofisiología de Macrófitas Marinas (L)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_VIR",
    "espacio_codigo_snapshot": "VIR",
    "espacio_nombre_snapshot": "Modalidad Virtual",
    "dia": "miercoles",
    "hora_inicio": "21:00",
    "hora_fin": "22:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "L",
    "alumnos_programados": 20,
    "capacidad_espacio": 100,
    "estatus": "confirmado",
    "notas": "Sesión oficial L en VIR - Dr. José Miguel Sandoval Gil",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_ECOL_MOL_martes_0700",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_ECOL_MOL",
    "grupo_principal_id": "grupo_G2_ECOL_MOL",
    "componente_grupo_id": "comp_curso_ECOL_MOL",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_lenriquez"
    ],
    "profesor_principal_id": "prof_lenriquez",
    "profesor_nombre": "Dr. Luis Manuel Enríquez Paredes",
    "nombre_visible": "Ecología Molecular (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_TOA",
    "espacio_codigo_snapshot": "E-56 TOA",
    "espacio_nombre_snapshot": "Salón Totoaba A",
    "dia": "martes",
    "hora_inicio": "07:00",
    "hora_fin": "09:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 30,
    "capacidad_espacio": 35,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-56 TOA - Dr. Luis Manuel Enríquez Paredes",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_ECOL_MOL_jueves_0700",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_ECOL_MOL",
    "grupo_principal_id": "grupo_G2_ECOL_MOL",
    "componente_grupo_id": "comp_curso_ECOL_MOL",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_lenriquez"
    ],
    "profesor_principal_id": "prof_lenriquez",
    "profesor_nombre": "Dr. Luis Manuel Enríquez Paredes",
    "nombre_visible": "Ecología Molecular (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_TOA",
    "espacio_codigo_snapshot": "E-56 TOA",
    "espacio_nombre_snapshot": "Salón Totoaba A",
    "dia": "jueves",
    "hora_inicio": "07:00",
    "hora_fin": "09:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 30,
    "capacidad_espacio": 35,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-56 TOA - Dr. Luis Manuel Enríquez Paredes",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_AVANCE_TESIS_III_miercoles_0700",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_AVANCE_TESIS_III",
    "grupo_principal_id": "grupo_G2_AVANCE_TESIS_III",
    "componente_grupo_id": "comp_curso_AVANCE_TESIS_III",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_lenriquez"
    ],
    "profesor_principal_id": "prof_lenriquez",
    "profesor_nombre": "Dr. Luis Manuel Enríquez Paredes",
    "nombre_visible": "Avance de Tesis III (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_TOA",
    "espacio_codigo_snapshot": "E-56 TOA",
    "espacio_nombre_snapshot": "Salón Totoaba A",
    "dia": "miercoles",
    "hora_inicio": "07:00",
    "hora_fin": "09:00",
    "tipo_componente": "seminario",
    "tipo_sesion": "T",
    "alumnos_programados": 30,
    "capacidad_espacio": 35,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-56 TOA - Dr. Luis Manuel Enríquez Paredes",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_PROGRAMACION_lunes_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_PROGRAMACION",
    "grupo_principal_id": "grupo_G2_PROGRAMACION",
    "componente_grupo_id": "comp_curso_PROGRAMACION",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_hgnava"
    ],
    "profesor_principal_id": "prof_hgnava",
    "profesor_nombre": "Dr. Héctor García Nava",
    "nombre_visible": "Programación (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "lunes",
    "hora_inicio": "10:00",
    "hora_fin": "11:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-25 SP1 - Dr. Héctor García Nava",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_PROGRAMACION_viernes_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_PROGRAMACION",
    "grupo_principal_id": "grupo_G2_PROGRAMACION",
    "componente_grupo_id": "comp_curso_PROGRAMACION",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_hgnava"
    ],
    "profesor_principal_id": "prof_hgnava",
    "profesor_nombre": "Dr. Héctor García Nava",
    "nombre_visible": "Programación (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "viernes",
    "hora_inicio": "10:00",
    "hora_fin": "12:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-25 SP1 - Dr. Héctor García Nava",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SEM_ACUACULTURA_miercoles_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SEM_ACUACULTURA",
    "grupo_principal_id": "grupo_G2_SEM_ACUACULTURA",
    "componente_grupo_id": "comp_curso_SEM_ACUACULTURA",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_tolivares",
      "prof_scastellanos"
    ],
    "profesor_principal_id": "prof_tolivares",
    "profesor_nombre": "Dra. Tatiana Nenetzen Olivares Bañuelos y Dra. Sheila Castellanos Martínez",
    "nombre_visible": "Seminario de Acuacultura (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_VIR",
    "espacio_codigo_snapshot": "VIR",
    "espacio_nombre_snapshot": "Modalidad Virtual",
    "dia": "miercoles",
    "hora_inicio": "10:00",
    "hora_fin": "12:00",
    "tipo_componente": "seminario",
    "tipo_sesion": "T",
    "alumnos_programados": 20,
    "capacidad_espacio": 100,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en VIR - Dra. Tatiana Nenetzen Olivares Bañuelos y Dra. Sheila Castellanos Martínez",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_PROC_LITORALES_martes_1100",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_PROC_LITORALES",
    "grupo_principal_id": "grupo_G2_PROC_LITORALES",
    "componente_grupo_id": "comp_curso_PROC_LITORALES",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_ngudino"
    ],
    "profesor_principal_id": "prof_ngudino",
    "profesor_nombre": "Dr. Napoleón Gudiño Elizondo",
    "nombre_visible": "Procesos Litorales y Manejo de la Erosión Costera (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "martes",
    "hora_inicio": "11:00",
    "hora_fin": "13:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-25 SP1 - Dr. Napoleón Gudiño Elizondo",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_PROC_LITORALES_jueves_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_PROC_LITORALES",
    "grupo_principal_id": "grupo_G2_PROC_LITORALES",
    "componente_grupo_id": "comp_curso_PROC_LITORALES",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_ngudino"
    ],
    "profesor_principal_id": "prof_ngudino",
    "profesor_nombre": "Dr. Napoleón Gudiño Elizondo",
    "nombre_visible": "Procesos Litorales y Manejo de la Erosión Costera (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "jueves",
    "hora_inicio": "10:00",
    "hora_fin": "11:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-25 SP1 - Dr. Napoleón Gudiño Elizondo",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_PROC_LITORALES_martes_1700",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_PROC_LITORALES",
    "grupo_principal_id": "grupo_G2_PROC_LITORALES",
    "componente_grupo_id": "comp_curso_PROC_LITORALES",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_ngudino"
    ],
    "profesor_principal_id": "prof_ngudino",
    "profesor_nombre": "Dr. Napoleón Gudiño Elizondo",
    "nombre_visible": "Procesos Litorales y Manejo de la Erosión Costera (P)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (Espacio por definir)",
    "dia": "martes",
    "hora_inicio": "17:00",
    "hora_fin": "18:00",
    "tipo_componente": "practica",
    "tipo_sesion": "P",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial P en E-25 SP1 - Dr. Napoleón Gudiño Elizondo",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_PAT_BIOSEG_lunes_1200",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_PAT_BIOSEG",
    "grupo_principal_id": "grupo_G2_PAT_BIOSEG",
    "componente_grupo_id": "comp_curso_PAT_BIOSEG",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_odelrio",
      "prof_scastellanos"
    ],
    "profesor_principal_id": "prof_odelrio",
    "profesor_nombre": "Dr. Oscar Basilio del Río Zaragoza y Dra. Sheila Castellanos Martínez",
    "nombre_visible": "Patología y Bioseguridad Acuícola (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "lunes",
    "hora_inicio": "12:00",
    "hora_fin": "14:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 CPB - Dr. Oscar Basilio del Río Zaragoza y Dra. Sheila Castellanos Martínez",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_PAT_BIOSEG_miercoles_1200",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_PAT_BIOSEG",
    "grupo_principal_id": "grupo_G2_PAT_BIOSEG",
    "componente_grupo_id": "comp_curso_PAT_BIOSEG",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_odelrio",
      "prof_scastellanos"
    ],
    "profesor_principal_id": "prof_odelrio",
    "profesor_nombre": "Dr. Oscar Basilio del Río Zaragoza y Dra. Sheila Castellanos Martínez",
    "nombre_visible": "Patología y Bioseguridad Acuícola (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "miercoles",
    "hora_inicio": "12:00",
    "hora_fin": "14:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 CPB - Dr. Oscar Basilio del Río Zaragoza y Dra. Sheila Castellanos Martínez",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SIST_ACUA_martes_1300",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SIST_ACUA",
    "grupo_principal_id": "grupo_G2_SIST_ACUA",
    "componente_grupo_id": "comp_curso_SIST_ACUA",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_jgcorrea",
      "prof_fbarreto"
    ],
    "profesor_principal_id": "prof_jgcorrea",
    "profesor_nombre": "Dr. Juan Gabriel Correa Reyes y Dr. Fernando Barreto Curiel",
    "nombre_visible": "Sistemas en Acuacultura (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "martes",
    "hora_inicio": "13:00",
    "hora_fin": "15:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-25 SP1 - Dr. Juan Gabriel Correa Reyes y Dr. Fernando Barreto Curiel",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SIST_ACUA_jueves_1200",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SIST_ACUA",
    "grupo_principal_id": "grupo_G2_SIST_ACUA",
    "componente_grupo_id": "comp_curso_SIST_ACUA",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_jgcorrea",
      "prof_fbarreto"
    ],
    "profesor_principal_id": "prof_jgcorrea",
    "profesor_nombre": "Dr. Juan Gabriel Correa Reyes y Dr. Fernando Barreto Curiel",
    "nombre_visible": "Sistemas en Acuacultura (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "jueves",
    "hora_inicio": "12:00",
    "hora_fin": "13:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-25 SP1 - Dr. Juan Gabriel Correa Reyes y Dr. Fernando Barreto Curiel",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SIST_ACUA_jueves_1300",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SIST_ACUA",
    "grupo_principal_id": "grupo_G2_SIST_ACUA",
    "componente_grupo_id": "comp_curso_SIST_ACUA",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_jgcorrea",
      "prof_fbarreto"
    ],
    "profesor_principal_id": "prof_jgcorrea",
    "profesor_nombre": "Dr. Juan Gabriel Correa Reyes y Dr. Fernando Barreto Curiel",
    "nombre_visible": "Sistemas en Acuacultura (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "jueves",
    "hora_inicio": "13:00",
    "hora_fin": "14:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-25 SP1 - Dr. Juan Gabriel Correa Reyes y Dr. Fernando Barreto Curiel",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_COLOR_OCEANO_lunes_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_COLOR_OCEANO",
    "grupo_principal_id": "grupo_G3_COLOR_OCEANO",
    "componente_grupo_id": "comp_curso_COLOR_OCEANO",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_acastillo"
    ],
    "profesor_principal_id": "prof_acastillo",
    "profesor_nombre": "Dra. Alejandra de Jesús Castillo Ramírez",
    "nombre_visible": "Temas Selectos de Percepción Remota del Color del Océano (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SA",
    "espacio_codigo_snapshot": "E-14 SA",
    "espacio_nombre_snapshot": "Salón de Asesorías",
    "dia": "lunes",
    "hora_inicio": "10:00",
    "hora_fin": "12:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 15,
    "capacidad_espacio": 15,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 SA - Dra. Alejandra de Jesús Castillo Ramírez",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_COLOR_OCEANO_viernes_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_COLOR_OCEANO",
    "grupo_principal_id": "grupo_G3_COLOR_OCEANO",
    "componente_grupo_id": "comp_curso_COLOR_OCEANO",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_acastillo"
    ],
    "profesor_principal_id": "prof_acastillo",
    "profesor_nombre": "Dra. Alejandra de Jesús Castillo Ramírez",
    "nombre_visible": "Temas Selectos de Percepción Remota del Color del Océano (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SA",
    "espacio_codigo_snapshot": "E-14 SA",
    "espacio_nombre_snapshot": "Salón de Asesorías",
    "dia": "viernes",
    "hora_inicio": "10:00",
    "hora_fin": "12:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 15,
    "capacidad_espacio": 15,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-14 SA - Dra. Alejandra de Jesús Castillo Ramírez",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_ECOL_R_lunes_1200",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_ECOL_R",
    "grupo_principal_id": "grupo_G3_ECOL_R",
    "componente_grupo_id": "comp_curso_ECOL_R",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_lmalpica"
    ],
    "profesor_principal_id": "prof_lmalpica",
    "profesor_nombre": "Dr. Luis Malpica Cruz",
    "nombre_visible": "Ecological Data in R (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "lunes",
    "hora_inicio": "12:00",
    "hora_fin": "14:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-25 SP1 - Dr. Luis Malpica Cruz",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_ECOL_R_miercoles_1000",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_ECOL_R",
    "grupo_principal_id": "grupo_G3_ECOL_R",
    "componente_grupo_id": "comp_curso_ECOL_R",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_lmalpica"
    ],
    "profesor_principal_id": "prof_lmalpica",
    "profesor_nombre": "Dr. Luis Malpica Cruz",
    "nombre_visible": "Ecological Data in R (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "miercoles",
    "hora_inicio": "10:00",
    "hora_fin": "12:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-25 SP1 - Dr. Luis Malpica Cruz",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_BIOQ_NUT_ACU_martes_1100",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_BIOQ_NUT_ACU",
    "grupo_principal_id": "grupo_G3_BIOQ_NUT_ACU",
    "componente_grupo_id": "comp_curso_BIOQ_NUT_ACU",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_mgalaviz",
      "prof_fbarreto"
    ],
    "profesor_principal_id": "prof_mgalaviz",
    "profesor_nombre": "Dr. Mario Galaviz Espinoza y Dr. Fernando Barreto Curiel",
    "nombre_visible": "Bioquímica Nutricional Acuícola (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_CPB",
    "espacio_codigo_snapshot": "E-14 CPB",
    "espacio_nombre_snapshot": "Centro de Cómputo de Posgrado, Sala B",
    "dia": "martes",
    "hora_inicio": "11:00",
    "hora_fin": "13:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-14 CPB - Dr. Mario Galaviz Espinoza y Dr. Fernando Barreto Curiel",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_BIOQ_NUT_ACU_miercoles_1200",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_BIOQ_NUT_ACU",
    "grupo_principal_id": "grupo_G3_BIOQ_NUT_ACU",
    "componente_grupo_id": "comp_curso_BIOQ_NUT_ACU",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_mgalaviz",
      "prof_fbarreto"
    ],
    "profesor_principal_id": "prof_mgalaviz",
    "profesor_nombre": "Dr. Mario Galaviz Espinoza y Dr. Fernando Barreto Curiel",
    "nombre_visible": "Bioquímica Nutricional Acuícola (C)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_SP1",
    "espacio_codigo_snapshot": "E-25 SP1",
    "espacio_nombre_snapshot": "Salón de Posgrado 1 (IIO)",
    "dia": "miercoles",
    "hora_inicio": "12:00",
    "hora_fin": "14:00",
    "tipo_componente": "laboratorio",
    "tipo_sesion": "C",
    "alumnos_programados": 25,
    "capacidad_espacio": 25,
    "estatus": "confirmado",
    "notas": "Sesión oficial C en E-25 SP1 - Dr. Mario Galaviz Espinoza y Dr. Fernando Barreto Curiel",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SEM_BIOGEOQUIM_viernes_1200",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SEM_BIOGEOQUIM",
    "grupo_principal_id": "grupo_G3_SEM_BIOGEOQUIM",
    "componente_grupo_id": "comp_curso_SEM_BIOGEOQUIM",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_afelix",
      "prof_gsamperio"
    ],
    "profesor_principal_id": "prof_afelix",
    "profesor_nombre": "Dr. Armando Félix Bermúdez y Dr. Guillermo Alberto Samperio Ramos",
    "nombre_visible": "Seminario de Biogeoquímica Acuática Avanzado (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_AVI",
    "espacio_codigo_snapshot": "E-25 AVI",
    "espacio_nombre_snapshot": "Audiovisual IIO",
    "dia": "viernes",
    "hora_inicio": "12:00",
    "hora_fin": "14:00",
    "tipo_componente": "seminario",
    "tipo_sesion": "T",
    "alumnos_programados": 45,
    "capacidad_espacio": 45,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-25 AVI - Dr. Armando Félix Bermúdez y Dr. Guillermo Alberto Samperio Ramos",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_SEM_BIOGEOQUIM_viernes_1400",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_SEM_BIOGEOQUIM",
    "grupo_principal_id": "grupo_G3_SEM_BIOGEOQUIM",
    "componente_grupo_id": "comp_curso_SEM_BIOGEOQUIM",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_afelix",
      "prof_gsamperio"
    ],
    "profesor_principal_id": "prof_afelix",
    "profesor_nombre": "Dr. Armando Félix Bermúdez y Dr. Guillermo Alberto Samperio Ramos",
    "nombre_visible": "Seminario de Biogeoquímica Acuática Avanzado (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_AVI",
    "espacio_codigo_snapshot": "E-25 AVI",
    "espacio_nombre_snapshot": "Audiovisual IIO",
    "dia": "viernes",
    "hora_inicio": "14:00",
    "hora_fin": "16:00",
    "tipo_componente": "seminario",
    "tipo_sesion": "T",
    "alumnos_programados": 45,
    "capacidad_espacio": 45,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en E-25 AVI - Dr. Armando Félix Bermúdez y Dr. Guillermo Alberto Samperio Ramos",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_TUTORIA_A_lunes_1900",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_TUTORIA_A",
    "grupo_principal_id": "grupo_TUTORIA_A",
    "componente_grupo_id": "comp_curso_TUTORIA_A",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_auribe",
      "prof_aabadia",
      "prof_abraga",
      "prof_bjuarez",
      "prof_fbarreto",
      "prof_hgnava",
      "prof_jvaca",
      "prof_klugo",
      "prof_llopez",
      "prof_cdominguez",
      "prof_onorzagaray",
      "prof_odelrio",
      "prof_rbeas",
      "prof_jazepeda",
      "prof_jmsandoval",
      "prof_mgalaviz",
      "prof_mruiz",
      "prof_mtorres",
      "prof_msantiago",
      "prof_rcruz",
      "prof_gsamperio"
    ],
    "profesor_principal_id": "prof_auribe",
    "profesor_nombre": "Claustro de Tutores MCOC/DCOC (Grupo A)",
    "nombre_visible": "Tutoría Académica (Grupo A) (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_VIR",
    "espacio_codigo_snapshot": "VIR",
    "espacio_nombre_snapshot": "Modalidad Virtual (Sesión Tutorial A)",
    "dia": "lunes",
    "hora_inicio": "19:00",
    "hora_fin": "21:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 25,
    "capacidad_espacio": 100,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en VIR - Claustro de Tutores MCOC/DCOC (Grupo A)",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "asig_curso_TUTORIA_B_martes_1900",
    "periodo_id": "2027-1",
    "escenario_id": "oficial",
    "curso_id": "curso_TUTORIA_B",
    "grupo_principal_id": "grupo_TUTORIA_B",
    "componente_grupo_id": "comp_curso_TUTORIA_B",
    "nivel_programacion": "grupo_principal",
    "profesores_ids": [
      "prof_bjuarez",
      "prof_msantiago",
      "prof_fbarreto",
      "prof_jazepeda"
    ],
    "profesor_principal_id": "prof_bjuarez",
    "profesor_nombre": "Claustro de Tutores MCOC/DCOC (Grupo B)",
    "nombre_visible": "Tutoría Académica (Grupo B) (T)",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "nivel_educativo": "posgrado",
    "espacio_id": "espacio_VIR",
    "espacio_codigo_snapshot": "VIR",
    "espacio_nombre_snapshot": "Modalidad Virtual (Sesión Tutorial B)",
    "dia": "martes",
    "hora_inicio": "19:00",
    "hora_fin": "21:00",
    "tipo_componente": "teoria",
    "tipo_sesion": "T",
    "alumnos_programados": 10,
    "capacidad_espacio": 100,
    "estatus": "confirmado",
    "notas": "Sesión oficial T en VIR - Claustro de Tutores MCOC/DCOC (Grupo B)",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  }
];

export const PREFERENCIAS_INICIALES: PreferenciaDocente[] = [
  {
    "id": "pref_2027-1_prof_enriquezandrad",
    "periodo_id": "2027-1",
    "profesor_id": "prof_enriquezandrad",
    "profesor_nombre": "Dr. Enriquez Andrade Roberto Ramón",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_trueconaldavid",
    "periodo_id": "2027-1",
    "profesor_id": "prof_trueconaldavid",
    "profesor_nombre": "Dr. Conal David True",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_arredondogarci",
    "periodo_id": "2027-1",
    "profesor_id": "prof_arredondogarci",
    "profesor_nombre": "Dra. María Concepción Arredondo García",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_villegasvicenc",
    "periodo_id": "2027-1",
    "profesor_id": "prof_villegasvicenc",
    "profesor_nombre": "Dr. Luis Javier Villegas Vicencio",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_wagnergutierre",
    "periodo_id": "2027-1",
    "profesor_id": "prof_wagnergutierre",
    "profesor_nombre": "Dr. Juan Manuel Wagner Gutiérrez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_schrammurrutia",
    "periodo_id": "2027-1",
    "profesor_id": "prof_schrammurrutia",
    "profesor_nombre": "Dra. Yolanda Schramm Urrutia",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jvaca",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jvaca",
    "profesor_nombre": "Dr. Juan Guillermo Vaca Rodríguez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 201",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43157",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lopezacunalusm",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lopezacunalusm",
    "profesor_nombre": "Dra. Lus Mercedes López Acuña",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_palvarado",
    "periodo_id": "2027-1",
    "profesor_id": "prof_palvarado",
    "profesor_nombre": "Dra. Patricia Alvarado Graef",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 115",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43145",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_spelzmaderoron",
    "periodo_id": "2027-1",
    "profesor_id": "prof_spelzmaderoron",
    "profesor_nombre": "Dr. Ronald Michael Spelz Madero",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_garciagastelum",
    "periodo_id": "2027-1",
    "profesor_id": "prof_garciagastelum",
    "profesor_nombre": "Dr. Alejandro García Gastélum",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_bmartin",
    "periodo_id": "2027-1",
    "profesor_id": "prof_bmartin",
    "profesor_nombre": "Dra. Beatriz Martín Atienza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 · Cubículo 104",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43120",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gonzalezsilver",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gonzalezsilver",
    "profesor_nombre": "Dra. Adriana González Silvera",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gsandoval",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gsandoval",
    "profesor_nombre": "Dr. Gerardo Sandoval Garibaldi",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lenriquez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lenriquez",
    "profesor_nombre": "Dr. Luis Manuel Enríquez Paredes",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 17 · Cubículo 105",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43135",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_reaton",
    "periodo_id": "2027-1",
    "profesor_id": "prof_reaton",
    "profesor_nombre": "Dr. Ricardo Bernardino Eaton González",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_seingiergeorge",
    "periodo_id": "2027-1",
    "profesor_id": "prof_seingiergeorge",
    "profesor_nombre": "Dr. Georges Seingier",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_admin_igiffard",
    "periodo_id": "2027-1",
    "profesor_id": "admin_igiffard",
    "profesor_nombre": "Dra. Ivone Giffard Mena",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 (Dirección) · Cubículo Subdirección",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43102",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_mtorres",
    "periodo_id": "2027-1",
    "profesor_id": "prof_mtorres",
    "profesor_nombre": "Dra. Mónica Torres Beltrán",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 · Cubículo 108",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43118",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_riverahuertahi",
    "periodo_id": "2027-1",
    "profesor_id": "prof_riverahuertahi",
    "profesor_nombre": "Dr. Hiram Rivera Huerta",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_tanahararomero",
    "periodo_id": "2027-1",
    "profesor_id": "prof_tanahararomero",
    "profesor_nombre": "Dra. Tanahara Romero Sarayda Aimé",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_moraleschavezr",
    "periodo_id": "2027-1",
    "profesor_id": "prof_moraleschavezr",
    "profesor_nombre": "Dr. Rafael Morales Chávez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_cardozacontrer",
    "periodo_id": "2027-1",
    "profesor_id": "prof_cardozacontrer",
    "profesor_nombre": "Dra. Cardoza Contreras Marlene Nohemi",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_velazquezgonza",
    "periodo_id": "2027-1",
    "profesor_id": "prof_velazquezgonza",
    "profesor_nombre": "Dra. Ernestina Karen Velázquez González",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_vfernandez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_vfernandez",
    "profesor_nombre": "Dra. Violeta Zetzangari Fernández Díaz",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 205",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43160",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_mgalaviz",
    "periodo_id": "2027-1",
    "profesor_id": "prof_mgalaviz",
    "profesor_nombre": "Dr. Mario Galaviz Espinoza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 · Cubículo 107",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43117",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_reyesortamaris",
    "periodo_id": "2027-1",
    "profesor_id": "prof_reyesortamaris",
    "profesor_nombre": "Dra. Marisa Reyes Orta",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_klugo",
    "periodo_id": "2027-1",
    "profesor_id": "prof_klugo",
    "profesor_nombre": "Dra. Karina del Carmen Lugo Ibarra",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 17 · Cubículo 106",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43134",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jaramontanezro",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jaramontanezro",
    "profesor_nombre": "Dra. Rosario Jara Montañez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_mruiz",
    "periodo_id": "2027-1",
    "profesor_id": "prof_mruiz",
    "profesor_nombre": "Dra. Mary Carmen Ruíz de la Torre",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 · Cubículo 105",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43116",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_sancheznavaama",
    "periodo_id": "2027-1",
    "profesor_id": "prof_sancheznavaama",
    "profesor_nombre": "Dra. Amara Thaydé Sánchez Nava",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_floresmoralesa",
    "periodo_id": "2027-1",
    "profesor_id": "prof_floresmoralesa",
    "profesor_nombre": "Dra. Ana Laura Flores Morales",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_rbeas",
    "periodo_id": "2027-1",
    "profesor_id": "prof_rbeas",
    "profesor_nombre": "Dr. Rodrigo Beas Luna",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 206",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43164",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_aabadia",
    "periodo_id": "2027-1",
    "profesor_id": "prof_aabadia",
    "profesor_nombre": "Dra. Alicia Abadía Cardoso",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 17 · Cubículo 102",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43131",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_vivancoarandam",
    "periodo_id": "2027-1",
    "profesor_id": "prof_vivancoarandam",
    "profesor_nombre": "Dra. Miroslava Vivanco Aranda",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_evangelistaher",
    "periodo_id": "2027-1",
    "profesor_id": "prof_evangelistaher",
    "profesor_nombre": "Dra. Viridiana Evangelista Hernández",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_fbarreto",
    "periodo_id": "2027-1",
    "profesor_id": "prof_fbarreto",
    "profesor_nombre": "Dr. Fernando Barreto Curiel",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 202",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43158",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_herreragutierr",
    "periodo_id": "2027-1",
    "profesor_id": "prof_herreragutierr",
    "profesor_nombre": "Dr. Ángel Raúl Herrera Gutiérrez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_yarbuhlugousam",
    "periodo_id": "2027-1",
    "profesor_id": "prof_yarbuhlugousam",
    "profesor_nombre": "Dr. Usama Ismael Yarbuh Lugo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_nmillan",
    "periodo_id": "2027-1",
    "profesor_id": "prof_nmillan",
    "profesor_nombre": "Dra. Natalie Millán Aguiñaga",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 (SPD) · Cubículo 102",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43105",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_villegasmendoz",
    "periodo_id": "2027-1",
    "profesor_id": "prof_villegasmendoz",
    "profesor_nombre": "Dr. Josué Rodolfo Villegas Mendoza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lopezcalderonj",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lopezcalderonj",
    "profesor_nombre": "Dr. Jorge Manuel López Calderón",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_mejiapinakarla",
    "periodo_id": "2027-1",
    "profesor_id": "prof_mejiapinakarla",
    "profesor_nombre": "Dra. Karla Gabriela Mejía Piña",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_msantiago",
    "periodo_id": "2027-1",
    "profesor_id": "prof_msantiago",
    "profesor_nombre": "Dr. Mauro Wilfrido Santiago García",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 118",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43149",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jazepeda",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jazepeda",
    "profesor_nombre": "Dr. José Alberto Zepeda Domínguez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 209",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43163",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lubinskyjinich",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lubinskyjinich",
    "profesor_nombre": "Dra. Mónica Lubinsky Jinich",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lopezcastillej",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lopezcastillej",
    "profesor_nombre": "Dr. Julio López Castillejos",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_arenasislasdia",
    "periodo_id": "2027-1",
    "profesor_id": "prof_arenasislasdia",
    "profesor_nombre": "Dra. Diana Arenas Islas",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_cdominguez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_cdominguez",
    "profesor_nombre": "Dr. Carlos Alejandro Domínguez Pérez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 114",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43147",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_romeroarteagaa",
    "periodo_id": "2027-1",
    "profesor_id": "prof_romeroarteagaa",
    "profesor_nombre": "Dra. Angélica María Romero Arteaga",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jgcorreaperez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jgcorreaperez",
    "profesor_nombre": "Dr. Juan Gabriel Correa Pérez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_acastillo",
    "periodo_id": "2027-1",
    "profesor_id": "prof_acastillo",
    "profesor_nombre": "Dra. Alejandra de Jesús Castillo Ramírez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 · Cubículo 106",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43115",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_villasusopalom",
    "periodo_id": "2027-1",
    "profesor_id": "prof_villasusopalom",
    "profesor_nombre": "Dr. Villasuso Palomares Salvador",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gomezhernandez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gomezhernandez",
    "profesor_nombre": "Dra. Guadalupe Gómez Hernández",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_saenzavalosmar",
    "periodo_id": "2027-1",
    "profesor_id": "prof_saenzavalosmar",
    "profesor_nombre": "Dra. Mariana Ana Laura Saenz-Ávalos",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jennyferschong",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jennyferschong",
    "profesor_nombre": "Dra. Jennyfers Chong Robles",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gustavoalexisc",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gustavoalexisc",
    "profesor_nombre": "Dr. Gustavo Alexis Cardenas López",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_victormanuello",
    "periodo_id": "2027-1",
    "profesor_id": "prof_victormanuello",
    "profesor_nombre": "Dr. Victor Manuel Lomeli Quintero",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_astridhernande",
    "periodo_id": "2027-1",
    "profesor_id": "prof_astridhernande",
    "profesor_nombre": "Dra. Astrid Hernández Cruz",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_poulettecaroli",
    "periodo_id": "2027-1",
    "profesor_id": "prof_poulettecaroli",
    "profesor_nombre": "Dra. Poulette Carolina Álvarez Rosales",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_eulalioarambul",
    "periodo_id": "2027-1",
    "profesor_id": "prof_eulalioarambul",
    "profesor_nombre": "Dr. Eulalio Arámbul Muñoz",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_abraga",
    "periodo_id": "2027-1",
    "profesor_id": "prof_abraga",
    "profesor_nombre": "Dr. Andre Luiz Braga de Souza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 222",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43232",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_victorfroylanc",
    "periodo_id": "2027-1",
    "profesor_id": "prof_victorfroylanc",
    "profesor_nombre": "Dr. Victor Froylán Camacho Ibar",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_scastellanos",
    "periodo_id": "2027-1",
    "profesor_id": "prof_scastellanos",
    "profesor_nombre": "Dra. Sheila Castellanos Martínez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 17 · Cubículo 110",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43138",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gabrielayareli",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gabrielayareli",
    "profesor_nombre": "Dra. Gabriela Yareli Cervantes Díaz",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jgcorrea",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jgcorrea",
    "profesor_nombre": "Dr. Juan Gabriel Correa Reyes",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 215",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43225",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_rcruz",
    "periodo_id": "2027-1",
    "profesor_id": "prof_rcruz",
    "profesor_nombre": "Dr. Ricardo Cruz López",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 225",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43235",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_eduardoamircue",
    "periodo_id": "2027-1",
    "profesor_id": "prof_eduardoamircue",
    "profesor_nombre": "Dr. Eduardo Amir Cuevas Flores",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_luiswalterdaes",
    "periodo_id": "2027-1",
    "profesor_id": "prof_luiswalterdaes",
    "profesor_nombre": "Dr. Luis Walter Daessle Heuser",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_odelrio",
    "periodo_id": "2027-1",
    "profesor_id": "prof_odelrio",
    "profesor_nombre": "Dr. Oscar Basilio del Rio Zaragoza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 17 · Cubículo 108",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43136",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_franciscodelga",
    "periodo_id": "2027-1",
    "profesor_id": "prof_franciscodelga",
    "profesor_nombre": "Dr. Francisco Delgadillo Hinojosa",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_afelix",
    "periodo_id": "2027-1",
    "profesor_id": "prof_afelix",
    "profesor_nombre": "Dr. Armando Félix Bermudez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 220",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43230",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_alejandraferre",
    "periodo_id": "2027-1",
    "profesor_id": "prof_alejandraferre",
    "profesor_nombre": "Dra. Alejandra Ferreira Arrieta",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_hgnava",
    "periodo_id": "2027-1",
    "profesor_id": "prof_hgnava",
    "profesor_nombre": "Dr. Hector García Nava",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 210",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43220",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_ngudino",
    "periodo_id": "2027-1",
    "profesor_id": "prof_ngudino",
    "profesor_nombre": "Dr. Napoleon Gudiño Elizondo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 212",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43222",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_ricardoaarongu",
    "periodo_id": "2027-1",
    "profesor_id": "prof_ricardoaarongu",
    "profesor_nombre": "Dr. Ricardo Aaron Gutiérrez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_josemanuelguzm",
    "periodo_id": "2027-1",
    "profesor_id": "prof_josemanuelguzm",
    "profesor_nombre": "Dr. Jose Manuel Guzman Calderon",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_ramirohernande",
    "periodo_id": "2027-1",
    "profesor_id": "prof_ramirohernande",
    "profesor_nombre": "Dr. Ramiro Hernández García",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_felixaugustohe",
    "periodo_id": "2027-1",
    "profesor_id": "prof_felixaugustohe",
    "profesor_nombre": "Dr. Félix Augusto Hernández Guzman",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_bjuarez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_bjuarez",
    "profesor_nombre": "Dr. Braulio Juarez Araiza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 112",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43144",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jessicaabethla",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jessicaabethla",
    "profesor_nombre": "Dra. Jessica Abeth Lagos Fregoso",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_cristinalandac",
    "periodo_id": "2027-1",
    "profesor_id": "prof_cristinalandac",
    "profesor_nombre": "Dra. Cristina Landa Cansigno",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_juanaclaudiale",
    "periodo_id": "2027-1",
    "profesor_id": "prof_juanaclaudiale",
    "profesor_nombre": "Dra. Juana Claudia Leyva Aguilera",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_llopez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_llopez",
    "profesor_nombre": "Dra. Laura Liliana López Galindo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 208",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43215",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_victoralfonsom",
    "periodo_id": "2027-1",
    "profesor_id": "prof_victoralfonsom",
    "profesor_nombre": "Dr. Victor Alfonso Macias Carranza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lmalpica",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lmalpica",
    "profesor_nombre": "Dr. Luis Malpica Cruz",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 218",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43228",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_leopoldoguille",
    "periodo_id": "2027-1",
    "profesor_id": "prof_leopoldoguille",
    "profesor_nombre": "Dr. Leopoldo Guillermo Mendoza Espinosa",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_onorzagaray",
    "periodo_id": "2027-1",
    "profesor_id": "prof_onorzagaray",
    "profesor_nombre": "Dr. Carlos Orión Norzagaray López",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 208",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43161",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_tolivares",
    "periodo_id": "2027-1",
    "profesor_id": "prof_tolivares",
    "profesor_nombre": "Dra. Tatiana Nenetzen Olivares Bañuelos",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 207",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43162",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_alexandroorozc",
    "periodo_id": "2027-1",
    "profesor_id": "prof_alexandroorozc",
    "profesor_nombre": "Dr. Alexandro Orozco Duran",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_emyrsaulpenama",
    "periodo_id": "2027-1",
    "profesor_id": "prof_emyrsaulpenama",
    "profesor_nombre": "Dr. Emyr Saúl Peña Marin",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_cristinaquezad",
    "periodo_id": "2027-1",
    "profesor_id": "prof_cristinaquezad",
    "profesor_nombre": "Dra. Cristina Quezada Hernández",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_nancyramirezal",
    "periodo_id": "2027-1",
    "profesor_id": "prof_nancyramirezal",
    "profesor_nombre": "Dra. Nancy Ramírez Álvarez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_mauriciomoises",
    "periodo_id": "2027-1",
    "profesor_id": "prof_mauriciomoises",
    "profesor_nombre": "Dr. Mauricio Moisés Reyes Bravo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_isaacrodriguez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_isaacrodriguez",
    "profesor_nombre": "Dr. Isaac Rodríguez Padilla",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_marianasanchez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_marianasanchez",
    "profesor_nombre": "Dra. Mariana Sánchez Barredo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_hildajanetsanc",
    "periodo_id": "2027-1",
    "profesor_id": "prof_hildajanetsanc",
    "profesor_nombre": "Dra. Hilda Janet Sánchez Sánchez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jmsandoval",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jmsandoval",
    "profesor_nombre": "Dr. Jose Miguel Sandoval Gil",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 17 · Cubículo 103",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43132",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_hortenciasilva",
    "periodo_id": "2027-1",
    "profesor_id": "prof_hortenciasilva",
    "profesor_nombre": "Dra. Hortencia Silva Jiménez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_mariadanielata",
    "periodo_id": "2027-1",
    "profesor_id": "prof_mariadanielata",
    "profesor_nombre": "Dra. Maria Daniela Tazzo Rangel",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_eunisevanessat",
    "periodo_id": "2027-1",
    "profesor_id": "prof_eunisevanessat",
    "profesor_nombre": "Dra. Eunise Vanessa Torres Delgado",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_christinaveron",
    "periodo_id": "2027-1",
    "profesor_id": "prof_christinaveron",
    "profesor_nombre": "Dra. Christina Veronica Treinen Crespo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jacobalbertova",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jacobalbertova",
    "profesor_nombre": "Dr. Jacob Alberto Valdivieso Ojeda",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_joseaugustoval",
    "periodo_id": "2027-1",
    "profesor_id": "prof_joseaugustoval",
    "profesor_nombre": "Dr. Jose Augusto Valencia Gasti",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_enriquevalenzu",
    "periodo_id": "2027-1",
    "profesor_id": "prof_enriquevalenzu",
    "profesor_nombre": "Dr. Enrique Valenzuela Wood",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jorgearmandove",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jorgearmandove",
    "profesor_nombre": "Dr. Jorge Armando Velásquez Aristizábal",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_mariateresavia",
    "periodo_id": "2027-1",
    "profesor_id": "prof_mariateresavia",
    "profesor_nombre": "Dra. Maria Teresa Viana Castrillón",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_marianavillada",
    "periodo_id": "2027-1",
    "profesor_id": "prof_marianavillada",
    "profesor_nombre": "Dra. Mariana Villada Canela",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_amaiaruizdeale",
    "periodo_id": "2027-1",
    "profesor_id": "prof_amaiaruizdeale",
    "profesor_nombre": "Dra. Amaia Ruiz de Alegría Arzaburu",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_omarezequielag",
    "periodo_id": "2027-1",
    "profesor_id": "prof_omarezequielag",
    "profesor_nombre": "Dr. Omar Ezequiel Aguillón Hernández",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_nancyalarconge",
    "periodo_id": "2027-1",
    "profesor_id": "prof_nancyalarconge",
    "profesor_nombre": "Dra. Nancy Alarcon Geraldo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lucycoralalarc",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lucycoralalarc",
    "profesor_nombre": "Dra. Lucy Coral Alarcon Ortega",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_dantenocalvare",
    "periodo_id": "2027-1",
    "profesor_id": "prof_dantenocalvare",
    "profesor_nombre": "Dr. Dantenoc Álvarez Millan",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_osmarrobertoar",
    "periodo_id": "2027-1",
    "profesor_id": "prof_osmarrobertoar",
    "profesor_nombre": "Dr. Osmar Roberto Araujo Leyva",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_josepedroarces",
    "periodo_id": "2027-1",
    "profesor_id": "prof_josepedroarces",
    "profesor_nombre": "Dr. Jose Pedro Arce Serrano",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gabrieladejesu",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gabrieladejesu",
    "profesor_nombre": "Dra. Gabriela de Jesus Arreguín Rodríguez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_brendaguadalup",
    "periodo_id": "2027-1",
    "profesor_id": "prof_brendaguadalup",
    "profesor_nombre": "Dra. Brenda Guadalupe Bonett Calzada",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_karlaroxanacer",
    "periodo_id": "2027-1",
    "profesor_id": "prof_karlaroxanacer",
    "profesor_nombre": "Dra. Karla Roxana Cervantes Flores",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_luzdelourdesau",
    "periodo_id": "2027-1",
    "profesor_id": "prof_luzdelourdesau",
    "profesor_nombre": "Dra. Luz de Lourdes Aurora Coronado Álvarez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gabrieladelape",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gabrieladelape",
    "profesor_nombre": "Dra. Gabriela de la Peña Nettel",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_marianadelgado",
    "periodo_id": "2027-1",
    "profesor_id": "prof_marianadelgado",
    "profesor_nombre": "Dra. Mariana Delgado Fernandez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_guadalupediazg",
    "periodo_id": "2027-1",
    "profesor_id": "prof_guadalupediazg",
    "profesor_nombre": "Dra. Guadalupe Díaz Gutiérrez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_danielalbertod",
    "periodo_id": "2027-1",
    "profesor_id": "prof_danielalbertod",
    "profesor_nombre": "Dr. Daniel Alberto Díaz Guzman",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_juancarlosdomi",
    "periodo_id": "2027-1",
    "profesor_id": "prof_juancarlosdomi",
    "profesor_nombre": "Dr. Juan Carlos Dominguez Vargas",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_arturofajardoy",
    "periodo_id": "2027-1",
    "profesor_id": "prof_arturofajardoy",
    "profesor_nombre": "Dr. Arturo Fajardo Yamamoto",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_robertoantonio",
    "periodo_id": "2027-1",
    "profesor_id": "prof_robertoantonio",
    "profesor_nombre": "Dr. Roberto Antonio Flores Aguilar",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_brisamarisolfl",
    "periodo_id": "2027-1",
    "profesor_id": "prof_brisamarisolfl",
    "profesor_nombre": "Dra. Brisa Marisol Flores Miranda",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_berthagarciaca",
    "periodo_id": "2027-1",
    "profesor_id": "prof_berthagarciaca",
    "profesor_nombre": "Dra. Bertha García Capitanachi",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_almadeliagiles",
    "periodo_id": "2027-1",
    "profesor_id": "prof_almadeliagiles",
    "profesor_nombre": "Dra. Alma Delia Giles Guzman",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_elianagomezoca",
    "periodo_id": "2027-1",
    "profesor_id": "prof_elianagomezoca",
    "profesor_nombre": "Dra. Eliana Gomez Ocampo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_abrahamgonzale",
    "periodo_id": "2027-1",
    "profesor_id": "prof_abrahamgonzale",
    "profesor_nombre": "Dr. Abraham González Mena",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lizzgonzalezmo",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lizzgonzalezmo",
    "profesor_nombre": "Dra. Lizz González Moreno",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_luisandresguer",
    "periodo_id": "2027-1",
    "profesor_id": "prof_luisandresguer",
    "profesor_nombre": "Dr. Luis Andres Guerrero Murcia",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_dulceguadalupe",
    "periodo_id": "2027-1",
    "profesor_id": "prof_dulceguadalupe",
    "profesor_nombre": "Dra. Dulce Guadalupe Guillén Matus",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_claramariahere",
    "periodo_id": "2027-1",
    "profesor_id": "prof_claramariahere",
    "profesor_nombre": "Dra. Clara Maria Hereu",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_carlosemiliohe",
    "periodo_id": "2027-1",
    "profesor_id": "prof_carlosemiliohe",
    "profesor_nombre": "Dr. Carlos Emilio Hernández Rodríguez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_agustinjaimega",
    "periodo_id": "2027-1",
    "profesor_id": "prof_agustinjaimega",
    "profesor_nombre": "Dr. Agustin Jaime Garcilazo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_coniejaramonta",
    "periodo_id": "2027-1",
    "profesor_id": "prof_coniejaramonta",
    "profesor_nombre": "Dra. Conie Jara Montañez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_oscaralbertoji",
    "periodo_id": "2027-1",
    "profesor_id": "prof_oscaralbertoji",
    "profesor_nombre": "Dr. Oscar Alberto Jiménez Orocio",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_tadashikonomar",
    "periodo_id": "2027-1",
    "profesor_id": "prof_tadashikonomar",
    "profesor_nombre": "Dr. Tadashi Kono Martínez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_ernestolarioss",
    "periodo_id": "2027-1",
    "profesor_id": "prof_ernestolarioss",
    "profesor_nombre": "Dr. Ernesto Larios Soriano",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_lorenapatricia",
    "periodo_id": "2027-1",
    "profesor_id": "prof_lorenapatricia",
    "profesor_nombre": "Dra. Lorena Patricia Linacre Rojas",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_deniselubinsky",
    "periodo_id": "2027-1",
    "profesor_id": "prof_deniselubinsky",
    "profesor_nombre": "Dra. Denise Lubinsky Jinich",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_evnikazariname",
    "periodo_id": "2027-1",
    "profesor_id": "prof_evnikazariname",
    "profesor_nombre": "Dra. Evnika Zarina Medina Romo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_rebecamorenosa",
    "periodo_id": "2027-1",
    "profesor_id": "prof_rebecamorenosa",
    "profesor_nombre": "Dra. Rebeca Moreno Santoyo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_estrellaazalia",
    "periodo_id": "2027-1",
    "profesor_id": "prof_estrellaazalia",
    "profesor_nombre": "Dra. Estrella Azalia Nuñez Zarco",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_normalidiaoliv",
    "periodo_id": "2027-1",
    "profesor_id": "prof_normalidiaoliv",
    "profesor_nombre": "Dra. Norma Lidia Oliva Méndez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_carlosfrancisc",
    "periodo_id": "2027-1",
    "profesor_id": "prof_carlosfrancisc",
    "profesor_nombre": "Dr. Carlos Francisco Peynador Sánchez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gabrielrendonm",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gabrielrendonm",
    "profesor_nombre": "Dr. Gabriel Rendon Marquez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_nataliaalejand",
    "periodo_id": "2027-1",
    "profesor_id": "prof_nataliaalejand",
    "profesor_nombre": "Dra. Natalia Alejandra Rodríguez Revelo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_joseernestosam",
    "periodo_id": "2027-1",
    "profesor_id": "prof_joseernestosam",
    "profesor_nombre": "Dr. Jose Ernesto Sampedro Ávila",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_joseluissanche",
    "periodo_id": "2027-1",
    "profesor_id": "prof_joseluissanche",
    "profesor_nombre": "Dr. Jose Luis Sánchez Osorio",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_eduardosantiag",
    "periodo_id": "2027-1",
    "profesor_id": "prof_eduardosantiag",
    "profesor_nombre": "Dr. Eduardo Santiago Ojeda",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_marisoltorresa",
    "periodo_id": "2027-1",
    "profesor_id": "prof_marisoltorresa",
    "profesor_nombre": "Dra. Marisol Torres Aguilar",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_idalytrejoesca",
    "periodo_id": "2027-1",
    "profesor_id": "prof_idalytrejoesca",
    "profesor_nombre": "Dra. Idaly Trejo Escamilla",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_doraalejandrat",
    "periodo_id": "2027-1",
    "profesor_id": "prof_doraalejandrat",
    "profesor_nombre": "Dra. Dora Alejandra Trejo Ramos",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_auribe",
    "periodo_id": "2027-1",
    "profesor_id": "prof_auribe",
    "profesor_nombre": "Dra. Alicia Guadalupe Uribe López",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 211",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43165",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_alfredovenegas",
    "periodo_id": "2027-1",
    "profesor_id": "prof_alfredovenegas",
    "profesor_nombre": "Dr. Alfredo Venegas Vega",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_samanthavictor",
    "periodo_id": "2027-1",
    "profesor_id": "prof_samanthavictor",
    "profesor_nombre": "Dra. Samantha Victoria Cota",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_claudiamariawa",
    "periodo_id": "2027-1",
    "profesor_id": "prof_claudiamariawa",
    "profesor_nombre": "Dra. Claudia Maria Wall Medrano",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_andreayazminza",
    "periodo_id": "2027-1",
    "profesor_id": "prof_andreayazminza",
    "profesor_nombre": "Dra. Andrea Yazmin Zamora Quintero",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_gsamperio",
    "periodo_id": "2027-1",
    "profesor_id": "prof_gsamperio",
    "profesor_nombre": "Dr. Guillermo Alberto Samperio Ramos",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 204",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43159",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_pumachavezadri",
    "periodo_id": "2027-1",
    "profesor_id": "prof_pumachavezadri",
    "profesor_nombre": "Dra. Adriana Puma Chávez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_naylaberenicem",
    "periodo_id": "2027-1",
    "profesor_id": "prof_naylaberenicem",
    "profesor_nombre": "Dra. Nayla Berenice Muñoz Euán",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_jeremielouisna",
    "periodo_id": "2027-1",
    "profesor_id": "prof_jeremielouisna",
    "profesor_nombre": "Dr. Jeremie Louis Natan Bauer",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_arlettemarimar",
    "periodo_id": "2027-1",
    "profesor_id": "prof_arlettemarimar",
    "profesor_nombre": "Dra. Arlette Marimar Pacheco Sandoval",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_emilianonelson",
    "periodo_id": "2027-1",
    "profesor_id": "prof_emilianonelson",
    "profesor_nombre": "Dr. Emiliano Nelson Gorr",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_julioenriquema",
    "periodo_id": "2027-1",
    "profesor_id": "prof_julioenriquema",
    "profesor_nombre": "Dr. Julio Enrique Martínez García",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_andradesanchez",
    "periodo_id": "2027-1",
    "profesor_id": "prof_andradesanchez",
    "profesor_nombre": "Dr. Jorge Alberto Andrade Sánchez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_alejandrogonza",
    "periodo_id": "2027-1",
    "profesor_id": "prof_alejandrogonza",
    "profesor_nombre": "Dr. Alejandro González Rojas",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_normapatriciae",
    "periodo_id": "2027-1",
    "profesor_id": "prof_normapatriciae",
    "profesor_nombre": "Dra. Norma Patricia Esprius Sanches",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Sala de Profesores FCM",
    "horario_tutorias": "Lunes a Jueves 11:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo institucional UABC / Microsoft Teams",
    "telefono_extension": "Ext. 43100",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  }
];

export const AVISOS_INICIALES: AvisoEstudiantes[] = [
  {
    "id": "aviso_posgrado_bienvenida",
    "periodo_id": "2027-1",
    "profesor_id": "admin_igiffard",
    "profesor_nombre": "Dra. Ivone Giffard (Subdirección FCM)",
    "titulo": "Horario Oficial de Posgrado FCM (MCOC / DCOC) 2027-1",
    "contenido": "Se ha publicado la programación oficial de materias para Grupos 1, 2, 3 y las asignaciones de Tutorías Académicas para el periodo 2027-1.",
    "tipo": "aviso_general",
    "prioridad": "urgente",
    "fecha_publicacion": "2027-01-15T09:00:00.000Z",
    "contacto": "igiffard@uabc.edu.mx"
  },
  {
    "id": "aviso_tutorias_mcoc",
    "periodo_id": "2027-1",
    "profesor_id": "admin_igiffard",
    "profesor_nombre": "Subdirección FCM · Coordinación de Posgrado",
    "titulo": "Asignación de Tutores Académicos Grupo A (Lunes) y Grupo B (Martes)",
    "contenido": "Se encuentran asignados 26 estudiantes con sus respectivos tutores académicos:\n- Grupo A (Lunes 19:00 - 21:00 VIR): 22 alumnos asesorados por sus respectivos profesores investigadores.\n- Grupo B (Martes 19:00 - 21:00 VIR): 4 alumnos asesorados en modalidades de Tutoría I y II.",
    "tipo": "tutorias",
    "prioridad": "importante",
    "fecha_publicacion": "2027-01-15T10:00:00.000Z",
    "contacto": "igiffard@uabc.edu.mx"
  }
];

export const TUTORIAS_ESTUDIANTES_INICIALES = [
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Isabel Quesada Ávila",
    "tutor_nombre": "Dra. Alicia Guadalupe Uribe López",
    "tutor_id": "prof_auribe",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Sebastián Ruiz Mejía",
    "tutor_nombre": "Dra. Alicia Abadía Cardoso",
    "tutor_id": "prof_aabadia",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Emilio Moreno Garnelo",
    "tutor_nombre": "Dr. André Luiz Braga de Souza",
    "tutor_id": "prof_abraga",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Angélica San Pedro Granados",
    "tutor_nombre": "Dr. Braulio Juárez Araiza",
    "tutor_id": "prof_bjuarez",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Ulysses Guillermo Miramontes Salcedo",
    "tutor_nombre": "Dr. Fernando Barreto Curiel",
    "tutor_id": "prof_fbarreto",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Marshall Díaz Londoño",
    "tutor_nombre": "Dr. Héctor García Nava",
    "tutor_id": "prof_hgnava",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Ana Nicole Magaña Sánchez",
    "tutor_nombre": "Dr. Juan Guillermo Vaca Rodríguez",
    "tutor_id": "prof_jvaca",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Iván Córdova Medina",
    "tutor_nombre": "Dra. Karina del Carmen Lugo Ibarra",
    "tutor_id": "prof_klugo",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Raúl Rivera Herrera",
    "tutor_nombre": "Dra. Laura Liliana López Galindo",
    "tutor_id": "prof_llopez",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Daniela Soltero Rosales",
    "tutor_nombre": "Dr. Carlos Alejandro Domínguez Pérez",
    "tutor_id": "prof_cdominguez",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Luis Ramón Rodríguez León",
    "tutor_nombre": "Dr. Carlos Orión Norzagaray López",
    "tutor_id": "prof_onorzagaray",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Fátima del Rocío Balcázar Jiménez",
    "tutor_nombre": "Dr. Oscar Basilio del Río Zaragoza",
    "tutor_id": "prof_odelrio",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Víctor Manuel Sánchez Franco",
    "tutor_nombre": "Dr. Rodrigo Beas Luna",
    "tutor_id": "prof_rbeas",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "José Pablo Morelos Padilla",
    "tutor_nombre": "Dr. José Alberto Zepeda Domínguez",
    "tutor_id": "prof_jazepeda",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Kenia Elizabeth Borbón Fuentes",
    "tutor_nombre": "Dr. José Miguel Sandoval Gil",
    "tutor_id": "prof_jmsandoval",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Gustavo Alexis Cárdenas López",
    "tutor_nombre": "Dr. Mario Galaviz Espinoza",
    "tutor_id": "prof_mgalaviz",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Itzel Mariana Salas Rodela",
    "tutor_nombre": "Dra. Mary Carmen Ruíz de la Torre",
    "tutor_id": "prof_mruiz",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Martha Itzel Parada Espinoza",
    "tutor_nombre": "Dra. Mónica Torres Beltrán",
    "tutor_id": "prof_mtorres",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Carlos Alejandro Domínguez Pérez",
    "tutor_nombre": "Dr. Mauro Wilfrido Santiago García",
    "tutor_id": "prof_msantiago",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Andrea Itzel Munguía Casillas",
    "tutor_nombre": "Dr. Oscar Basilio del Río Zaragoza",
    "tutor_id": "prof_odelrio",
    "nivel": "Tutoría Académica II"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Michelle Fimbres Martínez",
    "tutor_nombre": "Dr. Ricardo Cruz López",
    "tutor_id": "prof_rcruz",
    "nivel": "Tutoría Académica II"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Wilson Alberto Solís Turbequia",
    "tutor_nombre": "Dr. Guillermo Alberto Samperio Ramos",
    "tutor_id": "prof_gsamperio",
    "nivel": "Tutoría Académica II"
  },
  {
    "grupo": "B",
    "dia": "Martes 19:00 - 21:00",
    "estudiante": "Daniela Rubí Galván Ramos",
    "tutor_nombre": "Dr. Braulio Juárez Araiza",
    "tutor_id": "prof_bjuarez",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "B",
    "dia": "Martes 19:00 - 21:00",
    "estudiante": "Kendra Danielle Mora Giles",
    "tutor_nombre": "Dr. Mauro Wilfrido Santiago García",
    "tutor_id": "prof_msantiago",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "B",
    "dia": "Martes 19:00 - 21:00",
    "estudiante": "Aldo Emmanuel Belmonte Romo",
    "tutor_nombre": "Dr. Fernando Barreto Curiel",
    "tutor_id": "prof_fbarreto",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "B",
    "dia": "Martes 19:00 - 21:00",
    "estudiante": "Camila Alejandra Reyes Rincón",
    "tutor_nombre": "Dr. José Alberto Zepeda Domínguez",
    "tutor_id": "prof_jazepeda",
    "nivel": "Tutoría Académica II"
  }
];
