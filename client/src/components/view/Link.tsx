import React from 'react'
import { Link } from 'react-router-dom';
interface RLP{
    href: string;
    children: React.ReactNode
}
export const Links : React.FC<RLP>= ({href , children}) => {
  return (
    <Link to={href}>{children}</Link>
  )
}
