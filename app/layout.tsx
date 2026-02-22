import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Conspace Infratech | Admin",
    description: "Admin panel for Conspace Infratech",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                {children}
                <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />
            </body>
        </html>
    );
}
