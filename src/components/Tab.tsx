interface TabProps{
    handleTab: (tabName: string)=>void;
    tab: string
}

const Tab = ({handleTab, tab}) => {
  return (
    <div className="flex w-full justify-between gap-3 h-10">
        <button onClick={()=>handleTab('ItemsList')} className={"w-full rounded-md " + (tab === 'ItemsList' ? 'bg-blue-500 text-white' : 'bg-zinc-200')} type="button">Items List</button>
        <button onClick={()=>handleTab('Cart')} className={"w-full rounded-md " + (tab === 'Cart' ? 'bg-blue-500 text-white' : 'bg-zinc-200')} type="button">Cart</button>
    </div>
  )
}

export default Tab