const { ENV } = require('./common');

const envTest = {
  develepment: 'develepment配置信息',
  production: 'production配置信息',
};

module.exports = {
  ENVTEST: envTest[ENV],
};
