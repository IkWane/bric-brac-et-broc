import { createContext, useContext } from 'react';

export interface CreditContextValue {
    credits: number;
    setCredits(n: number): void;
}

export const CreditContext = createContext<CreditContextValue | null>(null);

export function useCredit() {
    const credit = useContext(CreditContext);
    if (!credit) throw new Error('useCredit must be used inside <CreditProvider>');
    return credit;
}
