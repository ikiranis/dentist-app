import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        username: null,
        userId: 0,
        userIsAdmin: true,
        loading: false,
        files: [],
        rejectedFiles: [],
        progress: 0
    },

    mutations: {
        /**
         * username setter
         *
         * @param state
         * @param username
         */
        setUsername (state, username) {
            state.username = username
        },

        /**
         * userId setter
         *
         * @param state
         * @param userId
         */
        setUserId (state, userId) {
            state.userId = userId
        },

        /**
         * userId setter
         *
         * @param state
         * @param userIsAdmin
         */
        setUserIsAdmin (state, userIsAdmin) {
            state.userIsAdmin = userIsAdmin
        },

        /**
         * loading setter
         *
         * @param state
         * @param value
         */
        setLoading (state, value) {
            state.loading = value
        },

        /**
         * files setter
         *
         * @param state
         * @param value
         */
        setFiles (state, value) {
            state.files = value
        },

        /**
         * rejectedFiles setter
         *
         * @param state
         * @param value
         */
        setRejectedFiles (state, value) {
            state.rejectedFiles = value
        },

        /**
         * progress setter
         *
         * @param state
         * @param value
         */
        setProgress (state, value) {
            state.progress = value
        }
    },

    actions: {

        /**
         * Call api to get the current user and set store variables
         *
         * @param context
         * @returns {Promise<T>}
         */
        getCurrentUser (context) {
            api.getCurrentUser()
                .then(response => {
                    context.commit('setUsername', response.name)
                    context.commit('setUserId', response.id)
                    context.commit('setUserIsAdmin', response.isAdmin)
                })
                .catch(error => {
                    if (error.response.statusText === 'Unauthorized') {
                        context.commit('setUsername', null)
                        context.commit('setUserId', 0)
                    }
                })
        }

    }
})
