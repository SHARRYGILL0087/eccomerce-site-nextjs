import user from "@/models/user";
import { connectDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        await connectDb()
        const isExist = await user.findOne({ email })
        if (!isExist) {
            return NextResponse.json({ msg: 'User Not Found' }, { status: 400 })
        }
        const isMatch = await bcrypt.compare(password, isExist.password)

        if (!isMatch) {
            return NextResponse.json({ msg: 'Incorrect Password' }, { status: 400 })
        }

        const accesstoken = jwt.sign({ id: isExist._id }, process.env.ACCESS_TOKEN_SECRET || 'SECRETTOKEN', { expiresIn: '1d' })
        const refreshtoken = jwt.sign({ id: isExist._id }, process.env.REFRESH_TOKEN_SECRET || 'REFRESHTOKEN', { expiresIn: '7d' })

        return NextResponse.json({ msg: 'Login Successfully' , accesstoken : accesstoken ,
            refreshtoken : refreshtoken }, { status: 200 })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: 'Error occur while login!', error }, { status: 500 })
        }
        else {
            return NextResponse.json({ msg: 'Unknown err while login' }, { status: 500 })
        }
    }
}