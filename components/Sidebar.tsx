"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Image,
    Home,
    Settings,
    LogOut,
    ChevronRight,
    FileText,
    Users
} from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Documents", href: "/admin/docs", icon: FileText },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Homepage Editor", href: "/admin/home", icon: Home },
    { name: "Header Settings", href: "/admin/header", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="admin-sidebar">
            <div className="mb-10">
                <h1 className="text-xl font-bold">Conspace Admin</h1>
                <p className="text-xs opacity-60">Control Panel v1.0</p>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                                isActive
                                    ? "bg-white/10 text-white"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
                <button className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors w-full p-3">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
