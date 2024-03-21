<template>
 
    <div class="row">
      <faqListeComp />
  </div>
</template>
<script>
import { getCookie } from "../../utils/functions";
import faqListeComp from "./faqListeComp.vue";
export default {
  name: "faqComponent",

  components: {
    faqListeComp,
  },
  created() {},

  mounted(){
    const token = getCookie('token')
    if(token){
      this.$store.dispatch('fetchFaqListe')
    }
  }
};
</script>
