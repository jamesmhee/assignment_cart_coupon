import { useAppContext } from "../context/AppContext"
import { findIcon } from "./Item"

const Cart = () => {
    const { cartState } = useAppContext()    
  return (
    <div className="w-full">
        {cartState?.cart?.length <= 0  ? 
        (<>Cart Empty</>) : 
        (<>
        {cartState?.cart?.map((elm, index)=>(
            <div key={index} className="flex gap-3 items-center justify-between w-full">
                {findIcon(elm.category)}
                <div className="flex-auto">
                    {elm.name}
                </div>
                <div>
                    {elm.price}
                </div>
                <div>
                    {elm.total}
                </div>
            </div>
        ))}
        </>)}
    </div>
  )
}

export default Cart