const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const signToken = (user) => {
	return jwt.sign(user, SECRET);
};

module.exports = {
	signToken,

};