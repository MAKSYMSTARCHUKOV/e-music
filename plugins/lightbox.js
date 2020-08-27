import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import LightBox from 'vue-image-lightbox';
import CoolLightBox from 'vue-cool-lightbox';
import VueSlider from 'vue-slider-component';
import MPagination from '~/components/MPagination.vue';

import 'vue-slider-component/theme/antd.css';
require('vue-image-lightbox/dist/vue-image-lightbox.min.css');
require('vue-cool-lightbox/dist/vue-cool-lightbox.min.css');

Vue.use(VueLazyLoad);
Vue.component('light-box', LightBox);
Vue.component('cool-lightbox', CoolLightBox);
Vue.component('vue-slider', VueSlider);

Vue.component('m-pagination', MPagination);
