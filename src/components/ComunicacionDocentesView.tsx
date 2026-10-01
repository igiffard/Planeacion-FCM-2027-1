/**
 * Vista de Comunicación Estudiantes - Docentes FCM 2027-1
 * Facilita la vinculación, directorio de cubículos, horarios de tutorías y tablón de avisos
 */

import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Users,
  Search,
  Mail,
  MapPin,
  Clock,
  Building2,
  Calendar,
  BookOpen,
  Share2,
  Check,
  Plus,
  Send,
  Bell,
  Sparkles,
  Phone,
  AlertCircle,
  CheckCircle2,
  BookmarkCheck,
  Compass,
  GraduationCap
} from 'lucide-react';
import { TUTORIAS_ESTUDIANTES_INICIALES } from '../data/seed_data';
import {
  Usuario,
  Curso,
  Asignacion,
  Espacio,
  PreferenciaDocente,
  AvisoEstudiantes,
  DiaSemana
} from '../types';

interface ComunicacionDocentesViewProps {
  docentes: Usuario[];
  cursos: Curso[];
  asignaciones: Asignacion[];
  espacios: Espacio[];
  preferencias: PreferenciaDocente[];
  avisos: AvisoEstudiantes[];
  usuarioActual: Usuario | null;
  periodoActivoId: string;
  escenarioActivoId: string;
  onPublicarAviso: (aviso: AvisoEstudiantes) => void;
  onNavegarMapa?: () => void;
}

