import { Collection, Garment } from "../types"
import { v4 as uuidv4} from 'uuid'

function randomAvatar() {
    const person: string = Math.random() > 0.5 ? "male" : "female"
    const index: string = Math.random() > 0.5 ? "" : "2"

    return "https://seddi.com/wp-content/uploads/team-avatar-" + person + index + "-600x450.jpg"
}

export function garmentDataFactory(nCollections: number, nGarments: number): Collection[] {   
    // It's known that the interface defined for the businnes models cannot be
    // the same for both models and components, but here, for the shake of simplicity
    // we're sharing them

    // The collections refer to the set of collections of a user that should perform enough
    // with a simple Array (used here for the shake of simplicity). In case the requirements
    // exposes that a larger number collection should be available, other ordered data structures 
    // like Map or Set should be considered

    const garments = new Map<string, Garment>()
    for (let i=0; i<nGarments; i+=1) {
        const id = "garment_" + uuidv4()
        garments.set(id, {
            id: id,
            name: "Garment_" + i,
            avatar: randomAvatar()
        })
    }

    return [...Array<Collection>(nCollections)].map((_, indexCollection): Collection => {
        return {
            id: "col_" + uuidv4(),
            name: "Collection " + indexCollection,
            garments: garments
        }
    })


}
