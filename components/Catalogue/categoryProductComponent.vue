<template>

  <div class="col-xl-9 col-xxl-8">
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
    <div class="card">
      <div class="card-body p-0">
        <div
          class="d-flex justify-content-center p-3"
          v-if="catalogueGroupes.length === 0"
        >
          <span>Aucun groupe ajouté.</span>
        </div>
        <div class="table-responsive active-projects manage-client" v-else>
          <div class="tbl-caption">
            <h4 class="heading mb-0">Groupes</h4>
          </div>
          <table id="empoloyees-tbl1" class="table">
            <thead>
              <tr>
                <th>Category Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="group in catalogueGroupes" :key="group.id">
                <td @click="selectProductCategory(group)">
                  <router-link
                    :to="{
                      name: 'catalogueGroupeDetails',
                      params: { id: group.id },
                    }"
                    
                    class="text-primary"
                    >{{ group.name }}
                  </router-link>
                </td>
                <td>
                  <span>--</span>
                </td>

                <td>
                  <div class="dropdown c-pointer">
                    <div class="btn-link" data-bs-toggle="dropdown">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                          stroke="#737B8B"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
                          stroke="#737B8B"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
                          stroke="#737B8B"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <div class="dropdown-menu dropdown-menu-right" style="">
                      <router-link
                        :to="{
                          name: 'productCategoryDetailView',
                          params: { id: group.id },
                        }"
                        @click="editProductCategory(group)"
                        class="dropdown-item"
                      >
                        Edit
                      </router-link>

                      <a
                        class="dropdown-item"
                        href="javascript:void(0);"
                        @click.prevent="deleteCategory(group)"
                        >Delete</a
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getCookie } from "../../utils/functions";
export default {
  data() {
    return {
         in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,
      error_message: "",
      success_message: "",
    };
  },
  created() {},
  computed: {
    catalogueGroupes() {
      return this.$store.state.groupes;
    },
  },
  mounted() {},
  methods: {
    editProductCategory(product) {
      this.$store.commit("setSelectedProductCategory", product);
      this.$store.commit("setUpdateMode", true);
    },
    validateField(fieldName) {
      if (this[fieldName] === "") {
        this.errors[fieldName] = "Field required";
      } else {
        this.errors[fieldName] = "";
      }
    },
    selectProductCategory(product) {
      this.$store.commit("setSelectedProductCategory", product);
      this.$store.commit("setUpdateMode", false);
    },
    deleteCategory(groupe) {
      this.$confirm({
        message: `Are you sure you want to delete this groupe?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: (confirm) => {
          if (confirm) {
            var token = getCookie("token");
            var data = {
              id: groupe.id,
            };
            axios
              .post(this.apiBaseUrl + `/catalogue/groups/delete`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                if (response.status === 200 && response.data.error) {
                  this.error_message = response.data.error;
                } else if (response.status === 200 && !response.data.error) {
                  this.success_message = "Groupe deleted successfully";
                  const faqListe = this.$store.state.groupes;
                  faqListe.splice(groupe, 1);
                  this.catalogueGroupes = faqListe;
                }

                setTimeout(() => {
                  this.success_message = "";
                  this.success_message = "";
                }, 3000);
              })
              .catch((error) => {
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
          }
        },
      });
    },
  },
};
</script>