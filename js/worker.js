function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function _seccion_critica(proceso) {
    console.log("Es mi turno! " + (proceso + 1));

    // Tiempo aleatorio para la sección critica del proceso
    const tiempo = Math.round(Math.random() * 5000 + 2000);
    console.log("[" + (proceso + 1) + "] Inicio de mi sección critica (espera de " + tiempo / 1000 + " segundos)");
    await sleep(tiempo);
    console.log("[" + (proceso + 1) + "] Fin de mi sección critica");
}

onmessage = async (e) => {
    // En Javascript la memoria compartida es por buffers
    let bandera = new Int8Array(e.data.buffBandera);
    let turno = new Int8Array(e.data.buffTurno);

    // Indice del proceso (0 - Proceso 1, 1 - Proceso 2)
    let proceso = e.data.i;
    bandera[proceso] = 1; // Colocar la bandera
    turno[0] = 1 - proceso; // Pedir el turno
    postMessage(null); // Actualizar vista

    while (bandera[1 - proceso] === 1 && turno[0] === 1 - proceso) {
        await sleep(100); // retraso entre chequeo de banderas, evita overhead en javascript
    }

    /*** Inicio de la sección critica ***/
    postMessage(null); // Actualizar vista

    // Ejecutar sección critica del proceso
    await _seccion_critica(proceso);

    /*** Fin de la sección critica ***/

    bandera[proceso] = 0; // Quitar la bandera

    postMessage(null); // Actualizar vista
};
