<template>
  <div>
    하노이부분
    {{ stack1.items }}
    {{ stack2.items }}
    {{ stack3.items }}
    <div>{{ number }}</div>
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
</style>