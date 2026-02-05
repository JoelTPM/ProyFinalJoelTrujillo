export async function actualizarEstudiante(id, datosActualizados) {
  try {
    const response = await fetch(`http://localhost:3000/api/student/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosActualizados)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const estudianteActualizado = await response.json();
    console.log('Estudiante actualizado exitosamente:', estudianteActualizado);
    return { success: true, data: estudianteActualizado };
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    return { success: false, error: error.message };
  }
}
export default actualizarEstudiante;
