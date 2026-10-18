import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Message text is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters'],
    },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Responded', 'Archived'],
      default: 'Unread',
    },
  },
  {
    timestamps: true,
  }
);

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
