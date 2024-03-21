<template>
<div>
  <div
    v-show="error_message !== ''"
    class="alert alert-danger alert-dismissible fade show"
    role="alert"
  >
    {{ error_message }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    >
      &times;
    </button>
  </div>

  <div class="alert alert-success" role="alert" v-show="success_message !== ''">
    {{ success_message }}
  </div>
  <div class="card profile-card card-bx m-b30">
    <div class="card-header">
      <h6 class="title">
        {{ $store.state.selectedStore ? "Edit Store" : "Add Store" }}
      </h6>
    </div>

    <form class="profile-form" @submit.prevent="submitStore()">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 m-b30">
            <label class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Agence Prestige"
              v-model.trim="store.name"
              required
              @input="validateField('name')"
            />
            <span class="text-danger">{{ errors.name }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Description</label>
            <input
              type="text"
              class="form-control"
              placeholder="Description"
              v-model.trim="store.description"
              required
              @input="validateField('description')"
            />
            <span class="text-danger">{{ errors.description }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Region</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="store.region"
              placeholder="Ex: Littoral"
              @input="validateField('region')"
              required
            />

            <span class="text-danger">{{ errors.region }}</span>
          </div>
           <div class="col-sm-6 m-b30">
            <label class="form-label">Phone</label>
            <input
              type="number"
              class="form-control"
              placeholder="Phone"
              v-model.trim="store.phone"
              required
              @input="validateField('phone')"
            />
            <span class="text-danger">{{ errors.phone }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Longitude</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter store longitude"
              v-model.trim="store.longitude"
              required
              @input="validateField('longitude')"
            />

            <span class="text-danger">{{ errors.longitude }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Latitude</label>
            <input
              type="text"
              placeholder="Enter agence latitude"
              class="form-control"
              v-model.trim="store.latitude"
              required
              @input="validateField('physicalAdress')"
            />

            <span class="text-danger">{{ errors.latitude }}</span>
          </div>
        
         
        </div>
      </div>
      <div class="card-footer">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="in_processing"
        >
          <span v-if="!in_processing">Save</span>
          <span
            v-if="in_processing"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { getCookie } from "../../utils/functions";
import axios from "axios";

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
      errors: {
         name: "",
        region: "",
        longitude: "",
        latitude: "",
        phone: "",
        description: "",
      },
      in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,
      error_message: "",
      selectedAction: "",
      success_message: "",
    };
  },
  computed: {},
  mounted() {
    const selectedStore = this.$store.state.selectedStore;
    if (selectedStore) {
      this.store = { ...selectedStore };
    }
  },
  methods: {
    submitStore() {
      if (this.$store.state.selectedStore === null) {
        this.addStore();
      } else {
        this.updateStore();
      }
    },
    addStore() {
      if (
        this.store.name === "" ||
        this.store.description === "" ||
        this.store.phone === "" ||
        this.store.region === "" ||
        this.store.latitude === "" ||
        this.store.longitude === ""
      ) {
        return;
      }
      var data = {
        name: this.store.name,
        description: this.store.description,
        longitude: this.store.longitude,
        latitude: this.store.latitude,
        phone: this.store.phone.toString(),
        region: this.store.region,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/agences/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.$router.push("/stores");
          }

          setTimeout(() => {
            this.error_message = "";
          }, 3000);
        })
        .catch((error) => {
          this.in_processing = false;
          if (error.response && error.response.status === 500) {
            this.error_message = "An error has occurred.";
          } else if (error.response && error.response.data) {
            this.error_message =
              typeof error.response.data === "string"
                ? error.response.data
                : error.response.data.error;
            if (!this.error_message)
              this.error_message = "An error has occurred.";
          } else {
            this.error_message = "An error has occurred.";
          }
          setTimeout(() => {
            this.error_message = "";
          }, 3000);
        });
    },
    updateStore() {
       if (
        this.store.name === "" ||
        this.store.description === "" ||
        this.store.phone === "" ||
        this.store.region === "" ||
        this.store.latitude === "" ||
        this.store.longitude === ""
      ) {
        return;
      }
      var data = {
        id: this.$store.state.selectedStore.id,
        name: this.store.name,
        description: this.store.description,
        longitude: this.store.longitude,
        latitude: this.store.latitude,
        phone: this.store.phone.toString(),
        region: this.store.region,
      };


      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/agences/update", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "User update successfully !";

            setTimeout(() => {
               this.success_message = "",
               this.$store.commit('setStores', null)
               this.$router.push('/stores')
            }, 3000);
          }
          setTimeout(() => {
            this.success_message = "";
          }, 3000);
          setTimeout(() => {
            this.error_message = "";
          }, 3000);
        })
        .catch((error) => {
          this.in_processing = false;
          if (error.response && error.response.status === 500) {
            this.error_message = "An error has occurred.";
          } else if (error.response && error.response.data) {
            this.error_message =
              typeof error.response.data === "string"
                ? error.response.data
                : error.response.data.error;
            if (!this.error_message)
              this.error_message = "An error has occurred.";
          } else {
            this.error_message = "An error has occurred.";
          }
          setTimeout(() => {
            this.error_message = "";
          }, 3000);
        });
    },

    validateField(fieldName) {
      if (this.store[fieldName] === "") {
        this.errors[fieldName] = "Field required";
      } else {
        this.errors[fieldName] = "";
      }
    },
  },
};
</script>

<style>
.form-control:disabled {
  background: #f1f1f1 !important;
}
</style>