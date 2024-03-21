import { createStore } from 'vuex'
import axios from 'axios'
import { getCookie } from "../utils/functions"

export default {
    state:() => ({
    users: [],
    selectedUser: null,
    uploadedFile: null,
    currentUser: null,
    selectedProduct: null,
    selectedStore: null,
    catalogues: [],

    productCategory: [
      {
        "id": 1,
        "title": "Electronics",
        "description": "Electronic devices and accessories",
        "total": 10,
        "createdDate": "2023-01-10"
      },
      {
        "id": 2,
        "title": "Sports",
        "description": "Sports equipment and accessories",
        "total": 3,
        "createdDate": "2023-02-15"
      },
      {
        "id": 3,
        "title": "Food & Beverages",
        "description": "Food items and beverages",
        "total": 1,
        "createdDate": "2023-03-20"
      },
      {
        "id": 4,
        "title": "Home & Kitchen",
        "description": "Household items and kitchenware",
        "total": 5,
        "createdDate": "2023-04-25"
      }
    ],
    mode: 'card',
   
    faqData: [],
    stores: [],
    faqCategory: [

    ],
    selectedFaqCategory: null,
    selectedFaq: null,
    updateMode: false,
    selectedProductCategory: null,
  
    selectedStoreProvince: null,
    publicity: [],
    selectedPub: null,
    groupes: [],
    userLogs: [],
    currentPage: 1,
    totalPage: ""




  }),
  getters: {
    getUsers: state => state.users

  },
  mutations: {
    setSelectedAction(state, action) {
      state.selectedAction = action;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setFaqCategory(state, category) {
      state.faqCategory = category;
    },
    setSelectedUser(state, user) {
      state.selectedUser = user;
    },
    setUploadedFile(state, file) {
      state.uploadedFile = file;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product
    },
    setProduits(state, product) {
      state.produits = product
    },
    setFAQ(state, faq) {
      state.faqData = faq
    },
    setStores(state, stores) {
      state.stores = stores
    },
    setCatalogue(state, catalogue) {
      state.catalogues = catalogue
    },
    setSelectedFaq(state, faq) {
      state.selectedFaq = faq;
    },
    setPublicity(state, pub) {
      state.publicity = pub;
    },
    setSelectedPub(state, pub) {
      state.selectedPub = pub
    },
    setSelectedStore(state, store) {
      state.selectedStore = store
    },
    setSelectedFaqCategory(state, category) {
      state.selectedFaqCategory = category
    },
    setUpdateMode(state, updateMode) {
      state.updateMode = updateMode
    },
    setSelectedProductCategory(state, category) {
      state.selectedProductCategory = category
    },
    setSelectedProductBrand(state, brand) {
      state.selectedProductBrand = brand
    },
    selectedStoreProvince(state, province) {
      state.selectedStoreProvince = province
    },
    setCatalogueGroup(state, groupe) {
      state.groupes = groupe
    },
    setUserLogs(state, logs) {
      state.userLogs = logs
    },
    setCurrentPage(state, page){
      state.currentPage = page
    },
    setTotalPage(state, page){
      state.totalPage = page
    },
    setMode(state, mode){
      state.mode = mode
    }

  },
  actions: {
    fetchUserLogs({ commit, state }) {
      const token = getCookie("token")
      axios.get(process.env.VUE_APP_API_URL + '/users-logs/list', {
        params: {
          user_id: state.selectedUser.id,
          page: state.currentPage,
          limit: 10,
          order: 'desc'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setUserLogs', response.data.data);
          commit('setTotalPage', response.data.meta.total)
        })
        .catch(error => {
          console.error('Error fetching category:', error);
        });
    },
    fetchUsers({ commit }) {
      const token = getCookie("token")
      axios.post(process.env.VUE_APP_API_URL + '/users/get-list', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setUsers', response.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchFaqCategory({ commit }) {
      const token = getCookie("token")
      axios.get(process.env.VUE_APP_API_URL + '/faq/category/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setFaqCategory', response.data);
        })
        .catch(error => {
          console.error('Error fetching category:', error);
        });
    },
    fetchFaqListe({ commit }) {
      const token = getCookie("token")
      axios.get(process.env.VUE_APP_API_URL + '/faq/list-responses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setFAQ', response.data);
        })
        .catch(error => {
          console.error('Error fetching category:', error);
        });
    },
    fetchStores({ commit }) {
      const token = getCookie("token")
      axios.get(process.env.VUE_APP_API_URL + '/agences/list?order=asc', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setStores', response.data);
        })
        .catch(error => {
          console.error('Error fetching category:', error);
        });
    },
    fetchPublicity({ commit }) {
      const token = getCookie("token")
      axios.get(process.env.VUE_APP_API_URL + '/advertisement/list?order=asc', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setPublicity', response.data);
        })
        .catch(error => {
          console.error('Error fetching category:', error);
        });
    },
    fetchCatalogue({ commit }) {
      const token = getCookie("token")
      axios.get(process.env.VUE_APP_API_URL + '/catalogue/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setCatalogue', response.data);
        })
        .catch(error => {
          console.error('Error fetching category:', error);
        });
    },
    fetchGroupListe({ commit }) {
      const token = getCookie("token")
      axios.get(process.env.VUE_APP_API_URL + '/catalogue/groups', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          commit('setCatalogueGroup', response.data);
        })
        .catch(error => {
          console.error('Error fetching category:', error);
        });
    },
  },
  modules: {
  }
}
