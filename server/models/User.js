import mongoose from 'mongoose';

// 1) create mongoose schema
const UserSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      min: 3,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    picturePath: {
      type: String,
      default: '',
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    viewedProfile: {
      type: Number,
    },
    impressions: {
      type: Number,
    },
  },
  { timestamps: true }
);

// 2) pass mongoose schema into mongoose model 'User', which passes it into User variable defined below
const User = mongoose.model('User', UserSchema);

// 3) export variable defined as default using `export default `
export default User;
