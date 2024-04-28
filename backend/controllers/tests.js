const router = require('express').Router();
const { User } = require('../models');
router.get('/cypress', async (req, res) => {
	await User.truncate({ cascade: true, restartIdentity: true });
	res.status(200).end();
});

module.exports = router;