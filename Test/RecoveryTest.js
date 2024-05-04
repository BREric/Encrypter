const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

// Configurar el servicio de Chrome
const service = new chrome.ServiceBuilder(chromedriver.path).build();
chrome.setDefaultService(service);

const NUM_FRASES = 100;

async function ejecutarPrueba() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://juanestebanosma1012.github.io/Encrypter/');

        // Esperar a que la página cargue completamente
        await driver.wait(until.elementLocated(By.className('input')), 5000);

        // Ingresar frases y realizar encriptación y desencriptación
        for (let i = 1; i <= NUM_FRASES; i++) {
            let frase = `Frase de prueba ${i}`;

            // Ingresar la frase en el área de entrada
            let inputArea = await driver.findElement(By.className('input'));
            await inputArea.clear();
            await inputArea.sendKeys(frase);

            // Encriptar la frase
            let encryptButton = await driver.findElement(By.className('encrypt'));
            await encryptButton.click();

            // Esperar a que se muestre el resultado
            await driver.wait(until.elementLocated(By.className('textResult')), 5000);

            // Desencriptar la frase
            let decryptButton = await driver.findElement(By.className('decrypt'));
            await decryptButton.click();

            // Esperar a que se muestre el resultado
            await driver.wait(until.elementLocated(By.className('textResult')), 5000);

            // Validar que la frase encriptada y desencriptada sea correcta (opcional)
            let resultado = await driver.findElement(By.className('textResult')).getText();
            if (resultado !== frase) {
                console.log(`Error: La frase ${frase} no coincide con el resultado ${resultado}`);
            }

            // Validar que la frase se haya guardado en el localStorage
            let localStorageResultado = await driver.executeScript("return localStorage.getItem('resultado');");
            if (localStorageResultado !== frase) {
                console.log(`Error: La frase ${frase} no se ha guardado en el localStorage`);
            }
        }

        console.log('Prueba completada exitosamente.');

    } finally {
        await driver.quit();
    }
}

ejecutarPrueba();
