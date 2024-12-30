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
      <button class="menu-step">Step</button>
      <button class="menu-auto">Auto</button>
    </div>
  </div>
</template>
  <script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      inputNumber: "",
    };
  },
  methods: {
    ...mapMutations(["SET_NUMBER"]),
    onSubmit() {
      const temp = this.inputNumber;
      this.SET_NUMBER(temp);
      this.inputNumber = "";
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