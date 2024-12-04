import { useAppContext } from "../context/AppContext"

const ItemList = () => {
    const { cartState, cartDispatch, state } = useAppContext()

    const handleAddCart = () =>{
        cartDispatch({type: 'ADD', payload: {
           name: 'Bags',
           price: 250,
           total: 1,
           category: 'Clothing'
        }})
    }

    const handleRemoveCart = () =>{
        cartDispatch({
            type: 'REMOVE',
            payload: {
                name: 'Bags',
                price: 250,
                total: 1,                
            }
        })
    }

  return (
    <div>
        Your Cart
        {JSON.stringify({cartState, ...state})}        
        <br></br>
        <button onClick={handleAddCart}>ADD</button>        
        <button onClick={handleRemoveCart}>REMOVE</button>
    </div>
  )
}

export default ItemList