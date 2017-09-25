import dbFn from './dbFn';

// for (let i = 1; i < 10; i++) {
// 	const data = {
// 		id: `${i}`,
// 		content: `this is the ${i} page`,
// 	};
// 	dbFn.add(data).then((res) => {
// 		console.log(res);
// 	}).catch((err) => {
// 		console.log(err);
// 	});
// }

//  初始化 数据
const demoData = {
	id: 1,
	intro: '手势是帮助用户完成人机交互的其中一个环节，简单来说手势是一种输入方式、可以起到简化界面元素、增加交互趣味性的作用。',
	tags: ['javascript', '手势'],
	author: 'lance',
	cover: '/blog/toucher/Qzone.jpg',
	pub_time: new Date(),
	title: '移动手势的秘密',
};

dbFn.add(demoData).then((item) => {
	console.log(item);
}).catch((err) => {
	console.log(err);
});
