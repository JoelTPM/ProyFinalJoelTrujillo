export async function actualizarUsuario(id, datosActualizados) {
    try {
        const response = await fetch(`http://localhost:3000/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const usuarioActualizado = await response.json();
        console.log('Usuario actualizado exitosamente:', usuarioActualizado);
        return { success: true, data: usuarioActualizado };
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        return { success: false, error: error.message };
    }
}