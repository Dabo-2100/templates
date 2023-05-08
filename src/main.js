import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "animate.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {} from "@fortawesome/free-brands-svg-icons";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
library.add(faPowerOff, faUser);

createApp(App)
  .use(store)
  .use(router)
  .use(VueSweetalert2)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

// npm install axios
// npm install bootstrap
// npm install jquery
// npm install @vuelidate/core @vuelidate/validators
// npm install @fortawesome/fontawesome-svg-core
// npm install @fortawesome/free-solid-svg-icons
// npm install @fortawesome/free-regular-svg-icons
// npm install @fortawesome/free-brands-svg-icons
// npm install @fortawesome/vue-fontawesome@latest-3
// npm install animate.css
// npm install -S vue-sweetalert2
// npm install vue3-carousel
