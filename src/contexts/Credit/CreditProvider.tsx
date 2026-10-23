import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { CreditContext } from './CreditContext';

const CREDIT_KEY = 'bric-broc-credit';
const STARTING_CREDIT = 1000;

function loadCredit(): number {
    try {
        return Number(localStorage.getItem(CREDIT_KEY) ?? STARTING_CREDIT.toString());
    } catch {
        return STARTING_CREDIT;
    }
}

export default function CreditProvider({ children }: { children: ReactNode }) {
    const [credits, setCredits] = useState(loadCredit());

    useEffect(() => {
        try {
            localStorage.setItem(CREDIT_KEY, credits.toString());
        } catch {}
    }, [credits]);

    const value = useMemo(
        () => ({
            credits,
            setCredits,
        }),
        [credits]
    );

    return <CreditContext value={value}>{children}</CreditContext>;
}
