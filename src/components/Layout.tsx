import { AppContext } from "../context/AppContext"

interface LayoutProps {
    children: React.JSX.Element | React.JSX.Element[]
}

const Layout = ({children}:LayoutProps) => {
  return (
    <AppContext>
        <div className="flex justify-center items-center w-screen h-dvh max-h-dvh max-w-screen bg-zinc-100">
            {children}
        </div>
    </AppContext>
  )
}

export default Layout