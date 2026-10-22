import type { ReactNode } from 'react'

function Icon({ children, label }: { children: ReactNode; label: string }) {
    return (
        <svg
            role="img"
            aria-label={label}
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <title>{label}</title>
            {children}
        </svg>
    )
}

function RecycleIcon({ className = '' }: { className?: string }) {
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

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="mt-auto w-full border-t-2 border-[#8B5E34] bg-[#F5EAE3] px-6 pb-6 pt-10 text-left sm:px-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                {/* Brand */}
                <div className="max-w-xs">
                    <div className="flex items-center gap-2">
                        <RecycleIcon className="h-6 w-6 text-orange-700" />
                        <span className="text-lg font-bold uppercase tracking-wide text-stone-900">
                            Bric &amp; Broc
                        </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-stone-600">
                        Purveyors of random stuff and bulk industrial corrugated cardboard packaging since
                        today.
                    </p>
                </div>

                {/* Eco-pledge */}
                <div className="max-w-xs">
                    <h2 className="m-0! text-base! font-bold uppercase tracking-wide! text-stone-900">
                        Eco-pledge
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-stone-600">
                        Every order is packed using recycled scrap newspaper and misprinted industrial kraft
                        cartons. 0% glossy nonsense.
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-stone-600">
                        <Icon label="Quality checked">
                            <rect x="5" y="4" width="14" height="17" rx="1" />
                            <path d="M9 4V3h6v1" />
                            <path d="m9 13 2 2 4-4" />
                        </Icon>
                        <RecycleIcon className="h-5 w-5" />
                        <Icon label="Boxed and shipped">
                            <rect x="4" y="4" width="16" height="16" rx="1" />
                            <path d="M4 9h16" />
                            <path d="M12 12v5m-2.5-2.5L12 17l2.5-2.5" />
                        </Icon>
                        <Icon label="Community favourite">
                            <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z" />
                        </Icon>
                    </div>
                </div>
            </div>

            <hr className="my-6 border-stone-300" />

            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-800">
                © {year} Bric &amp; Broc Emporium. No rights reserved. Keep scrapping.
            </p>
        </footer>
    )
}