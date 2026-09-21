/**
 * Motor de Detección y Bloqueo de Conflictos Horarios
 * Facultad de Ciencias Marinas (FCM) - UABC
 */

import {
  Asignacion,
  Espacio,
  Conflicto,
  PreferenciaDocente,
  DiaSemana
} from '../types';

/**
 * Convierte un string de hora formato "HH:MM" a minutos desde medianoche
 */
export function horaAMinutos(hora: string): number {
  if (!hora) return 0;
  const partes = hora.trim().split(':');
  const h = parseInt(partes[0], 10) || 0;
  const m = parseInt(partes[1], 10) || 0;
  return h * 60 + m;
}

/**
 * Determina si dos intervalos horarios se traslapan:
 * inicio_nuevo < fin_existente Y fin_nuevo > inicio_existente
 */
export function hayTraslapeHorario(
  inicioA: string,
  finA: string,
  inicioB: string,
  finB: string
): boolean {
  const iniA = horaAMinutos(inicioA);
  const fnA = horaAMinutos(finA);
  const iniB = horaAMinutos(inicioB);
  const fnB = horaAMinutos(finB);

  return iniA < fnB && fnA > iniB;
}

export interface ValidacionResultado {
  esValido: boolean;
  bloqueante: boolean;
  conflictos: Conflicto[];
  erroresCriticos: string[];
  advertencias: string[];
}

/**
 * Valida de forma exhaustiva una asignación propuesta contra el conjunto de asignaciones existentes
 * del mismo periodo y escenario.
 */
