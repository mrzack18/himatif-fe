// Types untuk Registrasi
export interface Registrasi {
    id: number;
    nama: string;
    nim: string;
    angkatan: number;
    kelas: string;
    email: string;
    whatsapp: string;
    alasan: string;
    created_at: string;
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
    open_date?: string;
    close_date?: string;
}
