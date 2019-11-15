function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cargarCodigoPeterson() {
    let codeWorker = CodeMirror(document.getElementById('codeWorker'), {
        value: "Cargando...",
        mode: "javascript",
        json: true,
        readOnly: true,
        theme: "dracula",
        lineNumbers: true
    });

    let codePeterson = CodeMirror(document.getElementById('codePeterson'), {
        value: "Cargando...",
        mode: "javascript",
        json: true,
        readOnly: true,
        theme: "dracula",
        lineNumbers: true
       
    });


    let requestWorker = new XMLHttpRequest();
    requestWorker.open('GET', 'js/worker.js', true);

    requestWorker.send(null);
    requestWorker.onreadystatechange = function () {
        if (requestWorker.readyState === 4 && requestWorker.status === 200) {
            codeWorker.doc.setValue(requestWorker.responseText);
        }
    };


    let requestPeterson = new XMLHttpRequest();
    requestPeterson.open('GET', 'js/peterson.js', true);

    requestPeterson.send(null);
    requestPeterson.onreadystatechange = function () {
        if (requestPeterson.readyState === 4 && requestPeterson.status === 200) {
            codePeterson.doc.setValue(requestPeterson.responseText);
        }
    };
}


function cargarCodigoProductorConsumidor() {
    let codeMain = CodeMirror(document.getElementById('codeMain'), {
        value: "Cargando...",
        mode: "javascript",
        json: true,
        readOnly: true,
        theme: "dracula",
        lineNumbers: true
    });

    let codeProducer = CodeMirror(document.getElementById('codeProducer'), {
        value: "Cargando...",
        mode: "javascript",
        json: true,
        readOnly: true,
        theme: "dracula",
        lineNumbers: true
    });

    let codeConsumer = CodeMirror(document.getElementById('codeConsumer'), {
        value: "Cargando...",
        mode: "javascript",
        json: true,
        readOnly: true,
        theme: "dracula",
        lineNumbers: true
    });

    let requestMain = new XMLHttpRequest();
    requestMain.open('GET', 'js/main.js', true);

    requestMain.send(null);
    requestMain.onreadystatechange = function () {
        if (requestMain.readyState === 4 && requestMain.status === 200) {
            codeMain.doc.setValue(requestMain.responseText);
        }
    };

    let requestProducer = new XMLHttpRequest();
    requestProducer.open('GET', 'js/productor.js', true);

    requestProducer.send(null);
    requestProducer.onreadystatechange = function () {
        if (requestProducer.readyState === 4 && requestProducer.status === 200) {
            codeProducer.doc.setValue(requestProducer.responseText);
        }
    };

    let requestConsumer = new XMLHttpRequest();
    requestConsumer.open('GET', 'js/consumidor.js', true);

    requestConsumer.send(null);
    requestConsumer.onreadystatechange = function () {
        if (requestConsumer.readyState === 4 && requestConsumer.status === 200) {
            codeConsumer.doc.setValue(requestConsumer.responseText);
        }
    };
}
