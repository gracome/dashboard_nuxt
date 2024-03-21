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
            <a href="javascript:void(0)">
             Stores
            </a>
          </li>
        </ol>
      </div>

      <div class="container-fluid">
        <storesComponentVue />
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
import storesComponentVue from '../components/infoAgence/storesComponent.vue';
import sideBarComponentVue from "../components/sideBarComponent.vue";
import { getCookie } from "../utils/functions";
export default {

  components: {
    sideBarComponentVue,
    headerComponentVue,
    headerControl,
    storesComponentVue
  },
  computed: {},
  data() {
    return {
      user_profile: "",
    };
  },
  created() {
    const token = getCookie("token");
    if (token == null) {
      this.$router.push({ path: "/login" });
    }else {
      this.$store.dispatch("fetchStores");
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
