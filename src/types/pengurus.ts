// Types untuk Pengurus dan Divisi
export interface Divisi {
    id: number;
    nama_divisi: string;
    created_at?: string;
    updated_at?: string;
}

export interface Pengurus {
    id: number;
    nama: string;
    nama_panggilan?: string;
    jabatan: string;
    foto?: string;
    kutipan?: string;
    instagram?: string;
    linkedin?: string;
    status: string;
    periode: string;
    divisi_id?: number | null;
    divisi?: Divisi;
    nama_divisi?: string;
    created_at?: string;
    updated_at?: string;
}
