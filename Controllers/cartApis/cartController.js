import Cart from "../../Models/cartSchema.js";
import Product from "../../Models/productSchema.js";

// CREATE Cart Item
export const createCartItem = async (req, res) => {
  const { productId } = req.params;
  const userid = req.user._id;

  try {
    // 1. Confirm product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    // 2. Find user's cart
    let cart = await Cart.findOne({ userId: userid });

    if (!cart) {
      // 3. Create new cart
      cart = new Cart({
        userId: userid,
        products: [
          {
            productId: product.id,
            quantity: 1,
            price: product.price,
          },
        ],
      });
    } else {
      // 4. Check if product already exists in cart
      const existingCartItem = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        cart.products.push({
          productId: productId,
          quantity: 1,
          price: product.price,
        });
      }
    }

    // update totalItemPrice of each product
    cart.products.forEach((item) => {
      item.totalItemPrice = item.price * item.quantity;
    });

    // update the totalCartPrice
    cart.totalCartPrice = cart.products.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );

    // save cart
    await cart.save();
    await cart.populate(`products.productId`);
    return res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE CART ITEM
export const editCartItem = async (req, res) => {
  const { productId, type } = req.body; // types can be "increase" or "decrease"
  if (!productId || !type) {
    res.status(400).json({ message: "Please provide all fields" });
    return;
  }
  const userid = req.user._id;
  try {
    const cart = await Cart.findOne({ userId: userid });
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
      return;
    }

    const existingCartItem = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingCartItem) {
      return res.status(400).json({ message: "Item not found in cart" });
    }

    if (type === "increase") {
      existingCartItem.quantity += 1;
    } else if (type === "decrease" && existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1;
    } else {
      return res
        .status(400)
        .json({ message: "Type can be either increase or decrease" });
    }

    // update totals
    cart.products.forEach((item) => {
      item.totalItemPrice = item.price * item.quantity;
    });

    cart.totalCartPrice = cart.products.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );

    await cart.save();
    await cart.populate(`products.productId`);
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET CART ITEMS
export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products.productId"
    );
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE CART ITEMS
export const deleteCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }
    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save();
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
