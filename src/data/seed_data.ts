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
    "uid": "admin_igiffard",
    "nombre": "Dra. Ivone Giffard",
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
    "academia_area": "Subdirección FCM · Biología y Oceanografía",
    "cubiculo": "Edificio 14 (Dirección) · Cubículo Subdirección",
    "horario_tutorias": "Lunes a Viernes 10:00 - 13:00 (Cita previa)",
    "telefono_extension": "Ext. 43102",
    "canal_contacto_estudiantes": "Correo UABC / Teams / Presencial",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_bmartin",
    "nombre": "Dr. Benjamín Martín",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "bmartin@uabc.edu.mx",
    "email_normalizado": "bmartin@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Estadística y Modelación",
    "cubiculo": "Edificio 14 · Cubículo 104",
    "horario_tutorias": "Miércoles y Viernes 11:00 - 13:00",
    "telefono_extension": "Ext. 43120",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_llopez",
    "nombre": "Dra. Laura Liliana López Galindo",
    "cargo": "Profesora-Investigadora",
    "titulo_academico": "Dra.",
    "email": "llopez@uabc.edu.mx",
    "email_normalizado": "llopez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Biología Molecular y Genética",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 208",
    "horario_tutorias": "Martes y Jueves 10:00 - 12:00",
    "telefono_extension": "Ext. 43215",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mtorres",
    "nombre": "Dra. Mónica Torres Beltrán",
    "cargo": "Profesora-Investigadora",
    "titulo_academico": "Dra.",
    "email": "mtorres@uabc.edu.mx",
    "email_normalizado": "mtorres@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Bioinformática y Microbiología Marina",
    "cubiculo": "Edificio 14 · Cubículo 108",
    "horario_tutorias": "Lunes y Viernes 13:00 - 15:00",
    "telefono_extension": "Ext. 43118",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_bjuarez",
    "nombre": "Dr. Braulio Juárez A.",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "bjuarez@uabc.edu.mx",
    "email_normalizado": "bjuarez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Oceanografía Física e Hidrodinámica",
    "cubiculo": "Edificio 16 · Cubículo 112",
    "horario_tutorias": "Martes y Jueves 14:00 - 16:00",
    "telefono_extension": "Ext. 43144",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_palvarado",
    "nombre": "Dr. Pedro Alvarado",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "palvarado@uabc.edu.mx",
    "email_normalizado": "palvarado@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Modelación Numérica del Océano",
    "cubiculo": "Edificio 16 · Cubículo 115",
    "horario_tutorias": "Martes y Viernes 15:00 - 17:00",
    "telefono_extension": "Ext. 43145",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_stanahara",
    "nombre": "Dra. Sheila Tanahara",
    "cargo": "Profesora-Investigadora",
    "titulo_academico": "Dra.",
    "email": "stanahara@uabc.edu.mx",
    "email_normalizado": "stanahara@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Modelación Numérica y Dinámica Oceánica",
    "cubiculo": "Edificio 16 · Cubículo 116",
    "horario_tutorias": "Martes 15:00 - 17:00",
    "telefono_extension": "Ext. 43146",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_eolvera",
    "nombre": "Dr. Eric Olvera",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "eolvera@uabc.edu.mx",
    "email_normalizado": "eolvera@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Modelación Numérica y Cómputo Científico",
    "cubiculo": "Edificio 14 · Cubículo 109",
    "horario_tutorias": "Viernes 15:00 - 17:00",
    "telefono_extension": "Ext. 43119",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_nmillan",
    "nombre": "Dr. Norberto Millán",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "nmillan@uabc.edu.mx",
    "email_normalizado": "nmillan@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Seminarios de Investigación",
    "cubiculo": "Edificio 14 (SPD) · Cubículo 102",
    "horario_tutorias": "Lunes 16:00 - 18:00",
    "telefono_extension": "Ext. 43105",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_vfernandez",
    "nombre": "Dr. Víctor Fernández",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "vfernandez@uabc.edu.mx",
    "email_normalizado": "vfernandez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tesis de Posgrado y Oceanografía",
    "cubiculo": "Edificio 18 · Cubículo 205",
    "horario_tutorias": "Martes 17:00 - 19:00",
    "telefono_extension": "Ext. 43160",
    "canal_contacto_estudiantes": "Correo UABC",
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
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Sistemas Socioecológicos y Manejo Costero",
    "cubiculo": "Edificio 18 · Cubículo 209",
    "horario_tutorias": "Jueves 15:00 - 17:00",
    "telefono_extension": "Ext. 43165",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jmsandoval",
    "nombre": "Dr. José Miguel Sandoval",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jmsandoval@uabc.edu.mx",
    "email_normalizado": "jmsandoval@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Botánica Marina y Ecofisiología",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 105",
    "horario_tutorias": "Miércoles 17:00 - 19:00",
    "telefono_extension": "Ext. 43220",
    "canal_contacto_estudiantes": "Correo UABC / Meet / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lenriquez",
    "nombre": "Dra. Lidia Enríquez",
    "cargo": "Profesora-Investigadora",
    "titulo_academico": "Dra.",
    "email": "lenriquez@uabc.edu.mx",
    "email_normalizado": "lenriquez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ecología Molecular y Genética de Poblaciones",
    "cubiculo": "Edificio 56 · Cubículo 101",
    "horario_tutorias": "Martes y Jueves 09:00 - 11:00",
    "telefono_extension": "Ext. 43190",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_hgnava",
    "nombre": "Dr. Héctor García Nava",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "hgnava@uabc.edu.mx",
    "email_normalizado": "hgnava@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Programación y Física Oceanográfica",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 210",
    "horario_tutorias": "Lunes y Viernes 12:00 - 14:00",
    "telefono_extension": "Ext. 43230",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_tolivares",
    "nombre": "Dr. T. Olivares",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "tolivares@uabc.edu.mx",
    "email_normalizado": "tolivares@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Biotecnología y Acuacultura",
    "cubiculo": "Edificio 41 · Cubículo 103",
    "horario_tutorias": "Miércoles 12:00 - 14:00",
    "telefono_extension": "Ext. 43180",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_scastellanos",
    "nombre": "Dra. Sara Castellanos",
    "cargo": "Profesora-Investigadora",
    "titulo_academico": "Dra.",
    "email": "scastellanos@uabc.edu.mx",
    "email_normalizado": "scastellanos@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Patología Acuícola y Sanidad Marina",
    "cubiculo": "Edificio 41 · Cubículo 104",
    "horario_tutorias": "Lunes y Miércoles 14:00 - 16:00",
    "telefono_extension": "Ext. 43182",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_ngudino",
    "nombre": "Dr. N. Gudiño",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "ngudino@uabc.edu.mx",
    "email_normalizado": "ngudino@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Morfodinámica Costera y Procesos Litorales",
    "cubiculo": "Edificio 16 · Cubículo 204",
    "horario_tutorias": "Martes y Jueves 13:00 - 15:00",
    "telefono_extension": "Ext. 43150",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_odelrio",
    "nombre": "Dr. Oscar Basilio del Río Zaragoza",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "odelrio@uabc.edu.mx",
    "email_normalizado": "odelrio@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Inmunología y Bioseguridad en Organismos Acuáticos",
    "cubiculo": "Edificio 41 · Cubículo 105",
    "horario_tutorias": "Lunes y Miércoles 14:00 - 16:00",
    "telefono_extension": "Ext. 43185",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jgcorrea",
    "nombre": "Dr. J.G. Correa",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "jgcorrea@uabc.edu.mx",
    "email_normalizado": "jgcorrea@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ingeniería de Sistemas Acuícolas",
    "cubiculo": "Edificio 41 · Cubículo 102",
    "horario_tutorias": "Martes y Jueves 15:00 - 17:00",
    "telefono_extension": "Ext. 43178",
    "canal_contacto_estudiantes": "Correo UABC",
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
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Nutrición y Fisiología Acuícola",
    "cubiculo": "Edificio 17 · Cubículo 106",
    "horario_tutorias": "Martes y Jueves 14:00 - 16:00",
    "telefono_extension": "Ext. 43135",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_acastillo",
    "nombre": "Dr. A. Castillo",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "acastillo@uabc.edu.mx",
    "email_normalizado": "acastillo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Percepción Remota y Óptica Marina",
    "cubiculo": "Edificio 14 · Cubículo 110",
    "horario_tutorias": "Lunes y Viernes 12:00 - 14:00",
    "telefono_extension": "Ext. 43122",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_lmalpica",
    "nombre": "Dr. L. Malpica",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "lmalpica@uabc.edu.mx",
    "email_normalizado": "lmalpica@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Ecología Marina y Análisis Cuantitativo en R",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 212",
    "horario_tutorias": "Lunes y Miércoles 14:00 - 16:00",
    "telefono_extension": "Ext. 43235",
    "canal_contacto_estudiantes": "Correo UABC / R-Studio Hub",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mgalaviz",
    "nombre": "Dr. Mario Galaviz",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "mgalaviz@uabc.edu.mx",
    "email_normalizado": "mgalaviz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Bioquímica y Fisiología Digestiva Marina",
    "cubiculo": "Edificio 15 · Cubículo 204",
    "horario_tutorias": "Martes y Miércoles 14:00 - 16:00",
    "telefono_extension": "Ext. 43128",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_afelix",
    "nombre": "Dr. A. Félix",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "afelix@uabc.edu.mx",
    "email_normalizado": "afelix@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Biogeoquímica Marina y Flujos de Carbono",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 108",
    "horario_tutorias": "Viernes 14:00 - 16:00",
    "telefono_extension": "Ext. 43222",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_gsamperio",
    "nombre": "Dr. Guillermo Alberto Samperio Ramos",
    "cargo": "Profesor-Investigador",
    "titulo_academico": "Dr.",
    "email": "gsamperio@uabc.edu.mx",
    "email_normalizado": "gsamperio@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Biogeoquímica Marina y Procesos Costeros",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 110",
    "horario_tutorias": "Viernes 16:00 - 18:00",
    "telefono_extension": "Ext. 43224",
    "canal_contacto_estudiantes": "Correo UABC",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_auribe",
    "nombre": "Dra. Abigail Uribe",
    "cargo": "Profesora-Investigadora · Tutora MCOC",
    "titulo_academico": "Dra.",
    "email": "auribe@uabc.edu.mx",
    "email_normalizado": "auribe@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Ecología Marina",
    "cubiculo": "Edificio 18 · Cubículo 202",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43155",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_aabadia",
    "nombre": "Dra. Alicia Abadía",
    "cargo": "Profesora-Investigadora · Tutora MCOC",
    "titulo_academico": "Dra.",
    "email": "aabadia@uabc.edu.mx",
    "email_normalizado": "aabadia@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Biología Marina",
    "cubiculo": "Edificio 15 · Cubículo 201",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43126",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_abraga",
    "nombre": "Dr. André Luiz Braga de Souza",
    "cargo": "Profesor-Investigador · Tutor MCOC",
    "titulo_academico": "Dr.",
    "email": "abraga@uabc.edu.mx",
    "email_normalizado": "abraga@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Oceanografía Costera",
    "cubiculo": "Edificio 16 · Cubículo 206",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43152",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_jvaca",
    "nombre": "Dr. Juan Vaca",
    "cargo": "Profesor-Investigador · Tutor MCOC",
    "titulo_academico": "Dr.",
    "email": "jvaca@uabc.edu.mx",
    "email_normalizado": "jvaca@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Física Marina",
    "cubiculo": "Edificio 16 · Cubículo 110",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43142",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_klugo",
    "nombre": "Dra. Karina Lugo",
    "cargo": "Profesora-Investigadora · Tutora MCOC",
    "titulo_academico": "Dra.",
    "email": "klugo@uabc.edu.mx",
    "email_normalizado": "klugo@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Biogeoquímica",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 106",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43221",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_cdominguez",
    "nombre": "Dr. Carlos Alejandro Domínguez Pérez",
    "cargo": "Profesor-Investigador · Tutor MCOC",
    "titulo_academico": "Dr.",
    "email": "cdominguez@uabc.edu.mx",
    "email_normalizado": "cdominguez@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Ciencias Ambientales",
    "cubiculo": "Edificio 18 · Cubículo 208",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43164",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_onorzagaray",
    "nombre": "Dr. Orión Norzagaray",
    "cargo": "Profesor-Investigador · Tutor MCOC",
    "titulo_academico": "Dr.",
    "email": "onorzagaray@uabc.edu.mx",
    "email_normalizado": "onorzagaray@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Ecología Litoral",
    "cubiculo": "Edificio 18 · Cubículo 206",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43162",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_rbeas",
    "nombre": "Dr. Rodrigo Beas",
    "cargo": "Profesor-Investigador · Tutor MCOC",
    "titulo_academico": "Dr.",
    "email": "rbeas@uabc.edu.mx",
    "email_normalizado": "rbeas@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Ecología Marina Submarina",
    "cubiculo": "Edificio 15 · Cubículo 105",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43130",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_mruiz",
    "nombre": "Dra. Mary Carmen Ruíz",
    "cargo": "Profesora-Investigadora · Tutora MCOC",
    "titulo_academico": "Dra.",
    "email": "mruiz@uabc.edu.mx",
    "email_normalizado": "mruiz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Biología Celular",
    "cubiculo": "Edificio 15 · Cubículo 203",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43127",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_msantiago",
    "nombre": "Dr. Mauro Wilfrido Santiago García",
    "cargo": "Profesor-Investigador · Tutor MCOC",
    "titulo_academico": "Dr.",
    "email": "msantiago@uabc.edu.mx",
    "email_normalizado": "msantiago@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías e Hidrodinámica",
    "cubiculo": "Edificio 16 · Cubículo 114",
    "horario_tutorias": "Lunes y Martes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43148",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "createdAt": "2027-01-10T08:00:00.000Z",
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "uid": "prof_rcruz",
    "nombre": "Dr. Ricardo Cruz López",
    "cargo": "Profesor-Investigador · Tutor DCOC",
    "titulo_academico": "Dr.",
    "email": "rcruz@uabc.edu.mx",
    "email_normalizado": "rcruz@uabc.edu.mx",
    "role": "profesor",
    "programas_asignados_ids": [
      "MCOC",
      "DOC"
    ],
    "niveles_asignados": [
      "posgrado"
    ],
    "activo": true,
    "origen_pdf_posgrado": true,
    "academia_area": "Tutorías y Oceanografía Geológica",
    "cubiculo": "Edificio 16 · Cubículo 202",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "telefono_extension": "Ext. 43154",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
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
      "prof_eolvera"
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
      "prof_eolvera"
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
    "profesor_nombre": "Dr. Benjamín Martín",
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
    "notas": "Sesión oficial C en E-14 CPB - Dr. Benjamín Martín",
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
    "profesor_nombre": "Dr. Benjamín Martín",
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
    "notas": "Sesión oficial C en E-14 CPB - Dr. Benjamín Martín",
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
    "profesor_nombre": "Dr. Benjamín Martín",
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
    "notas": "Sesión oficial T en E-14 CPB - Dr. Benjamín Martín",
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
    "profesor_nombre": "Dr. Benjamín Martín",
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
    "notas": "Sesión oficial T en E-14 CPB - Dr. Benjamín Martín",
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
    "profesor_nombre": "Dr. Braulio Juárez A.",
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
    "notas": "Sesión oficial T en E-14 CPB - Dr. Braulio Juárez A.",
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
    "profesor_nombre": "Dr. Braulio Juárez A.",
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
    "notas": "Sesión oficial C en E-14 CPB - Dr. Braulio Juárez A.",
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
      "prof_eolvera"
    ],
    "profesor_principal_id": "prof_palvarado",
    "profesor_nombre": "Dr. P. Alvarado, Dra. S. Tanahara, Dr. E. Olvera",
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
    "notas": "Sesión oficial C en E-14 CPB - Dr. P. Alvarado, Dra. S. Tanahara, Dr. E. Olvera",
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
      "prof_eolvera"
    ],
    "profesor_principal_id": "prof_palvarado",
    "profesor_nombre": "Dr. P. Alvarado, Dra. S. Tanahara, Dr. E. Olvera",
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
    "notas": "Sesión oficial T en E-14 CPB - Dr. P. Alvarado, Dra. S. Tanahara, Dr. E. Olvera",
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
    "profesor_nombre": "Dr. Norberto Millán",
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
    "notas": "Sesión oficial T en E-14 SPD - Dr. Norberto Millán",
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
    "profesor_nombre": "Dr. Víctor Fernández",
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
    "notas": "Sesión oficial T en E-14 CPB - Dr. Víctor Fernández",
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
    "profesor_nombre": "Dra. Ivone Giffard",
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
    "notas": "Sesión oficial T en E-14 CPB - Dra. Ivone Giffard",
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
    "profesor_nombre": "Dr. José Miguel Sandoval",
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
    "notas": "Sesión oficial C en VIR - Dr. José Miguel Sandoval",
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
    "profesor_nombre": "Dr. José Miguel Sandoval",
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
    "notas": "Sesión oficial L en VIR - Dr. José Miguel Sandoval",
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
    "profesor_nombre": "Dra. Lidia Enríquez",
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
    "notas": "Sesión oficial C en E-56 TOA - Dra. Lidia Enríquez",
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
    "profesor_nombre": "Dra. Lidia Enríquez",
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
    "notas": "Sesión oficial T en E-56 TOA - Dra. Lidia Enríquez",
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
    "profesor_nombre": "Dra. Lidia Enríquez",
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
    "notas": "Sesión oficial T en E-56 TOA - Dra. Lidia Enríquez",
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
    "profesor_nombre": "Dr. T. Olivares y Dra. S. Castellanos",
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
    "notas": "Sesión oficial T en VIR - Dr. T. Olivares y Dra. S. Castellanos",
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
    "profesor_nombre": "Dr. N. Gudiño",
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
    "notas": "Sesión oficial C en E-25 SP1 - Dr. N. Gudiño",
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
    "profesor_nombre": "Dr. N. Gudiño",
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
    "notas": "Sesión oficial C en E-25 SP1 - Dr. N. Gudiño",
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
    "profesor_nombre": "Dr. N. Gudiño",
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
    "notas": "Sesión oficial P en E-25 SP1 - Dr. N. Gudiño",
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
    "profesor_nombre": "Dr. O. del Río y Dra. S. Castellanos",
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
    "notas": "Sesión oficial C en E-14 CPB - Dr. O. del Río y Dra. S. Castellanos",
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
    "profesor_nombre": "Dr. O. del Río y Dra. S. Castellanos",
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
    "notas": "Sesión oficial T en E-14 CPB - Dr. O. del Río y Dra. S. Castellanos",
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
    "profesor_nombre": "Dr. J.G. Correa y Dr. Fernando Barreto",
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
    "notas": "Sesión oficial T en E-25 SP1 - Dr. J.G. Correa y Dr. Fernando Barreto",
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
    "profesor_nombre": "Dr. J.G. Correa y Dr. Fernando Barreto",
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
    "notas": "Sesión oficial C en E-25 SP1 - Dr. J.G. Correa y Dr. Fernando Barreto",
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
    "profesor_nombre": "Dr. J.G. Correa y Dr. Fernando Barreto",
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
    "notas": "Sesión oficial T en E-25 SP1 - Dr. J.G. Correa y Dr. Fernando Barreto",
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
    "profesor_nombre": "Dr. A. Castillo",
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
    "notas": "Sesión oficial C en E-14 SA - Dr. A. Castillo",
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
    "profesor_nombre": "Dr. A. Castillo",
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
    "notas": "Sesión oficial T en E-14 SA - Dr. A. Castillo",
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
    "profesor_nombre": "Dr. L. Malpica",
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
    "notas": "Sesión oficial C en E-25 SP1 - Dr. L. Malpica",
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
    "profesor_nombre": "Dr. L. Malpica",
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
    "notas": "Sesión oficial T en E-25 SP1 - Dr. L. Malpica",
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
    "profesor_nombre": "Dr. Mario Galaviz y Dr. Fernando Barreto",
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
    "notas": "Sesión oficial C en E-14 CPB - Dr. Mario Galaviz y Dr. Fernando Barreto",
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
    "profesor_nombre": "Dr. Mario Galaviz y Dr. Fernando Barreto",
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
    "notas": "Sesión oficial C en E-25 SP1 - Dr. Mario Galaviz y Dr. Fernando Barreto",
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
    "profesor_nombre": "Dr. A. Félix y Dr. Guillermo Samperio",
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
    "notas": "Sesión oficial T en E-25 AVI - Dr. A. Félix y Dr. Guillermo Samperio",
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
    "profesor_nombre": "Dr. A. Félix y Dr. Guillermo Samperio",
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
    "notas": "Sesión oficial T en E-25 AVI - Dr. A. Félix y Dr. Guillermo Samperio",
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
    "id": "pref_2027-1_admin_igiffard",
    "periodo_id": "2027-1",
    "profesor_id": "admin_igiffard",
    "profesor_nombre": "Dra. Ivone Giffard",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 (Dirección) · Cubículo Subdirección",
    "horario_tutorias": "Lunes a Viernes 10:00 - 13:00 (Cita previa)",
    "canal_contacto_estudiantes": "Correo UABC / Teams / Presencial",
    "telefono_extension": "Ext. 43102",
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
    "profesor_nombre": "Dr. Benjamín Martín",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 · Cubículo 104",
    "horario_tutorias": "Miércoles y Viernes 11:00 - 13:00",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43120",
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
    "horario_tutorias": "Martes y Jueves 10:00 - 12:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43215",
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
    "horario_tutorias": "Lunes y Viernes 13:00 - 15:00",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43118",
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
    "profesor_nombre": "Dr. Braulio Juárez A.",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 112",
    "horario_tutorias": "Martes y Jueves 14:00 - 16:00",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43144",
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
    "profesor_nombre": "Dr. Pedro Alvarado",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 115",
    "horario_tutorias": "Martes y Viernes 15:00 - 17:00",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43145",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_stanahara",
    "periodo_id": "2027-1",
    "profesor_id": "prof_stanahara",
    "profesor_nombre": "Dra. Sheila Tanahara",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 116",
    "horario_tutorias": "Martes 15:00 - 17:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43146",
    "equipos_requeridos": [
      "proyector",
      "red_uabc"
    ],
    "updatedAt": "2027-01-10T08:00:00.000Z"
  },
  {
    "id": "pref_2027-1_prof_eolvera",
    "periodo_id": "2027-1",
    "profesor_id": "prof_eolvera",
    "profesor_nombre": "Dr. Eric Olvera",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 · Cubículo 109",
    "horario_tutorias": "Viernes 15:00 - 17:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43119",
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
    "profesor_nombre": "Dr. Norberto Millán",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 (SPD) · Cubículo 102",
    "horario_tutorias": "Lunes 16:00 - 18:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43105",
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
    "profesor_nombre": "Dr. Víctor Fernández",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 205",
    "horario_tutorias": "Martes 17:00 - 19:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43160",
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
    "horario_tutorias": "Jueves 15:00 - 17:00",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43165",
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
    "profesor_nombre": "Dr. José Miguel Sandoval",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 105",
    "horario_tutorias": "Miércoles 17:00 - 19:00",
    "canal_contacto_estudiantes": "Correo UABC / Meet / Teams",
    "telefono_extension": "Ext. 43220",
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
    "profesor_nombre": "Dra. Lidia Enríquez",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 56 · Cubículo 101",
    "horario_tutorias": "Martes y Jueves 09:00 - 11:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43190",
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
    "profesor_nombre": "Dr. Héctor García Nava",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 210",
    "horario_tutorias": "Lunes y Viernes 12:00 - 14:00",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43230",
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
    "profesor_nombre": "Dr. T. Olivares",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 41 · Cubículo 103",
    "horario_tutorias": "Miércoles 12:00 - 14:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43180",
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
    "profesor_nombre": "Dra. Sara Castellanos",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 41 · Cubículo 104",
    "horario_tutorias": "Lunes y Miércoles 14:00 - 16:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43182",
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
    "profesor_nombre": "Dr. N. Gudiño",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 204",
    "horario_tutorias": "Martes y Jueves 13:00 - 15:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43150",
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
    "profesor_nombre": "Dr. Oscar Basilio del Río Zaragoza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 41 · Cubículo 105",
    "horario_tutorias": "Lunes y Miércoles 14:00 - 16:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43185",
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
    "profesor_nombre": "Dr. J.G. Correa",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 41 · Cubículo 102",
    "horario_tutorias": "Martes y Jueves 15:00 - 17:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43178",
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
    "cubiculo": "Edificio 17 · Cubículo 106",
    "horario_tutorias": "Martes y Jueves 14:00 - 16:00",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43135",
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
    "profesor_nombre": "Dr. A. Castillo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 14 · Cubículo 110",
    "horario_tutorias": "Lunes y Viernes 12:00 - 14:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43122",
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
    "profesor_nombre": "Dr. L. Malpica",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 212",
    "horario_tutorias": "Lunes y Miércoles 14:00 - 16:00",
    "canal_contacto_estudiantes": "Correo UABC / R-Studio Hub",
    "telefono_extension": "Ext. 43235",
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
    "profesor_nombre": "Dr. Mario Galaviz",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 15 · Cubículo 204",
    "horario_tutorias": "Martes y Miércoles 14:00 - 16:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43128",
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
    "profesor_nombre": "Dr. A. Félix",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 108",
    "horario_tutorias": "Viernes 14:00 - 16:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43222",
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
    "cubiculo": "Edificio 25 (IIO) · Cubículo 110",
    "horario_tutorias": "Viernes 16:00 - 18:00",
    "canal_contacto_estudiantes": "Correo UABC",
    "telefono_extension": "Ext. 43224",
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
    "profesor_nombre": "Dra. Abigail Uribe",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 202",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43155",
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
    "profesor_nombre": "Dra. Alicia Abadía",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 15 · Cubículo 201",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43126",
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
    "profesor_nombre": "Dr. André Luiz Braga de Souza",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 206",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43152",
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
    "profesor_nombre": "Dr. Juan Vaca",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 16 · Cubículo 110",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43142",
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
    "profesor_nombre": "Dra. Karina Lugo",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 25 (IIO) · Cubículo 106",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43221",
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
    "cubiculo": "Edificio 18 · Cubículo 208",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43164",
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
    "profesor_nombre": "Dr. Orión Norzagaray",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 18 · Cubículo 206",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43162",
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
    "profesor_nombre": "Dr. Rodrigo Beas",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 15 · Cubículo 105",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43130",
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
    "profesor_nombre": "Dra. Mary Carmen Ruíz",
    "nivel_educativo": "posgrado",
    "programas_ids": [
      "MCOC",
      "DOC"
    ],
    "dias_no_disponibles": [],
    "rangos_no_disponibles": [],
    "nivel_restriccion": "preferencia",
    "cubiculo": "Edificio 15 · Cubículo 203",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43127",
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
    "cubiculo": "Edificio 16 · Cubículo 114",
    "horario_tutorias": "Lunes y Martes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43148",
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
    "cubiculo": "Edificio 16 · Cubículo 202",
    "horario_tutorias": "Lunes 19:00 - 21:00 (VIR)",
    "canal_contacto_estudiantes": "Correo UABC / Teams",
    "telefono_extension": "Ext. 43154",
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
    "tutor_nombre": "Dra. Abigail Uribe",
    "tutor_id": "prof_auribe",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Sebastián Ruiz Mejía",
    "tutor_nombre": "Dra. Alicia Abadía",
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
    "tutor_nombre": "Dr. Braulio Juárez A.",
    "tutor_id": "prof_bjuarez",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Ulysses Guillermo Miramontes Salcedo",
    "tutor_nombre": "Dr. Fernando Barreto",
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
    "tutor_nombre": "Dr. Juan Vaca",
    "tutor_id": "prof_jvaca",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Iván Córdova Medina",
    "tutor_nombre": "Dra. Karina Lugo",
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
    "tutor_nombre": "Dr. Orión Norzagaray",
    "tutor_id": "prof_onorzagaray",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Fátima del Rocío Balcázar Jiménez",
    "tutor_nombre": "Dr. Oscar del Río",
    "tutor_id": "prof_odelrio",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Víctor Manuel Sánchez Franco",
    "tutor_nombre": "Dr. Rodrigo Beas",
    "tutor_id": "prof_rbeas",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "José Pablo Morelos Padilla",
    "tutor_nombre": "Dr. José Alberto Zepeda",
    "tutor_id": "prof_jazepeda",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Kenia Elizabeth Borbón Fuentes",
    "tutor_nombre": "Dr. José Miguel Sandoval",
    "tutor_id": "prof_jmsandoval",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Gustavo Alexis Cárdenas López",
    "tutor_nombre": "Dr. Mario Galaviz",
    "tutor_id": "prof_mgalaviz",
    "nivel": "Tutoría Académica I"
  },
  {
    "grupo": "A",
    "dia": "Lunes 19:00 - 21:00",
    "estudiante": "Itzel Mariana Salas Rodela",
    "tutor_nombre": "Dra. Mary Carmen Ruíz",
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
    "tutor_nombre": "Dr. Braulio Juárez A.",
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
    "tutor_nombre": "Dr. José Alberto Zepeda Dominguez",
    "tutor_id": "prof_jazepeda",
    "nivel": "Tutoría Académica II"
  }
];
