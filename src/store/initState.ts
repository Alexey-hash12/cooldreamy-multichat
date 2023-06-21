const LOCAL_STORAGE = window.localStorage;



interface IStore {
    token: string | null
}

const initState: IStore = {
    token: LOCAL_STORAGE.getItem('cooldreamy-multichat-token') ? LOCAL_STORAGE.getItem('cooldreamy-multichat-token') : null 
}

export default initState;