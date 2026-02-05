const API_URL = 'http://localhost:3000/api';
/**
 * Agrega un nuevo estudiante a la base de datos
 * @param {Object} datosEstudiante - Datos del estudiante a agregar
 * @param {string} datosEstudiante.nombre - Nombre del estudiante
 * @param {string} datosEstudiante.email - Email del estudiante
 * @param {string} datosEstudiante.telefono - Teléfono del estudiante
 * @param {string} datosEstudiante.carrera - Carrera del estudiante
 * @returns {Promise<Object>} Respuesta con éxito o error
 */
export async function agregarEstudiante(datosEstudiante) {
  try {
    if (!datosEstudiante || Object.keys(datosEstudiante).length === 0) {
      throw new Error('Los datos del estudiante no pueden estar vacíos');
    }
    const response = await fetch(`${API_URL}/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosEstudiante)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const nuevoEstudiante = await response.json();
    console.log('✓ Estudiante agregado exitosamente:', nuevoEstudiante);
    return { success: true, data: nuevoEstudiante };
  } catch (error) {
    console.error('✗ Error al agregar estudiante:', error.message);
    return { success: false, error: error.message };
  }
}