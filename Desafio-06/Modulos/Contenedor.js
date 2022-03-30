//Clase CONTENEDOR que recibe el nombre del archivo
class Contenedor{

    static fs= require('fs'); 

    //constructor que recibe el nombre del archivo
    constructor(nombreArchivoNuevo){
        this.nombreArchivo = nombreArchivoNuevo;
    }

    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo
    async getAll(){
        try{
            //leo el archivo y lo convierto a un array
            if(!Contenedor.fs.existsSync(this.nombreArchivo)){ 
                await Contenedor.fs.promises.writeFile(this.nombreArchivo,"","utf-8"); 
            }
            //leo el archivo y lo convierto a un array
            const contenidoArchivo = await Contenedor.fs.promises.readFile(this.nombreArchivo,"utf-8");
            return Promise.resolve(contenidoArchivo.length>0 ? JSON.parse(contenidoArchivo):[]); 
        }
        catch(error){
            throw Error(`Error en el método "getAll": ${error.message}`);
        }        
    }

    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    async save(object){
        if(object != undefined){ 
            try{
                const arrayContenidoArchivo = await this.getAll();
                let idMasAlto = 0;
                if(arrayContenidoArchivo.length>0){ 
                    idMasAlto =  arrayContenidoArchivo.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
                }
                object.id = idMasAlto+1;
                arrayContenidoArchivo.push(object); 
                
                await Contenedor.fs.promises.writeFile(this.nombreArchivo,JSON.stringify(arrayContenidoArchivo),"utf-8"); //piso el archivo con nuevo array donde agregue nuevo objeto
                return Promise.resolve(object.id);
            }
            catch(error){
                throw Error(`Error en el método "save": ${error.message}`);
            }
        }else{
            Promise.reject(new Error(`Error en el método "save": No existe el objeto recibido`));
        }   
    }

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id){
        try{
            if(id!==undefined && typeof(id) === "number"){ 
                const datosArchivo = await this.getAll(); 
                const objeto = datosArchivo.find(elemento => elemento.id === id); 
                return objeto===undefined ? Promise.reject(Error(`Error en el método "getById": El id ingresado no existe`)) : Promise.resolve(objeto); 
            }else{
                throw Error(`Error en el método "getById": El id ingresado es inválido`);
            }
        }
        catch(error){
            throw Error(`Error en el método "getById": ${error.message}`);
        }
    }

    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(id){
        try{
            if(id!==undefined && typeof(id) === "number"){
                const datosArchivo = await this.getAll(); 
                let indice = datosArchivo.findIndex(element=> element.id === id); 
                if(indice>-1){
                    datosArchivo.splice(indice,1);
                    await Contenedor.fs.promises.writeFile(this.nombreArchivo,JSON.stringify(datosArchivo), "utf-8"); 
                }
                else{ //no se encuentra en el archivo el id que se busca
                    return Promise.reject(Error(`Error en el método "deleteById": El id ingresado no se encontró en el archivo, no se elimina ningún objeto.`));
                }                
            }else{
                throw Error(`Error en el método "deleteById": El id ingresado es inválido`);
            }
        }
        catch(error){
            throw Error(`Error en el método "deleteById": ${error.message}`);
        }
        
    }

    //deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll(){
        try{
            await Contenedor.fs.promises.writeFile(this.nombreArchivo,"", "utf-8"); 
        }
        catch(error){
            throw Error(`Error en el método "deleteAll": ${error.message}`);
        }
    }
}

module.exports = Contenedor;