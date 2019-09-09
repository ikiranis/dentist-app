const utility = {

    /**
     * Console log text when in development mode
     *
     * @param text
     */
    debug (text) {
        if (process.env.NODE_ENV === 'development') {
            console.log(text)
        }
    },

    /**
     * Remove object from myArray with key value
     *
     * @param myArray
     * @param key
     * @param value
     * @returns {*}
     */
    removeObjFromArray (myArray, key, value) {
        return myArray.filter(obj => (obj[key] !== value))
    }

}

export default utility
