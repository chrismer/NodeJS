const socket = io();

//***************************************************************************/
//FUNCIONES
//***************************************************************************/
//agregarMensajeCHAT --> boton enviar nuevo mensaje de chat
function agregarMensajeCHAT(e){
  console.log("INICIO agregarMensajeCHAT");
  // cancela el evento de submit
  e.preventDefault(); 
  // obtengo los datos ingresados en el formulario
  let date = new Date();
  let nuevoMensajeCHAT = {
      email: document.querySelector("input[name=email]").value,
      fecha:  date.toLocaleDateString() + " " + date.toLocaleTimeString(),
      mensaje: document.querySelector("input[name=mensaje]").value
  };
  console.log("agregarMensajeCHAT: obtengo el nuevo mensaje de chat:");
  console.log(nuevoMensajeCHAT)
  //llamo a fx postData para que me genere id al nuevo producto
  console.log("agregarMensajeCHAT: envia mensaje al servidor");
  socket.emit("nuevoMensajeCHAT", nuevoMensajeCHAT);
  //borro solo el mensaje para que vuelva a enviar otro 
  document.querySelector("input[name=mensaje]").value="";
}

// ---------------- mostrarListadoProductos (data) -----------------
//muestra listado de productos por pantalla
async function mostrarListadoProductos(data) {
    console.log("main.js: mostrarListadoProductos - INICIO")
    //obtengo la estructura del html
    const fetchTemplateHbs = await fetch("/templates/listado_productos.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    //lleno la estructura de html obtenida con los productos obtenidos
    const html = template({ productos: data });
    //imprimo en pantalla el html
    document.querySelector("#listado_productos").innerHTML = html;
}

//RENDERLISTADOMENSAJES --> actualiza el chat
const renderListadoMensajes = data => {
  console.log("INICIO - renderListadoMensajes")
  console.log(data)
  let html
  if (data.length != 0 ) { 
      html = data.map(function(elem, index){
          return (`<div>
          <span class="chatEmail">${elem.email}</span>
          <span class="chatFecha">[${elem.fecha}]: </span>
          <span class="chatMensaje">${elem.mensaje}</span>
          </div>`)
      }).join(" ");
  }
  
  document.querySelector("#listadoMensajes").innerHTML = html;
};

//***************************************************************************/
//SOCKET
//***************************************************************************/
//abro conexion del lado del cliente con el mensaje enviado por servidor
//LISTADO PRODUCTOS
socket.on('mensaje_inicio', data => {
    console.log("main.js: socket.on - INICIO")
    console.log(data);
    mostrarListadoProductos(data);
    //socket.emit('notificacion', 'Mensaje recibido exitosamente')
})

//CHAT
socket.on('msgTodosMensajesCHAT', data => {
  console.log("INICIO socket.on - msgTodosMensajes (index.js)");
  console.log("listado mensajes: ");
  console.log(data);
  console.log("Actualizar datos del listado");
  renderListadoMensajes(data);
})

//***************************************************************************/
//EVENTOS
//***************************************************************************/
// CLICK --> BOTON SUBMIT --> FORMULARIO ALTA PRODUCTOS.
  document
  .querySelector("#formAltaProducto") 
  .addEventListener("submit", async (e) => {
    console.log("main.js: Evento submit alta producto - INICIO");
    e.preventDefault();  // cancela el evento de submit
    const date = new Date();
      let fechaHora = date.toLocaleDateString() + " " + date.toLocaleTimeString()
    console.log(fechaHora)
    //obtengo los datos del formulario
    let nuevoProducto = {
        codigo: document.querySelector("#formAltaProducto input[name=codigoProducto]").value,
        fechaHora: fechaHora,
        nombre: document.querySelector("#formAltaProducto input[name=nombreProducto]").value,
        descripcion: document.querySelector("#formAltaProducto input[name=descripcionProducto]").value,
        precio: document.querySelector("#formAltaProducto input[name=precioProducto]").value,
        imagenURL: document.querySelector("#formAltaProducto input[name=imagenProducto]").value,
        stock: document.querySelector("#formAltaProducto input[name=stockProducto]").value,
    };
    console.log(nuevoProducto);
    //llamo a la api que realiza el alta de nuevo producto
    let rtaAgregarProducto = await fetch("/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    });
    //respondo al servidor si se dio o no de alta el producto
    rtaAgregarProducto != null ? socket.emit("mensaje_AltaProducto", {estado: "OK"}) : socket.emit("mensaje_AltaProducto", {estado: "ERROR"});
    //borro los datos del formulario y lo vuelvo a dejar vacio
    document.querySelector("#formAltaProducto input[name=codigoProducto]").value="";
    document.querySelector("#formAltaProducto input[name=nombreProducto]").value="";
    document.querySelector("#formAltaProducto input[name=descripcionProducto]").value="";
    document.querySelector("#formAltaProducto input[name=precioProducto]").value="";
    document.querySelector("#formAltaProducto input[name=imagenProducto]").value="";
    document.querySelector("#formAltaProducto input[name=stockProducto]").value="";
  });


  //Detecta cuando clickean el boton submit con id=altaProducto
window.addEventListener("DOMContentLoaded", async () => {    
  console.log("LOG addEventListener: inicio")  
  //detecta cuando clickea enviar para enviar un mensaje
  let nuevoMensajeCHAT = document.getElementById("nuevoMensajeCHAT");
  nuevoMensajeCHAT.addEventListener("click", agregarMensajeCHAT);    
})