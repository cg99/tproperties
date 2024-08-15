// app/api/properties/[id]/route.ts
import Property from '@/models/Property';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';


export async function GET(request: Request) {
    await connectToDatabase();

    // Extract pathname from the request URL
    const { pathname } = new URL(request.url);

    // Assuming URL is of the form /api/properties/{id}, split to get the id
    const id = pathname.split('/').pop(); // Get the last part of the pathname

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    try {
        const property = await Property.findById(id).populate('agent');
        if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        return NextResponse.json(property);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



export async function PUT(request: Request) {
    await connectToDatabase();

    const data = await request.json();
    // Extract pathname from the request URL
    const { pathname } = new URL(request.url);

    // Assuming URL is of the form /api/properties/{id}, split to get the id
    const id = pathname.split('/').pop(); // Get the last part of the pathname
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    try {
        const property = await Property.findByIdAndUpdate(id, data, { new: true });
        if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        return NextResponse.json({ data: property }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await connectToDatabase();

    // Extract pathname from the request URL
    const { pathname } = new URL(request.url);

    // Assuming URL is of the form /api/properties/{id}, split to get the id
    const id = pathname.split('/').pop(); // Get the last part of the pathname
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    try {
        const property = await Property.findByIdAndDelete(id);
        if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        return NextResponse.json({ message: 'Property deleted successfully' }, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}