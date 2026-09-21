/**
 * Aplicación Principal: Planeación Académica FCM 2027-1
 * Facultad de Ciencias Marinas · UABC Campus Ensenada
 * Modo Abierto de Programación de Horarios (Local-First, Google Sites & GitHub Ready)
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar, VistaActiva } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PlanificacionView } from './components/PlanificacionView';
import { MatrizEspaciosView } from './components/MatrizEspaciosView';
import { AgendaDocentesView } from './components/AgendaDocentesView';
import { HomologacionView } from './components/HomologacionView';
import { PreferenciasDocenteView } from './components/PreferenciasDocenteView';
import { ConflictosView } from './components/ConflictosView';
import { ImportExportView } from './components/ImportExportView';
import { ModalInicializarEspacios } from './components/ModalInicializarEspacios';
import { ModalEditarPerfilDocente } from './components/ModalEditarPerfilDocente';
import { ModalEditarAula } from './components/ModalEditarAula';
import { ModalCrearAula } from './components/ModalCrearAula';
import { ModalCrearAsignaturaConHorario } from './components/ModalCrearAsignaturaConHorario';
import { ModalMoverAsignacion } from './components/ModalMoverAsignacion';
import { InfografiaView } from './components/InfografiaView';
import { MapaAulasView } from './components/MapaAulasView';
import { ReporteAvanceView } from './components/ReporteAvanceView';

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
  Conflicto
} from './types';

import {
  cargarEstadoInicial,
  guardarTodoEnStorage,
  guardarEspaciosStorage,
  guardarCursosStorage,
  guardarAsignacionesStorage,
  guardarDocentesStorage,
  guardarGruposStorage,
  guardarUsuarioActivoStorage,
  exportarRespaldoJSON,
  importarRespaldoJSON,
  restablecerDatosPredeterminados,
  EstadoCompletoApp
} from './services/storage';

import {
  iniciarSesionConGoogle,
  cerrarSesion,
  escucharAutenticacion,
  inicializarCatalogoEspaciosFirestore
} from './services/firebase';

import { validarAsignacion } from './utils/conflicts';
import { normalizarTexto } from './utils/normalization';

export default function App() {
  // Inicialización de estado completo desde almacenamiento local
  const [estadoBase, setEstadoBase] = useState<EstadoCompletoApp>(() => cargarEstadoInicial());

  // Estados reactivos principales
  const [periodoActivo, setPeriodoActivo] = useState<Periodo>(estadoBase.periodo);
  const [escenarios, setEscenarios] = useState<Escenario[]>(estadoBase.escenarios);
  const [escenarioActivoId, setEscenarioActivoId] = useState<string>('oficial');

  const [espacios, setEspacios] = useState<Espacio[]>(estadoBase.espacios);
  const [programas, setProgramas] = useState<ProgramaEducativo[]>(estadoBase.programas);
  const [cursos, setCursos] = useState<Curso[]>(estadoBase.cursos);
  const [grupos, setGrupos] = useState<Grupo[]>(estadoBase.grupos);
  const [componentes, setComponentes] = useState<ComponenteGrupo[]>(estadoBase.componentes);
  const [subgrupos, setSubgrupos] = useState<Subgrupo[]>(estadoBase.subgrupos);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>(estadoBase.asignaciones);
  const [docentes, setDocentes] = useState<Usuario[]>(estadoBase.docentes);
  const [equivalencias, setEquivalencias] = useState<EquivalenciaEspacio[]>(estadoBase.equivalencias);
  const [preferenciasDocentes, setPreferenciasDocentes] = useState<PreferenciaDocente[]>(estadoBase.preferencias);

  // Estados de Navegación y Usuario
  const [vistaActiva, setVistaActiva] = useState<VistaActiva>('dashboard');
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(() => {
    // Si hay usuario guardado, usarlo; de lo contrario Dra. Ivone Giffard (admin)
    return estadoBase.usuarioActivo || estadoBase.docentes.find((d) => d.email === 'igiffard@uabc.edu.mx') || estadoBase.docentes[0];
  });

  // Modales
  const [modalInicializarAbierto, setModalInicializarAbierto] = useState<boolean>(false);
  const [modalNuevaAsignacionAbierto, setModalNuevaAsignacionAbierto] = useState<boolean>(false);
  const [modalEditarPerfilAbierto, setModalEditarPerfilAbierto] = useState<boolean>(false);
  const [modalCrearAsignaturaAbierto, setModalCrearAsignaturaAbierto] = useState<boolean>(false);
  const [modalCrearAulaAbierto, setModalCrearAulaAbierto] = useState<boolean>(false);
  const [modalEditarAulaAbierto, setModalEditarAulaAbierto] = useState<boolean>(false);
  const [aulaParaEditar, setAulaParaEditar] = useState<Espacio | null>(null);
  const [aulaMagnaUnificada, setAulaMagnaUnificada] = useState<boolean>(false);
  const [estaCargando, setEstaCargando] = useState<boolean>(false);

  // Modal para mover en tiempo y espacio físico
  const [modalMoverAbierto, setModalMoverAbierto] = useState<boolean>(false);
  const [asignacionParaMover, setAsignacionParaMover] = useState<Asignacion | null>(null);

  // Mapas de búsqueda rápida
  const espaciosMap = useMemo(() => new Map(espacios.map((e) => [e.id, e])), [espacios]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);
  const escenarioActivo = useMemo(
    () => escenarios.find((e) => e.id === escenarioActivoId),
    [escenarios, escenarioActivoId]
  );

  // Escuchar autenticación de Google de forma transparente y no bloqueante
  useEffect(() => {
    try {
      const unsubAuth = escucharAutenticacion(async (fbUser) => {
        if (fbUser) {
          const emailLower = (fbUser.email || '').toLowerCase();
          const esAdminInstitucional =
            emailLower === 'igiffard@uabc.edu.mx' ||
            emailLower.includes('giffard') ||
            emailLower === 'subdireccion.fcm@uabc.edu.mx';

          // Buscar si ya existe en catálogo
          const usuarioEncontrado = docentes.find(
            (d) => d.email.toLowerCase() === emailLower || d.uid === fbUser.uid
          );

          if (esAdminInstitucional) {
            const adminFCM: Usuario = {
              uid: fbUser.uid,
              nombre: 'Dra. Ivone Giffard',
              titulo_academico: 'Dra.',
              cargo: 'Subdirectora FCM',
              email: 'igiffard@uabc.edu.mx',
              email_normalizado: 'igiffard@uabc.edu.mx',
              role: 'admin',
              programas_asignados_ids: ['OCE', 'BIO', 'BMA', 'CTA', 'MOC', 'DOC', 'EGA'],
              niveles_asignados: ['licenciatura', 'posgrado'],
              activo: true,
              createdAt: usuarioEncontrado?.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            setUsuarioActual(adminFCM);
            guardarUsuarioActivoStorage(adminFCM);
          } else if (usuarioEncontrado) {
            const actualizado: Usuario = {
              ...usuarioEncontrado,
              uid: fbUser.uid,
              nombre: usuarioEncontrado.nombre || fbUser.displayName || 'Docente FCM',
              email: fbUser.email || usuarioEncontrado.email
            };
            setUsuarioActual(actualizado);
            guardarUsuarioActivoStorage(actualizado);
          } else {
            const nombreGoogle =
              fbUser.displayName && fbUser.displayName.trim().length > 2
                ? fbUser.displayName
                : fbUser.email
                ? fbUser.email.split('@')[0].replace('.', ' ')
                : 'Docente FCM';

            const nuevoDocente: Usuario = {
              uid: fbUser.uid,
              nombre: nombreGoogle,
              email: fbUser.email || '',
              email_normalizado: emailLower,
              role: 'profesor',
              cargo: 'Docente FCM',
              titulo_academico: 'Dr./Mtro.',
              programas_asignados_ids: ['OCE'],
              niveles_asignados: ['licenciatura'],
              activo: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            setUsuarioActual(nuevoDocente);
            guardarUsuarioActivoStorage(nuevoDocente);
            setDocentes((prev) => {
              const updated = [...prev, nuevoDocente];
              guardarDocentesStorage(updated);
              return updated;
            });
          }
        }
      });

      return () => {
        unsubAuth();
      };
    } catch (e) {
      console.info('Modo Local Autónomo Activo (sin Firebase Auth)');
    }
  }, [docentes]);

  // Sincronizar usuario activo cuando se cambia por selector
  const handleCambiarUsuarioActivo = (usuario: Usuario | null) => {
    setUsuarioActual(usuario);
    guardarUsuarioActivoStorage(usuario);
  };

  // Auditoría continua de conflictos en el escenario activo
  const conflictosDetectados = useMemo(() => {
    const lista: Conflicto[] = [];
    const asignacionesEscenario = asignaciones.filter(
      (a) => a.escenario_id === escenarioActivoId && a.estatus !== 'cancelado'
    );

    for (const asig of asignacionesEscenario) {
      const val = validarAsignacion(asig, asignacionesEscenario, espaciosMap, preferenciasDocentes);
      if (val.conflictos.length > 0) {
        lista.push(...val.conflictos);
      }
    }

    // Deduplicar conflictos por id
    const vistos = new Set<string>();
    return lista.filter((c) => {
      if (vistos.has(c.id)) return false;
      vistos.add(c.id);
      return true;
    });
  }, [asignaciones, escenarioActivoId, espaciosMap, preferenciasDocentes]);

  const conflictosCriticos = useMemo(
    () => conflictosDetectados.filter((c) => c.bloqueante),
    [conflictosDetectados]
  );

  // Manejador para abrir modal de mover asignación en tiempo y espacio
  const handleAbrirMoverAsignacion = (asig: Asignacion) => {
    setAsignacionParaMover(asig);
    setModalMoverAbierto(true);
  };

  // Manejador para guardar o modificar asignación (local y reactivo)
  const handleGuardarAsignacion = async (nuevaAsig: Asignacion) => {
    setEstaCargando(true);
    try {
      setAsignaciones((prev) => {
        const existe = prev.some((a) => a.id === nuevaAsig.id);
        const actualizadas = existe
          ? prev.map((a) => (a.id === nuevaAsig.id ? nuevaAsig : a))
          : [...prev, nuevaAsig];
        guardarAsignacionesStorage(actualizadas);
        return actualizadas;
      });
    } catch (error: any) {
      console.error('Error al guardar asignación:', error);
      throw error;
    } finally {
      setEstaCargando(false);
    }
  };

  // Manejador para eliminar asignación
  const handleEliminarAsignacion = async (asigId: string) => {
    setAsignaciones((prev) => {
      const actualizadas = prev.filter((a) => a.id !== asigId);
      guardarAsignacionesStorage(actualizadas);
      return actualizadas;
    });
  };

  // Manejador para guardar preferencias docentes
  const handleGuardarPreferencia = async (pref: PreferenciaDocente) => {
    setPreferenciasDocentes((prev) => {
      const existe = prev.some((p) => p.id === pref.id);
      const actualizadas = existe
        ? prev.map((p) => (p.id === pref.id ? pref : p))
        : [...prev, pref];
      guardarTodoEnStorage({
        periodo: periodoActivo,
        escenarios,
        espacios,
        programas,
        cursos,
        grupos,
        componentes,
        subgrupos,
        asignaciones,
        docentes,
        equivalencias,
        preferencias: actualizadas,
        usuarioActivo: usuarioActual
      });
      return actualizadas;
    });
  };

  // Manejador para registrar equivalencias de espacios
  const handleAgregarEquivalencia = async (eq: EquivalenciaEspacio) => {
    setEquivalencias((prev) => {
      const actualizadas = [...prev, eq];
      guardarTodoEnStorage({
        periodo: periodoActivo,
        escenarios,
        espacios,
        programas,
        cursos,
        grupos,
        componentes,
        subgrupos,
        asignaciones,
        docentes,
        equivalencias: actualizadas,
        preferencias: preferenciasDocentes,
        usuarioActivo: usuarioActual
      });
      return actualizadas;
    });
  };

  // Manejador para importar asignaciones desde CSV
  const handleImportarAsignaciones = async (nuevas: Asignacion[]) => {
    setAsignaciones((prev) => {
      const actualizadas = [...prev, ...nuevas];
      guardarAsignacionesStorage(actualizadas);
      return actualizadas;
    });
  };

  // Manejador para inicializar catálogo de espacios
  const handleInicializarEspacios = async (sobrescribir: boolean) => {
    setEstaCargando(true);
    try {
      const resultado = await inicializarCatalogoEspaciosFirestore(sobrescribir);
      return resultado;
    } catch (e) {
      return { total: espacios.length, creados: 0, actualizados: espacios.length };
    } finally {
      setEstaCargando(false);
    }
  };

  // Manejador para crear nueva asignatura con horarios (profesores y administradores)
  const handleGuardarNuevaAsignaturaConHorario = async (
    nuevoCurso: Curso,
    nuevoGrupo: Grupo,
    nuevaAsignacion: Asignacion
  ) => {
    setEstaCargando(true);
    try {
      // 1. Guardar Curso
      setCursos((prev) => {
        const existe = prev.some((c) => c.id === nuevoCurso.id);
        const actualizados = existe ? prev.map((c) => (c.id === nuevoCurso.id ? nuevoCurso : c)) : [...prev, nuevoCurso];
        guardarCursosStorage(actualizados);
        return actualizados;
      });

      // 2. Guardar Grupo
      setGrupos((prev) => {
        const existe = prev.some((g) => g.id === nuevoGrupo.id);
        const actualizados = existe ? prev.map((g) => (g.id === nuevoGrupo.id ? nuevoGrupo : g)) : [...prev, nuevoGrupo];
        guardarGruposStorage(actualizados);
        return actualizados;
      });

      // 3. Guardar asignación
      await handleGuardarAsignacion(nuevaAsignacion);

      setModalCrearAsignaturaAbierto(false);
    } catch (error: any) {
      console.error('Error al registrar asignatura con horario:', error);
      throw error;
    } finally {
      setEstaCargando(false);
    }
  };

  // Manejador para actualizar datos y nombre de aula
  const handleActualizarAula = async (espacioActualizado: Espacio) => {
    setEstaCargando(true);
    try {
      setEspacios((prev) => {
        const actualizados = prev.map((esp) => (esp.id === espacioActualizado.id ? espacioActualizado : esp));
        guardarEspaciosStorage(actualizados);
        return actualizados;
      });

      // Actualizar snapshots en asignaciones vinculadas
      setAsignaciones((prev) => {
        const actualizadas = prev.map((asig) => {
          if (asig.espacio_id === espacioActualizado.id) {
            return {
              ...asig,
              espacio_nombre_snapshot: espacioActualizado.nombre,
              espacio_codigo_snapshot: espacioActualizado.codigo
            };
          }
          return asig;
        });
        guardarAsignacionesStorage(actualizadas);
        return actualizadas;
      });

      setModalEditarAulaAbierto(false);
      setAulaParaEditar(null);
    } catch (error) {
      console.error('Error al actualizar aula:', error);
      throw error;
    } finally {
      setEstaCargando(false);
    }
  };

  // Manejador para crear nueva aula en el catálogo
  const handleCrearNuevaAula = async (nuevaAula: Espacio) => {
    setEstaCargando(true);
    try {
      setEspacios((prev) => {
        const existe = prev.some((e) => e.id === nuevaAula.id || e.codigo === nuevaAula.codigo);
        const actualizados = existe ? prev.map((e) => (e.id === nuevaAula.id ? nuevaAula : e)) : [...prev, nuevaAula];
        guardarEspaciosStorage(actualizados);
        return actualizados;
      });

      setModalCrearAulaAbierto(false);
    } catch (error) {
      console.error('Error al crear aula:', error);
      throw error;
    } finally {
      setEstaCargando(false);
    }
  };

  const handleAbrirEditarAula = (espacio: Espacio) => {
    setAulaParaEditar(espacio);
    setModalEditarAulaAbierto(true);
  };

  const handleIniciarSesionGoogle = async () => {
    try {
      await iniciarSesionConGoogle();
    } catch (err: any) {
      console.warn('Inicio de sesión Google:', err);
    }
  };

  const handleGuardarUsuarioDocente = async (usuarioActualizado: Usuario) => {
    setUsuarioActual(usuarioActualizado);
    guardarUsuarioActivoStorage(usuarioActualizado);

    setDocentes((prev) => {
      const existe = prev.some((d) => d.uid === usuarioActualizado.uid);
      const actualizados = existe
        ? prev.map((d) => (d.uid === usuarioActualizado.uid ? usuarioActualizado : d))
        : [...prev, usuarioActualizado];
      guardarDocentesStorage(actualizados);
      return actualizados;
    });

    // Sincronizar nombre en asignaciones existentes del profesor
    setAsignaciones((prev) => {
      const actualizadas = prev.map((a) =>
        a.docente_id === usuarioActualizado.uid
          ? { ...a, docente_nombre: usuarioActualizado.nombre }
          : a
      );
      guardarAsignacionesStorage(actualizadas);
      return actualizadas;
    });
  };

  const handleUnificarAulas = async (variante: string, espacioOficialId: string) => {
    const espacioOficial = espacios.find((e) => e.id === espacioOficialId);
    if (!espacioOficial) {
      throw new Error('El espacio canónico oficial no fue encontrado.');
    }

    const varianteNorm = normalizarTexto(variante);
    let asignacionesModificadas = 0;
    let espaciosEliminados = 0;

    const espaciosRedundantes = espacios.filter(
      (esp) =>
        esp.id !== espacioOficial.id &&
        (normalizarTexto(esp.codigo) === varianteNorm ||
          normalizarTexto(esp.nombre) === varianteNorm ||
          normalizarTexto(esp.nombre).includes(varianteNorm) ||
          varianteNorm.includes(normalizarTexto(esp.nombre)))
    );

    const idsRedundantes = new Set(espaciosRedundantes.map((e) => e.id));

    const nuevasAsignaciones = asignaciones.map((asig) => {
      const debeMigrar =
        idsRedundantes.has(asig.espacio_id) ||
        (asig.espacio_nombre && normalizarTexto(asig.espacio_nombre) === varianteNorm) ||
        (asig.espacio_codigo && normalizarTexto(asig.espacio_codigo) === varianteNorm);

      if (debeMigrar) {
        asignacionesModificadas++;
        return {
          ...asig,
          espacio_id: espacioOficial.id,
          espacio_codigo: espacioOficial.codigo,
          espacio_nombre: espacioOficial.nombre,
          espacio_capacidad: espacioOficial.capacidad_maxima
        };
      }
      return asig;
    });

    setAsignaciones(nuevasAsignaciones);
    guardarAsignacionesStorage(nuevasAsignaciones);

    if (espaciosRedundantes.length > 0) {
      espaciosEliminados = espaciosRedundantes.length;
      setEspacios((prev) => {
        const filtrados = prev.filter((esp) => !idsRedundantes.has(esp.id));
        guardarEspaciosStorage(filtrados);
        return filtrados;
      });
    }

    const nuevaEq: EquivalenciaEspacio = {
      id: `eq_unif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      texto_entrada: variante,
      texto_normalizado: varianteNorm,
      espacio_id: espacioOficial.id,
      codigo_oficial: espacioOficial.codigo,
      nombre_oficial: espacioOficial.nombre,
      tipo_equivalencia: 'alias',
      activo: true,
      createdAt: new Date().toISOString()
    };
    await handleAgregarEquivalencia(nuevaEq);

    if (espacioOficial.codigo === 'AM1' || varianteNorm.includes('magna')) {
      setAulaMagnaUnificada(true);
    }

    return {
      espacioOficial,
      asignacionesActualizadas: asignacionesModificadas,
      espaciosRemovidos: espaciosEliminados,
      mensaje: `Aula "${variante}" consolidada exitosamente en "${espacioOficial.codigo} - ${espacioOficial.nombre}". Se actualizaron ${asignacionesModificadas} clases.`
    };
  };

  const handleUnificarTodasLasAulas = async () => {
    let totalAsig = 0;
    let totalEspRem = 0;

    const mapeosEstandar: { variante: string; codigoOficial: string }[] = [
      { variante: 'Aula Magna 1', codigoOficial: 'AM1' },
      { variante: 'AM 1', codigoOficial: 'AM1' },
      { variante: 'Aula Magna I', codigoOficial: 'AM1' },
      { variante: 'Aula Magna 2', codigoOficial: 'AM2' },
      { variante: 'AM 2', codigoOficial: 'AM2' },
      { variante: 'Aula Magna II', codigoOficial: 'AM2' },
      { variante: 'Salon 1', codigoOficial: 'S1' },
      { variante: 'S-1', codigoOficial: 'S1' },
      { variante: 'Salon 2', codigoOficial: 'S2' },
      { variante: 'S-2', codigoOficial: 'S2' },
      { variante: 'Salon 3', codigoOficial: 'S3' },
      { variante: 'S-3', codigoOficial: 'S3' },
      { variante: 'Salon 5', codigoOficial: 'S5' },
      { variante: 'S-5', codigoOficial: 'S5' },
      { variante: 'Salon 6', codigoOficial: 'S6' },
      { variante: 'S-6', codigoOficial: 'S6' },
      { variante: 'Salon 7', codigoOficial: 'S7' },
      { variante: 'S-7', codigoOficial: 'S7' },
      { variante: 'Salon 8', codigoOficial: 'S8' },
      { variante: 'S-8', codigoOficial: 'S8' },
      { variante: 'Posgrado 1', codigoOficial: 'SP1' },
      { variante: 'SP-1', codigoOficial: 'SP1' },
      { variante: 'Posgrado 2', codigoOficial: 'SP2' },
      { variante: 'SP-2', codigoOficial: 'SP2' },
      { variante: 'Lab. Nutricion', codigoOficial: 'LNU' },
      { variante: 'Lab. Biologia Marina', codigoOficial: 'LMB' }
    ];

    for (const m of mapeosEstandar) {
      const espOficial = espacios.find((e) => e.codigo === m.codigoOficial);
      if (espOficial) {
        try {
          const res = await handleUnificarAulas(m.variante, espOficial.id);
          totalAsig += res.asignacionesActualizadas;
          totalEspRem += res.espaciosRemovidos;
        } catch (e) {
          console.warn('Error en mapeo estándar:', m.variante, e);
        }
      }
    }

    setAulaMagnaUnificada(true);
    return {
      totalAsignaciones: totalAsig,
      totalEspaciosRemovidos: totalEspRem,
      mensaje: `Consolidación finalizada: ${totalAsig} asignaciones migradas a opciones oficiales canónicas.`
    };
  };

  const handleHomologarEspacioDuda = async (espacioDudaId: string, espacioOficialDestinoId: string) => {
    const espacioDuda = espacios.find((e) => e.id === espacioDudaId);
    const espacioDestino = espacios.find((e) => e.id === espacioOficialDestinoId);
    if (!espacioDuda || !espacioDestino) return;

    // 1. Reasignar todas las clases que usan este espacio hacia el espacio oficial
    let actualizadas = 0;
    const nuevasAsignaciones = asignaciones.map((a) => {
      if (a.espacio_id === espacioDudaId || a.espacio_codigo === espacioDuda.codigo) {
        actualizadas++;
        return {
          ...a,
          espacio_id: espacioDestino.id,
          espacio_codigo: espacioDestino.codigo,
          espacio_nombre: espacioDestino.nombre,
          updatedAt: new Date().toISOString()
        };
      }
      return a;
    });
    setAsignaciones(nuevasAsignaciones);
    guardarAsignacionesStorage(nuevasAsignaciones);

    // 2. Registrar equivalencia por nombre y por código
    const nuevaEqNombre: EquivalenciaEspacio = {
      id: `eq_nom_${Date.now()}_${espacioDuda.codigo}`,
      texto_entrada: espacioDuda.nombre,
      texto_normalizado: normalizarTexto(espacioDuda.nombre),
      espacio_id: espacioDestino.id,
      codigo_oficial: espacioDestino.codigo,
      nombre_oficial: espacioDestino.nombre,
      tipo_equivalencia: 'nombre_historico',
      activo: true,
      notas: `Homologado por Subdirección desde ${espacioDuda.codigo} a ${espacioDestino.codigo}`,
      createdAt: new Date().toISOString(),
      requiere_revision_subdireccion: false,
      estado_revision: 'aprobada'
    };
    await handleAgregarEquivalencia(nuevaEqNombre);

    if (espacioDuda.codigo !== espacioDestino.codigo) {
      const nuevaEqCodigo: EquivalenciaEspacio = {
        id: `eq_cod_${Date.now()}_${espacioDuda.codigo}`,
        texto_entrada: espacioDuda.codigo,
        texto_normalizado: normalizarTexto(espacioDuda.codigo),
        espacio_id: espacioDestino.id,
        codigo_oficial: espacioDestino.codigo,
        nombre_oficial: espacioDestino.nombre,
        tipo_equivalencia: 'codigo',
        activo: true,
        notas: `Homologado por Subdirección (${espacioDuda.codigo} -> ${espacioDestino.codigo})`,
        createdAt: new Date().toISOString(),
        requiere_revision_subdireccion: false,
        estado_revision: 'aprobada'
      };
      await handleAgregarEquivalencia(nuevaEqCodigo);
    }

    // 3. Marcar espacio dudoso como homologado e inactivo para nuevas asignaciones
    const nuevosEspacios = espacios.map((e) => {
      if (e.id === espacioDudaId) {
        return {
          ...e,
          duda_homologacion: false,
          estado_catalogo: 'aprobado_subdireccion' as const,
          activo: false,
          apto_para_docencia: false,
          motivo_duda: `Homologado oficialmente al espacio ${espacioDestino.codigo} (${espacioDestino.nombre}).`,
          notas: `Homologado a ${espacioDestino.codigo} por Subdirección`,
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    });
    setEspacios(nuevosEspacios);
    guardarEspaciosStorage(nuevosEspacios);

    return {
      actualizadas,
      mensaje: `Espacio ${espacioDuda.codigo} homologado exitosamente a ${espacioDestino.codigo}. ${actualizadas} clases migradas al aula oficial.`
    };
  };

  const handleRatificarEspacioDuda = async (espacioDudaId: string) => {
    const nuevosEspacios = espacios.map((e) => {
      if (e.id === espacioDudaId) {
        return {
          ...e,
          duda_homologacion: false,
          estado_catalogo: 'aprobado_subdireccion' as const,
          motivo_duda: 'Ratificado por Subdirección como espacio de apoyo autorizado.',
          updatedAt: new Date().toISOString()
        };
      }
      return e;
    });
    setEspacios(nuevosEspacios);
    guardarEspaciosStorage(nuevosEspacios);
  };

  const handleCerrarSesion = async () => {
    try {
      await cerrarSesion();
    } catch (e) {}
    const adminDefault = docentes.find((d) => d.email === 'igiffard@uabc.edu.mx') || docentes[0];
    setUsuarioActual(adminDefault);
    guardarUsuarioActivoStorage(adminDefault);
  };

  // Manejadores de respaldo y restauración JSON
  const handleExportarJSON = () => {
    const estadoActual: EstadoCompletoApp = {
      periodo: periodoActivo,
      escenarios,
      espacios,
      programas,
      cursos,
      grupos,
      componentes,
      subgrupos,
      asignaciones,
      docentes,
      equivalencias,
      preferencias: preferenciasDocentes,
      usuarioActivo: usuarioActual
    };
    exportarRespaldoJSON(estadoActual);
  };

  const handleImportarJSON = (jsonStr: string) => {
    try {
      const estadoCargado = importarRespaldoJSON(jsonStr);
      setPeriodoActivo(estadoCargado.periodo);
      setEscenarios(estadoCargado.escenarios);
      setEspacios(estadoCargado.espacios);
      setProgramas(estadoCargado.programas);
      setCursos(estadoCargado.cursos);
      setGrupos(estadoCargado.grupos);
      setComponentes(estadoCargado.componentes);
      setSubgrupos(estadoCargado.subgrupos);
      setAsignaciones(estadoCargado.asignaciones);
      setDocentes(estadoCargado.docentes);
      setEquivalencias(estadoCargado.equivalencias);
      setPreferenciasDocentes(estadoCargado.preferencias);
      alert('¡Respaldo restaurado exitosamente! Todos los horarios y cursos han sido actualizados.');
    } catch (err: any) {
      alert(err.message || 'Error al importar archivo de respaldo');
    }
  };

  const handleRestablecerDatos = () => {
    const defaultState = restablecerDatosPredeterminados();
    setPeriodoActivo(defaultState.periodo);
    setEscenarios(defaultState.escenarios);
    setEspacios(defaultState.espacios);
    setProgramas(defaultState.programas);
    setCursos(defaultState.cursos);
    setGrupos(defaultState.grupos);
    setComponentes(defaultState.componentes);
    setSubgrupos(defaultState.subgrupos);
    setAsignaciones(defaultState.asignaciones);
    setDocentes(defaultState.docentes);
    setEquivalencias(defaultState.equivalencias);
    setPreferenciasDocentes(defaultState.preferencias);
    const admin = defaultState.docentes.find((d) => d.email === 'igiffard@uabc.edu.mx') || defaultState.docentes[0];
    setUsuarioActual(admin);
    alert('Se han restablecido los datos a la propuesta oficial 2027-1.');
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] font-sans text-slate-900 overflow-hidden antialiased">
      {/* Barra de Encabezado Superior */}
      <Header
        periodoActivo={periodoActivo}
        escenarios={escenarios}
        escenarioActivoId={escenarioActivoId}
        onCambiarEscenario={setEscenarioActivoId}
        usuarioActual={usuarioActual}
        onCambiarUsuarioSimulado={handleCambiarUsuarioActivo}
        usuariosDisponibles={docentes}
        onIniciarSesionGoogle={handleIniciarSesionGoogle}
        onCerrarSesion={handleCerrarSesion}
        onAbrirModalInicializar={() => setModalInicializarAbierto(true)}
        onNavegarExport={() => setVistaActiva('import_export')}
        onEditarPerfil={() => setModalEditarPerfilAbierto(true)}
        estaCargando={estaCargando}
      />

      {/* Cuerpo de la Aplicación: Sidebar + Contenido Activo */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <Sidebar
          vistaActiva={vistaActiva}
          onSeleccionarVista={setVistaActiva}
          numeroConflictosCriticos={conflictosCriticos.length}
          roleUsuario={usuarioActual?.role}
          usuarioActual={usuarioActual}
          onEditarPerfil={() => setModalEditarPerfilAbierto(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {vistaActiva === 'dashboard' && (
            <DashboardView
              espacios={espacios}
              cursos={cursos}
              grupos={grupos}
              asignaciones={asignaciones.filter((a) => a.escenario_id === escenarioActivoId)}
              programas={programas}
              escenarioActivo={escenarioActivo}
              conflictos={conflictosDetectados}
              onNavegar={setVistaActiva}
              onAbrirModalInicializar={() => setModalInicializarAbierto(true)}
              onAbrirNuevaAsignacion={() => {
                setVistaActiva('planificacion');
                setModalNuevaAsignacionAbierto(true);
              }}
              onAbrirNuevaAsignatura={() => setModalCrearAsignaturaAbierto(true)}
              onAbrirCrearAula={() => setModalCrearAulaAbierto(true)}
              roleUsuario={usuarioActual?.role}
              onUnificarAula={handleUnificarAulas}
              aulaMagnaUnificada={aulaMagnaUnificada}
            />
          )}

          {vistaActiva === 'reporte_avance' && (
            <ReporteAvanceView
              programas={programas}
              cursos={cursos}
              grupos={grupos}
              asignaciones={asignaciones}
              espacios={espacios}
              docentes={docentes}
              escenarioActivoId={escenarioActivoId}
              onNavegarVista={setVistaActiva}
              onSeleccionarAula={(_aulaId) => {
                setVistaActiva('matriz_espacios');
              }}
            />
          )}

          {vistaActiva === 'infografia' && (
            <InfografiaView
              onNavegar={setVistaActiva}
              onAbrirNuevaAsignatura={() => setModalCrearAsignaturaAbierto(true)}
              onAbrirCrearAula={() => setModalCrearAulaAbierto(true)}
              roleUsuario={usuarioActual?.role}
            />
          )}

          {vistaActiva === 'planificacion' && (
            <PlanificacionView
              asignaciones={asignaciones}
              cursos={cursos}
              espacios={espacios}
              grupos={grupos}
              componentes={componentes}
              subgrupos={subgrupos}
              docentes={docentes}
              programas={programas}
              escenarioActivoId={escenarioActivoId}
              periodoActivoId={periodoActivo.id}
              preferenciasDocentes={preferenciasDocentes}
              roleUsuario={usuarioActual?.role}
              onGuardarAsignacion={handleGuardarAsignacion}
              onEliminarAsignacion={handleEliminarAsignacion}
              onMoverAsignacion={handleAbrirMoverAsignacion}
              esModalNuevaAbierto={modalNuevaAsignacionAbierto}
              onCerrarModalNueva={() => setModalNuevaAsignacionAbierto(false)}
              onAbrirNuevaAsignaturaConHorario={() => setModalCrearAsignaturaAbierto(true)}
              onAbrirCrearAula={() => setModalCrearAulaAbierto(true)}
            />
          )}

          {vistaActiva === 'matriz_espacios' && (
            <MatrizEspaciosView
              espacios={espacios}
              asignaciones={asignaciones}
              cursos={cursos}
              docentes={docentes}
              escenarioActivoId={escenarioActivoId}
              roleUsuario={usuarioActual?.role}
              onEditarEspacio={handleAbrirEditarAula}
              onAbrirCrearAula={() => setModalCrearAulaAbierto(true)}
              onMoverAsignacion={handleAbrirMoverAsignacion}
            />
          )}

          {vistaActiva === 'agenda_docentes' && (
            <AgendaDocentesView
              docentes={docentes}
              asignaciones={asignaciones}
              cursos={cursos}
              espacios={espacios}
              preferenciasDocentes={preferenciasDocentes}
              escenarioActivoId={escenarioActivoId}
            />
          )}

          {vistaActiva === 'mapa_aulas' && (
            <MapaAulasView
              espacios={espacios}
              asignaciones={asignaciones.filter((a) => a.escenario_id === escenarioActivoId)}
              onNavegarVista={setVistaActiva}
              onVerOcupacionEspacio={(_espacioId) => {
                setVistaActiva('matriz_espacios');
              }}
            />
          )}

          {vistaActiva === 'homologacion' && (
            <HomologacionView
              espacios={espacios}
              cursos={cursos}
              equivalencias={equivalencias}
              asignaciones={asignaciones}
              onAgregarEquivalencia={handleAgregarEquivalencia}
              onActualizarEspacio={handleActualizarAula}
              onEditarEspacio={handleAbrirEditarAula}
              roleUsuario={usuarioActual?.role}
              onUnificarAulas={handleUnificarAulas}
              onUnificarTodasLasAulas={handleUnificarTodasLasAulas}
              onHomologarEspacioDuda={handleHomologarEspacioDuda}
              onRatificarEspacioDuda={handleRatificarEspacioDuda}
            />
          )}

          {vistaActiva === 'preferencias' && (
            <PreferenciasDocenteView
              docentes={docentes}
              cursos={cursos}
              preferencias={preferenciasDocentes}
              usuarioActual={usuarioActual}
              periodoActivoId={periodoActivo.id}
              onGuardarPreferencia={handleGuardarPreferencia}
            />
          )}

          {vistaActiva === 'conflictos' && (
            <ConflictosView
              asignaciones={asignaciones}
              espacios={espacios}
              cursos={cursos}
              docentes={docentes}
              preferenciasDocentes={preferenciasDocentes}
              escenarioActivo={escenarioActivo}
              onEditarAsignacion={(asig) => {
                setVistaActiva('planificacion');
                handleAbrirMoverAsignacion(asig);
              }}
            />
          )}

          {vistaActiva === 'import_export' && (
            <ImportExportView
              asignaciones={asignaciones}
              cursos={cursos}
              espacios={espacios}
              docentes={docentes}
              programas={programas}
              escenarioActivo={escenarioActivo}
              periodoActivoId={periodoActivo.id}
              onImportarAsignaciones={handleImportarAsignaciones}
              onExportarJSON={handleExportarJSON}
              onImportarJSON={handleImportarJSON}
              onRestablecerDatos={handleRestablecerDatos}
            />
          )}
        </main>
      </div>

      {/* Pie Institucional */}
      <footer className="h-10 bg-slate-100 border-t border-slate-200 flex items-center justify-between px-6 sm:px-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest flex-shrink-0">
        <div className="flex items-center gap-3 truncate">
          <span>Facultad de Ciencias Marinas · UABC</span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700 font-semibold truncate">Plataforma Abierta de Horarios 2027-1 · Despliegue en Google Sites &amp; GitHub</span>
        </div>
        <div className="flex-shrink-0">UABC &copy; 2027-1</div>
      </footer>

      {/* Modal para Mover Asignación en Tiempo y Espacio Físico */}
      <ModalMoverAsignacion
        abierto={modalMoverAbierto}
        asignacion={asignacionParaMover}
        espacios={espacios}
        cursos={cursos}
        docentes={docentes}
        todasAsignaciones={asignaciones.filter(
          (a) => a.escenario_id === escenarioActivoId && a.estatus !== 'cancelado'
        )}
        onCerrar={() => {
          setModalMoverAbierto(false);
          setAsignacionParaMover(null);
        }}
        onGuardar={handleGuardarAsignacion}
        onEliminar={handleEliminarAsignacion}
      />

      {/* Modal de Inicialización de Catálogo de Espacios FCM / IIO */}
      <ModalInicializarEspacios
        abierto={modalInicializarAbierto}
        onCerrar={() => setModalInicializarAbierto(false)}
        onConfirmar={handleInicializarEspacios}
      />

      {/* Modal para Verificar y Editar Nombre Real del Docente / Perfil */}
      <ModalEditarPerfilDocente
        abierto={modalEditarPerfilAbierto}
        usuarioActual={usuarioActual}
        onCerrar={() => setModalEditarPerfilAbierto(false)}
        onGuardar={handleGuardarUsuarioDocente}
      />

      {/* Modal para Crear Asignatura Nueva con Horarios (Profesores y Admin) */}
      <ModalCrearAsignaturaConHorario
        abierto={modalCrearAsignaturaAbierto}
        onCerrar={() => setModalCrearAsignaturaAbierto(false)}
        onGuardar={handleGuardarNuevaAsignaturaConHorario}
        espacios={espacios}
        docentes={docentes}
        programas={programas}
        asignacionesExistentes={asignaciones.filter(
          (a) => a.escenario_id === escenarioActivoId && a.estatus !== 'cancelado'
        )}
        periodoActivoId={periodoActivo.id}
        escenarioActivoId={escenarioActivoId}
        usuarioActual={usuarioActual}
      />

      {/* Modal para Editar Aula con Lápiz */}
      <ModalEditarAula
        abierto={modalEditarAulaAbierto}
        espacio={aulaParaEditar}
        onCerrar={() => {
          setModalEditarAulaAbierto(false);
          setAulaParaEditar(null);
        }}
        onGuardar={handleActualizarAula}
        roleUsuario={usuarioActual?.role}
      />

      {/* Modal para Crear Nueva Aula */}
      <ModalCrearAula
        abierto={modalCrearAulaAbierto}
        onCerrar={() => setModalCrearAulaAbierto(false)}
        onGuardar={handleCrearNuevaAula}
        roleUsuario={usuarioActual?.role}
      />
    </div>
  );
}
