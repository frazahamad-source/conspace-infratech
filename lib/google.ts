import { google } from "googleapis";

const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
];

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
});

export const sheets = google.sheets({ version: "v4", auth });
export const drive = google.drive({ version: "v3", auth });

export const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
export const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// Helper to ensure sheets exist or initialize them
export async function initializeSheets() {
    try {
        const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID! });
        const sheetNames = meta.data.sheets?.map(s => s.properties?.title);

        // In a real implementation, we would check for "Leads", "Settings", "Pages"
        // and create them if missing. For now, we assume provide IDs.
        return sheetNames;
    } catch (error) {
        console.error("Google Sheets Initialization Error:", error);
        throw error;
    }
}
