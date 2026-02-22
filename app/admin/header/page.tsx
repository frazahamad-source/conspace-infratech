"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/ImageUploader";
import { Save, List, Image as ImageIcon, Check, X, Loader2, Plus } from "lucide-react";

interface PageSetting {
    id: string;
    title: string;
    path: string;
    isVisible: boolean;
}

export default function HeaderSettings() {
    const [logoPath, setLogoPath] = useState<string | null>(null);
    const [pages, setPages] = useState<PageSetting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSavingPages, setIsSavingPages] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch Logo from settings
            const settingsRes = await fetch('/api/settings');
            const settingsData = await settingsRes.json();
            if (settingsData && !settingsData.error) {
                setLogoPath(settingsData.logoPath);
            }

            // Fetch Pages
            const pagesRes = await fetch('/api/pages');
            const pagesData = await pagesRes.json();

            if (pagesData && pagesData.length > 0 && !pagesData.error) {
                setPages(pagesData);
            }
        } catch (error: any) {
            console.error("Error fetching header settings:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoUpload = async (url: string, path: string) => {
        try {
            const response = await fetch('/api/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ logoPath: url }),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setLogoPath(url);
            alert("Logo updated successfully!");
        } catch (error: any) {
            console.error("Error updating logo:", error.message);
        }
    };

    const handlePageChange = (id: string, field: keyof PageSetting, value: any) => {
        setPages(pages.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const savePages = async () => {
        setIsSavingPages(true);
        try {
            const response = await fetch('/api/pages', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pages),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);

            alert("Navigation settings saved!");
        } catch (error: any) {
            console.error("Error saving pages:", error.message);
            alert("Save failed.");
        } finally {
            setIsSavingPages(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center animate-pulse">Loading settings...</div>;

    return (
        <div className="space-y-12">
            {/* Logo Section */}
            <section className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-800">
                    <ImageIcon size={20} className="text-primary" />
                    <h3 className="text-lg font-bold">Site Logo</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500">
                            Upload your company logo. Transparent PNGs are recommended.
                        </p>
                        <div className="h-24 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center p-4">
                            {logoPath ? (
                                <img src={logoPath} alt="Logo Preview" className="h-full object-contain" />
                            ) : (
                                <span className="text-2xl font-bold text-primary opacity-20">No Logo</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-3">Replace Logo</h4>
                        <ImageUploader onUploadComplete={handleLogoUpload} folder="branding" />
                    </div>
                </div>
            </section>

            <hr className="border-slate-100" />

            {/* Pages Section */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-slate-800">
                        <List size={20} className="text-primary" />
                        <h3 className="text-lg font-bold">Navigation Manager</h3>
                    </div>
                    <button
                        onClick={savePages}
                        disabled={isSavingPages}
                        className="btn-admin btn-admin-primary flex items-center space-x-2"
                    >
                        {isSavingPages ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        <span>Save All Changes</span>
                    </button>
                </div>

                <p className="text-sm text-slate-500 mb-6">
                    Manage the links that appear in the website header. Changing titles here will update the menu text.
                </p>

                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                    <table className="w-full text-left">
                        <thead className="bg-slate-100 text-slate-600 text-sm font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Page Title</th>
                                <th className="px-6 py-4">Path (Target)</th>
                                <th className="px-6 py-4">Visible</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {pages.map((page) => (
                                <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={page.title}
                                            onChange={(e) => handlePageChange(String(page.id), "title", e.target.value)}
                                            className="w-full p-2 border border-slate-200 rounded-md focus:border-primary outline-none text-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{page.path}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={page.isVisible}
                                                onChange={(e) => handlePageChange(String(page.id), "isVisible", e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
