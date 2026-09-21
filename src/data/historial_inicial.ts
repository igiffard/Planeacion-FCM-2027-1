/**
 * Semilla de Historial de Cambios en la Planeación FCM 2027-1
 * Proporciona un registro cronológico de auditoría inicial para la Subdirección
 */

import { RegistroHistorialCambio } from '../types';

export const HISTORIAL_INICIAL: RegistroHistorialCambio[] = [
  {
    id: 'hist-001',
    timestamp: '2026-09-21T14:20:00.000Z',
    fecha_formateada: '21 Sep 2026, 07:20',
    usuario_id: 'doc-001',
    usuario_nombre: 'Dra. Ivone Giffard Mena',
    usuario_email: 'igiffard@uabc.edu.mx',
    usuario_rol: 'admin',
    usuario_cargo: 'Subdirectora FCM',
    tipo_accion: 'mover_aula',
    descripcion: 'Dra. Ivone Giffard movió la clase Oceanografía Biológica (Gpo 101) al Aula S4 (E-18)',
    detalles: {
      curso_codigo: 'FCM-102',
      curso_nombre: 'Oceanografía Biológica',
      grupo_clave: '101',
      espacio_anterior_codigo: 'S1',
      espacio_anterior_nombre: 'Salón S1',
      espacio_nuevo_codigo: 'S4',
      espacio_nuevo_nombre: 'Salón S4 (E-18)',
      horario_anterior: '08:00 - 10:00',
      horario_nuevo: '08:00 - 10:00',
      dia_anterior: 'lunes',
      dia_nuevo: 'lunes',
      escenario_nombre: 'Propuesta Oficial',
      motivo: 'Optimización de capacidad por incremento de matrícula proyectada'
    }
  },
  {
    id: 'hist-002',
    timestamp: '2026-09-21T13:45:00.000Z',
    fecha_formateada: '21 Sep 2026, 06:45',
    usuario_id: 'doc-005',
    usuario_nombre: 'Dr. Manuel Salvador Roberts',
    usuario_email: 'mroberts@uabc.edu.mx',
    usuario_rol: 'profesor',
    usuario_cargo: 'Docente FCM - Biología',
    tipo_accion: 'cambiar_horario',
    descripcion: 'Dr. Manuel Salvador Roberts cambió el horario de Biología Marina (Gpo 102) a Miércoles 10:00 - 12:00',
    detalles: {
      curso_codigo: 'FCM-104',
      curso_nombre: 'Biología Marina',
      grupo_clave: '102',
      espacio_anterior_codigo: 'S2',
      espacio_anterior_nombre: 'Salón S2',
      espacio_nuevo_codigo: 'S2',
      espacio_nuevo_nombre: 'Salón S2',
      dia_anterior: 'lunes',
      dia_nuevo: 'miercoles',
      horario_anterior: '07:00 - 09:00',
      horario_nuevo: '10:00 - 12:00',
      escenario_nombre: 'Propuesta Oficial',
      motivo: 'Ajuste por disponibilidad docente y salida de campo matutina'
    }
  },
  {
    id: 'hist-003',
    timestamp: '2026-09-21T11:15:00.000Z',
    fecha_formateada: '21 Sep 2026, 04:15',
    usuario_id: 'coord-001',
    usuario_nombre: 'Dra. Andrea Martínez',
    usuario_email: 'amartinez@uabc.edu.mx',
    usuario_rol: 'coordinador',
    usuario_cargo: 'Coordinadora Oceanología',
    tipo_accion: 'asignar_docente',
    descripcion: 'Dra. Andrea Martínez asignó a Dra. Mariana Torres a la materia Química Acuática (Gpo 103)',
    detalles: {
      curso_codigo: 'FCM-103',
      curso_nombre: 'Química Acuática',
      grupo_clave: '103',
      espacio_nuevo_codigo: 'L-QUIM',
      espacio_nuevo_nombre: 'Laboratorio de Química',
      docente_nuevo_nombre: 'Dra. Mariana Torres',
      escenario_nombre: 'Propuesta Oficial',
      motivo: 'Asignación de titular según perfil de academia de ciencias químicas'
    }
  },
  {
    id: 'hist-004',
    timestamp: '2026-09-20T18:30:00.000Z',
    fecha_formateada: '20 Sep 2026, 11:30',
    usuario_id: 'doc-001',
    usuario_nombre: 'Dra. Ivone Giffard Mena',
    usuario_email: 'igiffard@uabc.edu.mx',
    usuario_rol: 'admin',
    usuario_cargo: 'Subdirectora FCM',
    tipo_accion: 'unificar_aulas',
    descripcion: 'Dra. Ivone Giffard unificó las variantes de aula "S-1 / Aula 1" en el espacio canónico "S1 - Salón S1"',
    detalles: {
      espacio_anterior_codigo: 'S-1',
      espacio_nuevo_codigo: 'S1',
      espacio_nuevo_nombre: 'Salón S1',
      escenario_nombre: 'Propuesta Oficial',
      motivo: 'Homologación de catálogo físico con mapa oficial de infraestructura FCM'
    }
  },
  {
    id: 'hist-005',
    timestamp: '2026-09-20T16:10:00.000Z',
    fecha_formateada: '20 Sep 2026, 09:10',
    usuario_id: 'doc-008',
    usuario_nombre: 'Dr. Roberto Mendoza',
    usuario_email: 'rmendoza@uabc.edu.mx',
    usuario_rol: 'profesor',
    usuario_cargo: 'Docente FCM - Acuacultura',
    tipo_accion: 'mover_aula',
    descripcion: 'Dr. Roberto Mendoza movió la sesión práctica de Cultivo de Moluscos al Laboratorio LMB',
    detalles: {
      curso_codigo: 'LBA-201',
      curso_nombre: 'Cultivo de Moluscos',
      grupo_clave: '201-1',
      espacio_anterior_codigo: 'TALL-A',
      espacio_anterior_nombre: 'Taller de Acuacultura',
      espacio_nuevo_codigo: 'LMB',
      espacio_nuevo_nombre: 'Laboratorio de Moluscos y Bentos',
      dia_anterior: 'jueves',
      dia_nuevo: 'jueves',
      horario_anterior: '14:00 - 17:00',
      horario_nuevo: '14:00 - 17:00',
      escenario_nombre: 'Propuesta Oficial',
      motivo: 'Requerimiento de tanques con flujo continuo de agua de mar'
    }
  },
  {
    id: 'hist-006',
    timestamp: '2026-09-19T17:00:00.000Z',
    fecha_formateada: '19 Sep 2026, 10:00',
    usuario_id: 'doc-001',
    usuario_nombre: 'Dra. Ivone Giffard Mena',
    usuario_email: 'igiffard@uabc.edu.mx',
    usuario_rol: 'admin',
    usuario_cargo: 'Subdirectora FCM',
    tipo_accion: 'crear_asignacion',
    descripcion: 'Dra. Ivone Giffard programó nueva sesión para Seminario de Titulación en Aula Magna',
    detalles: {
      curso_codigo: 'POS-301',
      curso_nombre: 'Seminario de Investigación y Titulación',
      grupo_clave: '301',
      espacio_nuevo_codigo: 'MAGNA',
      espacio_nuevo_nombre: 'Aula Magna FCM',
      dia_nuevo: 'viernes',
      horario_nuevo: '11:00 - 13:00',
      escenario_nombre: 'Propuesta Oficial'
    }
  }
];
