function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let codeWorker = CodeMirror(document.getElementById('codeWorker'), {
    value: "Cargando...",
    mode: "javascript",
    json: true,
    readOnly: true
});

let codePeterson = CodeMirror(document.getElementById('codePeterson'), {
    value: "Cargando...",
    mode: "javascript",
    json: true,
    readOnly: true
});


let requestWorker = new XMLHttpRequest();
requestWorker.open('GET', 'worker.js', true);

requestWorker.send(null);
requestWorker.onreadystatechange = function () {
    if (requestWorker.readyState === 4 && requestWorker.status === 200) {
        codeWorker.doc.setValue(requestWorker.responseText);
    }
};


let requestPeterson = new XMLHttpRequest();
requestPeterson.open('GET', 'peterson.js', true);

requestPeterson.send(null);
requestPeterson.onreadystatechange = function () {
    if (requestPeterson.readyState === 4 && requestPeterson.status === 200) {
        codePeterson.doc.setValue(requestPeterson.responseText);
    }
};

