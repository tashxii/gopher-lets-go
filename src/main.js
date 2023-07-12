//main.js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const info = {
  win: null,
  images: {}
}

global.info = info

let win
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600, resizable: true })
  info.win = win
  win.webContents.openDevTools()

  const files = fs.readdirSync(path.join(__dirname, '/../build/images'))
  files.forEach((file) => {
    const ext = path.extname(file)
    if (ext === '.png' || ext === '.jpg') {
      const binary = fs.readFileSync(path.join(__dirname, '/../build/images/' + file))
      const base64data = Buffer.from(binary).toString('base64')
      info.images[file] = {
        type: ext.substring(1),
        name: file,
        data: base64data
      }
    }
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  //win.webContents.openDevTools()
  win.setMenu(null)
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
