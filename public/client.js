const socket = io()

let userName;
const textArea = document.querySelector("#messageInput")
const messageArea = document.querySelector(".container")

do {
    userName = prompt("Please Enter your Name Here: ")
} while (!userName)


textArea.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        sendMessage(e.target.value)
        
    }
})

function sendMessage(message) {
    const msg = {
        user: userName, 
        message: message.trim()
    }

    // append
    appendMessage(msg, 'right')

    textArea.value = ""

    scrollToBottom()

    // send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    const mainDiv = document.createElement("div")
    const className = type

    mainDiv.classList.add(className, "message")

    const markup = `
        <span>${msg.user}</span>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

// Recieve message 

socket.on('message', (msg) => {
    console.log(msg);

    appendMessage(msg, "left")
    scrollToBottom()
})

// scroll to bottom 

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}