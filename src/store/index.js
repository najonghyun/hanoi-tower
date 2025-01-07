import Vue from "vue";
import Vuex from "vuex";
import Stack from "../utils/stack.js";

Vue.use(Vuex);

const color = [
  "#FF6B6B", // 빨강
  "#FFA07A", // 주황
  "#FFDA6A", // 노랑
  "#77DD77", // 초록
  "#72DDF7", // 하늘
  "#4A90E2", // 파랑
  "#C58CF2", // 보라
];

const store = new Vuex.Store({
  state: {
    number: 0,
    stacks: [
      { id: 1, data: new Stack() },
      { id: 2, data: new Stack() },
      { id: 3, data: new Stack() },
    ],
    task: new Stack(),
  },
  mutations: {
    SET_NUMBER(state, newNumber) {
      const num = Number(newNumber);
      state.number = num;
      for (let i = num; i > 0; i--) {
        state.stacks[0].data.push({
          id: i,
          color: color[i - 1],
          offsetX: 200,
          offsetY: (i - num) * 20,
          hidden: false,
        });
      }
      // task : 초기 상태 push
      state.task.push([state.number, 1, 2, 3]);
      console.log(state.stacks[0]);
    },
    CLEAR_STACK(state) {
      state.stacks[0].data.clear();
      state.stacks[1].data.clear();
      state.stacks[2].data.clear();
    },
  },
});

export default store;
