import Vue from "vue";
import Vuex from "vuex";
import Stack from "../utils/stack.js";

Vue.use(Vuex);

const color = ["#FF6347", "#FFD700", "#98FB98", "#8A2BE2", "#20B2AA"];

const store = new Vuex.Store({
  state: {
    number: 0,
    stack1: new Stack(),
    stack2: new Stack(),
    stack3: new Stack(),
    task: new Stack(),
  },
  mutations: {
    SET_NUMBER(state, newNumber) {
      const num = Number(newNumber);
      state.number = num;
      for (let i = num; i > 0; i--) {
        state.stack1.push({ id: i, color: color[i] });
      }
      // task : 초기 상태 push
      state.task.push([state.number, 1, 2, 3]);
    },
    CLEAR_STACK(state) {
      state.stack1.clear();
      state.stack2.clear();
      state.stack3.clear();
      state.task.clear();
    },
  },
});

export default store;
