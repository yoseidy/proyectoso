// View Modeñ de algoritmo Peterson
function AppViewModel() {
    self = this;

    /** Variable en la vista */
    this.bandera = ko.observableArray([0, 0]);
    this.turno = ko.observable(-1);
    this.finalizado = ko.computed(function () {
        return this.bandera()[0] === 0 
        && this.bandera()[1] === 0 && this.turno() >= 0;
    }, this);
    /** Donde se puede determinar quien esta en seccion critica */
    this.enSeccionCritica = ko.computed(function () {
        if (this.bandera()[0] === 1 && this.turno() === 0) {
            return 'Proceso 1';
        } else if (this.bandera()[1] === 1 && this.turno() === 1){
            return 'Proceso 2';
        } else if (this.bandera()[0] === 1) {
            return 'Proceso 1';
        } else {
            return 'Proceso 2';
        }
    }, this);

    this.init = function () {
        // Buffers (Memoria compartida en Javascript)
        /* espacio que estoy reservando en memoria para cada arreglo*/
        let buffBandera = new SharedArrayBuffer(2);
        let buffTurno = new SharedArrayBuffer(1);
        let arrBandera = new Int8Array(buffBandera);
        let arrTurno = new Int8Array(buffTurno);
        /**inicializo */
        arrBandera[0] = 0;
        arrBandera[1] = 0;
        /**no es necesario asignar un turno */
        arrTurno[0] = null; 
        

        self.turno(arrTurno[0]);
        self.bandera(arrBandera);

        for (let i = 0; i < 2; i++) {
            const worker = new Worker('js/worker.js');
            /**creando los procesos */
            worker.onmessage = function (e) {
                self.bandera(Array.from(arrBandera));
                self.turno(arrTurno[0]);
            };
            /**iniciando los procesos */
            worker.postMessage({buffBandera: 
                buffBandera, i: i, buffTurno: buffTurno});
        }

    };

    this.init();

    return this;
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

// Mostrar cajas de texto con el código
cargarCodigoPeterson();

