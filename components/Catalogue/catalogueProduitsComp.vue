<template>
  <div class="row">
    <div class="col-xl-12">
      <div
        class="alert alert-success"
        role="alert"
        v-show="success_message !== ''"
      >
        {{ success_message }}
      </div>
      <div class="card">
        <div class="card-body p-0">
          <div
            class="d-flex justify-content-center p-3"
            v-if="!searchTerm && filterCatalogue().length === 0"
          >
            <span
              >Aucun catalogue ajouté. Cliquez
              <router-link to="/add_catalogue" class="text-primary fw-bold"
                >ici</router-link
              >
              pour ajouter</span
            >
          </div>

          <div
            class="table-responsive active-projects user-tbl dt-filter"
            v-else
          >
            <div class="tbl-caption">
              <h4 class="heading mb-0">Catalogues</h4>
            </div>
            <div id="user-tbl_wrapper" class="dataTables_wrapper no-footer">
              <div class="dt-buttons">
                <button
                  class="dt-button buttons-excel buttons-html5 btn btn-sm border-0"
                  tabindex="0"
                  aria-controls="user-tbl"
                  type="button"
                  @click="exportToExcel"
                >
                  <span
                    ><i class="fa-solid fa-file-excel"></i> Export Report</span
                  >
                </button>
              </div>
              <div id="user-tbl_filter" class="dataTables_filter">
                <label>
                  <i class="fa-solid fa-magnifying-glass"></i
                  ><input
                    type="search"
                    class=""
                    placeholder="Search..."
                    aria-controls="user-tbl"
                    v-model="searchTerm"
                /></label>
              </div>
              <table id="empoloyees-tblwrapper" class="table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Groupe</th>
                    <th>Texte du bouton</th>
                    <th>Url du bouton</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <div
                  class="d-flex justify-content-center p-3"
                  v-if="searchTerm && filterCatalogue().length === 0"
                >
                  <span>Aucun catalogue trouvé pour cette recherche.</span>
                </div>
                <tbody v-else>
                  <tr v-for="product in filterCatalogue()" :key="product.id">
                    <td>
                      <span class="catalogue_icon rounded"
                        ><i :class="product.icon"></i
                      ></span>
                    </td>
                    <td @click.prevent="setProduct(product)">
                      <router-link
                        class="text-primary"
                        :to="{
                          name: 'add_catalogue',
                          params: { id: product.id },
                        }"                       
                      >
                        {{ product.name }}
                      </router-link>
                    </td>
                    <td>
                      <span>{{ product.description }}</span>
                    </td>
                    <td>
                      <span>{{ product.type }}</span>
                    </td>

                    <td>
                      <span>{{
                        getGroupNameById(product.catalogue_groups_id)
                      }}</span>
                    </td>
                    <td>
                      <span> {{ product.calltoaction_text }} </span>
                    </td>
                    <td>
                      <span>{{ product.calltoaction_url }}</span>
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
                              name: 'add_Product',
                              params: { id: product.id },
                            }"
                            @click="setProduct(product)"
                            class="dropdown-item"
                          >
                            Edit
                          </router-link>

                          <a
                            class="dropdown-item"
                            href="javascript:void(0);"
                            @click.prevent="deleteCatalogue(product)"
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
    </div>
  </div>
</template>

<script>
import { getCookie } from "../../utils/functions";
import { utils as XLSXUtils, writeFile as writeXLSXFile } from "xlsx";

import axios from "axios";
export default {
  data() {
    return {
      success_message: "",
      error_message: "",
      apiBaseUrl: process.env.VUE_APP_API_URL,
      searchTerm: "",
    };
  },
  computed: {
    catalogues() {
      return this.$store.state.catalogues;
    },
  },
  methods: {
    setProduct(product) {
      this.$store.commit("setSelectedProduct", product);
    },

    getGroupNameById(groupId) {
      for (let i = 0; i < this.$store.state.groupes.length; i++) {
        if (this.$store.state.groupes[i].id === groupId) {
          // Retourner le nom du groupe lorsque l'ID correspond
          return this.$store.state.groupes[i].name;
        }
      }
      // Retourner null si aucun groupe ne correspond à l'ID donné
      return null;
    },
    deleteCatalogue(catalogue) {
      this.$confirm({
        message: `Are you sure you want to delete this catalogue`,
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
              id: catalogue.id,
            };
            axios
              .post(this.apiBaseUrl + `/catalogue/delete`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                if (response.status === 200 && response.data.error) {
                  this.error_message = response.data.error;
                } else if (response.status === 200 && !response.data.error) {
                  this.success_message = "Catalgue delete successfully";
                  let productListe = this.catalogues;
                  productListe.splice(catalogue, 1);
                  this.catalogues = productListe;
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
    filterCatalogue() {
      const searchTerm = this.searchTerm.toLowerCase();
      if (!searchTerm) {
        return this.catalogues; // Retourne tous les utilisateurs si searchTerm est vide
      } else {
        return this.catalogues.filter((product) => {
          return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm) ||
            this.getGroupNameById(product.catalogue_groups_id)
              .toLowerCase()
              .includes(searchTerm)
          );
        });
      }
    },
    exportToExcel() {
      const catalogueData = this.filterCatalogue().map((product) => {
        return {
          Name: product.name,
          Icon: product.icon,
          Description: product.description,
          Type: product.type,
          Calltoaction_url: product.calltoaction_url,
          Calltoaction_text: product.calltoaction_text,
          Groupe: this.getGroupNameById(product.catalogue_groups_id),
          Date: this.formatDate(product?.created_date),
        };
      });

      const worksheet = XLSXUtils.json_to_sheet(catalogueData);
      const workbook = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(workbook, worksheet, "Catalogue");

      writeXLSXFile(workbook, "catalogues.xlsx");
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return date.toLocaleDateString("fr-FR", options);
    },
  },
};
</script>

<style>
.catalogue_icon {
  background: #f1f1f1;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>