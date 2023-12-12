const { createApp } = Vue  //creo un objeto VUE llamdo createApp

createApp({
  data() {
    return {
      url: "https://api.sampleapis.com/wines/reds",
      recipesAll: [],
      recipes: [],
    }
  },
  methods: {
    async fetchData(url) {  // necesite un async y await porque seguia de largo y no me cargaba el array recipes ni las listas desplegables
      resp = await fetch(url)
      this.recipesAll = await resp.json()
      this.recipes = this.recipesAll
    },
  },
  async created() {
    await this.fetchData(this.url)
    this.cargarListasDesplegables
  }
}).mount('#app')

