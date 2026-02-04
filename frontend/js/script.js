const apiUrl = 'http://localhost:3000/api';

// Función para mostrar mensajes
function showMessage(elementId, message, isError = false) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = isError ? 'error' : 'success';
    setTimeout(() => element.textContent = '', 5000);
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar password (mínimo 6 caracteres)
function isValidPassword(password) {
    return password.length >= 6;
}

// Función para deshabilitar/enabled botones
function setButtonState(form, disabled) {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = disabled;
        button.textContent = disabled ? 'Cargando...' : (button.dataset.originalText || button.textContent);
    }
}

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showMessage('loginMessage', 'Por favor, completa todos los campos.', true);
        return;
    }
    if (!isValidEmail(email)) {
        showMessage('loginMessage', 'Ingresa un email válido.', true);
        return;
    }

    setButtonState(form, true);

    try {
        console.log('Intentando login con email:', email);
        const response = await fetch(`${apiUrl}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }
        const users = await response.json();
        console.log('Usuarios obtenidos:', users.length);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            showMessage('loginMessage', `¡Bienvenido, ${user.name}!`);
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userId', user.id);
            document.getElementById('loginForm').reset();
            setTimeout(() => {
                window.location.href = 'panel.html';
            }, 2000);
        } else {
            showMessage('loginMessage', 'Credenciales incorrectas.', true);
        }
    } catch (error) {
        console.error('Error de login:', error);
        showMessage('loginMessage', `Error de conexión: ${error.message}`, true);
    } finally {
        setButtonState(form, false);
    }
});

// Registrar usuario
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
        showMessage('registerMessage', 'Por favor, completa todos los campos.', true);
        return;
    }
    if (!isValidEmail(email)) {
        showMessage('registerMessage', 'Ingresa un email válido.', true);
        return;
    }
    if (!isValidPassword(password)) {
        showMessage('registerMessage', 'La contraseña debe tener al menos 6 caracteres.', true);
        return;
    }

    setButtonState(form, true);

    try {
        console.log('Registrando usuario:', { name, email });
        const response = await fetch(`${apiUrl}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        console.log('Response status:', response.status);
        const data = await response.json();
        if (response.ok) {
            showMessage('registerMessage', 'Usuario registrado exitosamente.');
            document.getElementById('userForm').reset();
            loadUsers();
        } else {
            showMessage('registerMessage', data.detail || data.error || 'Error al registrar usuario.', true);
        }
    } catch (error) {
        console.error('Error de registro:', error);
        showMessage('registerMessage', `Error de conexión: ${error.message}`, true);
    } finally {
        setButtonState(form, false);
    }
});

// Cargar usuarios
async function loadUsers() {
    try {
        console.log('Cargando usuarios desde:', apiUrl + '/user');
        const response = await fetch(`${apiUrl}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }
        const users = await response.json();
        console.log('Usuarios cargados:', users);
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        if (users && users.length > 0) {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `ID: ${user.id}, Nombre: ${user.name}, Email: ${user.email}`;
                userList.appendChild(li);
            });
            showMessage('userMessage', `Se cargaron ${users.length} usuarios correctamente.`, false);
        } else {
            showMessage('userMessage', 'No hay usuarios registrados.', false);
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        showMessage('userMessage', `Error al cargar usuarios: ${error.message}`, true);
    }
}

const loadUsersBtn = document.getElementById('loadUsers');
if (loadUsersBtn) {
    loadUsersBtn.addEventListener('click', loadUsers);
} else {
    console.warn('Botón loadUsers no encontrado');
}