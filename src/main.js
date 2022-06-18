import { createApp } from "vue"
import App from "./App.vue"

// CSS
// import "./assets/mdui.css"
import "./assets/css/public.css"
import "./assets/css/article.css"
import "./assets/css/textfieldGroup.css"
import "./assets/css/inputGroup.css"
import "./assets/css/materialIcons.css"
import "./assets/css/shadows.css"
import "./assets/css/button.css"
import "./assets/css/checkbox.css"
import "./assets/css/anchor.css"

const app = createApp(App)
app.config.unwrapInjectedRef = true
app.mount("#app")
