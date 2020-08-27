<template>
  <v-form class="d-flex flex-wrap">
    <v-select
      :items="city"
      label="Оберіть місто"
      outlined
      item-color="info"
      class="__select mb-5 flex-basis-100 border-radius"
      background-color="#3B3B3B"
      filled
      dark
    ></v-select>
    <input
      type="text"
      class="__input __select mb-5 mr-2 border-radius"
      placeholder="от 1000"
      style="flex-basis: calc(50% - 8px);"
    />
    <input
      type="text"
      class="__input __select mb-5 ml-2 border-radius"
      placeholder="до 8000"
      style="flex-basis: calc(50% - 8px);"
    />
    <v-select
      :items="ganre"
      label="Выберите жанр"
      outlined
      item-color="info"
      class="__select  mb-5 flex-basis-100 border-radius"
      background-color="#3B3B3B"
      filled
      dark
    ></v-select>
    <v-btn color="info" class="flex-basis-100">Найти</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      city: ['Kyiv', 'Dnepr', 'Kharkiv'],
      ganre: ['rock', 'pop', 'soul', 'blues', 'ukulele']
    };
  }
};
</script>

<style lang="scss" scoped>
.__input {
  flex-basis: 50%;
  width: 100%;
}
.v-btn {
  border-radius: 10px !important;
  padding: 16px !important;
}
</style>
