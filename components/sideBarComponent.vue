<template>
  <div class="deznav">
    <div class="deznav-scroll">
      <ul class="metismenu" id="menu">
        <li class="menu-title">MOOV BENIN</li>
        <!-- <li id="dashboard">
          <a class="has-arrow" href="javascript:void(0);" aria-expanded="false">
            <div class="menu-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                  stroke="#888888"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 18.3333V10H12.5V18.3333"
                  stroke="#888888"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span class="nav-text">Dashboard</span>
          </a>
          <ul aria-expanded="false">
            <li :class="{ 'mm-active': selectedAction === 'analytics' }">
              <router-link to="/">
              
                <span class="nav-text">Analytics</span>
            </router-link>
            </li>

            <li :class="{ 'mm-active': selectedAction === 'listing' }">
              <router-link to="/listing">
                
                <span class="nav-text">Listings</span>
            </router-link>
            </li>
          </ul>
        </li> -->
        <li>
          <a class="has-arrow" href="javascript:void(0);" aria-expanded="false" @click="toggleMenu(1)">
            <div class="menu-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.79222 13.9396C12.1738 13.9396 15.0641 14.452 15.0641 16.4989C15.0641 18.5458 12.1931 19.0729 8.79222 19.0729C5.40972 19.0729 2.52039 18.5651 2.52039 16.5172C2.52039 14.4694 5.39047 13.9396 8.79222 13.9396Z"
                  stroke="#888888"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.79223 11.0182C6.57206 11.0182 4.77173 9.21874 4.77173 6.99857C4.77173 4.7784 6.57206 2.97898 8.79223 2.97898C11.0115 2.97898 12.8118 4.7784 12.8118 6.99857C12.8201 9.21049 11.0326 11.0099 8.82064 11.0182H8.79223Z"
                  stroke="#888888"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.1095 9.9748C16.5771 9.76855 17.7073 8.50905 17.7101 6.98464C17.7101 5.48222 16.6147 4.23555 15.1782 3.99997"
                  stroke="#888888"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.0458 13.5045C18.4675 13.7163 19.4603 14.2149 19.4603 15.2416C19.4603 15.9483 18.9928 16.4067 18.2374 16.6936"
                  stroke="#888888"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span class="nav-text">Agents</span>
          </a>
          <ul aria-expanded="false" :class="{ 'mm-collapse left': menuExpanded !== 1, 'mm-collapse mm-show': menuExpanded === 1 }">
            <li :class="{ 'mm-active': $route.path === '/users' }">
              <router-link to="/users" active-class="mm-active">Listes</router-link>
            </li>
            <li v-if="$store.state.currentUser?.role === 'superadmin'" :class="{ 'mm-active': $route.path === '/addUser' }" @click="setseletUser()">
              <router-link to="/addUser"  active-class="mm-active">Ajouter</router-link>
            </li>
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="javascript:void(0);" aria-expanded="false" @click="toggleMenu(2)">
            <div class="menu-icon">
              <svg
                fill="#888888"
                height="20px"
                width="20px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 502 502"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <g>
                        <path
                          d="M428.483,73.516C381.076,26.108,318.045,0,251,0C183.956,0,120.924,26.108,73.516,73.516S0,183.956,0,251 s26.108,130.076,73.516,177.484C120.924,475.892,183.956,502,251,502c67.045,0,130.076-26.108,177.483-73.516 C475.892,381.076,502,318.044,502,251S475.892,120.924,428.483,73.516z M251,482C123.626,482,20,378.374,20,251 S123.626,20,251,20s231,103.626,231,231S378.374,482,251,482z"
                        ></path>
                        <path
                          d="M251,41.36c-71.131,0-129,57.869-129,129c0,19.299,15.701,35,35,35s35-15.701,35-35c0-32.533,26.467-59,59-59 c32.532,0,59,26.467,59,59c0,32.809-26.468,59.5-59,59.5c-19.299,0-35,15.701-35,35v68.781c0,19.299,15.701,35,35,35 s35-15.702,35-34.999v-38.638c25.275-7.181,48.08-22.162,64.871-42.763C369.655,229.195,380,200.116,380,170.36 C380,99.229,322.131,41.36,251,41.36z M273.893,277.422c-4.605,0.992-7.893,5.064-7.893,9.775v46.443c0,8.271-6.729,15-15,15 s-15-6.729-15-15v-68.781c0-8.271,6.729-15,15-15c43.561,0,79-35.664,79-79.5c0-43.561-35.439-79-79-79c-43.561,0-79,35.44-79,79 c0,8.271-6.729,15-15,15s-15-6.729-15-15c0-60.103,48.897-109,109-109c60.103,0,109,48.897,109,109 C360,221.641,323.787,266.667,273.893,277.422z"
                        ></path>
                        <path
                          d="M251,386.641c-19.299,0-35,15.701-35,35v4c0,19.299,15.701,35,35,35s35-15.702,35-35v-4 C286,402.342,270.299,386.641,251,386.641z M266,425.641c0,8.271-6.729,15-15,15s-15-6.729-15-15v-4c0-8.271,6.729-15,15-15 s15,6.729,15,15V425.641z"
                        ></path>
                        <path
                          d="M59.077,290.972C56.372,277.911,55,264.462,55,251c0-5.523-4.477-10-10-10s-10,4.477-10,10 c0,14.822,1.512,29.636,4.492,44.028c0.979,4.724,5.14,7.974,9.782,7.974c0.672,0,1.355-0.068,2.039-0.21 C56.721,301.672,60.197,296.38,59.077,290.972z"
                        ></path>
                        <path
                          d="M172.982,430.859c-43.999-19.113-79.407-53.593-99.701-97.088c-2.335-5.005-8.287-7.169-13.29-4.834 c-5.005,2.335-7.169,8.285-4.834,13.29c22.36,47.925,61.375,85.916,109.856,106.976c1.297,0.564,2.649,0.831,3.979,0.831 c3.862,0,7.54-2.25,9.178-6.019C180.37,438.949,178.047,433.059,172.982,430.859z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-text">FAQ</span>
          </a>
          <ul aria-expanded="false" :class="{ 'mm-collapse left': menuExpanded !== 2, 'mm-collapse mm-show': menuExpanded === 2 }" >
            <li :class="{ 'mm-active': $route.path === '/faq' }">
              <router-link to="/faq" active-class="mm-active">Liste</router-link>
            </li>
            <li :class="{ 'mm-active': $route.path === '/faq_category' }">
              <router-link to="/faq_category" active-class="mm-active">Categories</router-link>
            </li>
            <li :class="{ 'mm-active': $route.path === '/addFaq' }" @click="ResetseletFAQ()">
              <router-link to="/addFaq"  active-class="mm-active"> Ajouter</router-link> 
            </li>
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="javascript:void(0);" aria-expanded="false" @click="toggleMenu(3)">
            <div class="menu-icon">
              <svg
                fill="#888888"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="20px"
                height="20px"
                viewBox="0 0 392.666 392.666"
                xml:space="preserve"
                stroke="#888888"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path
                        d="M275.753,263.198l116.912-111.075l-72.924-76.757L275.753,263.198z M366.226,151.444l-57.993,55.088l21.817-93.161 L366.226,151.444z"
                      ></path>
                      <path
                        d="M308.135,67.505l-0.414-0.101L204.118,43.142l-0.381,1.617l63.389,197.864L308.135,67.505z M231.035,68.659l54.62,12.788 l-21.337,91.103L231.035,68.659z"
                      ></path>
                      <path
                        d="M87.325,74.468l3.729,11.643l164.764,164.763l0.104-0.316L189.065,41.869L87.325,74.468z M116.245,84.844l60.712-19.446 l37.783,117.953L116.245,84.844z"
                      ></path>
                      <path
                        d="M263.831,275.827l0.561-0.572l-0.292-0.292L75.539,86.402l-0.18,0.183L0,161.944l188.852,188.853L263.831,275.827z M75.539,112.854L237.94,275.255l-49.088,49.091L26.448,161.944L75.539,112.854z"
                      ></path>
                      <path
                        d="M189.44,260.057c9.039,0,16.367,7.331,16.367,16.367s-7.328,16.367-16.367,16.367c-9.04,0-16.368-7.331-16.368-16.367 S180.4,260.057,189.44,260.057z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-text">Catalogues</span>
          </a>

          <ul aria-expanded="false" :class="{ 'mm-collapse left': menuExpanded !== 3, 'mm-collapse mm-show': menuExpanded === 3 }">
            <li :class="{ 'mm-active': $route.path === '/catalogues' }">
              <router-link to="/catalogues" active-class="mm-active"
                ><span class="nav-text">Liste </span>
              </router-link>
            </li>
            <li :class="{ 'mm-active': $route.path === '/catalogue_groupe' }">
              <router-link to="/catalogue_groupe" active-class="mm-active">Groupes</router-link>
            </li>
            <li :class="{ 'mm-active': $route.path === '/add_catalogue' }" @click="ResetseletCatalogue()">
              <router-link to="/add_catalogue"  active-class="mm-active">Ajouter</router-link>
            </li>
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="javascript:void(0);" aria-expanded="false" @click="toggleMenu(4)">
            <div class="menu-icon">
              <svg
                fill="#888888"
                height="20px"
                width="20px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xml:space="preserve"
                stroke="#888888"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path
                        d="M336.466,77.121l-21.128,67.725l-21.129-67.725H187.102h-79.997H0l37.823,121.238v236.521h107.105h78.549h76.615h30.491 h143.595V198.359L512,77.121H336.466z M41.452,107.611h75.165l22.83,73.179H64.282L41.452,107.611z M144.928,404.389H68.313 V211.281h76.615V404.389z M148.557,107.611h16.118l22.829,73.179h-16.118L148.557,107.611z M192.986,404.389h-17.568V211.281 h17.568V404.389z M196.615,107.611h75.166l22.829,73.179h-71.134h-4.032L196.615,107.611z M300.092,404.389h-0.001h-76.615 V211.281h5.481h65.653h5.481V404.389z M443.687,404.389h-0.001H330.582V211.281h5.481h107.624V404.389z M447.719,180.791H336.062 l22.83-73.179h111.656L447.719,180.791z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span class="nav-text">Publicités</span>
          </a>
          <ul aria-expanded="false" :class="{ 'mm-collapse left': menuExpanded !== 4, 'mm-collapse mm-show': menuExpanded === 4 }">
            <li :class="{ 'mm-active': $route.path === '/pub' }">
              <router-link to="/pub" active-class="mm-active">Liste</router-link>
            </li>
            <li :class="{ 'mm-active': $route.path === '/add_pub' }" @click="ResetseletPub()">
              <router-link to="/add_pub" active-class="mm-active" >Ajouter</router-link>
            </li>
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="javascript:void(0);" aria-expanded="false" @click="toggleMenu(5)">
            <div class="menu-icon">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M20.9447 2H3.05529C2.88838 1.99997 2.72644 2.0581 2.59616 2.1648C2.46588 2.27151 2.37503 2.42042 2.33858 2.587L1 7.75C1 8.34674 1.23178 8.91903 1.64437 9.34099C2.05695 9.76295 2.61652 10 3.2 10C3.78348 10 4.34305 9.76295 4.75563 9.34099C5.16821 8.91903 5.4 8.34674 5.4 7.75C5.4 8.34674 5.63179 8.91903 6.04437 9.34099C6.45695 9.76295 7.01652 10 7.6 10C8.18348 10 8.74305 9.76295 9.15563 9.34099C9.56821 8.91903 9.8 8.34674 9.8 7.75C9.8 8.34674 10.0318 8.91903 10.4444 9.34099C10.8569 9.76295 11.4165 10 12 10C12.5835 10 13.1431 9.76295 13.5556 9.34099C13.9682 8.91903 14.2 8.34674 14.2 7.75C14.2 8.34674 14.4318 8.91903 14.8444 9.34099C15.2569 9.76295 15.8165 10 16.4 10C16.9835 10 17.5431 9.76295 17.9556 9.34099C18.3682 8.91903 18.6 8.34674 18.6 7.75C18.6 8.34674 18.8318 8.91903 19.2444 9.34099C19.6569 9.76295 20.2165 10 20.8 10C21.3835 10 21.9431 9.76295 22.3556 9.34099C22.7682 8.91903 23 8.34674 23 7.75L21.6604 2.587C21.6244 2.42041 21.5337 2.27142 21.4036 2.16467C21.2734 2.05793 21.1115 1.99983 20.9447 2Z"
                    stroke="#71717A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M2.75 13C2.75 12.5858 2.41421 12.25 2 12.25C1.58579 12.25 1.25 12.5858 1.25 13H2.75ZM22.75 13C22.75 12.5858 22.4142 12.25 22 12.25C21.5858 12.25 21.25 12.5858 21.25 13H22.75ZM1.25 13V20H2.75V13H1.25ZM4 22.75H20V21.25H4V22.75ZM22.75 20V13H21.25V20H22.75ZM20 22.75C21.5188 22.75 22.75 21.5188 22.75 20H21.25C21.25 20.6904 20.6904 21.25 20 21.25V22.75ZM1.25 20C1.25 21.5188 2.48122 22.75 4 22.75V21.25C3.30964 21.25 2.75 20.6904 2.75 20H1.25Z"
                    fill="#71717A"
                  ></path>
                  <rect
                    x="6"
                    y="14"
                    width="4"
                    height="4"
                    rx="0.5"
                    stroke="#71717A"
                    stroke-width="1.5"
                  ></rect>
                  <path
                    d="M18 22V15.5C18 15.2239 17.7761 15 17.5 15H14.5C14.2239 15 14 15.2239 14 15.5V22"
                    stroke="#71717A"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>
            </div>
            <span class="nav-text">Agences</span>
          </a>
          <ul aria-expanded="false" :class="{ 'mm-collapse left': menuExpanded !== 5, 'mm-collapse mm-show': menuExpanded === 5 }">
            <li :class="{ 'mm-active': $route.path === '/stores' }">
              <router-link to="/stores" active-class="mm-active">  Liste </router-link>
            </li>
            <li :class="{ 'mm-active': $route.path === '/add_store' }" @click="ResetseletStore()">
              <router-link to="/add_store" active-class="mm-active" >Ajouter</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuExpanded: null
    };
  },
 created() {
  if (process.client) {
      const storedMenu = localStorage.getItem("menu");
      if (storedMenu !== null) {
        this.menuExpanded = parseInt(storedMenu);

        localStorage.removeItem("menu");
      } else {
        this.menuExpanded = 1;
      }
    }
},

  methods: {
    toggleMenu(menuId) {
      this.menuExpanded = menuId === this.menuExpanded ? null : menuId;
      if (process.client) {
        localStorage.setItem(
          "menu",
          this.menuExpanded !== null ? this.menuExpanded.toString() : ""
        );
      }
    },
    setseletUser(){
      if(this.$store.state.selectedUser){
        this.$store.commit('setSelectedUser', null)
      }
    },
     ResetseletFAQ(){
      if(this.$store.state.selectedFaq){
        this.$store.commit('setSelectedFaq', null)
      }
    },
      ResetseletCatalogue(){
      if(this.$store.state.selectedProduct){
        this.$store.commit('setSelectedProduct', null)
      }
    },
      ResetseletPub(){
      if(this.$store.state.selectedPub){
        this.$store.commit('setSelectedPub', null)
      }
    },
      ResetseletStore(){
      if(this.$store.state.selectedStore){
        this.$store.commit('setSelectedStore', null)
      }
    },
  },
};
</script>