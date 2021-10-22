<template>
  <v-expansion-panel
    style="min-width: 98%; border-radius: 5px !important;"
    class="mb-1"
  >
    <v-expansion-panel-header
      class="pa-0 pr-2"
      style="max-height: 50px !important; border-top-left-radius: 5px; border-bottom-left-radius: 5px;"
    >
      <div
        class="mr-3 card-header"
        :style="
          `background-color: ${program.color};  border-top-left-radius: 5px; border-bottom-left-radius: 5px;`
        "
      >
        <p></p>
      </div>
      <div style="color: #474747">
        <h3>{{ program.programCode }}</h3>
      </div>
      <v-spacer />
    </v-expansion-panel-header>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'program-card',
  components: {
  },
  props: {
    program: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
}
.card-header {
  max-width: 20px;
  min-width: 20px;
  height: 50px;
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 50px !important;
}
</style>
