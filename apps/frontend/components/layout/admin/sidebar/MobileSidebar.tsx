"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidebarNav from "./SidebarNav";
import AdminUserMenu from "./AdminUserMenu";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[260px] bg-sidebar p-0 flex flex-col justify-between"
      >
        <SheetTitle className="sr-only">Admin navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Main admin navigation menu
        </SheetDescription>
        <SidebarNav />
        <AdminUserMenu />
      </SheetContent>
    </Sheet>
  );
}
