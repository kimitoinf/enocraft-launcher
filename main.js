const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow()
{
	const window = new BrowserWindow({
		width: 600,
		height: 600
	})
	window.setMenu(null)
	window.setResizable(false)
	window.loadFile('src/index.html')
}

app.whenReady().then(() => {
	createWindow()
	app.on('activate', function() {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit()
})