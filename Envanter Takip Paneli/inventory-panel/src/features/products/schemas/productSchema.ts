import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Ürün adı zorunlu"),
  category: z.string().min(1, "Kategori zorunlu"),
  quantity: z.number().min(0, "Negatif olamaz"),
  unit: z.string().min(1, "Birim zorunlu"),
  status: z.enum(["stokta", "kritik", "tükendi"]),
});
