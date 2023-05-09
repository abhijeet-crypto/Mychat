// const express=require('express');
// const app=express();
// const path=require('path');
// const http=require('http').createServer(app);
// const io=require('socket.io')(http);



let element = document.getElementById("#scroller");
element.scrollTop = element.scrollHeight - element.clientHeight; 





// const messageForm = document.querySelector("#message-form");

// messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const message = messageInput.value;
//   // socket.emit('chat message', message);

//   const container = document.querySelector('#container');
//   const newDiv = document.createElement("div");
//   newDiv.textContent = "New content";
//   container.appendChild(newDiv);
//   messageInput.value = "";
// });

// // Scroll to the bottom when new content is added
// element.addEventListener('DOMNodeInserted', () => {
//   element.scrollTop = element.scrollHeight;
// });
