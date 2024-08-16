"use client";

import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Sidebar from "@/components/layout/Sidebar";
import Container from "@mui/material/Container";
import { JWT } from "next-auth/jwt";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const [userRole, setUserRole] = useState<string>("");

    useEffect(() => {
        async function fetchUserRole() {
            const sessionData = await getSession();
            if (sessionData?.user) {
                // Assuming the role is stored in session.user.role
                setUserRole(sessionData.user.role || "Customer");
            }
        }

        fetchUserRole();
    }, []);

    return (
        <Container maxWidth="md">
            <Sidebar sidebarWidth={240} userRole={userRole} />
            {children}
        </Container>
    );
}
