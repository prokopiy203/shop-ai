"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProductMainInfo } from "./ProductsTabs/ProductMainInfo";

export function ProductTabs() {
  return (
    <>
      {/* DESKTOP */}
      <Tabs defaultValue="general" className="hidden md:block">
        <TabsList className="border-b bg-transparent">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="ai">AI Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <ProductMainInfo />
        </TabsContent>

        <TabsContent value="media">{/* ProductMedia */}</TabsContent>
      </Tabs>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        <ProductMainInfo />

        {/* інші секції як Accordion — додамо пізніше */}
      </div>
    </>
  );
}
