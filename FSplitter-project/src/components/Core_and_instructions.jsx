import Core from "./Core"
import Instructions from "./Insructions"

function Core_and_instructions() {
    return (
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
                <Core />
            </div>
            <div>
                <Instructions />
            </div>
        </div>
    )
}

export default Core_and_instructions