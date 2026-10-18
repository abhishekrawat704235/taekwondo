import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student full name is required'],
      trim: true,
      minlength: [2, 'Student name must be at least 2 characters'],
    },
    age: {
      type: Number,
      required: [true, 'Student age is required'],
      min: [3, 'Age must be at least 3 years old'],
      max: [99, 'Please enter a valid age'],
    },
    parentGuardianName: {
      type: String,
      trim: true,
      default: '',
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
    preferredClass: {
      type: String,
      required: [true, 'Preferred training class is required'],
    },
    previousExperience: {
      type: String,
      required: [true, 'Previous experience is required'],
      default: 'Beginner / None',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Enrolled', 'Archived'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
