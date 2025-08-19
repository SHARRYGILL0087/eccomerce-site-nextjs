import products from "@/models/products";
import { connectDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const { id , ele } = await req.json()
        console.log(id , ele)

        if (!id || !ele) {
            return NextResponse.json({ msg: "Product ID is required" }, { status: 400 });
        }
        
        await connectDb()

        const updatedPro = await products.updateOne(
            { _id: id },
            { $set: { [ele] : true } }
        )

        return NextResponse.json({ msg: updatedPro }, { status: 200 })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: 'Err while add cart' }, { status: 500 })
        } else {
            return NextResponse.json({ msg: 'Unknown Err while add cart' }, { status: 500 })
        }
    }
}