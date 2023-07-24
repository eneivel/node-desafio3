const tbody = document.querySelector("tbody")

const getDestinos = async () => {
    alert("entro en getDestinos para conexion a Backend")
    const res = await fetch("http://localhost:3000/viajes") //conectando a la ruta del backend
    const viajes = await res.json()
    console.log("Objeto viajes obtenido en getDestinos ", viajes)
    return viajes
    // return viajes.result
}

const pintarTabla = async () => {
    const viajes = await getDestinos()
    console.log("Objeto viajes retornado desde getDestinos ", viajes)
    tbody.innerHTML = ""
    viajes.forEach(viaje => {
        tbody.innerHTML += `
                <tr>
                    <th>${viaje.id}</th>
                    <td>${viaje.destino}</td>
                    <td>${viaje.presupuesto.toFixed(2)}</td>
                </tr >
                `
    })
}

 pintarTabla()