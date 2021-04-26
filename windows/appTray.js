import { app, Menu, Tray } from "electron";

class AppTray extends Tray {
  constructor(icon, mainWindow) {
    super(icon);

    this.setToolTip("SysTop");
    this.mainWindow = mainWindow;

    this.on("click", this.onClick);
    this.on("right-click", this.onRightClick);
  }

  onClick = () => {
    if (this.mainWindow.isVisible() === true) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.show();
    }
  };

  onRightClick = () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          app.isQuitting = true;
          app.quit();
        },
      },
    ]);

    this.popUpContextMenu(contextMenu);
  };
}

export default AppTray;
