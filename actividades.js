// Arreglo para almacenar las actividades diarias
let actividades = [];

// Función para agregar una actividad a la tabla
document.getElementById('formActividades').addEventListener('submit', function (e) {
    e.preventDefault();

    let tipoActividad = document.getElementById('tipoActividad').value;
    let descripcion = document.getElementById('descripcionActividad').value;
    let cantidad = document.getElementById('cantidad').value;

    actividades.push({ tipoActividad, descripcion, cantidad });

    actualizarTablaActividades();
    document.getElementById('formActividades').reset();
});

// Función para actualizar la tabla de actividades
function actualizarTablaActividades() {
    let tabla = document.getElementById('tablaActividades');
    tabla.innerHTML = '';

    actividades.forEach((actividad, index) => {
        let row = `
            <tr>
                <td>${actividad.tipoActividad}</td>
                <td>${actividad.descripcion}</td>
                <td>${actividad.cantidad}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarActividad(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += row;
    });
}

// Función para eliminar una actividad de la tabla
function eliminarActividad(index) {
    actividades.splice(index, 1);
    actualizarTablaActividades();
}

// Función para generar el reporte diario
function generarReporte() {
    let contenidoReporte = `
        <h5>Resumen Diario de Actividades</h5>
        <ul>
    `;

    actividades.forEach(actividad => {
        contenidoReporte += `<li>${actividad.tipoActividad}: ${actividad.descripcion} (${actividad.cantidad})</li>`;
    });

    contenidoReporte += `</ul>`;

    document.getElementById('reporteContenido').innerHTML = contenidoReporte;

    // Mostrar el modal del reporte
    let modal = new bootstrap.Modal(document.getElementById('reporteModal'));
    modal.show();
}
