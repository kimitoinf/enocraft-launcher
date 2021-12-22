const {ipcRenderer} = require('electron');

ipcRenderer.on('log-download', (event, data) =>
{
	document.getElementById('Log').value += data + "\n";
});

ipcRenderer.on('log-scroll', (event, data) =>
{
	document.getElementById('Log').scrollTop = document.getElementById('Log').scrollHeight;
});

ipcRenderer.on('message-login', (event, data) =>
{
	document.getElementById('Log').value += "All downloads completed. Log in." + "\n";
});