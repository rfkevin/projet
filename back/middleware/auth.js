import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token,  process.env.JWT_SECRET);
      req.userId = decodedData?.email;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    return res.status(403).send({ error: { status: 403, message: "Access Denied" } });
  }
};

export default auth;
