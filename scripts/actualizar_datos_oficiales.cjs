const fs = require('fs');
const path = require('path');

// 1. Cargar la lista completa de los 171 profesores reales
const profesoresReales = JSON.parse(fs.readFileSync(path.join(__dirname, 'profesores_reales_fcm.json'), 'utf8'));

// 2. Cargar datos_oficiales_posgrado.cjs
const posgradoPath = path.join(__dirname, 'datos_oficiales_posgrado.cjs');
let posgradoContent = fs.readFileSync(posgradoPath, 'utf8');

// Reemplazar la definición de DOCENTES_OFICIALES con todos los 171 profesores
const regexDocentes = /const DOCENTES_OFICIALES = \[[\s\S]*?\n\];/;
const nuevaDefDocentes = `const DOCENTES_OFICIALES = ${JSON.stringify(profesoresReales, null, 2)};`;
posgradoContent = posgradoContent.replace(regexDocentes, nuevaDefDocentes);

// Correcciones de nombres en CURSOS_OFICIALES:
const reemplazosCursos = [
  { de: "'Dr. Benjamín Martín'", a: "'Dra. Beatriz Martín Atienza'" },
  { de: "'Dr. Braulio Juárez A.'", a: "'Dr. Braulio Juárez Araiza'" },
  { de: "'Dr. P. Alvarado, Dra. S. Tanahara, Dr. E. Olvera'", a: "'Dra. Patricia Alvarado Graef, Dra. Sarayda Aimé Tanahara Romero y Dr. Ricardo Bernardino Eaton González'" },
  { de: "['prof_palvarado', 'prof_stanahara', 'prof_eolvera']", a: "['prof_palvarado', 'prof_stanahara', 'prof_reaton']" },
  { de: "'Dr. Norberto Millán'", a: "'Dra. Natalie Millán Aguiñaga'" },
  { de: "'Dr. Víctor Fernández'", a: "'Dra. Violeta Zetzangari Fernández Díaz'" },
  { de: "'Dra. Ivone Giffard'", a: "'Dra. Ivone Giffard Mena'" },
  { de: "'Dr. José Miguel Sandoval'", a: "'Dr. José Miguel Sandoval Gil'" },
  { de: "'Dra. Lidia Enríquez'", a: "'Dr. Luis Manuel Enríquez Paredes'" },
  { de: "'Dr. T. Olivares y Dra. S. Castellanos'", a: "'Dra. Tatiana Nenetzen Olivares Bañuelos y Dra. Sheila Castellanos Martínez'" },
  { de: "'Dr. N. Gudiño'", a: "'Dr. Napoleón Gudiño Elizondo'" },
  { de: "'Dr. O. del Río y Dra. S. Castellanos'", a: "'Dr. Oscar Basilio del Río Zaragoza y Dra. Sheila Castellanos Martínez'" },
  { de: "'Dr. J.G. Correa y Dr. Fernando Barreto'", a: "'Dr. Juan Gabriel Correa Reyes y Dr. Fernando Barreto Curiel'" },
  { de: "'Dr. A. Castillo'", a: "'Dra. Alejandra de Jesús Castillo Ramírez'" },
  { de: "'Dr. L. Malpica'", a: "'Dr. Luis Malpica Cruz'" },
  { de: "'Dr. Mario Galaviz y Dr. Fernando Barreto'", a: "'Dr. Mario Galaviz Espinoza y Dr. Fernando Barreto Curiel'" },
  { de: "'Dr. A. Félix y Dr. Guillermo Samperio'", a: "'Dr. Armando Félix Bermúdez y Dr. Guillermo Alberto Samperio Ramos'" },
  { de: "'Dra. Abigail Uribe'", a: "'Dra. Alicia Guadalupe Uribe López'" },
  { de: "'Dra. Alicia Abadía'", a: "'Dra. Alicia Abadía Cardoso'" },
  { de: "'Dr. Juan Vaca'", a: "'Dr. Juan Guillermo Vaca Rodríguez'" },
  { de: "'Dra. Karina Lugo'", a: "'Dra. Karina del Carmen Lugo Ibarra'" },
  { de: "'Dr. Orión Norzagaray'", a: "'Dr. Carlos Orión Norzagaray López'" },
  { de: "'Dr. Oscar del Río'", a: "'Dr. Oscar Basilio del Río Zaragoza'" },
  { de: "'Dr. Rodrigo Beas'", a: "'Dr. Rodrigo Beas Luna'" },
  { de: "'Dr. José Alberto Zepeda'", a: "'Dr. José Alberto Zepeda Domínguez'" },
  { de: "'Dr. José Alberto Zepeda Dominguez'", a: "'Dr. José Alberto Zepeda Domínguez'" },
  { de: "'Dr. Mario Galaviz'", a: "'Dr. Mario Galaviz Espinoza'" },
  { de: "'Dra. Mary Carmen Ruíz'", a: "'Dra. Mary Carmen Ruíz de la Torre'" },
  { de: "'Dr. Fernando Barreto'", a: "'Dr. Fernando Barreto Curiel'" }
];

reemplazosCursos.forEach(({ de, a }) => {
  posgradoContent = posgradoContent.split(de).join(a);
});

fs.writeFileSync(posgradoPath, posgradoContent, 'utf8');
console.log('datos_oficiales_posgrado.cjs actualizado exitosamente.');
