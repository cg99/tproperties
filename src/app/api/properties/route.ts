// app/api/properties/route.ts
import { NextResponse } from 'next/server';
import connectDb from '@/lib/mongodb';
import Property from '@/models/Property';

export async function POST(request: Request) {
    await connectDb();

    const data = await request.json();

    try {
        const property = new Property(data);
        await property.save();
        return NextResponse.json(property, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function GET() {
    await connectDb();

    try {
        const properties = await Property.find().populate('agent');
        return NextResponse.json(properties);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
