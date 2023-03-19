import React from 'react'
import useAuthContext from '../context/authContext'
import useModalContext ,{ ModalsMap } from '../context/modalContext'
import useQueryParams from '../hooks/useQueryParams'
import Messages from '../UI/messages'
import Side from '../UI/Side'
import Modal from '../view/modals'
import AddContactModal from '../view/modals/AddContactModal'
import { ProfileModal } from '../view/modals/options/Profile'
const modalsMap: ModalsMap = {
  profile: <ProfileModal />,
  contact: <AddContactModal />,
};
export default function Home() {
const {isModalOpen , closeModal , currentModal} = useModalContext()
const Q = useQueryParams()
const conversationId = Q.get("conversationId")
return (
 <>
 <main>
      <div>
      <Side />
      </div>
      <div>
 {!conversationId ?
  <h2>please choose or create contact</h2>
  :<Messages />
  }
      </div>
    </main>
  {isModalOpen && currentModal && <Modal onModalClose={closeModal} Content={modalsMap[currentModal]} />}
  </>
  )
}
