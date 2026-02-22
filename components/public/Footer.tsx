"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-dark-bg text-white pt-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Conspace Infratech</h3>
                        <p className="text-slate-400">
                            Building strong foundations and transforming visions into reality since 2026.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">Quick Links</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><Link href="#home" className="hover:text-secondary transition-colors text-slate-400">Home</Link></li>
                            <li><Link href="#about" className="hover:text-secondary transition-colors text-slate-400">About Us</Link></li>
                            <li><Link href="#services" className="hover:text-secondary transition-colors text-slate-400">Services</Link></li>
                            <li><Link href="#projects" className="hover:text-secondary transition-colors text-slate-400">Projects</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">Contact Info</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li className="flex items-start space-x-3">
                                <MapPin size={20} className="text-secondary shrink-0" />
                                <span>Mangalore, Karnataka, India</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-secondary shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-secondary shrink-0" />
                                <span>info@conspaceinfratech.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* About Summary */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">About Us</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            We are a leading partnership firm in Mangalore, specializing in residential and commercial construction, innovative interior design, and prime real estate solutions.
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-sm text-slate-500">
                    <p>
                        &copy; {new Date().getFullYear()} Conspace Infratech. All rights reserved. |
                        <Link href="/admin" className="ml-2 hover:text-white transition-colors">Admin Panel</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
