import AdminHeaderTitle from "@/components/layout/admin/header/AdminHeaderTitle";
import ThemeToggle from "@/components/layout/admin/controls/ThemeToggle";
import AdminContentContainer from "@/components/layout/admin/shell/AdminContentContainer";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminHeader() {
  return (
    <header className="h-12 border-b border-border rounded-xl bg-sidebar/90  shadow-md  ">
      <AdminContentContainer>
        <div className="flex h-12 items-center gap-3">
          <SidebarTrigger className="hidden md:flex" />
          <AdminHeaderTitle />
          <div className="ml-auto flex items-center gap-2.5">
            <ThemeToggle />
            <SidebarTrigger className="md:hidden" />
          </div>
        </div>
      </AdminContentContainer>
    </header>
  );
}
