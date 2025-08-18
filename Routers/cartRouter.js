import { Router } from "express";
import  { createCartItem, getCartItems, editCartItem, deleteCartItems }  from "../Controllers/cartApis/cartController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const cartRoutes = Router();

cartRoutes

cartRoutes.post("/cart/create/:id", authMiddleware, createCartItem);
 cartRoutes.get("/carts", authMiddleware, getCartItems);
cartRoutes.put("/cart/update", authMiddleware, editCartItem);
cartRoutes.delete("/cart/items/delete", authMiddleware, deleteCartItems);

  export default cartRoutes