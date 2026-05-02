import { useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import PageHeader from '../components/common/PageHeader';
import FeatureCard from '../components/common/FeatureCard';

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function KontakPage() {
    useDocumentTitle('Hubungi Kami');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            title: 'Alamat',
            content: 'Jl. Mayor Syamsu No.1, Jayaraga, Kec. Tarogong Kidul, Garut, Jawa Barat 44151',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            title: 'Email',
            content: 'himatif@itg.ac.id',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    const socialLinks = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/himatif_itg/',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            url: 'https://youtube.com/@himatifitg9196?si=dODBcf0mSe-ssqqq',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        },
        {
            name: 'Tiktok',
            url: 'https://www.tiktok.com/@himatif_itg',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.9-.23-2.73.33-.95.52-1.64 1.48-1.88 2.54-.11.51-.15 1.05-.08 1.57.14.93.71 1.75 1.48 2.3 1.11.75 2.56.9 3.84.42 1.25-.42 2.24-1.5 2.59-2.75.12-.44.17-.91.17-1.37V.02z" />
                </svg>
            )
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Hubungi Kami"
                description="Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami."
            />

            {/* Contact Content */}
            <section className="py-16 bg-neutral-900">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Contact Form */}
                        <div className="p-px bg-gradient-to-br from-orange-500/30 via-white/10 to-transparent rounded-2xl">
                            <div className="bg-neutral-900/80 backdrop-blur-xl p-8 rounded-[15px]">
                                <h2 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h2>

                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">✅</div>
                                        <h3 className="text-xl font-semibold text-white mb-2">Pesan Terkirim!</h3>
                                        <p className="text-neutral-400">Terima kasih, kami akan segera menghubungi Anda.</p>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setSubmitted(false)}
                                            className="mt-6 text-orange-500 hover:text-orange-400 hover:bg-neutral-800"
                                        >
                                            Kirim pesan lagi
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                Nama Lengkap
                                            </label>
                                            <Input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                                placeholder="Masukkan nama lengkap"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                Email
                                            </label>
                                            <Input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                                placeholder="contoh@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                Subjek
                                            </label>
                                            <Input
                                                type="text"
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                                placeholder="Subjek pesan"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                Pesan
                                            </label>
                                            <Textarea
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500 resize-none"
                                                placeholder="Tulis pesan Anda..."
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>


                        {/* Contact Info */}
                        <div className="space-y-8">
                            {/* Info Cards */}
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <FeatureCard
                                        key={index}
                                        icon={info.icon}
                                        title={info.title}
                                        description={info.content}
                                    />
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl">
                                <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-[15px]">
                                    <h3 className="text-white font-semibold mb-4">Ikuti Kami</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-orange-500 hover:bg-neutral-700 transition-all"
                                            >
                                                <span>{social.icon}</span>
                                                <span className="text-sm">{social.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl overflow-hidden">
                                <div className="bg-neutral-900/80 backdrop-blur-xl rounded-[15px] overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31666.392040317947!2d107.896223!3d-7.206688999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68b1d119852f2f%3A0x116c33498b7cab1d!2sInstitut%20Teknologi%20Garut!5e0!3m2!1sid!2sid!4v1769780798643!5m2!1sid!2sid"
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        title="HIMATIF ITG Location"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
