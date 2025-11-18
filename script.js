// ======== Armazenamento temporário ========
let users = [
  // Agora usando email como exemplo
  { username: "aluno@escola.com", password: "senha1234" }
];

// ======== Login ========
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.style.opacity = "0";

  if (username === "" || password === "") {
    errorMsg.textContent = "Por favor, preencha todos os campos.";
    errorMsg.style.opacity = "1";
    return;
  }

  // Não restringe mais para só letras: aceita qualquer email digitado

  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  if (user) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("portalPage").style.display = "block";
    errorMsg.style.opacity = "0";
  } else {
    errorMsg.textContent = "Email ou senha incorretos.";
    errorMsg.style.opacity = "1";
  }
});

// ======== Navegação entre Login e Cadastro ========
document.getElementById("goToRegister").addEventListener("click", function(event){
  event.preventDefault();
  clearRegisterErrors();
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
});

document.getElementById("backToLogin").addEventListener("click", function(event){
  event.preventDefault();
  clearRegisterErrors();
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
});

// ======== Cadastro ========
document.getElementById("registerForm").addEventListener("submit", function(event){
  event.preventDefault();
  const newUsername = document.getElementById("newUsername").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const registerError = document.getElementById("registerError");

  registerError.style.opacity = "0";

  if(newUsername === "" || newPassword === "") {
    registerError.textContent = "Preencha todos os campos!";
    registerError.style.opacity = "1";
    return;
  }

  // Não restringe mais para só letras: aceita qualquer email digitado

  if (newPassword.length < 8) {
    registerError.textContent = "A senha deve ter no mínimo 8 caracteres.";
    registerError.style.opacity = "1";
    return;
  }

  // Verifica se o email já existe (case-insensitive)
  const exists = users.some(u => u.username.toLowerCase() === newUsername.toLowerCase());
  if (exists) {
    registerError.textContent = "Email já cadastrado. Escolha outro.";
    registerError.style.opacity = "1";
    return;
  }

  users.push({ username: newUsername, password: newPassword });

  alert("Cadastro realizado com sucesso! Agora faça login.");

  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
  registerError.style.opacity = "0";
});

// ======== Funções úteis ========
function clearRegisterErrors() {
  const registerError = document.getElementById("registerError");
  if (registerError) {
    registerError.style.opacity = "0";
  }
}

// ======== Logout ========
function logout() {
  document.getElementById("portalPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}
