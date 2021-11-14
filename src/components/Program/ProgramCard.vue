<template>
<v-container fluid class="myGrid">
      <v-card class="program-description" tile flat :color="bgColor">
        <v-card-text>Insert Description Here</v-card-text>
      </v-card>
      <v-card class="first-year" tile flat  :color="bgColor">
        <v-card-text >First Year</v-card-text>
      </v-card>
      <v-card class="first-year-desc" tile flat  :color="bgColor">
        <v-card-text>Insert First Year Courses here</v-card-text>
      </v-card>
      <v-card class="second-year" tile flat  :color="bgColor">
        <v-card-text>Second Year</v-card-text>
      </v-card>
      <v-card class="second-year-desc"  tile flat  :color="bgColor">
        <v-card-text>Second year Courses here</v-card-text>
      </v-card>
    <v-card class="third-year" tile flat  :color="bgColor">
        <v-card-text>Upper Year</v-card-text>
      </v-card>
      <v-card class="third-year-desc" tile flat  :color="bgColor">
        <v-card-text>Upper Year courses</v-card-text>
      </v-card>
    </v-container>
</template>

<script>
export default {
  name: 'program-card-program-section',
  props: {
    bgColor: String, 
  },
};
</script>
<style scoped>
.myGrid {
  display: grid;
  grid-template-columns: auto 100px auto;
  grid-template-areas: 
    "program-description first-year first-year-desc"
    "program-description second-year second-year-desc"
    "program-description third-year third-year-desc"
    ;
}
.myGrid > * {
  border: 1px solid black !important;
}
.program-description { grid-area: program-description }
.first-year { grid-area: first-year }
.second-year { grid-area: second-year }
.third-year { grid-area: third-year }
.first-year-desc { grid-area: first-year-desc;  }
.second-year-desc { grid-area: second-year-desc }
.third-year-desc { grid-area: third-year-desc }

</style>