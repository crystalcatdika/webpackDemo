const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const log4js = require('log4js');
// const multer  = require('multer');
const path = require('path');
const multiparty = require('multiparty');
const unlinkFile = require('fs').unlink;
const excel = require('./helper/excel');
const { PATH } = require('../config');


const uploadPath = path.join(__dirname, '..', 'upload');

log4js.configure({
	appenders: {
		stdout: { type: 'stdout' },
		http: { type: 'file', filename: './log/http.log' },
		request: { type: 'dateFile', pattern: '-dd-hh.log', filename: './log/request.log' },
		error: { type: 'dateFile', pattern: '-dd-hh.log', filename: './log/error.log' },
	},
	categories: {
		default: { appenders: ['stdout'], level: 'debug' },
		http: { appenders: ['http', 'stdout'], level: 'info' },
		request: { appenders: ['request', 'stdout'], level: 'info' },
		error: { appenders: ['error', 'stdout'], level: 'error' },
	}
});
const logger = log4js.getLogger();
const loggerHttp = log4js.getLogger('http');
const loggerRequest = log4js.getLogger('request');
const loggerError = log4js.getLogger('error');


const app = express();

// 在Nodejs原生的http模块中，请求体是要基于流的方式来接受和解析, req.on() 解析req.body
// 解析 application/json 请求体json格式
app.use(bodyParser.json({
	limit: '5mb',
}));

// 解析 application/x-www-form-urlencoded 请求体是文本格式
app.use(bodyParser.urlencoded({
	extended: true,
}));

const router = express.Router();
const { PORT, NODE_ENV } = process.env;

// webpack 反向代理 proxy 端口9000， node 环境配置 PORT 保持一致用9000
const server = app.listen(PORT, function () {
	logger.info(`Express server listening on port ${PORT} ${NODE_ENV}`);
});

exports.close = () =>
	new Promise((resolve) => {
		server.close(resolve);
	});

exports.closeLog = () =>
	new Promise((resolve) => {
		log4js.shutdown(resolve);
	});

// http 请求日志
app.use(log4js.connectLogger(loggerHttp, { level: 'auto' }));

// request 请求日志
app.use((req, res, next) => {
	res.locals.REQUEST_TIME = new Date();

	res.on('finish', () => {
		loggerRequest.info(JSON.stringify({
			code: res.statusCode,
			url: req.originalUrl,
			headers: req.headers || {},
			// user: res.locals.USERINFO || {},
		}));
	});

	next();
});

app.use(express.static(PATH.STATIC));
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
		Promise.resolve()
			.then(() => {
				res.send({ data });
			})
			.then(() => {
				unlinkFile(file.path);
			})
			.catch(next);
	});

	form.parse(req);
});



// 用multiparty处理formData
router.post('/home/sendFiles', (req, res, next) => {
	var form = new multiparty.Form();
	form.encoding = 'utf-8';

	form.parse(req, function (err, fields, files) {
		if (err) {
			throw err;
		}
		// multipart/form-data：既可以上传文件等二进制数据，也可以上传表单键值对，只是最后会转化为一条信息；
		// formData 键值对传值时，注意一个文件对应一个键值对。
		console.log(files);
		const pictureList = [];
		files.file.forEach((item) => {
			fs.readFile(item.path, (err, data) => {
				const baseData = data.toString('base64');
				pictureList.push(`data:image/jpeg;base64,${baseData}`);
				unlinkFile(item.path, (err) => { if(err){ throw err; }});
			});
		});
		console.log(pictureList);
		res.end('getFiles');
	});
});

// 注意注意 multer 不能作为全局中间件使用，只做路由中间件，防止恶意攻击
// 用multer,取多文件
// 不传dest, 每个文件返回buffer:Buffer， 传路径返回path
// const upload = multer();
// 指定文件地址 upload/， 处理完数据后，记得删除文件
// const upload = multer({ dest: 'upload/' });
// 可设置一次最多传 3 个文件
// router.post('/home/sendFiles', upload.array('file', 3),(req, res, next) => {
// 	console.log(req.files);
// 	console.log(req.files[0].path);
// 	res.end('multer');
// });

// 测试请求接口失败，打印错误日志
router.get('/abc', (req, res, next) => {
	Promise.resolve()
		.then(() => { throw new Error('yilingError'); })
		.catch(next);

	// Promise.reject()
	// 	.catch(() => {
	// 		next(new Error('yilingError'));
	// 	});

	// throw new Error('yilingError');
});

// not found
app.use((req, res) => {
	const requestData = {
		url: req.originalUrl,
		method: req.method,
		param: req.body,
		cookie: req.cookies,
		headers: req.headers,
	};
	logger.warn(JSON.stringify(requestData));
	res.status(404).send('Not Found');
});

// error log
app.use((err, req, res, next) => {
	// 先记录错误信息
	const errinfo = {
		url: req.originalUrl,
		msg: err ? err.message : '',
		requestTime: res.locals.REQUEST_TIME || '',
		body: req.body,
		params: req.params,
		query: req.query,
		headers: req.headers,
	};
	loggerError.error(JSON.stringify(errinfo));
	// remoteLogger.logError({ detail: errinfo });

	if (!res.finished) {
		res.status(500).send('操作失败');
	}
});
