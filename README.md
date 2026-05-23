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
<img width="1265" height="654" alt="Ekran görüntüsü 2026-05-23 040735" src="https://github.com/user-attachments/assets/588f408b-6c1b-4da1-b817-a0c73a44a897" />
<img width="1268" height="652" alt="Ekran görüntüsü 2026-05-23 040711" src="https://github.com/user-attachments/assets/73294e85-ac15-43be-ac7f-0e84191c6ed8" />
<img width="1263" height="649" alt="Ekran görüntüsü 2026-05-23 040837" src="https://github.com/user-attachments/assets/aef4d0ce-d4ef-45f3-9bb2-656c932cfd4e" />

Bu proje eğitim ve case study amaçlı geliştirilmiştir.
