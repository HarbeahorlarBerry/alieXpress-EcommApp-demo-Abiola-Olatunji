import Product from "../../Models/productSchema.js";

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, color, size } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  console.log("Request body:", req.body);
  console.log("User:", user);
  
  

  if (!name || !description || !price || !color || !size) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

   try {
     // CHANGED: Added price sanitization
    const numericPrice = parseFloat(price.toString().replace(/[^0-9.-]+/g, ""));

    const newProduct = new Product({
      name,
      description,
      price,
      color,
      size,
      userId: user._id
    });

    await newProduct.save();

    res.status(201).json({
      message: 'New product created successfully!',
      product: newProduct
    });
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all products created by the logged-in user
export const getuserProducts = async (req, res) => {
  const user = req.user;
  try {
    const products = await Product.find({ userId: user._id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products with user info (excluding password)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("userId", "-password");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by query parameters
export const getByqueryParams = async (req, res) => {
  const { productName, color, brand, size } = req.query;
  const filter = {};

  if (productName) filter.name = productName;
  if (color) filter.color = color;
  if (brand) filter.brand = brand;
  if (size) filter.size = size;

  try {
    const products = await Product.find(filter);
    if (products.length === 0) {
      return res.status(200).json({ message: 'No product with such params!' });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a product (must belong to user)
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, color, size } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findOne({ _id: id, userId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update only provided fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (color) product.color = color;
    if (size) product.size = size;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product (not a user)
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deleted = await Product.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: "Product not found or not yours" });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// import Product, { find, findOne } from "../../Models/productSchema.js";

// // create product
// export const createProduct = async (req, res) => {
//     const { name, description, price, color, size } = req.body;
//     const user = req.user

//     console.log(req.user);
    
//     if (!name || !description || !price || !color || !size) {
//         return res.status(400).json({ message: 'Please provide all the required fields' });
//     }
//      try {
//          const newProduct = new Product({...req.body, userId: user._id});
//          await newProduct.save();
//          res.staus(201).json({ message: ' New Product created successfully!' });
//      } catch (err) {
//          console.log(err.message);
//      }
// }
 
// // get user Product
//  export const getuserProducts = async (req, res) => {
//     const user = req.user
//      try {
//          const Products = await find( {userId: user._id});
//          res.status(200).json(Products)
//         //  if (!products) {
//         //      return res.status(200).json({ message: 'No products posted yet!' });
//         //  }
//         //  res.json(products);
//      } catch (err) {
//          res.status(500).json(err.message);
//      }
// }

// // get all Product
// export const getAllProducts = async (req, res) =>{
//     try {
//         const Products = (await find().populate("userId")).select
//         ("-password")
//         res.status(200).json(Products)
//     } catch (error) {
//         res.staus(500).json(error)
//     }
// }


// // get ByqueryParams

//  export const getByqueryParams = async (req, res) => { 
//     const { productName, color,brand, size } = req.query;
//     const filter = { };


//     if (productName) {
//         filter.name = productName;
//     }
//     if (color) {
//         filter.color = color;
//     }
//     if (size) {
//         filter.size = size;
//     }
//     if (brand) {
//         filter.brand = brand
//     }
//     try {
//         const products = await find(filter);
//         if (!products) {
//             return res.status(200).json({ message: 'No product with such params!' });
//         }
//         res.json(products);
//     } catch (err) {
//         console.log(err.message);
//     }
// }

// // edit user
// export const editProduct = async (req, res) => {
//     const { id } = req.params
//     const {productName , color, brand, size} = req.body
//     const reqId = req.user._id

//         try {
//             const product = await findOne({ _id: id, userId: reqId })
//             if (!product) {
//                 res.status(400).json({ message: "Product not found" })
//                 return
//             }

//             //first methord
//             product.name = productName ?? product.productName
//             product.price = color ?? product.color
//             product.color = brand ?? product.brand
//             product.size = size ?? product.size

//             await product.save()
//             // second methord

//             // await product.findByIdAndUpdate(id, {
//             //     $set: {
//             //         'name': name,
//             //         'price': price,
//             //         'color': color,
//             //         'size': size
//             //     }
//             // }, { new: true })

//             res.status(200).json({mess: 'Product updated successfully'})
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }


//      // delete user
// export const deleteProduct = async (req, res) => {
//     const { id } = req.params
    
//     try {
//          await User.findByIdAndDelete(id)
        
//         res.status(200).json({mess: 'User deleted successfully'})
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }