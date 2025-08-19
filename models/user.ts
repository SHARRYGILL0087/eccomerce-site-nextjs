import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const user = mongoose.models.user || mongoose.model<IUser>('user',userSchema)
export default user;
