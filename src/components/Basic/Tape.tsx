type TapeTone = 'amber' | 'blue';

export default function Tape({
    className = '',
    tone = 'amber',
    size = 'h-5 w-14',
}: {
    className?: string;
    tone?: TapeTone;
    size?: string;
}) {
    return (
        <span
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 ${size} ${
                tone === 'amber' ? 'bg-amber-200/70' : 'bg-sky-200/70'
            } ${className}`}
        />
    );
}
