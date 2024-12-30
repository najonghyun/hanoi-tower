import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    number: 0,
  },
  mutations: {
    SET_NUMBER(state, number) {
      state.number = number;
    },
  },
});

export default store;
