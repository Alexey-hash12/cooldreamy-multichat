const BASE_DOMAIN = `https://api.cooldreamy.com/`;
const TEST_DOMAIN = `https://newapi.soultri.site/`;
const API_PATH = `${TEST_DOMAIN}api/`;

const endpoints = {
    login: `${API_PATH}token`,


    getChats: `${API_PATH}operators/chats`,
    getMails: `${API_PATH}operators/letters`,


    getChatDialog: `${API_PATH}operators/chats`,
    getMailDialog: `${API_PATH}letter`,

    getInbox: `${API_PATH}operators/messages`

}


export default endpoints;