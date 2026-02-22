import { NextResponse } from "next/server";
import { drive, DRIVE_FOLDER_ID } from "@/lib/google";
import { Readable } from "stream";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) throw new Error("No file uploaded");

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                parents: [DRIVE_FOLDER_ID!],
            },
            media: {
                mimeType: file.type,
                body: Readable.from(buffer),
            },
            fields: "id, name, webViewLink, iconLink",
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Docs Upload Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const response = await drive.files.list({
            q: `'${DRIVE_FOLDER_ID}' in parents and trashed = false`,
            fields: "files(id, name, webViewLink, iconLink, size, createdTime)",
        });

        return NextResponse.json(response.data.files || []);
    } catch (error: any) {
        console.error("Docs Fetch Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
