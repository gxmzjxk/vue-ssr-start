import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            navs: ['英超', '西甲', '意甲']
        },
        actions: {

        },
        mutations: {

        },
        getters: {

        }
    })
}