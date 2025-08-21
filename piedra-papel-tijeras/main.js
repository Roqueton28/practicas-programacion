//Proyecto basado en el juego Piedra-Papel-Tijeras

//Funciones

const mostrarSeleccion = () => {
    console.log(txtPlayer.value)
    alert(txtPlayer.value)
}



const root = document.getElementById('root')

//Fase #1: Bienvenida al juego
const h1Bienvenida = document.createElement('h1')
h1Bienvenida.textContent = 'Bienvenido(a) al Juego'
root.appendChild(h1Bienvenida)

//Fase #2: Seleccion de armas

let puntosPlayer = 0
let seleccionPlayer = ''

const lblPlayer = document.createElement('label')
lblPlayer.textContent = 'Usuario: '
root.appendChild(lblPlayer)

const txtPlayer = document.createElement('input')
txtPlayer.placeholder = 'Introduzca su seleccion'
root.appendChild(txtPlayer)

const btnPlayer = document.createElement('button')
btnPlayer.textContent = 'Enviar'
btnPlayer.addEventListener('click', mostrarSeleccion)
root.appendChild(btnPlayer)

const pSeleccion = document.createElement('p')
root.appendChild(pSeleccion)


