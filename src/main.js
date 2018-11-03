import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

Vue.use(BootstrapVue);

const ParseInstance = require('parse');
ParseInstance.initialize('parse123456');
ParseInstance.serverURL = 'http://127.0.0.1:1337/parse';
window.Parse = ParseInstance;

Vue.config.productionTip = false

Vue.prototype.$moment = (date) => moment(date);

Vue.prototype.user = () => Parse.User.current();
Vue.prototype.isAuth = () => !! Parse.User.current();
Vue.prototype.isGuest = () => ! Parse.User.current();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
