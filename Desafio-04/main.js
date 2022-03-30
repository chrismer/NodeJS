//importo la clase CONTENEDOR para poder usarla
const Contenedor = require("./Modulos/Contenedor.js");

//set de datos para poder realizar pruebas 
const productos = [     
    {title:'Escuadra', price:123.45, type:'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'},
    {title:'Calculadora', price:234.56, type:'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'},
    {title:'Globo Terráqueo', price:345.67, type:'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'},                                                                                                                                                
];

//creo funcion para probar ya que await solo es válido en funcion async
async function main(){

    // TESTING DEL save(Object): Number  Y getAll(): Object[] (save llama a getall)
    //recorro el archivo Productos.txt y lo cargo en el archivo.
    const contenedorProductos = new Contenedor("./productos.txt");
    try{
        for (const producto of productos) {
            await contenedorProductos.save(producto);  
        }
    }
    catch(error){
        console.log(error.message);
    }     

    // TESTING DEL getById(Number): Object 
    console.log("\n1- Mostrar el objeto del id 1 (getById(Number): Object )");
    contenedorProductos.getById(1).then(objeto1 => console.log(objeto1)).catch(error=>console.log(error.message)); 
    
    //TESTING DEL deleteById(Number): void
    // console.log("\n2- Borrar el objeto del id 2 (deleteById(Number): void)");
    // contenedorProductos.deleteById(2).then(() => console.log(" Se borró el objeto con id 2")).catch(error=>console.log(error.message));
    
    //TESTING DEL  deleteAll(): void 
    // console.log("\n3- Borrar el contenido del archivo (deleteAll(): void )"); 
    //contenedorProductos.deleteAll().then(()=>console.log(" Se borró todo el contenido del archivo Productos.txt")); 

}

//ejecuto la funcion principal
main();