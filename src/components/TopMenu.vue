<template>
  <div class="menu-container">
    <div class="menu-title">하노이의 탑 구현</div>
    <div class="menu-box">
      <div class="menu-count">
        <form @submit.prevent="onSubmit">
          <input
            class="menu-count-text"
            type="number"
            placeholder="숫자 입력"
            v-model="inputNumber"
            ref="input"
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
          :disabled="disabledStep"
          @click="nextStep"
          :style="{ backgroundColor: disabledStep ? 'lightgray' : '#696969' }"
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
    <div v-if="ready" class="menu-footer">
      원판 개수 : <span class="menu-footer-number">{{ number }}</span>
    </div>
    <img
      v-if="finish"
      class="menu-footer-finish"
      src="../assets/images/finish.png"
      alt="finish"
    />
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
  // created() {
  //   this.CLEAR_STACK();
  // },
  mounted() {
    this.$refs.input.focus();
  },
  computed: {
    disabledStep() {
      return this.auto || this.moving || this.finish;
    },
    ...mapState({
      number: "number",
      stacks: "stacks",
      task: "task",
    }),
  },
  methods: {
    ...mapMutations(["SET_NUMBER", "CLEAR_STACK"]),
    /* onSubmit() : input에 숫자 입력 후 제출 시 */
    onSubmit() {
      const temp = this.inputNumber;
      if (temp < 1 || temp > 13) {
        return alert("최소 '1'이상 최대 '13'이내로 숫자를 입력해주세요");
      }
      this.CLEAR_STACK();
      this.SET_NUMBER(temp);
      this.clearData();
    },
    /* clearData() : 전에 하고 있던 데이터들 초기화 */
    clearData() {
      this.inputNumber = "";
      this.ready = true;
      this.finish = false;
      this.moving = false;
      this.count = 0;
      clearInterval(this.interval);
      this.auto = false;
    },
    /* nextStep() : 하노이 원판 이동을 한번 진행 (dfs 사용) */
    nextStep() {
      this.moving = true;
      // 스택이 비었으면 종료
      if (this.task.isEmpty()) {
        // console.log("모두 옮김")
        this.finish = true;
        return;
      }

      const [n, from, temp, to] = this.task.pop();
      if (n == 1) {
        // console.log("Step " + this.count + ": " + from + "->" + to);
        this.move(from, to);
        this.count++;
        // 여기서 한번 더 해줘서 finish가 true 되는 딜레이 방지
        if (this.task.isEmpty()) {
          this.finish = true;
        }
      } else {
        // Stack 이므로 역순으로 진행!!
        // 3. 다시 n-1개의 원판 2 -> 3으로 이동
        this.task.push([n - 1, temp, from, to]);
        // 2. 가장 아래 원판 1 -> 3으로 이동
        this.task.push([1, from, temp, to]);
        // 1. n-1개 까지 원판 1 -> 2로 이동
        this.task.push([n - 1, from, to, temp]);
        // 4. 이동을 안했으므로 재귀 호출출
        this.nextStep();
      }
    },
    /* autoStep() : 하노이 원판 이동을 계속 진행 (멈춤 제어 전까지) */
    autoStep() {
      if (this.auto) {
        this.auto = false;
        clearInterval(this.interval);
        this.interval = null;
        return;
      }
      this.auto = true;
      // setInterval()함수 사용하여 0.7s 마다 반복실행
      this.interval = setInterval(() => {
        if (this.finish) {
          this.auto = false;
          clearInterval(this.interval);
          this.interval = null;
          // console.log("Auto 완료");
        } else {
          this.nextStep();
        }
      }, 700);
    },
    /* move(from, to) : from에서 to로 원판을 실제 옮기는 함수 */
    move(from, to) {
      // 1. 옮길 Stack에서 원판 가져오고 옮겨질 위치의 x, y축 계산
      const fromCircle = this.stacks[from - 1].data.peek();
      const targetX = (to - 1) * 400 + 200;
      const targetY = -this.stacks[to - 1].data.getSize() * 20;

      // 2. 원판을 각 차례로 이동 (setTimeout()으로 각각의 위치이동을 제어)
      // 2-1. 위로 올리기 (Y축 이동)
      fromCircle.offsetY = -300;

      // 2-2. 옆으로 옮기기 X축 이동
      setTimeout(() => {
        fromCircle.offsetX = targetX;
      }, 500);

      // 2-3. 아래로 내리기 (Y축 이동)
      setTimeout(() => {
        fromCircle.offsetY = targetY;
        this.moving = false;
      }, 800);

      // 3. $nextTick안에서 교체된 위치 값 데이터 적용(vue에서는 그래야 transition이 발동함)
      this.$nextTick(() => {
        this.stacks[from - 1].data.pop();
        this.stacks[to - 1].data.push(fromCircle);

        // 원판이 미리 target 스택에 들어와 있는 현상 방지하기 위해 hidden과 setTimeout()으로 제어
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
.menu-title {
  font-family: "SejongGeulggot";
  font-size: 35px;
  font-weight: 600;
}
.menu-box {
  width: 1200px;
  margin-top: 30px;
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
  font-family: "SejongGeulggot";
  font-size: 1rem;
}
.menu-count-button {
  margin-left: 5px;
  height: 40px;
  width: 60px;
  border-radius: 10px;
  border: none;
  background-color: #778899;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: "SejongGeulggot";
  cursor: pointer;
}
.menu-count-button:hover {
  background-color: #657381;
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
  margin: 0 20px;
  color: white;
  cursor: pointer;
}
.menu-step-button:hover {
  background-color: #535353;
}
.menu-step-button:disabled {
  pointer-events: none;
}
.menu-step-text {
  font-family: "SejongGeulggot";
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
  background-color: #778899;
  color: white;
  cursor: pointer;
}
.menu-auto-button:hover {
  background-color: #657381;
}
.menu-auto-button:disabled {
  pointer-events: none;
}
.menu-auto-text {
  font-family: "SejongGeulggot";
  font-size: 1rem;
  font-weight: 600;
  padding-right: 5px;
}
.menu-footer {
  position: absolute;
  padding: 10px 0;
  font-family: "SejongGeulggot";
  font-size: 1rem;
  font-weight: 600;
}
.menu-footer-number {
  font-size: 1.25rem;
  font-weight: 600;
}
.menu-footer-finish {
  position: absolute;
  width: 70px;
  left: 995px;
  margin-top: 30px;
}
</style>