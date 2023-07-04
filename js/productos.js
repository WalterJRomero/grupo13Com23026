const { createApp } = Vue
createApp({
    data(){
        return {
            productos: [],                      
            url: 'https://walterjromero.pythonanywhere.com/pages/productos', 
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            }
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.productos = data;
                        this.cargando = false
                    })
                    .catch(err => {
                        console.error(err);
                        this.error = true
                    })
            },
            eliminar(producto) {
                const url = this.url + '/' + producto;
                var options = {
                    method: 'DELETE',
                        }
                Swal.fire({
                    title: '¿Estas seguro que queres eliminar este producto?',
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!'
                    })
                    .then((result) => {
                        if (result.isConfirmed){
                            Swal.fire(
                                'Producto eliminado',  
                                '',                  
                                'success'
                            )
                            fetch(url, options)
                                .then(res => res.text()) 
                                .then(res => {
                                    setTimeout(time=>{location.reload()},1200)
                                })
                        }
                    })           
            },
            grabar() {
                let producto = {
                    nombre: this.nombre,
                    precio: this.precio,
                    stock: this.stock,
                    imagen: this.imagen
                }
                if (producto.nombre ==''){
                    Swal.fire(
                        'Ha surgido un error',
                        'El producto debe tener al menos un nombre',
                        'error'
                    )
                } else {
                    var options = {
                        body: JSON.stringify(producto),
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'follow'
                    }
                    fetch(this.url, options)
                        .then(function () {         
                                Swal.fire(
                                    'Producto dado de alta',
                                    '',
                                    'success'
                                )
                                setTimeout(time=>{window.location.href = "./productos.html";},1200)
                            })
                        .catch(err => {
                            console.error(err);
                            Swal.fire(
                                'Error el grabar',
                                '',
                                'error'
                            )
                            setTimeout(time=>{window.location.href = "./productos.html";},1200)
                        })
                }
            }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')