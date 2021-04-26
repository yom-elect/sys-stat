import { app, BrowserWindow, Menu, ipcMain } from "electron";
import { isMac } from "./config/config";
import path from "path";
import MainWindow from "./windows/mainWindow";
import menu from "./windows/windowMenu/menu";
import Store from "./windows/store";
import AppTray from "./windows/appTray";

let mainWindow;
let tray;

// Init store and Storage
export const store = new Store({
  configName: "user-settings",
  defaults: {
    settings: {
      cpuOverload: 80,
      alertFrequency: 5,
    },
  },
});

const createMainWindow = () => {
  const windowPath = "./app/index.html";
  mainWindow = new MainWindow(windowPath);
};

app.on("ready", () => {
  createMainWindow();

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.webContents.send("settings:get", store.get("settings"));
  });

  const mainMenu = Menu.buildFromTemplate(menu(mainWindow));
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("close", (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }

    return true;
  });

  const icon = path.join(__dirname, "assets", "icons", "tray_icon.png");
  // create tray
  tray = new AppTray(icon, mainWindow);

  mainWindow.on("ready", () => (mainWindow = null));
});

// Set Settings
ipcMain.on("settings:set", (e, value) => {
  store.set("settings", value);
  mainWindow.webContents.send("settings:get", store.get("settings"));
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
