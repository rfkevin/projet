import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(cors());
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.get('/', (req, res) => {
  res.send('Runing.');
});
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb+srv://darino:nee3oTHdmrJO2YYk@airflyproject.qhvbiv1.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`serveur runing on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
