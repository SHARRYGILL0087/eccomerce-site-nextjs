import mongoose from "mongoose";

const url: string | undefined = process.env.MONGODB_URL

export const connectDb = async (): Promise<void> => {

    try {
        if (!url) {
            throw new Error("MONGODB_URL is not defined in environment variables.");
        }

        await mongoose.connect(url)
        console.log('DB connected!!')
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error while connecting DB:", error.message);
        } else {
            console.log("Unknown error occurred while connecting DB.");
        }
    }

}
