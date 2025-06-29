let deferredPrompt;

// Boton de instalacion y div contenedor
const installApp = document.getElementById('buttonInstall');
const installAppDiv = document.getElementById('buttonInstallDiv');

// Si navegador es compatible y AWP no instalada...
window.addEventListener('beforeinstallprompt', (e) => {
    installAppDiv.removeAttribute('hidden');
    console.log("[ Install ] - Disponible");
    deferredPrompt = e;
});

// Agrega la funcion de instalar al boton
if (installApp) {
    installApp.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const userChoice = await deferredPrompt.userChoice;
            if (userChoice.outcome === 'accepted') {
                deferredPrompt = null;
                console.log("[ Install ] - Aceptado");
                installAppDiv.setAttribute('hidden', true);
            } else {
                console.log("[ Install ] - Rechazado");
            }
        }
    });
}

function logAppInstalled() {
    console.log("[ Install ] - Instalada PWA");
}
