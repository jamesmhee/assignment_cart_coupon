import { GiClothes, GiPearlNecklace } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";

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

const Item = ({add, remove, items}) => {
  return (
    <div className="border border-zinc-100 p-3 flex-grow flex-shrink-0 rounded flex">
        <div className="flex-auto">
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
        <div className="flex flex-col gap-2 justify-center ml-5">
            <button className="bg-lime-600 rounded-md px-2 text-white" onClick={add} type="button">+</button>
            <button className="bg-rose-600 rounded-md px-2 text-white" onClick={remove} type="button">-</button>
        </div>
    </div>
  )
}

export default Item