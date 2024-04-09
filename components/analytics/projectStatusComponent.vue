<template>
  <div class="card overflow-hidden">
    <div class="card-header border-0 pb-0 flex-wrap">
      <h4 class="heading mb-0">Détails des activités de chaque abonnée</h4>
      <ul class="nav nav-pills mix-chart-tab" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            type="button"
            :class="{ active: selectedTemp === 'day' }"
            @click="fetchStatisticsDetails('day')"
          >
            Aujourd'hui
          </button>
        </li>
        <!-- <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-series="month"
            id="pills-month-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-month"
            type="button"
            role="tab"
            aria-selected="false"
            @click="fetchStatistics('week')"
          >
            Week
          </button>
        </li> -->
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            type="button"
            :class="{ active: selectedTemp === 'month' }"
            @click="fetchStatisticsDetails('month')"
          >
            Ce mois
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: selectedTemp === 'year' }"
            type="button"
            @click="fetchStatisticsDetails('year')"
          >
            Cette année
          </button>
        </li>
      </ul>
    </div>
    <div class="card-body p-0">     
     <div v-if="statisticDetails && statisticDetails.length === 0" class="d-flex justify-content-center p-4">Aucune donnée pour cette période</div>
      <div v-show="statisticDetails && statisticDetails.length > 0" >
  <div id="mixedChart"></div>
      </div>
    
    </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  data() {
    return {
      selectedTemp: "day",
    };
  },
 computed: {
  statisticDetails() {
    if (this.$store.state.statistiqueDetails) {
      return this.$store.state.statistiqueDetails.data;
    } else {
      return [];
    }
  },
},

  mounted() {
      try {
    this.fetchStatisticsDetails("day");
  } catch (error) {
console.log(error);
  }
  },
  watch: {
    statisticDetails: {
    handler(newVal, oldVal) {
      if (newVal && newVal.length > 0 && newVal !== oldVal) {
        this.renderChart();

      }
    },
    deep: true,
    immediate: true,
  },
  },

  methods: {
    renderChart() {
      const data = this.statisticDetails;
    const chartElement = document.getElementById("mixedChart");


      const series = [
        {
          name: "Total des Visites",
          type: "column", // Type de graphique pour cette série
          data: data?.map((item) => item.total_visite),
        },
        {
          name: "Montant total d'achat",
          type: "area", // Type de graphique pour cette série
          data: data?.map((item) => item.total_purchase_amount),
        },
        {
          name: "Nombre Total d'Achats",
          type: "line", // Type de graphique pour cette série
          data: data?.map((item) => item.total_number_purchase),
        },
        
      ];
      const options = {
        
        xaxis: {
          categories: data?.map((item) => item.phone_number),
        },
         yaxis: [{
          title: {
            text: '',
          },
        
        },
        
        {
          opposite: true,
          title: {
            text: ''
          },
        
          
           }],
        series: series,
         chart: {
          height: 300,
          type: 'line',
        },
        stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '10%'
          }
        },
          noData: {
          text: "Loading...",
        },
        
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
      };
       if (chartElement) {
      const chart = new ApexCharts(document.getElementById("mixedChart"), options);
      if(chart){
        chart.render(); 
      }
    }
    },
  
    async fetchStatisticsDetails(groupBy) {
      let startDate, endDate;
      const currentDate = new Date();
      this.selectedTemp = groupBy;
      if (groupBy === "day") {
        const previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        startDate = this.formatDate(previousDate);
        endDate = this.formatDate(currentDate);
      } else if (groupBy === "week") {
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
        startDate = this.formatDate(firstDayOfWeek);
        endDate = this.formatDate(currentDate);
      } else if (groupBy === "month") {
        startDate = this.formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
        endDate = this.formatDate(currentDate);
      } else if (groupBy === "year") {
        startDate = this.formatDate(new Date(currentDate.getFullYear(), 0, 1));
        endDate = this.formatDate(currentDate);
      }
      
      await this.$store.dispatch("fetchStatistiqueDetails", {
        start_date: startDate,
        end_date: endDate,
      });
    },

    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
  },
};
</script>
