const { app, BrowserWindow, ipcMain, Menu, globalShortcut } = require('electron');
const path = require('path');
const os = require('os');

const isDev = process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "development" ?true : false;

function createWindow() {
    const win = new BrowserWindow({
        width: isDev? 950 : 500,
        resizable: isDev?true:false,
        height: 300,
        backgroundColor: "#234",
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile("./src/index.html");
    if(isDev) { win.webContents.openDevTools();}

    win.once("ready-to-show", ()=>{
        win.show();
        setTimeout(()=>{
            win.webContents.send("cpu_name", os.cpus()[0].model);
        }, 3000);
    });

    const menuTemplate = [
        {label: app.name,
        submenu: [
            {label: 'Preferences', click:()=>{}},
            {label: 'Open destination folder', click:()=>{}}
        ]},
        {label: 'File',
            submenu: [
                {role: 'quit'}
            ]}
    ];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(()=>{
    createWindow();
});

app.on('will-quit', ()=>{
    globalShortcut.unregisterAll();
});


