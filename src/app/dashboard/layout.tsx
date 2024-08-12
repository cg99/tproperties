"use client"

import Sidebar from "@/components/Sidebar";
import Container from "@mui/material/Container";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Container maxWidth="md">
            <Sidebar sidebarWidth={240} />
            {children}
        </Container>
    );
}
