import { BrowserWindow } from "electron";
import { isDev } from "../config/config";

class MainWindow extends BrowserWindow {
  constructor(file) {
    super({
      title: "SysTop",
      width: isDev ? 800 : 355,
      height: 500,
      icon: "./assets/icons/icon.png",
      resizable: isDev ? true : false,
      show: false,
      opacity: 0.9,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: false,
      },
    });

    if (isDev) {
      this.webContents.openDevTools();
    }

    this.loadFile(file);
  }
}

export default MainWindow;
