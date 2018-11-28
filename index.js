const electron = require('electron');
const app = electron.app;
const path = require('path');
const BrowserWindow = electron.BrowserWindow;


let loadUrl;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 1000,
        frame: true,
        transparent: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.setMenu(null);
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.webContents.openDevTools({mode: 'detach'});
}


app.on('ready', createWindow);


app.on('window-all-closed', () => {
    app.quit();
});


app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
