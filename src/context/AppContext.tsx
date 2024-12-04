import { createContext, SetStateAction, useContext, useMemo, useReducer, useState } from "react"
import DiscountCategory from "../data/category.json"

interface ContextAppProps {
    cart: unknown[]
    setCart: React.Dispatch<SetStateAction<unknown[]>>
    items: {
        name: string
        price: number
        category: string
    }[]
    setItems: React.Dispatch<SetStateAction<{
        name: string
        price: number
        category: string
    }[]>>
    state: {        
        name: string
    } 
    dispatch: React.Dispatch<unknown>
    campaigns: {
        name: 
        | 'Fixed amount' 
        | 'Percentage discount' 
        | 'Percentage discount by Item Category' 
        | 'Discount by points'
        | 'Special campaigns';
        type: 
        | 'Clothing'
        | 'Accessories'
        | 'Electronics';
    }[]
    setCampaigns: React.Dispatch<SetStateAction<{
        name: 
        | 'Fixed amount' 
        | 'Percentage discount' 
        | 'Percentage discount by Item Category' 
        | 'Discount by points'
        | 'Special campaigns';
        type: 
        | 'Clothing'
        | 'Accessories'
        | 'Electronics';
    }[]>>
    cartState: {
        cart: unknown[]   
    } 
    cartDispatch: React.Dispatch<unknown>
}

const ContextApp = createContext<ContextAppProps>({} as ContextAppProps)

const reducer = (state, action) =>{    
    switch(action.type){
        case 'Fixed amount':
            return {
                name: 'Fixed amount'
            }
        case 'Percentage discount':
            return {
                name: 'Percentage discount'
            }
        case 'Percentage discount by Item Category':
            return {
                name: 'Percentage discount by Item Category'
            }
        case 'Discount by points':
            return {
                name: 'Discount by points'
            }
        case 'Special campaigns':
            return {
                name: 'Special campaigns'
            }
        default:
            return {
                name: ''
            }
    }
}

const cartReducer = (state, action) => {        
    switch(action.type){
        case 'ADD':
            if(state.cart.some((elm)=> elm.name === action.payload.name)){
                return {                    
                    cart: state.cart.map((item)=>{
                        return item.name === action.payload.name ? {
                            ...item,
                            price: item.price += action.payload.price,
                            total: item.total + 1
                        } : item
                    })
                }
            }else{                            
                return {                    
                    cart: [
                        ...state.cart, action.payload
                    ]
                }            
            }            
        case 'REMOVE':            
            if(state.cart.some((elm)=> elm.name === action.payload.name && elm.total >= 1)){                
                return {                    
                    cart: state.cart.map((item)=>{
                        return item.name === action.payload.name ? {
                            ...item,
                            price: item.price -= action.payload.price,
                            total: item.total - 1
                        } : item
                    })
                }
            }else{
                return {...state}
            }
        default:
            return {...state}
    }
}

const DiscountInitialValues = {    
    name: 'Fixed Amount'
}

const CartInitialValues = {
    cart: []
}

export const AppContext = ({children}: {children: React.JSX.Element | React.JSX.Element[]}) => {
    const [cart, setCart] = useState([])    
    const [items, setItems] = useState(DiscountCategory.items)
    const [campaigns, setCampaigns] = useState<ContextAppProps['campaigns']>(DiscountCategory.campaigns as ContextAppProps['campaigns'])
    const [state, dispatch] = useReducer(reducer, DiscountInitialValues)
    const [cartState, cartDispatch] = useReducer(cartReducer, CartInitialValues)    
    const store = useMemo(()=>({
        cart,
        setCart,
        items,
        setItems,
        state,
        dispatch,
        campaigns,
        setCampaigns,
        cartState,
        cartDispatch
    }), [
        cart,        
        items,
        state,    
        campaigns,
        cartState,
    ])
  return (
    <ContextApp.Provider value={store}>
        {children}
    </ContextApp.Provider>
  )
}

export const useAppContext = () =>{
    const context = useContext(ContextApp)
    if(!context) throw new Error("Error")
    return context
}