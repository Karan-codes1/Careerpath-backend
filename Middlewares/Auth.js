import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, JWT token is required",
      success: false
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to req
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, JWT token is invalid or expired",
      success: false
    });
  }
};

export default ensureAuthenticated;
