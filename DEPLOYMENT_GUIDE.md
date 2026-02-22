# 🚀 Deployment Guide: Conspace Infratech

This guide explains how to take your dynamic website and Admin Panel live using GitHub and Vercel.

## Prerequisites
1.  **GitHub Account**: To host your code.
2.  **Vercel Account**: To host the live website.
3.  **Google Cloud Service Account**: (Already created) The email ending in `.gserviceaccount.com`.

---

## 1. Upload Code to GitHub
1.  Create a new repository on [GitHub](https://github.com/new).
2.  In your local project folder, run these commands:
    ```bash
    git init
    git add .
    git commit -m "initial commit"
    git branch -M main
    git remote add origin YOUR_REPOSITORY_URL
    git push -u origin main
    ```

---

## 2. Deploy to Vercel
1.  Log in to [Vercel](https://vercel.com).
2.  Click **Add New** > **Project**.
3.  **Import** your GitHub repository.
4.  Before clicking "Deploy", expand the **Environment Variables** section.

---

## 3. Configure Environment Variables
Copy the following keys and their exact values from your `.env` file into Vercel:

| Key | Description |
| :--- | :--- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Yours ends in `.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | Copy the WHOLE text including the BEGIN/END lines |
| `GOOGLE_SHEETS_ID` | The ID from your spreadsheet URL |
| `GOOGLE_DRIVE_FOLDER_ID` | The ID from your Drive folder URL |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary Cloud Name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Your Unsigned Upload Preset |
| `CLOUDINARY_API_KEY` | Found in Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Found in Cloudinary Dashboard |

> [!IMPORTANT]
> For `GOOGLE_PRIVATE_KEY`, if you copied it with `\n` characters, Vercel might necesita special handling. Usually, just pasting the original string works.

---

## 4. Grant Google Permissions
Your website needs "Permission" to read/write to your files.
1.  **Google Sheets**: 
    - Open your spreadsheet.
    - Click **Share**.
    - Add your `GOOGLE_SERVICE_ACCOUNT_EMAIL` as an **Editor**.
2.  **Google Drive**: 
    - Open your "Documents" folder.
    - Click **Share**.
    - Add the same email as an **Editor**.

---

## 5. Test Your Live Site
Once Vercel finished deploying:
1.  Visit your Vercel URL (e.g., `conspace.vercel.app`).
2.  Go to `/admin` and try changing a heading.
3.  Go to the home page and verify the heading updated instantly!
4.  Submit a "Lead" on the home page and check your Google Sheet.

---

### Need Help?
If the site shows a "500 Internal Server Error", check the **Logs** tab in your Vercel dashboard. It usually means an environment variable is missing or Google permissions weren't granted.
