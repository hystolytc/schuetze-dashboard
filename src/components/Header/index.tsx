import { ReactNode } from "react"

interface Props {
  children?: ReactNode
}

export const Header: React.FC<Props> = ({ children }) => (
  <div className='px-4 w-screen h-[65px] flex items-center bg-white'>{children}</div>
)