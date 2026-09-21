const fs = require('fs');
const path = require('path');

const espaciosMapData = [
  // E-13
  { codigo: 'BUC', nombre: 'Almacén de Buceo', edificio: 'Edificio 13', edificio_codigo: 'E-13', planta: 'Planta Baja', tipo: 'espacio_apoyo', cat: 'espacios_apoyo', cap: 15, doc: false },
  { codigo: 'ALM', nombre: 'Almacén General de la FCM', edificio: 'Edificio 13', edificio_codigo: 'E-13', planta: 'Planta Baja', tipo: 'espacio_apoyo', cat: 'espacios_apoyo', cap: 10, doc: false },

  // E-14 Dirección FCM
  { codigo: 'SC', nombre: 'Sala de Consejo', edificio: 'Edificio 14 (Dirección FCM)', edificio_codigo: 'E-14', planta: 'Planta Baja', tipo: 'audiovisual', cat: 'audiovisuales_auditorios', cap: 25, doc: true },
  { codigo: 'SA', nombre: 'Salón de Asesorías', edificio: 'Edificio 14 (Dirección FCM)', edificio_codigo: 'E-14', planta: 'Planta Baja', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 15, doc: true },
  { codigo: 'CPB', nombre: 'Centro de Cómputo de Posgrado, Sala B', edificio: 'Edificio 14 (Dirección FCM)', edificio_codigo: 'E-14', planta: 'Planta Baja', tipo: 'aula_computo', cat: 'centros_computo', cap: 25, doc: true },
  { codigo: 'CCL', nombre: 'Centro de cómputo de licenciatura', edificio: 'Edificio 14 (Dirección FCM)', edificio_codigo: 'E-14', planta: 'Planta Baja', tipo: 'aula_computo', cat: 'centros_computo', cap: 40, doc: true },
  { codigo: 'SPD', nombre: 'Sala de Procesamiento de Datos Oceanográficos', edificio: 'Edificio 14 (Dirección FCM)', edificio_codigo: 'E-14', planta: 'Planta Baja', tipo: 'aula_computo', cat: 'centros_computo', cap: 20, doc: true },

  // E-15
  // Planta Baja
  { codigo: 'LZ', nombre: 'Laboratorio de Zoología', edificio: 'Edificio 15', edificio_codigo: 'E-15', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },
  { codigo: 'LOB', nombre: 'Laboratorio de Oceanografía Biológica', edificio: 'Edificio 15', edificio_codigo: 'E-15', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },
  { codigo: 'LMB', nombre: 'Laboratorio de Microbiología', edificio: 'Edificio 15', edificio_codigo: 'E-15', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },
  // Planta Alta
  { codigo: 'LQO', nombre: 'Laboratorio de Química Orgánica', edificio: 'Edificio 15', edificio_codigo: 'E-15', planta: 'Planta Alta', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },
  { codigo: 'LBQ', nombre: 'Laboratorio de Bioquímica', edificio: 'Edificio 15', edificio_codigo: 'E-15', planta: 'Planta Alta', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },

  // E-16
  // Planta Baja
  { codigo: 'SFE', nombre: 'Sala de Física Experimental', edificio: 'Edificio 16', edificio_codigo: 'E-16', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 30, doc: true },
  { codigo: 'SFF', nombre: 'Sala de Física de Fluidos', edificio: 'Edificio 16', edificio_codigo: 'E-16', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },
  { codigo: 'LFQ', nombre: 'Laboratorio de Fisicoquímica', edificio: 'Edificio 16', edificio_codigo: 'E-16', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },
  { codigo: 'LPA', nombre: 'Lab. de Procesamiento de Productos Acuáticos', edificio: 'Edificio 16', edificio_codigo: 'E-16', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  // Planta Alta
  { codigo: 'LT', nombre: 'Laboratorio de Tamices', edificio: 'Edificio 16', edificio_codigo: 'E-16', planta: 'Planta Alta', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'LOS', nombre: 'Laboratorio de Oc. Geológica/Sedimentología', edificio: 'Edificio 16', edificio_codigo: 'E-16', planta: 'Planta Alta', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },
  { codigo: 'SGP', nombre: 'Sala de Geología y Procesos Costeros', edificio: 'Edificio 16', edificio_codigo: 'E-16', planta: 'Planta Alta', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },

  // E-17
  // Planta Baja
  { codigo: 'SFL', nombre: 'Sala de Fluidos', edificio: 'Edificio 17', edificio_codigo: 'E-17', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },
  { codigo: 'SB', nombre: 'Sala de Biología', edificio: 'Edificio 17', edificio_codigo: 'E-17', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 30, doc: true },
  { codigo: 'LG', nombre: 'Laboratorio de Genética', edificio: 'Edificio 17', edificio_codigo: 'E-17', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'NUT', nombre: 'Laboratorio de Nutrición', edificio: 'Edificio 17', edificio_codigo: 'E-17', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  // Planta Alta
  { codigo: 'S8', nombre: 'Salón 8', edificio: 'Edificio 17', edificio_codigo: 'E-17', planta: 'Planta Alta', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 45, doc: true },
  { codigo: 'AM1', nombre: 'Aula Magna I', edificio: 'Edificio 17', edificio_codigo: 'E-17', planta: 'Planta Alta', tipo: 'auditorio', cat: 'audiovisuales_auditorios', cap: 70, doc: true },
  { codigo: 'AM2', nombre: 'Aula Magna II', edificio: 'Edificio 17', edificio_codigo: 'E-17', planta: 'Planta Alta', tipo: 'auditorio', cat: 'audiovisuales_auditorios', cap: 70, doc: true },

  // E-18
  // Planta Baja
  { codigo: 'S1', nombre: 'Salón 1', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Baja', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 45, doc: true },
  { codigo: 'S2', nombre: 'Salón 2', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Baja', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 45, doc: true },
  { codigo: 'S3', nombre: 'Salón 3', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Baja', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 45, doc: true },
  { codigo: 'SG', nombre: 'Sala de Geología', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Baja', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 35, doc: true },
  { codigo: 'LTA', nombre: 'Laboratorio de Tópicos de Acuacultura', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  // Planta Alta
  { codigo: 'S5', nombre: 'Salón 5', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Alta', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 45, doc: true },
  { codigo: 'S6', nombre: 'Salón 6', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Alta', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 45, doc: true },
  { codigo: 'S7', nombre: 'Salón 7', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Alta', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 45, doc: true },
  { codigo: 'LT2', nombre: 'Laboratorio de Tamices II', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Planta Alta', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  // Parte Posterior
  { codigo: 'ECO', nombre: 'Taller de Ecotecnias', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Parte Posterior', tipo: 'taller', cat: 'talleres_practicas', cap: 25, doc: true },
  { codigo: 'REU', nombre: 'Taller de Reutilización', edificio: 'Edificio 18', edificio_codigo: 'E-18', planta: 'Parte Posterior', tipo: 'taller', cat: 'talleres_practicas', cap: 25, doc: true },

  // E-20
  // Planta Baja
  { codigo: 'LMO', nombre: 'Laboratorio de Moluscos', edificio: 'Edificio 20', edificio_codigo: 'E-20', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  // Planta Alta
  { codigo: 'LTO', nombre: 'Laboratorio de Totoaba', edificio: 'Edificio 20', edificio_codigo: 'E-20', planta: 'Planta Alta', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },

  // E-21
  // Planta Baja
  { codigo: 'ESP', nombre: 'Salón de Especialidad', edificio: 'Edificio 21', edificio_codigo: 'E-21', planta: 'Planta Baja', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 30, doc: true },
  { codigo: 'PT', nombre: 'Prácticas de Topografía', edificio: 'Edificio 21', edificio_codigo: 'E-21', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'talleres_practicas', cap: 25, doc: true },
  // Planta Alta
  { codigo: 'GEO', nombre: 'Salón de Geomática', edificio: 'Edificio 21', edificio_codigo: 'E-21', planta: 'Planta Alta', tipo: 'aula_computo', cat: 'centros_computo', cap: 30, doc: true },

  // E-41
  { codigo: 'LCA', nombre: 'Lab. de Cultivos de Apoyo', edificio: 'Edificio 41', edificio_codigo: 'E-41', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'LEO', nombre: 'Laboratorio de Especies Ornamentales', edificio: 'Edificio 41', edificio_codigo: 'E-41', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'CRU', nombre: 'Laboratorio de Crustáceos', edificio: 'Edificio 41', edificio_codigo: 'E-41', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'SIS', nombre: 'Laboratorio de Sistemas', edificio: 'Edificio 41', edificio_codigo: 'E-41', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'FIS', nombre: 'Laboratorio de Fisiología', edificio: 'Edificio 41', edificio_codigo: 'E-41', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },

  // E-56
  { codigo: 'TOA', nombre: 'Salón Totoaba A', edificio: 'Edificio 56', edificio_codigo: 'E-56', planta: 'Planta Baja', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 35, doc: true },
  { codigo: 'TOB', nombre: 'Salón Totoaba B', edificio: 'Edificio 56', edificio_codigo: 'E-56', planta: 'Planta Baja', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 35, doc: true },
  { codigo: 'PEC', nombre: 'Laboratorio de Peces', edificio: 'Edificio 56', edificio_codigo: 'E-56', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 25, doc: true },

  // E-25 Instituto de Investigaciones Oceanológicas
  { codigo: 'AVI', nombre: 'Audiovisual IIO', edificio: 'Instituto de Investigaciones Oceanológicas (E-25)', edificio_codigo: 'E-25', planta: 'Planta Baja', tipo: 'audiovisual', cat: 'audiovisuales_auditorios', cap: 45, doc: true },
  { codigo: 'MAL', nombre: 'Laboratorio de Macroalgas', edificio: 'Instituto de Investigaciones Oceanológicas (E-25)', edificio_codigo: 'E-25', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'MOL', nombre: 'Laboratorio de Moluscos', edificio: 'Instituto de Investigaciones Oceanológicas (E-25)', edificio_codigo: 'E-25', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'CAI', nombre: 'Laboratorio de Cultivos de Apoyo', edificio: 'Instituto de Investigaciones Oceanológicas (E-25)', edificio_codigo: 'E-25', planta: 'Planta Baja', tipo: 'laboratorio', cat: 'laboratorios_especializados', cap: 20, doc: true },
  { codigo: 'SP1', nombre: 'Salón de Posgrado 1', edificio: 'Instituto de Investigaciones Oceanológicas (E-25)', edificio_codigo: 'E-25', planta: 'Planta Alta', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 25, doc: true },
  { codigo: 'SP2', nombre: 'Salón de Posgrado 2', edificio: 'Instituto de Investigaciones Oceanológicas (E-25)', edificio_codigo: 'E-25', planta: 'Planta Alta', tipo: 'aula', cat: 'aulas_salones_teoricos', cap: 25, doc: true },

  // Instalaciones de apoyo y áreas generales en el mapa
  { codigo: 'GIM', nombre: 'Gimnasio', edificio: 'Gimnasio FCM', edificio_codigo: 'Gimnasio', planta: 'General', tipo: 'espacio_apoyo', cat: 'espacios_apoyo', cap: 80, doc: true },
  { codigo: 'CAF', nombre: 'Cafetería', edificio: 'Cafetería FCM', edificio_codigo: 'Cafetería', planta: 'General', tipo: 'espacio_apoyo', cat: 'espacios_apoyo', cap: 60, doc: false },
  { codigo: 'SMU', nombre: 'Sala de usos múltiples', edificio: 'Sala de usos múltiples', edificio_codigo: 'Sala de usos múltiples', planta: 'General', tipo: 'audiovisual', cat: 'audiovisuales_auditorios', cap: 50, doc: true },

  // Modalidad virtual
  { codigo: 'VIR', nombre: 'Modalidad Virtual', edificio: 'Virtual', edificio_codigo: 'VIR', planta: 'General', tipo: 'virtual', cat: 'modalidad_virtual', cap: 100, doc: true }
];

const filePath = path.join(__dirname, '../src/data/espacios_iniciales_2027_1.json');
const currentEspacios = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const mapByCodigo = new Map();
espaciosMapData.forEach(item => mapByCodigo.set(item.codigo.toUpperCase(), item));

const updatedList = [];
const seenCodigos = new Set();

// 1. Process and format all official map spaces
espaciosMapData.forEach(m => {
  const existing = currentEspacios.find(e => e.codigo?.toUpperCase() === m.codigo.toUpperCase() || e.id === `espacio_${m.codigo}`);
  seenCodigos.add(m.codigo.toUpperCase());

  const espacioObj = {
    id: existing ? existing.id : `espacio_${m.codigo}`,
    codigo: m.codigo,
    codigo_normalizado: m.codigo.toLowerCase(),
    nombre: m.nombre,
    nombre_normalizado: m.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
    alias: m.codigo,
    aliases_normalizados: [m.codigo.toLowerCase(), m.nombre.toLowerCase()],
    categoria: m.cat,
    tipo_espacio: m.tipo,
    edificio: m.edificio,
    edificio_codigo: m.edificio_codigo,
    ubicacion: `${m.edificio} - ${m.planta}`,
    planta: m.planta,
    capacidad_original: m.cap,
    capacidad_maxima: m.cap,
    capacidad_operativa_por_periodo: { '2027-1': m.cap },
    equipos: existing?.equipos || ['proyector', 'pantalla', 'pizarron'],
    caracteristicas: existing?.caracteristicas || ['aire_acondicionado'],
    niveles_educativos_permitidos: ['licenciatura', 'posgrado'],
    programas_preferentes_ids: ['TC-CMA', 'LBA', 'LCA', 'OCE', 'MOC', 'DOC'],
    disponible: true,
    disponible_periodos: ['2027-1'],
    activo: true,
    apto_para_docencia: m.doc,
    es_modalidad_virtual: m.codigo === 'VIR',
    oficial_mapa: true,
    estado_catalogo: 'oficial_mapa'
  };
  updatedList.push(espacioObj);
});

// 2. Mark remaining spaces that are NOT on the official map as "pendiente_revision_subdireccion"
currentEspacios.forEach(e => {
  const code = e.codigo?.toUpperCase();
  if (!seenCodigos.has(code)) {
    seenCodigos.add(code);
    updatedList.push({
      ...e,
      oficial_mapa: false,
      duda_homologacion: true,
      estado_catalogo: 'pendiente_revision_subdireccion',
      motivo_duda: 'Espacio no figura en la lámina oficial de Aulas/Laboratorios FCM (Mapa 4K). Pasa a Homologación de Catálogo para revisión de Subdirección.',
      disponible_periodos: ['2027-1'],
      capacidad_operativa_por_periodo: { '2027-1': e.capacidad_maxima || 30 }
    });
  }
});

fs.writeFileSync(filePath, JSON.stringify(updatedList, null, 2), 'utf8');
console.log(`Updated successfully. Total spaces: ${updatedList.length}. Official on map: ${espaciosMapData.length}. Sent to Subdirection review: ${updatedList.length - espaciosMapData.length}.`);
