import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String }, 
  postedBy: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String },
    studentId: { type: String }
  },
  contactInfo: {
    phone: { type: String },
    additionalEmail: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema); 