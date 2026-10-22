import type { CSSProperties } from "react";
import { randomFromArray, tilt } from "../../utils/tilt";

type TagTone = 'red' | 'blue' | 'plain';

const toneClasses: Record<TagTone, string> = {
    red: 'bg-orange-100 text-red-800',
    blue: 'bg-sky-100 text-sky-800',
    plain: 'bg-white text-stone-900',
}

export default function Tag({ label, seed }: { label: string; seed: string }) {
    return (
        <span
            style={{ '--tilt': `${tilt(seed, 2.5)}deg` } as CSSProperties}
            className={`inline-block rotate-(--tilt) px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none ${toneClasses[randomFromArray(['red','blue','plain'], seed) as TagTone]}`}
        >
            {label}
        </span>
    )
}