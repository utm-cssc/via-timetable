<template>
  <v-row style="font-size: small">
    <v-col cols="4">
      <v-chip :color="colour">{{ requirement.status }}</v-chip>
    </v-col>
    <v-col>
      <p>
        {{ requirement.desc }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'requirement',
  props: {
    requirement: {
      type: Object,
      desc: String,
      status: String,
      default: () => {},
    },
  },
  computed: {
    colour() {
      return this.requirement.status === 'Done' ? 'green' : 'yellow';
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
}
</style>
