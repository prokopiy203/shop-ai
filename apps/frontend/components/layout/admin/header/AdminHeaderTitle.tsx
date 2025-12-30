"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbLabels } from "@/store/breadcrumb-labels";
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
  const dynamicLabels = useBreadcrumbLabels((s) => s.labels);

  let currentPath = "";

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-0.5 md:gap-1">
        {segments.map((segment, index) => {
          currentPath += `/${segment}`;

          const isLast = index === segments.length - 1;
          const isObjectId = /^[a-f\d]{24}$/i.test(segment);
          const dynamicLabel = dynamicLabels[segment];

          const label =
            dynamicLabel ??
            LABELS[segment] ??
            segment.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

          // 👉 якщо це ObjectId — лінк веде на /id/edit (якщо існує)
          const nextSegment = segments[index + 1];
          const objectIdTarget =
            isObjectId && nextSegment
              ? `${currentPath}/${nextSegment}`
              : currentPath;

          return (
            <div key={currentPath} className="flex items-end">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-foreground">
                    {isObjectId && !dynamicLabel ? (
                      <span className="inline-block h-4 w-32 animate-pulse rounded bg-muted" />
                    ) : (
                      label
                    )}
                  </BreadcrumbPage>
                ) : isObjectId ? (
                  // ❌ ObjectId сам по собі не клікабельний
                  <span className="text-muted-foreground">
                    {isObjectId && !dynamicLabel ? (
                      <span className="inline-block h-4 w-32 animate-pulse rounded bg-muted" />
                    ) : (
                      label
                    )}
                  </span>
                ) : (
                  // ✅ SPA-link
                  <BreadcrumbLink asChild>
                    <Link
                      href={objectIdTarget}
                      className="text-muted-foreground truncate max-w-[120px] md:max-w-none hover:text-foreground"
                    >
                      {label}
                    </Link>
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
