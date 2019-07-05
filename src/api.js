import axios from 'axios';

const API_HOST = process.env.VUE_APP_API_HOST;
const ROOT_API = API_HOST + process.env.VUE_APP_API_SUFFIX;

let api = {

    /**
     * Test if api works
     *
     * @returns {Promise<void>}
     */
    async getApiWorks() {
        console.log(ROOT_API + '/apiWorks')
        let {data} = await axios.get(ROOT_API + '/apiWorks');

        return data;
    },

    /**
     *
     * @returns {Promise<void>}
     */
    async getCurrentUser() {
        let {data} = await axios.get(ROOT_API + '/user');

        return data;
    },

    /**
     * Register new user
     *
     * @param args
     * @returns {Promise<any>}
     */
    async register(args) {
        return await axios.post(ROOT_API + '/register', args);
    },

    async updateUser(args) {
        let {data} = await axios.patch(ROOT_API + '/user', args);

        return data;
    },

    /**
     *
     * @param username
     * @param password
     * @returns {Promise<void>}
     */
    async login(username, password) {
        let args = {
            grant_type: "password",
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
            username: username,
            password: password,
            scope: "*"
        };

        return await axios.post(API_HOST + '/oauth/token', args);
    },

    /**
     * Send email to user with reset token
     *
     * @param args
     * @returns {Promise<any>}
     */
    async sendResetToken(args) {
        return await axios.post(ROOT_API + '/sendResetToken', args);
    },

    /**
     * Reset the password
     *
     * @param args
     * @returns {Promise<any>}
     */
    async resetPassword(args) {
        return await axios.patch(ROOT_API + '/resetPassword', args);
    },

    /**
     *
     * @returns {*}
     */
    rootApi() {
        return ROOT_API;
    }

};

export default api;