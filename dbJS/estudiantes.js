
//import { renderNuevoEstudiante } from "../js/planillaEstudiantes.js";
import { EstudianteCreado } from "../js/planillaEstudiantes.js";

//Listado de Estudiantes predefinidos.
/* export let estudiantes = [
    { id: 1, dni: '365714', nombre: 'Alan Bou', nota1: 8, nota2: 7, nota3: 7, promedio: 7.33, status: 'Promocionado'},
    { id: 2, dni: '256571', nombre: 'Monica Gutierrez', nota1: 8, nota2: 7, nota3: 7, promedio: 7.33, status: 'Promocionado'},
    { id: 3, dni: '431228', nombre: 'Camila Astd', nota1: 6, nota2: 7, nota3: 6, promedio: 6.33, status: 'Aprobado'},
    { id: 4, dni: '305973', nombre: 'Silvio Garzon', nota1: 6, nota2: 7, nota3: 6, promedio: 6.33, status: 'Aprobado'},
    { id: 5, dni: '224318', nombre: 'Gabo Stimer', nota1: 2, nota2: 3, nota3: 5, promedio: 3.33, status: 'Desaprobado'},
    { id: 6, dni: '196754', nombre: 'Claudio Perez', nota1: 2, nota2: 3, nota3: 5, promedio: 3.33, status: 'Desaprobado'}
]; */
export let estudiantes = [];
console.log("entrooooo");
//let estudiantesGet = [];
fetch('../data/data.json')
.then(response => response.json())
.then(data => {
    estudiantes = data;
    JSON.parse( localStorage.getItem( 'estudiantes')) || localStorage.setItem( 'estudiantes', JSON.stringify(estudiantes));
    
})



//agregar los estudiantes renderizados a la lista de estudiantes existente.

const nuevoEstudiante = EstudianteCreado;