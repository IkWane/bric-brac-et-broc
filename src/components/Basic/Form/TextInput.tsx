import { useId, type ComponentProps } from 'react';
import FieldPanel, { type TapeLayout } from './FieldPanel';
import { controlClasses } from './formStyles';

type TextInputProps = Omit<ComponentProps<'input'>, 'className'> & {
    label: string;
    hint?: string;
    error?: string;
    /** Defaults to tape on both sides. */
    tape?: TapeLayout;
};

/** Single-line input, taped on both sides by default. */
export default function TextInput({
    label,
    hint,
    error,
    tape = 'sides',
    id,
    name,
    type = 'text',
    ...props
}: TextInputProps) {
    const autoId = useId();
    const fieldId = id ?? autoId;

    return (
        <FieldPanel id={fieldId} label={label} hint={hint} error={error} tape={tape} seed={name ?? fieldId}>
            <input
                {...props}
                id={fieldId}
                name={name}
                type={type}
                aria-invalid={error ? true : undefined}
                aria-describedby={error || hint ? `${fieldId}-message` : undefined}
                className={`h-10 ${controlClasses}`}
            />
        </FieldPanel>
    );
}
