import { connectDb } from "@/lib/connectDb";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const {id} = await req.json()
        await connectDb()
        const usr = await user.findById(id)
        return NextResponse.json({msg : 'User Obtained' , User : usr }, {status : 200})
    } catch (error : unknown) {
        if(error instanceof Error){
            return NextResponse.json({msg : "Error while getting user" , error} , {status : 500})
        }else{
            return NextResponse.json({msg : "Unknown Error while getting user" , error} , {status : 500})

        }
    }
}