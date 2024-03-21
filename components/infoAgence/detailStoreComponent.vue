<template>
  <div class="card profile-card card-bx m-b30">
    <div class="card-header">
      <h6 class="title fw-bold">
        {{ store?.name }}
      </h6>
    </div>

    <form class="profile-form">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 m-b30">
            <label class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Agence Prestige"
              v-model.trim="store.name"
              disabled
            />
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Description</label>
           <input type="text" v-model="store.description" class="form-control" disabled>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Region</label>
            <input
              type="text"
              class="form-control"
              placeholder="Monday-Friday"
              v-model.trim="store.region"
              disabled
            />
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Phone</label>
            <input
              type="number"
              placeholder="Cotonou boulevard st michel"
              class="form-control"
              v-model.trim="store.phone"
              disabled
            />
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Longitude</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="store.longitude"
              disabled
            />
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Latitude</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="store.latitude"
              disabled
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      store: {
       name: "",
        region: "",
        longitude: "",
        latitude: "",
        phone: "",
        description: "",
      },

      apiBaseUrl: process.env.VUE_APP_API_URL,
    };
  },
  computed: {},
  mounted() {
    const selectedStore = this.$store.state.selectedStore;
    if (selectedStore) {
      this.store = { ...selectedStore };
    }
  },
  methods: {},
};
</script>
<style scoped>
.form-control:disabled {
  background: #f1f1f1 !important;
}
</style>