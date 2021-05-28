const {app,globalShortcut,screen,BrowserWindow,remote,dialog,ipcMain,Menu} = require('electron');
//若不在主进程就需要remote引入，用户权限激活?
let mainWindow = null;   //声明要打开的主窗口
//注册exec

const path = require('path')

const exec1 = require('child_process')
//屏幕缩放比
const dp = 1.0
const xx = 1920
const yy = 1080
app.on('ready', () => {
    Menu.setApplicationMenu(null)
    mainWindow = new BrowserWindow({
        width: (xx*0.618/dp-(xx*0.618/dp)%1),
        height: (yy*0.618/dp-(yy*0.618/dp)%1),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        }
    })
    mainWindow.loadFile('index.html')
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        //注销全局快捷键
        globalShortcut.unregister("alt+f")
        globalShortcut.unregisterAll()
        mainWindow = null
    })
    //o world hello world
    let startStatus = false;
    ipcMain.on('startStatus',(sys,msg)=>{
        startStatus = msg
    })

    globalShortcut.register('alt+f', function () {
        if(startStatus){
            if(!globalShortcut.isRegistered('alt+f')){
                dialog.showErrorBox('快捷键Alt+F绑定失败','检查是否被其他应用占用')
            }else{
                const {x, y} = screen.getCursorScreenPoint();//获取到鼠标的横坐标和纵坐标
                console.log(x, y)
                // runExec((x*2/dp-(x*dp)%1), (y*2/dp-(y*dp)%1));
                runExec(x,y);
            }
        }else{
            dialog.showErrorBox('您暂未开启辅助','请单击主页面”开始辅助“')
        }
    })

})


function runExec(x, y) {
    console.log(path.join(__dirname))
    exec1.exec(path.join(__dirname,"./static/display/display -y=") + y, function (error, stdout, stderr) {
        const fun1 = require(path.join(__dirname,"./static/render/diedie"));
        fun1.abc(x, 50);
    })
}