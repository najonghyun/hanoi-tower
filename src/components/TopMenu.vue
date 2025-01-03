<template>
  <div>
    <div class="menu-count">
      <form @submit.prevent="onSubmit">
        <input
          class="menu-count-text"
          type="number"
          placeholder="숫자 입력"
          v-model="inputNumber"
        />
        <button class="menu-count-button" type="submit">준비</button>
      </form>
    </div>
    <div class="menu-step">
      <button class="menu-step" @click="nextStep">Step</button>
      <button class="menu-auto" @click="autoStep">Auto</button>
    </div>
    {{ stack1.items }}
    {{ stack2.items }}
    {{ stack3.items }}
  </div>
</template>
  <script>
import { mapMutations } from "vuex";
import Stack from "../utils/stack.js";

export default {
  data() {
    return {
      inputNumber: "",
      count: 0,
      finish: false,
      stack1: new Stack(),
      stack2: new Stack(),
      stack3: new Stack(),
      task: new Stack(),
    };
  },
  methods: {
    ...mapMutations(["SET_NUMBER"]),
    onSubmit() {
      const temp = this.inputNumber;
      this.SET_NUMBER(temp);
      const number = Number(temp);
      for (let i = number; i > 0; i--) {
        this[`stack1`].push(i);
      }
      // task : 초기 상태 push
      this.task.push([number, 1, 2, 3]);
      this.inputNumber = "";
    },
    nextStep() {
      if (this.task.isEmpty()) {
        this.finish = true;
        console.log("모든 작업 끝");
        return;
      }
      const n = this.task.peek()[0];
      const from = this.task.peek()[1];
      const temp = this.task.peek()[2];
      const to = this.task.peek()[3];
      this.task.pop();

      if (n == 1) {
        this.move(from, to);
        this.count++;
        console.log("Step " + this.count + ": " + from + "->" + to);
      } else {
        this.task.push([n - 1, temp, from, to]);
        this.task.push([1, from, temp, to]);
        this.task.push([n - 1, from, to, temp]);
        this.nextStep();
      }
    },
    autoStep() {
      let interval = setInterval(() => {
        if (this.finish) {
          clearInterval(interval);
          console.log("작업 완료");
        } else {
          this.nextStep();
        }
      }, 1000);
    },
    move(from, to) {
      this[`stack${to}`].push(this[`stack${from}`].pop());
    },
  },
};
</script>
  <style>
.menu-count {
  display: flex;
}
.menu-count-text {
}
.menu-count-button {
}
</style>