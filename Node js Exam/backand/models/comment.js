const { mongoose } = require('./mongo');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
