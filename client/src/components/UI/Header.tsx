import React, { useCallback, useState } from 'react'
import {RiMenu3Fill} from 'react-icons/ri'
import useAuthContext from '../context/authContext'
import {BiSearch} from 'react-icons/bi'
import { Dropdown } from './Dropdown'
import useModalContext from '../context/modalContext'
import useContactsContext from '../context/ContactContext'
import useSocketContext from '../context/socketContext'
import useConversationContext from '../context/conversationContext'
export  function Header() {
    const AC = useAuthContext()
    const [isMenuV , setV] = useState(false)
    const {openModal} = useModalContext();
    const {setFilterKey} = useContactsContext()
    const {socket} = useSocketContext();
    const {resetConversationState} = useConversationContext();
    const onFilter = useCallback((e : React.ChangeEvent<HTMLInputElement>) =>{
 setFilterKey(e.target.value)
    }, [])
  
    const toggleMenu = useCallback(() => {
        setV((prev) => !prev);
      }, []);
      const menuItems = [
        {
          label: "My Profile",
          onClick: () => openModal("profile"),
        },
        {
          label: "Add Contact",
          onClick: () => openModal("contact"),
        },
        {
          label: "Logout",
          onClick: () => {
           socket.emit("logout", AC.user?.id);
            AC.logout();
            window.localStorage.clear();
            resetConversationState();
          },
        },
      ];
  return (
    <div>
        <div>
            <h2>Contact</h2>
                  <RiMenu3Fill onClick={toggleMenu} size={22} />
     {isMenuV && <Dropdown menuItems={menuItems} isOpen={isMenuV} />}
        </div>
<div>
    <BiSearch />
    <input type="text" onChange={onFilter}/>
</div>
    </div>
  )
}
