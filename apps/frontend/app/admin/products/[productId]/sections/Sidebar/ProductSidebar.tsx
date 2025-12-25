import { ProductStatus } from "./ProductStatus";

export default function ProductSidebar() {
  return (
    <div>
      {/* SIDEBAR */}
      <aside className="space-y-4">
        <ProductStatus />
        {/* <ProductTags />
                    <ProductAITools /> */}
      </aside>
    </div>
  );
}
