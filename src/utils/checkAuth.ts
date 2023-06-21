import { LOCAL_STORAGE } from "./localStorage"

const checkAuth = (res: Response) => {
    if(res?.status === 401) {
        LOCAL_STORAGE.removeItem('cooldreamy-multichat-token')
        window.location.replace('/auth')
    } else {
        return res?.json()
    }
}

export default checkAuth;