const API_URL = 'http://localhost:3000/api';
/**
 * Agrega un nuevo usuario a la base de datos
 * @param {Object} datosUsuario - Datos del usuario a agregar
 * @param {string} datosUsuario.username - Nombre de usuario
 * @param {string} datosUsuario.email - Email del usuario
 * @param {string} datosUsuario.password - Contraseña del usuario
 * @param {string} datosUsuario.role - Rol del usuario
 * @returns {Promise<Object>} Respuesta con éxito o error
 */
export async function agregarUsuario(datosUsuario) {
    try {
        if (!datosUsuario || Object.keys(datosUsuario).length === 0) {
            throw new Error('Los datos del usuario no pueden estar vacíos');
        }
        const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const nuevoUsuario = await response.json();
        console.log('✓ Usuario agregado exitosamente:', nuevoUsuario);
        return { success: true, data: nuevoUsuario };
    } catch (error) {
        console.error('✗ Error al agregar usuario:', error.message);
        return { success: false, error: error.message };
    }
}