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

---

## 7. Ejecución Local y Pruebas

Para clonar y correr la plataforma en tu computadora o servidor:

1. **Requisitos:** Node.js v18+ o v20+ y npm.
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Genera la carpeta `dist/` optimizada para despliegue estático o servidor.

---

## 8. Despliegue Automático en GitHub (GitHub Pages)

El proyecto incluye el flujo oficial de GitHub Actions configurado en `.github/workflows/main.yml`.

### Pasos para subir el código a GitHub (Push inicial):
Si vas a publicar este proyecto en un repositorio nuevo de GitHub:

1. Crea un repositorio vacío en [GitHub](https://github.com/new) (por ejemplo: `planeacion-fcm-2027-1`).
2. En tu terminal ejecuta:
   ```bash
   git add .
   git commit -m "feat: plataforma de planeacion academica fcm 2027-1 completa"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
   git push -u origin main
   ```

### Pasos para activar el despliegue automático con GitHub Actions:
1. En GitHub, ve a la pestaña **Settings** (Configuración) de tu repositorio.
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment** (Compilación y despliegue):
   - En **Source**, cambia de *"Deploy from a branch"* a: **GitHub Actions**.
4. ¡Listo! En cuanto hagas `push`, la pestaña **Actions** compilará el proyecto con Vite y publicará la web automáticamente.
5. Tu sitio estará disponible en:
   `https://<tu-usuario>.github.io/<tu-repositorio>/`

---

## 9. Cómo Incrustar la Plataforma en Google Sites (Paso a Paso)

La aplicación está especialmente optimizada para funcionar dentro del entorno de **Google Sites** (compatible con iframes, sin bloqueos de cookies de terceros y con notificaciones flotantes integradas):

### Método Recomendado (Insertar Código HTML):
1. Abre tu sitio en el editor de **Google Sites**.
2. En el panel lateral derecho, ve a la pestaña **Insertar** (`Insert`).
3. Haz clic en el botón **Incorporar** o **Insertar** (`< > Embed`).
4. Selecciona la pestaña **Incorporar código** (`Embed code`).
5. Pega el siguiente bloque reemplazando tu URL de GitHub Pages:
   ```html
   <iframe 
     src="https://<tu-usuario>.github.io/<tu-repositorio>/" 
     width="100%" 
     height="950px" 
     style="border: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" 
     allowfullscreen
     loading="lazy">
   </iframe>
   ```
6. Haz clic en **Siguiente** y luego en **Insertar**.
7. En el lienzo de Google Sites, estira el contenedor hacia los laterales para que ocupe todo el ancho de la página.
8. Haz clic en el botón azul **Publicar** de Google Sites.

### Método Alternativo (Por URL directa):
1. En Google Sites, haz clic en **Insertar** -> **Incorporar**.
2. En la pestaña **Por URL**, pega la dirección directa:
   `https://<tu-usuario>.github.io/<tu-repositorio>/`
3. Selecciona **Página completa** y haz clic en **Insertar**.

---

## 10. Garantía de Compatibilidad y Código Limpio

* **Rutas Relativas (`base: './'`):** En `vite.config.ts`, todos los paquetes y activos se cargan de forma relativa, impidiendo errores de tipo 404 al alojarse en subcarpetas de GitHub Pages o dentro de iframes de Google Sites.
* **Cero llamadas a `window.alert()`:** Reemplazadas por avisos visuales seguros (Toasts y banners inline) que no son bloqueados por las políticas de seguridad de iframes en Google Sites.
* **HTTPS Nativo:** Cumple al 100% con los requisitos de conexión cifrada obligatoria de Google Sites.
* **Control de Calidad:** Verificado con `tsc --noEmit` y `npm run build` con cero advertencias bloqueantes.

