import { NextResponse } from "next/server";
import { sheets, SPREADSHEET_ID } from "@/lib/google";

export async function GET() {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID!,
            range: "Settings!A2:D2",
        });

        const val = response.data.values?.[0] || [];
        return NextResponse.json({
            logoPath: val[0] || null,
            homeBgPath: val[1] || null,
            homepageHeadings: {
                main: val[2] || "",
                sub: val[3] || ""
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const current = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID!,
            range: "Settings!A2:D2",
        });

        const val = current.data.values?.[0] || ["", "", "", ""];

        if (body.logoPath !== undefined) val[0] = body.logoPath;
        if (body.homeBgPath !== undefined) val[1] = body.homeBgPath;
        if (body.homepageHeadings) {
            val[2] = body.homepageHeadings.main;
            val[3] = body.homepageHeadings.sub;
        }

        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID!,
            range: "Settings!A2:D2",
            valueInputOption: "USER_ENTERED",
            requestBody: { values: [val] },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
