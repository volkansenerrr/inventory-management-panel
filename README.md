# 📊 Envanter Takip Paneli

React + TypeScript ile geliştirilmiş, mock API (JSON Server) kullanan bir envanter yönetim paneli.

---

## 🚀 Proje Özeti

Bu uygulama ürünlerin stok durumunu yönetmek için geliştirilmiştir. Kullanıcılar ürün ekleyebilir, düzenleyebilir, silebilir ve filtreleyebilir.

---

## 🧰 Kullanılan Teknolojiler

- React (Vite)
- TypeScript
- Tailwind CSS
- JSON Server (Mock API)
- Axios
- React Hook Form
- Zod (validasyon)

---

## ⚙️ Kurulum

```bash
npm install
Mock API çalıştırma: npx json-server --watch db.json --port 3001
Frontend çalıştırma: npm run dev

---

📁 Proje Yapısı

src/
 ├── features/
 │    └── products/
 │         ├── components
 │         ├── hooks
 │         ├── services
 │         └── schemas
 ├── shared/
 ├── App.tsx


✨ Özellikler
Ürün listeleme
Ürün ekleme / silme / güncelleme (CRUD)
Arama (search)
Filtreleme (stok durumu)
Dashboard istatistik kartları
Pagination
Modal yapısı
Form validasyonları

📸 Ekran Görüntüsü
(./screenshots/Ekran görüntüsü 2026-05-23 040711.png)
(./screenshots/Ekran görüntüsü 2026-05-23 040735.png)
(./screenshots/Ekran görüntüsü 2026-05-23 040837.png)

Bu proje eğitim ve case study amaçlı geliştirilmiştir.
