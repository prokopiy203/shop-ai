import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import AdminUserMenu from "./AdminUserMenu";
import SidebarNav from "./SidebarNav";

export default function AdminSidebar() {
  return (
    <Sidebar
      className="hidden md:flex
      w-64
      rounded-xl
      flex-col
        border-b
        border-r
        border-sidebar-border/90
        bg-sidebar/90
        text-sidebar-foreground
       shadow-lg"
    >
      {/* <aside
      className="
      hidden md:block
      w-64
      rounded-xl
        border-b
        border-r
        border-sidebar-border/90
        bg-sidebar/90
        text-sidebar-foreground
       shadow-lg
    "
    > */}
      <SidebarHeader>
        <AdminUserMenu />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* </aside> */}
    </Sidebar>
  );
}
