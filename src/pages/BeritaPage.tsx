import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import type { Berita } from '../types';
import useDocumentTitle from '../hooks/useDocumentTitle';
import PageHeader from '../components/common/PageHeader';
import NewsCard from '../components/common/NewsCard';

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function BeritaPage() {
    useDocumentTitle('Berita & Kegiatan');
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        const loadBerita = async () => {
            try {
                const res = await api.get('/berita');
                setBerita(res.data.data || []);
            } catch (err) {
                console.error('Failed to load berita:', err);
            } finally {
                setLoading(false);
            }
        };
        loadBerita();
    }, []);

    const categories = [...new Set(berita.map(b => b.category).filter(Boolean))];

    const filteredBerita = berita.filter(b => {
        const matchTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory === 'all' || !selectedCategory || b.category === selectedCategory;
        return matchTitle && matchCategory;
    });

    const featuredPost = filteredBerita[0];

    const truncateText = (text: string, length: number) => {
        if (!text) return '';
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const imageUrl = (image?: string) =>
        image
            ? `${import.meta.env.VITE_API_URL}/${image}`
            : '/images/default-news.jpg';

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Berita & Kegiatan"
                description="Ikuti terus informasi terkini seputar kegiatan, prestasi, dan agenda HIMATIF ITG."
            />

            {/* Filters */}
            <section className="bg-neutral-900 py-8 border-b border-neutral-800">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Input
                                type="text"
                                placeholder="Cari berita..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-10 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                            />
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                        </div>
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-full md:w-[200px] bg-neutral-800/50 border-neutral-700 text-white focus:ring-orange-500">
                                <SelectValue placeholder="Semua Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>


            {/* Content */}
            <section className="py-16 bg-neutral-900">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-neutral-800/50 rounded-xl p-4 animate-pulse">
                                    <div className="h-48 bg-neutral-700 rounded-lg mb-4" />
                                    <div className="h-6 bg-neutral-700 rounded mb-2" />
                                    <div className="h-4 bg-neutral-700 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    ) : filteredBerita.length > 0 ? (
                        <>
                            {/* Featured Post */}
                            {featuredPost && (
                                <Link
                                    to={`/berita/${featuredPost.slug}`}
                                    className="block mb-12 group"
                                >
                                    <div className="p-px bg-gradient-to-br from-orange-500/30 via-white/10 to-transparent rounded-xl">
                                        <div className="bg-neutral-900/80 backdrop-blur-xl rounded-xl overflow-hidden grid md:grid-cols-2 gap-0">
                                            <div className="overflow-hidden">
                                                <img
                                                    src={imageUrl(featuredPost.image)}
                                                    alt={featuredPost.title}
                                                    className="w-full h-64 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-8 flex flex-col justify-center">
                                                <span className="text-orange-500 text-sm font-semibold mb-2">
                                                    {featuredPost.category}
                                                </span>
                                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
                                                    {featuredPost.title}
                                                </h2>
                                                <p className="text-neutral-400 mb-4">
                                                    {truncateText(featuredPost.excerpt, 200)}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-neutral-500">
                                                    <span>{featuredPost.author}</span>
                                                    <span>•</span>
                                                    <span>{formatDate(featuredPost.date)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Other Posts */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBerita.slice(1).map((news) => (
                                    <NewsCard key={news.id} news={news} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-neutral-500 py-16">
                            {searchQuery || selectedCategory ? 'Tidak ada berita yang sesuai filter.' : 'Belum ada berita tersedia.'}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
