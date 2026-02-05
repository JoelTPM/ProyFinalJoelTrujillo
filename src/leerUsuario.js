export async function leerTodosLosUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const usuarios = await response.json();
    console.log('Usuarios obtenidos exitosamente:', usuarios);
    return { success: true, data: usuarios };
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return { success: false, error: error.message };
  }
}

export async function leerUsuarioPorId(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const usuario = await response.json();
    console.log('Usuario obtenido exitosamente:', usuario);
    return { success: true, data: usuario };
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return { success: false, error: error.message };
  }
}