const socket = io();



window.HTMLElement.prototype.scrollIntoView = function () { };

//variaveis
var msg = [];
let status;
let list_myContact_Added = []
var usersList = []
var emailAdded = false
var boxmsg = document.getElementById("box_Msg");
var list = document.getElementById("list_ul");
var listUsers = document.getElementById("list_users");
var lisMyContacts = document.getElementById("list_myContact");
var imagePreview = document.getElementById("imagePreview");
var codeInfo = document.getElementById("code");
var dt = new Date();
let code;
//variaveis


let fileList;
let fileListBuckup;
const fileSelector = document.getElementById('file');

fileSelector.addEventListener('change', (event) => {
  fileList = event.target.files[0];
  fileListBuckup = event.target.files[0];
  console.log(fileList);

  document.getElementById('imagePreview').style.display = "flex"
  if (fileList.type.split("/")[0] == "image") {
    if (document.getElementById('labelFile')) {
      document.getElementById('labelFile').remove()

    }
    document.getElementById('blah').style.display = "flex"

    document.getElementById('blah').src = URL.createObjectURL(event.target.files[0]);

  } else {
    if (document.getElementById('labelFile')) {
      document.getElementById('labelFile').remove()

    }
    console.log("ok");
    document.getElementById('blah').style.display = "none"
    imagePreview.innerHTML += `<label id="labelFile">
  <i class="fa-solid fa-file fa-2x" style='margin-right:10px'></i> ${" " + fileList.name}</label>`
  }

});

let valueid


var selected = false

let codeCheck = false;

function typeMenssage(value, up, msg) {
  let message

  if (up == true) {
    if (value == "png"
      || value == "jpeg" || value == "gif" || value == "jpg") {
      message = `<img id='imgMsg' src="${msg}"></img>`
    }
    if (value == "mp4"
      || value == "avi"
      || value == "mov") {

      message = `    <video id='imgMsg' controls>
    <source src="${msg}" type="">
  
    Your browser does not support the video tag.
  </video>`
    }
    if (value == "pdf") {
      message = `<embed id='imgMsg' src="${msg}" type='application/pdf'></embed>`
    }
    if (value == "vnd.android.package-archive") {
      message = `<div id='imgMsg' >
    <div class='fileMsg'> 
    <i class="fa-solid fa-file fa-2x" style='margin-right:10px'></i> 
    <a href='${msg}' style='color:grey'>File Apk  </a> 
     <i class="fa-solid fa-download fa-2xs"></i>
     </div>
      </div>`
    }
    if (value == "mp3" || value == "ogg" || value == "aac" || value == "wav") {

      message = `<audio id='imgMsg' controls>
    <source src="${msg}" type="">
  
    Your browser does not support the video tag.
  </audio>`
    }

  }
  else {
    if (value == "png"
      || value == "jpeg" || value == "gif" || value == "jpg") {
      message = `<img id='imgMsg' src="${msg}"></img>`
    }
    if (value == "mp4"
      || value == "avi"
      || value == "mov") {

      message = `<video id='imgMsg' controls>
    <source src="${msg}" type="">
  
    Your browser does not support the video tag.
  </video>`
    }
    if (value == "pdf") {
      message = `<embed id='imgMsg' src="${msg}" type='application/pdf'>`
    }
    if (value == "vnd.android.package-archive") {
      message = `<div id='imgMsg' >
    <div class='fileMsg'> 
    <i class="fa-solid fa-file fa-2x" style='margin-right:10px'></i> 
    <a href='${msg}' style='color:grey'>File Apk  </a> 
     <i class="fa-solid fa-download fa-2xs"></i>
     </div>
      </div>`
    }
    if (value == "mp3" || value == "ogg" || value == "aac" || value == "wav") {

      message = `<audio id='imgMsg' controls>
    <source src="${msg}" type="">
  
    Your browser does not support the video tag.
  </audio>`
    }
  }


  console.log(message);
  return message
}

const updatePage = async () => {

  if (code != undefined || code != "NaN" || code != null) {
    console.log(msg);

    list.innerHTML = "";

    msg.map((value, index) => {

      let formatedTime = value.created_at.slice(0, 5);
      let datamsg = value.datamsg;

        list.innerHTML += `<li>
    <img id='imgProfileMenssage' src='${value.imgProfile}'></img>
    <div class="ball_msg">
    <div class='info_details'>  

    <span id="nickname_ball_msg">${value.remetente}</span>

        <button id='delete'alt='Deletar mensagem' onclick='delet(${value.id})'>X</button>
    
        </div>
 
        <div class='info' > 
        <span class="msg">${value.msg}</span>
        <span id='hour'>${formatedTime}</span>
        
        </div>
       
    </div>
    </li>`;

  
    });

  }


  const e = document.getElementById("area_Menssage");
  const last = document.getElementById(payload.new.id);

  if (e.scrollTop >= e.scrollHeight - 800) {
    e.scrollTo({ top: e.scrollHeight, behavior: "smooth" });
  }

  last.animate(
    [
      { transform: "scale(3)" },
      { transform: "scale(2)" },
      { transform: "scale(1)" },
    ],
    {
      duration: 200,
      direction: "alternate",
    }
  );


};


if (!codeCheck) {
  code = prompt("Digite o código da sala");
  codeCheck = true;

  if (code != null) {
    codeInfo.textContent =': ' +code;
  }

  updatePage();
}


async function send() {

  console.log(fileList);
  document.getElementById('imagePreview').style.display = "none"

    code
    if (code != null || code != '') {

      let valueBoxMenssage = boxmsg.value;


      console.log("passiy no file");
      const date = new Date().toLocaleTimeString();

      if (boxmsg.value != "") {

        let dadoFull = {
          remetente: socket.id,
          sala: code,
          msg: valueBoxMenssage,
          created_at: date
        }

        socket.emit('send_message', dadoFull);

        document.getElementById("box_Msg").value = "";
      }
    }
    else {
      alert("Sem conversa!")
    }

  


}

async function deleteImg() {
  fileList = undefined
  document.getElementById('imagePreview').style.display = "none"

}

socket.on('connect', () => {
  console.log('Status: CONECTADO! ID: ');
  console.log(socket.id)
  socket.emit('join_room', code);
});

// 4. Escuta o evento principal de mensagens da Room
socket.on('new_message', (data) => {
  msg.push(data)
  console.log("enviando para updatepage");
  updatePage()
});
