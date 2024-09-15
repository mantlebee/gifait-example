import Aura from "@primevue/themes/aura";
import { createApp } from "vue";
import PrimeVue from "primevue/config";

import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
