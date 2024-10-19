// Array de personal
let personal = [];
let indexAEditar = -1;  // Variable global para guardar el índice del personal que se está editando

// Función para agregar o editar personal
document.getElementById('formPersonal').addEventListener('submit', function (e) {
    e.preventDefault();
    
    let nombre = document.getElementById('nombre').value;
    let rol = document.getElementById('rol').value;
    let permisos = document.getElementById('permisos').value;

    if (indexAEditar === -1) {
        // Si no estamos editando, agregar nuevo personal
        personal.push({ nombre, rol, permisos });
    } else {
        // Si estamos editando, actualizar el personal existente
        personal[indexAEditar] = { nombre, rol, permisos };
        indexAEditar = -1;  // Resetear el índice después de editar
    }

    // Actualizar la tabla de personal
    actualizarTablaPersonal();

    // Limpiar el formulario y cerrar el modal
    document.getElementById('formPersonal').reset();
    let modal = bootstrap.Modal.getInstance(document.getElementById('personalModal'));
    modal.hide();
});

// Función para actualizar la tabla de personal
function actualizarTablaPersonal() {
    let tabla = document.getElementById('tablaPersonal');
    tabla.innerHTML = '';
    
    personal.forEach((persona, index) => {
        let row = `
            <tr>
                <td>${persona.nombre}</td>
                <td>${persona.rol}</td>
                <td>${persona.permisos}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarPersonal(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPersonal(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += row;
    });
}

// Función para editar personal
function editarPersonal(index) {
    let persona = personal[index];
    
    // Cargar los datos del personal en el formulario
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('rol').value = persona.rol;
    document.getElementById('permisos').value = persona.permisos;

    // Guardar el índice del personal que se está editando
    indexAEditar = index;

    // Mostrar el modal para editar personal
    let modal = new bootstrap.Modal(document.getElementById('personalModal'));
    modal.show();
}

// Función para eliminar personal
function eliminarPersonal(index) {
    personal.splice(index, 1);
    actualizarTablaPersonal();
}

// Función para filtrar personal por rol
function filtrarPorRol() {
    let rolSeleccionado = document.getElementById('filtroRol').value;
    
    if (rolSeleccionado === "Todos") {
        actualizarTablaPersonal();
    } else {
        let tabla = document.getElementById('tablaPersonal');
        tabla.innerHTML = '';
        
        personal.filter(persona => persona.rol === rolSeleccionado)
        .forEach((persona, index) => {
            let row = `
                <tr>
                    <td>${persona.nombre}</td>
                    <td>${persona.rol}</td>
                    <td>${persona.permisos}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarPersonal(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarPersonal(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += row;
        });
    }
}
