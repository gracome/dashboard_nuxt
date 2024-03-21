<template>
<div>
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
  <div class="card profile-card card-bx m-b30">
    <div class="card-header">
      <h6 class="title">
        {{ $store.state.selectedUser ? "Edit user" : "Add user" }}
      </h6>
    </div>

    <form class="profile-form" @submit.prevent="submitUser()">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 m-b30">
            <label class="form-label">Prénom</label>
            <input
              type="text"
              class="form-control"
              placeholder="John"
              v-model.trim="user.first_name"
              required
              @input="validateField('first_name')"
            />
            <span class="text-danger">{{ errors.first_name }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Nom</label>
            <input
              type="text"
              class="form-control"
              placeholder="DOE"
              v-model.trim="user.last_name"
              required
              @input="validateField('last_name')"
            />
            <span class="text-danger">{{ errors.last_name }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Téléphone</label>
            <input
              type="text"
              class="form-control"
              placeholder="22995879546"
              v-model.trim="user.phone"
              required
              :disabled="this.$store.state.selectedUser"
              @input="validateField('phone')"
            />
            <span class="text-danger">{{ errors.phone }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              placeholder="demo@gmail.com"
              v-model.trim="user.email"
              required
              @input="validateField('email')"
              :disabled="this.$store.state.selectedUser"
            />
            <span class="text-danger">{{ errors.email }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Genre</label>
            <select
              class="default-select form-control"
              id="validationCustom05"
              v-model.trim="user.gender"
              @select="validateField('gender')"
              required
            >
              <option data-display="Select">Please select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <span class="text-danger">{{ errors.gender }}</span>
          </div>
          <div class="col-sm-6 m-b30">
            <label class="form-label">Rôle</label>
            <select
              class="default-select form-control"
              id="validationCustom01"
              v-model.trim="user.role"
              required
              @select="validateField('role')"
              :disabled="
                $store.state.selectedUser &&
                $store.state.currentUser?.role !== 'superadmin'
              "
            >
              <option data-display="Select">Please select</option>
              <option value="superadmin">Super-admin</option>
              <option value="manager">Manager</option>
            </select>
            <span class="text-danger">{{ errors.role }}</span>
          </div>

          <div
            class="col-sm-12 m-b30"
            v-if="
              !$store.state.selectedUser ||
              $store.state.currentUser?.role === 'superadmin'
            "
          >
            <label class="form-label">Mot de passe</label>
            <input
              type="password"
              placeholder="Enter a password"
              class="form-control"
              v-model.trim="user.password"
              :required="!$store.state.selectedUser"
              @input="validateField('password')"
            />
            <span class="text-danger">{{ errors.password }}</span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button
          type="submit"
          class="btn btn-primary btn-block"
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
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { getCookie } from "../../utils/functions";
import axios from "axios";

export default {
  props: ["userListe", "single"],
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        gender: "",
        role: "",
        phone: "",
        email: "",
        password: "",
      },
      errors: {
        first_name: "",
        last_name: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
        role: "",
      },
      in_processing: false,
      apiBaseUrl: process.env.VUE_APP_API_URL,
      error_message: "",
      selectedAction: "",
      success_message: "",
    };
  },
  computed: {},
  mounted() {
    const selectedUser = this.$store.state.selectedUser;
    if (selectedUser) {
      this.user = { ...selectedUser };
    }
  },
  methods: {
    submitUser() {
      if (this.$store.state.selectedUser === null) {
        this.addUser();
      } else {
        this.updateUser();
      }
    },
    addUser() {
      if (
        this.user.first_name === "" ||
        this.user.last_name === "" ||
        this.user.gender === "" ||
        this.user.role === "" ||
        this.user.phone === "" ||
        this.user.email === "" ||
        this.user.password === ""
      ) {
        return;
      }
      var data = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        phone: this.user.phone.toString(),
        gender: this.user.gender,
        password: this.user.password,
        role: this.user.role,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/users/add", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.$router.push("/users");
          }

          setTimeout(() => {
            this.error_message = "";
          }, 3000);
        })
        .catch((error) => {
          this.in_processing = false;
          if (error.response && error.response.status === 500) {
            this.error_message = "Une erreur s'est produite.";
          } else if (error.response && error.response.data) {
            this.error_message =
              typeof error.response.data === "string"
                ? error.response.data
                : error.response.data.error;
            if (!this.error_message)
              this.error_message = "Une erreur s'est produite.";
          } else {
            this.error_message = "Une erreur s'est produite.";
          }
          setTimeout(() => {
            this.error_message = "";
          }, 3000);
        });
    },
    updateUser() {
      if (
        this.user.first_name === "" ||
        this.user.last_name === "" ||
        this.user.gender === "" ||
        this.user.role === "" ||
        this.user.phone === "" ||
        this.user.email === ""
      ) {
        return;
      }
      var data = {
        id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        phone: this.user.phone.toString(),
        gender: this.user.gender,
        password: this.user.password,
        picture: this.$store.state.uploadedFile,
        role: this.user.role,
      };

      this.in_processing = true;
      let token = getCookie("token");
      axios
        .post(this.apiBaseUrl + "/users/update", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.in_processing = false;
          if (response.status === 200 && response.data.error) {
            this.error_message = response.data.error;
          } else if (response.status === 200 && !response.data.error) {
            this.success_message = "User update successfully !";
          }

          setTimeout(() => {
            this.success_message = "";

            this.error_message = "";
          }, 3000);
        })
        .catch((error) => {
          this.in_processing = false;
          if (error.response && error.response.status === 500) {
            this.error_message = "Une erreur s'est produite.";
          } else if (error.response && error.response.data) {
            this.error_message =
              typeof error.response.data === "string"
                ? error.response.data
                : error.response.data.error;
            if (!this.error_message)
              this.error_message = "Une erreur s'est produite.";
          } else {
            this.error_message = "Une erreur s'est produite.";
          }
          setTimeout(() => {
            this.error_message = "";
          }, 3000);
        });
    },
  
    validateField(fieldName) {
      if (this.user[fieldName] === "") {
        this.errors[fieldName] = "Champ requis";
      } else {
        this.errors[fieldName] = "";
      }
    },
  },
};
</script>

<style>
.form-control:disabled {
  background: #f1f1f1 !important;
}
</style>