//funcion para obtener los valores desde una url del dolar
function getURL(){
    if (sessionStorage.getItem("dolarJSON") !=null){
        dolarBlue=parseFloat(JSON.parse(sessionStorage.getItem("dolarJSON")))    
    } else {$.get(URLGET, function (respuesta, estado) {
        if(estado === "success"){
          let misDatos = respuesta;          
          let dolar=misDatos[1];//en esta posicion esta el valor del dolar que quiero obtener, es el dolar aplicado con el 65% de impuestos.          
          dolarBlue=dolar.casa.venta; //y de ese dolar turista elijo el valor de venta, que lo utilizo para hacer el calculo contra pesos argentinos       
          sessionStorage.setItem("dolarJSON",JSON.stringify(dolarBlue));//guardo en mi session storage el valor
        }});
    }    
}

const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
let dolarJSON=[];
let dolarBlue =Number();
let precioGodOfWar = 70
let precioHorizon = 60
let precioHarry = 70

getURL()
console.log("este es el precio del dolar blue " + dolarBlue)

precioGodOfWar = precioGodOfWar*dolarBlue
precioHorizon = precioHorizon*dolarBlue
precioHarry = precioHarry*dolarBlue

console.log("este es el valor del god of war: "+ precioGodOfWar)

console.log("este es el valor de harry : "+precioHarry)

console.log("este es el valor de horizon: "+precioHorizon)