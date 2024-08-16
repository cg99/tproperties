// src/app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import UserDashboard from "@/components/dashboard/UserDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session?.user) {
        return <p>Unauthorized</p>;
    }

    const role = session?.user?.role!;

    return (
        <div>
            {role === "admin" && <AdminDashboard />}
            {role === "agent" && <AgentDashboard />}
            {role === "user" && <UserDashboard />}
            {!["admin", "agent", "user"].includes(role) && (
                <p>Invalid role: {role}</p>
            )}
        </div>
    );
}
