// getting the token from the header
import jwt from 'jsonwebtoken';

// middleware for checking the token
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) return res.status(403).json({ error: "Invalid token" });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Error getting token',error);
    res.status(401).json({ error: "Access denied" });
  }
}