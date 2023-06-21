const BASE_DOMAIN = `https://api.cooldreamy.com/`;
const API_PATH = `${BASE_DOMAIN}api/`;

const endpoints = {
    login: `${API_PATH}token`,


    getLinkedUsers: `${API_PATH}profile/get_link_users`
}


export default endpoints;