const path = require('path');
const excel = require('./server/helper/excel');

const data = excel.parse('./static/productDetail.xlsx');
console.log(data);








