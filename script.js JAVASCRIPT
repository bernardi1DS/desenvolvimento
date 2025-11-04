// ======== Armazenamento temporário ========
let users = [
  { username: "aluno", password: "1234" } // usuário fixo inicial
];

// ======== Login ========
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (username === "" || password === "") {
    errorMsg.textContent = "Por favor, preencha todos os campos.";
    errorMsg.style.opacity = "1";
    return;
  }

  // Verifica se o usuário existe na lista
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("portalPage").style.display = "block";
    errorMsg.style.opacity = "0";
  } else {
    errorMsg.textContent = "Usuário ou senha incorretos.";
    errorMsg.style.opacity = "1";
  }
});

// ======== Cadastro ========
document.getElementById("goToRegister").addEventListener("click", function(event){
  event.preventDefault();
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
});

document.getElementById("backToLogin").addEventListener("click", function(event){
  event.preventDefault();
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
});

document.getElementById("registerForm").addEventListener("submit", function(event){
  event.preventDefault();
  const newUsername = document.getElementById("newUsername").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();

  if(newUsername === "" || newPassword === "") {
    alert("Preencha todos os campos!");
    return;
  }

  // Adiciona novo usuário à lista
  users.push({ username: newUsername, password: newPassword });
  alert("Cadastro realizado com sucesso! Agora faça login.");

  // Redireciona para login
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";

  // Limpa campos
  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
});

// ======== Logout ========
function logout() {
  document.getElementById("portalPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}
