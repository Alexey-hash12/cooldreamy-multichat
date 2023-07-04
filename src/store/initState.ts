import { PusherPrivateChannel } from "laravel-echo/dist/channel";
const LOCAL_STORAGE = window.localStorage;



interface IStore {
    token: string | null,
    adminId: number | string | null,
    socketChanel: PusherPrivateChannel | null,
    newChatMessage: any,
    newMailMessage: any,
    newInbox: any,
    deleteInbox: any,
}

const initState: IStore = {
    token: LOCAL_STORAGE.getItem('cooldreamy-multichat-token') ? LOCAL_STORAGE.getItem('cooldreamy-multichat-token') : null,
    adminId: null,
    socketChanel: null,
    newChatMessage: null,
    newMailMessage: null,
    newInbox: null,
    deleteInbox: null
}

export default initState;