document.addEventListener('DOMContentLoaded', function () {
    // Actualizar la fecha y hora
    function updateDateTime() {
        const dateTimeElement = document.getElementById('date-time');
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        dateTimeElement.textContent = now.toLocaleDateString('es-ES', options);
    }

    // Llamar a la función inicialmente
    updateDateTime();

    // Actualizar cada segundo
    setInterval(updateDateTime, 1000);
});
