<template>
  <div class="card overflow-hidden">
    <div class="card-header border-0 pb-0 flex-wrap">
      <h4 class="heading mb-0">Nombre de session par abonnée</h4>
      <ul class="nav nav-pills mix-chart-tab" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            type="button"
            :class="{ active: selectedGroup === 'day' }"
            @click="fetchStatistics('day')"
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
            :class="{ active: selectedGroup === 'month' }"
            @click="fetchStatistics('month')"
          >
            Ce mois
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: selectedGroup === 'year' }"
            type="button"
            @click="fetchStatistics('year')"
          >
            Cette année
          </button>
        </li>
      </ul>
    </div>
    <div class="card-body p-0">
      
     <div
        v-if="statistics && statistics?.length === 0"
        class="d-flex justify-content-center p-4"
      >
        Aucune donnée pour cette période
      </div>
      <div v-show="statistics && statistics?.length > 0">
 <div id="overviewChart" ></div>
      </div>
  </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  data() {
    return {
      selectedGroup: "day",
    };
  },
  computed: {
    statistics() {
      return this.$store.state.statistiques;
    },
  },
  mounted() {
    try {
      this.fetchStatistics("day");
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    statistics: {
      handler(newVal, oldVal) {
        if (newVal && newVal.length > 0 && newVal !== oldVal) {
          this.renderStatisticsChart();
        }
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    async renderStatisticsChart() {
      const statique = this.statistics;

      const chartRender = document.getElementById("overviewChart");
      if (chartRender) {
        const categories = statique.map((item) => item.phone_number);
        const series = [
          {
            name: "Nombre de session",
            data: statique.map((item) => item.session_number),
          },
          {
            name: "Montant total de forfait acheté",
            data: statique.map((item) => item.total_amount),
          },
        ];

        const options = {
          chart: {
            type: "bar",
            height: 300,
          },

          series: series,
          xaxis: {
            type: "categories",
            categories: categories,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "30%",
            },
          },
          noData: {
            text: "Loading...",
          },
        };
        const chart = new ApexCharts(
          document.getElementById("overviewChart"),
          options
        );

        chart.render();
      }
    },

    fetchStatistics(groupBy) {
      let startDate, endDate;
      const currentDate = new Date();
      this.selectedGroup = groupBy;
      if (groupBy === "day") {
        const previousDate = new Date(
          currentDate.getTime() - 24 * 60 * 60 * 1000
        );
        startDate = this.formatDate(previousDate);
        endDate = this.formatDate(currentDate);
      } else if (groupBy === "week") {
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(
          firstDayOfWeek.getDate() - firstDayOfWeek.getDay()
        );
        startDate = this.formatDate(firstDayOfWeek);
        endDate = this.formatDate(currentDate);
      } else if (groupBy === "month") {
        startDate = this.formatDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        );
        endDate = this.formatDate(currentDate);
      } else if (groupBy === "year") {
        startDate = this.formatDate(new Date(currentDate.getFullYear(), 0, 1));
        endDate = this.formatDate(currentDate);
      }
      this.$store.dispatch("fetchStatistiques", {
        start_date: startDate,
        end_date: endDate,
        group_by: groupBy,
      });
      
    },

    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
  },
};
</script>
