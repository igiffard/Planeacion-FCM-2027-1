# Planeación Académica FCM 2027-1
### Facultad de Ciencias Marinas · Universidad Autónoma de Baja California (UABC)
**Campus Sauzal / Ensenada, B.C.**

---

## 1. Descripción General

**Planeación Académica FCM 2027-1** es una plataforma web integral, moderna y colaborativa desarrollada para la Facultad de Ciencias Marinas (FCM) de la UABC y en articulación con el Instituto de Investigaciones Oceanológicas (IIO).

Permite recopilar preferencias y restricciones docentes, así como planear, revisar, modificar, homologar, auditar traslapes y publicar los horarios integrados de **Licenciatura y Posgrado** para el ciclo 2027-1 dentro de un único modelo de datos unificado.

---

## 2. Programas Educativos Atendidos (2027-1)

Todos los cursos, grupos y asignaciones conviven en una base de datos centralizada sin silos entre niveles:

### Licenciatura:
* **TC-CMA:** Tronco Común de Ciencias del Mar y Ambientales (1.er y 2.º semestre)
* **LBA:** Licenciatura en Biotecnología en Acuacultura
* **LCA:** Licenciatura en Ciencias Ambientales
* **OCE:** Oceanología

### Posgrado (FCM / IIO):
* **EGA:** Especialidad en Gestión Ambiental
* **MOC:** Maestría en Oceanografía Costera
* **DOC:** Doctorado en Oceanografía Costera

---

## 3. Catálogo Físico de Espacios FCM e IIO (22+ Espacios Oficiales)

* **Salones Regulares de Docencia FCM:** S1, S2, S3, S5, S6, S7, S8 (capacidades de 40 a 45 estudiantes).
* **Aulas Magnas:** Aula Magna I (AM1, 80 estudiantes) y Aula Magna II (AM2, 40 estudiantes).
* **Laboratorios Especializados de Acuacultura y Ciencias Marinas:**
  * Laboratorio de Nutrición (NUT)
  * Laboratorio de Peces (PEC)
  * Laboratorio de Macroalgas IIO (MAL)
  * Laboratorio de Moluscos IIO (MOL)
  * Laboratorio de Cultivos de Apoyo (LCA)
* **Laboratorios Químicos y Experimentales:** Fisicoquímica, Química Orgánica, Bromatología.
* **Espacios de Posgrado y Cómputo:** Salón Posgrado 1 (SP1), Salón Posgrado 2 (SP2), Audiovisual IIO, Aula de Geomática y Salón de Especialidad.

---

## 4. Módulos y Arquitectura del Sistema

1. **Panel Resumen (Dashboard Institucional):**
   * Métricas en tiempo real de ocupación de espacios, horas asignadas, grupos y desglose Licenciatura vs. Posgrado.
   * Indicador reactivo de conflictos críticos y advertencias.
   * Acceso rápido a inicialización de catálogo oficial y nueva asignación.

2. **Planeación y Retícula Semanal (Horarios):**
   * Retícula interactiva de Lunes a Sábado (07:00 a 21:00).
   * Filtros por programa educativo, nivel, día y espacio.
   * Motor de sugerencia inteligente de aulas disponibles con capacidad óptima.
   * Soporte para desdoble de grupos en subgrupos de laboratorio (L1, L2).

3. **Matriz de Espacios y Ocupación Horaria:**
   * Vista matricial de todos los espacios FCM e IIO frente a bloques horarios.
   * Detección visual de franjas libres y ocupadas.
   * Información de equipos y capacidad por espacio.

4. **Agenda y Carga Docente:**
   * Vista individual por profesor con cálculo automático de horas semanales frente a grupo.
   * Visualización de restricciones y días bloqueados por encuestas o salidas de campo.
   * Exportación instantánea del horario del profesor en PDF.

5. **Homologación de Catálogos y Normalización:**
   * Implementación de la función central `normalizarTexto`: convierte a minúsculas, elimina acentos/diacríticos, colapsa espacios en blanco y expande abreviaturas como `lab.` $\to$ `laboratorio`, `sal.` $\to$ `salon`.
   * Probador en vivo del algoritmo de normalización.
   * Registro y administración de alias y equivalencias históricas.
   * Detector de posibles cursos duplicados por coeficiente de similitud de cadenas.

6. **Portal Docente y Encuesta de Disponibilidad:**
   * Registro de materias de interés con nivel de prioridad.
   * Bloqueo de días no disponibles y franjas horarias específicas (justificadas por comisiones o cruceros oceanográficos).
   * Clasificación de restricciones: *Preferencia General*, *Restricción Importante*, o *No Negociable*.

7. **Auditoría y Diagnóstico de Conflictos:**
   * Detección algorítmica de traslapes de aula (dos clases simultáneas en el mismo espacio).
   * Detección de traslapes de profesor (un docente con clases simultáneas en cualquier nivel).
   * Diagnóstico de sobrecupo (alumnos programados > capacidad del aula).
   * Alertas de incompatibilidad con restricciones declaradas por docentes.

8. **Exportación e Importación:**
   * **CSV con BOM UTF-8** para apertura inmediata en Microsoft Excel en español con caracteres acentuados preservados.
   * **PDF Institucional** con diseño sobrio UABC/FCM (Azul Marino Profundo `#0f2d4a` y Dorado `#d97706`), tablas legibles y membrete oficial.
   * **Importación Masiva de CSV** con previsualización, validación y detección previa de inconsistencias.

---

## 5. Modelo de Datos y Concurrencia (Firebase Spark)

* **Firestore:** Almacenamiento NoSQL estructurado en colecciones: `periodos`, `espacios`, `programas_educativos`, `cursos`, `grupos`, `componentes_grupo`, `subgrupos`, `asignaciones`, `preferencias_docentes`, `usuarios` y `catalogos/equivalencias_espacios`.
* **Transacciones Atómicas (`runTransaction`):** Garantizan exclusividad horaria de espacios y profesores sin condiciones de carrera, funcionando al 100% dentro del plan Spark (sin requerir Cloud Functions pagadas).
* **Reglas de Seguridad (`firestore.rules`):** Control de acceso basado en roles (`admin`, `coordinador`, `profesor`).

---

## 6. Identidad Visual Institucional

* **Colores UABC / Ciencias Marinas:**
  * Azul Marino Profundo institucional: `#0f2d4a`
  * Azul Cielo / Océano: `#0284c7`
  * Turquesa Marino: `#0d9488`
  * Dorado UABC: `#d97706`
  * Esmeralda Posgrado: `#059669`
* **Tipografía:** Plus Jakarta Sans con pesos balanceados y jerarquía visual estricta.
