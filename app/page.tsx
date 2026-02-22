import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import MediaGrid from "@/components/public/MediaGrid";
import Footer from "@/components/public/Footer";
import { Hammer, Sofa, Building2 } from "lucide-react";

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />

            {/* Services Section */}
            <section id="services" className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Expertise</h2>
                        <p>Comprehensive solutions for all your infrastructure needs.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-10 bg-slate-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Hammer size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4">Construction</h3>
                            <p className="text-slate-600">High-quality residential and commercial construction with premium materials.</p>
                        </div>
                        <div className="p-10 bg-slate-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sofa size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4">Interiors</h3>
                            <p className="text-slate-600">Modern, functional, and aesthetic interior designs tailored to your lifestyle.</p>
                        </div>
                        <div className="p-10 bg-slate-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Building2 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4">Real Estate</h3>
                            <p className="text-slate-600">Buying, selling, and property management services in Mangalore.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Media/Projects Section */}
            <MediaGrid />

            {/* About Section */}
            <section id="about" className="section bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-primary">About Conspace Infratech</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Conspace Infratech is a leading partnership firm in Mangalore, dedicated to transforming visions into reality. With expertise spanning real estate, interior design, and construction, we deliver excellence in every project.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Our team of professionals works closely with clients to ensure every detail is perfected, from the foundation to the final decorative touches.
                            </p>
                            <div className="pt-4">
                                <a href="#contact" className="btn btn-primary">Learn More About Us</a>
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="About Us"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section bg-primary text-white">
                <div className="container">
                    <div className="section-header">
                        <h2 className="!text-white">What Our Clients Say</h2>
                        <p className="text-white/70">Trusted by homeowners and businesses across the city.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 italic">
                            <p className="mb-6 text-lg">"Conspace Infratech transformed our home completely. The attention to detail in the interiors was amazing."</p>
                            <span className="text-secondary font-bold">- Rajesh Kumar</span>
                        </div>
                        <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 italic">
                            <p className="mb-6 text-lg">"Professional team and timely delivery. Highly recommended for construction projects in Mangalore."</p>
                            <span className="text-secondary font-bold">- Priya Shetty</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
