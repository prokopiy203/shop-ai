import AdminHeaderTitle from "@/components/layout/admin/header/AdminHeaderTitle";
import ThemeToggle from "@/components/layout/admin/controls/ThemeToggle";
import AdminContentContainer from "@/components/layout/admin/shell/AdminContentContainer";
import MobileSidebar from "../sidebar/MobileSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminHeader() {
  return (
    <header className="h-12 border-b border-border rounded-xl bg-sidebar/90  shadow-md  ">
      <AdminContentContainer>
        <div className="flex h-12 items-center gap-3">
          <SidebarTrigger />
          <AdminHeaderTitle />
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <MobileSidebar />
          </div>
        </div>
      </AdminContentContainer>
    </header>
  );
}
