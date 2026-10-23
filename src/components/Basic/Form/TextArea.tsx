import { useEffect, useId, useState, type ComponentProps, type SyntheticEvent } from 'react';
import FieldPanel, { type TapeLayout } from './FieldPanel';
import { controlClasses } from './formStyles';

type TextAreaProps = Omit<ComponentProps<'textarea'>, 'className'> & {
    label: string;
    hint?: string;
    resetError?: boolean;
    /** Defaults to tape folded over two opposite corners. */
    tape?: TapeLayout;
};

/** Multi-line input, taped on the diagonals by default. */
export default function TextArea({
    label,
    hint,
    resetError = false,
    tape = 'diagonal',
    id,
    name,
    rows = 4,
    ...props
}: TextAreaProps) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const [error, setError] = useState('');

    function onError(e: SyntheticEvent<HTMLTextAreaElement, Event>) {
        setError(e.currentTarget.validationMessage);
    }

    useEffect(() => {
        const set = async () => setError('');
        set();
    }, [resetError]);

    return (
        <FieldPanel id={fieldId} label={label} hint={hint} error={error} tape={tape} seed={name ?? fieldId}>
            <textarea
                {...props}
                id={fieldId}
                name={name}
                onError={onError}
                rows={rows}
                aria-invalid={error ? true : undefined}
                aria-describedby={error || hint ? `${fieldId}-message` : undefined}
                className={`min-h-24 resize-y leading-relaxed ${controlClasses}`}
            />
        </FieldPanel>
    );
}
