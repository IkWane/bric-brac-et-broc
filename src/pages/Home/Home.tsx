import BargainBin from '../../components/BargainBin/BargainBin'

/** A strip of translucent packing tape. Position and angle come from className. */
function Tape({ className = '' }: { className?: string }) {
    return (
        <span
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 h-7 w-24 bg-sky-200/60 shadow-sm backdrop-blur-[1px] ${className}`}
        />
    )
}

export default function Home() {
    return (
        <main className="flex-1">
            {/* Taped hero */}
            <section className="px-4 pt-8 sm:px-6">
                <div className="relative">
                    <Tape className="-left-3 -top-3 rotate-[-8deg]" />
                    <Tape className="-right-4 -top-2 rotate-24" />
                    <Tape className="-bottom-3 -right-4 rotate-[-16deg]" />

                    <div className="bg-[#F5EAE3] px-6 py-10 text-left shadow-[0_10px_24px_-8px_rgba(60,40,20,0.3)] sm:px-10 sm:py-12">
                        <span className="inline-flex items-center gap-2 bg-stone-200/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-700">
                            <span className="h-2 w-2 rounded-full bg-orange-700" />
                            Probably not stolen
                        </span>

                        <h1 className="mb-5! mt-6! text-4xl! font-bold uppercase leading-tight! tracking-tight! text-stone-900 sm:text-5xl!">
                            Random crap,
                            <br />
                            <span className="inline-block rotate-[-0.6deg] bg-red-100 px-2">
                                <span className="text-orange-800">Packed in sturdy</span> cardboard.
                            </span>
                        </h1>

                        <p className="max-w-xl text-sm leading-relaxed text-stone-700 sm:text-base">
                            Discover unpredictable $0.25-$5 objects, or stock up on warehouse-grade recycled
                            shipping cartons. Every parcel taped with extreme, unapologetic thriftiness
                            by definitely not shifty individuals!
                        </p>
                    </div>
                </div>
            </section>

            <BargainBin />
        </main>
    )
}