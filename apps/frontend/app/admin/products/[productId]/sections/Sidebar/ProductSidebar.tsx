import { useFormContext } from "react-hook-form";
import { ProductStatus } from "./ProductStatus";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Props = {
  isSaving: boolean;
};

export default function ProductSidebar({ isSaving }: Props) {
  const {
    formState: { isDirty },
  } = useFormContext();

  return (
    <Card className="p-2 md:p-4 flex flex-col justify-between ">
      {/* SIDEBAR */}
      <aside className="flex flex-col gap-3 ">
        <ProductStatus />
        {/* <ProductTags />
                    <ProductAITools /> */}
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
