// ======== Armazenamento temporário ========
let users = [
  // usuário inicial ajustado para obedecer a regra de senha mínima (8 caracteres)
  { username: "aluno", password: "senha1234" }
];

// Regex para permitir apenas letras (inclui letras acentuadas) e espaços
const usernameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

// ======== Login ========
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Limpa mensagem anterior
  errorMsg.style.opacity = "0";

  if (username === "" || password === "") {
    errorMsg.textContent = "Por favor, preencha todos os campos.";
    errorMsg.style.opacity = "1";
    return;
  }

  // Verifica se o username contém apenas caracteres (letras e espaços)
  if (!usernameRegex.test(username)) {
    errorMsg.textContent = "O nome de usuário deve conter apenas letras.";
    errorMsg.style.opacity = "1";
    return;
  }

  // Verifica se o usuário existe na lista
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  if (user) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("portalPage").style.display = "block";
    errorMsg.style.opacity = "0";
  } else {
    errorMsg.textContent = "Usuário ou senha incorretos.";
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

  // Limpa mensagem anterior
  registerError.style.opacity = "0";

  if(newUsername === "" || newPassword === "") {
    registerError.textContent = "Preencha todos os campos!";
    registerError.style.opacity = "1";
    return;
  }

  // Valida nome: apenas caracteres (letras/acentos/espaços)
  if (!usernameRegex.test(newUsername)) {
    registerError.textContent = "O nome de usuário deve conter apenas letras.";
    registerError.style.opacity = "1";
    return;
  }

  // Valida senha: mínimo 8 caracteres
  if (newPassword.length < 8) {
    registerError.textContent = "A senha deve ter no mínimo 8 caracteres.";
    registerError.style.opacity = "1";
    return;
  }

  // Verifica se o usuário já existe (case-insensitive)
  const exists = users.some(u => u.username.toLowerCase() === newUsername.toLowerCase());
  if (exists) {
    registerError.textContent = "Nome de usuário já existe. Escolha outro.";
    registerError.style.opacity = "1";
    return;
  }

  // Adiciona novo usuário à lista
  users.push({ username: newUsername, password: newPassword });

  // Mensagem de sucesso (pode ser alterado para modal ou toast)
  alert("Cadastro realizado com sucesso! Agora faça login.");

  // Redireciona para login
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";

  // Limpa campos e mensagens
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
