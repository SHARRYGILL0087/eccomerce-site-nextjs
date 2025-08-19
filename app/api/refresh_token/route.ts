import { NextResponse } from "next/server";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken"


export async function POST(req: Request) {
    try {
        const { rf_token } = await req.json()
        console.log('ref', rf_token)
        if (!rf_token) return NextResponse.json({ msg: 'Please Login or SignIN' }, { status: 400 })
            let decoded : JwtPayload | string
        try {
            decoded = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET || 'REFRESHTOKEN')
        } catch (error) {
            return NextResponse.json({error} ,{status : 400})
        }
        const userId = (decoded as JwtPayload)?.id
        const newAccessToken = jwt.sign({id : userId},process.env.ACCESS_TOKEN_SECRET || "SECRETTOKEN" , {expiresIn : '1d'})
        return NextResponse.json({ msg: 'Id Obtained' , accesstoken : newAccessToken, userId }, { status: 200 })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: 'Error occurs in refresh_token', error }, { status: 500 })
        }
        else {
            return NextResponse.json({ msg: 'Unknown Error occurs in refresh_token', error }, { status: 500 })
        }
    }
}