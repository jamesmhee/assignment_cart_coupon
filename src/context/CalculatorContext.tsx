import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { DataProps } from "../components/Home";
import { CartItem } from "./AppContext";

interface ContextCalculatorProps{
    calState: {
        discount: number
        total: number
    }
    calDispatch: React.Dispatch<{type: string; payload: DataProps}>
}

type ActionType = 
| 'Fixed Amount'
| 'Percentage discount'
| 'Percentage discount by Item Category'
| 'Discount by points'
| 'Special campaigns'
| 'DEFAULT'

interface CalState {
    discount: number
    total: number
}

interface CalPayloadProps{
    cart: CartItem[]
    discount: string
    amount: number
    categoryDiscount?: string
    everyAmount?: number
}

interface ActionProps {
    type: ActionType
    payload: CalPayloadProps
}

export const ContextCalculator = createContext<ContextCalculatorProps>({} as ContextCalculatorProps)

const calReducer = (state: CalState, action: ActionProps) =>{         
    const findTotal = action?.payload?.cart?.reduce((total, item)=>total + item.price, 0)    
    let discount = action?.payload?.amount > 100 ? 100 : action?.payload?.amount
    const percent = (findTotal * discount) / 100

    switch(action.type){
        case 'Fixed Amount':            
            return {
                ...state,
                discount: findTotal,
                total: findTotal - action?.payload?.amount
            }
        case 'Percentage discount':            
            return {
                ...state,
                discount: findTotal,
                total: findTotal - percent
            }
        case 'Percentage discount by Item Category':            
            const category = action?.payload?.categoryDiscount                        
            const findTotalCategory = action?.payload?.cart?.filter(elm=>elm.category === category)
            .reduce((total, item)=>total + item.price, 0)
            const percentCategory = (findTotalCategory * discount) / 100            
            return {
                ...state,
                discount: findTotal,
                total: findTotal - percentCategory
            }
        case 'Discount by points':
            const findTwentyPercent = (findTotal * 20)/100
            let totalDiscount = action?.payload?.amount > findTwentyPercent ? findTwentyPercent : action?.payload?.amount            
            return {
                ...state,
                discount: findTotal,
                total: findTotal - totalDiscount
            }
        case 'Special campaigns':
            const findDiscountEvery = Math.floor(findTotal / action?.payload?.everyAmount)
            discount = action?.payload?.amount * findDiscountEvery
            return {
                ...state,
                discount: findTotal,
                total: findTotal - discount
            }
        default:
            return {
                ...state,
            }
    }
}

const CalInitialValue = {
    discount: 0,
    total: 0
}

export const CalculatorContext = ({children}: {children: React.JSX.Element | React.JSX.Element[]}) =>{    
    const [calState, calDispatch] = useReducer(calReducer, CalInitialValue)    
    const store = useMemo(()=>({
        calState,
        calDispatch
    }), [calState])

    return (
        <ContextCalculator.Provider value={store}>
            {children}
        </ContextCalculator.Provider>
    )
}

export const useCalContext = () =>{
    const context = useContext(ContextCalculator)
    if(!context) throw new Error("error")
    return context
}