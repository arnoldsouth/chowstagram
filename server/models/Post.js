import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userPicturePath: {
      type: String,
    },
    picturePath: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timeseries: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;