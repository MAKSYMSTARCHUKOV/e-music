<template>
  <v-content>
    <LogoText :content="plainText" />
    <Feedback />
    <ImgText :content="sampleWithImage" />
    <QuickContact />
  </v-content>
</template>

<script>
import { mapState } from 'vuex';
import LogoText from '@/components/LogoText.vue';
import ImgText from '@/components/ImgText.vue';
import Feedback from '@/components/Feedback.vue';
import QuickContact from '@/components/QuickContact.vue';
export default {
  components: {
    LogoText,
    ImgText,
    Feedback,
    QuickContact
  },
  computed: {
    ...mapState(['plainText', 'sampleWithImage'])
  },
  head() {
    return {
      title: 'О проекте'
    };
  }
};
</script>

<style lang="scss" scoped></style>
