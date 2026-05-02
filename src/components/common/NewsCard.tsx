import { Link } from 'react-router-dom';
import type { Berita } from '../../types';

interface NewsCardProps {
    news: Berita;
}

export default function NewsCard({ news }: NewsCardProps) {
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

    const imageUrl = news.image
        ? `${import.meta.env.VITE_API_URL}/${news.image}`
        : '/images/default-news.jpg';

    return (
        <Link
            to={`/berita/${news.slug}`}
            className="group p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl h-full transition-all duration-300 hover:from-orange-500/30"
        >
            <div className="bg-neutral-900/80 backdrop-blur-xl rounded-xl h-full flex flex-col overflow-hidden">
                <div className="overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={news.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                    {news.category && (
                        <span className="text-orange-500 text-xs font-semibold mb-2">
                            {news.category}
                        </span>
                    )}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-500 transition-colors">
                        {truncateText(news.title, 60)}
                    </h3>
                    <p className="text-neutral-400 text-sm flex-1">
                        {truncateText(news.excerpt, 100)}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500">
                        <span>{news.author}</span>
                        <span>•</span>
                        <span>{formatDate(news.date)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
