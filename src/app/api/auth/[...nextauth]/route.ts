import NextAuth, { NextAuthOptions, User as NextAuthUser, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';



export const authOptions: NextAuthOptions = {
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
              email: user.email,
              role: user.role, // Add role to the session
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
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: NextAuthUser }) {
      if (user) {
        token.role = user?.role; // Add role to the JWT token
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token && session.user) {
        session.user.role = token.role as string; // Include role in the session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
