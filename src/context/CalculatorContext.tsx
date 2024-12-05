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

const calReducer = (state: CalState, action: ActionProps) => {       
    const findTotal = action?.payload?.cart?.reduce((total, item) => total + item.price, 0)
    const discount = Math.min(action?.payload?.amount, 100)
    const percent = (findTotal * discount) / 100

    const calculateTotal = (discountAmount: number) => {
        const total = findTotal - discountAmount
        return total <= 0 ? 0 : total
    };

    switch (action.type) {
        case 'Fixed Amount':
            return {
                ...state,
                discount: findTotal,
                total: calculateTotal(action?.payload?.amount),
            };
        case 'Percentage discount':
            return {
                ...state,
                discount: findTotal,
                total: findTotal - percent,
            };
        case 'Percentage discount by Item Category': {
            const category = action?.payload?.categoryDiscount;
            const findTotalCategory = action?.payload?.cart
                .filter((item) => item.category === category)
                .reduce((total, item) => total + item.price, 0);
            const percentDiscount = (findTotalCategory * discount) / 100;

            return {
                ...state,
                discount: findTotal,
                total: calculateTotal(percentDiscount),
            };
        }
        case 'Discount by points': {
            const findTwentyPercent = (findTotal * 20) / 100;
            const discountPoint = Math.min(action?.payload?.amount, findTwentyPercent);

            return {
                ...state,
                discount: findTotal,
                total: calculateTotal(discountPoint),
            };
        }
        case 'Special campaigns': {
            const findDiscountEvery = Math.floor(findTotal / action?.payload?.everyAmount);
            const discountSpecial = action?.payload?.amount * findDiscountEvery;

            return {
                ...state,
                discount: findTotal,
                total: calculateTotal(discountSpecial),
            };
        }
        default:
            return state;
    }
};


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