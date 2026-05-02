import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUserApi } from '../../api/userApi';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Profile() {
    useDocumentTitle('Profil Saya - Admin');
    const { user, login, token } = useAuth();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
        password: '',
        confirm_password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password && formData.password !== formData.confirm_password) {
            setMessage({ type: 'error', text: 'Konfirmasi password tidak cocok.' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const updateData: any = {
                full_name: formData.full_name,
                email: formData.email,
            };

            if (formData.password) {
                updateData.password = formData.password;
            }

            const res = await updateUserApi(user!.user_id, updateData);

            // Update context and localStorage
            if (res.data.statusCode === 200) {
                const updatedUser = {
                    ...user!,
                    full_name: formData.full_name,
                    email: formData.email,
                };
                login(updatedUser, token!);
                setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
                setFormData(prev => ({ ...prev, password: '', confirm_password: '' }));
            }
        } catch (err: any) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Gagal memperbarui profil.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-white mb-8">Profil Saya</h1>

            <div className="p-px bg-gradient-to-br from-orange-500/30 via-white/10 to-transparent rounded-xl">
                <div className="bg-neutral-900/80 p-8 rounded-[11px]">
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
                                    Nama Lengkap
                                </label>
                                <Input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                            <p className="text-sm text-neutral-400 mb-4">
                                Kosongkan password jika tidak ingin mengubahnya.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Password Baru
                                    </label>
                                    <Input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Konfirmasi Password
                                    </label>
                                    <Input
                                        type="password"
                                        value={formData.confirm_password}
                                        onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                        className="w-full px-4 py-3 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50"
                            >
                                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
