import { useState, useEffect } from 'react';
import api from '../lib/axios';
import type { RegistrationStatus } from '../types';
import useDocumentTitle from '../hooks/useDocumentTitle';

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Countdown from '../components/Countdown';
import PageHeader from '../components/common/PageHeader';
import FeatureCard from '../components/common/FeatureCard';

export default function JoinPage() {
    useDocumentTitle('Pendaftaran');
    const [formData, setFormData] = useState({
        fullName: '',
        npm: '',
        classYear: new Date().getFullYear(),
        kelas: '',
        email: '',
        whatsapp: '',
        reason: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formMessage, setFormMessage] = useState('');

    const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | null>(null);
    const [statusLoading, setStatusLoading] = useState(true);

    useEffect(() => {
        const checkRegistrationStatus = async () => {
            try {
                const res = await api.get('/registration-settings/status');
                setRegistrationStatus(res.data.data || res.data);
            } catch (err) {
                console.error('Error fetching registration status:', err);
                setRegistrationStatus({ status: 'open', message: '' });
            } finally {
                setStatusLoading(false);
            }
        };
        checkRegistrationStatus();
    }, []);

    const isRegistrationOpen = registrationStatus?.status === 'open';

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullName || !formData.npm || !formData.kelas ||
            !formData.email || !formData.whatsapp || !formData.reason) {
            setFormStatus('error');
            setFormMessage('Harap isi semua kolom pada formulir pendaftaran.');
            return;
        }

        setIsSubmitting(true);
        setFormMessage('');

        try {
            const response = await api.post('/registrasi', {
                nama_lengkap: formData.fullName,
                nim: formData.npm,
                angkatan: formData.classYear,
                kelas: formData.kelas,
                email: formData.email,
                no_whatsapp: formData.whatsapp,
                alasan_bergabung: formData.reason,
            });

            if (response.data.success) {
                setFormStatus('success');
                setFormMessage('Pendaftaran berhasil! Kami akan menghubungi Anda segera.');
                setFormData({
                    fullName: '',
                    npm: '',
                    classYear: new Date().getFullYear(),
                    kelas: '',
                    email: '',
                    whatsapp: '',
                    reason: '',
                });
            } else {
                setFormStatus('error');
                setFormMessage(response.data.message || 'Gagal mengirim pendaftaran.');
            }
        } catch (err: any) {
            setFormStatus('error');
            const msg = err.response?.data?.message || '';
            if (msg.includes('Sudah Terdaftar')) {
                setFormMessage("Nim & email Ini Sudah Terdaftar");
            } else {
                setFormMessage(msg || 'Gagal mengirim pendaftaran.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const benefits = [
        { num: '01', title: 'Pengalaman Organisasi', desc: 'Dapatkan pengalaman berharga dalam mengelola organisasi dan event.' },
        { num: '02', title: 'Networking', desc: 'Bangun koneksi dengan kating, alumni, hingga profesional di industri IT.' },
        { num: '03', title: 'Leadership', desc: 'Asah soft skill kepemimpinan dan manajemen tim dalam event-event besar.' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Bergabung dengan HIMATIF"
                description="Wujudkan potensimu di dunia IT bersama keluarga besar Mahasiswa Informatika ITG."
            />

            <div className="bg-neutral-950 min-h-screen py-12 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -mr-48 -mt-24 z-0" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-600/10 rounded-full blur-[100px] -ml-40 -mb-20 z-0" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {statusLoading ? (
                            <div className="flex justify-center py-16">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500" />
                            </div>
                        ) : !isRegistrationOpen ? (
                            <div className="max-w-2xl mx-auto text-center">
                                <div className="p-px bg-gradient-to-br from-yellow-500/30 via-white/10 to-transparent rounded-2xl">
                                    <div className="bg-neutral-900/60 backdrop-blur-xl p-8 rounded-[15px]">
                                        <div className="text-6xl mb-4">⏳</div>
                                        <h2 className="text-2xl font-bold text-white mb-4">
                                            Pendaftaran Belum Dibuka
                                        </h2>
                                        <p className="text-neutral-400 mb-4">
                                            {registrationStatus?.message || 'Pendaftaran sedang tidak tersedia.'}
                                        </p>
                                        {registrationStatus?.registration_open && (
                                            <p className="text-orange-500">
                                                Dibuka: {formatDate(registrationStatus.registration_open)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                {/* Info Panel */}
                                <div className="lg:col-span-5 space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-4">Benefit Bergabung</h2>
                                    {benefits.map((benefit) => (
                                        <FeatureCard
                                            key={benefit.num}
                                            icon={<div className="text-xl font-bold text-orange-500">{benefit.num}</div>}
                                            title={benefit.title}
                                            description={benefit.desc}
                                        />
                                    ))}
                                </div>

                                {/* Registration Form */}
                                <div className="lg:col-span-7">
                                    <div className="p-px bg-gradient-to-br from-orange-500/30 via-white/10 to-transparent rounded-2xl">
                                        <div className="bg-neutral-900/60 backdrop-blur-xl p-8 rounded-[15px]">
                                            <h2 className="text-2xl font-bold text-white mb-6">Formulir Pendaftaran</h2>

                                            {/* Countdown */}
                                            {registrationStatus?.status === 'open' && registrationStatus.registration_close && formStatus === 'idle' && (
                                                <div className="mb-8">
                                                    <Countdown
                                                        targetDate={registrationStatus.registration_close}
                                                        onEnd={() => setRegistrationStatus({ ...registrationStatus, status: 'closed' })}
                                                    />
                                                </div>
                                            )}

                                            {formStatus === 'success' ? (
                                                <div className="text-center py-12">
                                                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg shadow-green-500/20 border border-green-500/30">
                                                        ✓
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white mb-2">Pendaftaran Berhasil!</h3>
                                                    <p className="text-green-400 font-medium mb-8">{formMessage}</p>

                                                    <div className="flex flex-col gap-4 max-w-xs mx-auto mb-8">
                                                        <a
                                                            href="https://chat.whatsapp.com/KYjfH0QWQLQ6GFOqaEohuc?mode=gi_t"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95"
                                                        >
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.83 11.83 0 001.592 5.96L0 24l6.117-1.604a11.811 11.811 0 005.929 1.587h.005c6.634 0 12.045-5.411 12.048-12.049a11.816 11.816 0 00-3.522-8.437z" />
                                                            </svg>
                                                            Gabung Grup WhatsApp
                                                        </a>

                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => setFormStatus('idle')}
                                                            className="w-full py-2 text-neutral-500 hover:text-white transition-colors text-sm"
                                                        >
                                                            Kembali ke Formulir
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                    {formStatus === 'error' && (
                                                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm">
                                                            <p className="mb-2">{formMessage}</p>
                                                            {formMessage === "Nim & email Ini Sudah Terdaftar" && (
                                                                <a
                                                                    href="https://chat.whatsapp.com/KYjfH0QWQLQ6GFOqaEohuc?mode=gi_t"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-lg transition-all shadow-lg shadow-green-500/20 active:scale-95 mt-3"
                                                                >
                                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.83 11.83 0 001.592 5.96L0 24l6.117-1.604a11.811 11.811 0 005.929 1.587h.005c6.634 0 12.045-5.411 12.048-12.049a11.816 11.816 0 00-3.522-8.437z" />
                                                                    </svg>
                                                                    Gabung Grup WhatsApp
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                                Nama Lengkap
                                                            </label>
                                                            <Input
                                                                type="text"
                                                                required
                                                                value={formData.fullName}
                                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                                                placeholder="Nama lengkap"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                                NIM
                                                            </label>
                                                            <Input
                                                                type="text"
                                                                required
                                                                value={formData.npm}
                                                                onChange={(e) => setFormData({ ...formData, npm: e.target.value })}
                                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                                                placeholder="Nomor Induk Mahasiswa"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                                Angkatan
                                                            </label>
                                                            <Input
                                                                type="number"
                                                                required
                                                                value={formData.classYear}
                                                                onChange={(e) => setFormData({ ...formData, classYear: parseInt(e.target.value) })}
                                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                                Kelas
                                                            </label>
                                                            <Input
                                                                type="text"
                                                                required
                                                                value={formData.kelas}
                                                                onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                                                placeholder="TI-A / TI-B"
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
                                                                placeholder="email@example.com"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                                No. WhatsApp
                                                            </label>
                                                            <Input
                                                                type="tel"
                                                                required
                                                                value={formData.whatsapp}
                                                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                                                className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                                                placeholder="08xxxxxxxxxx"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                            Alasan Bergabung
                                                        </label>
                                                        <Textarea
                                                            required
                                                            rows={4}
                                                            value={formData.reason}
                                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                                            className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500 resize-none"
                                                            placeholder="Ceritakan motivasi Anda bergabung dengan HIMATIF..."
                                                        />
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 flex items-center justify-center"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                                </svg>
                                                                Mengirim...
                                                            </>
                                                        ) : (
                                                            'Daftar Sekarang'
                                                        )}
                                                    </Button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
