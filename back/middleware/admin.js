import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.email;
      const user = await User.findOne({ email: req.userId });
      if (user.type === "AdminLevelAuthorisation") {
        next();
      } else {
        return res
          .status(403)
          .send({ error: { status: 403, message: "Access denied." } });
      }
    } else {
      return res
        .status(403)
        .send({ error: { status: 403, message: "Access denied." } });
    }
  } catch (error) {
    return res.status(403).send({ error: { status: 403, message: error } });
  }
};

export default auth;
