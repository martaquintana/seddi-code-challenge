import '../index.css'
import { useState } from 'react'
import GarmentCell from './GarmentCell'
import CopyGarmentDialog from './CopyGarmentDialog'
import { Collection, Garment } from '../types'

interface Props {
  collections: Collection[],
  onCopyGarment: (targetIdCollections: Set<string>, garment: Garment) => void
}

interface GarmentCollectionState {
  showDialog: boolean,
  selectedGarment: Garment
}

const GarmentCollection = ((props: Props) => {
  const {collections, onCopyGarment} = props
  const [showDialog, setShowDialog] = useState<GarmentCollectionState["showDialog"]>(false)
  const [selectedGarment, setSelectedGarment] = useState<GarmentCollectionState["selectedGarment"]>()

  // We only need to pass the name and ids of the collections
  const collectionsIds: {name: string, id: string}[] = collections.map((c: Collection) => {
    return {name: c.name, id: c.id}
  })

  const handleOpenDialog = (garment: Garment) => {
    setShowDialog(true)
    setSelectedGarment(garment)
  }

  const handleCloseDialog = () => setShowDialog(false)

  return (
    <div>
    <div className="grid">
    {
      Array.from(collections[0]["garments"].values()).map(
        garment => {
        return (
          <div key={garment.id}>
              <GarmentCell 
                garment={garment}
                collectionName={collections[0].name}
                onContextMenu={handleOpenDialog}
              />
          </div>
        )
      })
    }
    </div>
    <CopyGarmentDialog
      garment={selectedGarment as Garment}
      show={showDialog}
      collectionIds={collectionsIds}
      onCancelDialog={handleCloseDialog}
      onSaveDialog={onCopyGarment}
    />
    </div>
    
  )
})

export default GarmentCollection