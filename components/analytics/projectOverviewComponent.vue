<template>
  <div class="card overflow-hidden">
    <div class="card-header border-0 pb-0 flex-wrap">
      <h4 class="heading mb-0">Projects Overview</h4>
      <ul class="nav nav-pills mix-chart-tab" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            data-series="week"
            id="pills-week-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-week"
            type="button"
            role="tab"
            aria-selected="true"
          >
            Week
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-series="month"
            id="pills-month-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-month"
            type="button"
            role="tab"
            aria-selected="false"
          >
            Month
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-series="year"
            id="pills-year-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-year"
            type="button"
            role="tab"
            aria-selected="false"
          >
            Year
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-series="all"
            id="pills-all-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-all"
            type="button"
            role="tab"
            aria-selected="false"
          >
            All
          </button>
        </li>
      </ul>
    </div>
    <div class="card-body p-0">
      <div id="overiewChart"></div>
      <div class="ttl-project">
        <div class="pr-data">
          <h5>12,721</h5>
          <span>Number of Projects</span>
        </div>
        <div class="pr-data">
          <h5 class="text-primary">721</h5>
          <span>Active Projects</span>
        </div>
        <div class="pr-data">
          <h5>$2,50,523</h5>
          <span>Revenue</span>
        </div>
        <div class="pr-data">
          <h5 class="text-success">12,275h</h5>
          <span>Working Hours</span>
        </div>
      </div>
    </div>
  </div>
</template>