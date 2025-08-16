import { BrainIcon } from "./icons"


export const Logo = () => {
    return (
        <div className="flex flex-row gap-1 items-center text-on-secondary">
            <BrainIcon size="lg"/>
            <h2 className="font-semibold text-xl">Brainly</h2>
        </div>
    )
}