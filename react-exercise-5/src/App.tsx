import { useState } from 'react'
import GarmentCollection from './components/GarmentCollection'
import { Collection, Garment } from './types'
import { garmentDataFactory } from './models/model'


interface AppState {
  collections: Collection[]
}

const INITIAL_STATE = garmentDataFactory(20, 15)

function App() {
  const [collections, setCollections] = useState<AppState["collections"]>(INITIAL_STATE)

  // If the App component increase its functionality, it should be taken into account
  // to manage it through a Reducer
  const handleCopyGarment = (targetIdCollections: Set<string>, garment: Garment) => {
    collections.forEach(collection => {
      if(targetIdCollections.has(collection.id) && !collection.garments.has(garment.id)) {
        collection.garments.set(garment.id, garment)
      }
    })

    setCollections(collections)

    let alertMessage = "Copied garment " + garment.id + ": " + garment.name + " into:\n"
    targetIdCollections.forEach((colId) => alertMessage += "- " + colId + "\n")

    alert(alertMessage)
  }

  return (
    <div className="App">
      <GarmentCollection 
        collections={collections}
        onCopyGarment={handleCopyGarment}
      />
      
    </div>
  )
}

export default App
