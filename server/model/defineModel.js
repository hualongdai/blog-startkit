import mongoose from './mongoose_config';

const { Schema } = mongoose;

const ListSchema = new Schema({
  id: Number,
  intro: String,
  tags: Array,
  author: String,
  cover: String,
  pub_time: Date,
  title: String,
});

ListSchema.pre('save', function (next) {
  this.pub_time = new Date();
  next();
});

const DetailSchema = new Schema({
	id: Number,
	intro: String,
	tags: Array,
	author: String,
	cover: String,
	pub_time: Date,
	title: String,
  content: String,
});

DetailSchema.pre('save', function (next) {
	this.pub_time = new Date().getTime;
	next();
});

const articleModel = {
  listModel: mongoose.model('listModel', ListSchema),
  detailModel: mongoose.model('detailModel', DetailSchema),
};

export default articleModel;
