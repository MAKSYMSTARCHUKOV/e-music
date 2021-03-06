import Vue from 'vue';
import MForm from '~/components/Form/MForm.vue';
import MFormComponent from '~/components/Form/MFormComponent.vue';
import MText from '~/components/Form/MText.vue';
import WhiteLayer from '@/components/Layer/WhiteLayer.vue';
import WhiteHeader from '@/components/Layer/WhiteHeader.vue';
import WithHeader from '@/components/Layer/WithHeader.vue';
import IconText from '@/components/Text/IconText.vue';
import MCard from '@/components/Card/MCard.vue';
import MChip from '@/components/Card/MChip.vue';
import MCalendar from '@/components/MCalendar.vue';
import ComponentLoading from '@/components/ComponentLoading.vue';
import CloseButton from '@/components/CloseButton.vue';
import Breadcrumps from '@/components/Breadcrumps.vue';

Vue.component('m-form', MForm);
Vue.component('m-form-component', MFormComponent);
Vue.component('m-text', MText);
Vue.component('white-layer', WhiteLayer);
Vue.component('white-header', WhiteHeader);
Vue.component('w-header', WithHeader);
Vue.component('i-text', IconText);
Vue.component('m-card', MCard);
Vue.component('m-chip', MChip);
Vue.component('m-calendar', MCalendar);
Vue.component('m-loading', ComponentLoading);
Vue.component('m-close', CloseButton);
Vue.component('m-breadcrumps', Breadcrumps);
