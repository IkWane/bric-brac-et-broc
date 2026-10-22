import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

function NavButton({
    link,
    label,
    children,
    activeColor,
}: {
    link: string;
    label?: string;
    children?: ReactNode;
    activeColor?: string;
}) {
    return (
        <NavLink
            key={link}
            to={link}
            className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-bold uppercase leading-tight ${
                    isActive
                        ? `border-2 border-stone-800 ${
                              activeColor ?? 'bg-[#8B5E34]'
                          } text-white shadow-[2px_2px_0_0_#1c1917]`
                        : 'border-2 border-transparent text-stone-800 hover:border-stone-800'
                }`
            }
        >
            {label ?? children ?? <></>}
        </NavLink>
    );
}

export default NavButton;
