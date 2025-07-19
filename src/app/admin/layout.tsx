import AdminNavbar from "@/components/admin/AdminNavber";
import Sidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle would go here */}
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}