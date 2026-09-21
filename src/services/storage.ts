/**
 * Servicio de Almacenamiento Local (Local Persistence Engine)
 * Facultad de Ciencias Marinas · UABC
 * 
 * Permite que la plataforma de planeación funcione de forma abierta, rápida y 100%
 * autónoma en Google Sites y GitHub Pages, sin bloqueos de bases de datos externas.
 */

import {
  Espacio,
  Curso,
  Grupo,
  ComponenteGrupo,
  Subgrupo,
  Asignacion,
  Usuario,
  ProgramaEducativo,
  Escenario,
  Periodo,
  EquivalenciaEspacio,
  PreferenciaDocente,
  RegistroHistorialCambio
} from '../types';

import espaciosInicialesRaw from '../data/espacios_iniciales_2027_1.json';
import {
  PROGRAMAS_INICIALES,
  PERIODO_INICIAL,
  ESCENARIOS_INICIALES,
  EQUIVALENCIAS_ESPACIOS_INICIALES,
  CURSOS_INICIALES,
  GRUPOS_INICIALES,
  COMPONENTES_INICIALES,
  SUBGRUPOS_INICIALES,
  ASIGNACIONES_INICIALES,
  USUARIOS_INICIALES
} from '../data/seed_data';
import { HISTORIAL_INICIAL } from '../data/historial_inicial';

const STORAGE_PREFIX = 'fcm_planeacion_2027_1_';

const KEYS = {
  ESPACIOS: `${STORAGE_PREFIX}espacios`,
  CURSOS: `${STORAGE_PREFIX}cursos`,
  GRUPOS: `${STORAGE_PREFIX}grupos`,
  COMPONENTES: `${STORAGE_PREFIX}componentes`,
  SUBGRUPOS: `${STORAGE_PREFIX}subgrupos`,
  ASIGNACIONES: `${STORAGE_PREFIX}asignaciones`,
  DOCENTES: `${STORAGE_PREFIX}docentes`,
  PROGRAMAS: `${STORAGE_PREFIX}programas`,
  ESCENARIOS: `${STORAGE_PREFIX}escenarios`,
  PERIODO: `${STORAGE_PREFIX}periodo`,
  EQUIVALENCIAS: `${STORAGE_PREFIX}equivalencias`,
  PREFERENCIAS: `${STORAGE_PREFIX}preferencias`,
  USUARIO_ACTIVO: `${STORAGE_PREFIX}usuario_activo`,
  HISTORIAL_CAMBIOS: `${STORAGE_PREFIX}historial_cambios`,
  VERSION: `${STORAGE_PREFIX}version_v2`
};

export interface EstadoCompletoApp {
  periodo: Periodo;
  escenarios: Escenario[];
  espacios: Espacio[];
  programas: ProgramaEducativo[];
  cursos: Curso[];
  grupos: Grupo[];
  componentes: ComponenteGrupo[];
  subgrupos: Subgrupo[];
  asignaciones: Asignacion[];
  docentes: Usuario[];
  equivalencias: EquivalenciaEspacio[];
  preferencias: PreferenciaDocente[];
  usuarioActivo: Usuario | null;
  historialCambios?: RegistroHistorialCambio[];
}

/**
 * Cargar datos desde localStorage o inicializar con los datos semilla
 */
