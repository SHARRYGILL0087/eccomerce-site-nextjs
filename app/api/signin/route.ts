import user from "@/models/user";
import { connectDb } from "@/lib/connectDb";
import { IUser } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        const { firstname, lastname, email, password } = await req.json()
        await connectDb()
        const isExist = await user.findOne({ email })
        if (isExist) {
            return NextResponse.json({ msg: 'Email Already Registered' }, { status: 400 })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser: IUser = new user({ firstname, lastname, email, password: hashPassword })
        await newUser.save()

        const accesstoken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET || 'SECRETTOKEN', { expiresIn: '1d' })
        const refreshtoken = jwt.sign({ id: newUser._id }, process.env.REFRESH_TOKEN_SECRET || 'REFRESHTOKEN', { expiresIn: '7d' })

        return NextResponse.json({ msg: 'SignIn Successfully', accesstoken : accesstoken,refreshtoken : refreshtoken }, { status: 201 })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('Err occur while posting user!', error)
            return NextResponse.json({ msg: 'Err occur while posting user!' }, { status: 500 })
        } else {
            console.log('Unknown err occur while posting user!')
            return NextResponse.json({ msg: 'Err occur while posting user!' }, { status: 500 })
        }
    }
}