import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/myblog', {
	useMongoClient: true,
});
export default mongoose;
