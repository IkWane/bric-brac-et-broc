type PageItem = number | 'gap-start' | 'gap-end';

/**
 * Pages to show: first … n-1 n n+1 … last.
 * A gap hiding a single page shows that page instead of '…'.
 */
export function pageItems(current: number, total: number): PageItem[] {
    if (total <= 1) return [1];

    const start = Math.max(1, current - 1);
    const end = Math.min(total, current + 1);
    const items: PageItem[] = [];

    if (start > 1) items.push(1);
    if (start === 3) items.push(2);
    else if (start > 3) items.push('gap-start');

    for (let p = start; p <= end; p++) items.push(p);

    if (end === total - 2) items.push(total - 1);
    else if (end < total - 2) items.push('gap-end');
    if (end < total) items.push(total);

    return items;
}
