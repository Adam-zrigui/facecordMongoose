import {Contact} from '@/components/interfaces'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
interface ContactsContext {
    contacts: Contact[]
    filteredContacts: Contact[]
    filterKey: string
    setContacts: (contact: Contact[]) => void
    clearContacts: () => void
    addContact: (contact: Contact) => void
    updateContactValues: (contact: Contact) => void
    filterContacts: () => void
    setFilterKey: (key: string) => void 

}
const useContactsContext = create<ContactsContext>()(immer((set) =>({
    contacts: [],
    filteredContacts: [],
    filterKey:'',
    setContacts: (contacts) => {
      set((state) =>{
        state.contacts = contacts
      })
    },
    clearContacts: () => {
        set((state) => {
            state.contacts = []
        })
    },
    addContact:(contact) => {
       set((state) => {
        state.contacts.unshift(contact)
       })
    },
    updateContactValues: (updatedcontact) => {
        set((state) => {
           const cp = state.contacts.findIndex(contact => contact.id === updatedcontact.id) 
           if (cp === -1) return;
           state.contacts[cp] = updatedcontact
        })
    },
    filterContacts: () => {
        set((state)=> {
            let fil = state.contacts.filter((contact) => contact.username.includes(state.filterKey))
            if (!state.filterKey) fil = state.contacts
            state.filteredContacts = fil
        })
    },
    setFilterKey: (key : string) => {
        set((state) => {
            state.filterKey = key
        })
    },
})))
export default useContactsContext