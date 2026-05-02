import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/axios';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useAuth } from '../../context/AuthContext';
import InformationDashboard from './InformationDashboard';

export default function Dashboard() {
    useDocumentTitle('Dashboard - Admin');
    const { user } = useAuth();

    if (user?.role === 'informasi') {
        return <InformationDashboard />;
    }

    const [totalBerita, setTotalBerita] = useState(0);
    const [totalPengurus, setTotalPengurus] = useState(0);
    const [totalPendaftar, setTotalPendaftar] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const promises = [
                    api.get('/berita'),
                    api.get('/pengurus'),
                    api.get('/registrasi'),
                ];

                if (user?.role === 'super_admin') {
                    promises.push(api.get('/users'));
                }

                const results = await Promise.all(promises);

                setTotalBerita(results[0].data?.data?.length || 0);
                setTotalPengurus(results[1].data?.data?.length || 0);
                setTotalPendaftar(results[2].data?.data?.length || 0);

                if (user?.role === 'super_admin') {
                    setTotalUsers(results[3].data?.data?.length || 0);
                }
            } catch (err) {
                console.error('Failed to load dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [user]);

    const stats = [
        {
            title: 'Total Pengurus',
            value: totalPengurus,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'from-neutral-700 to-neutral-800',
        },
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

    if (user?.role === 'super_admin') {
        stats.push({
            title: 'Total Users',
            value: totalUsers,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            color: 'from-purple-500 to-purple-600',
        });
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

            {loading ? (
                <div className={`grid grid-cols-1 md:grid-cols-${user?.role === 'super_admin' ? '4' : '3'} gap-6`}>
                    {[...Array(user?.role === 'super_admin' ? 4 : 3)].map((_, i) => (
                        <div key={i} className="bg-neutral-800/50 rounded-2xl p-6 animate-pulse">
                            <div className="h-12 w-12 bg-neutral-700 rounded-xl mb-4" />
                            <div className="h-6 bg-neutral-700 rounded w-32 mb-2" />
                            <div className="h-10 bg-neutral-700 rounded w-20" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`grid grid-cols-1 md:grid-cols-${user?.role === 'super_admin' ? '4' : '3'} gap-6`}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl"
                        >
                            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-[15px]">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-2xl mb-4`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-neutral-400 text-sm font-medium">{stat.title}</h3>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link
                        to="/admin/pengurus"
                        className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl hover:from-orange-500/30 transition-all"
                    >
                        <div className="bg-neutral-900/80 p-4 rounded-[11px] text-center flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-neutral-500/10 flex items-center justify-center text-neutral-400 mb-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <p className="text-sm text-neutral-300">Tambah Pengurus</p>
                        </div>
                    </Link>
                    <Link
                        to="/admin/berita"
                        className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl hover:from-orange-500/30 transition-all"
                    >
                        <div className="bg-neutral-900/80 p-4 rounded-[11px] text-center flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <p className="text-sm text-neutral-300">Tulis Berita</p>
                        </div>
                    </Link>
                    <Link
                        to="/admin/registrasi"
                        className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl hover:from-orange-500/30 transition-all"
                    >
                        <div className="bg-neutral-900/80 p-4 rounded-[11px] text-center flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-neutral-500/10 flex items-center justify-center text-neutral-400 mb-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                            </div>
                            <p className="text-sm text-neutral-300">Lihat Pendaftar</p>
                        </div>
                    </Link>
                    <Link
                        to="/admin/pengaturan"
                        className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl hover:from-orange-500/30 transition-all"
                    >
                        <div className="bg-neutral-900/80 p-4 rounded-[11px] text-center flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-neutral-500/10 flex items-center justify-center text-neutral-400 mb-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <p className="text-sm text-neutral-300">Pengaturan</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
