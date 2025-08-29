import Razorpay from "razorpay";
import { NextResponse } from "next/server";

type orderResponse = {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
}

export async function POST(req: Request) {
    try {

        const { amount, currency } = await req.json()

        const razorpay = new Razorpay({
            key_id: process.env.KEY_ID as string,
            key_secret: process.env.KEY_SECRET as string,
        });

        const options = {
            amount: amount * 100,
            currency: currency || "INR",
            receipt: "receipt_" + new Date().getTime(),
        }

        const order = await razorpay.orders.create(options)

        return NextResponse.json({ msg: "Order created successfully", order , key : process.env.KEY_ID }, { status: 200 })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: 'Error while initiating payment', error }, { status: 500 })
        }
        else {
            return NextResponse.json({ msg: 'Error while initiating payment', error }, { status: 500 })
        }
    }
}