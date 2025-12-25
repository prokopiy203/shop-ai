import React from "react";

export default function AdminContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        mx-auto
        w-full

        /* padding */
        px-3
        sm:px-4
        md:px-6
        xl:px-8

        /* max-width */
        max-w-[100%]
        lg:max-w-[1280px]
        xl:max-w-[1440px]
        2xl:max-w-[1680px]
      "
    >
      {children}
    </div>
  );
}
