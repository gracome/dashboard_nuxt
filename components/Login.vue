<template>
  <div class="authincation h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-lg-6 col-md-12 col-sm-12 mx-auto align-self-center">
          <div class="login-form">
            <div class="text-center">
              <h3 class="title">Sign In</h3>
              <p>Sign in to your account to start using W3CRM</p>
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
            <form autocomplete="login" class="needs-validation">
              <div class="mb-4">
                <label class="mb-1 text-dark">Login</label>
                <input
                  type="text"
                  required
                  class="form-control form-control"
                  placeholder="Enter your login"
                  v-model.trim="login"
                  @input="validateField('login')"
                />
                <span class="text-danger">{{ errors.login }}</span>
              </div>
              <div class="mb-4 position-relative">
                <label class="mb-1 text-dark">Password</label>
                <input
                  type="password"
                  id="dz-password"
                  required
                  class="form-control"
                  placeholder="Enter your password"
                  v-model.trim="password"
                  @input="validateField('password')"
                />
                <span class="text-danger">{{ errors.password }}</span>
              </div>
              <div class="form-row mt-4 mb-2">
                <div class="mb-4">
                  <router-link
                    to="/forgotPassword"
                    class="btn-link text-primary"
                  >
                    Forgot Password?</router-link
                  >
                </div>
              </div>
              <div class="text-center mb-4">
                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  @click.prevent="submitLogin()"
                  :disabled="in_processing"
                >
                  <span v-if="!in_processing">Sign In</span>
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
        <div class="col-xl-6 col-lg-6">
          <leftComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCookie} from "../utils/functions"
export default {
  name: "LoginView",

  data() {
    return {
      login: "",
      password: "",
      in_processing: false,
      error_message: "",
      apiBaseUrl: process.env.VUE_APP_API_URL,
      errors: {
        login: "",
        password: "",
      },
    };
  },
  created() {
    if (getCookie("token")) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    submitLogin() {
      if (this.login !== "" && this.password !== "" && !this.in_processing) {
        this.in_processing = true;
        const data = { login: this.login, password: this.password };

        this.$axios
          .post(this.apiBaseUrl + "/users/login", data)
          .then((response) => {
            this.in_processing = false;
            if (response.status === 200 && response.data.error) {
              this.error_message = response.data.error;
            } else if (response.status === 200 && !response.data.error) {
              
              var expiresDate = new Date(response.data.expires_at);
              var expiresUTCString = expiresDate.toUTCString();
              document.cookie =
                "token=" +
                response.data.access_token +
                "; expires=" +
                expiresUTCString +
                "; path=/";
              const redirectPath =
              localStorage.getItem("redirectPath") || "/"; // Définissez une route par défaut
            localStorage.removeItem("redirectPath"); // Supprimez la route précédente après utilisation
            this.$router.push(redirectPath);
           
            }
            setTimeout(() => {
              this.error_message = "";
            }, 3000);
          })
          .catch((error) => {
            this.in_processing = false;
            this.handleError(error);
          });
      }
    },
    handleError(error) {
      if (error.response && error.response.status === 500) {
        this.error_message = "An error has occurred";
      } else if (error.response && error.response.data) {
        this.error_message =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.error;
        if (!this.error_message) this.error_message = "An error has occurred";
      } else {
        this.error_message = "An error has occurred";
      }
      setTimeout(() => {
        this.error_message = "";
      }, 3000);
    },

    validateField(fieldName) {
      if (this[fieldName] === "") {
        this.errors[fieldName] = "Field required";
      } else {
        this.errors[fieldName] = "";
      }
    },
  },
};
</script>