const apiUrl='http://localhost:3000/api';

// Función para mostrar mensajes
function showMessage(elementId, message, isError = false) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = isError ? 'red' : 'green';
}

// Función para deshabilitar/enable botones durante envío
function setButtonState(form, disabled) {
    const buttons = form.querySelectorAll('button');
    buttons.forEach(button => button.disabled = disabled);
}

// Función para mostrar datos de estudiantes de la base de datos
async function loadStudent() {
    try {
        const response = await fetch(`${apiUrl}/student`);
        if (!response.ok) throw new Error('Error al obtener estudiantes');
        const estudiantes = await response.json();
        const estudiantesList = document.getElementById('studentList');
        estudiantesList.innerHTML = '';
        estudiantes.forEach(estudiante => {
            const li = document.createElement('li');
            li.textContent = `ID: ${estudiante.id}, Nombre: ${estudiante.name}, Edad: ${estudiante.age}, Curso: ${estudiante.grade}, Calificación: ${estudiante.qualification}`;
            estudiantesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
        showMessage('studentMessage', 'Error al cargar estudiantes.', true);
    }
}

// Llamar a la función para cargar estudiantes al cargar el panel
document.addEventListener('DOMContentLoaded', () => {
    loadStudent();
    const userName = localStorage.getItem('userName');
    if (userName) {
        const title = document.querySelector('h1');
        title.textContent = `Bienvenido ${userName} - PANEL DE ESTUDIANTES`;
    }
});

// Función para agregar estudiantes
document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const age = parseInt(document.getElementById('studentAge').value);
    const grade = document.getElementById('studentGrade').value.trim();
    const qualification = parseFloat(document.getElementById('studentQualification').value);
    if (!name || isNaN(age) || !grade || isNaN(qualification)) {
        showMessage('studentMessage', 'Por favor, completa todos los campos correctamente.', true);
        return;
    }
    setButtonState(e.target, true);
    try {
        const response = await fetch(`${apiUrl}/student`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, grade, qualification })
        });
        const data = await response.json();
        if (response.ok) {
            showMessage('studentMessage', 'Estudiante agregado exitosamente.');
            e.target.reset();
            loadStudent();
        } else {
            showMessage('studentMessage', data.detail || 'Error al agregar estudiante.', true);
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('studentMessage', 'Error de conexión. Inténtalo de nuevo.', true);
    } finally {
        setButtonState(e.target, false);
    }
});

// Función para actualizar estudiantes
document.getElementById('studentUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('updateStudentId').value);
    const name = document.getElementById('updateStudentName').value.trim();
    const age = parseInt(document.getElementById('updateStudentAge').value);
    const grade = document.getElementById('updateStudentGrade').value.trim();
    const qualification = parseFloat(document.getElementById('updateStudentQualification').value);
    if (isNaN(id) || !name || isNaN(age) || !grade || isNaN(qualification)) {
        showMessage('studentMessage', 'Por favor, completa todos los campos correctamente.', true);
        return;
    }
    setButtonState(e.target, true);
    try {
        const response = await fetch(`${apiUrl}/student/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, grade, qualification })
        });
        const data = await response.json();
        if (response.ok) {
            showMessage('studentMessage', 'Estudiante actualizado exitosamente.');
            e.target.reset();
            loadStudent();
        } else {
            showMessage('studentMessage', data.detail || 'Error al actualizar estudiante.', true);
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('studentMessage', 'Error de conexión. Inténtalo de nuevo.', true);
    } finally {
        setButtonState(e.target, false);
    }
});

// Función para eliminar estudiantes
document.getElementById('studentDeleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('deleteStudentId').value);
    if (isNaN(id)) {
        showMessage('studentMessage', 'Por favor, ingresa un ID válido.', true);
        return;
    }
    setButtonState(e.target, true);
    try {
        const response = await fetch(`${apiUrl}/student/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            showMessage('studentMessage', 'Estudiante eliminado exitosamente.');
            e.target.reset();
            loadStudent();
        } else {
            const data = await response.json();
            showMessage('studentMessage', data.detail || 'Error al eliminar estudiante.', true);
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('studentMessage', 'Error de conexión. Inténtalo de nuevo.', true);
    } finally {
        setButtonState(e.target, false);
    }
});

// Función para buscar estudiantes
document.getElementById('studentSearchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('searchStudentId').value);
    if (isNaN(id)) {
        showMessage('studentMessage', 'Por favor, ingresa un ID válido.', true);
        return;
    }
    setButtonState(e.target, true);
    try {
        const response = await fetch(`${apiUrl}/student/${id}`);
        if (response.ok) {
            const estudiante = await response.json();
            const estudiantesList = document.getElementById('studentList');
            estudiantesList.innerHTML = '';
            const li = document.createElement('li');
            li.textContent = `ID: ${estudiante.id}, Nombre: ${estudiante.name}, Edad: ${estudiante.age}, Curso: ${estudiante.grade}, Calificación: ${estudiante.qualification}`;
            estudiantesList.appendChild(li);
            showMessage('studentMessage', 'Estudiante encontrado.');
        } else {
            showMessage('studentMessage', 'Estudiante no encontrado.', true);
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('studentMessage', 'Error de conexión. Inténtalo de nuevo.', true);
    } finally {
        setButtonState(e.target, false);
    }
});

// Función para eliminar usuario
document.getElementById('eliminarEstudiantes').addEventListener('click', async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showMessage('studentMessage', 'No se encontró el ID del usuario.', true);
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/user/${userId}`, { method: 'DELETE' });
        if (response.ok) {
            showMessage('studentMessage', 'Usuario eliminado. Cerrando sesión...');
            setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                localStorage.removeItem('userId');
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage('studentMessage', 'Error al eliminar usuario.', true);
        }
    } catch (error) {
        showMessage('studentMessage', 'Error de conexión.', true);
    }
});

// Función para actualizar usuario
document.getElementById('actualizarUsuario').addEventListener('click', () => {
    document.getElementById('updateUserForm').style.display = 'block';
});

// Función para cancelar actualización de usuario
document.getElementById('cancelUpdateUser').addEventListener('click', () => {
    document.getElementById('updateUserForm').style.display = 'none';
    document.getElementById('userUpdateForm').reset();
});

// Función para enviar actualización de usuario
document.getElementById('userUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showMessage('studentMessage', 'No se encontró el ID del usuario.', true);
        return;
    }
    const name = document.getElementById('updateUserName').value.trim();
    const email = document.getElementById('updateUserEmail').value.trim();
    const password = document.getElementById('updateUserPassword').value;
    if (!name || !email || !password) {
        showMessage('studentMessage', 'Por favor, completa todos los campos.', true);
        return;
    }
    setButtonState(e.target, true);
    try {
        const response = await fetch(`${apiUrl}/user/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            showMessage('studentMessage', 'Usuario actualizado exitosamente.');
            localStorage.setItem('userName', name);
            document.getElementById('updateUserForm').style.display = 'none';
            e.target.reset();
            const title = document.querySelector('h1');
            title.textContent = `Bienvenido ${name} - PANEL DE ESTUDIANTES`;
        } else {
            showMessage('studentMessage', data.detail || 'Error al actualizar usuario.', true);
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('studentMessage', 'Error de conexión. Inténtalo de nuevo.', true);
    } finally {
        setButtonState(e.target, false);
    }
});

// Función para cerrar sesión
document.getElementById('cerrarSesion').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
});