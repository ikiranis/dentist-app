import axios from 'axios'

const API_HOST = process.env.VUE_APP_API_HOST
const ROOT_API = API_HOST + process.env.VUE_APP_API_SUFFIX

let api = {

    /**
     * Test if api works
     *
     * @returns {Promise<void>}
     */
    async getApiWorks () {
        let { data } = await axios.get(ROOT_API + '/apiWorks')

        return data
    },

    /**
     *
     * @returns {Promise<void>}
     */
    async getUsersCount () {
        let { data } = await axios.get(ROOT_API + '/usersCount')

        return data
    },

    /**
     *
     * @returns {Promise<void>}
     */
    async getCurrentUser () {
        let { data } = await axios.get(ROOT_API + '/user')

        return data
    },

    /**
     * Register new user
     *
     * @param args
     * @returns {Promise<any>}
     */
    async register (args) {
        return axios.post(ROOT_API + '/register', args)
    },

    async updateUser (args) {
        let { data } = await axios.patch(ROOT_API + '/user', args)

        return data
    },

    /**
     *
     * @param username
     * @param password
     * @returns {Promise<void>}
     */
    async login (username, password) {
        let args = {
            grant_type: 'password',
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
            username: username,
            password: password,
            scope: '*'
        }

        return axios.post(API_HOST + '/oauth/token', args)
    },

    /**
     * Send email to user with reset token
     *
     * @param args
     * @returns {Promise<any>}
     */
    async sendResetToken (args) {
        return axios.post(ROOT_API + '/sendResetToken', args)
    },

    /**
     * Reset the password
     *
     * @param args
     * @returns {Promise<any>}
     */
    async resetPassword (args) {
        return axios.patch(ROOT_API + '/resetPassword', args)
    },

    /**
     *
     * @returns {*}
     */
    rootApi () {
        return ROOT_API
    },

    /**
	 * Get all patients
	 *
	 * @returns {Promise<void>}
	 */
    async getPatients (page, search) {
        if (page !== null) {
            page = '?' + page.toString().split('?')[1]
        } else {
            page = ''
        }

        if (search) {
            return axios.get(ROOT_API + '/patients/search/' + search + page)
        }

        return axios.get(ROOT_API + '/patients' + page)
    },

    /**
     * Get a patient
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getPatient (patientId) {
        return axios.get(ROOT_API + '/patient/' + patientId)
    },

    /**
     * Create a patient
     *
     * @param args
     * @returns {Promise<AxiosResponse<T>>}
     */
    async createPatient (args) {
        return axios.post(ROOT_API + '/patient', args)
    },

    /**
     * Update a patient
     *
     * @param args
     * @param patientId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updatePatient (args, patientId) {
        return axios.patch(ROOT_API + '/patient/' + patientId, args)
    },

    /**
	 * Delete a patient
	 *
	 * @param patientId
	 * @returns {Promise<Promise<AxiosResponse<T>>>}
	 */
    async deletePatient (patientId) {
        return axios.delete(ROOT_API + '/patient/' + patientId)
    }

}

export default api
