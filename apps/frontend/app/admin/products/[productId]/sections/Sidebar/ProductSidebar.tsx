import { useFormContext } from "react-hook-form";
import { ProductStatus } from "./ProductStatus";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ProductPrice } from "./ProductPrice";
import { ProductStock } from "./ProductStocke";
import { ProductTags } from "./ProductTags";

type Props = {
  isSaving: boolean;
};

export default function ProductSidebar({ isSaving }: Props) {
  const {
    formState: { isDirty },
  } = useFormContext();

  return (
    <Card className="p-2 md:p-4 flex flex-col justify-between shadow-md">
      {/* SIDEBAR */}
      <aside className="flex flex-col gap-4 ">
        <ProductStatus />
        <ProductPrice />
        <ProductStock />
        <ProductTags />
      </aside>
      <Button
        type="submit"
        disabled={!isDirty || isSaving}
        className="w-full gap-2"
      >
        {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSaving ? "Saving..." : "Save changes"}
      </Button>
    </Card>
  );
}
