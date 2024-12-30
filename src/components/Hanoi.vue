<template>
  <div>
    하노이부분
    <div>{{ number }}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({ number: "number" }),
  },
};
</script>
<style>
</style>