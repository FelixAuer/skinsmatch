import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import './index.css'
import VueGtag from "vue-gtag-next";

const app = createApp(App);

app.use(VueGtag, {
    property: {
        id: "271267420"
    }
});


app.use(router).mount("#app");
