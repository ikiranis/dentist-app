import axios from 'axios'

let user = {

    /**
     * Set localStorage token data. User logged in
     *
     * @param accessToken
     * @param tokenType
     */
    login (accessToken, tokenType) {
        localStorage.accessToken = accessToken
        localStorage.tokenType = tokenType
    },

    /**
     * Delete the token data, to logout the user
     */
    logout () {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('tokenType')
        this.setUserTokenHeader()
    },

    /**
     * Set authentication token header to axios
     */
    setUserTokenHeader () {
    // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        if (typeof localStorage.accessToken !== undefined) {
            axios.defaults.headers.common['Accept'] = 'application/json'
            axios.defaults.headers.common['Authorization'] = localStorage.tokenType + ' ' + localStorage.accessToken
        }
    }

}

export default user
