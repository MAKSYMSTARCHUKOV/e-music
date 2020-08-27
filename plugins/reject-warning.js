import Vue from 'vue';

Vue.prototype.$reject = (e) => {
  e.target.parentElement.classList.remove('incorrect');
};
