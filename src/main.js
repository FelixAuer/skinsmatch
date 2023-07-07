import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router";
import VueGtag from "vue-gtag-next";

const app = createApp(App);

app.use(VueGtag, {
    property: {
        id: "271267420"
    }
});


app.use(router).mount("#app");