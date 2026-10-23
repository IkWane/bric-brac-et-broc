import type { ComponentProps, CSSProperties } from 'react';
import { tilt } from '../../utils/tilt';

export type ButtonVariant =
    /** Big orange call to action (pay, submit, add to order) */
    | 'primary'
    /** Small brown action with a hard shadow (Snag it) */
    | 'secondary'
    /** White box with a dark border and hard shadow (burger menu) */
    | 'outline'
    /** Tilted strip of tape, highlighted when aria-pressed (filters) */
    | 'tape'
    /** Small white square (+ / − quantity) */
    | 'square'
    /** Plain text that underlines on hover (Start over) */
    | 'ghost'
    /** Red text that underlines on hover (Remove) */
    | 'danger';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon';

const base =
    'inline-flex items-center justify-center font-bold uppercase leading-snug transition-transform ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 ' +
    'disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
    primary:
        'relative bg-orange-800 tracking-wider text-white shadow-[0_6px_14px_-6px_rgba(60,40,20,0.4)] ' +
        'hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-orange-800 ' +
        'disabled:bg-stone-400 disabled:hover:translate-y-0',
    secondary:
        'bg-[#6B4A24] text-white shadow-[2px_2px_0_0_#1c1917] hover:-translate-y-0.5 active:translate-y-0 ' +
        'disabled:opacity-50 disabled:hover:translate-y-0',
    outline: 'border-2 border-stone-800 bg-white text-stone-900 shadow-[2px_2px_0_0_#1c1917]',
    tape:
        'rotate-(--tilt) bg-stone-200 text-stone-800 hover:rotate-0 ' +
        'aria-pressed:bg-amber-200 aria-pressed:text-stone-900',
    square: 'bg-white text-stone-800 hover:bg-stone-200 disabled:opacity-40',
    ghost: 'text-stone-700 hover:underline focus-visible:outline-offset-0',
    danger: 'text-red-800 hover:underline focus-visible:outline-offset-0',
};

const sizes: Record<ButtonSize, string> = {
    xs: 'gap-1 text-[10px]',
    sm: 'gap-2 px-3 py-1.5 text-[11px]',
    md: 'gap-2 px-3 py-1.5 text-sm',
    lg: 'gap-3 px-8 py-4 text-lg',
    'icon-sm': 'h-6 w-6 shrink-0 text-sm',
    icon: 'h-9 w-9 shrink-0',
};

/** Size used when none is passed, so most call sites only pick a variant. */
const defaultSize: Record<ButtonVariant, ButtonSize> = {
    primary: 'lg',
    secondary: 'md',
    outline: 'icon',
    tape: 'sm',
    square: 'icon-sm',
    ghost: 'sm',
    danger: 'xs',
};

export type ButtonProps = ComponentProps<'button'> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Gives the button a stable random tilt (used by the 'tape' variant). */
    tiltSeed?: string;
    /** Maximum tilt in degrees, either way. */
    tiltMax?: number;
};

/** The one button for the whole app. Pick a look with `variant`, adjust with `size`. */
export default function Button({
    variant = 'primary',
    size,
    tiltSeed,
    tiltMax = 1.5,
    type = 'button',
    className = '',
    style,
    ...props
}: ButtonProps) {
    const tiltStyle = tiltSeed ? ({ '--tilt': `${tilt(tiltSeed, tiltMax)}deg` } as CSSProperties) : undefined;

    return (
        <button
            {...props}
            type={type}
            style={{ ...tiltStyle, ...style }}
            className={`${base} ${variants[variant]} ${sizes[size ?? defaultSize[variant]]} ${className}`}
        />
    );
}
