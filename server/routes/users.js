import express from 'express';

import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from '../controllers/users.js';
// imported variable `verifyToken` created when using middleware to verify token match
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */

// essentially `router.get('/user/:id)`. if user or frontend is sending a particular user id, we can grab this id and call our database with that particular id. this is known as using queryStrings from the frontend

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

/* UPDATE */

router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
