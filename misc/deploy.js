const path = require('path');
const Client = require('ssh2-sftp-client');
const recursive = require('recursive-readdir');
const uniq = require('lodash/uniq');
const sftp = new Client();

require('dotenv').config();

const dirRegExp = /\/(.*\/|)(.*)$/g;

let i = 0;
const putDir = (localDir, remoteDir, sftp) => {
	return new Promise((resolve, reject) => {
		recursive(localDir, ['.DS_Store'])
			.then(files =>
				files
					.map(file => file.replace(localDir, ''))
					.map(file => file.replace(dirRegExp, `$1`))
					.filter(Boolean)
			)
			.then(uniq)
			.then(dirs => Promise.all(dirs.map(dir => sftp.mkdir(`${remoteDir}/${dir}`, true))))
			.then(() => recursive(localDir, ['.DS_Store']))
			.then(files =>
				files
					.map(file => file.replace(localDir, ''))
					.map(file => file.replace(dirRegExp, `$1`) + file.replace(dirRegExp, `$2`))
			)
			.then(files =>
				Promise.all(
					files.map(file => {
						i++;
						console.log(`${i}/${files.length}`);
						return sftp.put(`${localDir}/${file}`, `${remoteDir}/${file}`);
					})
				)
			)
			.then(resolve)
			.catch(err => reject(Error(err)));
	});
};

sftp.connect({
	host: process.env.FTP_HOST,
	port: process.env.FTP_PORT,
	username: process.env.FTP_USER,
	password: process.env.FTP_PASSWORD,
}).then(() => {
	console.log('Connected');
	putDir(path.join(__dirname, '../dist'), 'www', sftp)
		.then(() => {
			console.log('Done');
			process.exit(0);
		})
		.catch(err => {
			console.log(err);
			process.exit(1);
		});
});