export function cargarEstadoInicial(): EstadoCompletoApp {
  try {
    const versionGuardada = localStorage.getItem(KEYS.VERSION);
    // Si no hay versión o es anterior, inicializar con los datos oficiales de seed_data
    if (!versionGuardada) {
      return restablecerDatosPredeterminados();
    }

    const espaciosRaw = localStorage.getItem(KEYS.ESPACIOS);
    const cursosRaw = localStorage.getItem(KEYS.CURSOS);
    const asignacionesRaw = localStorage.getItem(KEYS.ASIGNACIONES);
    const docentesRaw = localStorage.getItem(KEYS.DOCENTES);
    const gruposRaw = localStorage.getItem(KEYS.GRUPOS);
    const programasRaw = localStorage.getItem(KEYS.PROGRAMAS);
    const escenariosRaw = localStorage.getItem(KEYS.ESCENARIOS);
    const periodoRaw = localStorage.getItem(KEYS.PERIODO);
    const equivalenciasRaw = localStorage.getItem(KEYS.EQUIVALENCIAS);
    const preferenciasRaw = localStorage.getItem(KEYS.PREFERENCIAS);
    const usuarioActivoRaw = localStorage.getItem(KEYS.USUARIO_ACTIVO);
    const historialRaw = localStorage.getItem(KEYS.HISTORIAL_CAMBIOS);

    const baseEspacios: Espacio[] =
      (espaciosInicialesRaw as any).espacios || espaciosInicialesRaw;

    let historial: RegistroHistorialCambio[] = HISTORIAL_INICIAL;
    if (historialRaw) {
      try {
        const parsedHist = JSON.parse(historialRaw);
        if (Array.isArray(parsedHist) && parsedHist.length > 0) {
          historial = parsedHist;
        }
      } catch (e) {}
    } else {
      localStorage.setItem(KEYS.HISTORIAL_CAMBIOS, JSON.stringify(HISTORIAL_INICIAL));
    }

    return {
      periodo: periodoRaw ? JSON.parse(periodoRaw) : PERIODO_INICIAL,
      escenarios: escenariosRaw ? JSON.parse(escenariosRaw) : ESCENARIOS_INICIALES,
      espacios: espaciosRaw ? JSON.parse(espaciosRaw) : baseEspacios,
      programas: programasRaw ? JSON.parse(programasRaw) : PROGRAMAS_INICIALES,
      cursos: cursosRaw ? JSON.parse(cursosRaw) : CURSOS_INICIALES,
      grupos: gruposRaw ? JSON.parse(gruposRaw) : GRUPOS_INICIALES,
      componentes: COMPONENTES_INICIALES,
      subgrupos: SUBGRUPOS_INICIALES,
      asignaciones: asignacionesRaw ? JSON.parse(asignacionesRaw) : ASIGNACIONES_INICIALES,
      docentes: docentesRaw ? JSON.parse(docentesRaw) : USUARIOS_INICIALES,
      equivalencias: equivalenciasRaw ? JSON.parse(equivalenciasRaw) : EQUIVALENCIAS_ESPACIOS_INICIALES,
      preferencias: preferenciasRaw ? JSON.parse(preferenciasRaw) : [],
      usuarioActivo: usuarioActivoRaw ? JSON.parse(usuarioActivoRaw) : USUARIOS_INICIALES[0],
      historialCambios: historial
    };
  } catch (error) {
    console.warn('Error al leer localStorage, cargando datos predeterminados:', error);
    return restablecerDatosPredeterminados();
  }
}

/**
 * Restablecer todo al estado inicial con la propuesta oficial 2027-1
 */
export function restablecerDatosPredeterminados(): EstadoCompletoApp {
  const baseEspacios: Espacio[] =
    (espaciosInicialesRaw as any).espacios || espaciosInicialesRaw;

  const estado: EstadoCompletoApp = {
    periodo: PERIODO_INICIAL,
    escenarios: ESCENARIOS_INICIALES,
    espacios: baseEspacios,
    programas: PROGRAMAS_INICIALES,
    cursos: CURSOS_INICIALES,
    grupos: GRUPOS_INICIALES,
    componentes: COMPONENTES_INICIALES,
    subgrupos: SUBGRUPOS_INICIALES,
    asignaciones: ASIGNACIONES_INICIALES,
    docentes: USUARIOS_INICIALES,
    equivalencias: EQUIVALENCIAS_ESPACIOS_INICIALES,
    preferencias: [],
    usuarioActivo: USUARIOS_INICIALES[0],
    historialCambios: HISTORIAL_INICIAL
  };

  guardarTodoEnStorage(estado);
  localStorage.setItem(KEYS.VERSION, 'fcm_2027_1_v2');
  return estado;
}

/**
 * Guardar estado completo en localStorage
 */
export function guardarTodoEnStorage(estado: EstadoCompletoApp): void {
  try {
    localStorage.setItem(KEYS.PERIODO, JSON.stringify(estado.periodo));
    localStorage.setItem(KEYS.ESCENARIOS, JSON.stringify(estado.escenarios));
    localStorage.setItem(KEYS.ESPACIOS, JSON.stringify(estado.espacios));
    localStorage.setItem(KEYS.PROGRAMAS, JSON.stringify(estado.programas));
    localStorage.setItem(KEYS.CURSOS, JSON.stringify(estado.cursos));
    localStorage.setItem(KEYS.GRUPOS, JSON.stringify(estado.grupos));
    localStorage.setItem(KEYS.ASIGNACIONES, JSON.stringify(estado.asignaciones));
    localStorage.setItem(KEYS.DOCENTES, JSON.stringify(estado.docentes));
    localStorage.setItem(KEYS.EQUIVALENCIAS, JSON.stringify(estado.equivalencias));
    localStorage.setItem(KEYS.PREFERENCIAS, JSON.stringify(estado.preferencias));
    if (estado.usuarioActivo) {
      localStorage.setItem(KEYS.USUARIO_ACTIVO, JSON.stringify(estado.usuarioActivo));
    }
    if (estado.historialCambios) {
      localStorage.setItem(KEYS.HISTORIAL_CAMBIOS, JSON.stringify(estado.historialCambios));
    }
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
  }
}