export function validarAsignacion(
  nueva: Partial<Asignacion>,
  asignacionesExistentes: Asignacion[],
  espaciosMap: Map<string, Espacio>,
  preferenciasDocentes: PreferenciaDocente[] = []
): ValidacionResultado {
  const conflictos: Conflicto[] = [];
  const erroresCriticos: string[] = [];
  const advertencias: string[] = [];

  const {
    id: nuevaId,
    periodo_id,
    escenario_id,
    espacio_id,
    dia,
    hora_inicio,
    hora_fin,
    profesores_ids = [],
    alumnos_programados = 0,
    reserva_compartida_autorizada = false
  } = nueva;

  if (!periodo_id || !escenario_id || !espacio_id || !dia || !hora_inicio || !hora_fin) {
    return {
      esValido: false,
      bloqueante: true,
      conflictos,
      erroresCriticos: ['Datos incompletos de horario o espacio'],
      advertencias
    };
  }

  const espacio = espaciosMap.get(espacio_id);

  // Filtrar asignaciones relevantes: mismo periodo, escenario, día y no canceladas
  const asignacionesActivas = asignacionesExistentes.filter(
    (a) =>
      a.periodo_id === periodo_id &&
      a.escenario_id === escenario_id &&
      a.dia === dia &&
      a.estatus !== 'cancelado' &&
      a.id !== nuevaId
  );

  // =========================================================================
  // 1. REGLA CRÍTICA 1: EXCLUSIVIDAD OBLIGATORIA DE ESPACIOS (BLOQUEO TOTAL)
  // =========================================================================
  for (const existente of asignacionesActivas) {
    if (existente.espacio_id === espacio_id) {
      if (hayTraslapeHorario(hora_inicio, hora_fin, existente.hora_inicio, existente.hora_fin)) {
        // Si no está expresamente autorizada una reserva compartida administrativa
        if (!reserva_compartida_autorizada) {
          const espacioNombre = espacio?.nombre || existente.espacio_nombre_snapshot || 'Espacio';
          const espacioCodigo = espacio?.codigo || existente.espacio_codigo_snapshot || '';
          const msg = `Conflicto de espacio: el espacio ${espacioNombre} (${espacioCodigo}) ya está asignado el ${dia} de ${existente.hora_inicio} a ${existente.hora_fin}. No puede reservarse para esta sesión de ${hora_inicio} a ${hora_fin}.`;

          erroresCriticos.push(msg);
          conflictos.push({
            id: `conf_espacio_${existente.id}`,
            tipo: 'traslape_espacio',
            severidad: 'conflicto_critico',
            titulo: 'Conflicto crítico de espacio (AULA OCUPADA)',
            mensaje: msg,
            bloqueante: true,
            asignacion_existente_id: existente.id,
            espacio_codigo: espacioCodigo,
            espacio_nombre: espacioNombre,
            dia,
            horario: `${existente.hora_inicio} - ${existente.hora_fin}`
          });
        }
      }
    }
  }

  // =========================================================================
  // 2. REGLA CRÍTICA 2: EXCLUSIVIDAD OBLIGATORIA DE DOCENTES (BLOQUEO TOTAL)
  // =========================================================================
  for (const docenteId of profesores_ids) {
    for (const existente of asignacionesActivas) {
      if (existente.profesores_ids && existente.profesores_ids.includes(docenteId)) {
        if (hayTraslapeHorario(hora_inicio, hora_fin, existente.hora_inicio, existente.hora_fin)) {
          const msg = `Conflicto docente: el profesor seleccionado ya tiene otra sesión asignada el ${dia} de ${existente.hora_inicio} a ${existente.hora_fin} en ${existente.espacio_nombre_snapshot || existente.espacio_id} (${existente.nivel_educativo}). No puede asignarse simultáneamente de ${hora_inicio} a ${hora_fin}.`;

          erroresCriticos.push(msg);
          conflictos.push({
            id: `conf_docente_${docenteId}_${existente.id}`,
            tipo: 'traslape_docente',
            severidad: 'conflicto_critico',
            titulo: 'Conflicto crítico docente (DOCENTE EN DOS SESIONES)',
            mensaje: msg,
            bloqueante: true,
            asignacion_existente_id: existente.id,
            dia,
            horario: `${existente.hora_inicio} - ${existente.hora_fin}`
          });
        }
      }
    }
  }

  // =========================================================================
  // 3. VALIDACIÓN DE CAPACIDAD Y CONDICIONES DEL ESPACIO
  // =========================================================================
  if (espacio) {
    // Capacidad operativa del periodo o máxima
    const capOperativa =
      espacio.capacidad_operativa_por_periodo?.[periodo_id] ?? espacio.capacidad_maxima;

    if (alumnos_programados > capOperativa) {
      const msg = `Capacidad insuficiente: se programaron ${alumnos_programados} estudiantes pero ${espacio.nombre} tiene capacidad operativa de ${capOperativa}.`;
      advertencias.push(msg);
      conflictos.push({
        id: `conf_cap_${espacio.id}`,
        tipo: 'capacidad_insuficiente',
        severidad: 'advertencia',
        titulo: 'Sobrecupo en espacio',
        mensaje: msg,
        bloqueante: false,
        espacio_codigo: espacio.codigo,
        espacio_nombre: espacio.nombre
      });
    }

    if (!espacio.apto_para_docencia) {
      const msg = `Espacio no apto para docencia: ${espacio.nombre} está registrado como espacio de apoyo o no docente.`;
      advertencias.push(msg);
      conflictos.push({
        id: `conf_no_docente_${espacio.id}`,
        tipo: 'espacio_no_docente',
        severidad: 'advertencia',
        titulo: 'Espacio no docente',
        mensaje: msg,
        bloqueante: false,
        espacio_codigo: espacio.codigo
      });
    }

    if (!espacio.disponible || (espacio.disponible_periodos && !espacio.disponible_periodos.includes(periodo_id))) {
      const msg = `Espacio no disponible en el periodo ${periodo_id}: ${espacio.nombre}.`;
      advertencias.push(msg);
      conflictos.push({
        id: `conf_no_disp_${espacio.id}`,
        tipo: 'espacio_no_disponible',
        severidad: 'advertencia',
        titulo: 'Espacio no disponible en 2027-1',
        mensaje: msg,
        bloqueante: false
      });
    }
  }

  // =========================================================================
  // 4. VALIDACIÓN CON PREFERENCIAS Y RESTRICCIONES DOCENTES
  // =========================================================================
  for (const docenteId of profesores_ids) {
    const pref = preferenciasDocentes.find(
      (p) => p.profesor_id === docenteId && p.periodo_id === periodo_id
    );

    if (pref) {
      // Días no disponibles
      if (pref.dias_no_disponibles && pref.dias_no_disponibles.includes(dia)) {
        const esNoNegociable = pref.nivel_restriccion === 'no_negociable';
        const msg = `Restricción docente: el profesor indicó el día ${dia} como no disponible (${pref.nivel_restriccion.replace('_', ' ')}).`;

        if (esNoNegociable) {
          advertencias.push(msg);
          conflictos.push({
            id: `conf_pref_dia_${docenteId}`,
            tipo: 'restriccion_docente_no_negociable',
            severidad: 'advertencia',
            titulo: 'Restricción docente no negociable',
            mensaje: msg,
            bloqueante: false,
            dia
          });
        } else {
          advertencias.push(msg);
          conflictos.push({
            id: `conf_pref_dia_${docenteId}`,
            tipo: 'restriccion_docente_importante',
            severidad: 'advertencia',
            titulo: 'Preferencia docente',
            mensaje: msg,
            bloqueante: false,
            dia
          });
        }
      }

      // Rangos horarios no disponibles
      if (pref.rangos_no_disponibles) {
        for (const rango of pref.rangos_no_disponibles) {
          if (rango.dia === dia && hayTraslapeHorario(hora_inicio, hora_fin, rango.hora_inicio, rango.hora_fin)) {
            const msg = `Restricción horaria docente: el profesor declaró franja no disponible el ${dia} de ${rango.hora_inicio} a ${rango.hora_fin}.`;
            advertencias.push(msg);
            conflictos.push({
              id: `conf_pref_rango_${docenteId}`,
              tipo: pref.nivel_restriccion === 'no_negociable' ? 'restriccion_docente_no_negociable' : 'restriccion_docente_importante',
              severidad: 'advertencia',
              titulo: 'Restricción de franja horaria',
              mensaje: msg,
              bloqueante: false,
              dia,
              horario: `${rango.hora_inicio} - ${rango.hora_fin}`
            });
          }
        }
      }
    }
  }

  const bloqueante = erroresCriticos.length > 0;

  return {
    esValido: !bloqueante,
    bloqueante,
    conflictos,
    erroresCriticos,
    advertencias
  };
}

