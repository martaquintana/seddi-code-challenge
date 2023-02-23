import '../index.css'
import { useState } from 'react'
import { Garment } from '../types'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'



interface DialogState {
    collectionsClicked: Set<string>
}

interface Props {
    show: boolean,
    collectionIds: {name: string, id: string}[],
    garment: Garment,
    onCancelDialog: () => void
    onSaveDialog: (targetCollections: Set<string>, garment: Garment) => void
}

const CopyGarmentDialog = ((props: Props) => {
    const {show, collectionIds, garment, onCancelDialog, onSaveDialog} = props
    const [collectionsClicked, setCollectionsClicked] = useState<DialogState["collectionsClicked"]>(new Set<string>())

    const handleCloseDialog = () => onCancelDialog()

    const handleSaveDialog = () => {
        onSaveDialog(collectionsClicked, garment)
        handleCloseDialog()
    }

    const handleCheckboxClicked = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {checked, id} = ev.target

        if (checked) {
            collectionsClicked.add(id)
            document.getElementById(id)?.classList.add('active')
        } else {
            collectionsClicked.delete(id)
            document.getElementById(id)?.classList.remove('active')
        }
        setCollectionsClicked(collectionsClicked)
    }

    const listItem = (collectionName: string, index: string) => {
        return (
            <ListGroup.Item id={index} key={index} as="li" className="d-flex justify-content-between border-0">
                <div className="ms-2 me-auto">
                {collectionName}
                </div>
                <input className="custom-checkbox" type="checkbox" id={index} onChange={handleCheckboxClicked}/>
            </ListGroup.Item>            
        )
    }

    return (
        <Modal show={show} scrollable={true} centered>
            <Modal.Header>
                <Modal.Title className="w-100 text-center h5 text-muted">Copy to...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {listItem('New Collection', '0')}
                    <hr />
                    {
                        collectionIds.map((collection: {name:string, id: string}) => {
                            return (
                                listItem(collection.name, collection.id)
                            )
                        })
                    }
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDialog}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSaveDialog}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CopyGarmentDialog