import { createContext, SetStateAction, useContext, useMemo, useReducer, useState } from "react"
import DiscountCategory from "../data/category.json"

interface ContextAppProps {    
    items: {
        name: string
        price: number
        category: string
    }[]
    setItems: React.Dispatch<SetStateAction<ContextAppProps['items']>>
    data: DataProps
    setData: React.Dispatch<SetStateAction<DataProps>>
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

interface DiscountState {
    name: string
}

type DiscountAction = 
    | { type: 'Fixed amount' }
    | { type: 'Percentage discount' }
    | { type: 'Percentage discount by Item Category' }
    | { type: 'Discount by points' }
    | { type: 'Special campaigns' }
    | { type: 'DEFAULT' };

export interface CartItem {
    name: string;
    price: number;
    total: number;
    category: string;
}

export interface CartState {
    cart: CartItem[]
}

type CartActionType = 
    | {type: 'ADD', payload:CartItem}
    | {type: 'REMOVE', payload:CartItem}

export interface DataProps {
        cart: Cart[]
        discount: string
        amount: number
    }
    
interface Cart {
    name: string
    price: number
    category: string
    total: number
}    

const ContextApp = createContext<ContextAppProps>({} as ContextAppProps)

const reducer = (state: DiscountState, action: DiscountAction) =>{    
    switch(action.type){
        case action.type:
            return {
                name: action.type
            }        
        default:
            return {
                name: ''
            }
    }
}

const cartReducer = (state: CartState, action: CartActionType) => {        
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
    const [data, setData] = useState<DataProps>({} as DataProps)
    const [campaigns, setCampaigns] = useState<ContextAppProps['campaigns']>(DiscountCategory.campaigns as ContextAppProps['campaigns'])
    const [discountState, discountDispatch] = useReducer(reducer, DiscountInitialValues)
    const [cartState, cartDispatch] = useReducer(cartReducer, CartInitialValues)    
    const store = useMemo(()=>({        
        items,
        setItems,
        data,
        setData,
        discountState,
        discountDispatch,
        campaigns,
        setCampaigns,
        cartState,
        cartDispatch
    }), [        
        items,
        data,
        discountState,    
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