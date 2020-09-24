import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyBzZSrf29VVKBe3ubuBhYS566nI5JIy338",
  authDomain: "pegadaian-gold-data.firebaseapp.com",
  databaseURL: "https://pegadaian-gold-data.firebaseio.com",
  projectId: "pegadaian-gold-data",
  storageBucket: "pegadaian-gold-data.appspot.com",
  messagingSenderId: "1015216585945",
  appId: "1:1015216585945:web:97f402c10647c8c829d2c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
