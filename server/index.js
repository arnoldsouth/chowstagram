import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from 'multer';
// to configure directories
import path from 'path';
import { allowedNodeEnvironmentFlags } from 'process';
import { fileURLToPath } from 'url';

import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import {
  posts,
  users,
} from './data/index.js';
import { verifyToken } from './middleware/auth.js';
import Post from './models/Post.js';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

{
  users, posts;
}

/* CONFIGURATIONS */
// Middleware - functions that run between different requests

// when using "type": "modules" in package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// invoke dotenv to use .dotenv files
dotenv.config();

// invoke express application
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet(crossOriginResourcePolicy({ policy: 'cross-origin' })));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// invoke cross-origin resource sharing policies
app.use(cors());

// stores photos and images locally to keep app simple
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
// from multer github repo: when someone uploads a file to the website, it will save to this particular folder `public/assets` mentioned below
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// whenever we upload a file, we're going to use this `multer` variable
const upload = multer({ storage });

/* ROUTES WITH FILES */

// user going to this path route at /auth/register will upload a picture (using middleware) at the destination defined above at `storage`, and then our logic at `register` endpoint (controller) will run
// this `/auth` route cannot be in a separate file because it requires `upload` variable above. upload needs to be set in the index.js file, so we cannot move to the `./routes` folder
// if we want the token verification (or any middleware) before a route, place it before the logic, which would be before `register` below
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

/* ROUTES */

// `/auth` gets prefixed at `authRoutes`, meaning, `router.post('/login', login)` is essentially `router.post('/auth/login', login)`
app.use('/auth', authRoutes);
// `/user` gets prefixed at `userRoutes`, meaning, `router.get('/:id', verifyToken, getUser)` is essentially `router.get('/user/:id', verifyToken, getUser)`
app.use('/users', userRoutes);

app.use('/posts', postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Connected to Server Port: ${PORT}`);
    });

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => console.log(`🆘 ${err} did not connect`));
