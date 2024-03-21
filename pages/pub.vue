<template>
  <div id="main-wrapper">
    <headerComponentVue :user="$store.state.currentUser" />
    <headerControl />
    <sideBarComponentVue />
    <div class="content-body" style="min-height: 738px">
      <div class="page-titles mb-5">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/users">Apps</router-link>
          </li>
          <li class="breadcrumb-item active">
            <a href="javascript:void(0)"> Publicités </a>
          </li>
        </ol>
      </div>

      <div class="container-fluid">
        <publicityComponentVue />
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
import headerComponentVue from "../components/HeaderComponent.vue";
import headerControl from "../components/headerControl.vue";
import publicityComponentVue from "../components/Publicités/publicityComponent.vue";
import sideBarComponentVue from "../components/sideBarComponent.vue";
import { getCookie } from "../utils/functions";
export default {
  name: "DetailsUserView",

  components: {
    sideBarComponentVue,
    headerComponentVue,
    headerControl,
    publicityComponentVue,
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

    if (token) {
      this.$store.dispatch("fetchPublicity");
    }
  },
  mounted() {
    const token = getCookie("token");
    if (token) {
      this.getSelfProfil();
    }
  },
  methods: {
    getSelfProfil() {
      this.$axios
        .post(
          this.apiBaseUrl + "/users/get-profile",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
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
