export type Vector = number[];

export interface ProductTextContent {
  title: string;
  description?: string;
  tags: string[];
  brand: string;
}

export interface ProductVectorParts {
  textVector: Vector | null;
  imageVector: Vector | null;
}

export interface UpdateProductVectorOptions {
  productId: string;

  // якщо ми вже знаємо, що текст змінився (наприклад, в updateProductService)
  textChanged?: boolean;

  // якщо ми хочемо явно сказати "не чіпай текстову частину"
  skipTextUpdate?: boolean;

  // сирі текстові дані продукту (нові)
  textContent?: ProductTextContent;

  // TODO: на майбутнє – для оновлення image-embedding
  imageChanged?: boolean;
}
