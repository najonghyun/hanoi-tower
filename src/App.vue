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
.container {
  height: 100vh;
  padding: 30px;
}
</style>
