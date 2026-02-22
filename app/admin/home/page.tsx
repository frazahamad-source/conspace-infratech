"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/ImageUploader";
import { Save, Image as ImageIcon, Type, Loader2 } from "lucide-react";

interface HomeSettings {
    homeBgPath: string | null;
    homepageHeadings: {
        main: string;
        sub: string;
    };
}

export default function HomepageEditor() {
    const [settings, setSettings] = useState<HomeSettings>({
        homeBgPath: null,
        homepageHeadings: { main: "", sub: "" },
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            const data = await response.json();

            if (data && !data.error) {
                setSettings({
                    homeBgPath: data.homeBgPath,
                    homepageHeadings: data.homepageHeadings || { main: "", sub: "" },
                });
            }
        } catch (error: any) {
            console.error("Error fetching homepage settings:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBgUpload = async (url: string, path: string) => {
        try {
            const response = await fetch('/api/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ homeBgPath: url }),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setSettings({ ...settings, homeBgPath: url });
            alert("Background updated successfully!");
        } catch (error: any) {
            console.error("Error updating background:", error.message);
        }
    };

    const handleSaveHeadings = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await fetch('/api/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ homepageHeadings: settings.homepageHeadings }),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);

            alert("Headings saved successfully!");
        } catch (error: any) {
            console.error("Error saving headings:", error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center animate-pulse">Loading settings...</div>;

    return (
        <div className="space-y-12">
            {/* Background Section */}
            <section className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-800">
                    <ImageIcon size={20} className="text-primary" />
                    <h3 className="text-lg font-bold">Background Image</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500">
                            The hero background image is the first thing users see. High resolution landscape images work best.
                        </p>
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative">
                            {settings.homeBgPath ? (
                                <img src={settings.homeBgPath} alt="Background Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400">
                                    No background set
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-3">Replace Background</h4>
                        <ImageUploader onUploadComplete={handleBgUpload} folder="branding" />
                    </div>
                </div>
            </section>

            <hr className="border-slate-100" />

            {/* Headings Section */}
            <section className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-800">
                    <Type size={20} className="text-primary" />
                    <h3 className="text-lg font-bold">Homepage Content</h3>
                </div>

                <form onSubmit={handleSaveHeadings} className="max-w-2xl space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Main Heading</label>
                        <input
                            type="text"
                            value={settings.homepageHeadings.main}
                            onChange={(e) => setSettings({
                                ...settings,
                                homepageHeadings: { ...settings.homepageHeadings, main: e.target.value }
                            })}
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="e.g. Excellence in Construction"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Subheading</label>
                        <textarea
                            rows={3}
                            value={settings.homepageHeadings.sub}
                            onChange={(e) => setSettings({
                                ...settings,
                                homepageHeadings: { ...settings.homepageHeadings, sub: e.target.value }
                            })}
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            placeholder="e.g. Building strong foundations for a better tomorrow."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="btn-admin btn-admin-primary flex items-center space-x-2"
                    >
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        <span>Save Changes</span>
                    </button>
                </form>
            </section>
        </div>
    );
}
