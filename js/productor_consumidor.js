// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
const TAMANO_BUFFER = 100;

function AppViewModel() {
    self = this;

    this.init = function () {

    };

    this.init();

    return this;
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

cargarCodigoProductorConsumidor();
