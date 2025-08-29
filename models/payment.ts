import mongoose, { Document, model, Schema } from "mongoose";

interface IPayment extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    amount: number;
    status: string;
    createdAt: Date;
}

const paymentSchema: Schema<IPayment> = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["initiated", "successful", "failed", "refunded"],
        default: "initiated"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.models.payment || model<IPayment>('payment', paymentSchema)
