"use client";

import { useState, useEffect } from "react";
import { FileText, Download, Trash2, Loader2, Upload, ExternalLink } from "lucide-react";

export default function DocumentLibrary() {
    const [docs, setDocs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchDocs();
    }, []);

    const fetchDocs = async () => {
        try {
            const res = await fetch("/api/docs");
            const data = await res.json();
            setDocs(data);
        } catch (error) {
            console.error("Fetch error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/docs", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            setDocs([data, ...docs]);
        } catch (error) {
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800">Documents Library</h2>
                <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                    {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                    <span>Upload Document</span>
                    <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} />
                </label>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {docs.map((doc) => (
                        <div key={doc.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
                                <FileText size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-900 truncate" title={doc.name}>{doc.name}</p>
                                <p className="text-xs text-slate-500">{(doc.size / 1024).toFixed(1)} KB</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <a href={doc.webViewLink} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80 text-sm flex items-center gap-1">
                                        <ExternalLink size={14} /> View
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
