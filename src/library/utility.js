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
    }

}

export default utility
