import { useState, type SubmitEvent } from 'react';
import TextInput from '../../components/Basic/Form/TextInput';
import TextArea from '../../components/Basic/Form/TextArea';
import Select from '../../components/Basic/Form/Select';
import Tape from '../../components/Basic/Tape';
import { ECategory } from '../../types/Categories';
import { postProduct, productFromForm } from '../../api/products';
import Tag from '../../components/Basic/Tag';

const categoryOptions = Object.values(ECategory).map((name) => ({ value: name, label: name }));

function BoxDepot() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
    const [resetError, setResetError] = useState(false);

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('sending');
        try {
            const created = await postProduct(productFromForm(new FormData(form)));
            console.log('Taped to the bin:', created);
            form.reset();
            setStatus('done');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    }

    function handleSubmitClick() {
        setResetError(!resetError);
    }

    return (
        <main className="flex-1 px-4 py-8 text-left sm:px-6 m-auto">
            <header className="max-w-2xl">
                <h1 className="m-0! text-3xl! font-bold uppercase tracking-tight! text-stone-900 sm:text-4xl!">
                    Tape &amp; list an item
                </h1>
                <p className="mt-2 text-sm text-stone-700">
                    Got something to sell without too many questions ? Stick it in the bargain bin today ! No refunds or
                    warranties, a scrapper's haven for selling stolen or salvaged goods !
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-10 max-w-4xl">
                {/* The item */}
                <fieldset className="m-0 border-0 p-0">
                    <legend className="mb-6 bg-amber-200/70 px-2 py-1 text-xs font-bold uppercase tracking-wider text-stone-800">
                        The item
                    </legend>

                    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <TextInput
                                resetError={resetError}
                                name="title"
                                label="What is it?"
                                placeholder="Banana, Car, tesla coil, literal dirt, bilboquet..."
                                maxLength={80}
                                required
                            />
                        </div>

                        <Select
                            resetError={resetError}
                            name="category"
                            label="Category"
                            placeholder="Pick a shelf"
                            options={categoryOptions}
                            required
                        />

                        <TextInput
                            resetError={resetError}
                            name="time"
                            label="Shipping Time (Days)"
                            placeholder="1"
                            type="number"
                            min={0}
                            required
                        />

                        <div className="md:col-span-2">
                            <TextArea
                                resetError={resetError}
                                name="description"
                                label="Description"
                                placeholder="Greatest product you've ever bought ! No scams !!1!11!1!"
                                hint="Be as dishonest as you want, we're not your mom..."
                                rows={5}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                resetError={resetError}
                                name="tags"
                                label="Tags"
                                placeholder="vintage, metal, loud"
                                hint="Separate tags with commas."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                resetError={resetError}
                                name="thumbnail"
                                type="url"
                                label="Photo link"
                                placeholder="https://…"
                                hint="A bench photo works best: plain background, good light."
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Price & shipping */}
                <fieldset className="m-0 mt-12 border-0 p-0">
                    <legend className="mb-6 bg-sky-200/70 px-2 py-1 text-xs font-bold uppercase tracking-wider text-stone-800">
                        Price &amp; shipping
                    </legend>

                    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                        <TextInput
                            resetError={resetError}
                            name="price"
                            type="number"
                            inputMode="decimal"
                            label="Price ($)"
                            placeholder="3.75"
                            min={0.25}
                            step={0.05}
                            hint="Less than market value if you want to actually sell"
                            required
                        />

                        <TextInput
                            resetError={resetError}
                            name="stock"
                            type="number"
                            inputMode="numeric"
                            label="How many?"
                            defaultValue={1}
                            min={1}
                            step={1}
                            required
                        />
                    </div>
                </fieldset>

                {/* Actions */}
                <div className="relative mt-14 flex flex-col-reverse items-stretch gap-4 bg-[#F1E6DF] p-5 shadow-[0_10px_24px_-8px_rgba(60,40,20,0.3)] sm:flex-row sm:items-center sm:justify-between">
                    <Tape className="-top-2 left-8 -rotate-3" />
                    <Tape tone="blue" className="-top-2 right-8 rotate-2" />

                    <button
                        type="reset"
                        className="px-4 py-2 text-xs font-bold uppercase text-stone-700 hover:underline focus-visible:outline-2 focus-visible:outline-orange-700"
                    >
                        Start over
                    </button>

                    <Tag seed="done!" label="Done" size="lg" hidden={status !== 'done'} />
                    <Tag seed="error" label="Error" size="lg" hidden={status !== 'error'} />

                    <button
                        type="submit"
                        onClick={handleSubmitClick}
                        disabled={status === 'sending'}
                        className="relative flex items-center justify-center gap-3 bg-orange-800 px-8 py-4 text-lg font-bold uppercase tracking-wider text-white shadow-[0_6px_14px_-6px_rgba(60,40,20,0.4)] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
                    >
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        >
                            <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3z" />
                            <path d="M3 7.5 12 12l9-4.5M12 12v9" />
                        </svg>
                        Tape it to the bin
                    </button>
                </div>
            </form>
        </main>
    );
}

export default BoxDepot;
