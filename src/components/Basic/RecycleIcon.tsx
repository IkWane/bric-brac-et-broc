export default function RecycleIcon({ className = '' }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7L6 11.5" />
            <path d="M11 19h8.2a1.8 1.8 0 0 0 1.6-2.7L19.5 14" />
            <path d="m14 16-3 3 3 3" />
            <path d="M8.3 13.6 6 11.5l-3.3.9" />
            <path d="m9.3 6.3 1.1-1.9a1.8 1.8 0 0 1 3.1 0l3.4 5.9" />
            <path d="m13.4 9.4 3.5.9.9-3.5" />
        </svg>
    )
}