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
      <h6 class="title">{{ $store.state.updateMode === true ? 'Edit category' : groupe.name }}</h6>
    </div>

    <form class="profile-form">
      <div class="card-body">
        <div class="row">
          <div class="form-group mb-3">
            <label class="text-secondary font-w500">
              Groupe Title<span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              v-model="groupe.name"
              :disabled="$store.state.updateMode !== true"
            />
          </div>

         
          <div class="form-group mb-3" v-if="$store.state.updateMode !== true">
            <label class="text-secondary">Created date </label>
            <input
              type="text"
              class="form-control"
              v-model="groupe.created_date"
              disabled
            />
          </div>
        
          <div class="form-group mb-3" v-if="$store.state.updateMode === true">

          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="in_processing"
            @click.prevent="editGroup()"
          >
            <span v-if="!in_processing">Save</span>
            <span
              v-if="in_processing"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>          </div>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { getCookie } from "../../utils/functions";
export default {
  data() {
    return {
      groupe: {
        name: "",
        created_date: ''
      },
        in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,
      error_message: "",
      success_message: "",
    };
  },
  computed: {},
  mounted() {
    const selectedCategory = this.$store.state.selectedProductCategory;
    if (selectedCategory) {
      this.groupe = { ...selectedCategory };
    }
  },
  methods: {
     editGroup() {
      if (
        !this.groupe.name
       
      ) {
        return;
      }

      var data = {
        id: this.groupe.id,
        name: this.groupe.name,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/catalogue/groups/update", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "Groupe edit succesfully"
          }

          setTimeout(() => {
            this.error_message = "";
            this.success_message= ""
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
  },
};
</script>

<style>
.form-control:disabled {
  background: #f1f1f1 !important;
}
</style>