import router from "express";
import { getAllProducts, createProduct, editProduct, deleteProduct, getByqueryParams, getuserProducts } from "../Controllers/productApis/productController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const productRouter = router();


//post
productRouter.post("/product/create", authMiddleware, createProduct)

 //get
productRouter.get("/products", getAllProducts)
productRouter.get("/userByquery", authMiddleware, getByqueryParams)

 //put
 productRouter.put("/product/update/:id", authMiddleware, editProduct)

  //delete
  productRouter.delete("/product/delete/:id", authMiddleware, deleteProduct)





export default productRouter;