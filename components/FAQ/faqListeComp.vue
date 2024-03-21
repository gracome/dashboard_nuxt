<template>
  <div class="col-xl-12 col-xxl-12">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="heading mb-0">FAQ Liste</h4>
      <router-link to="/addFaq" class="btn btn-primary btn-sm ms-2"
        >+ Add Faq</router-link
      >
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

    <div
      class="alert alert-success"
      role="alert"
      v-show="success_message !== ''"
    >
      {{ success_message }}
    </div>

    <div class="card">
      <div class="card-body px-0">
        <div class="d-flex justify-content-center" v-if="faqData.length === 0">
          <span>Aucune FAQ pour le moment. </span>
        </div>
        <div class="table-responsive active-projects user-tbl dt-filter" v-else>
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
                  v-model="searchFAQ"
              /></label>
            </div>
            <table
              id="user-tbl"
              class="table dataTable no-footer"
              role="grid"
              aria-describedby="user-tbl_info"
            >
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="faq in filterFaq()" :key="faq.id">
                  <td @click.prevent="selectFaq(faq)">
                    <router-link
                      class="text-primary"
                      :to="{ name: 'faqDetails', params: { id: faq.id } }"
                      
                    >
                      {{ faq.question }}
                    </router-link>
                  </td>

                  <td class="description">
                    <span> {{ getTitleFromId(faq.faq_category_id) }} </span>
                  </td>
                  <td class="description">
                    <span> {{ formatDate(faq.created_date) }} </span>
                  </td>
                  <!-- <td>
                    <span
                      :class="{
                        'badge-success': faq.status === 'active',
                        'badge-danger': faq.status === 'inactive',
                      }"
                      class="badge light border-0"
                    >
                      {{ faq.status }}
                    </span>
                  </td> -->
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
                          to="/addFaq"
                          @click.prevent="selectFaq(faq)"
                          class="dropdown-item"
                        >
                          Edit
                        </router-link>
                        <a
                          class="dropdown-item"
                          href="javascript:void(0);"
                          @click="deleteFaq(faq)"
                          >Delete</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between">
              <div
                class="dataTables_info d-flex align-items-center"
                id="user-tbl_info"
                role="status"
                aria-live="polite"
              >
                Showing {{ currentPage }} to {{ filterFaq().length }} of
                {{ $store.state.faqData.length }} entries
              </div>
              <div
                class="dataTables_paginate paging_simple_numbers"
                id="user-tbl_paginate"
              >
                <button
                  class="btn btn-primary previous m-1"
                  id="user-tbl_previous"
                  @click="previousPage"
                  :disabled="currentPage === 1"
                >
                  <i class="fa-solid fa-angle-left"></i>
                </button>

                <button
                  class="btn btn-primary"
                  id="user-tbl_next"
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                >
                  <i class="fa-solid fa-angle-right"></i>
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
import { utils as XLSXUtils, writeFile as writeXLSXFile } from "xlsx";
import axios from "axios";
import { getCookie } from "../../utils/functions";
export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchFAQ: "",
      sortKey: "", // Clé de tri
      sortDirection: "asc",
      response: "",
      success_messageMo: "",
      error_messageMo: "",
      in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,
      success_message: "",
      error_message: "",
    };
  },
  computed: {
    faqData() {
      return this.$store.state.faqData;
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.faqData.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.faqData.length / this.pageSize);
    },

    sortedFaqs() {
      const sorted = [...this.paginatedData]; // Copie des données originales
      return sorted.sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === "desc") modifier = -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
    },
  },
  //   mounted() {
  //     $(document).ready(function() {
  //         $('#user-tbl').DataTable({
  //             "paging": false, // Activer la pagination
  //             "ordering": false, // Activer le tri par défaut
  //             "info": false ,// Activer les informations sur la table
  //             "searching": false
  //         });
  //     });
  // },

  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    selectFaq(faq) {
      this.$store.commit("setSelectedFaq", faq);
    },
    filterFaq() {
      const searchTerm = this.searchFAQ.toLowerCase();
      if (!searchTerm) {
        return this.paginatedData;
      } else {
        return this.paginatedData.filter((faq) => {
          return (
            faq.question.toLowerCase().includes(searchTerm) ||
            this.getTitleFromId(faq.faq_category_id)
              .toLowerCase()
              .includes(searchTerm)
          );
        });
      }
    },

    exportToExcel() {
      const usersData = this.filterFaq().map((faq) => {
        return {
          Titre: faq.titre,
          Category: faq.category,
          Question: faq.question,
          Reponses: faq.reponses,
          "Date de création": faq.dateCreation,
          Status: faq.status,
        };
      });

      const worksheet = XLSXUtils.json_to_sheet(usersData);
      const workbook = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(workbook, worksheet, "FAQ");

      writeXLSXFile(workbook, "users.xlsx");
    },

    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortDirection = "asc";
      }
    },

    deleteFaq(faq) {
      this.$confirm({
        message: `Are you sure you want to delete this faq?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: (confirm) => {
          // if (confirm) {
          //   let faqListes = this.faqData;

          //   faqListes.splice(faq.id, 1);

          //   this.faqData = faqListes;

          //   this.success_message = "FAQ delete successfully !";
          //   setTimeout(() => {
          //     this.success_message = "";
          //   }, 3000);
          // }

          if (confirm) {
            var token = getCookie("token");
            var data = {
              id: faq.id,
            };
            axios
              .post(this.apiBaseUrl + `/faq/delete`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                if (response.status === 200 && response.data.error) {
                  this.error_message = response.data.error;
                } else if (response.status === 200 && !response.data.error) {
                  let faqListes = this.faqData;

                  faqListes.splice(faq.id, 1);

                  this.faqData = faqListes;

                  this.success_message = "FAQ delete successfully !";
                  setTimeout(() => {
                    this.success_message = "";
                    this.error_message = "";
                  }, 3000);
                }
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return date.toLocaleDateString("fr-FR", options);
    },
    getTitleFromId(categoryId) {
      const category = this.$store.state.faqCategory.find(
        (cat) => cat.id === categoryId
      );
      return category ? category.title : "Category Not Found";
    },
    addResponse() {
      if (this.response === "") {
        return;
      }
      var data = {
        answer: this.response,
        order: "",
        question_id: this.$store.state.selectedFaq.id,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/faq/response/add", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_messageMo = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_messageMo = "FAQ response add successfully !";
            this.response = "";
          }

          setTimeout(() => {
            this.error_messageMo = "";
            this.success_messageMo = "";
          }, 3000);
        })
        .catch((error) => {
          this.in_processing = false;
          if (error.response && error.response.status === 500) {
            this.error_messageMo = "An error has occurred.";
          } else if (error.response && error.response.data) {
            this.error_messageMo =
              typeof error.response.data === "string"
                ? error.response.data
                : error.response.data.error;
            if (!this.error_messageMo)
              this.error_messageMo = "An error has occurred.";
          } else {
            this.error_messageMo = "An error has occurred.";
          }
          setTimeout(() => {
            this.error_messageMo = "";
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
td.description {
  max-width: 200px; /* Définir une largeur maximale pour les cellules */
  white-space: nowrap; /* Empêcher le texte de passer à la ligne */
  overflow: hidden; /* Masquer le texte qui dépasse */
  text-overflow: ellipsis; /* Ajouter des points de suspension pour indiquer que le texte est tronqué */
  text-align: center;
}
thead {
  text-align: center;
}
</style>
