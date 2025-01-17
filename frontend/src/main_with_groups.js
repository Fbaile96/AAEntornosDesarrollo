const API_URL = 'http://localhost:5000';

document.addEventListener('DOMContentLoaded', () => {
    fetchContactos();
    fetchGrupos();

    document.getElementById('contactForm').addEventListener('submit', addOrUpdateContacto);
    document.getElementById('groupForm').addEventListener('submit', createGrupo);
});

// CRUD for Contacts
async function fetchContactos() {
    const response = await fetch(`${API_URL}/contactos`);
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
    const data = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value
    };

    if (id) {
        await fetch(`${API_URL}/contactos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } else {
        await fetch(`${API_URL}/contactos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    event.target.reset();
    fetchContactos();
}

async function editContacto(id) {
    const response = await fetch(`${API_URL}/contactos/${id}`);
    const contacto = await response.json();

    document.getElementById('contactId').value = contacto.id;
    document.getElementById('nombre').value = contacto.nombre;
    document.getElementById('telefono').value = contacto.telefono;
    document.getElementById('email').value = contacto.email || '';
    document.getElementById('direccion').value = contacto.direccion || '';
}

async function deleteContacto(id) {
    await fetch(`${API_URL}/contactos/${id}`, { method: 'DELETE' });
    fetchContactos();
}

// CRUD for Groups
async function fetchGrupos() {
    const response = await fetch(`${API_URL}/grupos`);
    const grupos = await response.json();
    const groupsContainer = document.getElementById('groupsContainer');
    groupsContainer.innerHTML = '';

    grupos.forEach(grupo => {
        const div = document.createElement('div');
        div.classList.add('group');
        div.innerHTML = `
            <h3>${grupo.nombre}</h3>
            <button onclick="fetchContactosByGrupo(${grupo.id})">Ver Contactos</button>
        `;
        groupsContainer.appendChild(div);
    });
}

async function createGrupo(event) {
    event.preventDefault();

    const nombre = document.getElementById('grupoNombre').value;
    await fetch(`${API_URL}/grupos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    });

    event.target.reset();
    fetchGrupos();
}

async function fetchContactosByGrupo(grupoId) {
    const response = await fetch(`${API_URL}/grupos/${grupoId}/contactos`);
    const contactos = await response.json();

    alert(`Contactos en el grupo:
${contactos.map(c => c.nombre).join(', ')}`);
}
