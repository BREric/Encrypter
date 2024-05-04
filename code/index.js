const encryptButton = document.querySelector(".encrypt");
const decryptButton = document.querySelector(".decrypt");

const inputArea = document.querySelector(".input");
const resultArea = document.querySelector(".result");

const messageNotFound = `<img src="../resources/Muñeco.png" alt="Imagen que representa que ningun mensaje ha sido procesado"
class="messageNotFound">
<h2>Ningún mensaje fue encontrado</h2>
<p>Ingresa el texto que desees encriptar o desencriptar</p>`

const htmlButton = "<button class='btnCopy' onclick='copy()'>Copiar</button>";

const conversion = {

    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"

}

const vocales = Object.keys(conversion);

encryptButton.onclick = () => {

    let texto = inputArea.value;
    if (validarTexto(texto)) {
        resultArea.innerHTML = `<textarea class='textResult' disabled>${encriptarTexto(texto)}</textarea>${htmlButton}`;
        inputArea.value = "";
    } else {
        resultArea.innerHTML = messageNotFound;
    }

}

decryptButton.onclick = () => {

    let texto = inputArea.value;
    if (validarTexto(texto)) {
        resultArea.innerHTML = `<textarea class='textResult' disabled>${desencriptarTexto(texto)}</textarea>${htmlButton}`;
        inputArea.value = "";
    } else {
        resultArea.innerHTML = messageNotFound;
    }

}

// TODO: cambio para la ejecucion de la prueba de recuperacion
// almacenar el resultado en el local storage cada vez que el "resultArea" cambie
resultArea.addEventListener("DOMSubtreeModified", () => {
    
        let textResult = document.querySelector(".textResult");
        if (textResult) {
            persistValueInLocalStorage(textResult.value);
        }

})

// cuando el documento se cargue, se verifica si existe un resultado almacenado en el local storage y se muestra en el "resultArea"
document.addEventListener("DOMContentLoaded", () => {
    
        let resultado = localStorage.getItem("resultado");
        if (resultado) {
            resultArea.innerHTML = `<textarea class='textResult' disabled>${resultado}</textarea>${htmlButton}`;
        } else {
            resultArea.innerHTML = messageNotFound;
        }
    
})

function copy() {

    const textResult = document.querySelector(".textResult");
    if (textResult) {

        textResult.select();
        navigator.clipboard.writeText(textResult.value);

        cambiarEstiloBotonCopiar();
    }

}

function cambiarEstiloBotonCopiar() {

    let buttonCopy = document.querySelector(".btnCopy");
    buttonCopy.textContent = "Copiado";
    buttonCopy.classList.add("copiarPresionado");

    setTimeout(() => {

        buttonCopy.textContent = "Copiar";
        buttonCopy.classList.remove("copiarPresionado");

    }, 1000);

}

function validarTexto(texto) {
    return texto !== "";
}

function encriptarTexto(texto) {

    let auxText = "";
    for (let i = 0; i < texto.length; i++) {

        let element = texto[i];
        if (Object.keys(conversion).indexOf(element) !== -1) {
            auxText += conversion[element];
        } else {
            auxText += element;
        }
    }

    return auxText;
}

function desencriptarTexto(texto) {

    let auxText = "";
    Object.values(conversion).forEach((value, index, array) => {

        auxText = texto.replace(new RegExp(value, "g"), getKeyByValue(conversion, value));
        texto = auxText;

    })

    return texto;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// TODO: cambio para la ejecucion de la prueba de recuperacion
function persistValueInLocalStorage(texto) {
    localStorage.setItem("resultado", texto);
}