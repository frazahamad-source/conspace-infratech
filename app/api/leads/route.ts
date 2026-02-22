import { NextResponse } from "next/server";
import { sheets, SPREADSHEET_ID } from "@/lib/google";

export async function POST(request: Request) {
    try {
        const { name, email, phone, message } = await request.json();

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID!,
            range: "Leads!A:E",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[new Date().toISOString(), name, email, phone, message]],
            },
        });

        return NextResponse.json({ success: true, data: response.data });
    } catch (error: any) {
        console.error("Leads API Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID!,
            range: "Leads!A:E",
        });

        const rows = response.data.values || [];
        const leads = rows.slice(1).map((row, index) => ({
            id: index,
            date: row[0],
            name: row[1],
            email: row[2],
            phone: row[3],
            message: row[4],
        }));

        return NextResponse.json(leads);
    } catch (error: any) {
        console.error("Leads GET API Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
