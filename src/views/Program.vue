<template>
<v-list
style="max-height: 1000px; padding: 100px; margin-top:15px"
class="overflow-y-auto"
>
      <program-card bgColor=orange />
       <program-card bgColor=orange />
        <program-card bgColor=orange />
         <program-card bgColor=orange />
          <program-card bgColor=orange />
               <program-card bgColor=orange />
</v-list>
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
