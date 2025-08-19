import products from "@/models/products";
import { connectDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { ele, name } = await req.json()
    try {
        if (!ele) {
            return NextResponse.json({ msg: 'Element not found' }, { status: 400 })
        }
        console.log(ele, name)
        await connectDb()
        const res = await products.find({ [ele]: name })
        console.log("res", res)
        return NextResponse.json({ res }, { status: 200 })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: `Error while getting ${ele} products`, error }, { status: 500 })
        }
        else {
            return NextResponse.json({ msg: `Unknown Error while getting ${ele} products`, error }, { status: 500 })
        }
    }
}