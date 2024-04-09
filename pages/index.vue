<template>
  <div id="main-wrapper">
    <headerComponent :user="$store.state.currentUser" />
    <headerControl />
    <sideBarComponentVue />
    <div class="content-body" style="min-height: 738px">
      <pagetitleComponent :pageTitle="'Dashboard'" />

      <div class="container-fluid">
        <analyticsComponentVue />
      </div>
    </div>
    <div class="footer">
      <div class="copyright">
        <p>
          Copyright © Developed by
          <a href="https://dexignzone.com/" target="_blank">DexignZone</a> 2023
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { getCookie } from "../utils/functions";
import axios from "axios";
import sideBarComponentVue from "../components/sideBarComponent.vue";
import headerComponentVue from "../components/HeaderComponent.vue";
import headerControl from "../components/headerControl.vue";
import pagetitleComponent from "../components/pageTitleComponent.vue";
import analyticsComponentVue from "../components/analytics/analyticsComponent.vue";
export default {
  components: {
    sideBarComponentVue,
    headerComponentVue,
    headerControl,
    pagetitleComponent,
    analyticsComponentVue,
  },
  computed: {},
  data() {
    return {
      user_profile: "",
      apiBaseUrl: process.env.VUE_APP_API_URL,
    };
  },
  created() {
    const token = getCookie("token");
    if (token == null) {
      this.$router.push({ path: "/login" });
    }
  },
  mounted() {
    if (getCookie("token")) {
      this.getSelfProfil();
    }
  },
  methods: {
    getSelfProfil() {
      axios
        .post(
          this.apiBaseUrl + "/users/get-profile",
          {},
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
        .then((response) => {
          this.user_profile = response.data;
          this.$store.commit("setCurrentUser", this.user_profile);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
