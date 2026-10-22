import type { ReactNode } from 'react';
import RecycleIcon from '../Basic/RecycleIcon';

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
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

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
                        Purveyors of random stuff since today.
                    </p>
                </div>

                {/* Eco-pledge */}
                <div className="max-w-xs">
                    <h2 className="m-0! text-base! font-bold uppercase tracking-wide! text-stone-900">Eco-pledge</h2>
                    <p className="mt-3 text-xs leading-relaxed text-stone-600">
                        Every order is packed using recycled scrap newspaper and misprinted industrial kraft cartons.
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
    );
}
