import { useState, useEffect } from 'react';
import api from '../lib/axios';
import type { Pengurus } from '../types';
import { Modal, PengurusSlider } from '../components';
import { Button } from "@/components/ui/button"
import useDocumentTitle from '../hooks/useDocumentTitle';
import PageHeader from '../components/common/PageHeader';

export default function PengurusPage() {
    useDocumentTitle('Struktur Pengurus');
    const [pengurus, setPengurus] = useState<Pengurus[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState<Pengurus | null>(null);

    useEffect(() => {
        const loadPengurus = async () => {
            try {
                const res = await api.get('/pengurus');
                setPengurus(res.data.data || []);
            } catch (err) {
                console.error('Failed to load pengurus:', err);
            } finally {
                setLoading(false);
            }
        };
        loadPengurus();
    }, []);

    const specialRoles = [
        'bendahara umum',
        'sekretaris umum',
        'sekertaris umum',
        'staff bendahara',
        'staff sekretaris',
        'staff sekertaris'
    ];

    // Separate Bendahara dan Sekretaris
    const bendaharaSekretaris = pengurus.filter(p =>
        specialRoles.includes(p.jabatan.toLowerCase())
    ).sort((a, b) => {
        const getRank = (j: string) => {
            const lower = j.toLowerCase();
            if (lower.includes('bendahara umum')) return 1;
            if (lower.includes('sekretaris umum') || lower.includes('sekertaris umum')) return 2;
            if (lower.includes('staff bendahara')) return 3;
            if (lower.includes('staff sekretaris') || lower.includes('staff sekertaris')) return 4;
            return 100;
        };
        return getRank(a.jabatan) - getRank(b.jabatan);
    });

    // Separate pimpinan
    const pimpinan = pengurus.filter(p => {
        const lower = p.jabatan.toLowerCase();
        return lower.includes('ketua himpunan') ||
            lower.includes('bendahara umum') ||
            lower.includes('sekretaris umum') ||
            lower.includes('sekertaris umum') ||
            lower.includes('ketua divisi') ||
            lower.includes('ketua sub');
    }).sort((a, b) => {
        const getRank = (j: string) => {
            const lower = j.toLowerCase();
            if (lower.includes('ketua himpunan')) return 1;
            if (lower.includes('bendahara umum')) return 2;
            if (lower.includes('sekretaris umum') || lower.includes('sekertaris umum')) return 3;
            if (lower.includes('ketua divisi')) return 4;
            if (lower.includes('ketua sub')) return 5;
            return 100;
        };
        return getRank(a.jabatan) - getRank(b.jabatan);
    });

    // Group pengurus by divisi and sort members
    const groupedPengurus = pengurus.reduce((acc, p) => {
        if (!p.nama_divisi) return acc;
        const divisi = p.nama_divisi;

        // Skip Badan Pengurus Harian section
        if (divisi.toLowerCase() === 'badan pengurus harian') return acc;

        if (!acc[divisi]) acc[divisi] = [];
        acc[divisi].push(p);
        return acc;
    }, {} as Record<string, Pengurus[]>);

    // Sort valid keys to ensure divisions render in consistent order (optional but good practice)
    // And sort members within each division
    Object.keys(groupedPengurus).forEach(key => {
        groupedPengurus[key].sort((a, b) => {
            const getRank = (member: Pengurus) => {
                const lowerJ = member.jabatan.toLowerCase();
                const lowerN = member.nama.toLowerCase();

                if (lowerJ.includes('ketua divisi')) return 1;
                if (lowerJ.includes('ketua sub')) return 2;

                // Custom order for Zaki Muhamad in IT Division
                if (lowerN.includes('zaki muhamad') && key === 'Divisi Teknologi Informasi') return 2.5;

                return 3; // Staff/Anggota and others
            };
            return getRank(a) - getRank(b);
        });
    });

    const imageUrl = (foto?: string) =>
        foto
            ? `${import.meta.env.VITE_API_URL}/${foto}`
            : '/images/default-avatar.png';

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Struktur Pengurus"
                description="Pengurus HIMATIF ITG 2025/2026 — Bersatu dalam semangat kebersamaan untuk mewujudkan HIMATIF ITG yang inovatif, kolaboratif, dan berintegritas."
            />

            {/* Content */}
            <section className="py-16 bg-neutral-900">
                <div className="container mx-auto px-4 md:px-6">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-neutral-800/50 rounded-xl p-4 animate-pulse">
                                    <div className="aspect-square bg-neutral-700 rounded-lg mb-4" />
                                    <div className="h-4 bg-neutral-700 rounded mb-2" />
                                    <div className="h-3 bg-neutral-700 rounded w-2/3 mx-auto" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Group Photo */}
                            <div className="mb-20">
                                <div className="relative group overflow-hidden rounded-xl shadow-2xl shadow-orange-500/10 border border-neutral-800">
                                    <img
                                        src="/images/group-photo.jpg"
                                        alt="HIMATIF ITG Group"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>

                            {/* Pimpinan */}
                            {pimpinan.length > 0 && (
                                <div className="mb-16">
                                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Pimpinan</h2>
                                    <PengurusSlider
                                        members={pimpinan}
                                        onMemberClick={setSelectedMember}
                                    />
                                </div>
                            )}

                            {/* Bendahara dan Sekretaris */}
                            {bendaharaSekretaris.length > 0 && (
                                <div className="mb-16">
                                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Bendahara dan Sekretaris</h2>
                                    <PengurusSlider
                                        members={bendaharaSekretaris}
                                        onMemberClick={setSelectedMember}
                                    />
                                </div>
                            )}

                            {/* Per Divisi */}
                            {Object.entries(groupedPengurus)
                                .sort(([a], [b]) => {
                                    const order = [
                                        'Divisi Teknologi Informasi',
                                        'Divisi Pendidikan & Latihan',
                                        'Divisi Kesekretariatan',
                                        'Divisi Jasmani & Rohani',
                                        'Divisi Humas',
                                        'Divisi Dana & Usaha'
                                    ];
                                    const indexA = order.indexOf(a);
                                    const indexB = order.indexOf(b);
                                    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
                                    if (indexA === -1) return 1;
                                    if (indexB === -1) return -1;
                                    return indexA - indexB;
                                })
                                .map(([divisi, members]) => (
                                    <div key={divisi} className="mb-16">
                                        <h2 className="text-2xl font-bold text-white mb-8 text-center">{divisi}</h2>
                                        <PengurusSlider
                                            members={members}
                                            onMemberClick={setSelectedMember}
                                        />
                                    </div>
                                ))}

                            {pengurus.length === 0 && (
                                <p className="text-center text-neutral-500">Belum ada data pengurus.</p>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Member Detail Modal */}
            <Modal
                isOpen={!!selectedMember}
                onClose={() => setSelectedMember(null)}
                clean
            >
                {selectedMember && (
                    <div className="relative w-full overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh]">
                        {/* Member Image Container */}
                        <div className="relative flex-1 min-h-0 bg-neutral-950">
                            <img
                                src={imageUrl(selectedMember.foto)}
                                alt={selectedMember.nama}
                                className="w-full h-full object-cover block"
                            />
                            {/* Cinematic Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                        </div>

                        {/* Content Overlay - Fixed at Bottom */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 pointer-events-none">
                            <div className="relative z-10 pointer-events-auto">
                                <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] bg-orange-600 text-white mb-4 shadow-lg ring-1 ring-white/20">
                                    {selectedMember.jabatan}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-2xl">
                                    {selectedMember.nama}
                                </h2>
                                {selectedMember.nama_divisi && (
                                    <p className="text-neutral-200 text-base md:text-xl font-medium mb-6 opacity-95">
                                        {selectedMember.nama_divisi}
                                    </p>
                                )}

                                {selectedMember.kutipan && selectedMember.kutipan.trim() !== "" && (
                                    <div className="max-w-md mb-8">
                                        <p className="text-white/95 text-sm md:text-lg italic leading-relaxed border-l-2 border-orange-500 pl-4 drop-shadow-md">
                                            "{selectedMember.kutipan}"
                                        </p>
                                    </div>
                                )}

                                {(selectedMember.instagram && selectedMember.instagram.trim() !== "") ||
                                    (selectedMember.linkedin && selectedMember.linkedin.trim() !== "") ? (
                                    <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
                                        {selectedMember.instagram && selectedMember.instagram.trim() !== "" && (
                                            <a
                                                href={`https://instagram.com/${selectedMember.instagram}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300"
                                            >
                                                <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-pink-600 shadow-xl border border-white/5">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-bold tracking-wide drop-shadow-md">@{selectedMember.instagram}</span>
                                            </a>
                                        )}
                                        {selectedMember.linkedin && selectedMember.linkedin.trim() !== "" && (
                                            <a
                                                href={selectedMember.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300"
                                            >
                                                <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#0077b5] shadow-xl border border-white/5">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-bold tracking-wide drop-shadow-md">LinkedIn</span>
                                            </a>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {/* Close Button - Clean Floating Style */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-5 right-5 z-20 rounded-full bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:bg-orange-500 transition-all border border-white/10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
