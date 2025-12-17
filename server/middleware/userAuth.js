import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecoded.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = { id: tokenDecoded.id };

    next();

  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
}

export default userAuth;