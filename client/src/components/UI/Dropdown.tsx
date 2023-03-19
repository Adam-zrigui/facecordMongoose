import React from 'react'
interface DDP {
    menuItems: MenuItem[];
    isOpen: boolean;
}
interface MenuItem {
    label: string;
    onClick: () => any
}
export const Dropdown : React.FC<DDP> =  ({menuItems}) => {
  return (
    <div>
        {menuItems.map(i =>(
           <div key={i.label} onClick={i.onClick}>
           {i.label}
           </div> 
        ))
        }
    </div>
  )
}
