import Vue from 'vue'
import './plugins/vuetify'
import VeeValidate from 'vee-validate';
import App from './App.vue'
import router from './router'
import store from './store'

import Vuex from 'vuex'
Vue.use(Vuex)

import $ from "jquery"
window.jQuery = $

Vue.config.productionTip = false
Vue.use(VeeValidate);

//handle local authentication of routes
router.beforeEach((to, from, next) => {
    const publicPages = ['/auth'];
    const authRequired = !publicPages.includes(to.path);
    //const loggedIn = JSON.parse(localStorage.getItem('user'));
    const loggedIn = true;

    if (authRequired && !loggedIn) {
        return next('/auth');
    }

    next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
