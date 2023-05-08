import { createStore } from "vuex";
const Server_Url = "http://localhost/templates/login/public/";
// const Server_Url = "";
export default createStore({
  state: {
    Api_Url: Server_Url + "php/index.php",
    CurrentWidth: window.innerWidth,
    LoaderIndex: 0,
    SideMenuIndex: 0,
  },
  getters: {},
  mutations: {
    // OpenLoader() {
    //   this.state["LoaderIndex"] = 1;
    // },
  },
  actions: {
    // ResizePage: ({ state }, payload) => {
    //   state.CurrentWidth = payload["WindowWidth"];
    // },
  },
  modules: {},
});
