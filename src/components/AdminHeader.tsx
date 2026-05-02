import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminHeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function AdminHeader({ isSidebarOpen, onToggleSidebar }: AdminHeaderProps) {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-10 bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden text-white"
                        onClick={onToggleSidebar}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isSidebarOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    <div className="flex flex-col">
                        <span className="text-white font-medium">{user?.full_name}</span>
                        <span className="text-xs text-neutral-500 capitalize">{user?.role?.replace('_', ' ')}</span>
                    </div>
                </div>
                <Link to="/" className="text-neutral-400 hover:text-white text-sm">
                    ← Kembali ke Website
                </Link>
            </div>
        </header>
    );
}
