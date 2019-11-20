/*** Productor ***/
const N = 100; // numero de mensajes que soporta el buffer
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**crea la clase mensaaje */
function Mensaje(elemento) {
    this.elemento = elemento;
    return this;
}
/** crea el producto aleatorio */
function producir_elemento(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/**envia el producto al consumidor */
function send(mensaje) {
    postMessage(mensaje);
    console.log("[Productor] Enviado: " + mensaje.elemento);

}
/**crea mensaje que contrenda el elemento */
function crear_mensaje(elemento) {
    return new Mensaje(elemento);
}

/** Recibe mensaje, esto es lo que se repetira */
onmessage = async (e) => {
    let elemento, m;

    // simular retraso al producir elemento
    elemento = producir_elemento(5);
    m = crear_mensaje(elemento);
    send(m);
};
