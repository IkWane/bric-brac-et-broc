import { useId, type ComponentProps } from 'react';
import FieldPanel, { type TapeLayout } from './FieldPanel';
import { controlClasses } from './formStyles';

export interface SelectOption {
    value: string;
    label: string;
}

type SelectProps = Omit<ComponentProps<'select'>, 'className' | 'children'> & {
    label: string;
    options: SelectOption[];
    /** Disabled first option shown until something is picked. */
    placeholder?: string;
    hint?: string;
    error?: string;
    /** Defaults to one strip of tape on the top edge. */
    tape?: TapeLayout;
};

/** Native dropdown (keeps keyboard and mobile pickers), taped on top by default. */
export default function Select({
    label,
    options,
    placeholder,
    hint,
    error,
    tape = 'top',
    id,
    name,
    value,
    defaultValue,
    ...props
}: SelectProps) {
    const autoId = useId();
    const fieldId = id ?? autoId;

    // Show the placeholder when the field is uncontrolled and has no default
    const initial = value === undefined && defaultValue === undefined && placeholder ? '' : defaultValue;

    return (
        <FieldPanel id={fieldId} label={label} hint={hint} error={error} tape={tape} seed={name ?? fieldId}>
            <div className="relative">
                <select
                    {...props}
                    id={fieldId}
                    name={name}
                    value={value}
                    defaultValue={initial}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error || hint ? `${fieldId}-message` : undefined}
                    className={`h-10 cursor-pointer appearance-none pr-10 font-bold uppercase ${controlClasses}`}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="square"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>
        </FieldPanel>
    );
}
