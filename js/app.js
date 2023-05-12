const URLGET='https://www.dolarsi.com/api/api.php?type=valoresprincipales';
let precioGodOfWar = 70;
let precioHarry = 60;
let precioHorizon = 50;
let valorGow= document.getElementById("valorGodOfWar");
let valorHarry=document.getElementById("valorHowgarts");
let valorHorizon=document.getElementById("valorHorizonFW");
let valores

fetch(URLGET)
.then(result=>result.json())
.then(json=>{   
    valores = json;
    let dolar=valores[1];//en esta posicion esta el valor del dolar que quiero obtener         
    let dolarBlue=parseInt(dolar.casa.venta); //y de ese dolar blue elijo el valor de venta, que lo utilizo para hacer el calculo contra pesos argentinos     
    
    precioGodOfWar = precioGodOfWar*dolarBlue;
    precioHarry = precioHarry*dolarBlue;
    precioHorizon = precioHorizon*dolarBlue;
  
    valorGow.innerHTML=`${precioGodOfWar}`;
    valorHarry.innerHTML=`${precioHarry}`;
    valorHorizon.innerHTML=`${precioHorizon}`;
}).catch(err=>console.log('Hubo un error'));

