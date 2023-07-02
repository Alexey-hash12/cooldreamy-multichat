import endpoints, { API_PATH } from "./endpoints";
import checkAuth from "../utils/checkAuth";

export const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    // 'X-Localization': 'ru'
}


class ApiService {
    login = async (body: {
        email: string,
        password: string
    }) => {

        try {
            let res = await fetch(endpoints.login, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getChats = async (token: any, {
        page = 1,
        per_page = 10,
        search = ''
    }: {
        page: number,
        per_page: number,
        search?: string
    }) => {
        try {
            let res = await fetch(endpoints.getChats + `?page=${page}&per_page=${per_page}&search=${search}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }
    getMails = async (token: any, {
        page = 1,
        per_page = 10,
        search = ''
    }: {
        page: number,
        per_page: number,
        search?: string
    }) => {
        try {
            let res = await fetch(endpoints.getMails + `?page=${page}&per_page=${per_page}&search=${search}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    getMailDialog = async (token: any, {
        id,
        page = 1,
        per_page = 10
    }: {
        id: string | number,
        page: number,
        per_page: number 
    }) => {
        try {
            let res = await fetch(endpoints.getMailDialog + `/${id}?page=${page}&per_page=${per_page}`, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }



    getChatDialog = async (token: any, {
        id,
        page = 1,
        per_page = 10
    }: {
        id: string | number,
        page: number,
        per_page: number 
    }) => {
        try {
            let res = await fetch(endpoints.getChatDialog + `/${id}?page=${page}&per_page=${per_page}`, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    getInbox = async (token: any, {
        page = 1,
        per_page = 10,
        search = ''
    }: {
        page: number,
        per_page: number,
        search: string 
    }) => {
        try {
            let res = await fetch(endpoints.getInbox + `?page=${page}&per_page=${per_page}&search=${search}`, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    getMyProfile = async (token: any) => {
        try {
            let res = await fetch(endpoints.getMyProfile, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    // sendMailMessage = async (token: any, id: number | string, body: {text: string}) => {
    //     try {
    //         let res = await fetch(`${API_PATH}ope`)
    //     }
    // }


    sendChatMessage = async (token: any, id: number | string, body: {text: string}) => {
        try {
            let res = await fetch(`${API_PATH}operators/chats/${id}/send/message`, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    sendChatSticker = async (token:any, id: number | string, {sticker_id}: {sticker_id: number | string}) => {
        try {
            let res = await fetch(`${API_PATH}operators/chats/${id}/send/sticker/${sticker_id}`, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    getStickers = async (token: any) => {
        try {
            let res = await fetch(endpoints.getStickers, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    getGifts = async (token: any) => {
        try {
            let res = await fetch(endpoints.getGifts, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    sendChatGift = async (token:any, id: number | string, {gift_id}: {gift_id: number | string}) => {
        try {
            let res = await fetch(`${API_PATH}operators/chats/${id}/send/gift/${gift_id}`, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    getSelf = async (token:any) => {
        try {
            let res = await fetch(endpoints.getSelf, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    getWork = async (token: any) => {
        try {
            let res = await fetch(endpoints.getWork, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            const r = await checkAuth(res)
            return await r;
        }catch(err) {
            console.log(err)
        }
    }

    workStart = async (token: any) => {
        try {
            let res = await fetch(endpoints.workStart, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }

    workStop = async (token: any, id: number | string) => {
        try {
            let res = await fetch(endpoints.workStop, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({id})
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }
}

export default ApiService;