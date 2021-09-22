

const socket=io();

var user;

const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");

var audio=new Audio('ting.mp3');

const append=(message, position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if(position =='left')
    {
        audio.play();
    }

};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageinput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value="";
})

// alert("Do not refresh page while chatting");
do{
 user= prompt("Enter your name to join :");
}while(!user);
socket.emit('new-user-joined',user);

socket.on('user-joined',user=>{
    append(`${user} : joined the chat`,'right');
});

socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left',user=>{
    append(`${user} : left the chat`,'left')
})