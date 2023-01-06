import express from 'express';

// create controllers and import them
import {
  getFeedPost,
  getUserPosts,
  likePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */

router.get('/', verifyToken, getFeedPost);
router.get('/:userId/posts', verifyToken, getUserPosts);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;