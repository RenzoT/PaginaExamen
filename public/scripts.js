async function buscarPorID() {
    const id = document.getElementById('id').value;
    const examen = document.getElementById('examen').value;
    const ano = document.getElementById('ano').value;

    try {
        const response = await fetch(`/buscar?examen=${examen}&ano=${ano}&id=${id}`);
        const data = await response.json();

        if (data && data.nombre) {
            const resultadosDiv = document.querySelector('.resultados');
            resultadosDiv.style.display = 'block';
            resultadosDiv.innerHTML = `Nombre: ${data.nombre} | Puntaje: ${data.puntaje} | Sección: ${data.seccion}`;
        } else {
            alert('No se encontraron resultados.');
        }
    } catch (error) {
        alert('Ocurrió un error al buscar los resultados.');
    }
}
