export async function eliminarUsuario(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        console.log(`✓ Usuario con ID ${id} eliminado exitosamente`);
        return { success: true, message: `Usuario ${id} eliminado` };
    } catch (error) {
        console.error('✗ Error al eliminar usuario:', error.message);
        return { success: false, error: error.message };
    }
}