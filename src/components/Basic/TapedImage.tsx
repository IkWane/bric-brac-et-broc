import type { CSSProperties } from "react";
import { tilt } from "../../utils/tilt";
import Tape from "./Tape";

export default function TapedImage({ seed, image, alt}: { seed: string, image:string, alt: string}) {
    return ( 
        <figure
            style={{ '--tilt': `${tilt(`${seed}-photo`, 0.8)}deg` } as CSSProperties}
            className="relative mx-auto max-w-2xl rotate-(--tilt) bg-white p-3 shadow-md sm:p-4"
        >
            <Tape className="-left-5 -top-2 -rotate-12" />
            <Tape className="-right-5 -top-1 rotate-10" />
            <Tape tone="blue" className="-bottom-2 -left-5 rotate-4" />
            <Tape className="-bottom-3 -right-4 -rotate-6" />

            <div className="relative aspect-3/2 overflow-hidden bg-stone-200">
                <img src={image} alt={alt} className="h-full w-full object-contain" />
            </div>
        </figure>
     );
}