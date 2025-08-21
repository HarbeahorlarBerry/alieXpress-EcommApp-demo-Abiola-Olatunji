<<<<<<< HEAD
import mongoose from 'mongoose';

const { Schema, Types, models, model } = mongoose;


 const productSchema = new Schema({
    userId: {
        type: Types.ObjectId,
         ref: "User"
    },
     name: {
         type: String,
         required: true
     },
     description: {
         type: String,
         required: true
     },
     price: {
         type: Number,
         required: true
     },
     color: {
         type: String,
         required: true
     },
     size: {
         type: String,
         required: true
     }  
 }, { timestamps: true });
 
//  const Product = mongoose.model('Product', productSchema);
const Product = models.Product || model('Product', productSchema);
 
=======
import mongoose from 'mongoose';

const { Schema, Types, models, model } = mongoose;


 const productSchema = new Schema({
    userId: {
        type: Types.ObjectId,
         ref: "User"
    },
     name: {
         type: String,
         required: true
     },
     description: {
         type: String,
         required: true
     },
     price: {
         type: Number,
         required: true
     },
     color: {
         type: String,
         required: true
     },
     size: {
         type: String,
         required: true
     }  
 }, { timestamps: true });
 
//  const Product = mongoose.model('Product', productSchema);
const Product = models.Product || model('Product', productSchema);
 
>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
 export default Product;