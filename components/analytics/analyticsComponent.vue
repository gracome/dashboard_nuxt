<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-9 wid-100">
        <totalComponent />
      </div>
      <div class="col-xl-8">
        <projectOverview />
      </div>
      <div class="col-xl-4">
        <todoComponent />
      </div>
      <div class="col-xl-6 active-p">
        <activeProject />
      </div>
      <div class="col-xl-6 col-md-6 flag">
        <activeUser />
      </div>
      <div class="col-xl-5 bst-seller">
        <sellingProduct />
      </div>
      <div class="col-xl-3 col-md-6 up-shd">
        <upcomingComponent />
      </div>
      <div class="col-xl-3 col-md-6 up-shd">
        <projectStatusComponent />
      </div>
      <!-- <div class="col-xl-9 bst-seller">
        <employeComponent />
      </div>
      <div class="col-xl-3 t-earn">
        <totalEarning />
      </div>
      <div class="col-xl-4 col-md-6 chat-map">
        <chatComponent />
      </div> -->
     
    </div>
    
    

  </div>
</template>

<script>
import totalComponent from "./totalComponent.vue";
import projectOverview from "./projectOverviewComponent.vue";
import todoComponent from "./todoComponent.vue";
import activeProject from "./activeProjectComponent.vue";
import activeUser from "./activeUsersComponent.vue";
import sellingProduct from "./sellingProductComponent.vue";
import upcomingComponent from "./upcomingComponent.vue";
import projectStatusComponent from "./projectStatusComponent.vue";
// import employeComponent from "@/components/employeComponent.vue";
// import totalEarning from "@/components/totalEarningComponent.vue";
// import chatComponent from "@/components/chatComponent.vue";
export default {
  name: "dashboardComponent",
  components: {
    totalComponent,
    projectOverview,
    todoComponent,
    activeProject,
    activeUser,
    sellingProduct,
    upcomingComponent,
    projectStatusComponent,
    // employeComponent,
    // totalEarning,
    // chatComponent,
  },
};
</script>