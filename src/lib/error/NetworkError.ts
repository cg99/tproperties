import { NextResponse } from "next/server";

export function getNetworkError(error: any) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
}