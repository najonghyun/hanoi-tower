<template>
  <div class="body">
    <!-- 하노이부분
    {{ stack1.items }}
    {{ stack2.items }}
    {{ stack3.items }} -->
    <div class="hanoi-container">
      <div class="hanoi-topbox">
        <div class="hanoi-stack1"><div class="hanoi-stack-bar"></div></div>
        <div class="hanoi-stack2"><div class="hanoi-stack-bar"></div></div>
        <div class="hanoi-stack3"><div class="hanoi-stack-bar"></div></div>
      </div>
      <div class="hanoi-item-box">
        <div class="hanoi-item-stack">
          <div
            v-for="item in [...stack1.items].reverse()"
            :key="item.id"
            class="hanoi-item-circle"
            :style="{
              width: `${40 + item.id * 20}px`,
              backgroundColor: item.color,
            }"
          >
            {{ item.id }}
          </div>
        </div>
        <div class="hanoi-item-stack">
          <div
            class="hanoi-item-circle"
            v-for="item in [...stack2.items].reverse()"
            :key="item.id"
            :style="{
              width: `${40 + item.id * 20}px`,
              backgroundColor: item.color,
            }"
          ></div>
        </div>
        <div class="hanoi-item-stack">
          <div
            class="hanoi-item-circle"
            v-for="item in [...stack3.items].reverse()"
            :key="item.id"
            :style="{
              width: `${40 + item.id * 20}px`,
              backgroundColor: item.color,
            }"
          ></div>
        </div>
      </div>
      <div class="hanoi-bottombox"></div>
      {{ count }}
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
      stack1: "stack1",
      stack2: "stack2",
      stack3: "stack3",
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
  width: 100%;
  min-width: 1000px;
  position: absolute;
  height: 500px;
}
.hanoi-topbox {
  display: flex;
}
.hanoi-stack1 {
  flex: 1;
  background-color: aqua;
  justify-items: center;
}
.hanoi-stack2 {
  flex: 1;
  background-color: darkmagenta;
  justify-items: center;
}
.hanoi-stack3 {
  flex: 1;
  background-color: blanchedalmond;
  justify-items: center;
}
.hanoi-stack-bar {
  width: 20px;
  height: 500px;
  background-color: black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.hanoi-item-box {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 500px;
  min-width: 1000px;
  display: flex;
}
.hanoi-item-stack {
  flex: 1;
  justify-items: center;
  align-self: end;
}
.hanoi-item-circle {
  width: 100px;
  height: 20px;
  background-color: brown;
  border-radius: 20px;
}
.hanoi-bottombox {
  background-color: black;
  height: 25px;
}
</style>