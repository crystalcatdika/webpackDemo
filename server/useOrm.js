const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('yiling_test', 'root', '123456', {
	host: 'localhost',
	dialect: 'mysql',
	define: {
		timestamps: false
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

const Model = Sequelize.Model;
class User extends Model {}
User.init({
	// 属性
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING
		// allowNull 默认为 true
	}
}, {
	sequelize,
	modelName: 'user'
	// 参数
});
  
// 创建新用户
User.create({ firstName: 'Jane', lastName: 'Doe' }).then(jane => {
	console.log('insert', jane.id);
});

// 查找所有用户
User.findAll().then(users => {
	console.log('All users:', JSON.stringify(users));
});