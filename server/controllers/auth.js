// allows us to encrypt our password
import bcrypt from 'bcrypt';
// gives us a way to send a user a web token that they can use as authorization
import jwt from 'jsonwebtoken';

// create schema first, and then import the schema here
import User from '../models/User.js';

/* REGISTER USER */

// create register async function. must be async because we're making a call to mongo database.
// essentially an API call from frontend to backend, then backend to a database.
// req = request body we get from the frontend (express does this by default)
// res = response we are going to be sending back to the frontend (express does this by default)
export const register = async (req, res) => {
  try {
    // we're destructuring these parameters from the req.body
    // so on the frontend, we're going to have to send in an object that has these parameters/arguments, and grab them and use them in this function
    const {
      password,
      firstName,
      lastName,
      email,
      picturePath,
      location,
      occupation,
      friends,
    } = req.body;

    // create a random salt provided by bcrypt, and use this `salt` to encrypt our password
    const salt = await bcrypt.genSalt();
    // pass in password and provide the `salt` to get password hash
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      password: passwordHash,
      firstName,
      lastName,
      email,
      picturePath,
      location,
      occupation,
      friends,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // create new variable `savedUser` which will contain the object data above at newUser and save it at `savedUser`
    const savedUser = await newUser.save();

    // send the user a status code of 201, meaning something has been created, sending back a json of the `savedUser`, so the frontend can receive this response
    // frontend can now use this `savedUser` response
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */

// regarding authentication: when registering the user, or the user logs in, the user is given some kind of validation, and the user uses that to sign in as verification

export const login = async (req, res) => {
  try {
    // destructure `email` and `password` from req.body, so we grab the email and password when the user tries to login
    const { email, password } = req.body;
    // use mongoose to try to find the one user that has the specified email, and bring back all of the `user` information in our variable defined below
    const user = await User.findOne({ email: email });

    // if user put in incorrect email or does not exist, it will return the status 400 with the following message
    if (!user) return res.status(400).json({ message: 'User does not exist.' });

    // create variable for user's password match input using bcrypt to compare the password the user just sent with the user's password that's been saved inside the database. uses same `salt` to compare whether these two turn out to be the same hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ message: 'Invalid email and password combination.' });

    // create a variable `token` (jot token) and assign it an id with the user's id (`user._id`), and pass in our secret string `JWT_SECRET` defined in .env
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // delete the password so it doesn't get sent back to the frontend to keep it safe
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
