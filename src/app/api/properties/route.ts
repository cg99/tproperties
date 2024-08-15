// app/api/properties/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/models/Property';

export async function POST(request: Request) {
    await connectToDatabase();

    const data = await request.json();

    console.log(data);

    try {
        const property = new Property(data);
        await property.save();
        return NextResponse.json(property, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function GET() {
    await connectToDatabase();

    try {
        const properties = await Property.find().populate('agent');
        return NextResponse.json(properties);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
