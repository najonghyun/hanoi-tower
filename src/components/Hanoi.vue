<template>
  <div class="body">
    <div class="hanoi-container">
      <div class="hanoi-topbox">
        <div class="hanoi-stack"><div class="hanoi-stack-bar"></div></div>
        <div class="hanoi-stack"><div class="hanoi-stack-bar"></div></div>
        <div class="hanoi-stack"><div class="hanoi-stack-bar"></div></div>
      </div>
      <div class="hanoi-item-box">
        <div class="hanoi-item-stack" v-for="stack in stacks" :key="stack.id">
          <transition-group class="hanoi-item-move" name="hanoi-move" tag="div">
            <div
              v-for="item in stack.data.items"
              :key="item.id"
              class="hanoi-move-circle"
              :style="{
                width: `${25 + item.id * 28}px`,
                backgroundColor: item.color,
                transform: `translate3d(calc(${item.offsetX}px - 50%), ${item.offsetY}px, 0)`,
                opacity: item.hidden ? 0 : 1,
              }"
            >
              {{ item.id }}
            </div>
          </transition-group>
        </div>
      </div>
      <div class="hanoi-bottombox"></div>
      {{ number }}
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      count: 0,
      finish: false,
    };
  },
  computed: {
    ...mapState({
      number: "number",
      stacks: "stacks",
    }),
  },
  methods: {},
};
</script>
<style>
.body {
  position: relative;
}
.hanoi-container {
  width: 1200px;
  position: absolute;
  height: 400px;
}
.hanoi-topbox {
  display: flex;
}
.hanoi-stack {
  flex: 1;
  justify-items: center;
}

.hanoi-stack-bar {
  margin-top: 130px;
  width: 15px;
  height: 270px;
  background-color: #331800;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.hanoi-item-box {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 400px;
  min-width: 1000px;
  display: flex;
}
.hanoi-item-stack {
}

.hanoi-item-move {
}

.hanoi-move-circle {
  position: absolute;
  height: 20px;
  bottom: 0;
  border-radius: 20px;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.3, 1);
  transform: translateX(-50%);
  text-align: center;
  align-content: center;
  font-size: 0.5rem;
  font-weight: 600;
}

/* .hanoi-move-enter,
.hanoi-move-leave-to {
  transform: translateX(0) translateY(0);
} */

/* .hanoi-move-enter-active,
.hanoi-move-leave-active {
  transition: transform 0.5s ease;
} */

.hanoi-bottombox {
  background-color: #331800;
  height: 35px;
  border-radius: 10px;
}
</style>