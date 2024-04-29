const router = require('express').Router();
const { emptyDatabase } = require('../test/helpers');
router.get('/cypress', async (req, res) => {
	await emptyDatabase();
	res.status(200).end();
});

module.exports = router;