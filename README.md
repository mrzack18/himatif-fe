# 🌐 HIMATIF ITG — Frontend

Frontend website resmi **Himpunan Mahasiswa Teknik Informatika (HIMATIF)** Institut Teknologi Garut.  
Dibangun menggunakan **React 19**, **TypeScript**, **Vite 7**, dan **TailwindCSS 4**.

---

## 📋 Daftar Isi

- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Tech Stack](#-tech-stack)
- [Struktur Folder](#-struktur-folder)
- [Halaman & Routing](#-halaman--routing)
- [Komponen](#-komponen)
- [State Management](#-state-management)
- [Koneksi API](#-koneksi-api)
- [Build Production](#-build-production)
- [Tim Pengembang](#-tim-pengembang)

---

## ✅ Prasyarat

Pastikan sudah terinstal di komputer kamu:

- [Node.js](https://nodejs.org/) v22 LTS atau lebih baru
- [npm](https://www.npmjs.com/) (otomatis terinstal bersama Node.js)
- Backend API sudah berjalan di `http://localhost:4000` → Lihat [himatif-backend](../himatif-backend/)

Cek versi:

```bash
node -v   # v22.x.x
npm -v    # 10.x.x
```

---

## 🚀 Instalasi

### 1️⃣ Clone / Masuk ke Folder Project

```bash
cd himatif-frontend
```

### 2️⃣ Install Dependensi

```bash
npm install
```

### 3️⃣ Konfigurasi Environment Variable

Buat file `.env` di root folder project (atau rename `.env.example` jika ada):

```env
VITE_API_URL=http://localhost:4000
```

> ⚠️ **Catatan:** Untuk production, ganti dengan URL API yang sesuai:
> ```env
> VITE_API_URL=https://api.himatifitg.com
> ```

---

## ▶️ Menjalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di:

```
http://localhost:5173
```

> 💡 Pastikan backend API sudah aktif di `http://localhost:4000` sebelum menjalankan frontend.

---

## 🛠️ Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React** | 19 | Library UI berbasis komponen |
| **TypeScript** | 5.9 | Static typing untuk JavaScript |
| **Vite** | 7 | Build tool & dev server |
| **TailwindCSS** | 4 | Utility-first CSS framework |
| **React Router DOM** | 7 | Client-side routing |
| **Axios** | 1.13 | HTTP client untuk API calls |
| **Framer Motion** | 12 | Animasi & transisi halaman |
| **Tiptap** | 3 | Rich text editor (WYSIWYG) |
| **Lucide React** | 0.563 | Icon library |
| **Radix UI** | 1.4 | Komponen UI headless & accessible |
| **Swiper** | 12 | Carousel / slider |
| **Embla Carousel** | 8 | Carousel komponen |
| **XLSX** | 0.18 | Export data ke file Excel |
| **CVA** | 0.7 | Class Variance Authority (variant styling) |

---

## 📁 Struktur Folder

```
himatif-frontend/
├── public/                         # Asset statis (gambar, favicon, dll)
├── src/
│   ├── main.tsx                    # Entry point aplikasi
│   ├── App.tsx                     # Root component & konfigurasi routing
│   ├── App.css                     # Styles tambahan
│   ├── index.css                   # Base CSS & TailwindCSS
│   │
│   ├── pages/                      # Halaman-halaman website
│   │   ├── HomePage.tsx            # Landing page utama
│   │   ├── AboutPage.tsx           # Tentang HIMATIF
│   │   ├── PengurusPage.tsx        # Struktur pengurus organisasi
│   │   ├── BeritaPage.tsx          # Daftar berita & kegiatan
│   │   ├── BeritaDetail.tsx        # Detail berita (by slug)
│   │   ├── KontakPage.tsx          # Halaman kontak
│   │   ├── JoinPage.tsx            # Form pendaftaran anggota baru
│   │   ├── LoginPage.tsx           # Login admin
│   │   ├── index.ts                # Barrel export halaman
│   │   └── admin/                  # Halaman admin panel
│   │       ├── Dashboard.tsx       # Dashboard & statistik
│   │       ├── Users.tsx           # Manajemen user
│   │       ├── Pengurus.tsx        # Manajemen pengurus
│   │       ├── Berita.tsx          # Manajemen berita (+ Rich Text Editor)
│   │       ├── Registrasi.tsx      # Manajemen pendaftar anggota
│   │       ├── Pengaturan.tsx      # Pengaturan buka/tutup pendaftaran
│   │       ├── Profile.tsx         # Profil admin
│   │       └── InformationDashboard.tsx
│   │
│   ├── components/                 # Komponen reusable
│   │   ├── Navbar.tsx              # Navigasi utama (responsive)
│   │   ├── Footer.tsx              # Footer website
│   │   ├── AdminSidebar.tsx        # Sidebar navigasi admin
│   │   ├── AdminHeader.tsx         # Header admin panel
│   │   ├── PengurusCard.tsx        # Card profil pengurus
│   │   ├── PengurusSlider.tsx      # Slider pengurus
│   │   ├── Countdown.tsx           # Countdown timer pendaftaran
│   │   ├── RichTextEditor.tsx      # Editor konten (Tiptap WYSIWYG)
│   │   ├── Dialog.tsx              # Dialog component
│   │   ├── Modal.tsx               # Modal component
│   │   ├── index.ts                # Barrel export
│   │   ├── common/                 # Komponen umum
│   │   │   ├── PageHeader.tsx      # Header halaman dengan gradient
│   │   │   ├── NewsCard.tsx        # Card preview berita
│   │   │   └── FeatureCard.tsx     # Card fitur/benefit
│   │   └── ui/                     # Komponen UI primitif (Radix-based)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       └── textarea.tsx
│   │
│   ├── layouts/                    # Layout wrapper
│   │   ├── MainLayout.tsx          # Layout publik (Navbar + animasi + Footer)
│   │   └── AdminLayout.tsx         # Layout admin (Sidebar + Header)
│   │
│   ├── context/
│   │   └── AuthContext.tsx         # Context autentikasi (login, logout, token)
│   │
│   ├── api/
│   │   ├── authApi.ts              # API calls autentikasi
│   │   └── userApi.ts              # API calls user
│   │
│   ├── hooks/
│   │   └── useDocumentTitle.ts     # Custom hook untuk mengatur title halaman
│   │
│   ├── lib/
│   │   ├── axios.ts                # Konfigurasi Axios instance + interceptor
│   │   └── utils.ts                # Utility functions (cn, dll)
│   │
│   └── types/                      # TypeScript type definitions
│       ├── index.ts                # Interface utama (Berita, Pengurus, Registrasi, dll)
│       ├── berita.ts
│       ├── pengurus.ts
│       ├── registrasi.ts
│       └── swiper.d.ts            # Type declaration untuk Swiper
│
├── index.html                      # HTML template
├── vite.config.ts                  # Konfigurasi Vite (alias @, plugins)
├── tsconfig.json                   # Konfigurasi TypeScript
├── tsconfig.app.json               # TS config untuk app
├── tsconfig.node.json              # TS config untuk node
├── eslint.config.js                # Konfigurasi ESLint
├── components.json                 # Konfigurasi shadcn/ui
├── .env                            # Environment variable
├── .gitignore
└── package.json
```

---

## 🗺️ Halaman & Routing

### Halaman Publik

Menggunakan `MainLayout` (Navbar + Content dengan animasi transisi + Footer).

| Path | Komponen | Deskripsi |
|------|----------|-----------|
| `/` | `HomePage` | Landing page — hero, preview berita, benefits, tim developer, CTA |
| `/about` | `AboutPage` | Tentang HIMATIF — visi, misi, sejarah |
| `/pengurus` | `PengurusPage` | Struktur organisasi per divisi |
| `/berita` | `BeritaPage` | Daftar semua berita & kegiatan |
| `/berita/:slug` | `BeritaDetail` | Detail artikel berita |
| `/kontak` | `KontakPage` | Informasi kontak organisasi |
| `/join` | `JoinPage` | Form pendaftaran anggota baru + countdown |

### Halaman Login

| Path | Komponen | Deskripsi |
|------|----------|-----------|
| `/login` | `LoginPage` | Login admin (tanpa layout) |

### Halaman Admin

Menggunakan `AdminLayout` (Sidebar + Header). Memerlukan autentikasi JWT.

| Path | Komponen | Deskripsi |
|------|----------|-----------|
| `/admin` | `Dashboard` | Statistik & overview |
| `/admin/users` | `Users` | CRUD user sistem |
| `/admin/pengurus` | `Pengurus` | CRUD data pengurus |
| `/admin/berita` | `Berita` | CRUD berita dengan rich text editor |
| `/admin/registrasi` | `Registrasi` | Kelola pendaftar (approve/reject/export) |
| `/admin/pengaturan` | `Pengaturan` | Atur jadwal buka/tutup pendaftaran |
| `/admin/profil` | `Profile` | Edit profil & password admin |

---

## 🧩 Komponen

### Layout

| Komponen | Fungsi |
|----------|--------|
| `MainLayout` | Wrapper halaman publik — Navbar + animasi transisi (Framer Motion) + Footer |
| `AdminLayout` | Wrapper halaman admin — Sidebar + Header |

### Komponen Utama

| Komponen | Fungsi |
|----------|--------|
| `Navbar` | Navigasi responsif untuk halaman publik |
| `Footer` | Footer dengan info organisasi |
| `AdminSidebar` | Sidebar navigasi admin panel |
| `AdminHeader` | Header admin dengan info user |
| `PengurusCard` | Card profil pengurus (foto, jabatan, sosmed) |
| `PengurusSlider` | Slider carousel pengurus |
| `Countdown` | Timer countdown buka/tutup pendaftaran |
| `RichTextEditor` | Editor WYSIWYG berbasis Tiptap (bold, italic, underline, link, text-align) |

### Komponen Common

| Komponen | Fungsi |
|----------|--------|
| `PageHeader` | Header halaman dengan gradient background |
| `NewsCard` | Card preview berita (gambar, judul, excerpt) |
| `FeatureCard` | Card fitur/benefit organisasi |

### Komponen UI (Radix-based)

`Button`, `Card`, `Input`, `Label`, `Textarea`, `Select`, `Dialog`, `Sheet`, `Carousel`, `Separator`

---

## 🔐 State Management

### AuthContext (React Context API)

Mengelola state autentikasi secara global:

```typescript
interface AuthContextType {
    user: User | null;           // Data user yang sedang login
    token: string | null;        // JWT token
    isAuthenticated: boolean;    // Status autentikasi
    login(user, token): void;    // Simpan user & token ke state + localStorage
    logout(): void;              // Hapus state & localStorage
    loadAuthFromStorage(): void; // Muat data dari localStorage saat refresh
}
```

**Alur:**
1. User login → token & data user disimpan ke `localStorage`
2. Halaman di-refresh → `useEffect` memuat data dari `localStorage`
3. User logout → state & `localStorage` dibersihkan

---

## 🔗 Koneksi API

### Axios Instance (`src/lib/axios.ts`)

```typescript
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // http://localhost:4000
});

// Auto-attach JWT token ke setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

### Path Alias

Konfigurasi di `vite.config.ts`:

```typescript
resolve: {
    alias: {
        "@": path.resolve(__dirname, "./src"),
    },
},
```

Import menggunakan:
```typescript
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
```

---

## 📦 Build Production

```bash
npm run build
```

Output akan dihasilkan di folder `dist/`. File-file ini siap di-deploy ke hosting statis (Netlify, Vercel, Nginx, dll).

### Preview Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 🎨 Desain

| Aspek | Detail |
|-------|--------|
| **Tema** | Dark mode (neutral-950/900) dengan aksen Orange (#f97316) |
| **Animasi** | Transisi halaman menggunakan Framer Motion (fade + slide) |
| **Responsif** | Mobile-first, mendukung semua ukuran layar |
| **Icons** | Lucide React |

---

## 👨‍💻 Tim Pengembang

| Nama | NIM | Role |
|------|-----|------|
| **Zaki Muhamad** | 2306094 | Fullstack Developer |
| **Muhammad Rafi A.F** | 2306086 | IT Support |

**Angkatan:** 2023 — Institut Teknologi Garut

---

## 📄 Lisensi

ISC
