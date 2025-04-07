import {app, BrowserWindow} from 'electron';
import path from 'path';

app.on('ready', () => {
    new BrowserWindow().loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));

});
