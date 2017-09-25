import dbFn from '../model/dbFn';

const router = require('koa-router')();

router.get('/', async (ctx, next) => {
	ctx.render('index.html', {});
	await next();
});

router.get('/api/get', async (ctx, next) => {
	const { id } = ctx.request.query;
	const response = {};
	await dbFn.get(id)
		.then((data) => {
			response.data = data;
			response.state = 1;
		}).catch((err) => {
			response.msg = err;
		});
	ctx.body = response;
	await next();
});

router.post('/api/add', async (ctx, next) => {
	// ctx.request.body
});

router.post('/api/delete', async (ctx, next) => {
	const { id } = ctx.request.body;
	const response = {};
	if (!id || typeof id !== 'number') {
		ctx.throw(403, 'id类型错误');
	} else {
		await dbFn.del(id).then((result) => {
			if (result.result.n && result.result.ok) {
				response.state = 1;
			} else {
				response.state = 10001;
				response.msg = '删除失败';
			}
		}).catch((err) => {
			response.state = 10002;
			response.msg = err;
		});
	}
	ctx.body = response;
	await next();
});

module.exports = router;
