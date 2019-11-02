
const errLogger = (msg) => {
	console.error(`${new Date()}\t${msg}`);
};

// ---------------Init express---------------
const server = require('./server');

process.on('uncaughtException', (err) => {
	errLogger(`Process crashed.\n${err.message}`);
	// console.log('端口冲突，给定地址已被占用');
	if (err.code === 'EADDRINUSE') {
		process.exit(1);
	} else {
		// remoteLogger.logProcess({
		// 	message: err.message,
		// 	stack: err.stack,
		// });
	}
});

process.on('SIGINT', () => {
	Promise
		.all([
			server.close(),
		])
		.then(() => server.closeLog())
		.catch((err) => {
			errLogger(`Server shutdown with error.${err.message}`);
		})
		.then(() => {
			process.exit();
		});
});
