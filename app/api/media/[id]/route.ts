import { NextResponse } from "next/server";
import { sheets, SPREADSHEET_ID } from "@/lib/google";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const rowId = parseInt(params.id);
        if (isNaN(rowId)) throw new Error("Invalid ID");

        // In Google Sheets, we delete the row to shift others up
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: SPREADSHEET_ID!,
            requestBody: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: 0, // Assuming Media is the first sheet (index 0)
                                dimension: "ROWS",
                                startIndex: rowId - 1,
                                endIndex: rowId,
                            },
                        },
                    },
                ],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
