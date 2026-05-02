import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import type { RegistrationSettings } from '../../types';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminPengaturan() {
    useDocumentTitle('Pengaturan - Admin');
    const [settings, setSettings] = useState<RegistrationSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        registration_open: '',
        registration_close: '',
        is_active: true,
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const res = await api.get('/registration-settings');
            const data = res.data.data || res.data;
            setSettings(data);

            // Format to YYYY-MM-DDTHH:mm for datetime-local input
            const formatForInput = (dateStr: string) => {
                if (!dateStr) return '';
                const d = new Date(dateStr);
                // Adjust for local time manually to ensure it matches WIB regardless of browser locale
                const offset = d.getTimezoneOffset() * 60000;
                const localISOTime = new Date(d.getTime() - offset).toISOString().slice(0, 16);
                return localISOTime;
            };

            setFormData({
                registration_open: formatForInput(data.registration_open),
                registration_close: formatForInput(data.registration_close),
                is_active: data.is_active ?? true,
            });
        } catch (err) {
            console.error('Failed to load settings:', err);
            setMessage({ type: 'error', text: 'Gagal memuat pengaturan.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await api.put('/registration-settings', {
                registration_open: formData.registration_open,
                registration_close: formData.registration_close,
                is_active: formData.is_active,
            });
            setMessage({ type: 'success', text: 'Pengaturan berhasil disimpan!' });
            loadSettings();
        } catch (err: any) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Gagal menyimpan pengaturan.'
            });
        } finally {
            setSaving(false);
        }
    };

    const getStatusInfo = () => {
        if (!settings) return null;

        const now = new Date();
        const openDate = new Date(formData.registration_open);
        const closeDate = new Date(formData.registration_close);

        if (!formData.is_active) {
            return { status: 'Dinonaktifkan', color: 'text-red-500', bg: 'bg-red-500/10' };
        }

        // Ensure comparison is robust
        if (now < openDate) {
            return { status: 'Belum Dibuka', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
        }
        if (now > closeDate) {
            return { status: 'Sudah Ditutup', color: 'text-neutral-500', bg: 'bg-neutral-500/10' };
        }
        return { status: 'Sedang Dibuka', color: 'text-green-500', bg: 'bg-green-500/10' };
    };

    const statusInfo = getStatusInfo();

    const formatDateDisplay = (dateString: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-8">Pengaturan Pendaftaran</h1>

            {loading ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-neutral-800/50 rounded-xl" />
                    <div className="h-64 bg-neutral-800/50 rounded-xl" />
                </div>
            ) : (
                <>
                    {/* Current Status */}
                    {statusInfo && (
                        <div className="mb-8 p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl">
                            <div className="bg-neutral-900/80 p-6 rounded-[11px]">
                                <h2 className="text-lg font-semibold text-white mb-4">Status Saat Ini</h2>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-2 rounded-full font-semibold ${statusInfo.color} ${statusInfo.bg}`}>
                                        {statusInfo.status}
                                    </span>
                                </div>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-neutral-400">Tanggal Buka:</p>
                                        <p className="text-white">{formatDateDisplay(formData.registration_open)}</p>
                                    </div>
                                    <div>
                                        <p className="text-neutral-400">Tanggal Tutup:</p>
                                        <p className="text-white">{formatDateDisplay(formData.registration_close)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Settings Form */}
                    <div className="p-px bg-gradient-to-br from-orange-500/30 via-white/10 to-transparent rounded-xl">
                        <div className="bg-neutral-900/80 p-6 rounded-[11px]">
                            <h2 className="text-lg font-semibold text-white mb-6">Update Pengaturan</h2>

                            {message.text && (
                                <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success'
                                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Tanggal & Waktu Buka
                                        </label>
                                        <Input
                                            type="datetime-local"
                                            value={formData.registration_open}
                                            onChange={(e) => setFormData({ ...formData, registration_open: e.target.value })}
                                            className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Tanggal & Waktu Tutup
                                        </label>
                                        <Input
                                            type="datetime-local"
                                            value={formData.registration_close}
                                            onChange={(e) => setFormData({ ...formData, registration_close: e.target.value })}
                                            className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="p-px bg-gradient-to-br from-white/5 to-transparent rounded-lg">
                                    <div className="bg-neutral-800/30 p-4 rounded-lg flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-medium">Override Aktif</h3>
                                            <p className="text-neutral-400 text-sm">
                                                Jika dinonaktifkan, pendaftaran akan ditutup meskipun dalam rentang waktu.
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_active}
                                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        disabled={saving}
                                        className="px-6 py-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50"
                                    >
                                        {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
