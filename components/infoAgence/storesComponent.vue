<template>
  <div class="row">
    <div class="col-xl-12">
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
      <div class="card">
        <div class="card-body p-0">
          <div v-if="!searchTerm && filterStores().length === 0" class="d-flex justify-content-center p-4">
            <span>Aucun store ajouté pour le moment. Cliquez <router-link to="/add_store" class="text-primary">ici</router-link> pour ajouter</span>
          </div>
          <div class="table-responsive active-projects user-tbl dt-filter" v-else>
            <div class="tbl-caption">
              <h4 class="heading mb-0">Stores</h4>
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
                      ><i class="fa-solid fa-file-excel"></i> Export
                      Report</span
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Region</th>
                  <th>Phone</th>
                  <th>Longitude</th>
                  <th>Latitude</th>
                  <th>Action</th>
                </tr>
              </thead>
              <div
                  class="d-flex justify-content-center p-3"
                  v-if="searchTerm && filterStores().length === 0"
                >
                  <span>Aucun catalogue trouvé pour cette recherche.</span>
                </div>
              <tbody>
                <tr v-for="store in filterStores()" :key="store.id">
                  <td @click="selectStore(store)">
                    <router-link
                      :to="{ name: 'storeDetails', params: { id: store.id } }"
                     
                      class="text-primary"
                    >
                      {{ store.name }}
                    </router-link>
                  </td>
                  <td>
                    <span> {{ store.description }} </span>
                  </td>
                  <td>
                    <span> {{ store.region }} </span>
                  </td>
                   <td>
                    <span> {{ store.phone }} </span>
                  </td>
                  <td>
                    <span> {{ store.longitude }} </span>
                  </td>
                  <td>
                    <span> {{ store.latitude }} </span>
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
                            name: 'add_store',
                            params: { id: store.id },
                          }"
                          
                          class="dropdown-item"
                          > <span @click="editStore(store)">Edit</span> 
                        </router-link>
                        <a
                          class="dropdown-item"
                          href="javascript:void(0);"
                          @click="deleteStore(store)"
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
      apiBaseUrl: process.env.VUE_APP_API_URL,
      selectedUser: null,
      searchTerm: "",
      error_message: "",
      success_message: "",
      in_processing: false,
    };
  },
  computed: {
    storesListe() {
      return this.$store.state.stores;
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return date.toLocaleDateString("fr-FR", options);
    },

    selectStore(store) {
      this.$store.commit("setSelectedStore", store);
      this.$store.commit("setUpdateMode", false);
    },
    editStore(store) {
      this.$store.commit("setUpdateMode", true);
      this.$store.commit("setSelectedStore", store);
    },

    deleteStore(store) {
      this.$confirm({
        message: `Are you sure you want to delete this store?`,
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
              id: store.id,
            };
            axios
              .post(this.apiBaseUrl + `/agences/delete`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                if (response.status === 200 && response.data.error) {
                  this.error_message = response.data.error;
                } else if (response.status === 200 && !response.data.error) {
                  this.success_message = "Store deleted successfully!";
                  const storeListe = this.storesListe;
                  storeListe.splice(store, 1);
                  this.storesListe = storeListe;
                  this.$store.dispatch("fetchStores");
                }
                setTimeout(() => {
                  this.error_message = "";
                  this.success_message = ""
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
    filterStores() {
      const searchTerm = this.searchTerm.toLowerCase();
      if (!searchTerm) {
        return this.storesListe; // Retourne tous les utilisateurs si searchTerm est vide
      } else {
        return this.storesListe.filter((single) => {
          return (
            single.name.toLowerCase().includes(searchTerm) ||
            single.description.toLowerCase().includes(searchTerm) ||
            single.region.toLowerCase().includes(searchTerm) ||
            single.phone.toLowerCase().includes(searchTerm)
          );
        });
      }
    },

    exportToExcel() {
      const storeData = this.filterStores().map((store) => {
        return {
          Name: store.name,
          Description: store.description,
          Phone: store.phone,
          Region: store.region,
          Longitude: store.longitude,
          Latitude: store.latitude,
          Date: this.formatDate(store?.created_date),
        };
      });

      const worksheet = XLSXUtils.json_to_sheet(storeData);
      const workbook = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(workbook, worksheet, "Stores");

      writeXLSXFile(workbook, "stores.xlsx");
    },
  },
};
</script>