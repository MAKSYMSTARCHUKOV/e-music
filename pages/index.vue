<template>
  <div></div>
</template>

<script>
export default {
  asyncData({ redirect }) {
    redirect({ name: 'artists' });
  }
};
</script>
