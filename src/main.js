import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//sweetalert scss
import 'sweetalert2/src/sweetalert2.scss'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

//nprogress css
import 'nprogress/nprogress.css';

//axios
import axios from 'axios'

//set credential axios with true
axios.defaults.withCredentials = true


createApp(App).use(store).use(router).mount('#app')
