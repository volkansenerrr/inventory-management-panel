import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schemas/productSchema";
import type { z } from "zod";

type FormData = z.infer<typeof productSchema>;

interface Props {
  onSubmit: (data: FormData) => void;
  defaultValues?: FormData;
}

export const ProductForm = ({ onSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name")}
          placeholder="Ürün adı"
          className="border p-2 w-full"
        />
        <p className="text-red-500">{errors.name?.message}</p>
      </div>

      <div>
        <input
          {...register("category")}
          placeholder="Kategori"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          placeholder="Miktar"
          className="border p-2 w-full"
        />
        <p className="text-red-500">{errors.quantity?.message}</p>
      </div>

      <div>
        <input
          {...register("unit")}
          placeholder="Birim"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <select {...register("status")} className="border p-2 w-full">
          <option value="stokta">Stokta</option>
          <option value="kritik">Kritik</option>
          <option value="tükendi">Tükendi</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Kaydet
      </button>
    </form>
  );
};
