// app/api/properties/route.ts
import { NextResponse } from 'next/server';
import connectDb from '@/lib/mongodb';
import Property from '@/models/Property';
import { getNetworkError } from '@/lib/error/NetworkError';

export async function POST(request: Request) {
    await connectDb();

    const data = await request.json();

    try {
        const property = new Property(data);
        await property.save();
        return NextResponse.json(property, { status: 201 });
    } catch (error) {
        getNetworkError(error);
    }
}


export async function GET() {
    await connectDb();

    try {
        const properties = await Property.find().populate('agent');
        return NextResponse.json(properties);
    } catch (error) {
        getNetworkError(error);
    }
}
