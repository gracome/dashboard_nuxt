<template>
<div>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h5 class="mb-0">Publicités </h5>
    <div class="d-flex align-items-center">
      <router-link to="/add_pub" class="btn btn-primary btn-sm ms-2">
        + Ajouter 
      </router-link>
    </div>
  </div>
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
  <div class="row">
    <div class="col-xl-12">
      <div class="card">
        <div class="card-body p-0">
          <div
            v-if="!searchTerm && filterPublicity().length === 0"
            class="d-flex justify-content-center p-4"
          >
            <span
              >Aucune publicité ajouté pour le moment. Cliquez
              <router-link to="/add_pub" class="text-primary">ici</router-link>
              pour ajouter</span
            >
          </div>
          <div class="table-responsive active-projects user-tbl dt-filter" v-else>
            <div class="tbl-caption">
              <h4 class="heading mb-0">Publicités</h4>
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
                  <th>Tire </th>
                  <th>Description</th>
                  <th>Date de debut</th>
                  <th>Date de fin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <div
                  class="d-flex justify-content-center p-3"
                  v-if="searchTerm && filterPublicity().length === 0"
                >
                  <span>Aucune publicité trouvé pour cette recherche.</span>
                </div>
              <tbody v-else>
                <tr v-for="pub in filterPublicity()" :key="pub.id">
                  <td  @click="selectPub(pub)">
                    <router-link
                      class="text-primary"
                      :to="{ name: 'add_pub', params: { id: pub.id } }"
                     
                    >
                      {{ pub.title }}
                    </router-link>
                  </td>
                  <td>
                    <span> {{ pub.content }} </span>
                  </td>
                  <td>
                    <span> {{ formatDate(pub.validity_start) }} </span>
                  </td>
                  <td>
                    <span>{{ formatDate(pub.validity_end) }}</span>
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
                        <a
                          class="dropdown-item"
                          href="javascript:void(0);"
                          @click.prevent="editPub(pub)"
                          >Modifier</a
                        >
                        <a
                          class="dropdown-item"
                          href="javascript:void(0);"
                          @click.prevent="deletePub(pub)"
                        >
                          Supprimer
                        </a>
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
    publicity() {
      return this.$store.state.publicity;
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return date.toLocaleDateString("fr-FR", options);
    },

    selectPub(pub) {
      this.$store.commit("setSelectedPub", pub);
    },
    editStore(store) {
      this.$store.commit("setUpdateMode", true);
      this.$store.commit("setSelectedStore", store);
    },

    deletePub(pub) {
      this.$confirm({
        message: `Are you sure you want to delete this Pub?`,
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
              id: pub.id,
            };
            axios
              .post(this.apiBaseUrl + `/advertisement/delete`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                if (response.status === 200 && response.data.error) {
                  this.error_message = response.data.error;
                } else if (response.status === 200 && !response.data.error) {
                  this.success_message = "Pub deleted successfully!";
                  const index = this.publicity.indexOf(pub);
                  if (index !== -1) {
                    this.publicity.splice(index, 1);
                  }
                }
                setTimeout(() => {
                  this.error_message = "";
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
      filterPublicity() {
      const searchTerm = this.searchTerm.toLowerCase();
      if (!searchTerm) {
        return this.publicity; // Retourne tous les utilisateurs si searchTerm est vide
      } else {
        return this.publicity.filter((pub) => {
          return (
            pub.title.toLowerCase().includes(searchTerm) ||
            pub.content?.toLowerCase().includes(searchTerm) ||
            pub.calltoaction_url?.toLowerCase().includes(searchTerm) ||
            pub.calltoaction_text?.toLowerCase().includes(searchTerm) ||
            this.formatDate(pub.validity_start).toLowerCase().includes(searchTerm) ||
            this.formatDate(pub.validity_end).toLowerCase().includes(searchTerm) 
          );
        });
      }
    },
    exportToExcel() {
      const catalogueData = this.filterPublicity().map((pub) => {
        return {
          Name: pub.title,
          Description: pub.content,
          Calltoaction_url: pub.calltoaction_url,
          Calltoaction_text: pub.calltoaction_text,
          "Date de début": this.formatDate(pub.validity_start),
          "Date de fin": this.formatDate(pub.validity_end),
        };
      });

      const worksheet = XLSXUtils.json_to_sheet(catalogueData);
      const workbook = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(workbook, worksheet, "Publicités");

      writeXLSXFile(workbook, "Publicités.xlsx");
    },
  },
};
</script>