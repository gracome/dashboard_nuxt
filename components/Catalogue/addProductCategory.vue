<template>
<div class="col-xl-3 col-xxl-4">
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
  <div >
    <div class="card h-auto">
      <div class="card-header">
        <h4 class="heading mb-0">Add new Catalogue groupe</h4>
      </div>
      <div class="card-body">
        <form class="finance-hr">
          <div class="form-group mb-3">
            <label class="text-secondary font-w500">
              Groupe Title<span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Groupe Title"
              v-model="groupe.name"
              required
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="in_processing"
            @click.prevent="addGroup()"
          >
            <span v-if="!in_processing">Save</span>
            <span
              v-if="in_processing"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getCookie } from "../../utils/functions";
import axios from "axios";
export default {
  data() {
    return {
      groupe: {
        name: "",
        description: "",
       
      },

      in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,
      error_message: "",
      success_message: "",
    };
  },
  computed: {},
  mounted() {
    const selectedProduct = this.$store.state.selectedProduct;
    if (selectedProduct) {
      this.catalogue = { ...selectedProduct };
    }
  },
  methods: {
    

    addGroup() {
      if (
        !this.groupe.name
       
      ) {
        return;
      }

      var data = {
        name: this.groupe.name,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/catalogue/groups/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.$store.dispatch('fetchGroupListe');
            this.success_message = "Groupe added succesfully"
            this.groupe.name = ""
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

    updateCatalogue() {
      if (
        !this.catalogue.name ||
        !this.catalogue.icon ||
        !this.catalogue.catalogue_groups_id ||
        !this.catalogue.calltoaction_text ||
        !this.catalogue.calltoaction_url ||
        !this.catalogue.type ||
        !this.catalogue.is_visible_calltoaction
      ) {
        return;
      }

      var data = {
        id: this.catalogue.id,
        name: this.catalogue.name,
        icon: this.catalogue.icon,
        description: this.catalogue.description,
        calltoaction_text: this.catalogue.calltoaction_text,
        calltoaction_url: this.catalogue.calltoaction_url,
        type: this.catalogue.type,
        group: this.catalogue.catalogue_groups_id,
        is_visible_calltoaction: this.catalogue.is_visible_calltoaction,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/catalogue/update", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "Catalogue update successfully";
          }

          setTimeout(() => {
            this.error_message = "";
            this.success_message = "";
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

