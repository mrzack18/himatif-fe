import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import type { Berita } from '../../types';
import { Dialog as ConfirmationDialog, RichTextEditor } from '../../components';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function AdminBerita() {
    useDocumentTitle('Manajemen Berita - Admin');
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        excerpt: '',
        content: '',
        image: null as File | null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await api.get('/berita');
            setBerita(res.data.data || []);
        } catch (err) {
            console.error('Failed to load data:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredBerita = berita.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            category: '',
            author: '',
            date: new Date().toISOString().split('T')[0],
            excerpt: '',
            content: '',
            image: null,
        });
        setEditMode(false);
        setSelectedId(null);
        setFormError('');
    };

    const openAddForm = () => {
        resetForm();
        setShowForm(true);
    };

    const openEditForm = (b: Berita) => {
        setFormData({
            title: b.title,
            slug: b.slug,
            category: b.category || '',
            author: b.author || '',
            date: b.date ? new Date(b.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            excerpt: b.excerpt || '',
            content: b.content || '',
            image: null,
        });
        setEditMode(true);
        setSelectedId(b.id);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('slug', formData.slug || generateSlug(formData.title));
        data.append('category', formData.category);
        data.append('author', formData.author);
        data.append('date', formData.date);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        if (formData.image) data.append('foto', formData.image);

        try {
            if (editMode && selectedId) {
                await api.post(`/berita/${selectedId}`, data);
            } else {
                await api.post('/berita', data);
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
            await api.delete(`/berita/${deleteId}`);
            loadData();
        } catch (err) {
            console.error('Failed to delete:', err);
        } finally {
            setShowDeleteDialog(false);
            setDeleteId(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className="text-2xl font-bold text-white">Kelola Berita</h1>
                <Button
                    onClick={openAddForm}
                    className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-orange-500/30"
                >
                    + Tulis Berita
                </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Cari judul atau penulis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-96 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                />
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
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Judul</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Kategori</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Penulis</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Tanggal</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-neutral-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {filteredBerita.map((b) => (
                                    <tr key={b.id} className="hover:bg-neutral-800/30">
                                        <td className="px-4 py-3 text-white max-w-xs truncate">{b.title}</td>
                                        <td className="px-4 py-3 text-neutral-400">{b.category || '-'}</td>
                                        <td className="px-4 py-3 text-neutral-400">{b.author || '-'}</td>
                                        <td className="px-4 py-3 text-neutral-400">{formatDate(b.date)}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditForm(b)}
                                                className="text-orange-500 hover:text-orange-400 mr-2 hover:bg-orange-500/10"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => { setDeleteId(b.id); setShowDeleteDialog(true); }}
                                                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                            >
                                                Hapus
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredBerita.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                                            Tidak ada berita.
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
                <DialogContent className="sm:max-w-3xl bg-neutral-900 border-neutral-800 text-white max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editMode ? 'Edit Berita' : 'Tulis Berita Baru'}</DialogTitle>
                    </DialogHeader>

                    {formError && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
                            {formError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Judul *</label>
                            <Input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    title: e.target.value,
                                    slug: generateSlug(e.target.value)
                                })}
                                className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Slug</label>
                            <Input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Kategori</label>
                                <Input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                    placeholder="Kegiatan, Pengumuman, dll"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Penulis</label>
                                <Input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Tanggal</label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Ringkasan</label>
                            <Textarea
                                rows={2}
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="bg-neutral-800/50 border-neutral-700 text-white focus-visible:ring-orange-500 resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Konten</label>
                            <RichTextEditor
                                content={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                            />
                            <p className="text-xs text-neutral-500 mt-1">Gunakan toolbar untuk format teks.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Gambar</label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
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
                title="Hapus Berita"
                message="Apakah Anda yakin ingin menghapus berita ini?"
                confirmText="Hapus"
                variant="danger"
            />
        </div>
    );
}
