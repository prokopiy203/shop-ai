"use client";

import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "next/navigation";
import { ProductBase } from "@shop-ai/types";
import { useAdminProductById } from "../_queries/useAdminProductsById";
import { useProductsDraftStore } from "../_store/products";
import { ProductsErrorState } from "../../_components/ProductsErrorState";
import { ProductsSkeleton } from "../../_components/ProductsSkeleton";
import { useAutoSaveDraft } from "@/hooks/useAutoSaveDraft";
import { ProductTabs } from "../sections/ProductsTabs";
import { MobileSaveBar } from "../sections/MobileSaveBar";
import ProductSidebar from "../sections/Sidebar/ProductSidebar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { EditableProductTitle } from "../sections/EditableProductTitle";

export type ProductFormValues = ProductBase;

export default function EditProductForm() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;

  const { data: product, isLoading, isError } = useAdminProductById(productId);

  const saveDraft = useProductsDraftStore((s) => s.saveDraft);

  const methods = useForm<ProductFormValues>();

  const { handleSubmit, reset } = methods;

  // ⬇️ ініціалізація форми при завантаженні продукту
  useEffect(() => {
    console.log("RESET FORM");
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  // ⬇️ autosave draft (debounced, стабільно)
  useAutoSaveDraft<ProductFormValues>({
    productId,
    product,
    control: methods.control,
    isDirty: methods.formState.isDirty,
    saveDraft,
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("SAVE TO API", data);
    // TODO: mutation
  };

  if (isLoading) return <ProductsSkeleton />;
  if (isError || !product) return <ProductsErrorState />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        {/* MAIN LAYOUT */}
        <div
          className="grid grid-cols-1
          /* tablet + */
          /* tablet / small desktop */
    lg:grid-cols-[minmax(0,1fr)_minmax(220px,24%)]

    /* desktop */
    xl:grid-cols-[minmax(0,1fr)_minmax(260px,22%)]

    /* wide desktop (optional) */
    2xl:grid-cols-[minmax(0,1fr)_320px]
          gap-6
        "
        >
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* TITLE */}
            <EditableProductTitle />

            {/* TABS + CONTENT */}
            <ProductTabs />
          </div>

          {/* RIGHT SIDEBAR */}

          <ProductSidebar />
        </div>

        {/* MOBILE SAVE BAR */}
        <MobileSaveBar />
      </form>
    </FormProvider>
  );
}
