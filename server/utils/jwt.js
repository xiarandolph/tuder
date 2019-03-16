const expressJWT = require('express-jwt');
const config = require('../config.json');

module.exports = jwt;

function jwt() {
	const {secret} = config;
	return expressJWT({secret}).unless({
		//routes that dont require secret
		path: ['/register', '/login']
	});
}
