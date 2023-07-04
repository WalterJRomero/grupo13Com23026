var id = location.search.substr(4)
let valorid=document.getElementById("id")
valorid.innerHTML=`${id}`;
const { createApp } = Vue

createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            url: 'https://walterjromero.pythonanywhere.com/pages/productos/' + id,
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
                    this.imagen = data.imagen
                    this.stock = data.stock
                    this.precio = data.precio
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            Swal.fire({
                title: 'Queres modificar el producto?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Actualizar producto',
                denyButtonText: `Cancelar edición`,    
                cancelButtonText:'Seguir editando'            
                }).then((result) => {               
                if (result.isConfirmed) {
                    fetch(this.url, options)
                    .then(function () {                       
                        setTimeout(time=>{window.location.href = "./productos.html";},1200) 
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al Modificar")
                    })
                    Swal.fire('Producto actualizado!', '', 'success')
                    
                } else if (result.isDenied) {
                    Swal.fire('No se guardaron los cambios', '', 'info')
                    setTimeout(time=>{window.location.href = "./productos.html";},1200) 
                }
            })           
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')