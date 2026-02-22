"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Phone, Calendar, Loader2, MessageSquare } from "lucide-react";

export default function LeadsManager() {
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/leads");
            const data = await res.json();
            setLeads(data);
        } catch (error) {
            console.error("Fetch leads error", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <Users size={24} className="text-primary" />
                    Incoming Leads
                </h2>
                <button
                    onClick={fetchLeads}
                    className="text-sm text-primary hover:underline"
                >
                    Refresh List
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-bottom border-slate-200">
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-slate-400">No leads found yet.</td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Calendar size={14} />
                                                    {new Date(lead.date).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="font-medium text-slate-900">{lead.name}</span>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <Mail size={14} className="text-slate-400" />
                                                        {lead.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <Phone size={14} className="text-slate-400" />
                                                        {lead.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-start gap-2 text-sm text-slate-600 max-w-xs">
                                                    <MessageSquare size={14} className="text-slate-400 mt-1 shrink-0" />
                                                    <p className="line-clamp-2" title={lead.message}>{lead.message}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
