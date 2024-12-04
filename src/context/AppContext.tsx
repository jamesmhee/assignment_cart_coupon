import { createContext, SetStateAction, useContext, useMemo, useReducer, useState } from "react"
import DiscountCategory from "../data/category.json"
import { CalculatorContext } from "./CalculatorContext"

interface ContextAppProps {    
    items: {
        name: string
        price: number
        category: string
    }[]
    setItems: React.Dispatch<SetStateAction<ContextAppProps['items']>>
    discountState: {        
        name: string
    } 
    discountDispatch: React.Dispatch<{type: string}>
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
    setCampaigns: React.Dispatch<SetStateAction<ContextAppProps['campaigns']>>
    cartState: {
        cart: {
            name: string
            price: number
            total: number
            category: string
        }[]   
    } 
    cartDispatch: React.Dispatch<{type: string, payload: {name: string; price: number; category: string}}>
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
    console.log(state,'s')    
    switch(action.type){
        case 'ADD':
            if(state?.cart?.some((elm)=> elm.name === action.payload.name)){
                return {
                    cart: state?.cart?.map((item)=>{                        
                        return item.name === action.payload.name ? {
                            ...item,
                            price: item.price + action.payload.price,
                            total: item.total + 1
                        } : item
                    })
                }
            }else{                            
                return {  
                    ...state,                  
                    cart: [
                        ...state.cart, {...action.payload, total: 1}
                    ]
                }            
            }            
        case 'REMOVE':            
            const updateState = state.cart.map((item)=>
                item.name === action.payload.name ? {
                    ...item,
                    price: item.price - action.payload.price,
                    total: item.total - 1
                } : item).filter(item => item.total > 0)
                        
            return {
                ...state,
                cart: updateState
            }                                       
        default:
            return {...state}
    }
}

const DiscountInitialValues = {        
    name: 'Fixed Amount'
}

const CartInitialValues:ContextAppProps['cartState'] = {    
    cart: []
}

export const AppContext = ({children}: {children: React.JSX.Element | React.JSX.Element[]}) => {    
    const [items, setItems] = useState(DiscountCategory.items)
    const [campaigns, setCampaigns] = useState<ContextAppProps['campaigns']>(DiscountCategory.campaigns as ContextAppProps['campaigns'])
    const [discountState, discountDispatch] = useReducer(reducer, DiscountInitialValues)
    const [cartState, cartDispatch] = useReducer(cartReducer, CartInitialValues)    
    const store = useMemo(()=>({        
        items,
        setItems,
        discountState,
        discountDispatch,
        campaigns,
        setCampaigns,
        cartState,
        cartDispatch
    }), [        
        items,
        discountState,    
        campaigns,
        cartState,
    ])
  return (
    <ContextApp.Provider value={store}>
        <CalculatorContext>
            {children}
        </CalculatorContext>
    </ContextApp.Provider>
  )
}

export const useAppContext = () =>{
    const context = useContext(ContextApp)
    if(!context) throw new Error("Error")
    return context
}