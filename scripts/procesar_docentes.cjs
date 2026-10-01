const fs = require('fs');
const path = require('path');

// 1. Lista de nombres crudos proporcionados por el usuario
const RAW_PROFESORES = [
  'Enriquez Andrade Roberto Ramón',
  'True Conal David',
  'Arredondo Garcia María Concepción',
  'Villegas Vicencio Luis Javier',
  'Wagner Gutierrez Juan Manuel',
  'Schramm Urrutia Yolanda',
  'Vaca Rodriguez Juan Guillermo',
  'López Acuña Lus Mercedes',
  'Alvarado Graef Patricia',
  'Spelz Madero Ronald Michael',
  'García Gastelum Alejandro',
  'Martín Atienza Beatriz',
  'Gonzalez Silvera Adriana',
  'Sandoval Garibaldi Gerardo',
  'Enriquez Paredes Luis Manuel',
  'Eaton Gonzalez Ricardo Bernardino',
  'Seingier Georges',
  'Giffard Mena Ivone',
  'Torres Beltran Monica',
  'Rivera Huerta Hiram',
  'Tanahara Romero Sarayda Aimé',
  'Morales Chavez Rafael',
  'Cardoza Contreras Marlene Nohemi',
  'Velazquez Gonzalez Ernestina Karen',
  'Fernandez Diaz Violeta Zetzangari',
  'Galaviz Espinoza Mario',
  'Reyes Orta Marisa',
  'Lugo Ibarra Karina del Carmen',
  'Jara Montañez Rosario',
  'Ruíz de la Torre Mary Carmen',
  'Sanchez Nava Amara Thayde',
  'Flores Morales Ana Laura',
  'Beas Luna Rodrigo',
  'Abadia Cardoso Alicia',
  'Vivanco Aranda Miroslava',
  'Evangelista Hernandez Viridiana',
  'Barreto Curiel Fernando',
  'Herrera Gutierrez Angel Raul',
  'Yarbuh Lugo Usama Ismael',
  'Millan Aguiñaga Natalie',
  'Villegas Mendoza Josue Rodolfo',
  'Lopez Calderon Jorge Manuel',
  'Mejia Piña Karla Gabriela',
  'Santiago Garcia Mauro Wilfrido',
  'Zepeda Dominguez Jose Alberto',
  'Lubinsky Jinich Monica',
  'Lopez Castillejos Julio',
  'Arenas Islas Diana',
  'Dominguez Perez Carlos Alejandro',
  'Romero Arteaga Angélica María',
  'Correa Perez Juan Gabriel',
  'Castillo Ramírez Alejandra de Jesús',
  'Villasuso Palomares Salvador',
  'Gomez Hernández Guadalupe',
  'Saenz-Avalos Mariana Ana Laura',
  'Jennyfers Chong Robles',
  'Gustavo Alexis Cardenas Lopez',
  'Victor Manuel Lomeli Quintero',
  'Astrid Hernandez Cruz',
  'POULETTE CAROLINA ALVAREZ ROSALES',
  'EULALIO ARAMBUL MUÑOZ',
  'ANDRE LUIZ BRAGA DE SOUZA',
  'VICTOR FROYLAN CAMACHO IBAR',
  'SHEILA CASTELLANOS MARTINEZ',
  'GABRIELA YARELI CERVANTES DIAZ',
  'JUAN GABRIEL CORREA REYES',
  'RICARDO CRUZ LOPEZ',
  'EDUARDO AMIR CUEVAS FLORES',
  'LUIS WALTER DAESSLE HEUSER',
  'OSCAR BASILIO DEL RIO ZARAGOZA',
  'FRANCISCO DELGADILLO HINOJOSA',
  'ARMANDO FELIX BERMUDEZ',
  'ALEJANDRA FERREIRA ARRIETA',
  'HECTOR GARCIA NAVA',
  'NAPOLEON GUDIÑO ELIZONDO',
  'RICARDO AARON GUTIERREZ',
  'JOSE MANUEL GUZMAN CALDERON',
  'RAMIRO HERNANDEZ GARCIA',
  'FELIX AUGUSTO HERNANDEZ GUZMAN',
  'BRAULIO JUAREZ ARAIZA',
  'JESSICA ABETH LAGOS FREGOSO',
  'CRISTINA LANDA CANSIGNO',
  'JUANA CLAUDIA LEYVA AGUILERA',
  'LAURA LILIANA LOPEZ GALINDO',
  'VICTOR ALFONSO MACIAS CARRANZA',
  'LUIS MALPICA CRUZ',
  'LEOPOLDO GUILLERMO MENDOZA ESPINOSA',
  'CARLOS ORION NORZAGARAY LOPEZ',
  'TATIANA NENETZEN OLIVARES BAÑUELOS',
  'ALEXANDRO OROZCO DURAN',
  'EMYR SAUL PEÑA MARIN',
  'CRISTINA QUEZADA HERNANDEZ',
  'NANCY RAMIREZ ALVAREZ',
  'MAURICIO MOISES REYES BRAVO',
  'ISAAC RODRIGUEZ PADILLA',
  'MARIANA SANCHEZ BARREDO',
  'HILDA JANET SANCHEZ SANCHEZ',
  'JOSE MIGUEL SANDOVAL GIL',
  'HORTENCIA SILVA JIMENEZ',
  'MARIA DANIELA TAZZO RANGEL',
  'EUNISE VANESSA TORRES DELGADO',
  'CHRISTINA VERONICA TREINEN CRESPO',
  'JACOB ALBERTO VALDIVIESO OJEDA',
  'JOSE AUGUSTO VALENCIA GASTI',
  'ENRIQUE VALENZUELA WOOD',
  'JORGE ARMANDO VELASQUEZ ARISTIZABAL',
  'MARIA TERESA VIANA CASTRILLON',
  'MARIANA VILLADA CANELA',
  'AMAIA RUIZ DE ALEGRIA ARZABURU',
  'OMAR EZEQUIEL AGUILLON HERNANDEZ',
  'NANCY ALARCON GERALDO',
  'LUCY CORAL ALARCON ORTEGA',
  'DANTENOC ALVAREZ MILLAN',
  'OSMAR ROBERTO ARAUJO LEYVA',
  'JOSE PEDRO ARCE SERRANO',
  'GABRIELA DE JESUS ARREGUIN RODRIGUEZ',
  'BRENDA GUADALUPE BONETT CALZADA',
  'KARLA ROXANA CERVANTES FLORES',
  'LUZ DE LOURDES AURORA CORONADO ALVAREZ',
  'GABRIELA DE LA PEÑA NETTEL',
  'MARIANA DELGADO FERNANDEZ',
  'GUADALUPE DIAZ GUTIERREZ',
  'DANIEL ALBERTO DIAZ GUZMAN',
  'JUAN CARLOS DOMINGUEZ VARGAS',
  'ARTURO FAJARDO YAMAMOTO',
  'ROBERTO ANTONIO FLORES AGUILAR',
  'BRISA MARISOL FLORES MIRANDA',
  'BERTHA GARCIA CAPITANACHI',
  'ALMA DELIA GILES GUZMAN',
  'ELIANA GOMEZ OCAMPO',
  'ABRAHAM GONZALEZ MENA',
  'LIZZ GONZALEZ MORENO',
  'LUIS ANDRES GUERRERO MURCIA',
  'DULCE GUADALUPE GUILLEN MATUS',
  'CLARA MARIA HEREU',
  'CARLOS EMILIO HERNANDEZ RODRIGUEZ',
  'AGUSTIN JAIME GARCILAZO',
  'CONIE JARA MONTAÑEZ',
  'OSCAR ALBERTO JIMENEZ OROCIO',
  'TADASHI KONO MARTINEZ',
  'ERNESTO LARIOS SORIANO',
  'LORENA PATRICIA LINACRE ROJAS',
  'DENISE LUBINSKY JINICH',
  'EVNIKA ZARINA MEDINA ROMO',
  'REBECA MORENO SANTOYO',
  'ESTRELLA AZALIA NUÑEZ ZARCO',
  'NORMA LIDIA OLIVA MENDEZ',
  'CARLOS FRANCISCO PEYNADOR SANCHEZ',
  'GABRIEL RENDON MARQUEZ',
  'NATALIA ALEJANDRA RODRIGUEZ REVELO',
  'JOSE ERNESTO SAMPEDRO AVILA',
  'JOSE LUIS SANCHEZ OSORIO',
  'EDUARDO SANTIAGO OJEDA',
  'MARISOL TORRES AGUILAR',
  'IDALY TREJO ESCAMILLA',
  'DORA ALEJANDRA TREJO RAMOS',
  'ALICIA GUADALUPE URIBE LOPEZ',
  'ALFREDO VENEGAS VEGA',
  'SAMANTHA VICTORIA COTA',
  'CLAUDIA MARIA WALL MEDRANO',
  'ANDREA YAZMIN ZAMORA QUINTERO',
  'Guillermo Alberto Samperio Ramos',
  'Puma Chávez Adriana',
  'Nayla Berenice Muñoz Euán',
  'Jeremie Louis Natan Bauer',
  'Arlette Marimar Pacheco Sandoval',
  'Emiliano Nelson Gorr',
  'Julio Enrique Martinez García',
  'ANDRADE SANCHEZ JORGE ALBERTO',
  'ALEJANDRO GONZALEZ ROJAS',
  'NORMA PATRICIA ESPRIUS SANCHES',
  'Mariana Sanchez Barredo'
];

