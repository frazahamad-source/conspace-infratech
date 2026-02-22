"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

export default function Hero() {
    const [headings, setHeadings] = useState({ title: "", subtitle: "" });
    const [bgImage, setBgImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch("/api/settings");
                const data = await response.json();
                if (!data.error) {
                    setHeadings({
                        title: data.homepageHeadings?.title || "Excellence in Construction",
                        subtitle: data.homepageHeadings?.subtitle || "Building strong foundations for a better tomorrow.",
                    });
                    setBgImage(data.homeBgPath || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80");
                }
            } catch (err) {
                console.error("Failed to fetch hero data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHeroData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("submitting");
        const formData = new FormData(e.currentTarget);
        const leadData = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadData),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setFormStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error("Lead submission failed:", error);
            setFormStatus("error");
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
                style={{
                    backgroundImage: `linear-gradient(rgba(15, 44, 89, 0.7), rgba(15, 44, 89, 0.7)), url('${bgImage}')`
                }}
            />

            <div className="container relative z-20 flex flex-col md:flex-row items-center gap-12 pt-20">
                {/* Hero Text */}
                <div className="md:flex-1 text-white space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
                        {headings.title.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                        ))}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-lg">
                        {headings.subtitle}
                    </p>
                    <div className="flex gap-4">
                        <a href="#projects" className="btn btn-secondary">View Projects</a>
                        <a href="#services" className="btn border-2 border-white text-white hover:bg-white hover:text-primary">Our Services</a>
                    </div>
                </div>

                {/* Lead Form Overlay */}
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                    <h3 className="text-2xl font-bold text-primary mb-6 text-center">Get a Free Quote</h3>

                    {formStatus === "success" ? (
                        <div className="text-center py-8 space-y-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <ChevronRight size={32} />
                            </div>
                            <h4 className="text-lg font-semibold">Thank You!</h4>
                            <p className="text-slate-500">We've received your inquiry and will get back to you soon.</p>
                            <button onClick={() => setFormStatus("idle")} className="text-primary font-medium hover:underline">Send another inquiry</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Name</label>
                                <input name="name" type="text" placeholder="Your Name" required className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Email</label>
                                <input name="email" type="email" placeholder="Your Email" required className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Service Needed</label>
                                <select name="service" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                                    <option value="Construction">Construction</option>
                                    <option value="Interiors">Interiors</option>
                                    <option value="Real Estate">Real Estate</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700">Message</label>
                                <textarea name="message" rows={3} placeholder="Tell us about your project" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <button
                                type="submit"
                                disabled={formStatus === "submitting"}
                                className="w-full btn btn-primary flex items-center justify-center gap-2"
                            >
                                {formStatus === "submitting" ? <Loader2 className="animate-spin" size={20} /> : "Submit Inquiry"}
                            </button>
                            {formStatus === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
