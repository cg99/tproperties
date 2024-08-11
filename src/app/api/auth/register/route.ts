import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({ message: 'User created successfully' });
}
