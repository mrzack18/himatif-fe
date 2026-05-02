import { useState, useEffect, useCallback } from 'react';

interface CountdownProps {
    targetDate: string;
    onEnd?: () => void;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
}

export default function Countdown({ targetDate, onEnd }: CountdownProps) {
    const calculateTimeLeft = useCallback((): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isExpired: false
        };
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.isExpired) {
                clearInterval(timer);
                if (onEnd) onEnd();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft, onEnd]);

    if (timeLeft.isExpired) return null;

    const TimeBlock = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className="bg-neutral-900/50 border border-white/10 rounded-lg w-12 h-14 md:w-16 md:h-20 flex items-center justify-center mb-1 shadow-lg shadow-orange-500/5">
                <span className="text-xl md:text-3xl font-bold bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-wider text-neutral-500 font-semibold">{label}</span>
        </div>
    );

    return (
        <div className="flex flex-col items-center mb-8">
            <p className="text-neutral-400 text-sm mb-4 font-medium flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Pendaftaran ditutup dalam:
            </p>
            <div className="flex gap-3 md:gap-4">
                <TimeBlock value={timeLeft.days} label="Hari" />
                <div className="text-2xl pt-3 md:pt-6 font-bold text-neutral-700">:</div>
                <TimeBlock value={timeLeft.hours} label="Jam" />
                <div className="text-2xl pt-3 md:pt-6 font-bold text-neutral-700">:</div>
                <TimeBlock value={timeLeft.minutes} label="Menit" />
                <div className="text-2xl pt-3 md:pt-6 font-bold text-neutral-700">:</div>
                <TimeBlock value={timeLeft.seconds} label="Detik" />
            </div>
        </div>
    );
}
