const API_URL = 'http://localhost:5000/contactos';

document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const protectedContent = document.getElementById('protected-content');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutButton = document.getElementById('logout');

    const token = localStorage.getItem('token');
    if (token) {
        showProtectedContent();
    } else {
        showLogin();
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                showProtectedContent();
            } else {
                loginError.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        showLogin();
    });

    function showLogin() {
        loginContainer.style.display = 'block';
        protectedContent.style.display = 'none';
    }

    function showProtectedContent() {
        loginContainer.style.display = 'none';
        protectedContent.style.display = 'block';
        fetchContactos();
    }
});

async function fetchContactos() {
    const response = await fetch(API_URL);
    const contactos = await response.json();
    const tableBody = document.querySelector('#contactTable tbody');
    tableBody.innerHTML = '';

    contactos.forEach(contacto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contacto.id}</td>
            <td>${contacto.nombre}</td>
            <td>${contacto.telefono}</td>
            <td>${contacto.email || ''}</td>
            <td>${contacto.direccion || ''}</td>
            <td>
                <button onclick="editContacto(${contacto.id})">Editar</button>
                <button onclick="deleteContacto(${contacto.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function addOrUpdateContacto(event) {
    event.preventDefault();

    const id = document.getElementById('contactId').value;
    const formData = new FormData(event.target);
    const data = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        direccion: formData.get('direccion')
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    event.target.reset();
    document.getElementById('contactId').value = '';
    fetchContactos();
}

async function editContacto(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const contacto = await response.json();

    document.getElementById('contactId').value = contacto.id;
    document.getElementById('nombre').value = contacto.nombre;
    document.getElementById('telefono').value = contacto.telefono;
    document.getElementById('email').value = contacto.email || '';
    document.getElementById('direccion').value = contacto.direccion || '';
}

async function deleteContacto(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchContactos();
}

document.getElementById('contactForm').addEventListener('submit', addOrUpdateContacto);
