import { app, BrowserWindow } from 'electron';
import Utils from './Utils.js';
import ResourceManager from './ResourceManager.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: Utils.PRELOAD_PATH,
        }
    })

    if (Utils.IS_DEV) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(Utils.UI_PATH);
    }

    ResourceManager.pollResources(mainWindow);

    Utils.ipcHandle('getStaticData', () => {
        return ResourceManager.staticData();
    })
    Utils.ipcHandle('exec', (args: string | undefined) => {
        return ResourceManager.exec(args)
    })
    Utils.ipcHandle('loadFile', (args: string | undefined) => {
        return ResourceManager.loadFile(args)
    })
    Utils.ipcHandle('loadFilePath', () => {
        return ResourceManager.loadFilePath()
    })
});
