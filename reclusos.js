// Inicializar reclusos desde localStorage o un arreglo vacío si no hay datos
let reclusos = JSON.parse(localStorage.getItem('reclusos')) || [];

// Función para mostrar todos los reclusos
function mostrarReclusos() {
    const contenedorReclusos = document.getElementById('reclusosContainer');
    contenedorReclusos.innerHTML = ''; // Limpiar contenido existente

    reclusos.forEach((recluso, indice) => {
        const cardRecluso = `
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${recluso.nombre}</h5>
                    <p class="card-text">Identificación: ${recluso.identificacion}</p>
                    <p class="card-text">Delitos: ${recluso.delitos}</p>
                    <p class="card-text">Condena: ${recluso.condena}</p>
                    <p class="card-text">Fecha de Ingreso: ${recluso.fechaIngreso}</p>
                    <button class="btn btn-warning" onclick="editarRecluso(${indice})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarRecluso(${indice})">Eliminar</button>
                    <button class="btn btn-danger" onclick="mostrarHistorial(${indice})">visitas</button>
                </div>
            </div>
        </div>`;
        contenedorReclusos.innerHTML += cardRecluso;
    });
}

function mostrarHistorial(indice) {
    const recluso = reclusos[indice];
    $('#visitasModal').modal('show'); // Mostrar modal del historial de visitas
    document.getElementById('visitasList').innerHTML = `<li class="list-group-item">Historial de visitas para ${recluso.nombre}</li>`;
}

// Función para agregar o actualizar un recluso
function agregarOActualizarRecluso(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const identificacion = document.getElementById('identificacion').value;
    const delitos = document.getElementById('delitos').value;
    const condena = document.getElementById('condena').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;

    const nuevoRecluso = { nombre, identificacion, delitos, condena, fechaIngreso };

    if (indiceEdicion === -1) {
        // Agregar nuevo recluso
        reclusos.push(nuevoRecluso);
    } else {
        // Actualizar recluso existente
        reclusos[indiceEdicion] = nuevoRecluso;
        indiceEdicion = -1; // Reiniciar índice después de editar
    }

    localStorage.setItem('reclusos', JSON.stringify(reclusos)); // Guardar en localStorage
    mostrarReclusos();
    $('#reclusoModal').modal('hide'); // Ocultar modal
    document.getElementById('reclusoForm').reset(); // Limpiar formulario
}

// Función para editar un recluso
let indiceEdicion = -1;
function editarRecluso(indice) {
    indiceEdicion = indice;
    const recluso = reclusos[indice];

    document.getElementById('nombre').value = recluso.nombre;
    document.getElementById('identificacion').value = recluso.identificacion;
    document.getElementById('delitos').value = recluso.delitos;
    document.getElementById('condena').value = recluso.condena;
    document.getElementById('fechaIngreso').value = recluso.fechaIngreso;

    $('#reclusoModal').modal('show'); // Mostrar modal con datos prellenados
}

// Función para eliminar un recluso
function eliminarRecluso(indice) {
    reclusos.splice(indice, 1);
    localStorage.setItem('reclusos', JSON.stringify(reclusos)); // Actualizar localStorage
    mostrarReclusos();
}

// Evento para el formulario
document.getElementById('reclusoForm').addEventListener('submit', agregarOActualizarRecluso);

// Evento para el botón de agregar recluso
document.getElementById('addReclusoBtn').addEventListener('click', function() {
    indiceEdicion = -1; // Reiniciar índice para nuevas entradas
    document.getElementById('reclusoForm').reset(); // Limpiar formulario
    $('#reclusoModal').modal('show'); // Mostrar modal
});

// Mostrar los reclusos al cargar la página
mostrarReclusos();
