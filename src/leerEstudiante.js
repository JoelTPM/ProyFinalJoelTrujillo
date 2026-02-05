// Función para leer todos los estudiantes
export async function leerTodosLosEstudiantes() {
  try {
    const response = await fetch('http://localhost:3000/api/student', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const estudiantes = await response.json();
    console.log('Estudiantes obtenidos exitosamente:', estudiantes);
    return { success: true, data: estudiantes };
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    return { success: false, error: error.message };
  }
}
export default { leerTodosLosEstudiantes };