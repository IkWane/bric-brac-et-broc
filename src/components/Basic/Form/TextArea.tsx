import { useId, type ComponentProps } from 'react';
import FieldPanel, { type TapeLayout } from './FieldPanel';
import { controlClasses } from './formStyles';

type TextAreaProps = Omit<ComponentProps<'textarea'>, 'className'> & {
    label: string;
    hint?: string;
    error?: string;
    /** Defaults to tape folded over two opposite corners. */
    tape?: TapeLayout;
};

/** Multi-line input, taped on the diagonals by default. */
export default function TextArea({
    label,
    hint,
    error,
    tape = 'diagonal',
    id,
    name,
    rows = 4,
    ...props
}: TextAreaProps) {
    const autoId = useId();
    const fieldId = id ?? autoId;

    return (
        <FieldPanel id={fieldId} label={label} hint={hint} error={error} tape={tape} seed={name ?? fieldId}>
            <textarea
                {...props}
                id={fieldId}
                name={name}
                rows={rows}
                aria-invalid={error ? true : undefined}
                aria-describedby={error || hint ? `${fieldId}-message` : undefined}
                className={`min-h-24 resize-y leading-relaxed ${controlClasses}`}
            />
        </FieldPanel>
    );
}
