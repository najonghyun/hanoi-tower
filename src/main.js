import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import FontAwesomeIcon from "./plugins/font-awesome";

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  el: "#app",
  store,
  render: (h) => h(App),
});
