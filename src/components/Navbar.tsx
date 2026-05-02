import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'Tentang Kami' },
    { href: '/pengurus', text: 'Pengurus' },
    { href: '/berita', text: 'Berita' },
    { href: '/kontak', text: 'Kontak' },
];

export default function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/logo-himatif.png" alt="HIMATIF" className="h-10 w-10" />
                        <span className="text-xl font-bold text-white">HIMATIF</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`text-sm font-medium transition-colors ${location.pathname === link.href
                                    ? 'text-orange-500'
                                    : 'text-neutral-300 hover:text-white'
                                    }`}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/join"
                            className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                        >
                            Gabung Sekarang
                        </Link>
                        <Link
                            to="https://hpm.himatifitg.com/login"
                            className="border border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300"
                        >
                            Login HPM
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-2 mt-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === link.href
                                        ? 'bg-orange-500/10 text-orange-500'
                                        : 'text-neutral-300 hover:bg-neutral-800'
                                        }`}
                                >
                                    {link.text}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-800">
                                <Link
                                    to="/join"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-2 px-5 rounded-lg text-center"
                                >
                                    Gabung Sekarang
                                </Link>
                                <Link
                                    to="https://hpm.himatifitg.com/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="border border-orange-600 text-orange-400 font-semibold py-2 px-5 rounded-lg text-center"
                                >
                                    Login HPM
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
