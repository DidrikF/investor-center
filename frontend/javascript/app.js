import Vue from 'vue';
import localforage from 'localforage';

import store from './vuex';
import router from './router';
import ApplicationComponent from './components/ApplicationComponent.vue';
// import NavigationComponent from './components/Navigation.vue'


require('../sass/app.sass');

if (module.hot) {
  module.hot.accept();
}

localforage.config({
  driver: localforage.LOCALSTORAGE,
  storeName: 'investor-center',
});

Vue.component('application', ApplicationComponent);
// Vue.component('navigation', NavigationComponent)


window.vm = new Vue({
  el: '#app',
  store,
  router,
});
