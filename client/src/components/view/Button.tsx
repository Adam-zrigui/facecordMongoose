import React from 'react'
interface B {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset'
}
export const Button: React.FC<B> = ({children , onClick , type}) => {
  return (
    <button type={type || 'submit'} onClick={onClick}>{children}</button>
  )
}
