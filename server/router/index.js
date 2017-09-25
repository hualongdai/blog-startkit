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
			response.state = 10001;
			response.msg = err;
		});
	ctx.body = response;
	await next();
});

router.post('/api/add', async (ctx, next) => {
	const { data } = ctx.request.body;
	// todo 验证data 的各个参数合法性
	await dbFn.add(data)
		.then((res) => {
			if (res) {
				ctx.body.state = 1;
				ctx.body.data = res;
			}
		})
		.catch((err) => {
			ctx.body.state = 10001;
			ctx.body.msg = err;
		});
	await next();
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
