<template>
  <div id="main-wrapper">
    <headerComponent :user="$store.state.currentUser" />
    <headerControl />
    <sideBarComponentVue />
    <div class="content-body" style="min-height: 738px">
      <div class="page-titles mb-5">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/catalogues">Catalogue</router-link>
          </li>
          <li class="breadcrumb-item active">
            <a href="javascript:void(0)">
              {{ $store.state.selectedProductCategory.name }}
            </a>
          </li>
        </ol>
      </div>
      <div class="container-fluid">
        <productCategoryDetailVue />
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
import productCategoryDetailVue from '../components/Catalogue/productCategoryDetail.vue';
export default {

  components: {
    headerControl,
    headerComponentVue,
    sideBarComponentVue,
    productCategoryDetailVue,
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
    this.getSelfProfil()
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
