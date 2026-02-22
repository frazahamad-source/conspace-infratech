"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/ImageUploader";
import { Trash2, ExternalLink, AlertCircle } from "lucide-react";

interface MediaItem {
    id: string;
    url: string;
    storagePath: string;
    createdAt: string;
}

export default function MediaLibrary() {
    const [images, setImages] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch('/api/media');
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setImages(data || []);
        } catch (error: any) {
            console.error("Error fetching images:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadComplete = async (url: string, path: string) => {
        try {
            const response = await fetch('/api/media', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, storagePath: path }),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setImages([data, ...images]);
        } catch (error: any) {
            console.error("Error saving image ref:", error.message);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        const item = images.find(img => String(img.id) === deleteId);
        if (!item) return;

        try {
            // 1. Delete from Database (API handles Cloudinary deletion if configured)
            const dbResponse = await fetch(`/api/media/${deleteId}`, {
                method: 'DELETE',
            });
            const dbData = await dbResponse.json();
            if (dbData.error) throw new Error(dbData.error);

            setImages(images.filter(img => String(img.id) !== deleteId));
            setDeleteId(null);
        } catch (error: any) {
            console.error("Error deleting image:", error.message);
            alert("Delete failed.");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-800">Upload New Images</h3>
                <ImageUploader onUploadComplete={handleUploadComplete} />
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Library ({images.length} images)</h3>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="aspect-square bg-slate-100 animate-pulse rounded-lg"></div>
                        ))}
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-slate-400">No images uploaded yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                <img src={img.url} alt="Project" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                    <a href={img.url} target="_blank" className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors">
                                        <ExternalLink size={18} />
                                    </a>
                                    <button
                                        onClick={() => setDeleteId(img.id)}
                                        className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                        <div className="flex items-center space-x-3 text-red-600 mb-4">
                            <AlertCircle size={24} />
                            <h4 className="text-lg font-bold">Delete Image?</h4>
                        </div>
                        <p className="text-slate-600 mb-6">
                            This will permanently remove the image from storage and the database. This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="btn-admin border border-slate-300 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn-admin btn-admin-danger"
                            >
                                Delete permanently
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
