import { GiClothes, GiPearlNecklace } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";
import { useMemo } from "react";

interface ItemsProps {
    add: ()=>void
    remove: ()=>void
    items: {
        name: string
        price: number
        category: string
    }
}

export const findIcon = (category: string) =>{
    switch(category){
        case 'Clothing':
            return <GiClothes/>
        case 'Accessories':
            return <GiPearlNecklace/>
        default:
            return <FaComputer/>
    }
}

const Item = ({add, remove, items}: ItemsProps) => {
    const { cartState } = useAppContext()
    const totalPiece = useMemo(()=>{
        return cartState.cart.find((elm)=>elm.name === items.name)?.total
    }, [cartState.cart])
  return (
    <div className="border border-zinc-100 p-3 flex-grow flex-shrink-0 justify-between rounded flex">
        <div className="flex-shrink-0">
            <p className="text-2xl font-semibold">
                {items.name}
            </p>
            <div className="flex gap-2 items-center">
                <p>Category: </p>
                <i className="text-2xl">
                    {findIcon(items.category)}
                </i>
            </div>
            <div>
                Price: {items.price}                    
            </div>
        </div>
        <div className="flex flex-col gap-2 justify-center w-32 max-sm:w-auto flex-shrink basis-1">
            <button className="bg-lime-600 rounded-md px-2 text-white w-full" onClick={add} type="button">+</button>
            <button className="bg-rose-600 rounded-md px-2 text-white w-full" onClick={remove} type="button">-</button>
            <p className="text-center">
                {totalPiece ? totalPiece : 0} Piece
            </p>
        </div>        
    </div>
  )
}

export default Item