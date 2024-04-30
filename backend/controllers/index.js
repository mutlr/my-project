const router = require('express').Router();
const { MODE } = require('../util/config');
const userRouter = require('./users');
const artistRouter = require('./artists');
const songRouter = require('./songs');
const postRouter = require('./posts');
const registerRouter = require('./register');
const loginRouter = require('./login');
const spotifyRouter = require('./spotify');
const commentRouter = require('./comments');
const testingRouter = require('./tests');

router.use('/api/users', userRouter);
router.use('/api/songs', songRouter);
router.use('/api/artists', artistRouter);
router.use('/api/posts', postRouter);
router.use('/api/register', registerRouter);
router.use('/api/login', loginRouter);
router.use('/api/spotifyapi', spotifyRouter);
router.use('/api/comments', commentRouter);
if (MODE === 'cypress') {
	router.use('/api/tests', testingRouter);
}
module.exports = router;
