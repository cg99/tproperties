import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });

        if (user && credentials?.password) {
          const isValidPassword = await bcrypt.compare(credentials?.password, user.password);
          if (isValidPassword) {
            return {
              id: user._id,
              // name: user.name,
              email: user.email,
            };
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('No user found with this email');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
