import * as C from './styles'
import { GridItemType } from '../../Types/GridItemType'
import b7img from '../../svgs/b7.svg'
import { Items } from '../data/Items'

 type props={
   item: GridItemType,
   onClick: ()=> void
}

export const GridItem = ({item, onClick}: props) =>{
    return(
        <C.container 
        ShowBackground={(item.permanentShown || item.shown)}
        onClick={onClick}
        >
            {!item.permanentShown && !item.shown  &&
            <C.Icon src={b7img} alt="" opacity={.1}/>
            }

            {(item.permanentShown || item.shown) && item.item !== null  &&
            <C.Icon src={Items[item.item].icon}/>
            }
        </C.container>
    )
}