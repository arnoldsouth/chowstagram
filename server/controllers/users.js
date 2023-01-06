import User from '../models/User.js';

/* READ */

export const getUser = async (req, res) => {
  try {
    // grab the `id` from the req.params queryString
    const { id } = req.params;

    // use that particular `id` we grabbed from above to find information we want/need defined in the `User` schema, and create a variable `user` so we can use it
    const user = await User.findById(id);

    // send back to the frontend everything relevant to this user after we find it
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    // grab the `id` from the req.params queryString
    const { id } = req.params;

    // use that particular `id` we grabbed from above to find information we want/need defined in the `User` schema, and create a variable `user` so we can use it
    const user = await User.findById(id);

    // use Promise.all() because we're going to make multiple API calls to the database
    // we're grabbing all of a specific user's friends, so we need to use .map() with id as its parameter, then grabbing all friends of that User that were found (aka grabbing all friends that a User has by id)
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // format this properly for the frontend
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        // email,
        picturePath,
        location,
        occupation,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          // email,
          picturePath,
          location,
          occupation,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // if friendId is included in the main user's friends list (aka main user's list of friendId's), then we want to remove it by filtering it out
    // copies the same array (in this case [user.friends]), anytime this filter method is not equal to that original. aka removing when id is equal to friendId
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);

      // checking if the current id in this friend list is equal to original id, and if so, we want to remove it from the array (filter out)
      friend.friends = friend.friends.filter((id) => id !== id);
    }

    // if these id's are not included in the user's friend list, we want to add it to the user's friend list by using .push(), and we also want to add it on the friend's friend list as well
    // essentially adding each other as friends and removing each other as friends. aka when i add a friend, the friend also adds me as a friend (same for remove)
    else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // save these updated lists
    await user.save();
    await friend.save();

    // update and format variables above with the new saved data: friends
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // format this properly for the frontend again
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        // email,
        picturePath,
        location,
        occupation,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          // email,
          picturePath,
          location,
          occupation,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
