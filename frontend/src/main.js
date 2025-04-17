const API_URL = 'http://localhost:5000/contactos';

document.addEventListener('DOMContentLoaded', () => {
    fetchContactos();

    document.getElementById('contactForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Clear previous error messages
        clearErrorMessages();

        // Validate fields
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const direccion = document.getElementById('direccion').value.trim();

        let valid = true;

        if (!nombre) {
            showErrorMessage('error-nombre', 'El nombre es obligatorio.');
            valid = false;
        }

        if (!telefono) {
            showErrorMessage('error-telefono', 'El teléfono es obligatorio.');
            valid = false;
        } else if (!/^[0-9]+$/.test(telefono)) {
            showErrorMessage('error-telefono', 'El teléfono debe contener solo números.');
            valid = false;
        }

        if (email && !validateEmail(email)) {
            showErrorMessage('error-email', 'El email no es válido.');
            valid = false;
        }

        if (!valid) {
            return; // Stop submission if there are validation errors
        }

        // If valid, proceed to submit data
        addOrUpdateContacto(event);
    });
});

// CRUD for Contacts
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
    const id = document.getElementById('contactId').value;
    const data = {
        nombre: document.getElementById('nombre').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        email: document.getElementById('email').value.trim(),
        direccion: document.getElementById('direccion').value.trim()
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    event.target.reset();
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
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchContactos();
}

// Validation Helpers
function showErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach((element) => {
        element.style.display = 'none';
        element.textContent = '';
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
}