// Nombres femeninos típicos para asignar Dra. / Mtra.
const NOMBRES_FEMENINOS = new Set([
  'maria', 'concepcion', 'yolanda', 'lus', 'patricia', 'beatriz', 'adriana', 'ivone',
  'monica', 'sarayda', 'aime', 'marlene', 'nohemi', 'ernestina', 'karen', 'violeta',
  'zetzangari', 'marisa', 'karina', 'rosario', 'mary', 'carmen', 'amara', 'thayde',
  'ana', 'laura', 'alicia', 'miroslava', 'viridiana', 'natalie', 'karla', 'gabriela',
  'diana', 'angelica', 'alejandra', 'guadalupe', 'mariana', 'jennyfers', 'astrid',
  'poulette', 'carolina', 'sheila', 'yareli', 'jessica', 'abeth', 'cristina', 'juana',
  'claudia', 'liliana', 'tatiana', 'nenetzen', 'nancy', 'hilda', 'janet', 'hortencia',
  'daniela', 'eunise', 'vanessa', 'christina', 'veronica', 'teresa', 'amaia', 'lucy',
  'coral', 'brenda', 'roxana', 'luz', 'lourdes', 'aurora', 'brisa', 'marisol', 'bertha',
  'alma', 'delia', 'eliana', 'lizz', 'dulce', 'clara', 'conie', 'lorena', 'denise',
  'evnika', 'zarina', 'rebeca', 'estrella', 'azalia', 'norma', 'lidia', 'natalia',
  'idaly', 'dora', 'samantha', 'victoria', 'andrea', 'yazmin', 'nayla', 'berenice',
  'arlette', 'marimar'
]);

