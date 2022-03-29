class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascotas(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(book) {
        nombre: book.nombre;
        autor: book.autor;
        
        this.libros.push(book);
    }

    getBooksName() {
        this.libros.forEach(book => {
            console.log(book.nombre + ' ' + book.autor);
        });
    }
     
   
}

const usuario1 = new Usuario('Juan', 'Perez', [], []);
console.log(usuario1.getFullName());
usuario1.addMascotas('Perro');
usuario1.addMascotas('Caballo');
usuario1.addMascotas('Gato');
console.log(usuario1.countMascotas());
usuario1.addBook({nombre: 'El señor de los anillos', autor: 'J.R.R. Tolkien'});
usuario1.addBook({nombre: 'El principito', autor: 'Antoine de Saint-Exupéry'});
usuario1.getBooksName();