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
}

interface Window {
    electron: {
        exec: (command: string) => Promise<string>;
        subscribeStaticstics: (callback: (statistics: Statistics) => void) => void;
        getStaticData: () => Promise<StaticData>;
    }
}
