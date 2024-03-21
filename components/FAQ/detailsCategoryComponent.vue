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
        {{ $store.state.updateMode === true ? "Edit category" : faq.title }}
      </h6>
    </div>

    <form class="profile-form" @submit.prevent="EditCategory()">
      <div class="card-body">
        <div class="row">
          <div class="form-group mb-3">
            <label class="text-secondary font-w500">
              Category Title<span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              v-model="faq.title"
              :disabled="$store.state.updateMode !== true"
              required
              @input="validateField('title')"
            />
            <span class="text-danger">{{ errors.title }}</span>
          </div>
          <div class="form-group mb-3">
            <label class="text-secondary">Slug </label>
            <input
              type="text"
              class="form-control"
              v-model="faq.slug"
              disabled
            />
          </div>
          <div class="form-group mb-3">
            <label class="text-secondary">Description </label>
            <input
              type="text"
              class="form-control"
              v-model="faq.description"
              :disabled="$store.state.updateMode !== true"
            />
          </div>

          <div class="form-group mb-3" v-if="$store.state.updateMode === true">
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
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { getCookie } from "../../utils/functions";

export default {
  data() {
    return {
      faq: {
        id: "",
        title: "",
        description: "",
      },
      errors: {
        id: "",
        title: "",
        description: "",
      },
      success_message: "",
      error_message: "",
      in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,
    };
  },
  computed: {},
  mounted() {
    const selectedCategory = this.$store.state.selectedFaqCategory;
    if (selectedCategory) {
      this.faq = { ...selectedCategory };
    }
  },
  methods: {
    EditCategory() {
      if (this.faq.title === "") {
        return;
      }
      var data = {
        id: this.faq.id,
        title: this.faq.title,
        description: this.faq.description,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/faq/category/update", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "Category edit successfully !";
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
    validateField(fieldName) {
      if (this.faq[fieldName] === "") {
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