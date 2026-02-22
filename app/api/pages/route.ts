import { NextResponse } from "next/server";
import { sheets, SPREADSHEET_ID } from "@/lib/google";

export async function GET() {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID!,
            range: "Pages!A2:E",
        });

        const rows = response.data.values || [];
        const pages = rows.map((row, index) => ({
            id: index + 2,
            title: row[0],
            path: row[1],
            isVisible: row[2] === "TRUE",
            order: parseInt(row[3] || "0"),
        }));

        return NextResponse.json(pages);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { pages } = await request.json();

        const values = pages.map((page: any) => [
            page.title,
            page.path,
            page.isVisible ? "TRUE" : "FALSE",
            page.order,
            new Date().toISOString()
        ]);

        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID!,
            range: `Pages!A2:E${values.length + 1}`,
            valueInputOption: "USER_ENTERED",
            requestBody: { values },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
