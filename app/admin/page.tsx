export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Total Images</h3>
                    <p className="text-3xl font-bold text-primary">0</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Active Pages</h3>
                    <p className="text-3xl font-bold text-primary">4</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Last Update</h3>
                    <p className="text-lg font-bold text-primary">Just now</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">Quick Actions</h3>
                <div className="flex space-x-4">
                    <button className="btn-admin btn-admin-primary">Upload New Property Image</button>
                    <button className="btn-admin border border-slate-300 hover:bg-slate-50">Edit Homepage Headings</button>
                </div>
            </div>
        </div>
    );
}