/**
 * Guardadores parciales para actualización reactiva
 */
export function guardarEspaciosStorage(espacios: Espacio[]) {
  try {
    localStorage.setItem(KEYS.ESPACIOS, JSON.stringify(espacios));
  } catch (e) {}
}

export function guardarCursosStorage(cursos: Curso[]) {
  try {
    localStorage.setItem(KEYS.CURSOS, JSON.stringify(cursos));
  } catch (e) {}
}

export function guardarAsignacionesStorage(asignaciones: Asignacion[]) {
  try {
    localStorage.setItem(KEYS.ASIGNACIONES, JSON.stringify(asignaciones));
  } catch (e) {}
}

export function guardarDocentesStorage(docentes: Usuario[]) {
  try {
    localStorage.setItem(KEYS.DOCENTES, JSON.stringify(docentes));
  } catch (e) {}
}

export function guardarGruposStorage(grupos: Grupo[]) {
  try {
    localStorage.setItem(KEYS.GRUPOS, JSON.stringify(grupos));
  } catch (e) {}
}

export function guardarUsuarioActivoStorage(usuario: Usuario | null) {
  try {
    if (usuario) {
      localStorage.setItem(KEYS.USUARIO_ACTIVO, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(KEYS.USUARIO_ACTIVO);
    }
  } catch (e) {}
}

export function formatearFechaHistorial(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return d.toLocaleDateString('es-MX', opciones);
  } catch (e) {
    return isoDate;
  }
}

export function cargarHistorialCambiosStorage(): RegistroHistorialCambio[] {
  try {
    const raw = localStorage.getItem(KEYS.HISTORIAL_CAMBIOS);
    if (!raw) {
      localStorage.setItem(KEYS.HISTORIAL_CAMBIOS, JSON.stringify(HISTORIAL_INICIAL));
      return HISTORIAL_INICIAL;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : HISTORIAL_INICIAL;
  } catch (e) {
    return HISTORIAL_INICIAL;
  }
}

export function guardarHistorialCambiosStorage(historial: RegistroHistorialCambio[]): void {
  try {
    localStorage.setItem(KEYS.HISTORIAL_CAMBIOS, JSON.stringify(historial));
  } catch (e) {
    console.error('Error al guardar historial en localStorage:', e);
  }
}

export function registrarCambioHistorial(
  cambio: Omit<RegistroHistorialCambio, 'id' | 'timestamp' | 'fecha_formateada'> & {
    timestamp?: string;
    fecha_formateada?: string;
  }
): RegistroHistorialCambio {
  try {
    const actual = cargarHistorialCambiosStorage();
    const now = new Date();
    const isoTimestamp = cambio.timestamp || now.toISOString();
    const nuevoRegistro: RegistroHistorialCambio = {
      ...cambio,
      id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: isoTimestamp,
      fecha_formateada: cambio.fecha_formateada || formatearFechaHistorial(isoTimestamp)
    };

    const actualizado = [nuevoRegistro, ...actual];
    const acotado = actualizado.slice(0, 250);
    guardarHistorialCambiosStorage(acotado);
    return nuevoRegistro;
  } catch (e) {
    console.error('Error al registrar cambio en historial:', e);
    return {
      ...cambio,
      id: `hist-fallback-${Date.now()}`,
      timestamp: new Date().toISOString(),
      fecha_formateada: 'Reciente'
    };
  }
}

export function limpiarHistorialCambiosStorage(): void {
  try {
    localStorage.setItem(KEYS.HISTORIAL_CAMBIOS, JSON.stringify([]));
  } catch (e) {}
}

/**
 * Exportar archivo JSON descargable de respaldo
 */
export function exportarRespaldoJSON(estado: EstadoCompletoApp): void {
  const jsonStr = JSON.stringify(estado, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Planeacion_FCM_2027_1_Respaldo_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Importar archivo JSON de respaldo
 */
export function importarRespaldoJSON(jsonStr: string): EstadoCompletoApp {
  const parsed = JSON.parse(jsonStr);
  if (!parsed.asignaciones || !parsed.cursos || !parsed.espacios) {
    throw new Error('El archivo no tiene la estructura de planeación FCM válida.');
  }
  guardarTodoEnStorage(parsed);
  return parsed;
}
