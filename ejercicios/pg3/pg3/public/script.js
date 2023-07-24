const tbody = document.querySelector("tbody")

const getProducts = async () => {
    alert("entro en getProducts para conexion a Backend")
    const res = await fetch("http://localhost:3000/productos") //conectando a una ruta del backend
    const productos = await res.json()
    return productos
}

const fillTableWithProducts = async () => {
    const productos = await getProducts()
    tbody.innerHTML = ""
    productos.forEach(product => {
        tbody.innerHTML += `
                <tr>
                    <th>${product.id}</th>
                    <td>${product.nombre}</td>
                    <td>${product.precio}</td>
                </tr >
                `
    })
}

 fillTableWithProducts()