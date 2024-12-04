import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ItemList from './ItemList'
import Tab from './Tab'
import Cart from './Cart'
import { useCalContext } from '../context/CalculatorContext'

interface DataProps {
    cart: Cart[]
    discount: string
  }
  
interface Cart {
    name: string
    price: number
    category: string
    total: number
}
  

const Home = () => {
    const { discountDispatch, campaigns, discountState, cartState } = useAppContext()
    const { calState, calDispatch } = useCalContext()
    const [data, setData] = useState<DataProps>({} as DataProps)
    const [tab, setTab] = useState('ItemsList')

    const handleTable = (tabName: string) =>{
        setTab(tabName)
    }

    const handleDispatch = () =>{
        const object = {
            ...cartState,
            discount: discountState.name,
            // totalDiscount: calState.discount,
            // total: calState.total
        }
        setData((prev)=>({...prev, ...object}))
        calDispatch({type: data.discount, payload: object})
    }
        
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value
        discountDispatch({type: type})
    }

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData((prev)=>({...prev, amount: Number(e.target.value)}))
        return e.target.value = e.target.value.replace(/[^0-9]/, '')        
    }
    
  return (
    <div className='w-full flex justify-center flex-col items-center max-w-screen-sm max-sm:mx-4'>
        <h4 className='rounded-t-lg bg-zinc-200 w-full h-full text-2xl text-center p-2 font-bold'>CART DISCOUNT CALCULATOR</h4>
        <div className='flex justify-between items-center flex-col text-xl bg-zinc-50 rounded-b-lg max-w-screen-sm w-full h-full p-5 gap-5'>
            <Tab handleTab={handleTable} tab={tab}/>
            <div className="w-full">        
                <div className="h-[450px] overflow-y-scroll overflow-x-hidden bg-zinc-200 w-full rounded-md flex flex-wrap justify-center p-4 gap-5">
                {tab === 'ItemsList' ? 
                    (
                        <ItemList/>                    
                    ):
                    (
                        <Cart/>
                    )
                }                    
                </div>
            </div>
            <div className='flex gap-2 flex-col'>
                <div className='flex gap-2'>
                    <label htmlFor="discount">Discount</label>
                    <select name="discount" onChange={(e)=>handleSelectChange(e)} className='border rounded w-full'>
                        {
                            campaigns?.map((elm,index)=>(
                                <option key={index} value={elm.name}>{elm.name}</option>
                            ))
                        }
                    </select>                                
                </div>
                <div className='flex gap-2'>
                    <label htmlFor="amount">Amount</label>
                    <input className="border rounded w-full" onChange={(e)=>handleAmount(e)} type="text" required/>
                </div>
            </div>
            <button onClick={handleDispatch}>Calculator</button>
        </div>
    </div>
  )
}

export default Home