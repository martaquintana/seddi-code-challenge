import '../index.css'
import { Garment } from '../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'



interface Props {
    garment: Garment,
    collectionName: string,
    onContextMenu: (garment: Garment) => void
}


const GarmentCell = ((props: Props) => {
    const {garment, collectionName, onContextMenu} = props

    const handleContextMenu = () => {
        onContextMenu(garment)
    }
    

    return (
        <div>
            <div className="card" key={garment.name}>
                <div className='img-container'>
                    <img className='card-img-top' src={garment.avatar} alt="The garment avatar"/>
                    <FontAwesomeIcon onClick={handleContextMenu} className="context-menu" icon={faChevronDown} />           
                </div>
                <div className="card-footer">
                    <p className="card-text">{garment.name}</p>
                    <p className="card-text"><small className="text-muted">{collectionName}</small></p>
                </div>
            </div>
        </div>
    )
})

export default GarmentCell