const { createApp } = Vue
createApp({
    data() {
        return {
            url: 'https://nelfervi.pythonanywhere.com/productos',
            productos: [],
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            nombre: "",
            ingred: "",
            prepar: "",
            imagen: "",
        }
    },
    methods: { // aqui se definen  las funciones del objeto VUE
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.productos = data
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err)
                    this.error = true
                })
        },
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')

