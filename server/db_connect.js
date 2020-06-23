var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'yiling_test',
});

con.connect(function(err) {
	if (err) throw err;
	console.log('Connected!');
	con.query('INSERT INTO students (name, score, class_id) VALUES ("Inc", 55, 4)', function (err, result, fields) {
		if (err) throw err;
		// console.log(result);
	});
	con.query('SELECT * FROM students WHERE class_id = "4"', function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
	const sql = 'UPDATE students SET class_id = 1 WHERE class_id = 4';
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		// console.log(result);
	});
	con.query('SELECT * FROM students', function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
});

// con.end();