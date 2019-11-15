// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
const TAMANO_BUFFER = 100;


function Mensaje(elemento) {
    this.elemento = elemento;

    return this;
}

const N = 100; // numero de mensajes que soporta el buffer


function AppViewModel() {
    self = this;

    // Crea un area compartida en la memoria, tamaño N
    let bufferMensajes = new SharedArrayBuffer(N);

    let mensajes = new Int32Array(bufferMensajes);


    this.init = function () {


        const productor = new Worker('js/productor.js');
        const consumidor = new Worker('js/consumidor.js');
        // Mensaje recibido de productor, devolver a consumidor
        productor.onmessage = function (e) {
            consumidor.postMessage(e.data);
        };


        // Mensaje recibido de consumidor, devolver a productor
        consumidor.onmessage = function (e) {
            productor.postMessage(e.data);
        };

        consumidor.postMessage(null);

    };


    this.init();

    return this;
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

cargarCodigoProductorConsumidor();
