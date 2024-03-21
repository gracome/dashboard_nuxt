<template>
  <div class="clearfix">
    <div class="card card-bx profile-card author-profile m-b30">
      <div class="card-body">
        <div class="p-5">
          <div class="author-profile">
            <div class="author-media">
              <img :src="userPictureSrc" alt="Profile Picture" />
              <div
                class="upload-link"
                title=""
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="update"
              >
                <input
                  type="file"
                  class="update-flie"
                  @change="handleFileChange"
                  accept="image/*"
                />
                <i class="fa fa-camera"></i>
              </div>
            </div>
            <div class="author-info">
              <h6 class="title">
                {{
                  user?.display_name || user?.first_name + " " + user?.last_name
                }}
              </h6>
              <span> {{ user.login }} </span>
            </div>
          </div>
        </div>
        <!-- <div class="info-list">
          <ul>
            <li><a href="app-profile.html">Models</a><span>36</span></li>
            <li><a href="uc-lightgallery.html">Gallery</a><span>3</span></li>
            <li><a href="app-profile.html">Lessons</a><span>1</span></li>
          </ul>
        </div> -->
      </div>
      <!-- <div class="card-footer">
        <div class="input-group mb-3">
          <div class="form-control rounded text-center bg-white">Portfolio</div>
        </div>
        <div class="input-group">
          <a
            href="https://www.dexignzone.com/"
            target="_blank"
            class="form-control text-primary rounded text-start bg-white"
            >https://www.dexignzone.com/</a
          >
        </div>
      </div> -->
    </div>
  </div>
</template>


<script>
export default {
  props: ["user"],

  data() {
    return {
      apiBaseUrl: process.env.VUE_APP_API_URL,
      selectedFile: "",
    };
  },
  computed: {
    userPictureSrc() {
      return this.selectedFile
        ? URL.createObjectURL(this.selectedFile)
        : this.user.picture || "/_nuxt/assets/images/tab/1.jpg";
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.$store.commit("setUploadedFile", URL.createObjectURL(this.selectedFile));
    },
  },
};
</script>