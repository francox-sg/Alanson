/* 
1-Sistema de Procesamiento de notas de Estudiantes de un curso
2-Busqueda por ID, 
3-Filtros por el estado del Estudiante, 
4-Reorganizacion de lista por orden de estados y promedios 
*/

// validacion de nombre
const validarNombre = () => {
    let nombreValido = false;
    let nombre;
    while( !nombreValido) {
        nombre = prompt( 'Ingrese el nombre del Estudiante.');
        if( nombre.length >=3) {
            nombreValido = true;
        }else {
            alert( 'El nombre no es válido.')
        }
    }
    return nombre;
}

const validarNota = ( numero) => {
    while( !(numero >= 1 && numero <= 10 && !isNaN( numero))) {
        numero = Number( prompt( 'La nota deberá estar compredida entre 1 y 10.'));
    }
    return numero;
}

const verificarEstado = ( valorPromedio) => {
    if( valorPromedio <4) {
        return 'Desaprobado';
    } else if(( valorPromedio >=4) && ( valorPromedio <7)){
        return 'Aprobado';
    } else if( valorPromedio >7) {
        return 'Promocionado';
    } else {
        return 'Falla en el cálculo del promedio';
    }
}

const validarTotalAlumnos = (listaEstudiantes) => {
    if (listaEstudiantes >= 1 && !isNaN(listaEstudiantes)) {
        return true;
    } else {
        return false;
    }
}

//Listado de Estudiantes predefinidos.

let listaEstudiantes = [
    { id: 1, nombre: 'Alan Bou', nota1: 8, nota2: 7, nota3: 7, promedio: 7.33, status: 'Promocionado'},
    { id: 2, nombre: 'Monica Gutierrez', nota1: 8, nota2: 7, nota3: 7, promedio: 7.33, status: 'Promocionado'},
    { id: 3, nombre: 'Camila Astd', nota1: 6, nota2: 7, nota3: 6, promedio: 6.33, status: 'Aprobado'},
    { id: 4, nombre: 'Silvio Garzon', nota1: 6, nota2: 7, nota3: 6, promedio: 6.33, status: 'Aprobado'},
    { id: 5, nombre: 'Gabo Stimer', nota1: 2, nota2: 3, nota3: 5, promedio: 3.33, status: 'Desaprobado'},
    { id: 6, nombre: 'Claudio Perez', nota1: 2, nota2: 3, nota3: 5, promedio: 3.33, status: 'Desaprobado'},
];



class Estudiante {
    constructor() {
        this.id = listaEstudiantes.length + 1;
        this.nombre = validarNombre();
        this.nota1 = validarNota( Number( prompt( 'Ingrese la nota del primer parcial.')));
        this.nota2 = validarNota( Number( prompt( 'Ingrese la nota del segundo parcial.')));
        this.nota3 = validarNota( Number( prompt( 'Ingrese la nota del tercer parcial.')));
        this.promedio = (( this.nota1 + this.nota2 + this.nota3)/3).toFixed( 2);
        this.status = verificarEstado( this.promedio);
    }
    static getEstudianteById( id) {
        return listaEstudiantes.find(estudiante => estudiante.id === id);
    }
}

let cantidadEstudiantes;

// Programa.

do {
    cantidadEstudiantes = parseInt(prompt('Ingrese el número de estudiantes del curso'));
    if (!validarTotalAlumnos(cantidadEstudiantes)) {
        alert('Error! Ingrese un número válido de estudiantes del curso.');
    }
} while (!validarTotalAlumnos(cantidadEstudiantes));

for (let i = 1; i <= cantidadEstudiantes; i++) {
    const nuevoEstudiante = new Estudiante();
    listaEstudiantes.push(nuevoEstudiante);
}

//Filtro por el estado del Estudiante.

const estudiantesPromocionados = listaEstudiantes.filter( Estudiante => Estudiante.status =='Promocionado');
const estudiantesAprobados = listaEstudiantes.filter( Estudiante => Estudiante.status =='Aprobado');
const estudiantesDesaprobados = listaEstudiantes.filter( Estudiante => Estudiante.status =='Desaprobado');

console.table( listaEstudiantes);
console.log( 'Estudiantes Promocionados');
console.table( estudiantesPromocionados);
console.log( 'Estudiantes Aprobados');
console.table( estudiantesAprobados);
console.log( 'Estudiantes Desaprobados');
console.table( estudiantesDesaprobados);

//Busqueda por ID.
console.log( 'Busqueda por ID del estudiante' + '\n' + 'Cantidad de Estudiantes: ' + listaEstudiantes.length  );
const estudianteBuscado = Estudiante.getEstudianteById(1);
console.log( estudianteBuscado);

// Reorganizacion de lista por orden de Estados.

const top10 = listaEstudiantes.map( estudiante => estudiante).sort( ( a,b) => b.promedio - a.promedio);

console.log( 'Top 10 de los Estudiantes');
console.table( top10);

//Fin.