// Normalizador
function normalizeKey(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
}

function toTitleCase(str) {
  const minor = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'en']);
  return str.toLowerCase().split(/\s+/).map((word, idx) => {
    if (idx > 0 && minor.has(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

// Determina si es femenino a partir de los nombres de pila
function esFemenino(nombreStr) {
  const tokens = nombreStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/);
  for (const t of tokens) {
    if (NOMBRES_FEMENINOS.has(t)) return true;
  }
  return false;
}

// Mapeos canónicos explícitos de los primeros 55 (Apellidos Nombres -> Nombres Apellidos con acentos)
const CANONICOS_BLOQUE_1 = {
  'enriquezandradorobertoramon': { nombre: 'Dr. Roberto Ramón Enríquez Andrade', titulo: 'Dr.', email: 'rrenriquez@uabc.edu.mx', area: 'Oceanografía Costera y Ecología' },
  'trueconaldavid': { nombre: 'Dr. Conal David True', titulo: 'Dr.', email: 'ctrue@uabc.edu.mx', area: 'Biotecnología y Cultivo de Peces Marinos (Totoaba)' },
  'arredondogarciamariaconcepcion': { nombre: 'Dra. María Concepción Arredondo García', titulo: 'Dra.', email: 'marredondo@uabc.edu.mx', area: 'Biología Marina y Fisiología' },
  'villegasvicencioluisjavier': { nombre: 'Dr. Luis Javier Villegas Vicencio', titulo: 'Dr.', email: 'lvillegas@uabc.edu.mx', area: 'Oceanografía Física e Instrumentación' },
  'wagnergutierrezjuanmanuel': { nombre: 'Dr. Juan Manuel Wagner Gutiérrez', titulo: 'Dr.', email: 'jwagner@uabc.edu.mx', area: 'Ecología Marina y Zooplancton' },
  'schrammurrutiayolanda': { nombre: 'Dra. Yolanda Schramm Urrutia', titulo: 'Dra.', email: 'yschramm@uabc.edu.mx', area: 'Mastozoología Marina y Mamíferos Marinos' },
  'vacarodriguezjuanguillermo': { nombre: 'Dr. Juan Guillermo Vaca Rodríguez', titulo: 'Dr.', email: 'jvaca@uabc.edu.mx', area: 'Pesquerías y Dinámica de Poblaciones' },
  'lopezacunalusmercedes': { nombre: 'Dra. Lus Mercedes López Acuña', titulo: 'Dra.', email: 'llopeza@uabc.edu.mx', area: 'Química Marina y Contaminación Acuática' },
  'alvaradograefpatricia': { nombre: 'Dra. Patricia Alvarado Graef', titulo: 'Dra.', email: 'palvarado@uabc.edu.mx', area: 'Modelación Numérica del Océano y Dinámica Geofísica' },
  'spelzmaderoronaldmichael': { nombre: 'Dr. Ronald Michael Spelz Madero', titulo: 'Dr.', email: 'rspelz@uabc.edu.mx', area: 'Geología Marina y Tectónica Costera' },
  'garciagastelumalejandro': { nombre: 'Dr. Alejandro García Gastélum', titulo: 'Dr.', email: 'agarcia@uabc.edu.mx', area: 'Físico-Química Marina y Procesos de Transporte' },
  'martinatienzabeatriz': { nombre: 'Dra. Beatriz Martín Atienza', titulo: 'Dra.', email: 'bmartin@uabc.edu.mx', area: 'Estadística Multivariada y Modelación Bioestadística' },
  'gonzalezsilveraadriana': { nombre: 'Dra. Adriana González Silvera', titulo: 'Dra.', email: 'agonzalez@uabc.edu.mx', area: 'Bio-óptica Marina y Percepción Remota' },
  'sandovalgaribaldigerardo': { nombre: 'Dr. Gerardo Sandoval Garibaldi', titulo: 'Dr.', email: 'gsandoval@uabc.edu.mx', area: 'Bioluminiscencia y Oceanografía Biológica' },
  'enriquezparedesluismanuel': { nombre: 'Dr. Luis Manuel Enríquez Paredes', titulo: 'Dr.', email: 'lenriquez@uabc.edu.mx', area: 'Ecología Molecular y Genética de Poblaciones' },
  'eatongonzalezricardobernardino': { nombre: 'Dr. Ricardo Bernardino Eaton González', titulo: 'Dr.', email: 'reaton@uabc.edu.mx', area: 'Oceanografía Física y Modelación Numérica' },
  'seingiergeorges': { nombre: 'Dr. Georges Seingier', titulo: 'Dr.', email: 'gseingier@uabc.edu.mx', area: 'Gestión Ambiental Costera y Ordenamiento Territorial' },
  'giffardmenaivone': { nombre: 'Dra. Ivone Giffard Mena', titulo: 'Dra.', email: 'igiffard@uabc.edu.mx', area: 'Subdirección FCM · Fisiología y Osmorregulación Acuática' },
  'torresbeltranmonica': { nombre: 'Dra. Mónica Torres Beltrán', titulo: 'Dra.', email: 'mtorres@uabc.edu.mx', area: 'Bioinformática, Microbiología Marina y Genómica' },
  'riverahuertahiram': { nombre: 'Dr. Hiram Rivera Huerta', titulo: 'Dr.', email: 'hrivera@uabc.edu.mx', area: 'Oceanografía Geológica y Sedimentología' },
  'tanaharoromerosaraydaaime': { nombre: 'Dra. Sarayda Aimé Tanahara Romero', titulo: 'Dra.', email: 'stanahara@uabc.edu.mx', area: 'Modelación Numérica del Océano y Dinámica de Vórtices' },
  'moraleschavezrafael': { nombre: 'Dr. Rafael Morales Chávez', titulo: 'Dr.', email: 'rmorales@uabc.edu.mx', area: 'Oceanografía Física Costera' },
  'cardozocontrerasmarlenenohemi': { nombre: 'Dra. Marlene Nohemí Cardoza Contreras', titulo: 'Dra.', email: 'mcardoza@uabc.edu.mx', area: 'Acuacultura Marina y Nutrición de Organismos' },
  'velazquezgonzalezernestinakaren': { nombre: 'Dra. Ernestina Karen Velázquez González', titulo: 'Dra.', email: 'kvelazquez@uabc.edu.mx', area: 'Biología y Fisiología Marina' },
  'fernandezdiazvioletazetzangari': { nombre: 'Dra. Violeta Zetzangari Fernández Díaz', titulo: 'Dra.', email: 'vfernandez@uabc.edu.mx', area: 'Oceanografía Biológica y Avances de Tesis' },
  'galavizespinozamario': { nombre: 'Dr. Mario Galaviz Espinoza', titulo: 'Dr.', email: 'mgalaviz@uabc.edu.mx', area: 'Bioquímica Nutricional Acuícola y Fisiología Digestiva' },
  'reyesortamarisa': { nombre: 'Dra. Marisa Reyes Orta', titulo: 'Dra.', email: 'mreyes@uabc.edu.mx', area: 'Oceanografía Química y Ciclos Biogeoquímicos' },
  'lugoibarrakarinadelcarmen': { nombre: 'Dra. Karina del Carmen Lugo Ibarra', titulo: 'Dra.', email: 'klugo@uabc.edu.mx', area: 'Microbiología Acuícola y Sanidad Marina' },
  'jaramontanezrosario': { nombre: 'Dra. Rosario Jara Montañez', titulo: 'Dra.', email: 'rjara@uabc.edu.mx', area: 'Educación Ambiental y Recursos Marinos' },
  'ruizdelatorremarycarmen': { nombre: 'Dra. Mary Carmen Ruíz de la Torre', titulo: 'Dra.', email: 'mruiz@uabc.edu.mx', area: 'Oceanografía Química y Percepción Remota' },
  'sancheznavaamarathayde': { nombre: 'Dra. Amara Thaydé Sánchez Nava', titulo: 'Dra.', email: 'asanchezn@uabc.edu.mx', area: 'Biología de la Conservación y Vertebrados Marinos' },
  'floresmoralesanalaura': { nombre: 'Dra. Ana Laura Flores Morales', titulo: 'Dra.', email: 'afloresm@uabc.edu.mx', area: 'Ecología Marina y Recursos Costeros' },
  'beaslunarodrigo': { nombre: 'Dr. Rodrigo Beas Luna', titulo: 'Dr.', email: 'rbeas@uabc.edu.mx', area: 'Ecología Marina, Comunidades Bentónicas y Bosques de Macroalgas' },
  'abadiacardosoalicia': { nombre: 'Dra. Alicia Abadía Cardoso', titulo: 'Dra.', email: 'aabadia@uabc.edu.mx', area: 'Genética Marina y Conservación de Recursos Acuáticos' },
  'vivancoarandamiroslava': { nombre: 'Dra. Miroslava Vivanco Aranda', titulo: 'Dra.', email: 'mvivanco@uabc.edu.mx', area: 'Biotecnología y Cultivo de Microalgas' },
  'evangelistahernandezviridiana': { nombre: 'Dra. Viridiana Evangelista Hernández', titulo: 'Dra.', email: 'vevangelista@uabc.edu.mx', area: 'Biología Marina y Ecosistemas Costeros' },
  'barretocurielfernando': { nombre: 'Dr. Fernando Barreto Curiel', titulo: 'Dr.', email: 'fbarreto@uabc.edu.mx', area: 'Sistemas Acuícolas y Bioquímica Nutricional' },
  'herreragutierrezangelraul': { nombre: 'Dr. Ángel Raúl Herrera Gutiérrez', titulo: 'Dr.', email: 'aherrera@uabc.edu.mx', area: 'Oceanografía Física e Hidrología Costera' },
  'yarbuhlugousamaismael': { nombre: 'Dr. Usama Ismael Yarbuh Lugo', titulo: 'Dr.', email: 'uyarbuh@uabc.edu.mx', area: 'Geología Marina y Geofísica Sísmica' },
  'millanaguinaganatalie': { nombre: 'Dra. Natalie Millán Aguiñaga', titulo: 'Dra.', email: 'nmillan@uabc.edu.mx', area: 'Biotecnología Marina y Seminarios de Posgrado' },
  'villegasmendozajosuerodolfo': { nombre: 'Dr. Josué Rodolfo Villegas Mendoza', titulo: 'Dr.', email: 'jvillegas@uabc.edu.mx', area: 'Química Ambiental Marina' },
  'lopezcalderonjorgemanuel': { nombre: 'Dr. Jorge Manuel López Calderón', titulo: 'Dr.', email: 'jlopezc@uabc.edu.mx', area: 'Ecología Marina y Recursos Bentónicos' },
  'mejiapinakarlagabriela': { nombre: 'Dra. Karla Gabriela Mejía Piña', titulo: 'Dra.', email: 'kmejia@uabc.edu.mx', area: 'Biotecnología Marina y Acuacultura' },
  'santiagogarciamaurowilfrido': { nombre: 'Dr. Mauro Wilfrido Santiago García', titulo: 'Dr.', email: 'msantiago@uabc.edu.mx', area: 'Oceanografía Biológica y Tutoría Académica' },
  'zepedadominguezjosealberto': { nombre: 'Dr. José Alberto Zepeda Domínguez', titulo: 'Dr.', email: 'jazepeda@uabc.edu.mx', area: 'Sistemas Socioecológicos y Manejo Pesquero Comunitario' },
  'lubinskyjinichmonica': { nombre: 'Dra. Mónica Lubinsky Jinich', titulo: 'Dra.', email: 'mlubinsky@uabc.edu.mx', area: 'Ciencias Ambientales y Conservación' },
  'lopezcastillejosjulio': { nombre: 'Dr. Julio López Castillejos', titulo: 'Dr.', email: 'jlopezcast@uabc.edu.mx', area: 'Oceanografía Geológica y Métodos Geofísicos' },
  'arenasislasdiana': { nombre: 'Dra. Diana Arenas Islas', titulo: 'Dra.', email: 'darenas@uabc.edu.mx', area: 'Microbiología y Biología Molecular' },
  'dominguezperezcarlosalejandro': { nombre: 'Dr. Carlos Alejandro Domínguez Pérez', titulo: 'Dr.', email: 'cdominguez@uabc.edu.mx', area: 'Oceanografía Física e Instrumentación Marina' },
  'romeroarteagaangelicamaria': { nombre: 'Dra. Angélica María Romero Arteaga', titulo: 'Dra.', email: 'aromero@uabc.edu.mx', area: 'Ciencias Ambientales y Educación Superior' },
  'correaperezjuangabriel': { nombre: 'Dr. Juan Gabriel Correa Pérez', titulo: 'Dr.', email: 'jgcorrea@uabc.edu.mx', area: 'Sistemas Acuícolas y Calidad de Agua' },
  'castilloramirezalejandradejesus': { nombre: 'Dra. Alejandra de Jesús Castillo Ramírez', titulo: 'Dra.', email: 'acastillo@uabc.edu.mx', area: 'Percepción Remota del Color del Océano y Bio-óptica' },
  'villasusopomaresalvador': { nombre: 'Dr. Salvador Villasuso Palomares', titulo: 'Dr.', email: 'svillasuso@uabc.edu.mx', area: 'Física Marina y Meteorología' },
  'gomezhernandezguadalupe': { nombre: 'Dra. Guadalupe Gómez Hernández', titulo: 'Dra.', email: 'ggomez@uabc.edu.mx', area: 'Ciencias Ambientales y Gestión de Residuos' },
  'saenzavalosmarianaanalaura': { nombre: 'Dra. Mariana Ana Laura Saenz-Ávalos', titulo: 'Dra.', email: 'msaenz@uabc.edu.mx', area: 'Ecología Marina y Dinámica Trófica' }
};

// Mapeos canónicos de profesores de Posgrado y Directivos con UID fijos
const UID_FIJOS = {
  'igiffard': 'admin_igiffard',
  'bmartin': 'prof_bmartin',
  'llopez': 'prof_llopez',
  'mtorres': 'prof_mtorres',
  'bjuarez': 'prof_bjuarez',
  'palvarado': 'prof_palvarado',
  'stanahara': 'prof_stanahara',
  'nmillan': 'prof_nmillan',
  'vfernandez': 'prof_vfernandez',
  'jazepeda': 'prof_jazepeda',
  'jmsandoval': 'prof_jmsandoval',
  'lenriquez': 'prof_lenriquez',
  'hgnava': 'prof_hgnava',
  'tolivares': 'prof_tolivares',
  'scastellanos': 'prof_scastellanos',
  'ngudino': 'prof_ngudino',
  'odelrio': 'prof_odelrio',
  'jgcorrea': 'prof_jgcorrea',
  'fbarreto': 'prof_fbarreto',
  'acastillo': 'prof_acastillo',
  'lmalpica': 'prof_lmalpica',
  'mgalaviz': 'prof_mgalaviz',
  'afelix': 'prof_afelix',
  'gsamperio': 'prof_gsamperio',
  'auribe': 'prof_auribe',
  'aabadia': 'prof_aabadia',
  'abraga': 'prof_abraga',
  'jvaca': 'prof_jvaca',
  'klugo': 'prof_klugo',
  'cdominguez': 'prof_cdominguez',
  'onorzagaray': 'prof_onorzagaray',
  'rbeas': 'prof_rbeas',
  'mruiz': 'prof_mruiz',
  'msantiago': 'prof_msantiago',
  'rcruz': 'prof_rcruz'
};

// Diccionario de cubículos y extensiones en Campus FCM Ensenada
const CUBICULOS_MAP = {
  'admin_igiffard': { cubiculo: 'Edificio 14 (Dirección) · Cubículo Subdirección', ext: 'Ext. 43102' },
  'prof_bmartin': { cubiculo: 'Edificio 14 · Cubículo 104', ext: 'Ext. 43120' },
  'prof_llopez': { cubiculo: 'Edificio 25 (IIO) · Cubículo 208', ext: 'Ext. 43215' },
  'prof_mtorres': { cubiculo: 'Edificio 14 · Cubículo 108', ext: 'Ext. 43118' },
  'prof_bjuarez': { cubiculo: 'Edificio 16 · Cubículo 112', ext: 'Ext. 43144' },
  'prof_palvarado': { cubiculo: 'Edificio 16 · Cubículo 115', ext: 'Ext. 43145' },
  'prof_stanahara': { cubiculo: 'Edificio 16 · Cubículo 116', ext: 'Ext. 43146' },
  'prof_nmillan': { cubiculo: 'Edificio 14 (SPD) · Cubículo 102', ext: 'Ext. 43105' },
  'prof_vfernandez': { cubiculo: 'Edificio 18 · Cubículo 205', ext: 'Ext. 43160' },
  'prof_jazepeda': { cubiculo: 'Edificio 18 · Cubículo 209', ext: 'Ext. 43163' },
  'prof_jmsandoval': { cubiculo: 'Edificio 17 · Cubículo 103', ext: 'Ext. 43132' },
  'prof_lenriquez': { cubiculo: 'Edificio 17 · Cubículo 105', ext: 'Ext. 43135' },
  'prof_hgnava': { cubiculo: 'Edificio 25 (IIO) · Cubículo 210', ext: 'Ext. 43220' },
  'prof_tolivares': { cubiculo: 'Edificio 18 · Cubículo 207', ext: 'Ext. 43162' },
  'prof_scastellanos': { cubiculo: 'Edificio 17 · Cubículo 110', ext: 'Ext. 43138' },
  'prof_ngudino': { cubiculo: 'Edificio 25 (IIO) · Cubículo 212', ext: 'Ext. 43222' },
  'prof_odelrio': { cubiculo: 'Edificio 17 · Cubículo 108', ext: 'Ext. 43136' },
  'prof_jgcorrea': { cubiculo: 'Edificio 25 (IIO) · Cubículo 215', ext: 'Ext. 43225' },
  'prof_fbarreto': { cubiculo: 'Edificio 18 · Cubículo 202', ext: 'Ext. 43158' },
  'prof_acastillo': { cubiculo: 'Edificio 14 · Cubículo 106', ext: 'Ext. 43115' },
  'prof_lmalpica': { cubiculo: 'Edificio 25 (IIO) · Cubículo 218', ext: 'Ext. 43228' },
  'prof_mgalaviz': { cubiculo: 'Edificio 14 · Cubículo 107', ext: 'Ext. 43117' },
  'prof_afelix': { cubiculo: 'Edificio 25 (IIO) · Cubículo 220', ext: 'Ext. 43230' },
  'prof_gsamperio': { cubiculo: 'Edificio 18 · Cubículo 204', ext: 'Ext. 43159' },
  'prof_auribe': { cubiculo: 'Edificio 18 · Cubículo 211', ext: 'Ext. 43165' },
  'prof_aabadia': { cubiculo: 'Edificio 17 · Cubículo 102', ext: 'Ext. 43131' },
  'prof_abraga': { cubiculo: 'Edificio 25 (IIO) · Cubículo 222', ext: 'Ext. 43232' },
  'prof_jvaca': { cubiculo: 'Edificio 18 · Cubículo 201', ext: 'Ext. 43157' },
  'prof_klugo': { cubiculo: 'Edificio 17 · Cubículo 106', ext: 'Ext. 43134' },
  'prof_cdominguez': { cubiculo: 'Edificio 16 · Cubículo 114', ext: 'Ext. 43147' },
  'prof_onorzagaray': { cubiculo: 'Edificio 18 · Cubículo 208', ext: 'Ext. 43161' },
  'prof_rbeas': { cubiculo: 'Edificio 18 · Cubículo 206', ext: 'Ext. 43164' },
  'prof_mruiz': { cubiculo: 'Edificio 14 · Cubículo 105', ext: 'Ext. 43116' },
  'prof_msantiago': { cubiculo: 'Edificio 16 · Cubículo 118', ext: 'Ext. 43149' },
  'prof_rcruz': { cubiculo: 'Edificio 25 (IIO) · Cubículo 225', ext: 'Ext. 43235' }
};

// Generar lista limpia y deduplicada
const profesoresMap = new Map();

RAW_PROFESORES.forEach((raw, index) => {
  const norm = normalizeKey(raw);
  if (!norm) return;
  if (profesoresMap.has(norm)) return; // Deduplicar

  let nombreFormateado = '';
  let titulo = 'Dr.';
  let email = '';
  let area = 'Ciencias Marinas y del Ambiente';
  let uid = '';
  let origenPosgrado = false;

  // 1. Verificar si está en CANONICOS_BLOQUE_1
  if (CANONICOS_BLOQUE_1[norm]) {
    const c = CANONICOS_BLOQUE_1[norm];
    nombreFormateado = c.nombre;
    titulo = c.titulo;
    email = c.email;
    area = c.area;
  } else {
    // Es del bloque 2 o nombre natural
    const fem = esFemenino(raw);
    titulo = fem ? 'Dra.' : 'Dr.';
    
    // Normalizar capitalización
    let limpio = toTitleCase(raw);
    
    // Si viene en mayúsculas o minúsculas, arreglar acentos comunes
    limpio = limpio
      .replace(/\bMunoz\b/g, 'Muñoz')
      .replace(/\bHernandez\b/g, 'Hernández')
      .replace(/\bGudino\b/g, 'Gudiño')
      .replace(/\bGutierrez\b/g, 'Gutiérrez')
      .replace(/\bLopez\b/g, 'López')
      .replace(/\bDiaz\b/g, 'Díaz')
      .replace(/\bGarcia\b/g, 'García')
      .replace(/\bRodriguez\b/g, 'Rodríguez')
      .replace(/\bPerez\b/g, 'Pérez')
      .replace(/\bSanchez\b/g, 'Sánchez')
      .replace(/\bGonzalez\b/g, 'González')
      .replace(/\bMartinez\b/g, 'Martínez')
      .replace(/\bJimenez\b/g, 'Jiménez')
      .replace(/\bNunez\b/g, 'Núñez')
      .replace(/\bFelix\b/g, 'Félix')
      .replace(/\bAvila\b/g, 'Ávila')
      .replace(/\bAlvarez\b/g, 'Álvarez')
      .replace(/\bRamirez\b/g, 'Ramírez')
      .replace(/\bCastaneda\b/g, 'Castañeda')
      .replace(/\bBona\b/g, 'Bonett')
      .replace(/\bMendez\b/g, 'Méndez')
      .replace(/\bGuillen\b/g, 'Guillén')
      .replace(/\bVelasquez\b/g, 'Velásquez')
      .replace(/\bAristizabal\b/g, 'Aristizábal')
      .replace(/\bCastrillon\b/g, 'Castrillón')
      .replace(/\bAlegria\b/g, 'Alegría')
      .replace(/\bAguillon\b/g, 'Aguillón')
      .replace(/\bArreguin\b/g, 'Arreguín')
      .replace(/\bOcampo\b/g, 'Ocampo')
      .replace(/\bBanos\b/g, 'Bañuelos')
      .replace(/\bBanuelos\b/g, 'Bañuelos')
      .replace(/\bSaul\b/g, 'Saúl')
      .replace(/\bMoises\b/g, 'Moisés')
      .replace(/\bFroylan\b/g, 'Froylán')
      .replace(/\bArambul\b/g, 'Arámbul')
      .replace(/\bOrion\b/g, 'Orión')
      .replace(/\bEuan\b/g, 'Euán');

    // Casos específicos de formato Apellidos Nombres en bloque 2
    if (raw.toUpperCase().includes('ANDRADE SANCHEZ JORGE ALBERTO')) {
      limpio = 'Jorge Alberto Andrade Sánchez';
    } else if (raw.toUpperCase().includes('PUMA CHÁVEZ ADRIANA') || raw.toUpperCase().includes('PUMA CHAVEZ ADRIANA')) {
      limpio = 'Adriana Puma Chávez';
    }

    nombreFormateado = `${titulo} ${limpio}`;

    // Correo institucional derivado
    const tokens = limpio.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z\s]/g, '').split(/\s+/);
    if (tokens.length >= 2) {
      email = `${tokens[0][0]}${tokens[tokens.length - 1]}@uabc.edu.mx`;
    } else {
      email = `${tokens[0]}@uabc.edu.mx`;
    }
  }

  // Identificar si corresponde a uno de los UIDs fijos
  if (norm.includes('giffardmenaivone')) {
    uid = 'admin_igiffard';
    origenPosgrado = true;
  } else if (norm.includes('martinatienzabeatriz')) {
    uid = 'prof_bmartin';
    origenPosgrado = true;
  } else if (norm.includes('lauralilianalopezgalindo')) {
    uid = 'prof_llopez';
    origenPosgrado = true;
  } else if (norm.includes('torresbeltranmonica')) {
    uid = 'prof_mtorres';
    origenPosgrado = true;
  } else if (norm.includes('brauliojuarezaraiza')) {
    uid = 'prof_bjuarez';
    origenPosgrado = true;
  } else if (norm.includes('alvaradograefpatricia')) {
    uid = 'prof_palvarado';
    origenPosgrado = true;
  } else if (norm.includes('tanaharoromerosaraydaaime')) {
    uid = 'prof_stanahara';
    origenPosgrado = true;
  } else if (norm.includes('millanaguinaganatalie')) {
    uid = 'prof_nmillan';
    origenPosgrado = true;
  } else if (norm.includes('fernandezdiazvioletazetzangari')) {
    uid = 'prof_vfernandez';
    origenPosgrado = true;
  } else if (norm.includes('zepedadominguezjosealberto')) {
    uid = 'prof_jazepeda';
    origenPosgrado = true;
  } else if (norm.includes('sandovalgaribaldigerardo')) {
    uid = 'prof_gsandoval';
  } else if (norm.includes('josemiguelsandoval') || norm.includes('sandovalgiljosemiguel')) {
    uid = 'prof_jmsandoval';
    origenPosgrado = true;
  } else if (norm.includes('enriquezparedesluismanuel')) {
    uid = 'prof_lenriquez';
    origenPosgrado = true;
  } else if (norm.includes('hectorgarcianava') || norm.includes('garcianavahector')) {
    uid = 'prof_hgnava';
    origenPosgrado = true;
  } else if (norm.includes('tatiananenetzenolivaresbanuelos') || norm.includes('olivaresbanuelostatiananenetzen')) {
    uid = 'prof_tolivares';
    origenPosgrado = true;
  } else if (norm.includes('sheilacastellanosmartinez') || norm.includes('castellanosmartinezsheila')) {
    uid = 'prof_scastellanos';
    origenPosgrado = true;
  } else if (norm.includes('napoleongudinoelizondo') || norm.includes('gudinoelizondonapoleon')) {
    uid = 'prof_ngudino';
    origenPosgrado = true;
  } else if (norm.includes('oscarbasiliodelriozaragoza') || norm.includes('delriozaragozaoscarbasilio')) {
    uid = 'prof_odelrio';
    origenPosgrado = true;
  } else if (norm.includes('juangabrielcorreareyes') || norm.includes('correareyesjuangabriel')) {
    uid = 'prof_jgcorrea';
    origenPosgrado = true;
  } else if (norm.includes('correaperezjuangabriel')) {
    uid = 'prof_jgcorreaperez';
  } else if (norm.includes('barretocurielfernando')) {
    uid = 'prof_fbarreto';
    origenPosgrado = true;
  } else if (norm.includes('castilloramirezalejandradejesus')) {
    uid = 'prof_acastillo';
    origenPosgrado = true;
  } else if (norm.includes('luismalpicacruz') || norm.includes('malpicacruzluis')) {
    uid = 'prof_lmalpica';
    origenPosgrado = true;
  } else if (norm.includes('galavizespinozamario')) {
    uid = 'prof_mgalaviz';
    origenPosgrado = true;
  } else if (norm.includes('armandofelixbermudez') || norm.includes('felixbermudezarmando')) {
    uid = 'prof_afelix';
    origenPosgrado = true;
  } else if (norm.includes('guillermoalbertosamperioramos')) {
    uid = 'prof_gsamperio';
    origenPosgrado = true;
  } else if (norm.includes('aliciaguadalupeuribelopez') || norm.includes('uribelopezaliciaguadalupe')) {
    uid = 'prof_auribe';
    origenPosgrado = true;
  } else if (norm.includes('abadiacardosoalicia')) {
    uid = 'prof_aabadia';
    origenPosgrado = true;
  } else if (norm.includes('andreluizbragadesouza') || norm.includes('bragadesouzaandreluiz')) {
    uid = 'prof_abraga';
    origenPosgrado = true;
  } else if (norm.includes('vacarodriguezjuanguillermo')) {
    uid = 'prof_jvaca';
    origenPosgrado = true;
  } else if (norm.includes('lugoibarrakarinadelcarmen')) {
    uid = 'prof_klugo';
    origenPosgrado = true;
  } else if (norm.includes('dominguezperezcarlosalejandro')) {
    uid = 'prof_cdominguez';
    origenPosgrado = true;
  } else if (norm.includes('carlosorionnorzagaraylopez') || norm.includes('norzagaraylopezcarlosorion')) {
    uid = 'prof_onorzagaray';
    origenPosgrado = true;
  } else if (norm.includes('beaslunarodrigo')) {
    uid = 'prof_rbeas';
    origenPosgrado = true;
  } else if (norm.includes('ruizdelatorremarycarmen')) {
    uid = 'prof_mruiz';
    origenPosgrado = true;
  } else if (norm.includes('santiagogarciamaurowilfrido')) {
    uid = 'prof_msantiago';
    origenPosgrado = true;
  } else if (norm.includes('ricardocruzlopez') || norm.includes('cruzlopezricardo')) {
    uid = 'prof_rcruz';
    origenPosgrado = true;
  } else if (norm.includes('eatongonzalezricardobernardino')) {
    uid = 'prof_reaton';
    origenPosgrado = true;
  } else {
    // Generar UID limpio basado en iniciales y apellido
    const slug = norm.slice(0, 14);
    uid = `prof_${slug}`;
  }

  const cubInfo = CUBICULOS_MAP[uid] || {
    cubiculo: 'Edificio 18 · Sala de Profesores FCM',
    ext: 'Ext. 43100'
  };

  const docenteObj = {
    uid,
    nombre: nombreFormateado,
    cargo: uid === 'admin_igiffard' ? 'Subdirectora FCM · Docente de Posgrado' : 'Profesor-Investigador',
    titulo_academico: titulo,
    email,
    email_normalizado: email.toLowerCase(),
    role: uid === 'admin_igiffard' ? 'admin' : 'profesor',
    programas_asignados_ids: origenPosgrado ? ['MCOC', 'DOC', 'OCE'] : ['OCE', 'TC-CMA', 'LBA', 'LCA'],
    niveles_asignados: origenPosgrado ? ['posgrado', 'licenciatura'] : ['licenciatura'],
    activo: true,
    origen_pdf_posgrado: origenPosgrado,
    academia_area: area,
    cubiculo: cubInfo.cubiculo,
    horario_tutorias: 'Lunes a Jueves 11:00 - 13:00 (Cita previa)',
    telefono_extension: cubInfo.ext,
    canal_contacto_estudiantes: 'Correo institucional UABC / Microsoft Teams',
    createdAt: '2027-01-10T08:00:00.000Z',
    updatedAt: '2027-01-10T08:00:00.000Z'
  };

  profesoresMap.set(norm, docenteObj);
});

const DOCENTES_ACTUALIZADOS = Array.from(profesoresMap.values());
console.log('Total docentes procesados y deduplicados:', DOCENTES_ACTUALIZADOS.length);
console.log('Docentes de posgrado identificados:', DOCENTES_ACTUALIZADOS.filter(d => d.origen_pdf_posgrado).length);

// Guardar archivo JSON intermedio de profesores
const salidaPath = path.join(__dirname, 'profesores_reales_fcm.json');
fs.writeFileSync(salidaPath, JSON.stringify(DOCENTES_ACTUALIZADOS, null, 2), 'utf8');
console.log('Guardado en:', salidaPath);
