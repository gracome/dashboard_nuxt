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

    <div
      class="alert alert-success"
      role="alert"
      v-show="success_message !== ''"
    >
      {{ success_message }}
    </div>
    <div class="card h-auto">
      <div class="card-header">
        <h4 class="heading mb-0">Add new FAQ category</h4>
      </div>
      <div class="card-body" @submit.prevent="addCategory()">
        <form class="finance-hr">
          <div class="form-group mb-3">
            <label class="text-secondary font-w500">
              Category Title<span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Account Title"
              required
              v-model.trim="faqCategory.title"
              @input="validateField('title')"
            />
            <span class="text-danger">{{ errors.title }}</span>
          </div>

          <div class="form-group mb-3">
            <label class="text-secondary">Description </label>
            <input
              type="text"
              class="form-control"
              placeholder="Industrial and Commercial Bank of China Limited"
              v-model.trim="faqCategory.description"
            />
          </div>
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getCookie } from "../../utils/functions";
export default {
  data() {
    return {
      faqCategory: {
        title: "",
        description: "",
      },

      errors: {
        title: "",
        description: "",
      },
      success_message: "",
      error_message: "",
      in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,

    };
  },
  created() {},
  mounted() {},
  methods: {
    validateField(fieldName) {
      if (this.faqCategory[fieldName] === "") {
        this.errors[fieldName] = "Field required";
      } else {
        this.errors[fieldName] = "";
      }
    },
    addCategory() {
      if (
        this.faqCategory.title === "" 
      ) {
        return;
      }
      var data = {
        title: this.faqCategory.title,
        description: this.faqCategory.description,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/faq/category/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "Category add successfully !";
            this.$store.dispatch('fetchFaqCategory')
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