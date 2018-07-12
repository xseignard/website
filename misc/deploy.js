const dotenv = require('dotenv');
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

dotenv.config();

const config = {
	username: process.env.FTP_USERNAME,
	password: process.env.FTP_PASSWORD,
	host: process.env.FTP_HOST,
	port: parseInt(process.env.FTP_PORT, 10),
	localRoot: __dirname + '/../dist',
	remoteRoot: '/www',
	include: ['*.*'],
};

ftpDeploy.on('uploading', data => {
	console.log(`${data.transferredFileCount}/${data.totalFileCount}`);
	console.log(data.filename);
});

ftpDeploy.deploy(config, err => {
	if (err) console.log(err);
	else console.log('finished');
});
