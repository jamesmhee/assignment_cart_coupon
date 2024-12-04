import { useAppContext } from "../context/AppContext"
import Item from "./Item"

interface ItemsListProps{    
    name: string
    price: number
    category: string    
}

const ItemList = () => {
    const { cartState, cartDispatch, items } = useAppContext()

    const handleAddCart = (elm:ItemsListProps) =>{
        cartDispatch({type: 'ADD', payload: elm})
    }

    const handleRemoveCart = (elm:ItemsListProps) =>{
        cartDispatch({type: 'REMOVE', payload: elm})
    }

  return (
    <>
        {items?.map((elm, index)=>(
            <Item add={()=>handleAddCart(elm)} remove={()=>handleRemoveCart(elm)} key={index} items={elm}/>
        ))}    
    </>
  )
}

export default ItemList