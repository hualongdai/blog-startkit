import articleModel from './defineModel';

const { listModel, detailModel} = articleModel;

// const dbFn = {
//     add(instance) {
//         return articleModel.create(instance);
//     },
//
//      get(id) {
//         // id==0, get lists
//         if (id === 0) {
//           return articleModel.find({}).lean().exec();
//         }
//         return articleModel.findOne({ id }).lean().exec();
//     },
//
//     del(id) {
//         return articleModel.remove({ id });
//     },
//
//     edit(data) {
//         return articleModel.findOneAndUpdate({ id: data.id }, {
//             $set: {
//                 content: data.content,
//             },
//         }, {}, () => {
//             console.log('update done');
//         });
//     },
//
//     // automatically add or edit
//     update(data) {
//         const userId = data.id;
//         articleModel.count({ id: userId }, (err, count) => {
//             if (err) {
//                 throw new Error(err);
//             }
//             if (count > 0) {
//                 articleModel.findOneAndUpdate({ id: userId }, {
//                     $set: {
//                         content: data.content,
//                     },
//                 }, {}, () => {
//                     console.log('update done');
//                 });
//             } else {
//                 articleModel.create(data);
//             }
//         });
//     },
// };

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

export default dbFn;
