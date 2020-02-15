import Vue from 'vue';
import Vuex from 'vuex';

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      loggedIn: false,
      user: {
        login: '',
        img: ''
      },
      chat: {
        username: ''
      }
    },
    getters: {
      getInfoAboutUser(state) {
        return state.user;
      },
      getCompanion(state) {
        return state.chat.username;
      },
      getAuth(state) {
        return state.loggedIn;
      }
    },
    mutations: {
      addInfoAboutUser(state, payload) {
        state.user = { ...state.user, ...payload };
      },
      addUser(state, payload) {
        state.chat.username = payload;
      },
      logged(state, payload) {
        state.loggedIn = payload;
      }
    },
    actions: {
      addInfoAboutUser({ commit }, user) {
        commit('addInfoAboutUser', user);
      },
      addUser({ commit }, user) {
        commit('addUser', user);
      }
    },
    modules: {},

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
