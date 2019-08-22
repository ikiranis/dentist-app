import axios from 'axios'
import moment from 'moment'

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

    // ************** Calendar api calls **************

    /**
	 * Get all events
	 *
	 * @returns {Promise<void>}
	 */
    async getEvents (page, search) {
        if (page !== null) {
            page = '?' + page.toString().split('?')[1]
        } else {
            page = ''
        }

        if (search.dateFrom && search.dateTo) {
            let dateFrom = moment(search.dateFrom).format('YYYYMMDD')
            let dateTo = moment(search.dateTo).format('YYYYMMDD')

            return axios.get(ROOT_API + '/events/search/' + dateFrom + '/' + dateTo + page)
        }

        return axios.get(ROOT_API + '/events' + page)
    },

    /**
     * Get an event
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getEvent (eventId) {
        return axios.get(ROOT_API + '/event/' + eventId)
    },

    /**
     * Create an event
     *
     * @param args
     * @returns {Promise<AxiosResponse<T>>}
     */
    async createEvent (args) {
        return axios.post(ROOT_API + '/event', args)
    },

    /**
     * Update an event
     *
     * @param args
     * @param eventId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateEvent (args, eventId) {
        return axios.patch(ROOT_API + '/event/' + eventId, args)
    },

    /**
	 * Delete an event
	 *
	 * @param eventId
	 * @returns {Promise<Promise<AxiosResponse<T>>>}
	 */
    async deleteEvent (eventId) {
        return axios.delete(ROOT_API + '/event/' + eventId)
    },

    // ************** Patient api calls **************

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
     * Get the list of patients, only with id and fullname
     *
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async getSimplePatients () {
        return axios.get(ROOT_API + '/simplePatients')
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
    },

    // ************** Transaction api calls **************

    /**
	 * Get all transactions
	 *
	 * @returns {Promise<void>}
	 */
    async getTransactions (page, search) {
        if (page !== null) {
            page = '?' + page.toString().split('?')[1]
        } else {
            page = ''
        }

        if (search.dateFrom && search.dateTo) {
            let dateFrom = moment(search.dateFrom).format('YYYYMMDD')
            let dateTo = moment(search.dateTo).format('YYYYMMDD')

            return axios.get(ROOT_API + '/transactions/search/' + dateFrom + '/' + dateTo + page)
        }

        return axios.get(ROOT_API + '/transactions' + page)
    },

    /**
	 * Get a transaction
	 *
	 * @returns {Promise<AxiosResponse<T>>}
	 */
    async getTransaction (transactionId) {
        return axios.get(ROOT_API + '/transaction/' + transactionId)
    },

    /**
	 * Create a transaction
	 *
	 * @param args
	 * @returns {Promise<AxiosResponse<T>>}
	 */
    async createTransaction (args) {
        return axios.post(ROOT_API + '/transaction', args)
    },

    /**
	 * Update a transaction
	 *
	 * @param args
	 * @param transactionId
	 * @returns {Promise<Promise<AxiosResponse<T>>>}
	 */
    async updateTransaction (args, transactionId) {
        return axios.patch(ROOT_API + '/transaction/' + transactionId, args)
    },

    /**
	 * Delete a transaction
	 *
	 * @param transactionId
	 * @returns {Promise<Promise<AxiosResponse<T>>>}
	 */
    async deleteTransaction (transactionId) {
        return axios.delete(ROOT_API + '/transaction/' + transactionId)
    },

    // ************** Medical History api calls **************

    /**
     * Get Medical History info
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getMedicalHistory (patientId) {
        return axios.get(ROOT_API + '/medicalHistory/' + patientId)
    },

    /**
     * Update Medical History
     *
     * @param args
     * @param patientId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateMedicalHistory (args, patientId) {
        return axios.patch(ROOT_API + '/medicalHistory/' + patientId, args)
    },

	// ************** Dental History api calls **************

	/**
	 * Get Dental History info
	 *
	 * @returns {Promise<AxiosResponse<T>>}
	 */
	async getDentalHistory (patientId) {
		return axios.get(ROOT_API + '/dentalHistory/' + patientId)
	},

	/**
	 * Update Dental History
	 *
	 * @param args
	 * @param patientId
	 * @returns {Promise<Promise<AxiosResponse<T>>>}
	 */
	async updateDentalHistory (args, patientId) {
		return axios.patch(ROOT_API + '/dentalHistory/' + patientId, args)
	},

    // ************** Clinical Examination api calls **************

    /**
     * Get Clinical Examination info
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getClinicalExamination (patientId) {
        return axios.get(ROOT_API + '/clinicalExamination/' + patientId)
    },

    /**
     * Update Clinical Examination
     *
     * @param args
     * @param patientId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateClinicalExamination (args, patientId) {
        return axios.patch(ROOT_API + '/clinicalExamination/' + patientId, args)
    },

    // ************** Treatments api calls **************

    /**
     * Get all treatments
     *
     * @returns {Promise<void>}
     */
    async getTreatments (page, patientId) {
        if (page !== null) {
            page = '?' + page.toString().split('?')[1]
        } else {
            page = ''
        }

        return axios.get(ROOT_API + '/treatments/' + patientId + page)
    },

    /**
     * Get a treatment
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getTreatment (treatmentId) {
        return axios.get(ROOT_API + '/treatment/' + treatmentId)
    },

    /**
     * Create a treatment
     *
     * @param args
     * @returns {Promise<AxiosResponse<T>>}
     */
    async createTreatment (args) {
        return axios.post(ROOT_API + '/treatment', args)
    },

    /**
     * Update a treatment
     *
     * @param args
     * @param treatmentId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateTreatment (args, treatmentId) {
        return axios.patch(ROOT_API + '/treatment/' + treatmentId, args)
    },

    /**
     * Delete a treatment
     *
     * @param treatmentId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async deleteTreatment (treatmentId) {
        return axios.delete(ROOT_API + '/treatment/' + treatmentId)
    },

    // ************** Endo Treatment Card api calls **************

    /**
     * Get Endo Treatment Card info
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getEndoTreatmentCard (patientId) {
        return axios.get(ROOT_API + '/endoTreatmentCard/' + patientId)
    },

    /**
     * Update Endo Treatment Card
     *
     * @param args
     * @param patientId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateEndoTreatmentCard (args, patientId) {
        return axios.patch(ROOT_API + '/endoTreatmentCard/' + patientId, args)
    },

    // ************** Diagnosis api calls **************

    /**
     * Get Diagnosis info
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getDiagnosis (patientId) {
        return axios.get(ROOT_API + '/diagnosis/' + patientId)
    },

    /**
     * Update Diagnosis
     *
     * @param args
     * @param patientId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateDiagnosis (args, patientId) {
        return axios.patch(ROOT_API + '/diagnosis/' + patientId, args)
    },

    // ************** Endo Treatment api calls **************

    /**
     * Get Endo Treatment info
     *
     * @param patientId
     * @param rootId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async getEndoTreatment (patientId, rootId) {
        return axios.get(ROOT_API + '/endoTreatment/' + patientId + '/' + rootId)
    },

    /**
     * Update Endo Treatment
     *
     * @param args
     * @param id
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateEndoTreatment (args, id) {
        return axios.patch(ROOT_API + '/endoTreatment/' + id, args)
    },

    // ************** Treatment Notes api calls **************

    /**
     * Get all notes
     *
     * @returns {Promise<void>}
     */
    async getTreatmentNotes (patientId) {
        return axios.get(ROOT_API + '/treatmentNotes/' + patientId)
    },

    /**
     * Create a note
     *
     * @param args
     * @returns {Promise<AxiosResponse<T>>}
     */
    async createTreatmentNote (args) {
        return axios.post(ROOT_API + '/treatmentNote', args)
    },

    /**
     * Update a note
     *
     * @param args
     * @param treatmentNoteId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateTreatmentNote (args, treatmentNoteId) {
        return axios.patch(ROOT_API + '/treatmentNote/' + treatmentNoteId, args)
    },

    /**
     * Delete a note
     *
     * @param treatmentNoteId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async deleteTreatmentNote (treatmentNoteId) {
        return axios.delete(ROOT_API + '/treatmentNote/' + treatmentNoteId)
    },

    // ************** Files api calls **************

    /**
     * Get all files
     *
     * @returns {Promise<void>}
     */
    async getFiles (fileId) {
        return axios.get(ROOT_API + '/files/' + fileId)
    },

    /**
     * Get a file
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getFile (fileId) {
        return axios.get(ROOT_API + '/file/' + fileId)
    },

    /**
     * Create a file
     *
     * @param args
     * @returns {Promise<AxiosResponse<T>>}
     */
    async createFile (args) {
        return axios.post(ROOT_API + '/file', args)
    },

    /**
     * Update a file
     *
     * @param args
     * @param fileId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async updateFile (args, fileId) {
        return axios.patch(ROOT_API + '/file/' + fileId, args)
    },

    /**
     * Delete a file
     *
     * @param fileId
     * @returns {Promise<Promise<AxiosResponse<T>>>}
     */
    async deleteFile (fileId) {
        return axios.delete(ROOT_API + '/file/' + fileId)
    },

    // ************** Roots api calls **************

    /**
     * Get all roots
     *
     * @returns {Promise<void>}
     */
    async getRoots () {
        return axios.get(ROOT_API + '/roots')
    },

    // ************** Teeth api calls **************

    /**
     * Get all teeth
     *
     * @returns {Promise<void>}
     */
    async getTeeth () {
        return axios.get(ROOT_API + '/teeth')
    },
}

export default api
