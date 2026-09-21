/**
 * Servicio de Firebase (Auth y Firestore)
 * Facultad de Ciencias Marinas (FCM) - UABC
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  runTransaction,
  query,
  where,
  Timestamp,
  Firestore
} from 'firebase/firestore';

import firebaseConfig from '../../firebase-applet-config.json';
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
import { Espacio, Asignacion, Usuario, PreferenciaDocente, Conflicto, Curso, Grupo } from '../types';
import { hayTraslapeHorario } from '../utils/conflicts';

// Inicialización de la aplicación Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Si firestoreDatabaseId está configurado, usarlo; de lo contrario usar base de datos predeterminada
export const db: Firestore = (firebaseConfig as any).firestoreDatabaseId
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  hd: 'uabc.edu.mx' // Preferir cuentas institucionales UABC
});

/**
 * Iniciar sesión con Google
 */
export async function iniciarSesionConGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  }
}

/**
 * Cerrar sesión
 */
export async function cerrarSesion() {
  try {
    await fbSignOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
}

/**
 * Escucha cambios en el estado de autenticación
 */
export function escucharAutenticacion(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// =========================================================================
// INICIALIZACIÓN DEL CATÁLOGO DE ESPACIOS Y DATOS 2027-1 EN FIRESTORE
// =========================================================================

/**
 * Carga o reinicializa el catálogo oficial de espacios y colecciones base en Firestore
 */
export async function inicializarCatalogoEspaciosFirestore(sobrescribir = false): Promise<{
  espaciosCargados: number;
  programasCargados: number;
  escenariosCargados: number;
  cursosCargados: number;
}> {
  let espaciosCargados = 0;
  let programasCargados = 0;
  let escenariosCargados = 0;
  let cursosCargados = 0;

  try {
    // 1. Cargar Periodo 2027-1
    await setDoc(doc(db, 'periodos', PERIODO_INICIAL.id), {
      ...PERIODO_INICIAL,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // 2. Cargar Escenarios iniciales
    for (const esc of ESCENARIOS_INICIALES) {
      await setDoc(doc(db, 'escenarios', esc.id), {
        ...esc,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      escenariosCargados++;
    }

    // 3. Cargar Programas Educativos FCM
    for (const prog of PROGRAMAS_INICIALES) {
      await setDoc(doc(db, 'programas_educativos', prog.id), {
        ...prog,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      programasCargados++;
    }

    // 4. Cargar Catálogo Oficial de Espacios FCM / IIO
    const espaciosLista = (espaciosInicialesRaw as any).espacios || espaciosInicialesRaw;
    for (const esp of espaciosLista) {
      const espRef = doc(db, 'espacios', esp.id);
      if (!sobrescribir) {
        const snap = await getDoc(espRef);
        if (snap.exists()) continue;
      }
      await setDoc(espRef, {
        ...esp,
        createdAt: esp.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      espaciosCargados++;
    }

    // 5. Cargar Equivalencias y alias iniciales
    for (const eq of EQUIVALENCIAS_ESPACIOS_INICIALES) {
      await setDoc(doc(db, 'catalogos', 'equivalencias_espacios', 'items', eq.id), {
        ...eq,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    // 6. Cargar Cursos iniciales
    for (const curso of CURSOS_INICIALES) {
      await setDoc(doc(db, 'cursos', curso.id), {
        ...curso,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      cursosCargados++;
    }

    // 7. Cargar Grupos iniciales
    for (const grupo of GRUPOS_INICIALES) {
      await setDoc(doc(db, 'grupos', grupo.id), {
        ...grupo,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    // 8. Cargar Componentes iniciales
    for (const comp of COMPONENTES_INICIALES) {
      await setDoc(doc(db, 'componentes_grupo', comp.id), {
        ...comp,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    // 9. Cargar Subgrupos iniciales
    for (const sub of SUBGRUPOS_INICIALES) {
      await setDoc(doc(db, 'subgrupos', sub.id), {
        ...sub,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    // 10. Cargar Usuarios iniciales
    for (const usu of USUARIOS_INICIALES) {
      await setDoc(doc(db, 'usuarios', usu.uid), {
        ...usu,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    // 11. Cargar Asignaciones modelo iniciales
    for (const asig of ASIGNACIONES_INICIALES) {
      await setDoc(doc(db, 'asignaciones', asig.id), {
        ...asig,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    return {
      espaciosCargados,
      programasCargados,
      escenariosCargados,
      cursosCargados
    };
  } catch (error) {
    console.error('Error al inicializar catálogo en Firestore:', error);
    throw error;
  }
}

// =========================================================================
// ASIGNACIÓN CON TRANSACCIÓN ATÓMICA Y DETECCIÓN CRÍTICA DE CONFLICTOS
// =========================================================================

/**
 * Guarda o actualiza una asignación en Firestore ejecutando una transacción atómica.
 * Valida exclusividad obligatoria de espacio y exclusividad obligatoria de docentes.
 * Si detecta conflicto bloqueante, ABORTA la transacción y lanza error explicativo.
 */
export async function guardarAsignacionConTransaccion(
  asignacion: Asignacion,
  espaciosMap: Map<string, Espacio>,
  docentesMap: Map<string, Usuario>
): Promise<void> {
  const asigRef = doc(db, 'asignaciones', asignacion.id);

  await runTransaction(db, async (transaction) => {
    // 1. Obtener todas las asignaciones existentes para este periodo, escenario y día
    const q = query(
      collection(db, 'asignaciones'),
      where('periodo_id', '==', asignacion.periodo_id),
      where('escenario_id', '==', asignacion.escenario_id),
      where('dia', '==', asignacion.dia),
      where('estatus', '!=', 'cancelado')
    );

    const snapshot = await getDocs(q);
    const existentes: Asignacion[] = [];
    snapshot.forEach((d) => {
      if (d.id !== asignacion.id) {
        existentes.push({ id: d.id, ...(d.data() as any) });
      }
    });

    // 2. Verificar traslape de espacio
    if (!asignacion.reserva_compartida_autorizada) {
      for (const exist of existentes) {
        if (exist.espacio_id === asignacion.espacio_id) {
          if (
            hayTraslapeHorario(
              asignacion.hora_inicio,
              asignacion.hora_fin,
              exist.hora_inicio,
              exist.hora_fin
            )
          ) {
            const espacio = espaciosMap.get(asignacion.espacio_id);
            const nom = espacio?.nombre || asignacion.espacio_nombre_snapshot || 'Espacio';
            const cod = espacio?.codigo || asignacion.espacio_codigo_snapshot || '';
            throw new Error(
              `CONFLICTO CRÍTICO DE ESPACIO: El espacio ${nom} (${cod}) ya se encuentra asignado el ${asignacion.dia} de ${exist.hora_inicio} a ${exist.hora_fin}. No se permite doble reserva de ${asignacion.hora_inicio} a ${asignacion.hora_fin}.`
            );
          }
        }
      }
    }

    // 3. Verificar traslape de profesores (exclusividad docente)
    for (const docenteId of asignacion.profesores_ids || []) {
      for (const exist of existentes) {
        if (exist.profesores_ids && exist.profesores_ids.includes(docenteId)) {
          if (
            hayTraslapeHorario(
              asignacion.hora_inicio,
              asignacion.hora_fin,
              exist.hora_inicio,
              exist.hora_fin
            )
          ) {
            const docente = docentesMap.get(docenteId);
            const nomDoc = docente?.nombre || docenteId;
            throw new Error(
              `CONFLICTO CRÍTICO DOCENTE: El profesor ${nomDoc} ya tiene una sesión asignada el ${asignacion.dia} de ${exist.hora_inicio} a ${exist.hora_fin} en ${exist.espacio_nombre_snapshot || exist.espacio_id}. No puede impartir dos clases simultáneas de ${asignacion.hora_inicio} a ${asignacion.hora_fin}.`
            );
          }
        }
      }
    }

    // 4. Si todo es válido, realizar la escritura atómica
    transaction.set(asigRef, {
      ...asignacion,
      updatedAt: new Date().toISOString()
    });
  });
}

/**
 * Elimina una asignación en Firestore
 */
export async function eliminarAsignacionFirestore(asignacionId: string): Promise<void> {
  await deleteDoc(doc(db, 'asignaciones', asignacionId));
}

/**
 * Guarda o actualiza una preferencia docente
 */
export async function guardarPreferenciaDocenteFirestore(
  preferencia: PreferenciaDocente
): Promise<void> {
  const ref = doc(db, 'preferencias', preferencia.id);
  await setDoc(ref, {
    ...preferencia,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

/**
 * Guarda o actualiza un espacio/aula en Firestore
 */
export async function guardarEspacioFirestore(espacio: Espacio): Promise<void> {
  const ref = doc(db, 'espacios', espacio.id);
  await setDoc(ref, {
    ...espacio,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

/**
 * Guarda o actualiza una asignatura/curso en Firestore
 */
export async function guardarCursoFirestore(curso: Curso): Promise<void> {
  const ref = doc(db, 'cursos', curso.id);
  await setDoc(ref, {
    ...curso,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

/**
 * Guarda o actualiza un grupo base en Firestore
 */
export async function guardarGrupoFirestore(grupo: Grupo): Promise<void> {
  const ref = doc(db, 'grupos', grupo.id);
  await setDoc(ref, {
    ...grupo,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}
