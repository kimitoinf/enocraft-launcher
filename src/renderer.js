const {ipcRenderer} = require('electron');

ipcRenderer.on('log-download', (event, data) =>
{
	document.getElementById('Log').value += data + "\n";
});

ipcRenderer.on('log-download-end', (event, data) =>
{
	document.getElementById('Log').scrollTop = document.getElementById('Log').scrollHeight;
});