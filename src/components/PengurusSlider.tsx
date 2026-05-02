
import PengurusCard from './PengurusCard';
import type { Pengurus } from '../types';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface PengurusSliderProps {
    members: Pengurus[];
    onMemberClick: (member: Pengurus) => void;
}

export default function PengurusSlider({ members, onMemberClick }: PengurusSliderProps) {
    if (!members.length) return null;

    return (
        <div>
            {/* Mobile: Horizontal Card Carousel */}
            <div className="md:hidden px-8">
                <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {members.map((p) => (
                            <CarouselItem key={p.id} className="pl-4 basis-[85%]">
                                <div className="p-1">
                                    <PengurusCard
                                        pengurus={p}
                                        onClick={() => onMemberClick(p)}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-6">
                {members.map((p) => (
                    <div key={p.id}>
                        <PengurusCard
                            pengurus={p}
                            onClick={() => onMemberClick(p)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
