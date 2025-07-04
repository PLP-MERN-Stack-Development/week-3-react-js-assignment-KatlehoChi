import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);

