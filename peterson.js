// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    self = this;


    this.bandera = ko.observableArray([0, 0]);
    this.turno = ko.observable(-1);
    this.finalizado = ko.computed(function () {
        return this.bandera()[0] === 0 && this.bandera()[1] === 0 && this.turno() >= 0;
    }, this);

    this.enSeccionCritica = ko.computed(function () {
        if (this.bandera()[0] === 1 && this.turno() === 0) {
            return 'Proceso 1';
        } else if (this.bandera()[1] === 1 && this.turno() === 1) {
            return 'Proceso 2';
        } else if (this.bandera()[0] === 1) {
            return 'Proceso 1';
        } else {
            return 'Proceso 2';
        }
    }, this);

    this.init = function () {
        // Buffers (Memoria compartida en Javascript)
        let buffBandera = new SharedArrayBuffer(2);
        let buffTurno = new SharedArrayBuffer(1);
        let arrBandera = new Int8Array(buffBandera);
        let arrTurno = new Int8Array(buffTurno);

        arrBandera[0] = 0;
        arrBandera[1] = 0;
        arrTurno[0] = null;

        self.turno(arrTurno[0]);
        self.bandera(arrBandera);

        for (let i = 0; i < 2; i++) {
            const worker = new Worker('worker.js');
            worker.onmessage = function (e) {
                self.bandera(Array.from(arrBandera));
                self.turno(arrTurno[0]);
            };
            worker.postMessage({buffBandera: buffBandera, i: i, buffTurno: buffTurno});
        }

    };

    this.init();

    return this;
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

