/*** Consumidor ***/
const N = 100; // numero de mensajes que soporta el buffer

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function extraer_elemento(mensaje) {
    let elemento = mensaje.elemento;
    delete mensaje.elemento;
    return elemento;
}

function consumir_elemento(elemento) {
    console.log("[Consumidor] Elemento procesado (invertido): " + elemento.split("").reverse().join(""));
}

onmessage = async (e) => {
    if (e.data === null) {
        postMessage(null);
    } else {
        let elemento = extraer_elemento(e.data);
        console.log("[Consumidor] Recibido: " + elemento);

        // Evitar consumo excesivo de mensajes (RAM/CPU)
        await sleep(1000);

        // Pedir otro
        postMessage(null);

        consumir_elemento(elemento);
    }
};
