<template>
  <div class="container-fluid">
    <div class="row">
      <addCategoryComp />
      <categorieComponentVue />
    </div>
  </div>
</template>
<script>
import categorieComponentVue from "./categoryProductComponent.vue";
import addCategoryComp from "./addProductCategory.vue";
export default {
  name: "product_CategoryComponent",

  components: {
    categorieComponentVue,
    addCategoryComp,
  },
  created() {},
};
</script>
