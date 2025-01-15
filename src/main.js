import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import FontAwesomeIcon from "./plugins/font-awesome";
import "./assets/fonts/index.css";

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
