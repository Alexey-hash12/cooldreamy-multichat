import endpoints from "./endpoints";
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
}

export default ApiService;