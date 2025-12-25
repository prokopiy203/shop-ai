"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  admin: "Home",
  dashboard: "Dashboard",
  products: "Products",
  orders: "Orders",
  users: "Users",
  settings: "Settings",
  create: "Create",
  edit: "Edit",
};

export default function AdminHeaderTitle() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  let currentPath = "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          currentPath += `/${segment}`;
          const isLast = index === segments.length - 1;

          // Якщо це id — не показуємо
          if (/^\d+$/.test(segment)) return null;

          const label =
            LABELS[segment] ??
            segment.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <div key={currentPath} className="flex items-end">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className=" text-foreground">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={currentPath}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
