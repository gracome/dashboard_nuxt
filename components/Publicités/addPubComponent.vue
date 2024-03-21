<template>
  <div class="row">
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
    <div class="col-xl-12">
      <div class="filter cm-content-box box-primary mb-5">
        <div class="content-title">
          <div class="cpa">
            <i
              class="fa-duotone fa-plus me-1"
              v-if="!$store.state.selectedPub"
            ></i>
            <i class="fa-regular fa-pen-to-square me-1" v-else> </i>
            {{ $store.state.selectedPub ? "Modifier pub" : "Ajouter pub" }}
          </div>
        </div>
        <div class="cm-content-body form excerpt">
          <div class="card-body">
            <div class="row align-items-center p-3">
              <div class="col-xl-12 col-xxl-12 mb-xl-5 mb-3">
                <label for="name">Titre <span class="required">* </span></label>
                <input
                  type="text"
                  placeholder="Title"
                  class="form-control"
                  v-model="pub.title"
                  required
                />
              </div>
              <div class="col-xl-12 col-xxl-12 mb-xl-0 mb-3">
                <label for="name">Description</label>
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Description"
                  class="form-control"
                  v-model="pub.content"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="filter cm-content-box box-primary mb-5">
        <div class="cm-content-body form excerpt">
          <div class="card-body">
            <div class="row align-items-center p-3">
              <div class="col-xl-12 col-xxl-12 mb-xl-3 mb-3">
                <label for="name">Image de la bannière</label>
                <div class="image-preview border p-5 rounded mb-2">
                  <img
                    :src="
                      'https://intern-dev.kamgoko.com/m-api-portal/' + pub.media
                    "
                    v-if="pub.media"
                  />
                  <img :src="pub.file" v-else />
                </div>
                <div class="d-flex justify-content-end">
                  <a
                    v-if="pub.file || pub.media"
                    href="#"
                    class="text-primary"
                    @click.prevent="resetFileAndMedia()"
                    >- retirer l'image</a
                  >
                  <a
                    v-else
                    href="#"
                    class="text-primary"
                    @click.prevent="uploadFeaturePictures"
                    >+ ajouter une image</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter cm-content-box box-primary mb-5">
        <div class="cm-content-body form excerpt">
          <div class="card-body">
            <div class="row align-items-center p-3">
              <div class="form-group mb-3">
                <label>Text du bouton </label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Voir plus"
                    v-model="pub.calltoaction_text"
                  />
                </div>
              </div>
              <div class="form-group mb-3">
                <label>Url du bouton </label>
                <div class="input-group">
                  <input
                    type="url"
                    class="form-control"
                    placeholder="https://exemple.com/pub"
                    v-model="pub.calltoaction_url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter cm-content-box box-primary mb-5">
        <div class="cm-content-body form excerpt">
          <div class="card-body">
            <div class="row align-items-center p-3">
              <div class="form-group mb-3">
                <label> Date de debut<span class="text-danger">*</span> </label>
                <div class="input-group">
                  <input
                    type="datetime-local"
                    class="form-control"
                    :min="currentDateTime"
                    v-model="pub.validity_start"
                    @change="validateDates"
                  />
                </div>
              </div>
              <div class="form-group mb-5">
                <label>Date de Fin <span class="text-danger">*</span> </label>
                <div class="input-group mb-2">
                  <input
                    type="datetime-local"
                    class="form-control"
                    :min="currentDateTime"
                    v-model="pub.validity_end"
                    @change="validateDates"
                  />
                </div>
                <span v-if="dateError" class="text-danger"
                  >La date de fin doit être supérieur à la date de
                  début.</span
                >
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="in_processing"
                  @click.prevent="submitPub()"
                >
                  <span v-if="!in_processing">Sauvegarder</span>
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
        </div>
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
      pub: {
        title: "",
        validity_start: "",
        validity_end: "",
        file: null,
        content: "",
        media: "",
        calltoaction_url: "",
        calltoaction_text: "",
      },

      featuredPicture: null,
      in_processing: false,
      error_message: "",
      success_message: "",
      apiBaseUrl: process.env.VUE_APP_API_URL,
      dateError: false,
    };
  },
  computed: {
    currentDateTime() {
      return new Date().toISOString().slice(0, 16);
    },
  },

  mounted() {
    const selectedUser = this.$store.state.selectedPub;
    if (selectedUser) {
      this.pub = { ...selectedUser };
      this.pub.validity_start = this.formatDateTime(this.pub?.validity_start);
      this.pub.validity_end = this.formatDateTime(this.pub?.validity_end);
    }
  },
  methods: {
    submitPub() {
      if (this.$store.state.selectedPub === null) {
        this.addPub();
      } else {
        this.editPub();
      }
    },
    uploadFeaturePictures() {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.multiple = false;
      fileInput.style.display = "none";
      fileInput.addEventListener("change", this.handleFeaturedFileInput);
      document.body.appendChild(fileInput);
      fileInput.click();
    },

    handleFeaturedFileInput(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.pub.file = e.target.result;
        };

        reader.readAsDataURL(file);
      }

      event.target.remove();
    },
    resetFileAndMedia() {
      this.pub.file = null;
      this.pub.media = null;
    },
    addPub() {
      if (
        this.pub.title === "" ||
        this.pub.validity_end === "" ||
        this.pub.validity_start === "" ||
        this.pub.file === ""
      ) {
        return;
      }
      var data = {
        title: this.pub.title,
        validity_start: this.pub.validity_start,
        validity_end: this.pub.validity_end,
        file: this.pub.file,
        content: this.pub.content,
        calltoaction_url: this.pub.calltoaction_url,
        calltoaction_text: this.pub.calltoaction_text,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/advertisement/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.$router.push("/pub");
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
    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
    editPub() {
      if (
        this.pub.title === "" ||
        this.pub.validity_end === "" ||
        this.pub.validity_start === "" ||
        this.pub.file === "" ||
        this.pub.content === "" ||
        this.pub.calltoaction_url === "" ||
        this.pub.calltoaction_text === ""
      ) {
        return;
      }
      var data = {
        id: this.pub.id,
        title: this.pub.title,
        validity_start: this.pub.validity_start,
        validity_end: this.pub.validity_end,
        file: this.pub.file,
        content: this.pub.content,
        calltoaction_url: this.pub.calltoaction_url,
        calltoaction_text: this.pub.calltoaction_text,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/advertisement/update", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "Pub update suuceesfully !";
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
    validateDates() {
      if (
        new Date(this.pub.validity_end) <= new Date(this.pub.validity_start)
      ) {
        this.dateError = true;
      } else {
        this.dateError = false;
      }
    },
  },
};
</script>

<style scoped>
.image-preview {
  display: flex;
  flex-wrap: wrap;
}

.image-preview img {
  width: 100%;
}

.image-featured img {
  max-width: 100px;
  max-height: 300px;
}
</style>