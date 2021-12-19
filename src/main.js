const {app, BrowserWindow} = require('electron');
const {download} = require('electron-dl');
const path = require('path');
const os = require('os');
const fs = require('fs');

function createWindow()
{
	const window = new BrowserWindow({
		width: 700,
		height: 550,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		},
		icon: path.join(__dirname, 'src/images/Icon.png')
	});
	window.setMenu(null);
	window.setResizable(false);
	window.loadFile('src/index.html');
	const server = "http://168.138.6.9/";
	download(BrowserWindow.getFocusedWindow(), server + "forge-installer.jar", {directory: os.tmpdir(), overwrite: true});
	download(BrowserWindow.getFocusedWindow(), server + "CocoaInput-1.17.1-forge-4.0.4.jar", {directory: os.tmpdir(), overwrite: true});
	download(BrowserWindow.getFocusedWindow(), server + "OptiFine_1.17.1_HD_U_H1_MOD.jar", {directory: os.tmpdir(), overwrite: true});
	download(BrowserWindow.getFocusedWindow(), server + "wthit-forge-3.11.2.jar", {directory: os.tmpdir(), overwrite: true});
	download(BrowserWindow.getFocusedWindow(), server + "Xaeros_Minimap_FP21.22.3_Forge_1.17.1.jar", {directory: os.tmpdir(), overwrite: true});
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', function() {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	})
});

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit();
});