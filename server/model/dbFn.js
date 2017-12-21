const articleModel = require('./defineModel');

const { listModel, detailModel} = articleModel;

class OperateDB {

    constructor(model) {
        this.model = model;
    }

    // 添加数据
    add(instence) {
			return this.model.create(instence);
    }

    // 查询数据
    get(id) {
        if (id === 0) {
            return this.model.find({}).lean().exec();
        }
        return this.model.findOne({ id }).lean().exec();
    }

    del(id) {
        return this.model.remove({ id });
    }

    update(data) {
        const id = data.id;
        this.model.count({ id }, (err, count) => {
            if (err) {
                throw new Error(err);
            }
            if (count > 0) {
                this.model.findOneAndUpdate({ id }, {
                    $set: {
                      content: data.content,
                    },
                }, {}, () => {
                    console.log('update success');
                    console.log(arguments);
                });
            } else {
                this.model.create(data);
            }
        });
    }
}

const dbFn = new OperateDB(listModel);


// const demoData = {
// 	id: 1,
// 	intro: '手势是帮助用户完成人机交互的其中一个环节，简单来说手势是一种输入方式、可以起到简化界面元素、增加交互趣味性的作用。',
// 	tags: ['javascript', '手势'],
// 	author: 'lance',
// 	cover: '/blog/toucher/Qzone.jpg',
// 	title: '移动手势的秘密',
// };
//
// dbFn.add(demoData).then((item) => {
// 	console.log(item);
// }).catch((err) => {
// 	console.log(err);
// });

module.exports = dbFn;
