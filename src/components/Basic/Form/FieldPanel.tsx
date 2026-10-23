import type { CSSProperties, ReactNode } from 'react';
import { tilt } from '../../../utils/tilt';
import Tape from '../Tape';

export type TapeLayout = 'sides' | 'top' | 'diagonal';

function Tapes({ layout }: { layout: TapeLayout }) {
    switch (layout) {
        case 'sides':
            return (
                <>
                    <Tape tone="blue" size="h-5 w-10" className="-left-5 top-1/2 -translate-y-1/2 -rotate-96" />
                    <Tape size="h-5 w-10" className="-right-5 top-1/2 -translate-y-1/2 rotate-94" />
                </>
            );
        case 'top':
            return <Tape size="h-5 w-20" className="-top-2.5 left-1/2 -translate-x-1/2 rotate-2" />;
        case 'diagonal':
            return (
                <>
                    <Tape size="h-5 w-16" className="-left-4 -top-1 -rotate-45" />
                    <Tape tone="blue" size="h-5 w-16" className="-bottom-1 -right-4 -rotate-45" />
                </>
            );
    }
}

interface FieldPanelProps {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    tape: TapeLayout;
    seed: string;
    children: ReactNode;
}

export default function FieldPanel({ id, label, hint, error, tape, seed, children }: FieldPanelProps) {
    return (
        <div
            style={{ '--tilt': `${tilt(`${seed}-field`, 0.7)}deg` } as CSSProperties}
            className="relative rotate-(--tilt) transition-transform duration-200 focus-within:rotate-0"
        >
            <Tapes layout={tape} />

            <div className="bg-[#F1E6DF] p-4 text-left shadow-[0_6px_14px_-6px_rgba(60,40,20,0.3)]">
                <label
                    htmlFor={id}
                    className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-stone-700"
                >
                    {label}
                </label>

                {children}

                {error ? (
                    <p
                        data-testId={`${id}-message`}
                        id={`${id}-message`}
                        className="mt-2 text-xs font-bold text-red-800"
                    >
                        {error}
                    </p>
                ) : (
                    hint && (
                        <p id={`${id}-message`} className="mt-2 text-xs text-stone-500">
                            {hint}
                        </p>
                    )
                )}
            </div>
        </div>
    );
}
