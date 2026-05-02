interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index?: number; // Optional for mapped keys if needed inside component logic, though usually passed to key prop
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="p-px bg-gradient-to-br from-white/10 to-transparent rounded-xl h-full">
            <div className="bg-neutral-900/80 backdrop-blur-xl p-6 rounded-xl h-full">
                <div className="text-orange-500 mb-4">
                    {icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                    {title}
                </h3>
                <p className="text-neutral-400 text-sm">{description}</p>
            </div>
        </div>
    );
}
