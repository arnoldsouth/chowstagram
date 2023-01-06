import Post from '../models/Post.js';
import User from '../models/User.js';

/* CREATE */

export const createPost = async (req, res) => {
  try {
    // parameters that frontend will send us
    const { userId, description, picturePath } = req.body;

    // creating a user using findbyId with userId as the parameter
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath, //comes from the user as well because they have a profile picture
      picturePath, //the post picture path
      location: user.location,
      description,
      likes: {},
      comments: [],
    });

    // update and save the newPost
    await newPost.save();

    // grab all the posts (including this new post added) by creating variable `post` for it which will then get passed to the frontend
    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getFeedPost = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    // pass userId in the find so we grab only posts by that particular userId
    const post = await Post.find({ userId });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const likePost = async (req, res) => {
  try {
    // grab id from req.params because it'll come from the queryString
    const { id } = req.params;
    // grab userId from req.body because that's how/where the frontend will be sending from
    const { userId } = req.body;

    const post = await Post.findById(id);

    // check in a post's `likes` if a userId exists. if the userId exists, it means that the post has been liked by that particular user
    const isLiked = post.likes.get(userId);

    // if a user already likes a post, delete it. else, set the user's like to true
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // create variable for the updated post, finding a post by passing in the `id` as a parameter, and then updating the likes to our updated post that was just modified
    const updatedPost = await Post.findById(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );

    // pass in the new variable `updatedPost` in order to update our frontend once that like button has been hit
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
