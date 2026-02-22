"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

interface MediaItem {
    id: string | number;
    url: string;
    storagePath: string;
    createdAt: string;
}

export default function MediaGrid() {
    const [images, setImages] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/media");
                const data = await response.json();
                if (!data.error) {
                    setImages(data || []);
                }
            } catch (error) {
                console.error("Failed to fetch media:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[4/3] bg-slate-100 animate-pulse rounded-xl" />
                ))}
            </div>
        );
    }

    if (images.length === 0) return null;

    return (
        <section id="projects" className="section bg-slate-50">
            <div className="container">
                <div className="section-header">
                    <h2>Our Projects</h2>
                    <p>Explore some of our recently completed work across Mangalore.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((img) => (
                        <div key={img.id} className="group relative aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                            <img
                                src={img.url}
                                alt="Project Image"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <a
                                    href={img.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary p-3 rounded-full hover:bg-secondary hover:text-white transition-colors"
                                >
                                    <ExternalLink size={24} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
