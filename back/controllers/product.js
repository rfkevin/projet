import ProductModel from "../models/product.js";
import express from "express";

const router = express.Router();
// a faire
export const getProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getSpecificProduct = async (req, res) => {
  const email = req.params.id;
  try {
    const existingProduct = await ProductModel.findOne({ email: email });
    if (!existingProduct) {
      res.statusMessage = "contact us your Product doesn't exists";
      return res.status(404).send("contact us your Product doesn't exists");
    }
    res.status(200).json(existingProduct);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const {  Product } = req.body;
  try {
    const existingProduct = await ProductModel.findOneAndReplace(
      {Product: Product },
      { upsert: true, returnDocument: "after" }
    );
    res.status(200).json(existingProduct);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { email, Product } = req.body;
  try {
    const existingProduct = await ProductModel.findOne({ email });

    if (!existingProduct) {
      const newProduct = new Product({
        email: email,
        Product: Product,
      });
      const result = await newProduct.save();
      res.status(201).json(newProduct);
    } else {
      res.status(200).json(existingProduct);
    }
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const  Product  = req.body;
  console.log(Product);
  try {
    const existingProduct = await ProductModel.findOneAndDelete(
      { Id: Product },
    );
    res.status(200).json(existingProduct);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export default router;
