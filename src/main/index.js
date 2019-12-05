import { app, BrowserWindow } from 'electron'
import { menubar } from 'menubar';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let menuWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  // mainWindow = new BrowserWindow({
  //   useContentSize: true,
  //   width: 1000,
  //   height: 563,
  //   x: 100,
  //   y: 200
  // })

  // mainWindow.loadURL(winURL)

  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })

  // console.log('getPosition ---------  ', mainWindow.getPosition());
  // console.log('getSize ---------  ', mainWindow.getSize());

  menuWindow = menubar({
    index: winURL,
    browserWindow: {
      width: 300,
      height: 400,
    },
    webPreferences: {
      nodeIntegration: true
    }
  })

  // menuWindow.loadURL(winURL);

  menuWindow.on('closed', () => {
    menuWindow = null
  })
  console.log('menuWindow    ---- ', menuWindow.getOption('browserWindow'));
}

app.on('ready', () => {
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
