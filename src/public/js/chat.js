const socketClient = io();

const nameH3 = document.getElementById('name');
const formChat = document.getElementById('formChat');
const inputMessage = document.getElementById('message');
const divChat = document.getElementById('chat');



let user;

Swal.fire({
    title: 'BIENVENIDO',
    text: 'Ingrese su nombre',
    input: 'text',
    inputValidator: (value) =>{
        if(!value){
            return 'Se necesita un nombre'
        }
    }
}).then(nombre =>{
    user = nombre.value;
    nameH3.innerHTML = `Hola ${user}`
    socketClient.emit('userNewConect', user )
    });

    formChat.onsubmit = (e)=>{
        e.preventDefault();

        const infoMensaje = {
            name: user,
            message: inputMessage.value
        }

        socketClient.emit('message', infoMensaje);
    }

    socketClient.on('chat', messages =>{

        const chat = messages.map(objMessage=>{
            return `<p>${objMessage.name}: ${objMessage.message}</p>`
        }).join(' ');

        divChat.innerHTML = chat ;

    });

    socketClient.on('broadcost', user =>{
        Toastyfy({
            text: `${user} se ha conectado`,
            duration:5000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d"
            }
        }).showToast();
    });