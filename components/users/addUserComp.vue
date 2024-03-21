<template>
  <div class="row" >
    <div class="col-xl-3 col-lg-4" v-if="this.$store.state.selectedUser">
        <profileUser :user="this.$store.state.selectedUser" />
    </div>
    <div class="col-xl-9 col-lg-8">
        <accountUser />
    </div>
  </div>
</template>
<script>
import profileUser from "./profileUserComp.vue";
import accountUser from "./accountUserComp.vue"
export default {
  name: "addUser_component",
  components: {
    profileUser,
    accountUser
  },
};
</script>