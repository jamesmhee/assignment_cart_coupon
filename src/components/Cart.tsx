import { useMemo } from "react"
import { useAppContext } from "../context/AppContext"
import { findIcon } from "./Item"
import { useCalContext } from "../context/CalculatorContext"

const Cart = () => {
    const { cartState, discountState } = useAppContext()    
    const { calState } = useCalContext()
    const totalPrice = useMemo(()=>{
        return cartState.cart.reduce((total, value)=> total + value.price, 0)
    }, [cartState.cart])

    const totalPiece = useMemo(()=>{
        return cartState.cart.reduce((total, value)=> total + value.total, 0)
    }, [cartState.cart])

  return (
    <div className="w-full">
        {cartState?.cart?.length <= 0  ? 
        (<>Cart Empty</>) : 
        (<div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-2">
            {cartState?.cart?.map((elm, index) => (
                <div key={`${elm.name}-${index}`} className="flex gap-3 items-center w-full">
                    <i className="rounded-full p-2 bg-blue-500 text-white">
                        {findIcon(elm.category)}
                    </i>
                    <div className="flex-auto font-bold">
                        {elm.name}
                    </div>
                    <div>
                        <span className="font-bold">Total Price: </span>
                        <span>{elm.price}</span>
                    </div>
                    <div>
                        <span className="font-bold">Piece: </span>
                        <span>{elm.total}</span>
                    </div>
                </div>
            ))}
            </div>
        <div className="bg-zinc-100 flex w-full justify-between items-center px-2 rounded">
            <div>
                Discount: {discountState.name}
            </div>
            <div className="flex gap-2 flex-col text-right">
                <span>Total Price: {totalPrice} THB</span>
                <span>Total Piece: {totalPiece} THB</span>         
                <span>Total Price After Discount: {calState.total} THB</span>
            </div>            
        </div>
        </div>)}
    </div>
  )
}

export default Cart