import Vue from "vue";
import Vuex from "vuex";
import Stack from "../utils/stack.js";

Vue.use(Vuex);

const colors = [
  ["#FF6B6B", "#992020"], // 빨강
  ["#FFA07A", "#994C33"], // 주황
  ["#FFDA6A", "#997322"], // 노랑
  ["#77DD77", "#336633"], // 초록
  ["#72DDF7", "#336677"], // 하늘
  ["#4A90E2", "#1F3F73"], // 파랑
  ["#C58CF2", "#6B3499"], // 보라
  ["#FFB6C1", "#993F4D"], // 연분홍
  ["#9DD9D2", "#3D6666"], // 민트 그린
  ["#A52A2A", "#4D0F0F"], // 밤색
  ["#008080", "#003333"], // 청록색
  ["#4682B4", "#1F3A52"], // 스틸 블루
  ["#708090", "#2B2F36"], // 스모크 그레이
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
          color: colors[i - 1][0],
          darkColor: colors[i - 1][1],
          offsetX: 200,
          offsetY: (i - num) * 20,
          hidden: false,
        });
      }
      // 초기 : n개의 원판 초기 상태로 task에 push
      state.task.push([state.number, 1, 2, 3]);
    },
    CLEAR_STACK(state) {
      state.stacks[0].data.clear();
      state.stacks[1].data.clear();
      state.stacks[2].data.clear();
      state.task.clear();
    },
  },
});

export default store;
