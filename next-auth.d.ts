// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;  // Add the id field here
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string | null;  // Add role to the session user
        };
    }

    interface User {
        role?: string | null;  // Add role to the User type
    }
}
