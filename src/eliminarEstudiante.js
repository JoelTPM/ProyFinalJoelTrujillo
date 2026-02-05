export async function eliminarEstudiante(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/student/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    console.log(`Estudiante con ID ${id} eliminado exitosamente`);
    return { success: true, message: `Estudiante ${id} eliminado` };
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    return { success: false, error: error.message };
  }
}
export default eliminarEstudiante;