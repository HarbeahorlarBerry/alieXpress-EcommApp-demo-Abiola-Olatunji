<<<<<<< HEAD
import mongoose from "mongoose";

const { Schema, model } = mongoose;


const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId, 
        ref: "Product"
    },
    quantity: {
        type: Number,

    },
    totalItemPrice: {
        type: Number
    },
    price: {
        type: Number
    }
});

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        unique: true
    }, 
    products: [cartItemSchema],

    totalItemPrice: {
        type: Number,
    }
}, {timestamps: true })

const Cart = model ("cart", cartSchema)

=======
import mongoose from "mongoose";

const { Schema, model } = mongoose;


const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId, 
        ref: "Product"
    },
    quantity: {
        type: Number,

    },
    totalItemPrice: {
        type: Number
    },
    price: {
        type: Number
    }
});

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        unique: true
    }, 
    products: [cartItemSchema],

    totalItemPrice: {
        type: Number,
    }
}, {timestamps: true })

const Cart = model ("cart", cartSchema)

>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
export default Cart