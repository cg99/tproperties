import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {



        const { user, company, abn } = await req.json();

        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { email: user?.email },
            { company, abn, role: "Agent" },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Successfully registered as an agent', user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred ' + error }, { status: 500 });
    }
}
