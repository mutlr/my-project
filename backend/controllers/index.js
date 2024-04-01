const router = require('express').Router();

const userRouter = require('./users');
const artistRouter = require('./artists');
const songRouter = require('./songs');
const postRouter = require('./posts');
const registerRouter = require('./register');
const loginRouter = require('./login');
const spotifyRouter = require('./spotify');
const commentRouter = require('./comments');

router.use('/api/users', userRouter);
router.use('/api/songs', songRouter);
router.use('/api/artists', artistRouter);
router.use('/api/posts', postRouter);
router.use('/api/register', registerRouter);
router.use('/api/login', loginRouter);
router.use('/api/spotifyapi', spotifyRouter);
router.use('/api/comments', commentRouter);

module.exports = router;