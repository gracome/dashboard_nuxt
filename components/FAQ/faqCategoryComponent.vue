<template>
  <div class="container-fluid">
    <div class="row">
         <addCategoryComp />
      <categorieComponentVue />
     
    </div>
  </div>
</template>
<script>
import categorieComponentVue from './categorieComponent.vue';
import addCategoryComp from './addCategoryComp.vue'
export default {
  name: "faq_CategoryComponent",

  components: {
    categorieComponentVue,
    addCategoryComp
  },
  created() {},
};
</script>