export const ComunicacionDocentesView: React.FC<ComunicacionDocentesViewProps> = ({
  docentes,
  cursos,
  asignaciones,
  espacios,
  preferencias,
  avisos,
  usuarioActual,
  periodoActivoId,
  escenarioActivoId,
  onPublicarAviso,
  onNavegarMapa
}) => {
  const [pestana, setPestana] = useState<'directorio' | 'buscador_estudiantil' | 'tablon_avisos' | 'tutorias_posgrado'>('directorio');
  const [busqueda, setBusqueda] = useState('');
  const [filtroArea, setFiltroArea] = useState('todas');
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  // Filtros para Tutorías Posgrado
  const [busquedaTutoria, setBusquedaTutoria] = useState('');
  const [filtroGrupoTutoria, setFiltroGrupoTutoria] = useState<'todos' | 'A' | 'B'>('todos');
  const [filtroNivelTutoria, setFiltroNivelTutoria] = useState<string>('todos');

  // Formulario nuevo aviso
  const [mostrarModalAviso, setMostrarModalAviso] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [nuevoCursoId, setNuevoCursoId] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState<'aviso_general' | 'cambio_aula' | 'material_laboratorio' | 'tutorias' | 'examen'>('aviso_general');
  const [nuevaPrioridad, setNuevaPrioridad] = useState<'normal' | 'importante' | 'urgente'>('normal');

  const cursosMap = useMemo(() => new Map(cursos.map((c) => [c.id, c])), [cursos]);
  const espaciosMap = useMemo(() => new Map(espacios.map((e) => [e.id, e])), [espacios]);
  const docentesMap = useMemo(() => new Map(docentes.map((d) => [d.uid, d])), [docentes]);

  // Asignaciones activas del escenario
  const asignacionesActivas = useMemo(() => {
    return asignaciones.filter(
      (a) => a.periodo_id === periodoActivoId && a.escenario_id === escenarioActivoId && a.estatus !== 'cancelado'
    );
  }, [asignaciones, periodoActivoId, escenarioActivoId]);

  // Lista de áreas o academias
  const areasDisponibles = useMemo(() => {
    const set = new Set<string>();
    docentes.forEach((d) => {
      if (d.academia_area) set.add(d.academia_area);
    });
    return Array.from(set);
  }, [docentes]);

  // Docentes con datos combinados de perfil y preferencias
  const docentesConDetalle = useMemo(() => {
    return docentes.map((doc) => {
      const pref = preferencias.find(
        (p) => p.profesor_id === doc.uid && p.periodo_id === periodoActivoId
      );

      // Cursos que imparte en este periodo
      const asignacionesDocente = asignacionesActivas.filter(
        (a) => a.profesores_ids && a.profesores_ids.includes(doc.uid)
      );

      return {
        ...doc,
        cubiculo: pref?.cubiculo || doc.cubiculo || 'Edificio de Aulas FCM / Por confirmar',
        horario_tutorias: pref?.horario_tutorias || doc.horario_tutorias || 'Consultar con el docente vía correo institucional',
        canal_contacto_estudiantes: pref?.canal_contacto_estudiantes || doc.canal_contacto_estudiantes || 'Correo UABC / Teams',
        telefono_extension: pref?.telefono_extension || doc.telefono_extension || '',
        mensaje_estudiantes: pref?.mensaje_estudiantes || '',
        asignacionesDocente
      };
    });
  }, [docentes, preferencias, periodoActivoId, asignacionesActivas]);

  // Filtrado de docentes
  const docentesFiltrados = useMemo(() => {
    return docentesConDetalle.filter((doc) => {
      const coincideBusqueda =
        doc.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        doc.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        (doc.academia_area && doc.academia_area.toLowerCase().includes(busqueda.toLowerCase())) ||
        doc.asignacionesDocente.some((a) => {
          const c = cursosMap.get(a.curso_id);
          return c?.nombre.toLowerCase().includes(busqueda.toLowerCase());
        });

      const coincideArea = filtroArea === 'todas' || doc.academia_area === filtroArea;

      return coincideBusqueda && coincideArea;
    }).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [docentesConDetalle, busqueda, filtroArea, cursosMap]);

  // Copiar tarjeta o ficha limpia para WhatsApp / Estudiantes
  const copiarFichaDocente = (doc: any) => {
    const lineasCursos = doc.asignacionesDocente
      .map((a: Asignacion) => {
        const c = cursosMap.get(a.curso_id);
        const esp = espaciosMap.get(a.espacio_id);
        return `  • ${c?.nombre || 'Materia'} (${a.dia.toUpperCase()} ${a.hora_inicio}-${a.hora_fin} · Aula: ${esp?.codigo || a.espacio_codigo_snapshot})`;
      })
      .join('\n');

    const texto = `🎓 FACULTAD DE CIENCIAS MARINAS - UABC\nDocente: ${doc.nombre}\n📧 Correo: ${doc.email}\n📍 Cubículo: ${doc.cubiculo}\n⏰ Horario de Tutorías: ${doc.horario_tutorias}\n💬 Canal de atención: ${doc.canal_contacto_estudiantes}\n\n📚 Clases 2027-1:\n${lineasCursos || '  • Sin clases frente a grupo asignadas'}\n\n${doc.mensaje_estudiantes ? `📢 Mensaje: "${doc.mensaje_estudiantes}"` : ''}`;

    navigator.clipboard.writeText(texto);
    setCopiadoId(doc.uid);
    setTimeout(() => setCopiadoId(null), 3000);
  };

  const copiarHorarioClase = (asig: Asignacion) => {
    const c = cursosMap.get(asig.curso_id);
    const esp = espaciosMap.get(asig.espacio_id);
    const doc = docentesMap.get(asig.profesor_principal_id);

    const texto = `📘 Materia: ${c?.nombre} (${c?.codigo})\n👨‍🏫 Docente: ${doc?.nombre || 'Profesor FCM'} (${doc?.email})\n📍 Salón: ${esp?.nombre || asig.espacio_nombre_snapshot} (${esp?.codigo || asig.espacio_codigo_snapshot})\n⏰ Día y Horario: ${asig.dia.toUpperCase()} de ${asig.hora_inicio} a ${asig.hora_fin}\n🏫 Campus Sauzal · Facultad de Ciencias Marinas`;

    navigator.clipboard.writeText(texto);
    setCopiadoId(asig.id);
    setTimeout(() => setCopiadoId(null), 3000);
  };

  const handleCrearAviso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim() || !nuevoContenido.trim()) return;

    const curso = cursosMap.get(nuevoCursoId);
    const aviso: AvisoEstudiantes = {
      id: `aviso_${Date.now()}`,
      periodo_id: periodoActivoId,
      profesor_id: usuarioActual?.uid || 'coordinacion_fcm',
      profesor_nombre: usuarioActual?.nombre || 'Subdirección Académica FCM',
      curso_id: nuevoCursoId || undefined,
      curso_nombre: curso?.nombre,
      titulo: nuevoTitulo,
      contenido: nuevoContenido,
      tipo: nuevoTipo,
      prioridad: nuevaPrioridad,
      fecha_publicacion: new Date().toISOString().split('T')[0],
      contacto: usuarioActual?.email || 'fcm@uabc.edu.mx'
    };

    onPublicarAviso(aviso);
    setMostrarModalAviso(false);
    setNuevoTitulo('');
    setNuevoContenido('');
    setNuevoCursoId('');
  };

  return (
    <div className="space-y-5">
      {/* Encabezado y Bienvenida */}
      <div className="bg-gradient-to-r from-[#0c2d48] to-[#145374] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-lg bg-sky-400 text-[#0c2d48] flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tight">
              Canal de Comunicación y Tutorías Estudiantil FCM 2027-1
            </h1>
          </div>
          <p className="text-xs text-sky-200 max-w-2xl leading-relaxed">
            Directorio oficial de docentes, ubicación de cubículos físicos, horarios de tutorías y avisos de clases para facilitar la comunicación entre estudiantes, profesores y coordinación.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMostrarModalAviso(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-sky-400 hover:bg-sky-300 text-[#0c2d48] font-bold rounded-lg text-xs shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Publicar Aviso para Alumnos</span>
          </button>
        </div>
      </div>

      {/* Pestañas de Navegación */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-2 text-xs">
        <button
          type="button"
          onClick={() => setPestana('directorio')}
          className={`py-2.5 px-4 font-bold border-b-2 transition flex items-center gap-2 ${
            pestana === 'directorio'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Directorio de Docentes, Cubículos y Tutorías ({docentes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setPestana('buscador_estudiantil')}
          className={`py-2.5 px-4 font-bold border-b-2 transition flex items-center gap-2 ${
            pestana === 'buscador_estudiantil'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Buscador Estudiantil ("¿Dónde está mi clase y salón?")</span>
        </button>

        <button
          type="button"
          onClick={() => setPestana('tablon_avisos')}
          className={`py-2.5 px-4 font-bold border-b-2 transition flex items-center gap-2 ${
            pestana === 'tablon_avisos'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Tablón de Avisos Oficiales ({avisos.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setPestana('tutorias_posgrado')}
          className={`py-2.5 px-4 font-bold border-b-2 transition flex items-center gap-2 ${
            pestana === 'tutorias_posgrado'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>Padrón de Tutorías MCOC/DCOC ({TUTORIAS_ESTUDIANTES_INICIALES.length} Estudiantes)</span>
        </button>
      </div>

      {/* PESTAÑA 1: DIRECTORIO DE DOCENTES, CUBÍCULOS Y TUTORÍAS */}
      {pestana === 'directorio' && (
        <div className="space-y-4">
          {/* Barra de Filtro y Búsqueda */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por profesor, academia o materia..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-500 font-semibold whitespace-nowrap">Área / Academia:</span>
              <select
                value={filtroArea}
                onChange={(e) => setFiltroArea(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value="todas">Todas las áreas</option>
                {areasDisponibles.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid de Tarjetas de Docentes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {docentesFiltrados.map((doc) => {
              const esCopiado = copiadoId === doc.uid;

              return (
                <div
                  key={doc.uid}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header Docente */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">
                            {doc.titulo_academico || 'Prof.'}
                          </span>
                          <h3 className="font-bold text-slate-900 text-sm leading-snug">
                            {doc.nombre}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {doc.academia_area || doc.cargo || 'Facultad de Ciencias Marinas'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => copiarFichaDocente(doc)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold transition flex items-center gap-1 ${
                          esCopiado
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                        title="Copiar ficha de contacto para WhatsApp o correo de estudiantes"
                      >
                        {esCopiado ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Datos de Ubicación y Tutorías */}
                    <div className="space-y-2 bg-slate-50/70 p-3 rounded-lg border border-slate-100 text-xs">
                      <div className="flex items-start gap-2 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">
                            Cubículo / Oficina FCM:
                          </span>
                          <span className="font-semibold text-slate-800">{doc.cubiculo}</span>
                          {doc.telefono_extension && (
                            <span className="text-slate-500 ml-1">({doc.telefono_extension})</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-slate-700 pt-1 border-t border-slate-200/50">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">
                            Horario de Tutorías y Asesorías:
                          </span>
                          <span className="font-bold text-emerald-800">{doc.horario_tutorias}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-slate-700 pt-1 border-t border-slate-200/50">
                        <MessageSquare className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">
                            Canal de Atención:
                          </span>
                          <span className="text-slate-800">{doc.canal_contacto_estudiantes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Clases asignadas este semestre */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Cursos que imparte en 2027-1 ({doc.asignacionesDocente.length}):
                      </span>
                      {doc.asignacionesDocente.length > 0 ? (
                        <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                          {doc.asignacionesDocente.map((asig) => {
                            const c = cursosMap.get(asig.curso_id);
                            const esp = espaciosMap.get(asig.espacio_id);

                            return (
                              <div
                                key={asig.id}
                                className="flex items-center justify-between p-1.5 bg-white border border-slate-200 rounded text-[11px]"
                              >
                                <div className="truncate mr-2">
                                  <span className="font-bold text-slate-800">{c?.nombre || 'Curso'}</span>
                                  <span className="text-slate-400 ml-1 text-[10px]">
                                    ({asig.dia.slice(0, 3)} {asig.hora_inicio})
                                  </span>
                                </div>
                                <span className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px] whitespace-nowrap">
                                  {esp?.codigo || asig.espacio_codigo_snapshot}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">
                          Sin grupos regulares programados en este escenario.
                        </p>
                      )}
                    </div>

                    {/* Mensaje a Estudiantes si existe */}
                    {doc.mensaje_estudiantes && (
                      <div className="p-2 bg-sky-50 border border-sky-200 rounded text-[11px] text-sky-900 italic">
                        "{doc.mensaje_estudiantes}"
                      </div>
                    )}
                  </div>

                  {/* Botones de Acción Directa */}
                  <div className="pt-2 border-t flex items-center gap-2">
                    <a
                      href={`mailto:${doc.email}?subject=Consulta%20Académica%20FCM%202027-1`}
                      className="flex-1 py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-center text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Escribir Correo</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => copiarFichaDocente(doc)}
                      className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold transition"
                      title="Copiar ficha de contacto"
                    >
                      {esCopiado ? '¡Copiado!' : 'Compartir'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PESTAÑA 2: BUSCADOR ESTUDIANTIL */}
      {pestana === 'buscador_estudiantil' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Buscador Rápido para Estudiantes: ¿En qué salón y a qué hora está mi clase?</span>
            </h3>
            <p className="text-xs text-slate-500">
              Escribe el nombre de la materia o clave de grupo para ver salón asignado, ubicación física y datos de tu profesor.
            </p>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Ej. Oceanografía, Biología Molecular, Cálculo, 111, Grupo 1..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {asignacionesActivas
              .filter((asig) => {
                const c = cursosMap.get(asig.curso_id);
                const esp = espaciosMap.get(asig.espacio_id);
                const doc = docentesMap.get(asig.profesor_principal_id);
                const term = busqueda.toLowerCase();

                return (
                  c?.nombre.toLowerCase().includes(term) ||
                  c?.codigo.toLowerCase().includes(term) ||
                  esp?.codigo.toLowerCase().includes(term) ||
                  esp?.nombre.toLowerCase().includes(term) ||
                  doc?.nombre.toLowerCase().includes(term) ||
                  asig.dia.toLowerCase().includes(term)
                );
              })
              .map((asig) => {
                const c = cursosMap.get(asig.curso_id);
                const esp = espaciosMap.get(asig.espacio_id);
                const doc = docentesMap.get(asig.profesor_principal_id);
                const esCopiado = copiadoId === asig.id;

                return (
                  <div
                    key={asig.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition p-4 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {c?.codigo || 'MATERIA'}
                          </span>
                          <h4 className="font-bold text-slate-900 text-xs leading-snug mt-1">
                            {c?.nombre || asig.tipo_sesion}
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-xs">
                          {asig.alumnos_programados} alumnos
                        </span>
                      </div>

                      {/* Salón y Ubicación */}
                      <div className="p-2.5 bg-sky-50/70 border border-sky-200 rounded-lg text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-sky-950">
                          <Building2 className="w-3.5 h-3.5 text-sky-600" />
                          <span>Salón: {esp?.codigo || asig.espacio_codigo_snapshot} · {esp?.nombre || asig.espacio_nombre_snapshot}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{esp?.edificio || 'Edificio de Aulas'} · {esp?.planta || 'Planta Baja'}</span>
                        </div>
                      </div>

                      {/* Horario y Día */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span className="capitalize">{asig.dia}:</span>
                        <span>{asig.hora_inicio} a {asig.hora_fin} hrs</span>
                      </div>

                      {/* Docente a cargo */}
                      <div className="pt-1 text-xs border-t border-slate-100 flex items-center justify-between">
                        <span className="text-slate-500">Docente:</span>
                        <span className="font-bold text-slate-800">{doc?.nombre || 'Docente asignado'}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copiarHorarioClase(asig)}
                        className={`w-full py-1.5 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                          esCopiado
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {esCopiado ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{esCopiado ? '¡Copiado para WhatsApp!' : 'Copiar Horario para Estudiantes'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* PESTAÑA 3: TABLÓN DE AVISOS OFICIALES */}
      {pestana === 'tablon_avisos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Avisos de Docentes y Subdirección para Estudiantes</span>
              </h3>
              <p className="text-xs text-slate-500">
                Notificaciones sobre materiales requeridos para laboratorios, horarios de asesoría y cambios de aula
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMostrarModalAviso(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Aviso</span>
            </button>
          </div>

          <div className="space-y-3">
            {avisos.map((aviso) => {
              const esUrgente = aviso.prioridad === 'urgente';
              const esImportante = aviso.prioridad === 'importante';

              return (
                <div
                  key={aviso.id}
                  className={`p-4 rounded-xl border shadow-xs transition bg-white space-y-2.5 ${
                    esUrgente
                      ? 'border-red-300 bg-red-50/20 border-l-4 border-l-red-500'
                      : esImportante
                      ? 'border-amber-300 bg-amber-50/20 border-l-4 border-l-amber-500'
                      : 'border-slate-200 border-l-4 border-l-sky-500'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          esUrgente
                            ? 'bg-red-100 text-red-800'
                            : esImportante
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {aviso.tipo.replace(/_/g, ' ')}
                      </span>
                      {aviso.curso_nombre && (
                        <span className="font-bold text-xs text-slate-800">
                          {aviso.curso_nombre}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Publicado: {aviso.fecha_publicacion}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{aviso.titulo}</h4>

                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {aviso.contenido}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <span>Emisor: {aviso.profesor_nombre}</span>
                      {aviso.aula_codigo && (
                        <span className="text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.2 rounded">
                          Aula: {aviso.aula_codigo}
                        </span>
                      )}
                    </div>
                    {aviso.contacto && (
                      <span className="text-slate-400 italic">{aviso.contacto}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PESTAÑA 4: PADRÓN OFICIAL DE TUTORÍAS MCOC / DCOC (Página 4 del PDF) */}
      {pestana === 'tutorias_posgrado' && (
        <div className="space-y-4">
          {/* Header y Métricas de Tutorías */}
          <div className="bg-gradient-to-r from-emerald-800 to-[#0c2d48] text-white p-6 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400 text-slate-950 uppercase tracking-wide">
                    Posgrado Oficial FCM 2027-1
                  </span>
                  <span className="text-xs text-emerald-200">
                    Maestría y Doctorado en Oceanografía Costera (MCOC / DCOC)
                  </span>
                </div>
                <h3 className="text-xl font-black tracking-tight">
                  Padrón de Tutorías Académicas I y II
                </h3>
                <p className="text-xs text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
                  Asignación oficial 1:1 de estudiantes con su tutor académico investigador para los comités tutoriales de posgrado.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <div className="bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/20">
                  <span className="text-emerald-300 block text-[10px] uppercase">Total Asignados</span>
                  <span className="text-lg font-black text-white">{TUTORIAS_ESTUDIANTES_INICIALES.length} Alumnos</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/20">
                  <span className="text-emerald-300 block text-[10px] uppercase">Grupo A (Lunes 7-9)</span>
                  <span className="text-lg font-black text-white">22 Alumnos</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/20">
                  <span className="text-emerald-300 block text-[10px] uppercase">Grupo B (Martes 7-9)</span>
                  <span className="text-lg font-black text-white">4 Alumnos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros de Búsqueda y Grupo */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por estudiante o tutor asignado..."
                value={busquedaTutoria}
                onChange={(e) => setBusquedaTutoria(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-500 font-semibold whitespace-nowrap">Grupo / Horario:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setFiltroGrupoTutoria('todos')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                    filtroGrupoTutoria === 'todos' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Todos
                </button>
                <button
                  type="button"
                  onClick={() => setFiltroGrupoTutoria('A')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                    filtroGrupoTutoria === 'A' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Grupo A (Lunes)
                </button>
                <button
                  type="button"
                  onClick={() => setFiltroGrupoTutoria('B')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                    filtroGrupoTutoria === 'B' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Grupo B (Martes)
                </button>
              </div>

              <select
                value={filtroNivelTutoria}
                onChange={(e) => setFiltroNivelTutoria(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value="todos">Todos los niveles</option>
                <option value="Tutoría Académica I">Tutoría Académica I</option>
                <option value="Tutoría Académica II">Tutoría Académica II</option>
              </select>
            </div>
          </div>

          {/* Cuadrícula de Tarjetas de Estudiantes y Tutores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TUTORIAS_ESTUDIANTES_INICIALES.filter((item) => {
              if (busquedaTutoria.trim()) {
                const q = busquedaTutoria.toLowerCase().trim();
                const matchEst = item.estudiante.toLowerCase().includes(q);
                const matchTut = item.tutor_nombre.toLowerCase().includes(q);
                if (!matchEst && !matchTut) return false;
              }
              if (filtroGrupoTutoria !== 'todos' && item.grupo !== filtroGrupoTutoria) return false;
              if (filtroNivelTutoria !== 'todos' && item.nivel !== filtroNivelTutoria) return false;
              return true;
            }).map((item, idx) => {
              const tutorDocente = docentesMap.get(item.tutor_id);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Grupo y Nivel */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Grupo {item.grupo} · {item.dia}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {item.nivel}
                      </span>
                    </div>

                    {/* Estudiante */}
                    <div className="mb-3">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">
                        Estudiante de Posgrado:
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.estudiante}
                      </h4>
                    </div>

                    {/* Tutor Asignado */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1 text-xs">
                      <span className="text-[10px] text-emerald-800 font-bold uppercase block tracking-wider flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                        Tutor Académico Asignado:
                      </span>
                      <p className="font-bold text-slate-900">{tutorDocente?.nombre || item.tutor_nombre}</p>
                      {tutorDocente?.cubiculo && (
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{tutorDocente.cubiculo}</span>
                        </p>
                      )}
                      {tutorDocente?.email && (
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="font-medium text-slate-700">{tutorDocente.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.dia}</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                      Modalidad Virtual
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal para Publicar Nuevo Aviso */}
      {mostrarModalAviso && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" />
              <span>Publicar Aviso para Grupos de Estudiantes</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              La notificación será visible para todos los alumnos en este portal.
            </p>

            <form onSubmit={handleCrearAviso} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título del aviso:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Material requerido para práctica 1 de Bioquímica..."
                  value={nuevoTitulo}
                  onChange={(e) => setNuevoTitulo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Materia vinculada:</label>
                  <select
                    value={nuevoCursoId}
                    onChange={(e) => setNuevoCursoId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                  >
                    <option value="">Aviso institucional general</option>
                    {cursos.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.codigo} · {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de aviso:</label>
                  <select
                    value={nuevoTipo}
                    onChange={(e) => setNuevoTipo(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                  >
                    <option value="aviso_general">Aviso General</option>
                    <option value="material_laboratorio">Material de Laboratorio / Bata</option>
                    <option value="tutorias">Horario de Asesoría / Tutorías</option>
                    <option value="cambio_aula">Reubicación de Aula</option>
                    <option value="examen">Examen o Evaluación</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Prioridad:</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="prioridad"
                      checked={nuevaPrioridad === 'normal'}
                      onChange={() => setNuevaPrioridad('normal')}
                    />
                    <span>Normal</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="prioridad"
                      checked={nuevaPrioridad === 'importante'}
                      onChange={() => setNuevaPrioridad('importante')}
                    />
                    <span className="text-amber-700 font-semibold">Importante</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="prioridad"
                      checked={nuevaPrioridad === 'urgente'}
                      onChange={() => setNuevaPrioridad('urgente')}
                    />
                    <span className="text-red-700 font-bold">Urgente</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mensaje para los alumnos:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Escriba las indicaciones detalladas, requisitos, enlaces o recordatorios..."
                  value={nuevoContenido}
                  onChange={(e) => setNuevoContenido(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setMostrarModalAviso(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition"
                >
                  Publicar en el Tablón
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
