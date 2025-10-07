

let inputBoxCode = document.getElementById("inputBoxCode");
const spanCode = document.getElementById("code");
let code;
function geraStringAleatoria(tamanho) {
  var stringAleatoria = '';
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz0123456789';
  for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}

async function getId() {
  code = geraStringAleatoria(8)
  inputBoxCode.value = code;
  inputBoxCode.select();
  inputBoxCode.setSelectionRange(0, 99999);
  document.execCommand("copy");

  document.getElementById("menssage").style.top = "2em"
  document.getElementById("menssage").style.transitionDuration = "0.5s"

}





async function enterRoom() {
   
   // const { error } = await _supabase.from("salas").insert({ key_room: code });
 
  window.location.assign("/chat");
     
}
