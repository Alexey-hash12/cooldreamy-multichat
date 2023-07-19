export const BASE_DOMAIN = `https://api.cooldreamy.com/`;
export const TEST_DOMAIN = `https://newapi.soultri.site/`;
export const API_PATH = `${TEST_DOMAIN}api/`;

const endpoints = {
    login: `${API_PATH}token`,

    getMyProfile: `${API_PATH}profile/get_my_profile`,

    getChats: `${API_PATH}operators/chats`,
    getMails: `${API_PATH}operators/letter`,


    getChatDialog: `${API_PATH}operators/chats`,
    getMailDialog: `${API_PATH}operators/letter`,

    getInbox: `${API_PATH}operators/messages`,

    getStickers: `${API_PATH}get_stickers`,
    getGifts: `${API_PATH}get_gifts`,

    getSelf: `${API_PATH}operators/me`,


    getWork: `${API_PATH}operators/working-shifts`,

    workStart: `${API_PATH}operators/working-shifts/start`,
    workStop: `${API_PATH}operators/working-shifts/stop`,


    reports: `${API_PATH}operators/reports`,
    logs: `${API_PATH}operators/logs`,
    fault: `${API_PATH}operators/fines`,


    getLimits: `${API_PATH}operators/limits`


}


export default endpoints;