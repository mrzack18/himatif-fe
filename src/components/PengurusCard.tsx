import type { Pengurus } from '../types';
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PengurusCardProps {
    pengurus: Pengurus;
    onClick?: () => void;
}

export default function PengurusCard({ pengurus, onClick }: PengurusCardProps) {
    const imageUrl = pengurus.foto
        ? `${import.meta.env.VITE_API_URL}/${pengurus.foto}`
        : '/images/default-avatar.png';

    return (
        <Card
            onClick={onClick}
            className={cn(
                "group cursor-pointer relative h-[400px] w-full overflow-hidden rounded-xl border-none transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20",
            )}
        >
            <CardContent className="p-0 h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={imageUrl}
                        alt={pengurus.nama}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                    <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                        <h3 className="text-2xl font-bold text-white mb-1 leading-tight">
                            {pengurus.nama_panggilan || pengurus.nama}
                        </h3>
                        <p className="text-orange-500 font-semibold mb-2">
                            {pengurus.jabatan}
                        </p>
                        {pengurus.kutipan && (
                            <p className="text-neutral-300 text-sm italic mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                "{pengurus.kutipan}"
                            </p>
                        )}

                        {/* Social Media Icons */}
                        <div className="flex gap-3 mt-2">
                            {pengurus.instagram && (
                                <a
                                    href={`https://instagram.com/${pengurus.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2" />
                                        <path strokeWidth="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </a>
                            )}
                            {pengurus.linkedin && (
                                <a
                                    href={pengurus.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-orange-500 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
