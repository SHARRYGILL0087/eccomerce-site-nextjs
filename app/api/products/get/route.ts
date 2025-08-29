import { connectDb } from "@/lib/connectDb";
import products from "@/models/products";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { id, category, q } = await req.json()
        console.log({ id, category, q })
        await connectDb()
        if (id) {
            const res = await products.findById(id)
            if (res) return NextResponse.json(res, { status: 202 })
        }
        else if (category) {
            const res = await products.find({category})
            if (res) return NextResponse.json(res, { status: 202 })
        }
        else if (q) {
            const searchRegex = new RegExp(q, 'i')
            const res = await products.find({
                $or: [
                    { name: { $regex: searchRegex } },
                    { description: { $regex: searchRegex } },
                    { brand: { $regex: searchRegex } },
                    { category: { $regex: searchRegex } }
                ]
            })
            return NextResponse.json(res, { status: 202 })
        }

        else return NextResponse.json({ msg: 'Product Not Found!' }, { status: 400 })

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('Err occur while getting product!', error.message)
            return NextResponse.json({ msg: 'Error while getting Product!', error }, { status: 501 })
        } else {
            console.log('Unknown err occur while posting product!')
            return NextResponse.json({ msg: 'Unknown Error while getting Product!', error }, { status: 502 })
        }
    }
}