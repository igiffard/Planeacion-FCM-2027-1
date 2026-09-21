/**
 * Módulo de Normalización, Homologación y Deduplicación
 * Facultad de Ciencias Marinas (FCM) - UABC
 */

/**
 * Normaliza cualquier texto siguiendo las especificaciones oficiales de la FCM:
 * 1. Minúsculas
 * 2. Eliminar acentos y diacríticos
 * 3. Convertir ñ a n
 * 4. Recortar espacios iniciales/finales
 * 5. Convertir espacios múltiples en uno solo
 * 6. Tratar signos de puntuación de forma comparable
 * 7. Normalizar abreviaturas seguras (lab., sal., oc., etc.)
 */
export function normalizarTexto(valor: string | undefined | null): string {
  if (!valor) return '';

  let texto = valor.toLowerCase();

  // Eliminar acentos y diacríticos preservando caracteres base
  texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Convertir ñ a n
  texto = texto.replace(/ñ/g, 'n');

  // Normalizar abreviaturas comunes de docencia en la FCM
  texto = texto.replace(/\blab\.\b|\blab\b/g, 'laboratorio');
  texto = texto.replace(/\bsal\.\b|\bsal\b/g, 'salon');
  texto = texto.replace(/\boc\.\b|\boc\b/g, 'oceanografia');
  texto = texto.replace(/\bposg\.\b|\bposg\b/g, 'posgrado');
  texto = texto.replace(/\blic\.\b|\blic\b/g, 'licenciatura');
  texto = texto.replace(/\bedif\.\b|\bedif\b/g, 'edificio');

  // Tratar puntos, comas, guiones, diagonales y paréntesis reemplazándolos con espacios
  texto = texto.replace(/[.,\-_/\\()[\]{}:;]/g, ' ');

  // Reducir múltiples espacios a uno solo y recortar extremos
  texto = texto.replace(/\s+/g, ' ').trim();

  return texto;
}

/**
 * Genera una clave única estandarizada para cursos institucionales
 */
export function generarClaveCursoUnica(
  nivel: string,
  programas: string[],
  nombre: string
): string {
  const normNivel = normalizarTexto(nivel);
  const progOrdenados = [...programas].sort().join('-');
  const normNombre = normalizarTexto(nombre);
  return `${normNivel}_${progOrdenados}_${normNombre}`;
}

/**
 * Calcula similitud entre dos cadenas de texto usando coeficiente de Dice / Levenshtein
 * Retorna un valor entre 0 y 1
 */
export function calcularSimilitud(textoA: string, textoB: string): number {
  const a = normalizarTexto(textoA);
  const b = normalizarTexto(textoB);

  if (a === b) return 1.0;
  if (!a || !b) return 0.0;

  // Si uno contiene exactamente al otro
  if (a.includes(b) || b.includes(a)) {
    return Math.max(a.length, b.length) > 0 ? Math.min(a.length, b.length) / Math.max(a.length, b.length) : 0;
  }

  // Comparación por bigramas (Dice's Coefficient)
  const getBigramas = (str: string) => {
    const bigramas = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      bigramas.add(str.substring(i, i + 2));
    }
    return bigramas;
  };

  const bigramasA = getBigramas(a);
  const bigramasB = getBigramas(b);

  if (bigramasA.size === 0 || bigramasB.size === 0) return 0.0;

  let interseccion = 0;
  for (const bigrama of bigramasA) {
    if (bigramasB.has(bigrama)) {
      interseccion++;
    }
  }

  return (2.0 * interseccion) / (bigramasA.size + bigramasB.size);
}
