type TapeTone = 'amber' | 'blue'

export default function Tape({ className = '', tone = 'amber' }: { className?: string; tone?: TapeTone }) {
    return (
        <span
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 h-5 w-14 ${
                tone === 'amber' ? 'bg-amber-200/70' : 'bg-sky-200/70'
            } ${className}`}
        />
    )
}