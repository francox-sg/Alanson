import { estudiantesExistentes } from './inicio.js';
import { generarListaEstudiantes } from './inicio.js';


let estudiantesActuales;

setTimeout(() => {
    estudiantesActuales = JSON.parse( localStorage.getItem( 'estudiantes'));
}, 3000);

//buscador de estudiantes.
const buscador = document.getElementById( 'buscadorInput');
//filtrar lista
const filtProm = document.getElementById( 'filtProm');
const filtAprov = document.getElementById( 'filtAprov');
const filtDesap = document.getElementById( 'filtDesap');
const noFlitro = document.getElementById( 'noFlitro');

const verificarEstado = ( valorPromedio) => {
    if( valorPromedio <4) {
        return 'Desaprobado';
    } else if(( valorPromedio >=4) && ( valorPromedio <7)){
        return 'Aprobado';
    } else if( valorPromedio >=7) {
        return 'Promocionado';
    } else {
        return 'Falla en el cálculo del promedio';
    }
}

export class EstudianteCreado {
    constructor( dniEstudiante, nombreEstudiante, modalParcial1, modalParcial2, modalParcial3) {
        this.id = estudiantesActuales.length + 1;
        this.dni = dniEstudiante;
        this.nombre = nombreEstudiante;
        this.nota1 = modalParcial1;
        this.nota2 = modalParcial2;
        this.nota3 = modalParcial3;
        this.promedio = (( this.nota1 + this.nota2 + this.nota3)/3).toFixed( 2);
        this.status = verificarEstado( this.promedio);
    }
}


//Modal para cargar Estudiantes.

const agregaEstudiante = document.getElementById( 'btnAddEst');
const dniEstudiante = document.getElementById('modalDNI');
const nombreEstudiante = document.getElementById('modalNombre');
const modalParcial1 = document.getElementById('modalParcial1');
const modalParcial2 = document.getElementById('modalParcial2');
const modalParcial3 = document.getElementById('modalParcial3');
const textoAlerta = document.getElementById( 'textoAlerta');

if ( document.getElementById( 'btnModalAddEst')) {

    let modal = document.getElementById( 'myModal');
    let button = document.getElementById( 'btnModalAddEst');
    let span = document.getElementsByClassName( 'close')[0];
    let body = document.getElementsByTagName( 'body')[0];

    button.onclick = function () {
        modal.style.display = 'block';
        body.style.position = 'static';
        body.style.height = '100%';
        body.style.overflow = 'hidden';
    }

    span.onclick = function () {
        modal.style.display = 'none';
        body.style.position = 'inherit';
        body.style.height = 'auto';
        body.style.overflow = 'visible';
    }
} 

agregaEstudiante.addEventListener('click', (e) => {
    //validar dni.
    const validarDni =(dni) => {
        if ( dni.length===6 && !isNaN(dni)) {
            return true;
        } else {
            return false;
        }
    }
    const validarNombre = (nombre) => {
        return nombre.length >=3;
    }
    //validar notas
    const validarNotas = (nota) => {
        return !isNaN(nota) && nota >= 1 && nota <= 10;
    }
    if (validarDni(dniEstudiante.value) && validarNombre(nombreEstudiante.value) && validarNotas(Number(modalParcial1.value)) && validarNotas(Number(modalParcial2.value)) && validarNotas(Number(modalParcial3.value))) {
        let nuevoEstudiante = new EstudianteCreado ( dniEstudiante.value, nombreEstudiante.value, Number(modalParcial1.value),Number(modalParcial2.value), Number(modalParcial3.value));
        textoAlerta.style.display = 'none';
        estudiantesActuales.push(nuevoEstudiante);
        localStorage.setItem("estudiantes",JSON.stringify(estudiantesActuales));
        estudiantesActuales = JSON.parse( localStorage.getItem( 'estudiantes'));
        generarListaEstudiantes( estudiantesActuales);

        dniEstudiante.value = '';
        nombreEstudiante.value = '';
        modalParcial1.value = '';
        modalParcial2.value = '';
        modalParcial3.value = '';

        Toastify({
            text: "Estudiante agregado.",
            duration: 2000
            }).showToast();

    } else {
        Swal.fire({
            title: "Error!",
            text: "Alguno de los campos no es válido. 1- Verifique que el DNI contenga 6 digitos. 2- Que el nombre esté compuesto por lo menos de 3 letras. 3- Que las notas esten comprendidas en el rango de 1 a 10.",
            icon: "error"
        });
    }

})
//fin modal.

//Barra buscador.
buscador.addEventListener( 'keyup', (e) => {
    
    const estudiantesFlitro = estudiantesActuales.filter((estudiante) => estudiante.nombre.toLowerCase().includes(e.target.value));
    estudiantesActuales = estudiantesFlitro;

    if ( e.target.value !== ''){
        generarListaEstudiantes( estudiantesFlitro);
    } else {
        estudiantesActuales = JSON.parse( localStorage.getItem( 'estudiantes'));
        generarListaEstudiantes( estudiantesActuales);
    }
})

//filtrar lista.
filtProm.addEventListener( 'click', (e) => {
    const estudiantesPromocionados = estudiantesActuales.filter((estudiante) => estudiante.status === 'Promocionado');
    generarListaEstudiantes(estudiantesPromocionados);
});
filtAprov.addEventListener( 'click', (e) => {
    const estudiantesAprobados = estudiantesActuales.filter((estudiante) => estudiante.status === 'Aprobado');
    generarListaEstudiantes( estudiantesAprobados);
})
filtDesap.addEventListener( 'click', (e) => {
    const estudiantesDesaprobados = estudiantesActuales.filter((estudiante) => estudiante.status === 'Desaprobado');
    generarListaEstudiantes( estudiantesDesaprobados);
})
noFlitro.addEventListener( 'click', (e) => {
    const sinFiltro = estudiantesActuales;
    generarListaEstudiantes( sinFiltro);
})