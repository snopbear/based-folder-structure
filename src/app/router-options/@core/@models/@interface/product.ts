/* Defines the product entity */
export interface Product {
  id: number | null;
  productName: string | null;
  productCode: string | null;
  category: string | null;
  tags?: string[] | null;
  releaseDate: string | null;
  price: number | null;
  description: string | null;
  starRating: number | null;
  imageUrl: string | null;
}

export interface ProductResolved {
  product: Product;
  error?: any;
}
