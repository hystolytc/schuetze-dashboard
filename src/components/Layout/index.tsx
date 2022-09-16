import { ReactNode } from "react"

interface Props {
  children?: ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => (
  <div className='w-screen h-screen bg-gray-100'>{children}</div>
)