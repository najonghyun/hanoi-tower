<template>
  <div id="app">
    <div class="container">
      <TopMenu />
      <Hanoi />
    </div>
  </div>
</template>

<script>
import Hanoi from "./components/Hanoi.vue";
import TopMenu from "./components/TopMenu.vue";
export default {
  name: "app",
  components: { TopMenu, Hanoi },
  data() {
    return {};
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  /* font-family: "SejongGeulggot"; */
}
.container {
  height: calc(100vh - 60px);
  padding: 30px;
}
</style>
