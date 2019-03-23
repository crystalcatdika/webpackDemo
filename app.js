const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.listen(port);

const router = express.Router();


const path = require('path');
const multiparty = require('multiparty');
const excel = require('./server/helper/excel');

const uploadPath = path.join(__dirname, 'upload');


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

app.use('/api', router);

console.log('node already open on ' + port);
