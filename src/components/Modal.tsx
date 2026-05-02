import { type ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    clean?: boolean;
}

export default function Modal({ isOpen, onClose, title, children, clean }: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className={cn("sm:max-w-lg max-h-[90vh] overflow-y-auto", clean && "p-0")}>
                <DialogHeader className={cn(clean && "hidden")}>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    <DialogDescription className="sr-only">
                        {title || "Modal Content"}
                    </DialogDescription>
                </DialogHeader>
                <div className={cn(!clean && "mt-0")}>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
