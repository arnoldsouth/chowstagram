const { createSlice } = require('@reduxjs/toolkit');

// data that will be accessible throughout entire application. we don't need to pass in state and properties down to different components
// initially, we are storing light mode (vs dark), user and token as null for auth, and posts for all our posts
const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers are actions, functions that involve modifying global state
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },

    // with this action.payload, we have to pass it into its loggedIn dispatch as an object. see src/scenes/loginPage/Form.jsx at the login variable
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // when user hits logout, we set state.user and state.token to null
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    // if user already exists, set the friends to our local state to keep the information
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error(`User friends is non-existent 😔`);
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setPost: (state, action) => {
      // grab our list of posts, map through each one. and if `post._id` is equal to the current post id that we're sending into this function, we're going to return that particular/relevant updated post from the backend. otherwise, we return what we currently have already
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;

        return post;
      });

      // state.posts will now be the `updatedPosts` we just defined above
      state.posts = updatedPosts;
    },
  },
});

// this is essentially our entire state

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
