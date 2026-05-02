import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import type { Registrasi } from '../../types';
import { Dialog } from '../../components';
import * as XLSX from 'xlsx';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useAuth } from '../../context/AuthContext';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminRegistrasi() {
    useDocumentTitle('Data Registrasi - Admin');
    const { user } = useAuth();
    const [registrasi, setRegistrasi] = useState<Registrasi[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await api.get('/registrasi');
            setRegistrasi(res.data.data || []);
        } catch (err) {
            console.error('Failed to load data:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredRegistrasi = registrasi.filter((r) =>
        (r.nama_lengkap || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.nim || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/registrasi/${deleteId}`);
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
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const exportToExcel = () => {
        const data = filteredRegistrasi.map((r, index) => ({
            'No': index + 1,
            'Nama': r.nama_lengkap,
            'NIM': r.nim,
            'Angkatan': r.angkatan,
            'Kelas': r.kelas,
            'Email': r.email,
            'WhatsApp': r.no_whatsapp,
            'Alasan Bergabung': r.alasan_bergabung,
            'Tanggal Daftar': formatDate(r.created_at || ''),
        }));

        const ws = XLSX.utils.json_to_sheet(data);

        // Style header
        const headerStyle = { font: { bold: true }, fill: { fgColor: { rgb: 'FF6B00' } } };
        const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = XLSX.utils.encode_col(C) + '1';
            if (!ws[address]) continue;
            ws[address].s = headerStyle;
        }

        // Set column widths
        ws['!cols'] = [
            { wch: 5 },  // No
            { wch: 25 }, // Nama
            { wch: 15 }, // NIM
            { wch: 10 }, // Angkatan
            { wch: 10 }, // Kelas
            { wch: 25 }, // Email
            { wch: 15 }, // WhatsApp
            { wch: 40 }, // Alasan
            { wch: 20 }, // Tanggal
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Pendaftaran');
        XLSX.writeFile(wb, `pendaftaran_himatif_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className="text-2xl font-bold text-white">Data Pendaftaran</h1>
                <Button
                    onClick={exportToExcel}
                    disabled={filteredRegistrasi.length === 0}
                    className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Excel
                </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Cari nama, NIM, atau email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-96 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                />
            </div>

            {/* Stats */}
            <div className="mb-6 p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl">
                <div className="bg-neutral-900/80 p-4 rounded-[11px] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-500/10 flex items-center justify-center text-neutral-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-neutral-400 text-sm">Total Pendaftar</p>
                        <p className="text-2xl font-bold text-white">{registrasi.length}</p>
                    </div>
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
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">No</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Nama</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">NIM</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Angkatan</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Kelas</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">WhatsApp</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Tanggal</th>
                                    {user?.role !== 'informasi' && (
                                        <th className="px-4 py-3 text-right text-sm font-medium text-neutral-400">Aksi</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {filteredRegistrasi.map((r, index) => (
                                    <tr key={r.id} className="hover:bg-neutral-800/30">
                                        <td className="px-4 py-3 text-neutral-400">{index + 1}</td>
                                        <td className="px-4 py-3 text-white">{r.nama_lengkap}</td>
                                        <td className="px-4 py-3 text-neutral-400">{r.nim}</td>
                                        <td className="px-4 py-3 text-neutral-400">{r.angkatan}</td>
                                        <td className="px-4 py-3 text-neutral-400">{r.kelas}</td>
                                        <td className="px-4 py-3 text-neutral-400">{r.email}</td>
                                        <td className="px-4 py-3 text-neutral-400">{r.no_whatsapp}</td>
                                        <td className="px-4 py-3 text-neutral-400 text-sm">{formatDate(r.created_at || '')}</td>
                                        {user?.role !== 'informasi' && (
                                            <td className="px-4 py-3 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => { setDeleteId(r.id); setShowDeleteDialog(true); }}
                                                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                                >
                                                    Hapus
                                                </Button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                {filteredRegistrasi.length === 0 && (
                                    <tr>
                                        <td colSpan={user?.role !== 'informasi' ? 9 : 8} className="px-4 py-8 text-center text-neutral-500">
                                            {searchQuery ? 'Tidak ada data yang sesuai.' : 'Belum ada pendaftar.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            <Dialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Hapus Pendaftar"
                message="Apakah Anda yakin ingin menghapus data pendaftar ini?"
                confirmText="Hapus"
                variant="danger"
            />
        </div>
    );
}
