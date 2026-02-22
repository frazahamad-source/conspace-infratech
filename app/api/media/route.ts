import { NextResponse } from "next/server";
import { sheets, SPREADSHEET_ID } from "@/lib/google";

export async function GET() {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID!,
            range: "Media!A2:C",
        });

        const rows = response.data.values || [];
        const images = rows.map((row, index) => ({
            id: index + 2, // Row number as ID for simplicity
            url: row[0],
            storagePath: row[1],
            createdAt: row[2]
        }));

        return NextResponse.json(images);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { url, storagePath } = await request.json();

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID!,
            range: "Media!A:C",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[url, storagePath, new Date().toISOString()]],
            },
        });

        return NextResponse.json({ url, storagePath, id: response.data.updates?.updatedRange });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
