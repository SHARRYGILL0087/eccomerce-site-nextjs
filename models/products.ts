import mongoose, { Document , Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    images: string;
    stock: number;
    isCart : boolean;
    isWishList : boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema : Schema<IProduct> = new Schema({
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
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    isCart:{
        type : Boolean,
        default : false
    },
    isWishList : {
        type : Boolean,
        default : false
    }
},
    { timestamps: true }
)

const products =mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema)
export default products;