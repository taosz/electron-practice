const { app, BrowserWindow, Notification, ipcMain } = require('electron')

let win
app.on('ready', () => {
	win = new BrowserWindow({
		width: 300,
		height: 300,
		webPreferences: {
			nodeIntegration: true
		}
	})
	win.loadFile('./index.html')
	handleIPC()
})

function handleIPC() {
	console.log(1)
	ipcMain.handle('work-notification', async function() {
		console.log(2)
		let res = await new Promise((resolve, reject) => {
			let notification = new Notification({
				title: '任务结束',
				body: '是否休息',
				actions: [{ text: '休息', type: 'button' }],
				closeButtonText: '继续工作'
			})
			console.log(3)
			notification.show()
			console.log(4)
			notification.on('action', () => {
				console.log(arguments)
				resolve('rest')
			})
			notification.on('close', () => {
				console.log(arguments)
				resolve('work')
			})
		})
		return res
	})
}
