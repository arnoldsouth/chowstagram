import jwt from 'jsonwebtoken';

// for middleware, `next` allows the function to continue
export const verifyToken = async (req, res, next) => {
  try {
    // from the request from the frontend, we're grabbing the `Authorization` header (which is where the token will be set on the frontend, and where then the backend can grab this key)
    let token = req.header('Authorization');

    // if token doesn't exist, we return status 403, and send message below
    if (!token) return res.status(403).send('Access denied');

    // 'Bearer ' is set on the frontend (note: 'Bearer ' is 7 characters, which is used for our slice below)
    // we want the token to be starting with 'Bearer ', and we want just the token, so we take everything after 'Bearer ' to grab the ACTUAL token
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    // create variable `varified` and check with jwt which we created earlier, passing in the `token` obtained above, and our JWT_SECRET
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
