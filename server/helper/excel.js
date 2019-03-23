const XLSX = require('xlsx');

exports.parse = (sheetPath) => {
	const workbook = XLSX.readFile(sheetPath);
	const sheet = workbook.Sheets['总表'];
	return XLSX.utils.sheet_to_json(sheet);
};
