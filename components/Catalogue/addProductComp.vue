<template>
  <div class="row">
    <div class="col-xl-9">
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
      <div class="filter cm-content-box box-primary mb-5">
        <div class="content-title">
          <div class="cpa">
            <span v-if="$store.state.selectedProduct">
              <i class="fa-regular fa-pen-to-square me-1"></i> Edit catalogue
            </span>
            <span v-else>
              <i class="fa-duotone fa-plus me-1"></i>Add New catalogue
            </span>
          </div>
        </div>
        <div class="cm-content-body form excerpt">
          <div class="card-body">
            <div class="row align-items-center p-3">
              <div class="col-xl-12 col-xxl-12 mb-xl-0 mb-3">
                <label for="name">Title <span class="required">* </span></label>
                <input
                  type="text"
                  placeholder="Catalogue title"
                  class="form-control"
                  required
                  v-model="catalogue.name"
                />
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
                <label for="name">Description</label>
                <textarea
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Catalogue description"
                  class="form-control"
                  v-model="catalogue.description"
                ></textarea>
              </div>

              <div class="form-group mb-3">
                <label> Icon<span class="text-danger">*</span> </label>
                <input
                  type="texte"
                  class="form-control"
                  placeholder="fa fa-yellow"
                  v-model="catalogue.icon"
                />
                <span>Rendez vous sur ce <a href="https://fontawesome.com/icons" class="text-primary" target="_blank">lien</a> pour choisir l'icon correspondant. Copier uniquement le nom de la class </span>
              </div>
              <div class="form-group mb-3">
                <label>URL<span class="text-danger">*</span> </label>
                <input
                  type="text"
                  class="form-control"
                  required
                  placeholder="https://www.example/catalogue"
                  v-model="catalogue.calltoaction_url"
                />
              </div>
              <div class="form-group mb-3">
                <label
                  >Texte du bouton<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Voir plus"
                  required
                  v-model="catalogue.calltoaction_text"
                />
              </div>
              <div class="form-group mb-5">
                <label for="available"
                  >Visisble <span class="text-danger">*</span>
                </label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    value="true"
                    v-model="catalogue.is_visible_calltoaction"
                  />
                  <label class="form-check-label"> Oui </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    value="false"
                    v-model="catalogue.is_visible_calltoaction"
                  />
                  <label class="form-check-label"> Non </label>
                </div>
              </div>
              <div>
                <button
                  class="btn btn-primary btn-block"
                  :disabled="in_processing"
                  @click.prevent="submitCatalogue()"
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
        </div>
      </div>
    </div>
    <div class="col-xl-3">
      <div class="filter cm-content-box box-primary mb-5">
        <div class="content-title">
          <div class="cpa text-secondary">
            Types <span class="text-danger">*</span>
          </div>
        </div>
        <div class="cm-content-body form excerpt">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-xl-12 col-xxl-12 mb-xl-0 mb-3">
                <div class="form-group">
                  <div class="form-check" v-for="type in types" :key="type.id">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="flexCheckDefault"
                      :value="type.title"
                      v-model="catalogue.type"
                      :checked="catalogue.type.includes(type.title)"
                      :name="'typeRadio'"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      {{ type.title }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter cm-content-box box-primary mb-5">
        <div class="content-title">
          <div class="cpa text-secondary">
            Groupe <span class="text-danger">*</span>
          </div>
        </div>
        <div class="cm-content-body form excerpt">
          <div class="card-body border-bottom">
            <div class="row align-items-center">
              <div class="col-xl-12 col-xxl-12 mb-xl-0 mb-3">
                <div class="form-group">
                  <div
                    class="form-check"
                    v-for="groupe in $store.state.groupes"
                    :key="groupe.id"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      id="flexCheckDefault"
                      :value="groupe.id"
                      v-model="catalogue.catalogue_groups_id"
                      :checked="
                        catalogue.catalogue_groups_id.includes(groupe.id)
                      "
                      :name="'brandRadio'"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      {{ groupe.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-end">
              <router-link to="/catalogue_groupe" class="text-primary">
                + add new groupe</router-link
              >
            </div>
          </div>
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
      imagePreviews: [],
      featuredPicture: null,
      catalogue: {
        name: "",
        description: "",
        icon: "",
        catalogue_groups_id: "",
        type: "",
        calltoaction_url: "",
        calltoaction_text: "",
        is_visible_calltoaction: "",
      },
      types: [
        { id: 1, title: "Offres" },
        { id: 2, title: "MOOV SVA" },
        { id: 3, title: "Services" },
        { id: 4, title: "Applications" },
        { id: 5, title: "Produits" },
      ],
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

    submitCatalogue(){
     
      if (this.$store.state.selectedProduct === null) {
        this.addCatalogue();
      } else {
        this.updateCatalogue();
      }
    },

    addCatalogue() {
      console.log("object");
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
        .post(this.apiBaseUrl + "/catalogue/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.$router.push("/catalogues");
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
            this.success_message = "Catalogue update successfully"
          }

          setTimeout(() => {
            this.error_message = "";
            this.success_message = ""
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

<style scoped>
.image-preview {
  display: flex;
  flex-wrap: wrap;
}

.image-preview img {
  max-width: 200px;
  max-height: 200px;
  margin: 10px;
}

.image-featured img {
  max-width: 100px;
  max-height: 300px;
}
</style>