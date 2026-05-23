import { useState } from "react";
import { useProducts } from "./features/products/hooks/useProducts";
import { ProductModal } from "./features/products/components/ProductModal";
import { ProductForm } from "./features/products/components/ProductForm";

function App() {
  const { products, loading, error, addProduct, removeProduct, editProduct } =
    useProducts();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // 🔍 SEARCH + FILTER + PAGINATION
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  const handleAddProduct = async (data: any) => {
    await addProduct(data);
    setOpen(false);
  };

  const handleEditProduct = async (data: any) => {
    if (!selectedProduct) return;

    await editProduct(selectedProduct.id, data);
    setEditOpen(false);
    setSelectedProduct(null);
  };

  // 🔍 FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // 📄 PAGINATION
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>ERROR: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          Envanter Takip Paneli
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          + Ürün Ekle
        </button>
      </div>

      {/* DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-gray-400">Toplam Ürün</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>

        <div className="bg-yellow-500/10 p-4 rounded-lg">
          <p className="text-gray-400">Kritik Stok</p>
          <p className="text-2xl font-bold text-yellow-400">
            {products.filter((p) => p.status === "kritik").length}
          </p>
        </div>

        <div className="bg-red-500/10 p-4 rounded-lg">
          <p className="text-gray-400">Tükenen</p>
          <p className="text-2xl font-bold text-red-400">
            {products.filter((p) => p.status === "tükendi").length}
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Ürün ara..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/2 p-2 rounded bg-slate-800 border border-slate-700"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/4 p-2 rounded bg-slate-800 border border-slate-700"
        >
          <option value="all">Tümü</option>
          <option value="stokta">Stokta</option>
          <option value="kritik">Kritik</option>
          <option value="tükendi">Tükenen</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-slate-700">
          <thead>
            <tr className="bg-slate-800">
              <th className="p-3 text-left">Ürün</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Miktar</th>
              <th className="p-3 text-left">Birim</th>
              <th className="p-3 text-left">Durum</th>
              <th className="p-3 text-left">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {/* EMPTY STATE */}
            {paginatedProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-400">
                  Ürün bulunamadı
                </td>
              </tr>
            )}

            {paginatedProducts.map((product) => (
              <tr key={product.id} className="border-t border-slate-700">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">{product.unit}</td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={
                      product.status === "stokta"
                        ? "bg-green-500/20 text-green-400 px-2 py-1 rounded"
                        : product.status === "kritik"
                          ? "bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded"
                          : "bg-red-500/20 text-red-400 px-2 py-1 rounded"
                    }
                  >
                    {product.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setEditOpen(true);
                    }}
                    className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (confirm("Silmek istediğine emin misin?")) {
                        removeProduct(product.id);
                      }
                    }}
                    className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4 justify-center">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-slate-700 rounded"
        >
          Prev
        </button>

        <span className="px-3 py-1">Page {page}</span>

        <button
          onClick={() =>
            setPage((p) =>
              p * itemsPerPage < filteredProducts.length ? p + 1 : p,
            )
          }
          className="px-3 py-1 bg-slate-700 rounded"
        >
          Next
        </button>
      </div>

      {/* CREATE MODAL */}
      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        title="Yeni Ürün Ekle"
      >
        <ProductForm onSubmit={handleAddProduct} />
      </ProductModal>

      {/* EDIT MODAL */}
      <ProductModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedProduct(null);
        }}
        title="Ürün Düzenle"
      >
        <ProductForm
          defaultValues={selectedProduct}
          onSubmit={handleEditProduct}
        />
      </ProductModal>
    </div>
  );
}

export default App;
