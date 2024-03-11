const btnRegister = document.getElementById( 'btnRegister');
const formRegister = document.getElementById( 'userRegister');
const formLogin = document.getElementById( 'userLogin');
const btnLogin = document.getElementById( 'btnLogin');

let usuarios = JSON.parse(localStorage.getItem("usuarios"))
console.log(usuarios);

class newUser {
    constructor ( user, pass) {
        this.id = usuarios.length + 1;
        this.user = user;
        this.pass = pass;
        this.admin = false;
    }
}
//loguedo y validacion de usuario
btnLogin.addEventListener( 'click', ( e) => {
    e.preventDefault()

    //console.log( formLogin.children[0].children[1].value);
    const user = formLogin.children[0].children[1].value;
    const pass = formLogin.children[1].children[1].value;

    validarYloguear ( user, pass);

    
})

const validarYloguear = ( user, pass) => {

    const userExistente = usuarios.find((usuario) => usuario?.user === user);
    
    if ( userExistente === undefined || userExistente.pass !== pass) {
        alert( 'Error en usuario o contraseña');
    } else {
        alert( `Bienvenido ${user}`);

        let usuario = {
            user: userExistente.user,
            pass: userExistente.pass,
            admin: userExistente.admin
        }

        sessionStorage.setItem( 'usuario', JSON.stringify( usuario));
        //location.href = "../inicio.html";
    }
}
//fin loguedo y validacion de usuario