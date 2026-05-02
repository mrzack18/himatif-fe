interface PageHeaderProps {
    title: React.ReactNode;
    description?: string;
    backgroundImage?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, description, backgroundImage, className, children }: PageHeaderProps) {
    return (
        <section className={`relative py-24 md:py-32 bg-neutral-950 overflow-hidden ${className || ''}`}>
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url('${backgroundImage}')` }}
                />
            )}
            <div className={`container mx-auto px-6 relative ${!backgroundImage ? 'z-10' : ''}`}>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                    {title}
                </h1>
                {description && (
                    <p className="text-lg text-neutral-400 max-w-3xl">
                        {description}
                    </p>
                )}
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    );
}
