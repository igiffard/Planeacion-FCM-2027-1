/**
 * Tipos TypeScript para Planeación Académica FCM 2027-1
 * Facultad de Ciencias Marinas (FCM) - UABC
 */

export type RolUsuario = 'profesor' | 'coordinador' | 'admin';
export type RoleUsuario = RolUsuario;
export type NivelEducativo = 'licenciatura' | 'posgrado';
export type TipoPrograma = 'tronco_comun' | 'licenciatura' | 'especialidad' | 'maestria' | 'doctorado';

export interface Usuario {
  uid: string;
  nombre: string;
  email: string;
  email_normalizado: string;
  foto_url?: string;
  role: RolUsuario;
  cargo?: string;
  titulo_academico?: string;
  programas_asignados_ids: string[];
  niveles_asignados: NivelEducativo[];
  activo: boolean;
  academia_area?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramaEducativo {
  id: string; // e.g. TC-CMA, LBA, LCA, OCE, EGA, MOC, DOC
  nombre: string;
  nivel_educativo: NivelEducativo;
  tipo_programa: TipoPrograma;
  activo: boolean;
  periodos_activos: string[];
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Periodo {
  id: string; // e.g. '2027-1'
  nombre: string;
  activo: boolean;
  fecha_inicio?: string;
  fecha_fin?: string;
}

export type EstatusEscenario = 'borrador' | 'en_revision' | 'propuesta' | 'oficial' | 'publicado';

export interface Escenario {
  id: string; // borrador_1, borrador_2, propuesta_coordinacion, oficial, publicado
  periodo_id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  estatus: EstatusEscenario;
  createdAt: string;
  updatedAt: string;
}

export type TipoActividadCurso =
  | 'teorico'
  | 'laboratorio'
  | 'mixto'
  | 'practica'
  | 'taller'
  | 'seminario'
  | 'campo'
  | 'coloquio'
  | 'direccion_tutorial'
  | 'otro';

export interface Curso {
  id: string;
  codigo: string;
  codigo_normalizado: string;
  nombre: string;
  nombre_normalizado: string;
  nombre_original_ingresado?: string;
  clave_curso_unica: string;
  nivel_educativo: NivelEducativo;
  programas_ids: string[];
  semestre_recomendado?: number;
  trimestre_o_semestre_posgrado?: string;
  tipo_actividad: TipoActividadCurso;
  horas_teoria_semana: number;
  horas_laboratorio_semana: number;
  horas_totales_semana: number;
  duracion_bloque_minutos: number;
  cupo_estimado: number;
  requiere_espacio_especial: boolean;
  activo: boolean;
  periodo_id: string;
  importado_desde_2026_2?: boolean;
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export type TipoGrupo =
  | 'regular'
  | 'laboratorio'
  | 'practica'
  | 'compartido'
  | 'seminario_posgrado'
  | 'coloquio_posgrado'
  | 'tutorial_posgrado';

export interface Grupo {
  id: string;
  curso_id: string;
  periodo_id: string;
  nivel_educativo: NivelEducativo;
  programas_ids: string[];
  semestre: number;
  cohorte: string;
  clave_grupo: string; // e.g. 111, 211, POS-101
  nombre_visible: string;
  turno: 'matutino' | 'vespertino' | 'mixto';
  cupo_planeado: number;
  cupo_maximo?: number;
  inscritos_estimados: number;
  alumnos_estimados?: number;
  profesor_responsable_id?: string;
  profesores_ids: string[];
  requiere_subgrupos: boolean;
  numero_subgrupos_sugerido: number;
  tamano_subgrupo_sugerido: number;
  tipo_grupo: TipoGrupo;
  activo: boolean;
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export type TipoComponente =
  | 'teoria'
  | 'taller'
  | 'laboratorio'
  | 'practica'
  | 'seminario'
  | 'campo'
  | 'otro';

export type TipoEspacio =
  | 'aula'
  | 'laboratorio'
  | 'aula_computo'
  | 'taller'
  | 'audiovisual'
  | 'auditorio'
  | 'espacio_apoyo'
  | 'virtual';

export type CategoriaEspacio =
  | 'aulas_salones_teoricos'
  | 'laboratorios_especializados'
  | 'centros_computo'
  | 'talleres_practicas'
  | 'audiovisuales_auditorios'
  | 'espacios_apoyo'
  | 'modalidad_virtual';

export interface ComponenteGrupo {
  id: string;
  periodo_id: string;
  curso_id: string;
  grupo_principal_id: string;
  grupo_id?: string;
  nombre_componente: string;
  nombre_visible?: string;
  tipo_componente: TipoComponente;
  horas_semanales: number;
  duracion_sesion_minutos: number;
  sesiones_por_semana: number;
  alumnos_totales: number;
  requiere_division_subgrupos: boolean;
  tamano_maximo_subgrupo: number;
  numero_subgrupos_requerido: number;
  tipo_espacio_requerido: TipoEspacio;
  equipos_requeridos: string[];
  capacidad_minima_espacio: number;
  permite_sesiones_simultaneas: boolean;
  profesor_responsable_id?: string;
  profesores_ids: string[];
  activo: boolean;
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subgrupo {
  id: string;
  periodo_id: string;
  curso_id: string;
  grupo_principal_id: string;
  componente_grupo_id: string;
  clave_subgrupo: string; // e.g. 111-1, 111-2
  nombre_visible: string;
  orden: number;
  alumnos_estimados: number;
  cupo_maximo: number;
  profesor_responsable_id?: string;
  profesores_ids: string[];
  estado: 'planeado' | 'confirmado' | 'cancelado';
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Espacio {
  id: string; // e.g. espacio_S1, espacio_LMB
  codigo: string;
  codigo_normalizado: string;
  nombre: string;
  nombre_normalizado: string;
  alias?: string;
  aliases_normalizados: string[];
  categoria: CategoriaEspacio;
  tipo_espacio: TipoEspacio;
  edificio: string;
  ubicacion: string;
  capacidad_original: number;
  capacidad_maxima: number;
  capacidad_operativa_por_periodo?: Record<string, number>; // { "2027-1": 45 }
  equipos: string[];
  caracteristicas: string[];
  restricciones_uso?: string;
  niveles_educativos_permitidos: NivelEducativo[];
  programas_preferentes_ids: string[];
  disponible: boolean;
  disponible_periodos: string[];
  activo: boolean;
  apto_para_docencia: boolean;
  es_modalidad_virtual: boolean;
  oficial_mapa?: boolean;
  duda_homologacion?: boolean;
  motivo_duda?: string;
  estado_catalogo?: 'oficial_mapa' | 'pendiente_revision_subdireccion' | 'aprobado_subdireccion';
  edificio_codigo?: string;
  planta?: 'Planta Baja' | 'Planta Alta' | 'Parte Posterior' | 'Exterior' | 'General';
  notas?: string;
  capacidad_actualizada_en?: string;
  capacidad_actualizada_por?: string;
  motivo_cambio_capacidad?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EquivalenciaEspacio {
  id: string;
  texto_entrada: string;
  texto_normalizado: string;
  espacio_id: string;
  codigo_oficial: string;
  nombre_oficial: string;
  tipo_equivalencia: 'codigo' | 'alias' | 'abreviatura' | 'nombre_historico' | 'correccion_ortografica';
  activo: boolean;
  notas?: string;
  createdAt?: string;
  requiere_revision_subdireccion?: boolean;
  estado_revision?: 'pendiente' | 'aprobada' | 'rechazada';
  sugerencia_homologacion?: string;
}

export interface EquivalenciaCurso {
  id: string;
  texto_entrada: string;
  texto_normalizado: string;
  curso_id: string;
  codigo_oficial: string;
  nombre_oficial: string;
  tipo_equivalencia: 'codigo' | 'alias' | 'abreviatura' | 'nombre_historico' | 'correccion_ortografica';
  activo: boolean;
  notas?: string;
}

export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado';

export interface RangoHorario {
  dia: DiaSemana;
  hora_inicio: string; // '09:00'
  hora_fin: string; // '13:00'
}

export type NivelRestriccion = 'preferencia_deseable' | 'preferencia' | 'restriccion_importante' | 'no_negociable';
export type EstadoPreferencia = 'borrador' | 'enviado' | 'revisado';

export interface PreferenciaDocente {
  id: string; // {periodoId}_{profesorId}_{grupoId}
  periodo_id: string;
  profesor_id: string;
  profesor_nombre?: string;
  curso_id?: string;
  grupo_id?: string;
  cursos_interes_ids?: string[];
  nivel_educativo?: NivelEducativo;
  programas_ids?: string[];
  disponibilidad_amplia_texto?: string;
  dias_preferidos?: DiaSemana[];
  dias_no_disponibles: DiaSemana[];
  rangos_no_disponibles: { dia: DiaSemana; hora_inicio: string; hora_fin: string; motivo?: string }[];
  rangos_preferidos?: RangoHorario[];
  nivel_restriccion: NivelRestriccion;
  motivo_restriccion?: string;
  tipo_espacio_requerido?: TipoEspacio;
  equipos_requeridos: string[];
  capacidad_requerida?: number;
  espacio_preferido_id?: string;
  comentarios?: string;
  observaciones?: string;
  estatus_aprobacion?: string;
  considerar_compromisos_otros_niveles?: boolean;
  estado?: EstadoPreferencia;
  createdAt?: string;
  updatedAt: string;
}

export type EstatusAsignacion = 'borrador' | 'en_revision' | 'confirmado' | 'publicado' | 'cancelado';
export type NivelProgramacion = 'grupo_principal' | 'componente' | 'subgrupo';

export interface Asignacion {
  id: string;
  periodo_id: string;
  escenario_id: string;
  curso_id: string;
  grupo_principal_id: string;
  componente_grupo_id?: string;
  subgrupo_id?: string;
  nivel_programacion: NivelProgramacion;
  profesores_ids: string[];
  profesor_principal_id: string;
  programas_ids: string[];
  nivel_educativo: NivelEducativo;
  espacio_id: string;
  espacio_codigo_snapshot: string;
  espacio_nombre_snapshot: string;
  dia: DiaSemana;
  hora_inicio: string; // "08:00"
  hora_fin: string; // "10:00"
  tipo_componente: TipoComponente;
  tipo_sesion: string;
  alumnos_programados: number;
  capacidad_espacio: number;
  estatus: EstatusAsignacion;
  conflictos_detectados?: string[];
  justificacion_conflicto?: string;
  reserva_compartida_autorizada?: boolean;
  notas?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export type SeveridadConflicto = 'compatible' | 'advertencia' | 'conflicto_critico';

export interface Conflicto {
  id: string;
  tipo:
    | 'traslape_espacio'
    | 'traslape_docente'
    | 'capacidad_insuficiente'
    | 'espacio_no_docente'
    | 'espacio_no_disponible'
    | 'restriccion_docente_no_negociable'
    | 'restriccion_docente_importante'
    | 'subgrupos_matricula_incompleta'
    | 'otro';
  severidad: SeveridadConflicto;
  titulo: string;
  mensaje: string;
  bloqueante: boolean;
  asignacion_nueva_id?: string;
  asignacion_existente_id?: string;
  espacio_codigo?: string;
  espacio_nombre?: string;
  profesor_nombre?: string;
  dia?: DiaSemana;
  horario?: string;
  programa_nombre?: string;
}

export interface SolicitudCambio {
  id: string;
  periodo_id: string;
  profesor_id: string;
  profesor_nombre: string;
  asignacion_id: string;
  curso_nombre: string;
  grupo_clave: string;
  horario_actual: string;
  motivo: string;
  cambio_solicitado: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  respuesta_admin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SolicitudCurso {
  id: string;
  periodo_id: string;
  profesor_id: string;
  profesor_nombre: string;
  nombre_curso_propuesto: string;
  codigo_propuesto?: string;
  nivel_educativo: NivelEducativo;
  programas_ids: string[];
  tipo_actividad: TipoActividadCurso;
  horas_teoria: number;
  horas_lab: number;
  justificacion: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  respuesta_admin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BitacoraImportacion {
  id: string;
  archivo: string;
  fecha: string;
  administrador: string;
  tipo: 'espacios' | 'profesores' | 'cursos' | 'grupos' | 'asignaciones_2026_2';
  creados: number;
  actualizados: number;
  vinculados: number;
  rechazados: number;
  pendientes: number;
  detalles?: string[];
}

export type TipoAccionHistorial =
  | 'mover_aula'
  | 'cambiar_horario'
  | 'cambiar_dia_y_aula'
  | 'asignar_docente'
  | 'crear_asignacion'
  | 'eliminar_asignacion'
  | 'modificar_cupo'
  | 'crear_materia'
  | 'crear_aula'
  | 'editar_aula'
  | 'unificar_aulas'
  | 'importar_csv'
  | 'restablecer_datos';

export interface DetalleCambioPlaneacion {
  curso_id?: string;
  curso_codigo?: string;
  curso_nombre?: string;
  grupo_clave?: string;
  espacio_anterior_codigo?: string;
  espacio_anterior_nombre?: string;
  espacio_nuevo_codigo?: string;
  espacio_nuevo_nombre?: string;
  dia_anterior?: DiaSemana;
  dia_nuevo?: DiaSemana;
  horario_anterior?: string;
  horario_nuevo?: string;
  docente_anterior_nombre?: string;
  docente_nuevo_nombre?: string;
  escenario_id?: string;
  escenario_nombre?: string;
  motivo?: string;
}

export interface RegistroHistorialCambio {
  id: string;
  timestamp: string;
  fecha_formateada: string;
  usuario_id: string;
  usuario_nombre: string;
  usuario_email: string;
  usuario_rol: RolUsuario;
  usuario_cargo?: string;
  tipo_accion: TipoAccionHistorial;
  descripcion: string;
  detalles?: DetalleCambioPlaneacion;
}
