"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Map pathname to title
    const getTitle = (path: string) => {
        switch (path) {
            case "/admin": return "Dashboard";
            case "/admin/media": return "Media Library";
            case "/admin/home": return "Homepage Editor";
            case "/admin/header": return "Header Settings";
            default: return "Admin Panel";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <main className="admin-main">
                <header className="admin-topbar">
                    <h2 className="text-2xl font-bold text-slate-800">{getTitle(pathname)}</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-500">Welcome, Admin</span>
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                            AD
                        </div>
                    </div>
                </header>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
