import { useEffect, useId, useState, type ComponentProps, type SyntheticEvent } from 'react';
import FieldPanel, { type TapeLayout } from './FieldPanel';
import { controlClasses } from './formStyles';

type TextInputProps = Omit<ComponentProps<'input'>, 'className'> & {
    label: string;
    hint?: string;
    resetError?: boolean;
    /** Defaults to tape on both sides. */
    tape?: TapeLayout;
};

/** Single-line input, taped on both sides by default. */
export default function TextInput({
    label,
    hint,
    tape = 'sides',
    id,
    name,
    resetError = false,
    type = 'text',
    ...props
}: TextInputProps) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const [error, setError] = useState('');

    function onError(e: SyntheticEvent<HTMLInputElement, Event>) {
        setError(e.currentTarget.validationMessage);
    }

    useEffect(() => {
        const set = async () => setError('');
        set();
    }, [resetError]);

    return (
        <FieldPanel id={fieldId} label={label} hint={hint} error={error} tape={tape} seed={name ?? fieldId}>
            <input
                {...props}
                id={fieldId}
                onError={onError}
                onInvalid={onError}
                name={name}
                type={type}
                aria-invalid={error ? true : undefined}
                aria-describedby={error || hint ? `${fieldId}-message` : undefined}
                className={`h-10 ${controlClasses}`}
            />
        </FieldPanel>
    );
}
