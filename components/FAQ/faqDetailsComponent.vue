<template>
  <div class="container-fluid mh-auto">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
         
          <div class="card-body">
            <div>
            <h6 class="fw-bold">{{ $store.state.selectedFaq.titre }}</h6>
          </div>
            <div>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                   {{ $store.state.selectedFaq.question }}
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body" v-for="respon in  $store.state.selectedFaq.responses" :key="respon.id">
                     <div>
                         {{ respon.answer }}
                         <hr>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- review -->
    </div>
  </div>
</template>

<style scoped>
.accordion-header{
    border:inherit !important
}
</style>