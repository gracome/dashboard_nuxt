<template>
  <div class="card profile-card card-bx m-b30">
    <div class="card-header">
      <h6 class="title fw-bold">
        {{
          user?.display_name || user?.first_name + " " + user?.last_name
        }}
      </h6>
    </div>

    <form class="profile-form">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 m-b30">
            <label class="form-label">First name</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="user.first_name"
              disabled
            />
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Laste name</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="user.last_name"
              disabled
            />
          </div>
          <div class="col-sm-12 m-b30">
            <label class="form-label">Login</label>
            <input type="text" class="form-control" v-model.trim="user.login" disabled />
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Email address</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="user.email"
              disabled
            />
          </div>
           <div class="col-sm-6 m-b30">
            <label class="form-label">Rôle</label>
            <select
              class="default-select form-control"
              id="validationCustom05"
              v-model.trim="user.role"
              disabled
            >
              <option data-display="Select">Please select</option>
              <option value="superadmin">Super-admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Gender</label>
            <select
              class="default-select form-control"
              id="validationCustom05"
              v-model.trim="user.gender"
              disabled
            >
              <option data-display="Select">Please select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
           <div class="col-sm-6 m-b30">
            <label class="form-label">Phone</label>
            <input type="text" class="form-control" v-model.trim="user.phone" disabled />
          </div>
         
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["userListe", "single"],
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
        role: ""
      },
   
      apiBaseUrl: process.env.VUE_APP_API_URL,
      selectedAction: "",
    };
  },
  computed: {},
  mounted() {
    const selectedUser = this.$store.state.selectedUser;
    if (selectedUser) {
      this.user = { ...selectedUser };
    }
  },
  methods: {},
};
</script>
<style scoped>
.form-control:disabled{
    background: #f1f1f1 !important;
}
</style>