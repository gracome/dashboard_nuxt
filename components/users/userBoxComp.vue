<template>
  <div class="tab-content" id="pills-tabContent">
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
    <div class="tab-pane fade show active" id="pills-list" role="tabpanel" v-if="mode === 'card'">
      <div
        class="d-flex justify-content-center pt-3"
        v-if="userListe.length === 0"
      >
        <span>Aucun utilisateur pour le moment</span>
      </div>
      <div class="row" v-else>
        <div
          class="col-xl-3 col-lg-4 col-sm-6"
          v-for="single in userListe"
          :key="single.id"
        >
          <router-link
            :to="{ name: 'UserDetails', params: { id: single.id } }"
           
          >
            <div class="card"  @click="selectUser(single)">
              <div class="card-body">
                <div class="card-use-box">
                  <div class="crd-bx-img">
                    <img
                      src="../../assets/images/profile/friends/f1.jpg"
                      class="rounded-circle"
                      alt=""
                    />
                    <div
                      :class="[
                        single?.is_active ? 'active' : 'active deactive',
                      ]"
                    ></div>
                  </div>
                  <div class="card__text">
                    <h4 class="mb-0">
                      {{
                        single?.display_name ||
                        single?.first_name + " " + single?.last_name
                      }}
                    </h4>

                    <p>{{ single?.email }}</p>
                  </div>
                 
                  <ul class="post-pos">
                    <li>
                      <span class="card__info__stats">Phone: </span>
                      <span> {{ single?.phone }} </span>
                    </li>
                    <li>
                      <span class="card__info__stats">Rôle: </span>
                      <span> {{ single?.role }} </span>
                    </li>
                    <li>
                      <span class="card__info__stats">Joining Date: </span>
                      <span> {{ formatDate(single?.created_at) }} </span>
                    </li>
                  </ul>
                  <div>
                    <router-link
                      to="addUser"
                      class="btn btn-primary btn-sm me-2"
                      @click.prevent="editUser(single)"
                      >Edit</router-link
                    >

                    <button
                      class="btn btn-secondary btn-sm ms-2"
                      :disabled="single.id === $store.state.currentUser?.id"
                      @click.prevent="deleteUser(single)"
                    >
                      <span v-if="!single.in_processing">{{
                        single && single.is_active ? "Disable" : "Enable"
                      }}</span>
                      <span
                        v-if="single.in_processing"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="mode ==='table'">
    <div
      class="d-flex justify-content-center pt-3"
      v-if="userListe.lenght === 0"
    >
      <span>Aucun utilisateur pour le moment</span>
    </div>
    <div
      v-else
      class="tab-pane"
      id="pills-colm"
      role="tabpanel"
      aria-labelledby="pills-colm-tab"
    >
      <div class="card">
        <div class="card-body px-0">
          <div class="table-responsive active-projects user-tbl dt-filter">
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
              <table
                id="user-tbl"
                class="table dataTable no-footer"
                role="grid"
                aria-describedby="user-tbl_info"
              >
                <thead>
                  <tr>
                   
                    <th>User</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Phone</th>
                    <th>Date Of Joining</th>
                    <th>Gender</th>

                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="single in filterUsers()" :key="single.id">
                   
                    <router-link
                      :to="{ name: 'UserDetails', params: { id: single.id } }"
                      
                    >
                      <td>
                        <div class="d-flex align-items-center" @click="selectUser(single)">
                          <img
                            src="../../assets/images/contacts/pic1.jpg"
                            class="avatar rounded-circle"
                            alt=""
                          />
                          <p class="mb-0 ms-2">
                            {{
                              single?.display_name ||
                              single?.first_name + " " + single?.last_name
                            }}
                          </p>
                        </div>
                      </td>
                    </router-link>
                    <td>{{ single?.login }}</td>
                    <td>
                      <span class="text-primary">{{ single?.email }}</span>
                    </td>
                    <td>{{ single?.role }}</td>
                    <td>{{ single?.phone }}</td>
                    <td>{{ formatDate(single?.created_at) }}</td>
                    <td>{{ single?.gender }}</td>

                    <td>
                      <span
                        :class="{
                          'badge-success': single.is_active,
                          'badge-danger': !single.is_active,
                        }"
                        class="badge light border-0"
                      >
                        {{ single.is_active ? "Actif" : "Inactif" }}
                      </span>
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
                            @click.prevent="editUser(single)"
                            >Edit</a
                          >
                          <a
                            class="dropdown-item"
                            href="javascript:void(0);"
                            @click.prevent="deleteUser(single)"
                          >
                            {{
                              single && single.is_active ? "Disable" : "Enable"
                            }}
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <div
                class="dataTables_info"
                id="user-tbl_info"
                role="status"
                aria-live="polite"
              >
                Showing 1 to 12 of 19 entries
              </div>
              <div
                class="dataTables_paginate paging_simple_numbers"
                id="user-tbl_paginate"
              >
                <a
                  class="paginate_button previous disabled"
                  aria-controls="user-tbl"
                  data-dt-idx="0"
                  tabindex="0"
                  id="user-tbl_previous"
                  ><i class="fa-solid fa-angle-left"></i></a
                ><span
                  ><a
                    class="paginate_button current"
                    aria-controls="user-tbl"
                    data-dt-idx="1"
                    tabindex="0"
                    >1</a
                  ><a
                    class="paginate_button"
                    aria-controls="user-tbl"
                    data-dt-idx="2"
                    tabindex="0"
                    >2</a
                  ></span
                ><a
                  class="paginate_button next"
                  aria-controls="user-tbl"
                  data-dt-idx="3"
                  tabindex="0"
                  id="user-tbl_next"
                  ><i class="fa-solid fa-angle-right"></i
                ></a>
              </div> -->
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
  props: ["userListe"],
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
    mode() {
      return this.$store.state.mode;
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return date.toLocaleDateString("fr-FR", options);
    },
    editUser(user) {
      this.selectedUser = user;
      this.$store.commit("setSelectedUser", user);
    },
    deleteUser(user) {
      this.$confirm({
        message: `Are you sure you want to ${
          user.is_active ? "disable" : "enable"
        } this user?`,
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
            user.in_processing = true;
            var token = getCookie("token");
            var data = {
              id: user.id,
              activate: user.is_active ? false : true,
            };
            axios
              .post(this.apiBaseUrl + `/users/set-active`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                user.in_processing = false;
                if (response.status === 200 && response.data.error) {
                  this.error_message = response.data.error;
                } else if (response.status === 200 && !response.data.error) {
                  this.success_message = `User ${
                    user.is_active ? "disable" : "enable"
                  } successfully !`;
                  this.$store.dispatch("fetchUsers");
                }
                setTimeout(() => {
                  this.error_message = "";
                }, 3000);

                setTimeout(() => {
                  this.success_message = "";
                }, 3000);
              })
              .catch((error) => {
                user.in_processing = false;
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
    selectAction(action) {
      this.selectedAction = action;
      this.$store.dispatch("updateSelectedAction", action);
    },
    filterUsers() {
      const searchTerm = this.searchTerm.toLowerCase();
      if (!searchTerm) {
        return this.userListe; // Retourne tous les utilisateurs si searchTerm est vide
      } else {
        return this.userListe.filter((single) => {
          return (
            single.login.toLowerCase().includes(searchTerm) ||
            single.phone.toLowerCase().includes(searchTerm) ||
            single.first_name.toLowerCase().includes(searchTerm) ||
            single.last_name.toLowerCase().includes(searchTerm)
          );
        });
      }
    },

    exportToExcel() {
      const usersData = this.filterUsers().map((user) => {
        return {
          Login: user.login,
          Phone: user.phone,
          Email: user.email,
          "First Name": user.first_name,
          "Last Name": user.last_name,
          "Date Of Joining": this.formatDate(user?.created_at),
          Gender: user.gender,
        };
      });

      const worksheet = XLSXUtils.json_to_sheet(usersData);
      const workbook = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(workbook, worksheet, "Users");

      writeXLSXFile(workbook, "users.xlsx");
    },

    selectUser(user) {
      this.$store.commit("setSelectedUser", user);
    },
  },
};
</script>