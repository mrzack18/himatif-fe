import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import type { Pengurus, Divisi } from '../../types';
import { Dialog as ConfirmationDialog } from '../../components';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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

export default function AdminPengurus() {
    useDocumentTitle('Manajemen Pengurus - Admin');
    const [pengurus, setPengurus] = useState<Pengurus[]>([]);
    const [divisiList, setDivisiList] = useState<Divisi[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterDivisi, setFilterDivisi] = useState('');

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        nama: '',
        nama_panggilan: '',
        jabatan: '',
        divisi_id: '',
        kutipan: '',
        instagram: '',
        linkedin: '',
        status: 'aktif',
        periode: new Date().getFullYear().toString(),
        foto: null as File | null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [pengurusRes, divisiRes] = await Promise.all([
                api.get('/pengurus'),
                api.get('/divisi'),
            ]);
            setPengurus(pengurusRes.data.data || []);
            setDivisiList(divisiRes.data.data || []);
        } catch (err) {
            console.error('Failed to load data:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredPengurus = pengurus.filter((p) => {
        const matchSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase());
        const matchDivisi = !filterDivisi || filterDivisi === "all" || p.divisi_id?.toString() === filterDivisi;
        return matchSearch && matchDivisi;
    });

    const resetForm = () => {
        setFormData({
            nama: '',
            nama_panggilan: '',
            jabatan: '',
            divisi_id: '',
            kutipan: '',
            instagram: '',
            linkedin: '',
            status: 'aktif',
            periode: new Date().getFullYear().toString(),
            foto: null,
        });
        setEditMode(false);
        setSelectedId(null);
        setFormError('');
    };

    const openAddForm = () => {
        resetForm();
        setShowForm(true);
    };

    const openEditForm = (p: Pengurus) => {
        setFormData({
            nama: p.nama,
            nama_panggilan: p.nama_panggilan || '',
            jabatan: p.jabatan,
            divisi_id: p.divisi_id?.toString() || '',
            kutipan: p.kutipan || '',
            instagram: p.instagram || '',
            linkedin: p.linkedin || '',
            status: p.status || 'aktif',
            periode: p.periode || new Date().getFullYear().toString(),
            foto: null,
        });
        setEditMode(true);
        setSelectedId(p.id);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');

        const data = new FormData();
        data.append('nama', formData.nama);
        data.append('nama_panggilan', formData.nama_panggilan);
        data.append('jabatan', formData.jabatan);
        if (formData.divisi_id) data.append('divisi_id', formData.divisi_id);
        data.append('kutipan', formData.kutipan);
        data.append('instagram', formData.instagram);
        data.append('linkedin', formData.linkedin);
        data.append('status', formData.status);
        data.append('periode', formData.periode);
        if (formData.foto) data.append('foto', formData.foto);

        try {
            if (editMode && selectedId) {
                await api.post(`/pengurus/${selectedId}`, data);
            } else {
                await api.post('/pengurus', data);
            }
            setShowForm(false);
            resetForm();
            loadData();
        } catch (err: any) {
            setFormError(err.response?.data?.message || 'Gagal menyimpan data.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/pengurus/${deleteId}`);
            loadData();
        } catch (err) {
            console.error('Failed to delete:', err);
        } finally {
            setShowDeleteDialog(false);
            setDeleteId(null);
        }
    };

    const imageUrl = (foto?: string) =>
        foto
            ? `${import.meta.env.VITE_API_URL}/${foto}`
            : '/images/default-avatar.png';

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className="text-2xl font-bold text-white">Kelola Pengurus</h1>
                <Button
                    onClick={openAddForm}
                    className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-orange-500/30"
                >
                    + Tambah Pengurus
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Cari nama..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                />
                <div className="w-full md:w-64">
                    <Select
                        value={filterDivisi || "all"}
                        onValueChange={(val) => setFilterDivisi(val === "all" ? "" : val)}
                    >
                        <SelectTrigger className="bg-neutral-800/50 border-neutral-700 text-white focus:ring-orange-500">
                            <SelectValue placeholder="Semua Divisi" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                            <SelectItem value="all">Semua Divisi</SelectItem>
                            {divisiList.map((d) => (
                                <SelectItem key={d.id} value={d.id.toString()}>{d.nama_divisi}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-neutral-800/50 rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="bg-neutral-900/80 rounded-xl overflow-hidden border border-neutral-800">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-800/50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Foto</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Nama</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Jabatan</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Divisi</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Status</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-neutral-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {filteredPengurus.map((p) => (
                                    <tr key={p.id} className="hover:bg-neutral-800/30">
                                        <td className="px-4 py-3">
                                            <img
                                                src={imageUrl(p.foto)}
                                                alt={p.nama}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-white">{p.nama}</td>
                                        <td className="px-4 py-3 text-neutral-400">{p.jabatan}</td>
                                        <td className="px-4 py-3 text-neutral-400">{p.nama_divisi || '-'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-xs rounded-full ${p.status === 'aktif'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditForm(p)}
                                                className="text-orange-500 hover:text-orange-400 mr-2 hover:bg-orange-500/10"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => { setDeleteId(p.id); setShowDeleteDialog(true); }}
                                                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                            >
                                                Hapus
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPengurus.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                                            Tidak ada data pengurus.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent className="sm:max-w-2xl bg-neutral-900 border-neutral-800 text-white max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editMode ? 'Edit Pengurus' : 'Tambah Pengurus'}</DialogTitle>
                    </DialogHeader>

                    {formError && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
                            {formError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Nama *</label>
                                <Input
                                    type="text"
                                    required
                                    value={formData.nama}
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Nama Panggilan</label>
                                <Input
                                    type="text"
                                    value={formData.nama_panggilan}
                                    onChange={(e) => setFormData({ ...formData, nama_panggilan: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Jabatan *</label>
                                <Input
                                    type="text"
                                    required
                                    value={formData.jabatan}
                                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Divisi</label>
                                <Select
                                    value={formData.divisi_id}
                                    onValueChange={(val) => setFormData({ ...formData, divisi_id: val })}
                                >
                                    <SelectTrigger className="bg-neutral-800/50 border-neutral-700 text-white focus:ring-orange-500">
                                        <SelectValue placeholder="Pilih Divisi" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                                        <SelectItem value="0">Pilih Divisi</SelectItem> {/* Use placeholder or handle non-selection better? 0 or empty string */}
                                        {/* To make it cleaner, if value is empty, the placeholder shows. */}
                                        {divisiList.map((d) => (
                                            <SelectItem key={d.id} value={d.id.toString()}>{d.nama_divisi}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Instagram</label>
                                <Input
                                    type="text"
                                    value={formData.instagram}
                                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                    placeholder="username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">LinkedIn</label>
                                <Input
                                    type="text"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                    placeholder="URL LinkedIn"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Status</label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val) => setFormData({ ...formData, status: val })}
                                >
                                    <SelectTrigger className="bg-neutral-800/50 border-neutral-700 text-white focus:ring-orange-500">
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                                        <SelectItem value="aktif">Aktif</SelectItem>
                                        <SelectItem value="nonaktif">Non-aktif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Periode</label>
                                <Input
                                    type="text"
                                    value={formData.periode}
                                    onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                    placeholder="2024/2025"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Kutipan</label>
                            <Textarea
                                value={formData.kutipan}
                                onChange={(e) => setFormData({ ...formData, kutipan: e.target.value })}
                                rows={2}
                                className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500 resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Foto</label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, foto: e.target.files?.[0] || null })}
                                className="bg-neutral-800/50 border-neutral-700 text-white file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setShowForm(false)}
                                className="text-neutral-400 hover:text-white border-neutral-700"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmationDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Hapus Pengurus"
                message="Apakah Anda yakin ingin menghapus pengurus ini?"
                confirmText="Hapus"
                variant="danger"
            />
        </div>
    );
}
