import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

interface ContextCalculatorProps{
    calState: {
        discount: number
        total: number
    }
    calDispatch: React.Dispatch<{type: string; payload: object}>
}

export const ContextCalculator = createContext<ContextCalculatorProps>({} as ContextCalculatorProps)

const calReducer = (state, action) =>{        
    const findTotal = action?.payload?.cart?.reduce((total, item)=>total + item.price, 0)
    console.log(findTotal)
    switch(action.type){
        case 'Fixed amount':
            return {
                discount: findTotal,
                total: findTotal
            }
        case 'Percentage discount':
            return {
                discount: findTotal,
                total: findTotal
            }
        case 'Percentage discount by Item Category':
            return {
                discount: findTotal,
                total: findTotal
            }
        case 'Discount by points':
            return {
                discount: findTotal,
                total: findTotal
            }
        case 'Special campaigns':
            return {
                discount: findTotal,
                total: findTotal
            }
        default:
            return {
                discount: 0,
                total: 0
            }
    }
}

const CalInitialValue = {
    discount: 0,
    total: 0
}

export const CalculatorContext = ({children}: {children: React.JSX.Element | React.JSX.Element[]}) =>{
    const [calState, calDispatch] = useReducer(calReducer, CalInitialValue)
    useEffect(()=>{
        console.log(calState)
    }, [calState])
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