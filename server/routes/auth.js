import express from 'express';

import { login } from '../controllers/auth.js';

// set up our router
const router = express.Router();

// from app.use('/auth', authRoutes) in index.js, the router.post below is essentially `router.post('/auth/login', login);`
// login function is created at our controller (auth.js controller)
router.post('/login', login);

export default router;
