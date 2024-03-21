<template>
  <div id="main-wrapper">
    <headerComponent :user="$store.state.currentUser" />
    <headerControl />
    <sideBarComponentVue />
    <div class="content-body" style="min-height: 738px">
      <div class="page-titles">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/faq">Faq</router-link>
          </li>
          <li class="breadcrumb-item active">
            <a href="javascript:void(0)">
              {{ $store.state.selectedFaq.question }}
            </a>
          </li>
        </ol>
      </div>

      <div class="container-fluid">
        <faqDetailsComponentVue />
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
import sideBarComponentVue from "../components/sideBarComponent.vue";
import { getCookie } from "../utils/functions";
import faqDetailsComponentVue from "../components/FAQ/faqDetailsComponent.vue";
export default {
  name: "DetailsFaqView",

  components: {
    headerControl,
    headerComponentVue,
    sideBarComponentVue,
    faqDetailsComponentVue,
  },
  computed: {
    selectedAction() {
      return this.$store.getters.getSelectedAction;
    },
  },
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
