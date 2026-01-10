export type ProductFormValues = {
  title: string;
  description?: string;
  sku: string;
  price: number;
  brand: string;
  categoryId: string;
  stock?: number;
  tags?: string[];
  isActive: boolean;
};
