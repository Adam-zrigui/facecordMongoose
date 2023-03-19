import { io , Socket } from 'socket.io-client'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { getItemFromLocalStorage } from '../utils/localS'

interface sc {
    socket : Socket
}
const useSocketContext = create<sc>()(

devtools    (    immer((set, get) => ({
        socket: io("http://localhost:5500", {
            withCredentials: true,
            query: {
                userId: getItemFromLocalStorage('user')?.id
            }
        })
 
    })
    )
    ,{name: "socketContext"}
    )
)
export default useSocketContext;