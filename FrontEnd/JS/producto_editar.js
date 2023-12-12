console.log(location.search)     // lee los argumentos pasados a este formulario
var id = location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            ingred: "",
            prepar: "",
            imagen: "",
            url: 'https://nelfervi.pythonanywhere.com/productos/' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.ingred = data.ingred
                    this.prepar = data.prepar
                    this.imagen = data.imagen
                })
                .catch(err => {
                    console.error(err)
                    this.error = true
                })
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                ingred: this.ingred,
                prepar: this.prepar,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Receta modificada")
                    window.location.href = "./productos.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err)
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
