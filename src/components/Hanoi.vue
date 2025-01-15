<template>
  <div class="body">
    <div class="hanoi-container">
      <div class="hanoi-background-box">
        <div class="hanoi-background-stack">
          <div class="hanoi-background-stack-bar"></div>
        </div>
        <div class="hanoi-background-stack">
          <div class="hanoi-background-stack-bar"></div>
        </div>
        <div class="hanoi-background-stack">
          <div class="hanoi-background-stack-bar"></div>
        </div>
      </div>
      <div class="hanoi-items-box">
        <div v-for="stack in stacks" :key="stack.id">
          <transition-group tag="div">
            <div
              v-for="item in stack.data.items"
              :key="item.id"
              class="hanoi-items-circle"
              :style="{
                width: `${25 + item.id * 28}px`,
                backgroundImage: `linear-gradient(180deg, ${item.color}, ${item.darkColor})`,
                transform: `translate3d(calc(${item.offsetX}px - 50%), ${item.offsetY}px, 0)`,
                opacity: item.hidden ? 0 : 1,
              }"
            >
              <!-- {{ item.id }} -->
            </div>
          </transition-group>
        </div>
      </div>
      <div class="hanoi-items-bottom"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "hanoiComponent",
  data() {
    return {
      count: 0,
      finish: false,
    };
  },
  computed: {
    ...mapState({
      stacks: "stacks",
    }),
  },
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

.hanoi-background-box {
  display: flex;
}
.hanoi-background-stack {
  flex: 1;
  justify-items: center;
}
.hanoi-background-stack-bar {
  margin-top: 130px;
  width: 15px;
  height: 270px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    url("../assets/images/wood.jpg");
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.hanoi-items-box {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 400px;
  min-width: 1000px;
  display: flex;
}
.hanoi-items-circle {
  position: absolute;
  height: 20px;
  bottom: 0;
  border-radius: 8px;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.3, 1);
  transform: translateX(-50%);
  box-shadow: 0.5px 0.5px 0.5px #5c5c5c;
  text-align: center;
  align-content: center;
  font-family: "SejongGeulggot";
  font-size: 0.5rem;
  font-weight: 600;
}

.hanoi-items-bottom {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
    url("../assets/images/wood.jpg");
  height: 35px;
  border-radius: 10px;
}
</style>