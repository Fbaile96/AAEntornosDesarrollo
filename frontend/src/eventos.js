const API_URL = 'http://localhost:3307/eventos';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const eventIdInput = document.getElementById('eventId');
    const tituloInput = document.getElementById('titulo');
    const fechaInput = document.getElementById('fecha');
    const descripcionInput = document.getElementById('descripcion');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = eventIdInput.value.trim();
        const titulo = tituloInput.value.trim();
        const fecha = fechaInput.value.trim();
        const descripcion = descripcionInput.value.trim();

        // Validación básica
        if (!titulo || !fecha) {
            alert('Por favor completa el título y la fecha.');
            return;
        }

        // Asegurarse de que la descripción sea null si está vacía
        const data = {
            titulo,
            fecha,
            descripcion: descripcion || null  // Si la descripción está vacía, asignar null
        };

        // Evitar enviar valores undefined
        Object.keys(data).forEach(key => {
            if (data[key] === undefined) {
                data[key] = null;
            }
        });

        try {
            const url = id ? `${API_URL}/${id}` : API_URL;
            const method = id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Error al guardar: ${error}`);
            }

            form.reset();
            eventIdInput.value = ''; // Limpiar ID después de editar
            fetchEventos();

        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al guardar el evento.');
        }
    });

    fetchEventos();
});

async function fetchEventos() {
    try {
        const res = await fetch(API_URL);
        const eventos = await res.json();

        const tbody = document.querySelector('#eventTable tbody');
        tbody.innerHTML = '';

        eventos.forEach(evento => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${evento.id}</td>
                <td>${evento.titulo}</td>
                <td>${evento.fecha}</td>
                <td>${evento.descripcion || ''}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editEvento(${evento.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEvento(${evento.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error al cargar eventos:', error);
        alert('No se pudieron cargar los eventos.');
    }
}

async function editEvento(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Error al obtener el evento');
        const evento = await res.json();

        document.getElementById('eventId').value = evento.id;
        document.getElementById('titulo').value = evento.titulo;
        document.getElementById('fecha').value = evento.fecha;
        document.getElementById('descripcion').value = evento.descripcion || '';

    } catch (error) {
        console.error(error);
        alert('No se pudo cargar el evento para editar.');
    }
}

async function deleteEvento(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar el evento');
        fetchEventos();
    } catch (error) {
        console.error(error);
        alert('No se pudo eliminar el evento.');
    }
}
