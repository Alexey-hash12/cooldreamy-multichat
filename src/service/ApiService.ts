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
        search = '',
        filter_type
    }: {
        page: number,
        per_page: number,
        search?: string,
        filter_type?: any
    }) => {
        try {
            let res = await fetch(endpoints.getChats + `?page=${page}&per_page=${per_page}&search=${search}&filter_type=${filter_type}`, {
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
        search = '',
        filter_type
    }: {
        page: number,
        per_page: number,
        search?: string,
        filter_type?: any
    }) => {
        try {
            let res = await fetch(endpoints.getMails + `?page=${page}&per_page=${per_page}&search=${search}&filter_type=${filter_type}`, {
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

    sendMailMessage = async (token: any, id: number | string, body: {text?: string, images?: any[]}) => {
        try {
            let res = await fetch(`${API_PATH}operators/letter/${id}/send/message`, {
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

    workStop = async (token: any) => {
        try {
            let res = await fetch(endpoints.workStop, {
                method: 'POST',
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

    getReports = async (token: any, {
        page,
        per_page,
        date = ''
    }: {
        page: number,
        per_page: number,
        date?: string
    }) => {
        try {
            let res = await fetch(endpoints.reports + `?page=${page}&per_page=${per_page}&date=${date}`, {
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

    deleteReport = async (token: any, id: number | string) => {
        try {
            let res = await fetch(endpoints.reports + `/${id}`, {
                method: "DELETE",
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

    getLogs = async (token: any, {
        page,
        per_page,
        date = ''
    }: {
        page: number,
        per_page: number,
        date?: string
    }) => {
        try {
            let res = await fetch(endpoints.logs + `?page=${page}&per_page=${per_page}&date=${date}`, {
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


    getFaults = async (token: any, {
        page,
        per_page,
        date = ''
    }: {
        page: number,
        per_page: number,
        date?: string
    }) => {
        try {
            let res = await fetch(endpoints.fault + `?page=${page}&per_page=${per_page}&date=${date}`, {
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


    getMedia = async (token: any, id: any, page?: number, category_id?: number) => {
        try {
            // let res = await fetch(`${API_PATH}operators/chats/${id}/anket/media?page=${page}&category_id=${category_id}`, {
            let res = await fetch(`${API_PATH}operators/ancets/${id}/media?page=${page}&category_id=${category_id}`, {
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


    sendChatMedia = async (token: any, id: any, body: {
        thumbnail_url: string,
        image_url: string
    }) => {
        try {
            let res = await fetch(`${API_PATH}operators/chats/${id}/send/image`, {
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

    getLimits = async (token: any, {page}: {page?: number}) => {
        try {
            let res = await fetch(endpoints.getLimits + `?page=${page}`, {
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

    createChat = async (token: any, {anket_id, man_id, operator_chat_limit_id}: {anket_id: any, man_id: any, operator_chat_limit_id: any}) => {
        try {
            let res = await fetch(endpoints.createChat, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({anket_id,man_id, operator_chat_limit_id})
            })
            const r = await checkAuth(res)
            return await r;
        } catch(err) {
            console.log(err)
        }
    }
}

export default ApiService;