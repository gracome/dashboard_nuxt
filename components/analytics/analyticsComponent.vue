<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-9 wid-100">
        <totalComponent />
      </div>
      <div class="col-xl-9 wid-100">
       <projectStatusComponent />
      </div>
    
      <div class="col-xl-6 active-p">
        <activeProject />
      </div>
 
     
      <div class="col-xl-9 wid-100">
         <projectOverview />
        
      </div>

     
    </div>
    
    

  </div>
</template>

<script>
import totalComponent from "./totalComponent.vue";
import projectOverview from "./projectOverviewComponent.vue";
import activeProject from "./activeProjectComponent.vue";
import projectStatusComponent from "./projectStatusComponent.vue";
export default {
  name: "dashboardComponent",
  components: {
    totalComponent,
    projectOverview,
    activeProject,
   
    projectStatusComponent,

  },
};
</script>