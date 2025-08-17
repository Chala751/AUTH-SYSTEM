// middleware/userAuth.js
import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  try {
    const { token } = req.cookies || {};
    if (!token) {
      return res.json({ success: false, message: 'Unauthorized. Please log in again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.json({ success: false, message: 'Unauthorized. Invalid token.' });
    }

    req.userId = decoded.id; // <-- use this everywhere in controllers
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message || 'Unauthorized' });
  }
};

export default userAuth;
