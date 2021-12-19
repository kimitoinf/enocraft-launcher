const {Client, Authenticator} = require('minecraft-launcher-core');
const launcher = new Client();
const msmc = require('msmc');
const fetch = require('node-fetch');
const path = require('path');
const os = require('os');
const fs = require('fs');

function Login()
{
	document.getElementById('Login').disabled = true;
	document.getElementById('MicrosoftLogin').disabled = true;
	var id = document.getElementById('ID').value;
	var password = document.getElementById('Password').value;
	var isSuccess = true;
	Authenticator.getAuth(id, password).catch(() =>
	{
		isSuccess = false;
		Run(isSuccess);
	}).then(() =>
		{
			if (isSuccess)
			{
				Run(isSuccess, Authenticator.getAuth(id, password));
			}
		});
}

function MicrosoftLogin()
{
	document.getElementById('Login').disabled = true;
	document.getElementById('MicrosoftLogin').disabled = true;
	msmc.setFetch(fetch);
	msmc.fastLaunch("raw", (update) =>
	{
		document.getElementById('Log').value += update.data + '\n';
	}).then(result =>
		{
			if (msmc.errorCheck(result))
			{
				alert('Login Error!\n' + result.reason);
				return;
			}
			Run(true, msmc.getMCLC().getAuth(result));
		});
}

function Run(isSuccess, auth = null)
{
	if (isSuccess)
	{
		var modsfolder = path.join(os.homedir(), 'enocraft', 'mods');
		if (!fs.existsSync(modsfolder))
		{
			fs.mkdirSync(modsfolder, {recursive: true});
		}
		fs.createReadStream(path.join(os.tmpdir(), 'CocoaInput-1.17.1-forge-4.0.4.jar')).pipe(fs.createWriteStream(path.join(modsfolder, 'CocoaInput-1.17.1-forge-4.0.4.jar')));
		fs.createReadStream(path.join(os.tmpdir(), 'OptiFine_1.17.1_HD_U_H1_MOD.jar')).pipe(fs.createWriteStream(path.join(modsfolder, 'OptiFine_1.17.1_HD_U_H1_MOD.jar')));
		fs.createReadStream(path.join(os.tmpdir(), 'wthit-forge-3.11.2.jar')).pipe(fs.createWriteStream(path.join(modsfolder, 'wthit-forge-3.11.2.jar')));
		fs.createReadStream(path.join(os.tmpdir(), 'Xaeros_Minimap_FP21.22.3_Forge_1.17.1.jar')).pipe(fs.createWriteStream(path.join(modsfolder, 'Xaeros_Minimap_FP21.22.3_Forge_1.17.1.jar')));
		let option =
		{
			clientPackage: null,
			authorization: auth,
			root: path.join(os.homedir(), "enocraft"),
			forge: path.join(os.tmpdir(), 'forge-installer.jar'),
			version:
			{
				number: "1.17.1",
				type: "release"
			},
			memory:
			{
				max: "4G",
				min: "1G"
			},
			server:
			{
				host: "168.138.6.9"
			}
		};
		launcher.launch(option);
		launcher.on('debug', (e) => document.getElementById('Log').value += e);
		launcher.on('data', (e) => document.getElementById('Log').value += e);
	}
	else
	{
		alert('Login Error!');
		document.getElementById('Login').disabled = false;
		document.getElementById('MicrosoftLogin').disabled = false;
	}
}