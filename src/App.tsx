import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PengurusPage from './pages/PengurusPage';
import BeritaPage from './pages/BeritaPage';
import BeritaDetail from './pages/BeritaDetail';
import KontakPage from './pages/KontakPage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminPengurus from './pages/admin/Pengurus';
import AdminBerita from './pages/admin/Berita';
import AdminRegistrasi from './pages/admin/Registrasi';
import AdminPengaturan from './pages/admin/Pengaturan';
import AdminProfile from './pages/admin/Profile';
import AdminUsers from './pages/admin/Users';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pengurus" element={<PengurusPage />} />
            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/berita/:slug" element={<BeritaDetail />} />
            <Route path="/kontak" element={<KontakPage />} />
            <Route path="/join" element={<JoinPage />} />
          </Route>

          {/* Login (no layout) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="pengurus" element={<AdminPengurus />} />
            <Route path="berita" element={<AdminBerita />} />
            <Route path="registrasi" element={<AdminRegistrasi />} />
            <Route path="pengaturan" element={<AdminPengaturan />} />
            <Route path="profil" element={<AdminProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
