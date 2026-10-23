import Button from '../Basic/Button';
import { pageItems } from './pagination';

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pages" className="mt-14 flex flex-wrap items-center justify-center gap-2">
            <Button variant="page" aria-label="Previous page" disabled={page <= 1} onClick={() => onChange(page - 1)}>
                &lt;
            </Button>

            {pageItems(page, totalPages).map((item) =>
                typeof item === 'number' ? (
                    <Button
                        key={item}
                        variant="page"
                        aria-label={`Page ${item}`}
                        aria-current={item === page ? 'page' : undefined}
                        onClick={() => item !== page && onChange(item)}
                    >
                        {item}
                    </Button>
                ) : (
                    <span key={item} aria-hidden="true" className="px-1 font-bold text-stone-600">
                        …
                    </span>
                )
            )}

            <Button
                variant="page"
                aria-label="Next page"
                disabled={page >= totalPages}
                onClick={() => onChange(page + 1)}
            >
                &gt;
            </Button>
        </nav>
    );
}
