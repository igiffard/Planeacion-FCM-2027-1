/**
 * Vista de Infografía Interactiva FCM 2027-1
 * Explicación visual, paso a paso, de cómo funciona la aplicación de Planeación Académica
 */

import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  Calendar,
  Building2,
  Users,
  ShieldCheck,
  Pencil,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Clock,
  Download,
  Key,
  FileSpreadsheet,
  Cpu,
  ChevronRight,
  GitMerge,
  Filter
} from 'lucide-react';
import { VistaActiva } from './Sidebar';
import { RoleUsuario } from '../types';

interface InfografiaViewProps {
  onNavegar: (vista: VistaActiva) => void;
  onAbrirNuevaAsignaturaConHorario: () => void;
  onAbrirCrearAula?: () => void;
  roleUsuario?: RoleUsuario;
}

export const InfografiaView: React.FC<InfografiaViewProps> = ({
  onNavegar,
  onAbrirNuevaAsignaturaConHorario,
  onAbrirCrearAula,
  roleUsuario
}) => {
  const [pasoActivo, setPasoActivo] = useState<number>(1);

  const esAdmin = roleUsuario === 'admin';

  const pasosInfografia = [
    {
      numero: 1,
      titulo: 'Identidad y Roles Institucionales',
      subtitulo: 'Acceso con correo @uabc.edu.mx y roles diferenciados',
      icono: ShieldCheck,
      colorIcono: 'text-sky-700 bg-sky-100',
      bordeColor: 'border-sky-300',
      resumen:
        'Cada profesor y directivo inicia sesión de manera segura. Los profesores acceden con su nombre real verificado y la administración (Dra. Ivone Giffard) cuenta con facultades plenarias para editar espacios, consolidar catálogos y validar horarios.',
      puntosClave: [
        'Autenticación UABC institucional vinculada a Firestore.',
        'Profesores con perfil y nombre real editable en cualquier momento.',
        'Rol de Administrador reservado para la Subdirección FCM.'
      ],
      vistaDestino: 'dashboard' as VistaActiva,
      textoBoton: 'Ir al Dashboard Principal'
    },
    {
      numero: 2,
      titulo: 'Registro de Asignaturas y Horarios',
      subtitulo: 'Docentes y Administrador introducen materias y bloques de clase',
      icono: BookOpen,
      colorIcono: 'text-teal-700 bg-teal-100',
      bordeColor: 'border-teal-300',
      resumen:
        'Al registrarse o en cualquier momento, el profesor puede dar de alta una nueva materia junto con su horario deseado (día, hora inicio, hora fin) y aula. El administrador puede además incluir materias, horarios y crear nuevas aulas directamente.',
      puntosClave: [
        'Formulario ágil para materias teóricas, laboratorios o mixtas.',
        'Definición de horas por semana, cupo estimado y grupo (111, 211, etc.).',
        'División en subgrupos para prácticas en laboratorios FCM e IIO.'
      ],
      accionEspecial: 'abrir_crear_materia',
      textoBoton: '+ Registrar Nueva Asignatura con Horario'
    },
    {
      numero: 3,
      titulo: 'Gestión y Unificación de Aulas (Lápiz Admin)',
      subtitulo: 'Exclusividad de espacios y solo 1 opción por aula física',
      icono: Pencil,
      colorIcono: 'text-amber-700 bg-amber-100',
      bordeColor: 'border-amber-300',
      resumen:
        'Para evitar duplicados (ej: "Aula Magna 1" vs "AM1"), el sistema unifica automáticamente todas las variantes en una única opción oficial. Los administradores disponen de un lápiz de edición para modificar nombres, códigos y capacidades de cualquier espacio.',
      puntosClave: [
        'Icono de lápiz (Pencil) exclusivo para administradores.',
        'Consolidación matemática: se eliminan duplicados y se migran todas las clases al espacio canónico.',
        'Catálogo homologado de 22+ aulas, auditorios y laboratorios especializados.'
      ],
      vistaDestino: 'matriz_espacios' as VistaActiva,
      textoBoton: 'Ver Matriz de Aulas y Lápices'
    },
    {
      numero: 4,
      titulo: 'Matriz de Espacios y Prevención de Traslapes',
      subtitulo: 'Motor continuo de auditoría de colisiones horarias',
      icono: Calendar,
      colorIcono: 'text-indigo-700 bg-indigo-100',
      bordeColor: 'border-indigo-300',
      resumen:
        'Visualización semanal interactiva (Lunes a Sábado, 07:00 a 20:30) por aula física. El algoritmo valida en tiempo real que ningún aula tenga dos clases simultáneas ni ningún profesor esté programado en dos lugares a la vez.',
      puntosClave: [
        'Detección instantánea de traslapes bloqueantes.',
        'Semáforo visual de capacidad vs alumnos inscritos.',
        'Filtro dinámico por edificio (Edif 17, Edif 14, IIO) y tipo de espacio.'
      ],
      vistaDestino: 'matriz_espacios' as VistaActiva,
      textoBoton: 'Explorar Matriz Semanal'
    },
    {
      numero: 5,
      titulo: 'Portal de Preferencias y Restricciones Docentes',
      subtitulo: 'Captura estructurada de necesidades y salidas de campo',
      icono: Users,
      colorIcono: 'text-rose-700 bg-rose-100',
      bordeColor: 'border-rose-300',
      resumen:
        'Los profesores indican materias de interés, franjas horarias no disponibles (por salidas oceanográficas o proyectos) y el nivel de restricción (Deseable, Importante o No Negociable).',
      puntosClave: [
        'Registro de requerimientos especiales (microscopios, agua salada, software).',
        'Validación cruzada contra el horario asignado.',
        'Historial persistente en la nube Firestore para el periodo 2027-1.'
      ],
      vistaDestino: 'preferencias' as VistaActiva,
      textoBoton: 'Ir al Portal Docente'
    },
    {
      numero: 6,
      titulo: 'Exportación Homologada e Informes Oficiales',
      subtitulo: 'Generación de planillas CSV compatibles con Excel UTF-8',
      icono: FileSpreadsheet,
      colorIcono: 'text-emerald-700 bg-emerald-100',
      bordeColor: 'border-emerald-300',
      resumen:
        'Exportación inmediata de la planeación curricular completa con un solo clic. Incluye códigos homologados, nombres canónicos de aulas, nombres reales de docentes y desglose de horas para la Dirección de la FCM.',
      puntosClave: [
        'Descarga de CSV con codificación UTF-8 con BOM para Excel directo.',
        'Matrices de horario listas para impresión y publicación a estudiantes.',
        'Reportes de auditoría de conflictos sin discrepancias.'
      ],
      vistaDestino: 'import_export' as VistaActiva,
      textoBoton: 'Exportar Horarios Institucionales'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Banner Principal de la Infografía */}
      <div className="bg-gradient-to-r from-[#0c2d48] via-[#113a5d] to-[#0369a1] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-700 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold text-sky-200 mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Guía de Operación · Facultad de Ciencias Marinas UABC</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            ¿Cómo Funciona el Sistema de Planeación FCM 2027-1?
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            Plataforma institucional diseñada para coordinar cursos de licenciatura y posgrado, garantizar la exclusividad física de las aulas, permitir el registro ágil de asignaturas y horarios tanto a profesores como a la administración, y unificar el catálogo oficial sin duplicados.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onAbrirNuevaAsignaturaConHorario}
              className="px-4 py-2 bg-white text-[#0c2d48] text-xs font-bold rounded-lg shadow hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-sky-700" />
              <span>+ Registrar Asignatura y Horario</span>
            </button>
            {esAdmin && onAbrirCrearAula && (
              <button
                onClick={onAbrirCrearAula}
                className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow hover:bg-emerald-600 transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>+ Registrar Nueva Aula</span>
              </button>
            )}
            <button
              onClick={() => onNavegar('matriz_espacios')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-all border border-white/20 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Ver Matriz de Espacios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flujo Infográfico en 6 Pasos Interactivos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0c2d48]">
              Flujo de Trabajo Operativo en 6 Pasos
            </h3>
            <p className="text-xs text-slate-500">
              Seleccione cualquier paso para ver sus detalles técnicos, responsabilidades y acciones disponibles.
            </p>
          </div>
          <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
            Paso {pasoActivo} de 6
          </span>
        </div>

        {/* Barra de progreso de pasos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {pasosInfografia.map((p) => {
            const Icono = p.icono;
            const esSeleccionado = pasoActivo === p.numero;

            return (
              <button
                key={p.numero}
                onClick={() => setPasoActivo(p.numero)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  esSeleccionado
                    ? 'bg-white border-[#0c2d48] shadow-md ring-2 ring-[#0c2d48]/10'
                    : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      esSeleccionado
                        ? 'bg-[#0c2d48] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.numero}
                  </span>
                  <Icono
                    className={`w-4 h-4 ${
                      esSeleccionado ? 'text-sky-700' : 'text-slate-400'
                    }`}
                  />
                </div>
                <p className="text-xs font-bold text-slate-800 truncate">
                  {p.titulo}
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {p.subtitulo}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detalle ampliado del paso seleccionado */}
        {(() => {
          const paso = pasosInfografia.find((p) => p.numero === pasoActivo) || pasosInfografia[0];
          const Icono = paso.icono;

          return (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${paso.colorIcono}`}>
                    <Icono className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
                      Paso {paso.numero} del Sistema
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                      {paso.titulo}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {paso.subtitulo}
                    </p>
                  </div>
                </div>

                {/* Botón de acción contextual */}
                <div>
                  {paso.accionEspecial === 'abrir_crear_materia' ? (
                    <button
                      onClick={onAbrirNuevaAsignaturaConHorario}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#0c2d48] hover:bg-[#1a4b70] text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-sky-300" />
                      <span>{paso.textoBoton}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavegar(paso.vistaDestino!)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#0c2d48] hover:bg-[#1a4b70] text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <span>{paso.textoBoton}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Descripción y Propósito
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {paso.resumen}
                  </p>

                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-700" />
                      <span>Beneficio Institucional:</span>
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Garantiza rigor académico, previene la saturación de aulas e impide discrepancias horarias antes del inicio de semestre.
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Puntos Clave y Reglas Operativas
                  </h5>
                  <ul className="space-y-2.5">
                    {paso.puntosClave.map((punto, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Matriz de Roles y Permisos (Comparativa Docente vs Administrador) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="border-b pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#0c2d48]" />
            <h3 className="text-base font-bold text-slate-900">
              Matriz de Roles y Permisos en la Plataforma
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Reglas de autorización para la Facultad de Ciencias Marinas (FCM)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Funcionalidad del Sistema</th>
                <th className="p-3 text-center">Docente FCM</th>
                <th className="p-3 text-center bg-sky-50/50">
                  Administrador (Subdirección FCM)
                </th>
                <th className="p-3">Detalle Operativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  Introducir Asignatura Nueva con Horarios
                </td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí (Se auto-asigna)
                  </span>
                </td>
                <td className="p-3 text-center bg-sky-50/50">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí (Cualquier docente)
                  </span>
                </td>
                <td className="p-3 text-slate-600">
                  Permite dar de alta la materia, horario (día/hora) y seleccionar aula compatible.
                </td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  Editar Nombre de Aulas (Lápiz)
                </td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    No (Solo Lectura)
                  </span>
                </td>
                <td className="p-3 text-center bg-sky-50/50">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí (Exclusivo)
                  </span>
                </td>
                <td className="p-3 text-slate-600">
                  El lápiz permite a la Subdirección renombrar aulas, ajustar capacidades y edificios.
                </td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  Crear Nuevas Aulas en el Catálogo
                </td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    No
                  </span>
                </td>
                <td className="p-3 text-center bg-sky-50/50">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí
                  </span>
                </td>
                <td className="p-3 text-slate-600">
                  Alta de nuevos salones, laboratorios, talleres y auditorios.
                </td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  Unificar Variantes de Aulas a 1 Sola Opción
                </td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    No
                  </span>
                </td>
                <td className="p-3 text-center bg-sky-50/50">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí
                  </span>
                </td>
                <td className="p-3 text-slate-600">
                  Consolidación de nombres históricos para que solo exista una opción oficial por aula física.
                </td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  Enviar Encuesta de Preferencias y Restricciones
                </td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí
                  </span>
                </td>
                <td className="p-3 text-center bg-sky-50/50">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí (Auditoría Global)
                  </span>
                </td>
                <td className="p-3 text-slate-600">
                  Docentes registran salidas de campo o no disponibilidad en franjas específicas.
                </td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900">
                  Exportar Horarios Institucionales (CSV / Excel)
                </td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí
                  </span>
                </td>
                <td className="p-3 text-center bg-sky-50/50">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sí
                  </span>
                </td>
                <td className="p-3 text-slate-600">
                  Descarga libre del horario oficial completo para consulta e impresión.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarjetas de Respuestas a Dudas Frecuentes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs mb-3">
            ?
          </div>
          <h4 className="text-xs font-bold text-slate-900 mb-1">
            ¿Cómo edito el nombre de un aula?
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Como administrador, diríjase a la <strong>Matriz de Espacios</strong> o a <strong>Homologación</strong>. Haga clic sobre el icono del lápiz ✏️ situado junto al código de cada aula. Podrá cambiar su nombre oficial, código, edificio y capacidad.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3">
            ?
          </div>
          <h4 className="text-xs font-bold text-slate-900 mb-1">
            ¿Cómo doy de alta una nueva materia?
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Presione el botón <strong>&quot;+ Registrar Asignatura y Horario&quot;</strong> en la barra superior o en esta infografía. Llene el nombre, horas, día y hora. El sistema validará al instante si el aula y docente están libres.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs mb-3">
            ?
          </div>
          <h4 className="text-xs font-bold text-slate-900 mb-1">
            ¿Qué ocurre al unificar aulas?
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Si existían registros con nombres antiguos o variantes (como &quot;Aula Magna 1&quot;), el motor de unificación reasigna todas las clases a la única opción oficial (&quot;Aula Magna I (AM1)&quot;) para que no existan duplicados en los selectores.
          </p>
        </div>
      </div>
    </div>
  );
};
