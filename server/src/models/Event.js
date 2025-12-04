import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    attendees: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);