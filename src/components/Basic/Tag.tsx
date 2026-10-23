import type { CSSProperties } from 'react';
import { randomFromArray, tilt } from '../../utils/tilt';

type TagTone = 'red' | 'blue' | 'plain';
type TagSize = 'sm' | 'lg';

const toneClasses: Record<TagTone, string> = {
    red: 'bg-orange-100 text-red-800',
    blue: 'bg-sky-100 text-sky-800',
    plain: 'bg-white text-stone-900',
};

const sizeClasses: Record<TagSize, string> = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    lg: 'px-3 py-1.5 text-2xl tracking-wider',
};

export default function Tag({
    label,
    seed,
    hidden = false,
    size = 'sm',
}: {
    label: string;
    seed: string;
    hidden?: boolean;
    size?: TagSize;
}) {
    return (
        <span
            hidden={hidden}
            style={{ '--tilt': `${tilt(seed, 2.5)}deg` } as CSSProperties}
            className={`inline-block rotate-(--tilt) font-bold uppercase text-center leading-none ${
                sizeClasses[size]
            } ${toneClasses[randomFromArray(['red', 'blue', 'plain'], seed) as TagTone]}`}
        >
            {label}
        </span>
    );
}
