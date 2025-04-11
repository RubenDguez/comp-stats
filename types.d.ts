type Statistics = {
    cpuUsage: number;
    ramUsgae: number;
    storageUsage: number;
};

type StaticData = {
    totalStorage: number;
    cpuModel: string;
    totalMemoryGB: number;
}

type EventPayloadMapping = {
    statistics: Statistics;
    getStaticData: StaticData;
    exec: string
    loadFile: IFileContent;
    loadFilePath: string | null;
}

interface IJson {
    name: string;
    on: Array<string> | Array<object>;
    jobs: Record<string, object>
}

interface IFileContent {
    raw: string,
    json: IJson
}

interface IGitHubTriggers {
    on: string;
    normalized: string;
    Description: string;
}

interface Window {
    electron: {
        exec: (command: string) => Promise<string>;
        subscribeStaticstics: (callback: (statistics: Statistics) => void) => void;
        getStaticData: () => Promise<StaticData>;
        loadFile: (path: string) => Promise<IFileContent>;
        loadFilePath: () => Promise<string | null>;
    }
}
