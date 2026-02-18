const { mongoose } = require('./mongo');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
