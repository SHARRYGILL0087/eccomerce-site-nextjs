import products from "@/models/products";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import { IProduct } from "@/models/products";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        await connectDb()
        const newProduct: IProduct = new products(body)
        await newProduct.save()
        return NextResponse.json(newProduct, { status: 201 })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('Err occur while posting product!', error.message)
        } else {
            console.log('Unknown err occur while posting product!')
        }
    }
}
