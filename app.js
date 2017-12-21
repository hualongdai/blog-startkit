const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const jsonp = require('koa-jsonp');

const historyFallback = require('koa2-history-api-fallback');
const router = require('./server/router');
const path = require('path');

const app = new Koa();

// support jsonp
// app.use(jsonp());

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


// app.use(async (ctx) => {
// 	const returnData = {
// 		success: true,
// 		data: {
// 			text: 'this is a jsonp api',
// 			time: new Date().getTime(),
// 		},
// 	};
//
// 	// 直接输出JSON
// 	ctx.body = returnData;
// });


if (!module.parent) {
	app.listen(3000);
	console.log('listening on port 3000');
}

module.exports = app;
