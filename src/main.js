const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const wget = require('wget-improved');

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
	//window.webContents.openDevTools();
	window.loadFile('src/index.html');
	const server = "http://168.138.6.9/";
	var prevProgress = -1;
	wget.download(server + "forge-installer.jar", path.join(os.tmpdir(), "forge-installer.jar"), {}).on('progress', function(progress)
	{
		var percent = Math.floor(progress * 100);
		if (prevProgress !== percent)
		{
			window.webContents.send('log-download', "Forge installer download... " + String(percent) + "%");
			prevProgress = percent;
		}
	}).on('end', function(end)
	{
		window.webContents.send('log-scroll', 'dummy');
		wget.download(server + "CocoaInput-1.17.1-forge-4.0.4.jar", path.join(os.tmpdir(), "CocoaInput-1.17.1-forge-4.0.4.jar"), {}).on('progress', function(progress)
		{
			var percent = Math.floor(progress * 100);
			if (prevProgress !== percent)
			{
				window.webContents.send('log-download', "Mod: CocoaInput download... " + String(percent) + "%");
				prevProgress = percent;
			}
		}).on('end', function(end)
		{
			window.webContents.send('log-scroll', 'dummy');
			wget.download(server + "OptiFine_1.17.1_HD_U_H1_MOD.jar", path.join(os.tmpdir(), "OptiFine_1.17.1_HD_U_H1_MOD.jar"), {}).on('progress', function(progress)
			{
				var percent = Math.floor(progress * 100);
				if (prevProgress !== percent)
				{
					window.webContents.send('log-download', "Mod: OptiFine download... " + String(percent) + "%");
					prevProgress = percent;
				}
			}).on('end', function(end)
			{
				window.webContents.send('log-scroll', 'dummy');
				wget.download(server + "wthit-forge-3.11.2.jar", path.join(os.tmpdir(), "wthit-forge-3.11.2.jar"), {}).on('progress', function(progress)
				{
					var percent = Math.floor(progress * 100);
					if (prevProgress !== percent)
					{
						window.webContents.send('log-download', "Mod: wthit download... " + String(percent) + "%");
						prevProgress = percent;
					}
				}).on('end', function(end)
				{
					window.webContents.send('log-scroll', 'dummy');
					wget.download(server + "Xaeros_Minimap_FP21.22.3_Forge_1.17.1.jar", path.join(os.tmpdir(), "Xaeros_Minimap_FP21.22.3_Forge_1.17.1.jar"), {}).on('progress', function(progress)
					{
						var percent = Math.floor(progress * 100);
						if (prevProgress !== percent)
						{
							window.webContents.send('log-download', "Mod: Xaero's Minimap download... " + String(percent) + "%");
							prevProgress = percent;
						}
					}).on('end', function(end)
					{
						window.webContents.send('log-scroll', 'dummy');
						fs.exists(path.join(os.tmpdir(), 'openjdk-17.0.1_windows-x64_bin.zip'), function(exists)
						{
							if (!exists)
							{
								wget.download(server + "openjdk-17.0.1_windows-x64_bin.zip", path.join(os.tmpdir(), "openjdk-17.0.1_windows-x64_bin.zip"), {}).on('progress', function(progress)
								{
									var percent = Math.floor(progress * 100);
									if (prevProgress !== percent)
									{
										window.webContents.send('log-download', "Java runtime download... " + String(percent) + "%");
										prevProgress = percent;
									}
								}).on('end', function(end)
								{
									window.webContents.send('log-scroll', 'dummy');
								});
							}
							window.webContents.send('message-login', 'dummy');
						});
					});
				});
			});
		});
	});
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