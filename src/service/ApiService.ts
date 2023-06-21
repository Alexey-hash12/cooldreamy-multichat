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

    getLinkedUsers = async (token: any) => {
        try {
            let res = await fetch(endpoints.getLinkedUsers, {
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
}

export default ApiService;