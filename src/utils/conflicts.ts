/**
 * Motor de Detección y Bloqueo de Conflictos Horarios
 * Facultad de Ciencias Marinas (FCM) - UABC
 */

import {
  Asignacion,
  Espacio,
  Conflicto,
  PreferenciaDocente,
  DiaSemana,
  MetricasInfraestructura,
  SugerenciaOptimizacionInfraestructura,
  Curso,
  Usuario,
  SolapamientoPosgrado,
  ResultadoSolapamientosPosgrado
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
  // "Un salón no puede tener dos grupos a la misma hora"
  // =========================================================================
  for (const existente of asignacionesActivas) {
    if (existente.espacio_id === espacio_id && espacio_id !== 'espacio_VIR' && espacio_id !== 'espacio_PEND') {
      if (hayTraslapeHorario(hora_inicio, hora_fin, existente.hora_inicio, existente.hora_fin)) {
        // Si no está expresamente autorizada una reserva compartida administrativa
        if (!reserva_compartida_autorizada) {
          const espacioNombre = espacio?.nombre || existente.espacio_nombre_snapshot || 'Espacio';
          const espacioCodigo = espacio?.codigo || existente.espacio_codigo_snapshot || '';
          const msg = `Conflicto crítico de espacio: Un salón no puede tener dos grupos a la misma hora. El salón ${espacioNombre} (${espacioCodigo}) ya está ocupado el ${dia} de ${existente.hora_inicio} a ${existente.hora_fin}. No se puede programar en este horario (${hora_inicio} a ${hora_fin}).`;

          erroresCriticos.push(msg);
          conflictos.push({
            id: `conf_espacio_${existente.id}`,
            tipo: 'traslape_espacio',
            severidad: 'conflicto_critico',
            titulo: 'Conflicto crítico: Salón ocupado simultáneamente',
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
          const msg = `Conflicto docente crítico: El profesor ya tiene otra sesión asignada el ${dia} de ${existente.hora_inicio} a ${existente.hora_fin} en ${existente.espacio_nombre_snapshot || existente.espacio_id} (${existente.nivel_educativo}). No puede asignarse simultáneamente de ${hora_inicio} a ${hora_fin}.`;

          erroresCriticos.push(msg);
          conflictos.push({
            id: `conf_docente_${docenteId}_${existente.id}`,
            tipo: 'traslape_docente',
            severidad: 'conflicto_critico',
            titulo: 'Conflicto crítico docente (Doble sesión simultánea)',
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
  // 3. VALIDACIÓN DE CUPO MÁXIMO DEL SALÓN Y CONDICIONES DEL ESPACIO
  // "No se debe exceder el cupo máximo del salón"
  // =========================================================================
  if (espacio && espacio.id !== 'espacio_VIR') {
    // Capacidad operativa del periodo o máxima
    const capOperativa =
      espacio.capacidad_operativa_por_periodo?.[periodo_id] ?? espacio.capacidad_maxima;

    if (alumnos_programados > capOperativa) {
      const exceso = alumnos_programados - capOperativa;
      const msg = `Cupo máximo excedido: Se programaron ${alumnos_programados} estudiantes pero ${espacio.nombre} (${espacio.codigo}) tiene cupo máximo de ${capOperativa} (exceso de ${exceso} alumnos). No se debe exceder el cupo máximo del salón.`;
      
      // Bloqueante conforme al requerimiento explícito del usuario
      erroresCriticos.push(msg);
      conflictos.push({
        id: `conf_cap_${espacio.id}`,
        tipo: 'capacidad_insuficiente',
        severidad: 'conflicto_critico',
        titulo: 'Exceso de cupo máximo del salón (BLOQUEANTE)',
        mensaje: msg,
        bloqueante: true,
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
  // 4. VALIDACIÓN DE DISPONIBILIDAD CON RESTRICCIONES INDIVIDUALES DOCENTES
  // "El horario debe respetar disponibilidad con restricciones"
  // =========================================================================
  for (const docenteId of profesores_ids) {
    const pref = preferenciasDocentes.find(
      (p) => p.profesor_id === docenteId && p.periodo_id === periodo_id
    );

    if (pref) {
      const esNoNegociable = pref.nivel_restriccion === 'no_negociable';

      // A) Días no disponibles
      if (pref.dias_no_disponibles && pref.dias_no_disponibles.includes(dia)) {
        const msg = `Restricción docente: el profesor indicó el día ${dia} como NO disponible (${pref.nivel_restriccion.replace(/_/g, ' ')}). Motivo: ${pref.motivo_restriccion || 'Restricción de agenda'}.`;

        if (esNoNegociable) {
          erroresCriticos.push(msg);
          conflictos.push({
            id: `conf_pref_dia_${docenteId}`,
            tipo: 'restriccion_docente_no_negociable',
            severidad: 'conflicto_critico',
            titulo: 'Restricción docente no negociable (Día no disponible)',
            mensaje: msg,
            bloqueante: true,
            dia
          });
        } else {
          advertencias.push(msg);
          conflictos.push({
            id: `conf_pref_dia_${docenteId}`,
            tipo: 'restriccion_docente_importante',
            severidad: 'advertencia',
            titulo: 'Preferencia docente (Día restringido)',
            mensaje: msg,
            bloqueante: false,
            dia
          });
        }
      }

      // B) Rangos horarios no disponibles
      if (pref.rangos_no_disponibles) {
        for (const rango of pref.rangos_no_disponibles) {
          if (rango.dia === dia && hayTraslapeHorario(hora_inicio, hora_fin, rango.hora_inicio, rango.hora_fin)) {
            const msg = `Restricción horaria individual: el docente declaró franja bloqueada el ${dia} de ${rango.hora_inicio} a ${rango.hora_fin}${rango.motivo ? ` (${rango.motivo})` : ''}.`;
            if (esNoNegociable) {
              erroresCriticos.push(msg);
              conflictos.push({
                id: `conf_pref_rango_${docenteId}`,
                tipo: 'restriccion_docente_no_negociable',
                severidad: 'conflicto_critico',
                titulo: 'Restricción horaria docente no negociable',
                mensaje: msg,
                bloqueante: true,
                dia,
                horario: `${rango.hora_inicio} - ${rango.hora_fin}`
              });
            } else {
              advertencias.push(msg);
              conflictos.push({
                id: `conf_pref_rango_${docenteId}`,
                tipo: 'restriccion_docente_importante',
                severidad: 'advertencia',
                titulo: 'Preferencia de franja horaria docente',
                mensaje: msg,
                bloqueante: false,
                dia,
                horario: `${rango.hora_inicio} - ${rango.hora_fin}`
              });
            }
          }
        }
      }

      // C) Límite de hora mínima de inicio
      if (pref.hora_minima_inicio) {
        if (horaAMinutos(hora_inicio) < horaAMinutos(pref.hora_minima_inicio)) {
          const msg = `Restricción individual de horario: El docente tiene estipulada como hora mínima de inicio las ${pref.hora_minima_inicio}, pero la sesión inicia a las ${hora_inicio}.`;
          if (esNoNegociable) {
            erroresCriticos.push(msg);
            conflictos.push({
              id: `conf_pref_min_hora_${docenteId}`,
              tipo: 'restriccion_docente_no_negociable',
              severidad: 'conflicto_critico',
              titulo: 'Hora de inicio anterior al límite del docente',
              mensaje: msg,
              bloqueante: true
            });
          } else {
            advertencias.push(msg);
          }
        }
      }

      // D) Límite de hora máxima de fin
      if (pref.hora_maxima_fin) {
        if (horaAMinutos(hora_fin) > horaAMinutos(pref.hora_maxima_fin)) {
          const msg = `Restricción individual de horario: El docente tiene estipulada como hora máxima de salida las ${pref.hora_maxima_fin}, pero la sesión concluye a las ${hora_fin}.`;
          if (esNoNegociable) {
            erroresCriticos.push(msg);
            conflictos.push({
              id: `conf_pref_max_hora_${docenteId}`,
              tipo: 'restriccion_docente_no_negociable',
              severidad: 'conflicto_critico',
              titulo: 'Hora de fin posterior al límite del docente',
              mensaje: msg,
              bloqueante: true
            });
          } else {
            advertencias.push(msg);
          }
        }
      }

      // E) Bloqueo individual de matriz semanal
      if (pref.bloqueos_matriz_semanal) {
        const slotKey = `${dia}_${hora_inicio}`;
        if (pref.bloqueos_matriz_semanal[slotKey]) {
          const msg = `Restricción de matriz individual: El docente tiene bloqueado el bloque ${dia} ${hora_inicio}.`;
          advertencias.push(msg);
          conflictos.push({
            id: `conf_pref_slot_${docenteId}_${slotKey}`,
            tipo: esNoNegociable ? 'restriccion_docente_no_negociable' : 'restriccion_docente_importante',
            severidad: esNoNegociable ? 'conflicto_critico' : 'advertencia',
            titulo: 'Bloque horario restringido por el docente',
            mensaje: msg,
            bloqueante: esNoNegociable
          });
          if (esNoNegociable) erroresCriticos.push(msg);
        }
      }

      // F) Límite de horas continuas / horas día
      if (pref.max_horas_dia) {
        const duracionNuevaHrs = (horaAMinutos(hora_fin) - horaAMinutos(hora_inicio)) / 60;
        let horasExistentes = 0;
        for (const exist of asignacionesActivas) {
          if (exist.profesores_ids && exist.profesores_ids.includes(docenteId)) {
            horasExistentes += (horaAMinutos(exist.hora_fin) - horaAMinutos(exist.hora_inicio)) / 60;
          }
        }
        if (horasExistentes + duracionNuevaHrs > pref.max_horas_dia) {
          const msg = `Límite diario superado: El docente tiene un máximo de ${pref.max_horas_dia} hrs/día. Con esta sesión acumularía ${(horasExistentes + duracionNuevaHrs).toFixed(1)} hrs el ${dia}.`;
          advertencias.push(msg);
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
 * Optimiza y maximiza el uso de la infraestructura universitaria (Best Fit)
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
): {
  espacio: Espacio;
  capacidad: number;
  puntuacion: number;
  disponible: boolean;
  tasaOcupacion: number;
  eficienciaLabel: 'Ajuste Óptimo' | 'Adecuado' | 'Subutilizado' | 'Sobrecupo' | 'No Disponible';
  motivoSugerencia: string;
}[] {
  // Filtrar asignaciones que se traslapan en este día y horario
  const ocupadosIds = new Set<string>();
  for (const asig of asignacionesActivas) {
    if (
      asig.periodo_id === periodoId &&
      asig.escenario_id === escenarioId &&
      asig.dia === dia &&
      asig.estatus !== 'cancelado' &&
      asig.espacio_id !== 'espacio_VIR' &&
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
      const tasaOcupacion = capVigente > 0 ? Math.round((alumnosProgramados / capVigente) * 100) : 0;
      let eficienciaLabel: 'Ajuste Óptimo' | 'Adecuado' | 'Subutilizado' | 'Sobrecupo' | 'No Disponible' = 'Adecuado';
      let motivoSugerencia = '';

      // Penalizar si está ocupado (Un salón no puede tener dos grupos a la misma hora)
      if (estaOcupado) {
        puntuacion -= 1000;
        eficienciaLabel = 'No Disponible';
        motivoSugerencia = 'Ocupado por otro grupo en este bloque';
      }

      // Recompensa por coincidencia exacta de tipo de espacio
      if (espacio.tipo_espacio === tipoEspacioRequerido) {
        puntuacion += 40;
      }

      // Recompensa por capacidad suficiente y optimización de infraestructura
      if (capVigente >= alumnosProgramados) {
        const holgura = capVigente - alumnosProgramados;
        if (tasaOcupacion >= 75 && tasaOcupacion <= 100) {
          // Best fit: alta utilización sin sobrecupo
          puntuacion += 60;
          eficienciaLabel = 'Ajuste Óptimo';
          motivoSugerencia = `Maximiza infraestructura: ${tasaOcupacion}% de uso del aula`;
        } else if (tasaOcupacion >= 50) {
          puntuacion += 30;
          eficienciaLabel = 'Adecuado';
          motivoSugerencia = `Capacidad adecuada con margen de ${holgura} lugares`;
        } else {
          // Desperdicio de infraestructura grande (subutilización)
          puntuacion -= 25;
          eficienciaLabel = 'Subutilizado';
          motivoSugerencia = `Subutilizado: ${holgura} butacas vacías innecesariamente`;
        }
      } else {
        // Penalización severa por sobrecupo (No se debe exceder el cupo máximo)
        puntuacion -= 200;
        eficienciaLabel = 'Sobrecupo';
        motivoSugerencia = `Excede cupo máximo en ${alumnosProgramados - capVigente} alumnos`;
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
        disponible: !estaOcupado,
        tasaOcupacion,
        eficienciaLabel,
        motivoSugerencia
      };
    });

  return resultados.sort((a, b) => b.puntuacion - a.puntuacion);
}

/**
 * Calcula métricas integrales de uso de infraestructura FCM
 * Permite identificar aulas subutilizadas, ventanas libres y recomendaciones de optimización
 */
export function calcularMetricasInfraestructura(
  asignaciones: Asignacion[],
  espacios: Espacio[],
  cursos: Curso[],
  periodoId: string,
  escenarioId: string
): MetricasInfraestructura {
  const espaciosDocentes = espacios.filter((e) => e.activo && e.apto_para_docencia && e.id !== 'espacio_VIR');
  const asignacionesActivas = asignaciones.filter(
    (a) => a.periodo_id === periodoId && a.escenario_id === escenarioId && a.estatus !== 'cancelado' && a.espacio_id !== 'espacio_VIR'
  );

  const cursosMap = new Map(cursos.map((c) => [c.id, c]));
  const espaciosMap = new Map(espacios.map((e) => [e.id, e]));

  const espaciosOcupadosIds = new Set(asignacionesActivas.map((a) => a.espacio_id));

  // Capacidad y horas teóricas
  // Asumiendo 6 días (lunes-sábado) y 13 horas por día (07:00 a 20:00) = 78 horas disponibles por aula a la semana
  const HORAS_SEMANA_POR_AULA = 78;
  const horasAulasDisponiblesSemana = espaciosDocentes.length * HORAS_SEMANA_POR_AULA;

  let horasOcupadasTotal = 0;
  let aulasConSobrecupo = 0;
  let aulasSubutilizadas = 0;
  let aulasOptimas = 0;
  let sumaTasaOcupacion = 0;

  const sugerencias: SugerenciaOptimizacionInfraestructura[] = [];

  for (const asig of asignacionesActivas) {
    const duracionHrs = (horaAMinutos(asig.hora_fin) - horaAMinutos(asig.hora_inicio)) / 60;
    horasOcupadasTotal += duracionHrs > 0 ? duracionHrs : 2;

    const esp = espaciosMap.get(asig.espacio_id);
    if (!esp) continue;

    const cap = esp.capacidad_operativa_por_periodo?.[periodoId] ?? esp.capacidad_maxima ?? 40;
    const alumnos = asig.alumnos_programados || 30;
    const tasa = cap > 0 ? (alumnos / cap) * 100 : 0;
    sumaTasaOcupacion += tasa;

    if (alumnos > cap) {
      aulasConSobrecupo++;
      // Buscar aula alternativa disponible con mayor capacidad
      const mejores = sugerirEspaciosCompatibles(
        esp.tipo_espacio,
        alumnos,
        asig.dia,
        asig.hora_inicio,
        asig.hora_fin,
        periodoId,
        escenarioId,
        espaciosDocentes,
        asignacionesActivas
      );
      const candidata = mejores.find((m) => m.disponible && m.capacidad >= alumnos);
      if (candidata) {
        const cursoObj = cursosMap.get(asig.curso_id);
        sugerencias.push({
          id: `sug_alivio_${asig.id}`,
          tipo: 'alivio_sobrecupo',
          asignacion_id: asig.id,
          curso_nombre: cursoObj?.nombre || 'Curso',
          grupo_clave: asig.grupo_principal_id,
          dia: asig.dia,
          horario: `${asig.hora_inicio} - ${asig.hora_fin}`,
          aula_actual_codigo: esp.codigo,
          aula_actual_capacidad: cap,
          alumnos_programados: alumnos,
          tasa_actual: Math.round(tasa),
          aula_sugerida_id: candidata.espacio.id,
          aula_sugerida_codigo: candidata.espacio.codigo,
          aula_sugerida_capacidad: candidata.capacidad,
          tasa_proyectada: Math.round((alumnos / candidata.capacidad) * 100),
          beneficio: `Elimina sobrecupo reubicando a ${candidata.espacio.codigo} (Capacidad ${candidata.capacidad})`
        });
      }
    } else if (tasa < 40 && cap >= 40) {
      aulasSubutilizadas++;
      // Recomendar cambio a aula más compacta para liberar aula grande
      const mejores = sugerirEspaciosCompatibles(
        esp.tipo_espacio,
        alumnos,
        asig.dia,
        asig.hora_inicio,
        asig.hora_fin,
        periodoId,
        escenarioId,
        espaciosDocentes,
        asignacionesActivas
      );
      const masAjustada = mejores.find(
        (m) => m.disponible && m.capacidad >= alumnos && m.capacidad < cap && m.tasaOcupacion >= 65
      );
      if (masAjustada) {
        const cursoObj = cursosMap.get(asig.curso_id);
        sugerencias.push({
          id: `sug_subutilizada_${asig.id}`,
          tipo: 'cambio_aula_subutilizada',
          asignacion_id: asig.id,
          curso_nombre: cursoObj?.nombre || 'Curso',
          grupo_clave: asig.grupo_principal_id,
          dia: asig.dia,
          horario: `${asig.hora_inicio} - ${asig.hora_fin}`,
          aula_actual_codigo: esp.codigo,
          aula_actual_capacidad: cap,
          alumnos_programados: alumnos,
          tasa_actual: Math.round(tasa),
          aula_sugerida_id: masAjustada.espacio.id,
          aula_sugerida_codigo: masAjustada.espacio.codigo,
          aula_sugerida_capacidad: masAjustada.capacidad,
          tasa_proyectada: Math.round((alumnos / masAjustada.capacidad) * 100),
          beneficio: `Libera aula grande ${esp.codigo} (Cap ${cap}) y optimiza uso en ${masAjustada.espacio.codigo}`
        });
      }
    } else {
      aulasOptimas++;
    }
  }

  const tasaOcupacionGlobal =
    asignacionesActivas.length > 0 ? Math.round(sumaTasaOcupacion / asignacionesActivas.length) : 0;

  return {
    tasaOcupacionGlobal,
    espaciosTotales: espaciosDocentes.length,
    espaciosEnUso: espaciosOcupadosIds.size,
    horasAulasDisponiblesSemana,
    horasAulasOcupadasSemana: Math.round(horasOcupadasTotal),
    aulasConSobrecupo,
    aulasSubutilizadas,
    aulasOptimas,
    sugerenciasOptimizacion: sugerencias.slice(0, 8)
  };
}

/**
 * REQUERIMIENTOS ESPECIALIZADOS DE LABORATORIO SEGÚN EL PLAN DE ESTUDIOS DE POSGRADO (MOC, DOC, EGA)
 */
export const REQUERIMIENTOS_CURRICULARES_LABORATORIO: Record<
  string,
  {
    nombre: string;
    requerimiento: string;
    espaciosOptimosCodigos: string[];
    esLaboratorioIndispensable: boolean;
  }
> = {
  'curso_QPCR': {
    nombre: 'Análisis de Expresión Génica en qPCR Tiempo Real',
    requerimiento: 'Requiere termociclador de qPCR en tiempo real, campana de flujo laminar y bioseguridad en biología molecular.',
    espaciosOptimosCodigos: ['Sala 1 IIO', 'LMB', 'S1_IIO'],
    esLaboratorioIndispensable: true
  },
  'curso_ECOL_R': {
    nombre: 'Ecological Data in R',
    requerimiento: 'Requiere terminales con entorno R/RStudio, conectividad de alta velocidad y proyección interactiva para scripts.',
    espaciosOptimosCodigos: ['Sala 1 IIO', 'Sala B', 'CCL', 'CPB'],
    esLaboratorioIndispensable: true
  },
  'curso_BIOINF': {
    nombre: 'Bioinformática',
    requerimiento: 'Requiere estaciones de cómputo con servidores Linux, herramientas de alineamiento genómico y bases de datos bioinformáticas.',
    espaciosOptimosCodigos: ['Sala B', 'CCL', 'CPB', 'SPD'],
    esLaboratorioIndispensable: true
  },
  'curso_PROGRAMACION': {
    nombre: 'Programación',
    requerimiento: 'Requiere aula de cómputo con compiladores científicos (Python/Fortran/Matlab) y herramientas numéricas.',
    espaciosOptimosCodigos: ['Sala 1 IIO', 'Sala B', 'CCL'],
    esLaboratorioIndispensable: true
  },
  'curso_MOD_OCE': {
    nombre: 'Modelación Numérica del Océano',
    requerimiento: 'Requiere estaciones para simulación hidrodinámica numérica, visualización de mallas y cálculo paralelo.',
    espaciosOptimosCodigos: ['Sala B', 'SPD', 'CCL'],
    esLaboratorioIndispensable: false
  },
  'curso_PAT_BIOSEG': {
    nombre: 'Patología y Bioseguridad Acuícola',
    requerimiento: 'Requiere laboratorio de diagnóstico patológico, microscopía óptica, tinción y bioseguridad nivel 2.',
    espaciosOptimosCodigos: ['LMB', 'LBQ', 'Sala B'],
    esLaboratorioIndispensable: true
  },
  'curso_SIST_ACUA': {
    nombre: 'Sistemas en Acuacultura',
    requerimiento: 'Requiere laboratorio de monitoreo de recirculación acuícola, calidad de agua y oxigenación.',
    espaciosOptimosCodigos: ['Sala 1 IIO', 'LTA', 'SIS'],
    esLaboratorioIndispensable: true
  },
  'curso_ECOFIS_MACRO': {
    nombre: 'Ecofisiología de Macrófitas Marinas',
    requerimiento: 'Requiere laboratorio de fisiología de algas marinas, medición de fluorescencia PAM y fotosíntesis.',
    espaciosOptimosCodigos: ['MAL', 'Sala 1 IIO', 'LOB'],
    esLaboratorioIndispensable: true
  },
  'curso_BIOQ_NUT_ACU': {
    nombre: 'Bioquímica Nutricional Acuícola',
    requerimiento: 'Requiere analizadores bioquímicos, digestión ácida, espectrofotometría y campana de extracción.',
    espaciosOptimosCodigos: ['NUT', 'LBQ', 'Sala B', 'Sala 1 IIO'],
    esLaboratorioIndispensable: true
  },
  'curso_COLOR_OCEANO': {
    nombre: 'Temas Selectos de Percepción Remota del Color del Océano',
    requerimiento: 'Requiere procesamiento de imágenes satelitales multiespectrales, radiometría y paquetes SeaDAS/ENVI.',
    espaciosOptimosCodigos: ['SA', 'SPD', 'CCL'],
    esLaboratorioIndispensable: false
  },
  'curso_ECOL_MOL': {
    nombre: 'Ecología Molecular',
    requerimiento: 'Requiere infraestructura de genética de poblaciones, geles de electroforesis y secuenciación.',
    espaciosOptimosCodigos: ['Sala Totoaba', 'LG', 'LMB'],
    esLaboratorioIndispensable: false
  },
  'curso_PROC_LITORALES': {
    nombre: 'Procesos Litorales y Manejo de la Erosión Costera',
    requerimiento: 'Requiere laboratorio de sedimentología, columnas de tamices mecánicos y cartografía costera.',
    espaciosOptimosCodigos: ['Sala 1 IIO', 'LOS', 'SGP', 'LT'],
    esLaboratorioIndispensable: true
  },
  'curso_HIDRO_EST': {
    nombre: 'Introducción a la Hidrodinámica de Estuarios',
    requerimiento: 'Requiere instrumental oceanográfico de aforo (CTD, correntómetros) y canales de flujo.',
    espaciosOptimosCodigos: ['Sala B', 'SFF', 'SFL'],
    esLaboratorioIndispensable: false
  },
  'curso_SEM_BIOGEOQUIM': {
    nombre: 'Seminario de Biogeoquímica Acuática Avanzado',
    requerimiento: 'Requiere audiovisual con proyector de alta resolución y equipamiento acústico para presentaciones científicas.',
    espaciosOptimosCodigos: ['AVI', 'AM1', 'AM2'],
    esLaboratorioIndispensable: false
  }
};

/**
 * Función específica que audita y diagnostica solapamientos horarios en aulas de posgrado,
 * priorizando la disponibilidad de laboratorios especializados según el plan de estudios.
 */
export function identificarSolapamientosPosgradoYLaboratorios(
  asignaciones: Asignacion[],
  cursos: Curso[],
  espacios: Espacio[],
  docentes: Usuario[],
  periodoId: string,
  escenarioId: string
): ResultadoSolapamientosPosgrado {
  const cursosMap = new Map(cursos.map((c) => [c.id, c]));
  const espaciosMap = new Map(espacios.map((e) => [e.id, e]));
  const docentesMap = new Map(docentes.map((d) => [d.uid, d]));

  // Asignaciones activas de posgrado o que ocupan espacios utilizados por posgrado
  const asignacionesActivas = asignaciones.filter(
    (a) =>
      a.periodo_id === periodoId &&
      a.escenario_id === escenarioId &&
      a.estatus !== 'cancelado' &&
      (a.nivel_educativo === 'posgrado' ||
        ['espacio_SALAB', 'espacio_S1_IIO', 'espacio_TOA', 'espacio_SA', 'espacio_CCL', 'espacio_AVI'].includes(a.espacio_id))
  );

  const solapamientos: SolapamientoPosgrado[] = [];
  const resumenPorAula: Record<string, number> = {};
  const aulasEspecializadasAnalizadas = new Set<string>();

  // 1. Detección de solapamientos horarios en aulas de posgrado
  for (let i = 0; i < asignacionesActivas.length; i++) {
    for (let j = i + 1; j < asignacionesActivas.length; j++) {
      const a1 = asignacionesActivas[i];
      const a2 = asignacionesActivas[j];

      // Mismo espacio físico y mismo día (excluyendo virtual y por definir)
      if (
        a1.espacio_id === a2.espacio_id &&
        a1.dia === a2.dia &&
        a1.espacio_id !== 'espacio_VIR' &&
        a1.espacio_id !== 'espacio_PEND'
      ) {
        if (hayTraslapeHorario(a1.hora_inicio, a1.hora_fin, a2.hora_inicio, a2.hora_fin)) {
          const esp = espaciosMap.get(a1.espacio_id);
          const c1 = cursosMap.get(a1.curso_id);
          const c2 = cursosMap.get(a2.curso_id);

          const esLab =
            esp?.tipo_espacio === 'laboratorio' ||
            esp?.tipo_espacio === 'aula_computo' ||
            esp?.categoria === 'laboratorios_especializados' ||
            esp?.categoria === 'centros_computo';

          const espCodigo = esp?.codigo || a1.espacio_codigo_snapshot || 'Espacio';
          resumenPorAula[espCodigo] = (resumenPorAula[espCodigo] || 0) + 1;
          if (esLab) aulasEspecializadasAnalizadas.add(espCodigo);

          const c1EsLab = a1.tipo_componente === 'laboratorio' || a1.tipo_sesion.includes('(T)') || a1.tipo_sesion.includes('(P)');
          const c2EsLab = a2.tipo_componente === 'laboratorio' || a2.tipo_sesion.includes('(T)') || a2.tipo_sesion.includes('(P)');

          const req1 = REQUERIMIENTOS_CURRICULARES_LABORATORIO[a1.curso_id];
          const req2 = REQUERIMIENTOS_CURRICULARES_LABORATORIO[a2.curso_id];

          // Priorización curricular: Si una es práctica/laboratorio y la otra es teoría,
          // el laboratorio especializado tiene prioridad en la asignación física
          if (c1EsLab && !c2EsLab) {
            solapamientos.push({
              id: `solap_pos_${a1.id}_${a2.id}`,
              tipo: 'laboratorio_no_priorizado',
              severidad: 'critico',
              titulo: `Prioridad de Laboratorio Curricular: ${c1?.nombre || 'Sesión Práctica'}`,
              mensaje: `En ${esp?.nombre || espCodigo}, la sesión de laboratorio "${c1?.nombre}" (${a1.tipo_sesion}) tiene prioridad curricular sobre la clase teórica/tutoría "${c2?.nombre}" (${a2.tipo_sesion}) el ${a1.dia} de ${a1.hora_inicio} a ${a1.hora_fin}.`,
              bloqueante: true,
              dia: a1.dia,
              horario: `${a1.hora_inicio} - ${a1.hora_fin}`,
              espacio_id: a1.espacio_id,
              espacio_codigo: espCodigo,
              espacio_nombre: esp?.nombre || espCodigo,
              es_laboratorio_especializado: esLab,
              curso_a_id: a1.curso_id,
              curso_a_nombre: c1?.nombre || 'Curso A',
              curso_a_codigo: c1?.codigo || '',
              asignacion_a_id: a1.id,
              docentes_a_nombres: (a1.profesores_ids || []).map((uid) => docentesMap.get(uid)?.nombre || uid),
              requerimiento_laboratorio_plan_estudios_a: req1?.requerimiento,
              curso_b_id: a2.curso_id,
              curso_b_nombre: c2?.nombre || 'Curso B',
              curso_b_codigo: c2?.codigo || '',
              asignacion_b_id: a2.id,
              docentes_b_nombres: (a2.profesores_ids || []).map((uid) => docentesMap.get(uid)?.nombre || uid),
              solucion_recomendada: `Reubicar la clase teórica "${c2?.nombre}" a un aula teórica disponible (ej. Sala de Asesorías, Salón 18 o Aula Magna), preservando el laboratorio para "${c1?.nombre}".`
            });
          } else if (!c1EsLab && c2EsLab) {
            solapamientos.push({
              id: `solap_pos_${a2.id}_${a1.id}`,
              tipo: 'laboratorio_no_priorizado',
              severidad: 'critico',
              titulo: `Prioridad de Laboratorio Curricular: ${c2?.nombre || 'Sesión Práctica'}`,
              mensaje: `En ${esp?.nombre || espCodigo}, la sesión de laboratorio "${c2?.nombre}" (${a2.tipo_sesion}) tiene prioridad curricular sobre la clase teórica/tutoría "${c1?.nombre}" (${a1.tipo_sesion}) el ${a2.dia} de ${a2.hora_inicio} a ${a2.hora_fin}.`,
              bloqueante: true,
              dia: a1.dia,
              horario: `${a2.hora_inicio} - ${a2.hora_fin}`,
              espacio_id: a1.espacio_id,
              espacio_codigo: espCodigo,
              espacio_nombre: esp?.nombre || espCodigo,
              es_laboratorio_especializado: esLab,
              curso_a_id: a2.curso_id,
              curso_a_nombre: c2?.nombre || 'Curso B',
              curso_a_codigo: c2?.codigo || '',
              asignacion_a_id: a2.id,
              docentes_a_nombres: (a2.profesores_ids || []).map((uid) => docentesMap.get(uid)?.nombre || uid),
              requerimiento_laboratorio_plan_estudios_a: req2?.requerimiento,
              curso_b_id: a1.curso_id,
              curso_b_nombre: c1?.nombre || 'Curso A',
              curso_b_codigo: c1?.codigo || '',
              asignacion_b_id: a1.id,
              docentes_b_nombres: (a1.profesores_ids || []).map((uid) => docentesMap.get(uid)?.nombre || uid),
              solucion_recomendada: `Reubicar la clase teórica "${c1?.nombre}" a un aula teórica disponible, reservando el espacio especializado para "${c2?.nombre}".`
            });
          } else {
            solapamientos.push({
              id: `solap_pos_traslape_${a1.id}_${a2.id}`,
              tipo: 'traslape_aula_posgrado',
              severidad: 'critico',
              titulo: `Solapamiento de Horario en Aula: ${espCodigo}`,
              mensaje: `Las materias de posgrado "${c1?.nombre}" (${a1.hora_inicio}-${a1.hora_fin}) y "${c2?.nombre}" (${a2.hora_inicio}-${a2.hora_fin}) coinciden simultáneamente el ${a1.dia} en ${esp?.nombre || espCodigo}.`,
              bloqueante: true,
              dia: a1.dia,
              horario: `${a1.hora_inicio} - ${a1.hora_fin}`,
              espacio_id: a1.espacio_id,
              espacio_codigo: espCodigo,
              espacio_nombre: esp?.nombre || espCodigo,
              es_laboratorio_especializado: esLab,
              curso_a_id: a1.curso_id,
              curso_a_nombre: c1?.nombre || 'Curso A',
              curso_a_codigo: c1?.codigo || '',
              asignacion_a_id: a1.id,
              docentes_a_nombres: (a1.profesores_ids || []).map((uid) => docentesMap.get(uid)?.nombre || uid),
              curso_b_id: a2.curso_id,
              curso_b_nombre: c2?.nombre || 'Curso B',
              curso_b_codigo: c2?.codigo || '',
              asignacion_b_id: a2.id,
              docentes_b_nombres: (a2.profesores_ids || []).map((uid) => docentesMap.get(uid)?.nombre || uid),
              solucion_recomendada: `Ajustar el horario de inicio/fin o reubicar una de las asignaturas a un aula alterna libre.`
            });
          }
        }
      }
    }
  }

  // 2. Detección de solapamientos de docentes en posgrado
  for (let i = 0; i < asignacionesActivas.length; i++) {
    for (let j = i + 1; j < asignacionesActivas.length; j++) {
      const a1 = asignacionesActivas[i];
      const a2 = asignacionesActivas[j];

      if (a1.dia === a2.dia) {
        const docentesCompartidos = (a1.profesores_ids || []).filter((uid) =>
          (a2.profesores_ids || []).includes(uid)
        );

        if (docentesCompartidos.length > 0) {
          if (hayTraslapeHorario(a1.hora_inicio, a1.hora_fin, a2.hora_inicio, a2.hora_fin)) {
            for (const docUid of docentesCompartidos) {
              const doc = docentesMap.get(docUid);
              const c1 = cursosMap.get(a1.curso_id);
              const c2 = cursosMap.get(a2.curso_id);
              const esp1 = espaciosMap.get(a1.espacio_id);
              const esp2 = espaciosMap.get(a2.espacio_id);

              solapamientos.push({
                id: `solap_pos_doc_${docUid}_${a1.id}_${a2.id}`,
                tipo: 'traslape_docente_posgrado',
                severidad: 'critico',
                titulo: `Doble Programación Docente: ${doc?.nombre || docUid}`,
                mensaje: `El docente ${doc?.nombre || docUid} tiene dos clases simultáneas programadas el ${a1.dia}: "${c1?.nombre}" en ${esp1?.codigo || a1.espacio_id} (${a1.hora_inicio}-${a1.hora_fin}) y "${c2?.nombre}" en ${esp2?.codigo || a2.espacio_id} (${a2.hora_inicio}-${a2.hora_fin}).`,
                bloqueante: true,
                dia: a1.dia,
                horario: `${a1.hora_inicio} - ${a1.hora_fin}`,
                espacio_id: a1.espacio_id,
                espacio_codigo: esp1?.codigo || '',
                espacio_nombre: esp1?.nombre || '',
                es_laboratorio_especializado: false,
                curso_a_id: a1.curso_id,
                curso_a_nombre: c1?.nombre || 'Curso A',
                curso_a_codigo: c1?.codigo || '',
                asignacion_a_id: a1.id,
                docentes_a_nombres: [doc?.nombre || docUid],
                curso_b_id: a2.curso_id,
                curso_b_nombre: c2?.nombre || 'Curso B',
                curso_b_codigo: c2?.codigo || '',
                asignacion_b_id: a2.id,
                docentes_b_nombres: [doc?.nombre || docUid],
                solucion_recomendada: `Cambiar el día o franja horaria de una de las materias para respetar la disponibilidad del profesor titular.`
              });
            }
          }
        }
      }
    }
  }

  // 3. Auditoría de cursos con requerimiento indispensable de laboratorio pendientes de aula
  for (const asig of asignacionesActivas) {
    const req = REQUERIMIENTOS_CURRICULARES_LABORATORIO[asig.curso_id];
    const esPractica = asig.tipo_componente === 'laboratorio' || asig.tipo_sesion.includes('(T)') || asig.tipo_sesion.includes('(P)');

    if (req && (req.esLaboratorioIndispensable || esPractica)) {
      const espActual = espaciosMap.get(asig.espacio_id);
      const estaSinDefinir = asig.espacio_id === 'espacio_PEND' || !espActual;

      // Buscar laboratorios alternativos compatibles disponibles en ese horario
      if (estaSinDefinir) {
        const labsCompatibles = espacios.filter((e) => {
          if (!e.activo || e.apto_para_docencia === false) return false;
          const esLab =
            e.tipo_espacio === 'laboratorio' ||
            e.tipo_espacio === 'aula_computo' ||
            e.categoria === 'laboratorios_especializados' ||
            e.categoria === 'centros_computo';
          if (!esLab) return false;

          // Revisar que esté libre en ese horario
          const ocupado = asignacionesActivas.some(
            (oa) =>
              oa.espacio_id === e.id &&
              oa.dia === asig.dia &&
              hayTraslapeHorario(asig.hora_inicio, asig.hora_fin, oa.hora_inicio, oa.hora_fin)
          );
          return !ocupado;
        });

        const c = cursosMap.get(asig.curso_id);
        solapamientos.push({
          id: `solap_lab_pendiente_${asig.id}`,
          tipo: 'laboratorio_faltante',
          severidad: 'advertencia',
          titulo: `Laboratorio Curricular Faltante: ${c?.nombre || 'Curso'}`,
          mensaje: `La sesión práctica de "${c?.nombre}" (${asig.tipo_sesion}) requiere infraestructura especializada (${req.requerimiento}), pero está actualmente asignada a "Por definir" el ${asig.dia} ${asig.hora_inicio}-${asig.hora_fin}.`,
          bloqueante: false,
          dia: asig.dia,
          horario: `${asig.hora_inicio} - ${asig.hora_fin}`,
          espacio_id: asig.espacio_id,
          espacio_codigo: 'Por definir',
          espacio_nombre: 'Espacio por definir',
          es_laboratorio_especializado: true,
          curso_a_id: asig.curso_id,
          curso_a_nombre: c?.nombre || 'Curso',
          curso_a_codigo: c?.codigo || '',
          asignacion_a_id: asig.id,
          docentes_a_nombres: (asig.profesores_ids || []).map((uid) => docentesMap.get(uid)?.nombre || uid),
          requerimiento_laboratorio_plan_estudios_a: req.requerimiento,
          solucion_recomendada: `Asignar a uno de los laboratorios compatibles disponibles según el plan de estudios (${labsCompatibles.slice(0, 3).map((l) => l.codigo).join(', ') || 'revisar catálogo'}).`,
          espacios_alternativos_disponibles: labsCompatibles.slice(0, 4).map((l) => ({
            id: l.id,
            codigo: l.codigo,
            nombre: l.nombre,
            capacidad: l.capacidad_maxima,
            edificio: l.edificio
          }))
        });
      }
    }
  }

  const totalSolapamientosCriticos = solapamientos.filter((s) => s.severidad === 'critico').length;
  const totalAdvertenciasLaboratorio = solapamientos.filter((s) => s.severidad === 'advertencia').length;
  const totalOptimizaciones = solapamientos.filter((s) => s.severidad === 'optimizacion').length;

  return {
    totalSolapamientosCriticos,
    totalAdvertenciasLaboratorio,
    totalOptimizaciones,
    solapamientos,
    resumenPorAula,
    aulasEspecializadasAnalizadas: Array.from(aulasEspecializadasAnalizadas)
  };
}

/**
 * Función canónica requerida para identificar específicamente solapamientos horarios en aulas de posgrado,
 * priorizando la disponibilidad de laboratorios especializados según el plan de estudios.
 */
export const identificarSolapamientosPosgrado = identificarSolapamientosPosgradoYLaboratorios;

/**
 * Determina si un espacio físico es considerado laboratorio especializado o aula de cómputo científica
 */
export function esLaboratorioEspecializado(espacio?: Espacio | null): boolean {
  if (!espacio) return false;
  return (
    espacio.tipo_espacio === 'laboratorio' ||
    espacio.tipo_espacio === 'aula_computo' ||
    espacio.categoria === 'laboratorios_especializados' ||
    espacio.categoria === 'centros_computo' ||
    ['Sala 1 IIO', 'Sala B', 'LMB', 'LBQ', 'CCL', 'CPB', 'NUT', 'MAL', 'TOA'].includes(espacio.codigo)
  );
}

