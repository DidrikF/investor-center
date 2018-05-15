import Vue from 'vue';
import localforage from 'localforage';


import FrontpageComponent from './components/Frontpage.vue';


require('../sass/app.sass');

if (module.hot) {
  module.hot.accept();
}

localforage.config({
  driver: localforage.LOCALSTORAGE,
  storeName: 'investor-center',
});

Vue.component('frontpage', FrontpageComponent);
// Vue.component('navigation', NavigationComponent)


window.vm = new Vue({
  el: '#frontpage',
});
