export type ProductStatus = "stokta" | "kritik" | "tükendi";

export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: ProductStatus;
}
