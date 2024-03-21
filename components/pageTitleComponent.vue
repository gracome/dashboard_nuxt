<template>
  <div class="page-titles mb-5">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"> <router-link to="/users">Apps</router-link></li>
      <li class="breadcrumb-item active">
        <a href="javascript:void(0)">{{pageTitle}}</a>
      </li>
    </ol>
  </div>
</template>
<script>

export default {
  props: ['pageTitle'],
  data() {
    return{

    }
  },
}
</script>
