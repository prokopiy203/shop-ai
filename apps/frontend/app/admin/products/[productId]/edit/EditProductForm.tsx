"use client";

import { useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "next/navigation";
import { useAdminProductById } from "../_queries/useAdminProductsById";
import { useProductsDraftStore } from "../_store/products";
import { ProductsErrorState } from "../../_components/ProductsErrorState";
import { ProductsSkeleton } from "../../_components/ProductsSkeleton";
import { useAutoSaveDraft } from "@/hooks/useAutoSaveDraft";
import { ProductTabs } from "../sections/ProductsTabs";
import { MobileSaveBar } from "../sections/MobileSaveBar";
import ProductSidebar from "../sections/Sidebar/ProductSidebar";
import { EditableProductTitle } from "../sections/EditableProductTitle";
import { useBreadcrumbLabels } from "@/store/breadcrumb-labels";
import { useEditProductForm } from "../_queries/useEditProductForm";
import { ProductFormValues } from "../types/product-form";
import { mapProductToForm } from "../lib/mapProductToForm";

export default function EditProductForm() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;

  const { data: product, isLoading, isError } = useAdminProductById(productId);
  const setLabel = useBreadcrumbLabels((s) => s.setLabel);
  const { save, isSaving } = useEditProductForm(productId);
  const draft = useProductsDraftStore((s) => s.draft);
  const saveDraft = useProductsDraftStore((s) => s.saveDraft);
  const isInitializedRef = useRef(false);
  const methods = useForm<ProductFormValues>();

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!product || isInitializedRef.current) return;

    reset({
      ...mapProductToForm(product),
      ...(draft ?? {}),
    });
    setLabel(productId, product.title);

    isInitializedRef.current = true;
  }, [product, productId, reset, draft, setLabel]);

  useAutoSaveDraft<ProductFormValues>({
    productId,
    control: methods.control,
    isDirty: methods.formState.isDirty,
    saveDraft,
  });

  const onSubmit = (data: ProductFormValues) => {
    const payload = {
      title: data.title,
      description: data.description,
      isActive: data.isActive,
      price: data.price,
      stock: data.stock,
      tags: data.tags,
    };

    save(payload);
    // TODO: mutation
  };

  if (isLoading) return <ProductsSkeleton />;
  if (isError || !product) return <ProductsErrorState />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3">
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
          gap-5
        "
        >
          {/* LEFT COLUMN */}
          <div className="space-y-4 md:space-y-6">
            {/* TITLE */}
            <EditableProductTitle />

            {/* TABS + CONTENT */}
            <ProductTabs />
          </div>

          {/* RIGHT SIDEBAR */}

          <ProductSidebar isSaving={isSaving} />
        </div>

        {/* MOBILE SAVE BAR */}
        <MobileSaveBar />
      </form>
    </FormProvider>
  );
}
