<template>
  <div class="col-xl-12 col-xxl-12">
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
        <h4 class="heading mb-0">
          {{
            $store.state.selectedFaq
              ? "Modifier FAQ"
              : "Ajouter une nouvelle FAQ"
          }}
        </h4>
      </div>
      <div class="card-body" @submit.prevent="submitFAQ()">
        <form class="finance-hr">
          <!-- <div class="form-group mb-3">
            <label> FAQ Title<span class="text-danger">*</span> </label>
            <input
              type="text"
              class="form-control"
              placeholder="FAQ Title"
              v-model="faq.titre"
              required
              @input="validateField('titre')"
            />
            <span class="text-danger">{{ errors.titre }}</span>
          </div> -->

          <div class="form-group mb-3">
            <label> Question<span class="text-danger">*</span> </label>
            <input
              type="text"
              class="form-control"
              placeholder="question"
              v-model="faq.question"
              required
              @input="validateField('question')"
            />
            <span class="text-danger">{{ errors.question }}</span>
          </div>

          <div class="form-group mb-3">
            <label class="form-label">Categorie</label>
            <span class="text-danger">*</span>
            <select
              class="default-select form-control"
              id="validationCustom05"
              v-model="faq.faq_category_id"
              required
              @change="validateField('faq_category_id')"
            >
              <option selected>Please select</option>
              <option
                v-for="faqCat in $store.state.faqCategory"
                :key="faqCat.id"
                :value="faqCat.id"
              >
                {{ faqCat.title }}
              </option>
            </select>
            <span class="text-danger">{{ errors.faq_category_id }}</span>
          </div>

          <div
            class="form-group mb-3"
            v-for="(form, index) in faq.responses"
            :key="index"
          >
            <div class="d-flex justify-content-between w-100">
              <label> Reponse<span class="text-danger">*</span> </label>
              <a
                href="#"
                @click.prevent="removeResponse(index)"
                v-if="faq.responses.length > 1"
              >
                Retirer la reponse
              </a>
            </div>
            <textarea
              name="reponse"
              id=""
              cols="30"
              rows="3"
              class="form-control"
              placeholder="Reponse"
              v-model="form.answer"
              required
              @input="isFieldInvalid(index)"
            ></textarea>

            <span class="text-danger">{{ errors.responses[index] }}</span>
          </div>
          <div class="d-flex justify-content-end">
            <a href="#" class="text-primary" @click.prevent="addResponse">
              + Ajouter une nouvelle reponse
            </a>
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="in_processing"
          >
            <span v-if="!in_processing">Enregistrer</span>
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
import { getCookie } from "../../utils/functions";
import axios from "axios";
export default {
  data() {
    return {
      faq: {
        faq_category_id: "",
        question: "",
        responses: [{ id: "", answer: "" }],
      },

      errors: {
        faq_category_id: "",
        question: "",
        responses: [],
      },
      success_message: "",
      error_message: "",
      in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,
    };
  },
  created() {},

  mounted() {
    const selectedFaq = this.$store.state.selectedFaq;
    if (selectedFaq) {
      this.faq = { ...selectedFaq };
    }
  },

  methods: {
    submitFAQ() {
      if (this.$store.state.selectedFaq === null) {
        this.addQuestion();
      } else {
        this.updateQuestion();
      }
    },
    addResponse() {
      const nouvelleReponse = {};
      this.faq.responses.push(nouvelleReponse);
    },
    removeResponse(index) {
      if (index >= 0 && index < this.faq.responses.length) {
        this.faq.responses.splice(index, 1);
      }
    },
    validateField(fieldName) {
      if (this.faq[fieldName] === "") {
        this.errors[fieldName] = "Field required";
      } else {
        this.errors[fieldName] = "";
      }
    },
    isFieldInvalid(index) {
      if (this.faq.responses[index].answer === "") {
        this.errors.responses[index] = "Field required";
      } else {
        this.errors.responses[index] = "";
      }
    },
    generateId() {
      return Math.floor(Math.random() * 1000);
    },

    addQuestion() {
      if (
        this.faq.question === "" ||
        this.faq.faq_category_id === "" ||
        this.faq.responses === ""
      ) {
        return;
      }
      var data = {
        question: this.faq.question,
        category_id: this.faq.faq_category_id,
        responses: this.faq.responses,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/faq/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "FAQ add successfully !";
            this.$router.push("/faq");
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
    getTitleFromId(categoryId) {
      const category = this.$store.state.faqCategory.find(
        (cat) => cat.id === categoryId
      );
      return category ? category.title : "Category Not Found";
    },
    updateQuestion() {
      if (
        this.faq.question === "" ||
        this.faq.faq_category_id === "" ||
        this.faq.responses === ""
      ) {
        return;
      }
      var data = {
        id: this.faq.id,
        question: this.faq.question,
        category_id: this.faq.faq_category_id,
        responses: this.faq.responses,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/faq/update", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "FAQ update successfully !";
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