/**
 * Algoritmo de sugerencia de espacios compatibles para una sesión
 */
export function sugerirEspaciosCompatibles(
  tipoEspacioRequerido: string,
  alumnosProgramados: number,
  dia: DiaSemana,
  horaInicio: string,
  horaFin: string,
  periodoId: string,
  escenarioId: string,
  todosLosEspacios: Espacio[],
  asignacionesActivas: Asignacion[],
  equiposRequeridos: string[] = []
): { espacio: Espacio; capacidad: number; puntuacion: number; disponible: boolean }[] {
  // Filtrar asignaciones que se traslapan en este día y horario
  const ocupadosIds = new Set<string>();
  for (const asig of asignacionesActivas) {
    if (
      asig.periodo_id === periodoId &&
      asig.escenario_id === escenarioId &&
      asig.dia === dia &&
      asig.estatus !== 'cancelado' &&
      hayTraslapeHorario(horaInicio, horaFin, asig.hora_inicio, asig.hora_fin)
    ) {
      ocupadosIds.add(asig.espacio_id);
    }
  }

  const resultados = todosLosEspacios
    .filter((e) => e.activo && e.apto_para_docencia)
    .map((espacio) => {
      const capVigente =
        espacio.capacidad_operativa_por_periodo?.[periodoId] ?? espacio.capacidad_maxima;
      const estaOcupado = ocupadosIds.has(espacio.id);

      let puntuacion = 100;

      // Penalizar si está ocupado
      if (estaOcupado) {
        puntuacion -= 1000;
      }

      // Recompensa por coincidencia exacta de tipo de espacio
      if (espacio.tipo_espacio === tipoEspacioRequerido) {
        puntuacion += 50;
      }

      // Recompensa por capacidad suficiente y óptima
      if (capVigente >= alumnosProgramados) {
        puntuacion += 40;
        // Bonificación si no desperdicia espacio excesivo
        const desperdicio = capVigente - alumnosProgramados;
        if (desperdicio <= 10) puntuacion += 20;
        else if (desperdicio <= 20) puntuacion += 10;
      } else {
        // Penalización por capacidad insuficiente
        puntuacion -= 50;
      }

      // Coincidencia de equipos
      if (equiposRequeridos.length > 0) {
        const tieneEquipos = equiposRequeridos.every((eq) => espacio.equipos?.includes(eq));
        if (tieneEquipos) puntuacion += 30;
      }

      return {
        espacio,
        capacidad: capVigente,
        puntuacion,
        disponible: !estaOcupado
      };
    });

  return resultados.sort((a, b) => b.puntuacion - a.puntuacion);
}
