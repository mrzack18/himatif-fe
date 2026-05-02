import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import useDocumentTitle from '../../hooks/useDocumentTitle';

export default function InformationDashboard() {
    useDocumentTitle('Dashboard - Information');
    const [totalBerita, setTotalBerita] = useState(0);
    const [totalPendaftar, setTotalPendaftar] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [beritaRes, registrasiRes] = await Promise.all([
                    api.get('/berita'),
                    api.get('/registrasi'),
                ]);
                setTotalBerita(beritaRes.data?.data?.length || 0);
                setTotalPendaftar(registrasiRes.data?.data?.length || 0);
            } catch (err) {
                console.error('Failed to load dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const stats = [
        {
            title: 'Total Berita',
            value: totalBerita,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            color: 'from-orange-500 to-orange-600',
        },
        {
            title: 'Total Pendaftar',
            value: totalPendaftar,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            ),
            color: 'from-green-500 to-green-600',
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-8">Dashboard Informasi</h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-neutral-800/50 rounded-2xl p-6 animate-pulse">
                            <div className="h-12 w-12 bg-neutral-700 rounded-xl mb-4" />
                            <div className="h-6 bg-neutral-700 rounded w-32 mb-2" />
                            <div className="h-10 bg-neutral-700 rounded w-20" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stats */}
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl"
                        >
                            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-[15px] h-full">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-2xl mb-4`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-neutral-400 text-sm font-medium">{stat.title}</h3>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                        </div>
                    ))}

                    {/* Quick Action: Tulis Berita */}
                    <Link
                        to="/admin/berita"
                        className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl hover:from-orange-500/30 transition-all group"
                    >
                        <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-[15px] h-full flex flex-col justify-center items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-medium mb-1">Tulis Berita</h3>
                            <p className="text-sm text-neutral-400">Buat artikel berita baru</p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}
