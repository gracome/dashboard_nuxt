<template>
  <div class="row">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="heading mb-0">Users</h4>
      <presentation />
    </div>
    <div class="col-xl-12 active-p">
      <userBox :userListe="users" />
    </div>
  </div>
</template>

<script>
import {getCookie} from "../../utils/functions"
import presentation from "./presentationUserComp.vue";
import userBox from "./userBoxComp.vue";
export default {
  name: "User_component",
  components: {
    presentation,
    userBox,
  },
  data() {
    return {
      apiBaseUrl: process.env.VUE_APP_API_URL,
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
  },
  created() {
    if (getCookie("token")) {
      this.$store.dispatch("fetchUsers");
    }
  },
  mounted() {},
  methods: {},
};
</script>