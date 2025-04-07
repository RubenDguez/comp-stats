import {app, BrowserWindow} from 'electron';
import path from 'path';
import Utils from './Utils.js';

app.on('ready', () => {
    if (Utils.IS_DEV) {
        new BrowserWindow().loadURL('http://localhost:5123');
        return;
    }

    new BrowserWindow().loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
});
