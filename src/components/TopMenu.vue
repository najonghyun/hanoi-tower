<template>
  <div class="menu-container">
    <div class="menu-box">
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
      <div v-if="ready" class="menu-step">
        <div
          class="menu-main-text"
          :style="{ color: finish ? 'red' : 'black' }"
        >
          {{ count }}
        </div>
        <button
          class="menu-step-button"
          :disabled="auto || moving || finish"
          @click="nextStep"
        >
          <div class="menu-step-text">Step</div>
          <font-awesome-icon icon="arrow-right" size="xl" />
        </button>
        <button class="menu-auto-button" @click="autoStep" :disabled="finish">
          <div class="menu-auto-text">Auto</div>
          <font-awesome-icon icon="arrow-right" size="xl" :spin-pulse="auto" />
        </button>
      </div>
    </div>
    <div class="menu-footer">
      원판 개수 : <span class="menu-footer-number">{{ number }}</span>
    </div>
  </div>
</template>
  <script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      inputNumber: "",
      ready: false,
      count: 0,
      moving: false,
      auto: false,
      finish: false,
      interval: null,
    };
  },
  created() {
    this.CLEAR_STACK();
  },
  computed: {
    ...mapState({
      number: "number",
      stacks: "stacks",
      task: "task",
    }),
  },
  methods: {
    ...mapMutations(["SET_NUMBER", "CLEAR_STACK"]),
    onSubmit() {
      const temp = this.inputNumber;
      if (temp < 1 || temp > 13) {
        return alert("최소 '1'이상 최대 '13'이내로 숫자를 입력해주세요");
      }
      this.CLEAR_STACK();
      this.SET_NUMBER(temp);
      this.inputNumber = "";
      this.ready = true;
      this.finish = false;
      this.moving = false;
      this.count = 0;
      clearInterval(this.interval);
      this.auto = false;
    },
    nextStep() {
      this.moving = true;
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
        if (this.task.isEmpty()) {
          // 여기서 한번 더 해줘서 finish가 true 되는 딜레이 방지
          this.finish = true;
        }
      } else {
        this.task.push([n - 1, temp, from, to]);
        this.task.push([1, from, temp, to]);
        this.task.push([n - 1, from, to, temp]);
        this.nextStep();
      }
    },
    autoStep() {
      if (this.auto) {
        this.auto = false;
        clearInterval(this.interval);
        this.interval = null;
        return;
      }
      this.auto = true;
      this.interval = setInterval(() => {
        if (this.finish) {
          this.auto = false;
          clearInterval(this.interval);
          this.interval = null;
          console.log("auto 완료");
        } else {
          this.nextStep();
        }
      }, 700);
    },
    move(from, to) {
      const fromCircle = this.stacks[from - 1].data.peek();
      const targetX = (to - 1) * 400 + 200;
      const targetY = -this.stacks[to - 1].data.getSize() * 20;
      // fromCircle.offsetX = targetX;
      // fromCircle.offsetY = targetY;

      // 1. 위로 올리기 (Y축 이동)
      fromCircle.offsetY = -300;

      // 2. 옆으로 옮기기 X축 이동
      setTimeout(() => {
        fromCircle.offsetX = targetX;
      }, 500);

      // 3. 아래로 내리기 (Y축 이동)
      setTimeout(() => {
        fromCircle.offsetY = targetY;
        this.moving = false;
      }, 800);

      this.$nextTick(() => {
        this.stacks[from - 1].data.pop();
        this.stacks[to - 1].data.push(fromCircle);

        const toCircle = this.stacks[to - 1].data.peek();
        if (toCircle) {
          toCircle.hidden = true;
        }
        setTimeout(() => {
          if (toCircle) {
            toCircle.hidden = false;
          }
        }, 450);
      });
    },
  },
};
</script>
  <style>
.menu-box {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.menu-count {
  display: flex;
}
.menu-count-text {
  height: 38px;
  width: 120px;
  padding-left: 10px;
  border-radius: 10px;
  border: gray 1px solid;
  font-size: 1rem;
}
.menu-count-button {
  margin-left: 5px;
  height: 40px;
  width: 60px;
  border-radius: 10px;
  border: none;
  background-color: lightgray;
  font-size: 1rem;
  font-weight: 600;
}
.menu-count-button:hover {
  background-color: rgb(179, 179, 179);
}

.menu-step {
  display: flex;
}
.menu-main-text {
  font-size: 1.75rem;
  padding-right: 30px;
}
.menu-step-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 90px;
  border-radius: 10px;
  border: none;
  background-color: lightgray;
  margin: 0 20px;
}
.menu-step-button:hover {
  background-color: rgb(179, 179, 179);
}
.menu-step-text {
  font-size: 1rem;
  font-weight: 600;
  padding-right: 5px;
}
.menu-auto-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 90px;
  border-radius: 10px;
  border: none;
  background-color: lightgray;
}
.menu-auto-button:hover {
  background-color: rgb(179, 179, 179);
}
.menu-auto-text {
  font-size: 1rem;
  font-weight: 600;
  padding-right: 5px;
}
.menu-footer {
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 600;
}
.menu-footer-number {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>