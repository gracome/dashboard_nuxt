<template>
  <div id="main-wrapper">
    <headerComponentVue :user="$store.state.currentUser"></headerComponentVue>
    <headerControl></headerControl>
    <sideBarComponentVue></sideBarComponentVue>
    <div class="content-body" style="min-height: 738px">
      <pageTitleComponentVue :pageTitle="'Groupes'" />

      <div class="container-fluid">
        <categorieComponentVue />
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
import pageTitleComponentVue from "../components/pageTitleComponent.vue";
import sideBarComponentVue from "../components/sideBarComponent.vue";
import { getCookie } from "../utils/functions";
import categorieComponentVue from "../components/Catalogue/productCategoryComponent.vue";
export default {
  components: {
    headerControl,
    headerComponentVue,
    sideBarComponentVue,
    pageTitleComponentVue,
    categorieComponentVue,
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
    } else {
      this.$store.dispatch("fetchCatalogue");
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
