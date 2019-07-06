import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = true; // Display console warning at development mode

// Bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// User Authentication
import user from '@/library/user';
user.setUserTokenHeader();

// Set routes titles
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

// Material Design icons
// @link https://materialdesignicons.com/
import EyeIcon from "vue-material-design-icons/Eye.vue";
Vue.component("eye-icon", EyeIcon);
import PencilIcon from "vue-material-design-icons/Pencil.vue";
Vue.component("pencil-icon", PencilIcon);
import FileHiddenIcon from "vue-material-design-icons/FileHidden.vue";
Vue.component("file-hidden-icon", FileHiddenIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
