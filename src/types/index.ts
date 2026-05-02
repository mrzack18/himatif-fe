// Berita
export interface Berita {
    id: number;
    title: string;
    slug: string;
    category: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
}

// Pengurus & Divisi
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

// Registrasi
export interface Registrasi {
    id: number;
    nama_lengkap: string;
    nim: string;
    angkatan: number;
    kelas: string;
    email: string;
    no_whatsapp: string;
    alasan_bergabung: string;
    status: string;
    created_at?: string;
}

export interface RegistrationSettings {
    id: number;
    registration_open: string;
    registration_close: string;
    is_active: boolean;
}

export interface RegistrationStatus {
    status: 'open' | 'not_started' | 'closed' | 'inactive';
    message: string;
    registration_open?: string;
    registration_close?: string;
}
