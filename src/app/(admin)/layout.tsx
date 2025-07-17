import AdminSidebarNavigation from "@/components/main/navigations/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {" "}
      <div className="flex items-center gap-3 bg-gray-100 dark:bg-background">
        <div>
          <AdminSidebarNavigation />
        </div>
        <div className="mx-5 w-full">
          {/* <AdminNavbar /> */}
          <div className={`min-h-screen`}>{children}</div>
        </div>
      </div>
    </>
  );
}
