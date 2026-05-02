import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import type { Berita } from '../types';
import useDocumentTitle from '../hooks/useDocumentTitle';
import PageHeader from '../components/common/PageHeader';
import NewsCard from '../components/common/NewsCard';
import FeatureCard from '../components/common/FeatureCard';

export default function HomePage() {
    useDocumentTitle('Home');
    const [featuredNews, setFeaturedNews] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFeaturedNews = async () => {
            try {
                const res = await api.get('/berita?limit=3');
                setFeaturedNews(res.data.data || []);
            } catch (err) {
                console.error('Failed to load news:', err);
            } finally {
                setLoading(false);
            }
        };
        loadFeaturedNews();
    }, []);

    const benefits = [
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
            ),
            title: 'Pengembangan Skill',
            description: 'Tingkatkan kemampuan teknis dan soft skill melalui berbagai program kerja.',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
            ),
            title: 'Networking',
            description: 'Bangun koneksi dengan sesama mahasiswa, alumni, dan profesional di industri IT.',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
            ),
            title: 'Kreativitas',
            description: 'Salurkan ide-ide kreatifmu dalam berbagai kegiatan dan kompetisi.',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            title: 'Kepemimpinan',
            description: 'Asah jiwa kepemimpinan melalui kepengurusan dan event-event besar.',
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title={(
                    <>
                        Selamat Datang di{' '}
                        <span className="text-orange-500">HIMATIF ITG</span>
                    </>
                )}
                description="Membangun Generasi Unggul, Kreatif, dan Inovatif di Dunia Teknologi Informasi."
                className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/80 via-neutral-950 to-neutral-950 pt-20 text-center"
            >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/join"
                        className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                    >
                        Gabung Sekarang
                    </Link>
                    <Link
                        to="/about"
                        className="border border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                    >
                        Tentang Kami
                    </Link>
                </div>
            </PageHeader>

            {/* About Preview Section */}
            <section className="bg-neutral-950 py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative p-px bg-gradient-to-br from-orange-500/30 via-white/10 to-transparent rounded-xl">
                            <div className="bg-neutral-900/80 backdrop-blur-xl rounded-xl overflow-hidden">
                                <img
                                    src="/images/group-photo.jpg"
                                    alt="HIMATIF Team"
                                    className="w-full aspect-video object-cover"
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                                Tentang HIMATIF ITG
                            </h2>
                            <p className="text-neutral-400 mb-6 leading-relaxed">
                                HIMATIF ITG adalah organisasi kemahasiswaan yang bernaung di bawah
                                civitas akademika Institut Teknologi Garut. Organisasi ini menjadi
                                wadah bagi mahasiswa Teknik Informatika untuk mengembangkan potensi
                                diri, memperluas wawasan, serta berkontribusi dalam bidang akademik
                                maupun non-akademik.
                            </p>
                            <Link
                                to="/pengurus"
                                className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 group"
                            >
                                <span>Lihat Struktur Pengurus</span>
                                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured News Section */}
            <section className="py-20 md:py-28 bg-neutral-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white">
                            Berita & Kegiatan Terbaru
                        </h2>
                        <p className="text-neutral-400 mt-4">
                            Ikuti perkembangan terbaru dari HIMATIF ITG
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-neutral-800/50 rounded-xl p-4 animate-pulse">
                                    <div className="h-48 bg-neutral-700 rounded-lg mb-4" />
                                    <div className="h-6 bg-neutral-700 rounded mb-2" />
                                    <div className="h-4 bg-neutral-700 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    ) : featuredNews.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredNews.slice(0, 3).map((news) => (
                                    <NewsCard key={news.id} news={news} />
                                ))}
                            </div>
                            <div className="text-center mt-16">
                                <Link
                                    to="/berita"
                                    className="border border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                                >
                                    Lihat Semua Berita
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-neutral-500">Belum ada berita tersedia.</p>
                    )}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-neutral-950 py-20 md:py-28">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                        Kenapa Gabung HIMATIF?
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto mb-16">
                        Menjadi bagian dari kami bukan hanya tentang belajar, tapi juga bertumbuh bersama.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <FeatureCard
                                key={index}
                                icon={benefit.icon}
                                title={benefit.title}
                                description={benefit.description}
                            />
                        ))}
                    </div>
                </div>
            </section>



            {/* Web Builder Section */}
            <section className="py-20 bg-neutral-900 border-t border-neutral-800">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Meet the Connect Team
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto mb-12">
                        Tim pengembang yang berdedikasi membangun platform digital HIMATIF ITG.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Builder 1: Zaki */}
                        <div className="group relative w-full max-w-sm h-[400px] overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src="/images/contributor.jpg"
                                    alt="Zaki Muhamad"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-left">
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-orange-400 bg-orange-500/10 rounded-full w-fit backdrop-blur-sm border border-orange-500/20">
                                    Fullstack Developer
                                </span>

                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                    Zaki Muhamad
                                </h3>

                                <div className="space-y-1 mb-6 text-neutral-300 text-sm">
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        NIM: 2306094
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        Angkatan 2023
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <a
                                        href="https://instagram.com/zky.mhmmd_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/zaki-muhamad-441365287/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </a>
                                    <a
                                        href="https://github.com/mrzack18"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Builder 2: Rafi */}
                        <div className="group relative w-full max-w-sm h-[400px] overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src="/images/contributor2.jpg"
                                    alt="Rafi"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-left">
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-orange-400 bg-orange-500/10 rounded-full w-fit backdrop-blur-sm border border-orange-500/20">
                                    IT Support
                                </span>

                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                    Muhammad Rafi A.F
                                </h3>

                                <div className="space-y-1 mb-6 text-neutral-300 text-sm">
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        NIM: 2306086
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        Angkatan 2023
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <a
                                        href="https://instagram.com/rafi4175_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/muhammad-rafi-abdulah-faqih-bb7916346"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:bg-white hover:text-orange-500 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </a>
                                    <a
                                        href="https://github.com/Rafeey11"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-700">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Siap Bergabung dengan Kami?
                    </h2>
                    <p className="text-orange-100 max-w-2xl mx-auto mb-8">
                        Jadilah bagian dari keluarga besar HIMATIF ITG dan kembangkan potensimu bersama kami.
                    </p>
                    <Link
                        to="/join"
                        className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Daftar Sekarang
                    </Link>
                </div>
            </section>
        </div>
    );
}
