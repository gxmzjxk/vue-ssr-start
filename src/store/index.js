import Vue from 'vue'
import Vuex from 'vuex'
import SportsHome from './modules/sports-home'

import getters from './getters'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        strict: process.env.NODE_ENV !== 'production',
        modules: {
            SportsHome
        },
        getters
    })
}