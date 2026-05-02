import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllUsersApi, createUserApi, updateUserApi, deleteUserApi, type CreateUserData, type UpdateUserData } from '../../api/userApi';
import useDocumentTitle from '../../hooks/useDocumentTitle';

interface User {
    user_id: number;
    full_name: string;
    email: string;
    role: string;
    created_at?: string;
}

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function AdminUsers() {
    useDocumentTitle('Kelola Users - Admin');
    const { user } = useAuth();
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [formData, setFormData] = useState<CreateUserData>({
        full_name: '',
        email: '',
        password: '',
        role: 'member', // Default role
    });

    useEffect(() => {
        if (user?.role !== 'super_admin') {
            navigate('/admin');
            return;
        }
        loadUsers();
    }, [user, navigate]);

    const loadUsers = async () => {
        try {
            const res = await getAllUsersApi();
            const data = res.data.data;
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to load users:', err);
            setMessage({ type: 'error', text: 'Gagal memuat data users.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;

        try {
            await deleteUserApi(id);
            setUsers(users.filter(u => u.user_id !== id));
            setMessage({ type: 'success', text: 'User berhasil dihapus.' });
        } catch (err: any) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Gagal menghapus user.'
            });
        }
    };

    const openCreateModal = () => {
        setEditId(null);
        setFormData({ full_name: '', email: '', password: '', role: 'member' });
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditId(user.user_id);
        setFormData({
            full_name: user.full_name,
            email: user.email,
            password: '', // Password empty by default
            role: user.role,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            if (editId) {
                // Update Mode
                const updateData: UpdateUserData = {
                    full_name: formData.full_name,
                    email: formData.email,
                    role: formData.role,
                };
                if (formData.password) {
                    updateData.password = formData.password;
                }

                await updateUserApi(editId, updateData);
                setMessage({ type: 'success', text: 'User berhasil diperbarui.' });
            } else {
                // Create Mode
                await createUserApi(formData);
                setMessage({ type: 'success', text: 'User berhasil ditambahkan.' });
            }

            setIsModalOpen(false);
            setEditId(null);
            setFormData({ full_name: '', email: '', password: '', role: 'member' });
            loadUsers();
        } catch (err: any) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || (editId ? 'Gagal memperbarui user.' : 'Gagal menambahkan user.')
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Kelola Users</h1>
                <Button
                    onClick={openCreateModal}
                    className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-orange-500/30"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah User
                </Button>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}>
                    {message.text}
                </div>
            )}

            {loading ? (
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 bg-neutral-800/50 rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-neutral-800 text-neutral-400 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">Nama</th>
                                <th className="p-4 font-medium">Email</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-neutral-500">
                                        Belum ada data user.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.user_id} className="text-neutral-300 hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium text-white">{user.full_name}</td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-semibold
                                                ${user.role === 'super_admin'
                                                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                    : user.role === 'admin'
                                                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                        : user.role === 'informasi'
                                                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                            : 'bg-neutral-700/50 text-neutral-400 border border-neutral-600'
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditModal(user)}
                                                className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 mr-2"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(user.user_id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                title="Hapus"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Tambah/Edit User */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md bg-neutral-900 border-neutral-800 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white">
                            {editId ? 'Edit User' : 'Tambah User Baru'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Nama Lengkap</label>
                            <Input
                                type="text"
                                required
                                value={formData.full_name}
                                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                className="bg-neutral-800 border-neutral-700 text-white focus-visible:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                            <Input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="bg-neutral-800 border-neutral-700 text-white focus-visible:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-1">Role</label>
                            <Select
                                value={formData.role}
                                onValueChange={(value) => setFormData({ ...formData, role: value })}
                            >
                                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white focus:ring-orange-500">
                                    <SelectValue placeholder="Pilih Role" />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                                    <SelectItem value="member">Member</SelectItem>
                                    <SelectItem value="informasi">Informasi</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="super_admin">Super Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-1">
                                Password {editId && <span className="text-xs font-normal text-neutral-500">(Kosongkan jika tidak diubah)</span>}
                            </label>
                            <Input
                                type="password"
                                required={!editId}
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="bg-neutral-800 border-neutral-700 text-white focus-visible:ring-orange-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsModalOpen(false)}
                                className="text-neutral-400 hover:text-white"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                {submitting ? 'Menyimpan...' : (editId ? 'Simpan Perubahan' : 'Simpan User')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
