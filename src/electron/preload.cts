const electron = require('electron');

function ipcInvoke<Key extends keyof EventPayloadMapping>(key: Key, args?: unknown): Promise<EventPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key, args);
}

function icpOn<Key extends keyof EventPayloadMapping>(key: Key, callback: (payload: EventPayloadMapping[Key]) => void) {
    const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);

    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStaticstics: (callback: (statistics: any) => void) => {
        icpOn('statistics', (stats: any) => {
            callback(stats);
        })
    },
    getStaticData: () => ipcInvoke('getStaticData'),
    exec: (command: string) => ipcInvoke('exec', command),
    loadFile: (path: string) => ipcInvoke('loadFile', path),
    loadFilePath: () => ipcInvoke('loadFilePath')
} satisfies Window['electron']);


