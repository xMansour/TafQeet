//app object -> the electronJS application object
//BrowserWindow -> creates a new web page that runs in the renderer process
//path object -> the path is used to enable you to work with the project directory
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require('path')



//createWindow function -> this function uses the BrowserWindow object to create a new 800px by 600px 
//browser window that loads the index.html file from the project’s root.
function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    icon: __dirname + "/icons/exchange.png",
    webPreferences: {
      nodeIntegration: true,    //gives access to the nodeJS api
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: false,
      preload: path.join(__dirname, '/scripts/preload.js')
    }
  })
  win.loadFile('index.html')
  win.setResizable(false);
  win.setMenuBarVisibility(false);
}


//The createWindow() only gets called when the ready event is emitted on the app. 
//The web page needs to wait for this event because some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()


  //to ensure that the application boots up when its icon is clicked in the operating system’s 
  //application dock when there are no windows open.  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

if (process.platform === 'win32') {
  app.setAppUserModelId(app.name);
}



//to take care of an issue on some operating systems where the application still remains active 
//even after all windows have been closed. This often occurs on non-MacOS platforms

//This code instructs the app to listen for the window-all-closed event, 
//which is fired when all windows created by the Main process have been closed. 
//It then checks if the platform is MacOS and if not, it explicitly quits the application, 
//ending the Main process and thus terminating the application.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//handles the notification sent from the views.js file 
ipcMain.handle('show-notification', (event, ...args) => {
  const notification = {
    title: 'نسخ',
    body: `${args[0]}`,
    icon: __dirname + "/icons/exchange.png"
  }

  new Notification(notification).show()
});