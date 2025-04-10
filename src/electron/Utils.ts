import path from 'path';
import { app, ipcMain, WebContents, WebFrameMain } from 'electron';
import { pathToFileURL } from 'url';

export default class Utils {
    public static readonly IS_DEV = process.env.NODE_ENV === 'development';
    public static readonly PRELOAD_PATH = path.join(app.getAppPath(), Utils.IS_DEV ? '.' : '..', 'dist-electron/preload.cjs');
    public static readonly UI_PATH = path.join(app.getAppPath(), '/dist-react/index.html');

    private static validateEventFrame(frame: WebFrameMain | null) {
        if (frame === null) return;
        if (Utils.IS_DEV && new URL(frame.url).host === 'localhost:5123') return;
        if (frame.url !== pathToFileURL(Utils.UI_PATH).toString()) throw new Error('Malicious event');
    }

    public static ipcHandle<Key extends keyof EventPayloadMapping>(key: Key, handler: (args?: string) => unknown) {
        ipcMain.handle(key, (event, args) => {
            Utils.validateEventFrame(event.senderFrame);
            return handler(args);
        });
    }

    public static ipcWebContentsSend<Key extends keyof EventPayloadMapping>(key: Key, webContents: WebContents, payload: EventPayloadMapping[Key]) {
        webContents.send(key, payload);
    }
}
