import { AppContext } from "../context/AppContext"
import { CalculatorContext } from "../context/CalculatorContext"

interface LayoutProps {
    children: React.JSX.Element | React.JSX.Element[]
}

const Layout = ({children}:LayoutProps) => {
  return (
    <AppContext>
        <CalculatorContext>
        <div className="flex justify-center items-center w-screen h-dvh max-h-dvh max-w-screen bg-zinc-100">
            {children}
        </div>
        </CalculatorContext>
    </AppContext>
  )
}

export default Layout