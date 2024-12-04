import { useAppContext } from '../context/AppContext'
import ItemList from './ItemList'

const Home = () => {
    const { dispatch, campaigns } = useAppContext()
    const handleDispatch = () =>{
        
    }
        
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value
        dispatch({type: type})
    }

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) =>{
        return e.target.value = e.target.value.replace(/[^0-9]/, '')        
    }
    
  return (
    <div className='w-full flex justify-center flex-col items-center max-w-screen-sm'>
        <h4 className='rounded-t-lg bg-zinc-200 w-full h-full text-2xl text-center p-2'>CART DISCOUNT CALCULATOR</h4>
        <ItemList/>
        <div className='flex justify-between items-center flex-col text-xl bg-zinc-50 rounded-b-lg max-w-screen-sm w-full h-96 p-3'>
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
                    <input className="border rounded w-full" onChange={(e)=>handleAmount(e)} type="text" pattern="[0-9]"/>
                </div>
            </div>
            <button onClick={handleDispatch}>Calculator</button>
        </div>
    </div>
  )
}

export default Home