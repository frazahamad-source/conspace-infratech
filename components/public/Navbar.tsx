"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface Page {
    id: string | number;
    title: string;
    path: string;
    isVisible: boolean;
}

export default function Navbar() {
    const [pages, setPages] = useState<Page[]>([]);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pagesRes, settingsRes] = await Promise.all([
                    fetch("/api/pages"),
                    fetch("/api/settings"),
                ]);
                const pagesData = await pagesRes.json();
                const settingsData = await settingsRes.json();

                if (!pagesData.error) {
                    setPages(pagesData.filter((p: Page) => p.isVisible));
                }
                if (!settingsData.error) {
                    setLogoUrl(settingsData.logoPath);
                }
            } catch (error) {
                console.error("Failed to fetch navbar data:", error);
            }
        };

        fetchData();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
                }`}
        >
            <div className="container flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex flex-col items-center">
                    {logoUrl ? (
                        <img src={logoUrl} alt="Conspace Infratech" className="h-12 w-auto object-contain" />
                    ) : (
                        <>
                            <span className={`text-2xl font-bold ${isScrolled ? "text-primary" : "text-white"} leading-tight`}>
                                Conspace Infratech
                            </span>
                            <span className={`text-[10px] font-semibold ${isScrolled ? "text-secondary" : "text-white/80"} tracking-widest uppercase -mt-1`}>
                                INTERIOR I CONSTRUCTION I REAL ESTATE
                            </span>
                        </>
                    )}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                    <ul className="flex items-center space-x-8">
                        {pages.map((page) => (
                            <li key={page.id}>
                                <Link
                                    href={page.path}
                                    className={`font-medium transition-colors hover:text-secondary ${isScrolled ? "text-primary" : "text-white"
                                        } ${page.path === "#contact" ? "btn btn-primary !text-white !py-2 !px-6" : ""}`}
                                >
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <X className={isScrolled ? "text-primary" : "text-white"} size={28} />
                    ) : (
                        <Menu className={isScrolled ? "text-primary" : "text-white"} size={28} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-primary z-40 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    } md:hidden flex flex-col items-center justify-center space-y-8`}
            >
                {pages.map((page) => (
                    <Link
                        key={page.id}
                        href={page.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white text-2xl font-bold hover:text-secondary transition-colors"
                    >
                        {page.title}
                    </Link>
                ))}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 right-4 text-white"
                >
                    <X size={32} />
                </button>
            </div>
        </header>
    );
}
