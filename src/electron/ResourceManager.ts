import osUtis from "os-utils";
import os from "os";
import fs from "fs";
import { BrowserWindow } from "electron";
import { COMMON } from "./Enums.js";
import Utils from "./Utils.js";
import { exec } from "child_process";

export default class ResourceManager {
  private static readonly POLLING_INTERVAL = 500;

  public static async exec(command: string | undefined): Promise<string> {
    if (!command) {
      return Promise.reject("Command is undefined");
    }
    return new Promise((resolve) => {
      exec(command + '|| true', (error, stdout) => {
        resolve(stdout.trim());
      });
    });
  }

  public static pollResources(mainWindow: BrowserWindow) {
    setInterval(async () => {
      const cpuUsage = await ResourceManager.getCpuUsage();
      const ramUsgae = ResourceManager.getRamUsage();
      const storageData = ResourceManager.getStorageData();

      Utils.ipcWebContentsSend(COMMON.STATISTICS, mainWindow.webContents, {
        cpuUsage,
        ramUsgae,
        storageUsage: storageData.usage,
      });
    }, ResourceManager.POLLING_INTERVAL);
  }

  public static staticData() {
    return {
      totalStorage: ResourceManager.getStorageData().total,
      cpuModel: os.cpus()[0].model,
      totalMemoryGB: Math.floor(osUtis.totalmem() / 1024),
    };
  }

  private static async getCpuUsage(): Promise<number> {
    return new Promise((resolve) => {
      osUtis.cpuUsage(resolve);
    });
  }

  private static getRamUsage() {
    return 1 - osUtis.freememPercentage();
  }

  private static getStorageData() {
    const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
      total: Math.floor(total / 1_000_000_000),
      usage: 1 - free / total,
    };
  }
}
