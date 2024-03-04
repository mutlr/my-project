const app = require('./app');
const { PORT } = require('./util/config');

app.listen(PORT, () => {
	console.log('App running on port', PORT);
});