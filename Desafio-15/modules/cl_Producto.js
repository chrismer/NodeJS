//Clase CONTENEDOR que recibe el nombre del archivo
module.exports = class cl_Producto {

    //array con los productos 
    static #arrProductos = [
        {
            id: 1,
            codigo: "A001",
            fechaHora: "01/03/2020 11:11:11",
            nombre: "La Biblioteca de la Medianoche",
            descripcion: "Entre la vida y la muerte hay una biblioteca",
            precio: 30,
            imagenURL: "/img/biblioteca.jpeg",
            stock: 3,
        },
        {
            id: 2,
            codigo: "A002",
            fechaHora: "07/01/2021 11:11:11",
            nombre: "Artemisa",
            descripcion: "La vida en Artemisa, la primera y única ciudad de la Luna",
            precio: 15,
            imagenURL: "/img/artemisa.jpeg",
            stock: 3,
        },
        {
            id: 3,
            codigo: "A003",
            fechaHora: "10/02/2022 11:11:11",
            nombre: "El viento por la cerradura",
            descripcion: "En El viento por la cerradura Stephen King vuelve a los paisajes fascinantes de Mundo Medio",
            precio: 14,
            imagenURL: "/img/viento.jpeg",
            stock: 3,
        },
    ];

    //obtengo el máximo id (lo uso en setProducto)
    #getMaxId(){
        return cl_Producto.#arrProductos.length === 0 ? 0 : cl_Producto.#arrProductos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
    }

    //devuelve todos los productos
    getProductos(){
        return  cl_Producto.#arrProductos.length === 0 ? null : cl_Producto.#arrProductos;
    }

    //devuelve un producto según el id ingresado como parametro
    getProductoById(idProducto){
        return idProducto != undefined && typeof(idProducto) === "number" ? cl_Producto.#arrProductos.find(producto=> producto.id === idProducto): null;
    }

    //recibe y agrega un producto, y lo devuelve con su id asignado
    setProducto(objProductoIN){

        if(objProductoIN.nombre != undefined && 
            objProductoIN.codigo != undefined && 
            objProductoIN.fechaHora != undefined && 
            objProductoIN.codigo != undefined &&
            objProductoIN.descripcion != undefined &&
            (objProductoIN.precio != undefined && parseInt(objProductoIN.precio) != NaN) && 
            (objProductoIN.imagenURL != undefined && objProductoIN.imagenURL != "")){

            let id = this.#getMaxId(); //obtengo el máximo id del array de productos
            id++; //sumo en 1 para asginar al nuevo producto            
            objProductoIN.id = id; //asigno id al nuevo producto
            
            //armo el objetoProducto a agregar y devolver con el nuevo id asignado
            let objProductoOUT =  {   
                id:objProductoIN.id,
                codigo:objProductoIN.codigo,
                fechaHora:objProductoIN.fechaHora,
                nombre:objProductoIN.nombre,
                descripcion:objProductoIN.descripcion,
                precio:objProductoIN.precio,
                imagenURL:objProductoIN.imagenURL,
                stock:objProductoIN.stock,
            };
            cl_Producto.#arrProductos.push(objProductoOUT); // lo agrego a mi arrayProductos
            return objProductoOUT; // lo devuelvo con el nuevo id asignado
        }else{
            return null;
        }
    }

    updateProducto(idProducto,objProducto){

        if(objProducto.nombre != undefined && 
            objProducto.codigo != undefined && 
            objProducto.fechaHora != undefined && 
            objProducto.codigo != undefined &&
            objProducto.descripcion != undefined &&
            (objProducto.imagenURL != undefined && objProducto.imagenURL != "") && 
            (objProducto.precio != undefined && parseInt(objProducto.precio) != NaN) && 
            (idProducto != undefined && typeof(idProducto) === "number")){
            
            //busco la posicion en el array del producto a modificar
            let posicion = cl_Producto.#arrProductos.findIndex(producto=> producto.id === idProducto);
            
            //si la posicion existe , actualizo
            if( posicion > -1){
                //borro producto actual (no modificado)
                cl_Producto.#arrProductos.splice(posicion,1);
                //agrego producto modificado
                cl_Producto.#arrProductos.push(
                    {   
                        id:objProducto.id,
                        codigo:objProducto.codigo,
                        fechaHora:objProducto.fechaHora,
                        nombre:objProducto.nombre,
                        descripcion:objProducto.descripcion,
                        precio:objProducto.precio,
                        imagenURL:objProducto.imagenURL,
                        stock:objProducto.stock,
                    }
                );
                return true; // retorno OK la actualizacion
            }
        }
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }

    //elimina un producto según su id.
    deleteProducto(idProducto){

        if(idProducto != undefined && typeof(idProducto) === "number"){
            //obtengo la posicion en el arrayProductos del id producto ingresado como parametro
            let posicion = cl_Producto.#arrProductos.findIndex(element=> element.id === idProducto);
            
            if( posicion > -1){
                cl_Producto.#arrProductos.splice(posicion,1); //borro producto
                return true; // retorno OK la eliminacion
            }
        }
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }
}

