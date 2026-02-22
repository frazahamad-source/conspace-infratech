"use client";

import { useState, useEffect } from "react";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { CLOUDINARY_CONFIG } from "@/lib/cloudinary";

interface ImageUploaderProps {
    onUploadComplete: (url: string, path: string) => void;
    folder?: string;
}

declare global {
    interface Window {
        cloudinary: any;
    }
}

export default function ImageUploader({ onUploadComplete }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);

    const openWidget = () => {
        if (typeof window.cloudinary === "undefined") {
            alert("Cloudinary widget is still loading... Please try again in a moment.");
            return;
        }

        const myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: CLOUDINARY_CONFIG.cloudName,
                uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
                sources: ["local", "url", "camera"],
                multiple: false,
                cropping: true,
                styles: {
                    palette: {
                        window: "#FFFFFF",
                        windowBorder: "#90A0B3",
                        tabIcon: "#0F2C59",
                        menuIcons: "#5A6171",
                        textDark: "#000000",
                        textLight: "#FFFFFF",
                        link: "#0F2C59",
                        action: "#0F2C59",
                        inactiveTabIcon: "#0E2F5A",
                        error: "#F44235",
                        inProgress: "#0078FF",
                        complete: "#20B832",
                        sourceBg: "#E4EBF1"
                    }
                }
            },
            (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    setIsUploading(false);
                    onUploadComplete(result.info.secure_url, result.info.public_id);
                }
                if (result.event === "uploading") {
                    setIsUploading(true);
                }
            }
        );

        myWidget.open();
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-primary transition-colors bg-slate-50">
            <button
                onClick={openWidget}
                disabled={isUploading}
                className="flex flex-col items-center space-y-2 text-slate-500 hover:text-primary transition-colors w-full"
            >
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-slate-200">
                    {isUploading ? <Loader2 className="animate-spin" size={24} /> : <Upload size={24} />}
                </div>
                <span className="font-medium">
                    {isUploading ? "Uploading..." : "Click to upload with Cloudinary"}
                </span>
                <span className="text-xs">PNG, JPG or WebP (Max 10MB)</span>
            </button>
        </div>
    );
}
