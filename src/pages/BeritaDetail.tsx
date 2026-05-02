import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/axios';
import type { Berita } from '../types';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function BeritaDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [berita, setBerita] = useState<Berita | null>(null);
    useDocumentTitle(berita?.title || 'Memuat Berita...');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBerita = async () => {
            if (!slug) return;
            setLoading(true);
            setError(null);
            try {
                const res = await api.get(`/berita/slug/${slug}`);
                setBerita(res.data.data || res.data);
            } catch (err: any) {
                console.error('Error loading berita:', err);
                if (err.response?.status === 404) {
                    setError('Berita tidak ditemukan.');
                } else {
                    setError('Gagal memuat berita.');
                }
            } finally {
                setLoading(false);
            }
        };
        loadBerita();
    }, [slug]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
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

    if (loading) {
        return (
            <div className="bg-neutral-950 min-h-screen py-32 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (error || !berita) {
        return (
            <div className="bg-neutral-950 min-h-screen flex items-center justify-center py-20 px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        {error || 'Berita Tidak Ditemukan'}
                    </h1>
                    <Link
                        to="/berita"
                        className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
                    >
                        &larr; Kembali ke Berita
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-950 min-h-screen pt-24 pb-24">
            <article className="container mx-auto px-6 max-w-5xl">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/berita" className="hover:text-white transition-colors">Berita</Link>
                    <span>/</span>
                    <span className="text-neutral-200 truncate max-w-[200px]">{berita.title}</span>
                </nav>

                {/* Article Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-semibold rounded-md uppercase tracking-wide">
                            {berita.category || 'Berita'}
                        </span>
                        <span className="text-neutral-400 text-sm">
                            {formatDate(berita.date)}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {berita.title}
                    </h1>

                    <div className="flex items-center gap-4 pb-8 border-b border-neutral-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 font-bold">
                                {berita.author ? berita.author.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">{berita.author || 'Admin HIMATIF'}</p>
                                <p className="text-neutral-400 text-xs">Penulis</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <figure className="mb-12">
                    <img
                        src={imageUrl(berita.image)}
                        alt={berita.title}
                        className="w-full h-auto max-h-[500px] object-cover rounded-xl bg-neutral-900"
                    />
                </figure>

                {/* Article Content */}
                <div
                    className="text-white
                    [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-orange-500
                    [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-white
                    [&_p]:text-neutral-300 [&_p]:leading-relaxed [&_p]:mb-4
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-neutral-300
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-neutral-300
                    [&_li]:mb-2
                    [&_a]:text-orange-500 [&_a]:underline hover:[&_a]:text-orange-400
                    [&_strong]:text-white [&_strong]:font-bold
                    [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6
                    "
                    dangerouslySetInnerHTML={{ __html: berita.content }}
                />

                {/* Footer / Navigation */}
                <div className="mt-16 pt-8 border-t border-neutral-800">
                    <Link
                        to="/berita"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Semua Berita
                    </Link>
                </div>
            </article>
        </div>
    );
}
