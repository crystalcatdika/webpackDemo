const express = require('express');
const log4js = require('log4js');
const path = require('path');
const multiparty = require('multiparty');
const excel = require('./server/helper/excel');


const uploadPath = path.join(__dirname, 'upload');

log4js.configure({
	appenders: {
		stdout: { type: 'stdout'},
		http: { type: 'file', filename: './log/http.log' },
	},
	categories: {
		default: { appenders: ['stdout'], level: 'debug' },
		http: { appenders: ['http', 'stdout'], level: 'info'}
	}
});
const logger = log4js.getLogger();
const loggerHttp = log4js.getLogger('http');


const app = express();
const router = express.Router();


const { PORT, NODE_ENV} = process.env;
app.listen(PORT, function () {
	logger.info(`Express server listening on port ${PORT} ${NODE_ENV}`);
});

app.use(log4js.connectLogger(loggerHttp, { level: 'auto' }));


app.use('/api', router);

router.post('/home/geBatchQr', (req, res, next) => {
	let timeRange;
	const form = new multiparty.Form({
		autoFiles: true,
		uploadDir: uploadPath,
	});

	form.on('error', (err) => {
		next(err);
	});

	form.on('field', (time, value) => {
		timeRange = JSON.parse(value);
	});

	form.on('file', (name, file) => {
		const data = excel.parse(file.path);
		res.send({data});
	});

	form.parse(req);
});

// router.get('/', function(req, res) {
// 	res.send('<h1>Hello World</h1>');
// });
