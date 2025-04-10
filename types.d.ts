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
    ymlToJson: IYaml;
}

interface IYaml {
    name: string;
    on: Array<string> | Array<object>;
    jobs: Record<string, object>

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
        ymlToJson: (path: string) => Promise<IYaml>;
    }
}
