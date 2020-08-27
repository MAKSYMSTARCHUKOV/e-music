<template>
  <v-content>
    <Expand :artists="events" />
    <LogoText :content="plainText" />
    <QuickContact />
    <Garantee />
    <Restaurants />
    <Feedback />
    <v-snackbar v-model="snackbar" :bottom="true" color="info" :timeout="5000"
      >{{ $isEmpty(snackMessage) ? 'Неизвестная ошибка' : snackMessage }}
    </v-snackbar>
  </v-content>
</template>

<script>
import { mapState } from 'vuex';
import Expand from '@/components/Expand.vue';
import QuickContact from '@/components/QuickContact.vue';
import Feedback from '@/components/Feedback.vue';
import LogoText from '@/components/LogoText.vue';
import Restaurants from '@/components/Restaurants.vue';
import Garantee from '@/components/Garantee.vue';
export default {
  loading: false,
  components: {
    Expand,
    QuickContact,
    Feedback,
    LogoText,
    Restaurants,
    Garantee
  },
  async asyncData({ app }) {
    let snackMessage = '';
    let snackbar = false;
    const date = new Date().toLocaleDateString();
    let start_date, end_date, arr;
    if (date.includes('/')) {
      arr = date.split('/');
      start_date = `${arr[2]}-${arr[0].padStart(2, '0')}`;
      end_date = `${++arr[2]}-${arr[0].padStart(2, '0')}`;
    } else if (date.includes('.')) {
      arr = date.split('.');
      start_date = `${arr[2]}-${arr[1].padStart(2, '0')}`;
      end_date = `${++arr[2]}-${arr[1].padStart(2, '0')}`;
    }
    if (date.includes('-')) {
      arr = date.split('-');
      start_date = `${arr[0]}-${arr[1].padStart(2, '0')}`;
      end_date = `${++arr[0]}-${arr[1].padStart(2, '0')}`;
    }
    const query = {
      start_date,
      end_date,
      status: 1,
      limit: 12
    };
    let events = [];
    try {
      const ev = await app.$order.getByPeriod(query);
      [...events] = ev.data;
      return {
        events,
        snackbar,
        snackMessage
      };
    } catch (e) {
      if (e.status !== 404) {
        snackbar = true;
        snackMessage = `${e.status} | ${e.data.error ||
          e.data.message ||
          e.data ||
          'Unknown Error'}`;
      }
      return {
        events,
        snackbar,
        snackMessage
      };
    }
  },
  computed: {
    ...mapState(['plainText'])
  },
  head() {
    return {
      title: 'Главная'
    };
  }
};
</script>
