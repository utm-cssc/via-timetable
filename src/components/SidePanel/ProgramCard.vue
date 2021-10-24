<template>
  <v-expansion-panel
    style="min-width: 98%; border-radius: 5px !important"
    class="mb-1"
  >
    <v-expansion-panel-header
      class="pa-0 pr-2"
      style="
        max-height: 50px !important;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      "
    >
      <div
        class="mr-3 card-header"
        :style="`background-color: ${program.color};  border-top-left-radius: 5px; border-bottom-left-radius: 5px;`"
      >
        <p></p>
      </div>
      <div style="color: #474747">
        <h3>{{ program.name }} ({{ program.programCode }}) 50%</h3>
      </div>
      <v-spacer />
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <hr class="mb-1" />
      <div class="pa-3">
        <v-row>
          <div style="font-size: 15px">Requirements:</div>
          <v-row
            v-for="requirement in program.requirements"
            :key="`${requirement.desc}`"
            style="font-size: small"
          >
            <v-col cols="3">
              <v-chip color="yellow">IPR</v-chip>
            </v-col>
            <v-col >
              <p>
                {{ requirement.desc }}
              </p>
            </v-col>
          </v-row>
        </v-row>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'program-card',
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
