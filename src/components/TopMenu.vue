<template>
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
      <div class="menu-main-text">{{ count }}</div>
      <button class="menu-step-button" @click="nextStep">
        <div class="menu-step-text">Step</div>
        <font-awesome-icon icon="arrow-right" size="xl" />
      </button>
      <button class="menu-auto-button" @click="autoStep">
        <div class="menu-auto-text">Auto</div>
        <font-awesome-icon icon="arrow-right" size="xl" spin-pulse />
      </button>
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
      finish: false,
    };
  },
  created() {
    this.CLEAR_STACK();
  },
  computed: {
    ...mapState({
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
      this.count = 0;
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
      let interval = setInterval(() => {
        if (this.finish) {
          clearInterval(interval);
          console.log("작업 완료");
        } else {
          this.nextStep();
        }
      }, 500);
    },
    move(from, to) {
      const fromCircle = this.stacks[from - 1].data.peek();
      const targetX = (to - 1) * 400 + 200;
      const targetY = -this.stacks[to - 1].data.getSize() * 20;
      fromCircle.offsetX = targetX;
      fromCircle.offsetY = targetY;

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
</style>