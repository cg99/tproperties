import { Session } from "next-auth";

// Extend the Session type
export interface ExtendedSession extends Session {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    }
}
