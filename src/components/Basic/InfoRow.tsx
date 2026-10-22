import type { ReactNode } from "react";

export default function InfoRow({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <dt className="w-24 shrink-0 text-[10px] uppercase text-stone-500">{label}</dt>
            <dd className="m-0 flex flex-wrap items-center gap-1.5 text-xs text-stone-800">{children}</dd>
        </div>
    )
}