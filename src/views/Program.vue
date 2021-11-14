<template>
<v-row >
      <program-card bgColor=orange />
</v-row>
</template>
<script>
import ProgramCard from '../components/Program/ProgramCard.vue';

export default {
  components: {
    ProgramCard,
  },
  computed: {
    contentHeight() {
      return `height: ${window.innerHeight - 110}px`;
    },
    imgWidth() {
      return window.innerWidth * 0.6;
    },
  },
};
</script>
