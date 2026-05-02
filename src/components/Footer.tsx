import { Link } from 'react-router-dom';
import { navLinks } from './Navbar';

export default function Footer() {
    return (
        <footer className="bg-neutral-950 border-t border-neutral-800 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo-himatif.png" alt="HIMATIF" className="h-12 w-12" />
                            <span className="text-xl font-bold text-white">HIMATIF ITG</span>
                        </div>
                        <p className="text-neutral-400 text-sm">
                            Himpunan Mahasiswa Teknik Informatika Institut Teknologi Garut.
                            Wadah pengembangan kreativitas dan kolaborasi mahasiswa Teknik Informatika.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="text-neutral-400 text-sm hover:text-orange-500 transition-colors"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Kontak</h4>
                        <div className="space-y-2 text-neutral-400 text-sm">
                            <p>Institut Teknologi Garut</p>
                            <p>Jl. Mayor Syamsu No.1, Jayaraga, Kec. Tarogong Kidul, Garut, Jawa Barat 44151</p>
                            <p>himatif@itg.ac.id</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} HIMATIF ITG. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
