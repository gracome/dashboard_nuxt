<template>
  <div class="card">
    <div class="card-header align-items-center d-flex">
      <h4 class="card-title mb-0 flex-grow-1">Forfaits achetés par abonnée</h4>
      <div class="flex-shrink-0">
        <div class="dropdown card-header-dropdown">
          <a
            class="text-reset dropdown-btn"
            href="#"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="fw-semibold text-uppercase fs-12">Sort by: </span
            ><span class="text-muted"
              >{{ seletedDay }}<i class="mdi mdi-chevron-down ms-1"></i
            ></span>
          </a>
          <div class="dropdown-menu dropdown-menu-end" style="">
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="fetchStatistics('Dernière 24h')"
              >Dernière 24h</a
            >

            <a
              class="dropdown-item"
              href="#"
              @click.prevent="fetchStatistics('Semaine dernière')"
              >Semaine dernière</a
            >
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="fetchStatistics('30 derniers jours')"
              >30 derniers jours</a
            >
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="fetchStatistics('Ce mois')"
              >Ce mois</a
            >
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="fetchStatistics('Mois dernier')"
              >Mois dernier</a
            >
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="fetchStatistics('Cette année')"
              >Cette année</a
            >
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="fetchStatistics('Année dernière')"
              >Année dernière</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div
        class="d-flex justify-content-center p-4"
        v-if="bundleState?.length === 0"
      >
        Aucune donnée disponible pour cette période.
      </div>
      <div class="table-responsive active-projects shorting" v-else>
        <table id="projects-tbl" class="table ItemsCheckboxSec">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Nombre total de forfait acheté</th>
              <th>Montant total des achats</th>
              <th>Prix d'achat moyen</th>
              <th>Prix d'achat maximum</th>
              <th>Prix d'achat minimum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bundle in bundleState" :key="bundle.id">
              <td>{{ bundle.phone_number }}</td>
              <td class="description">
                {{ bundle.purchase_number }}
              </td>
              <td class="pe-0 description">
                {{ bundle.purchase_total_amount }}
              </td>
              <td class="pe-0 description">
                {{ bundle.purchase_avg_amount }}
              </td>
              <td class="pe-0 description">
                {{ bundle.purchase_max_amount }}
              </td>
              <td class="description">
                {{ bundle.purchase_min_amount }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
        <div
          class="dataTables_info fw-bold d-flex align-items-center"
          id="user-tbl_info"
          role="status"
          aria-live="polite"
        >
          {{
            "Showing " +
            bundleState?.length +
            " to " +
            $store.state.currentPage +
            " of " +
            totalPage +
            " pages"
          }}
        </div>
        <div
          class="dataTables_paginate paging_simple_numbers"
          id="user-tbl_paginate"
        >
          <button
            class="btn btn-primary m-1"
            @click.prevent="prevPage()"
            :disabled="$store.state.currentPage === 1"
          >
            <i class="fa-solid fa-angle-left"></i></button
          ><button
            class="btn btn-primary m-1"
            @click.prevent="nextPage()"
            :disabled="$store.state.currentPage === totalPage"
          >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seletedDay: "Dernière 24h",
      currentPage: 1,
      limit: 20,
    };
  },
  computed: {
    bundleState() {
      return this.$store.state.bundleState.data;
    },
    totalPage() {
      return Math.ceil(this.$store.state.bundleState?.meta?.total / 20);
    },
  },
  mounted() {
    this.fetchStatistics("Dernière 24h");
  },

  methods: {
    fetchStatistics(groupBy) {
      let startDate, endDate;
      const currentDate = new Date();

      if (groupBy === "Dernière 24h") {
        const previousDate = new Date(
          currentDate.getTime() - 24 * 60 * 60 * 1000
        );
        startDate = this.formatDate(previousDate);
        endDate = this.formatDate(currentDate);
        this.seletedDay = "Dernière 24h";
      } else if (groupBy === "Semaine dernière") {
        const firstDayOfLastWeek = new Date(currentDate);
        firstDayOfLastWeek.setDate(firstDayOfLastWeek.getDate() - 6); // Get the date of 7 days ago
        startDate = this.formatDate(firstDayOfLastWeek);
        endDate = this.formatDate(currentDate);
        this.seletedDay = "Semaine dernière";
      } else if (groupBy === "30 derniers jours") {
        const firstDayOfLastMonth = new Date(currentDate);
        firstDayOfLastMonth.setDate(firstDayOfLastMonth.getDate() - 29); // Get the date of 30 days ago
        startDate = this.formatDate(firstDayOfLastMonth);
        endDate = this.formatDate(currentDate);

        this.seletedDay = "30 derniers jours";
      } else if (groupBy === "Ce mois") {
        startDate = this.formatDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        );
        endDate = this.formatDate(currentDate);
        this.seletedDay = "Ce mois";
      } else if (groupBy === "Mois dernier") {
        const firstDayOfLastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        );
        const lastDayOfLastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        );
        startDate = this.formatDate(firstDayOfLastMonth);
        endDate = this.formatDate(lastDayOfLastMonth);
        this.seletedDay = "Mois dernier";
      } else if (groupBy === "Cette année") {
        startDate = this.formatDate(new Date(currentDate.getFullYear(), 0, 1));
        endDate = this.formatDate(currentDate);
        this.seletedDay = "Cette année";
      } else if (groupBy === "Année dernière") {
        startDate = this.formatDate(
          new Date(currentDate.getFullYear() - 1, 0, 1)
        );
        endDate = this.formatDate(
          new Date(currentDate.getFullYear() - 1, 11, 31)
        );
        this.seletedDay = "Année dernière";
      }

      this.$store.dispatch("fetchBundleStatistiques", {
        start_date: startDate,
        end_date: endDate,
      });
    },

    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
    prevPage() {
      if (this.$store.state.currentPage > 1) {
        let currentPage = this.$store.state.currentPage;
        currentPage--;
        this.$store.commit("setCurrentPage", currentPage);
        this.fetchStatistics(this.seletedDay);
      }
    },
    nextPage() {
      let currentPage = this.$store.state.currentPage;
      if (currentPage < this.totalPage) {
        currentPage++; // Incrémenter la valeur de currentPage
        this.$store.commit("setCurrentPage", currentPage); // Commettre la mutation pour mettre à jour currentPage dans le store Vuex
        this.fetchStatistics(this.seletedDay); // Appeler fetchUserLogs avec la nouvelle valeur de currentPage
      }
    },
  },
};
</script>

<style scoped>
td.description {
  max-width: 200px; /* Définir une largeur maximale pour les cellules */
  white-space: nowrap; /* Empêcher le texte de passer à la ligne */
  overflow: hidden; /* Masquer le texte qui dépasse */
  text-overflow: ellipsis; /* Ajouter des points de suspension pour indiquer que le texte est tronqué */
  text-align: center;
}
thead {
  text-align: center;
}
</style>