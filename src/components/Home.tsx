import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ItemList from './ItemList'
import Tab from './Tab'
import Cart from './Cart'
import { useCalContext } from '../context/CalculatorContext'

export interface DataProps {
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
    const { discountDispatch, campaigns, discountState, cartState, data, setData } = useAppContext()
    const { calDispatch } = useCalContext()    
    const [tab, setTab] = useState('ItemsList')
    const [isInput, setIsInput] = useState({
        first: false,
        second: false
    })
    const amountRef = useRef(null)

    const handleTable = (tabName: string) =>{
        setTab(tabName)
    }

    const sumObject = (e: React.FormEvent) =>{ 
        e.preventDefault()
        const object = {
            ...cartState,
            discount: discountState.name,            
        }
        setData((prev)=>({...prev, ...object}))
        if(cartState.cart.length > 0) setTab('Cart')
    }
        
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value        
        discountDispatch({type: type})        
    }

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(amountRef.current.value === 'Percentage discount'){
            if(Number(e.target.value) > 100){
                e.target.value = '100'
            }
        }        
        return e.target.value = e.target.value.replace(/[^0-9]/, '')        
    }

    const handleOnBlurEvery = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData((prev)=>({...prev, everyAmount: Number(e.target.value)}))
    }

    const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData((prev)=>({...prev, amount: Number(e.target.value)}))
    }

    const handleSelectChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData((prev)=>({...prev, categoryDiscount: e.target.value}))
    }

    const handleChange = () =>{        
        if(amountRef.current.value === 'Percentage discount by Item Category'){
            setIsInput({                
                first: true,
                second: false 
            })
        }else if(amountRef.current.value === 'Special campaigns'){
            setIsInput({                
                first: false,
                second: true 
            })
        }else{
            setIsInput({first: false, second: false})
        }
    }

    useEffect(()=>{        
        calDispatch({type: data.discount, payload: data})
    },[data])
    
    useEffect(()=>{
        if(amountRef.current){            
            amountRef.current.addEventListener('change', handleChange)
        }
        return () => {
            if (amountRef.current) {
                amountRef.current.removeEventListener("change", handleChange)
            }
        };
    }, [])    

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
            <form onSubmit={sumObject} className='flex justify-center flex-wrap gap-2'>
                <div className='flex gap-2 flex-col'>
                    <div className='flex gap-2'>
                        <label htmlFor="discount">Discount: </label>
                        <select ref={amountRef} name="discount" onChange={(e)=>handleSelectChange(e)} className='border rounded w-full' required>
                            {
                                campaigns?.map((elm,index)=>(
                                    <option key={index} defaultValue={elm.name}>{elm.name}</option>
                                ))
                            }
                        </select>                                
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor="amount" className='text-nowrap'>Discount Amount: </label>
                        <input className="border rounded w-full" placeholder="Discount Amount" onBlur={(e)=>handleOnBlur(e)} onChange={(e)=>handleAmount(e)} type="text" required/>                
                    </div>
                    <div className='flex gap-2'>
                        {         
                            isInput.first ? (
                                <>
                                    <label className='text-nowrap'>Category Discount: </label>
                                    <select name="category" onChange={(e)=>handleSelectChangeCategory(e)} className='border rounded w-full' required>
                                        <option defaultValue="" disabled selected>Select Category</option>
                                        {   
                                            cartState?.cart?.length >= 1 ?
                                            Array.from(new Set(cartState.cart.map(elm=>elm.category))).map((category,index)=>{                                            
                                                return (
                                                    <option key={index} defaultValue={category}>{category}</option>
                                                )
                                            }) : (<option defaultValue="" disabled selected>Please add item</option>)
                                        }
                                    </select>
                                </>
                            ): isInput.second ?
                            (
                                <>
                                    <label className='text-nowrap'>Every X Amount: </label>
                                    <input className="border rounded w-full" placeholder="Discount Amount" type="text" onBlur={(e)=>handleOnBlurEvery(e)} onChange={(e)=>handleAmount(e)} required/>
                                </>
                            ) : null
                        }                    
                    </div>
                </div>
                <button type="submit" className='border-2 border-zinc-300 rounded px-2 hover:bg-blue-500 hover:text-white'>Calculator</button>
            </form>
        </div>
    </div>
  )
}

export default Home