const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const historyFallback = require('koa2-history-api-fallback');
const path = require('path');
const WebSocket = require('ws');

const router = require('./server/router');

const app = new Koa();

// router to front-end
app.use(historyFallback());
// Logger
app.use(logger());


if (process.env.NODE_ENV !== 'production') {
	const middleware = require('koa-webpack');
	const Webpack = require('webpack');
	const config = require('./cfg/webpack.dev.js');

	const compiler = Webpack(config);
	app.use(middleware({
		compiler,
	}));
}

render(app, {
	root: process.env.NODE_ENV === 'production' ? path.join(__dirname, './public') : path.join(__dirname, './src'),
	extname: '.html',
});

app.use(serve(path.join(__dirname, 'public'), {
	maxage: 100 * 24 * 60 * 60,
}));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


if (!module.parent) {
	const server = app.listen(3000);
	const ws = new WebSocket.Server({ server });
	ws.on('connection', (wsocket) => {
		wsocket.on('message', (message) => {
			console.log('received: %s', message);
		});
		wsocket.send('this is msg from server');
	});
	// console.log('listening on port 3000');
}


module.exports = app;
