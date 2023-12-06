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

        eliminar(id) {
            var resultado = window.confirm('Estas por eliminar la receta!!\nSi estas seguro Aceptar de lo contrario Cancelar.');
            if (resultado === true) {
                const url = this.url + '/' + id;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        alert('Receta Eliminada')
                        location.reload(); // recarga el json luego de eliminado el registro
                    })
            } else {
                window.alert('Operacion cancelada!! La receta no se ha eliminado!!');
            }
        },

        grabar() {
            let producto = {
                nombre: this.nombre,
                ingred: this.ingred,
                prepar: this.prepar,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Receta Grabada")
                    window.location.href = "./productos.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')

