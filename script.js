// ======== Armazenamento temporário ========
let users = [
  // Agora usando email como exemplo
  { username: "aluno@escola.com", password: "senha1234" }
];

// ======== Dados das notícias ========
const newsList = [
  {
    title: "Calendário Escolar Atualizado",
    content: "As datas das avaliações finais já estão disponíveis no calendário escolar.",
    date: "2025-12-04"
  },
  {
    title: "Culminância 2025",
    content: "Anunciamos o início da Culminância Escolar, momento destinado à exposição dos projetos e aprendizagens construídos.",
    date: "2025-12-01"
  }
];

// Renderiza as notícias ordenadas (mais nova primeiro)
function renderNews() {
  const container = document.getElementById("newsContainer");
  if (!container) return;
  container.innerHTML = "";
  // Ordena por data decrescente
  newsList.sort((a, b) => new Date(b.date) - new Date(a.date));
  newsList.forEach(news => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <span style='font-size:13px;color:#666;'>${formatDate(news.date)}</span>
      <h3>${news.title}</h3>
      <p>${news.content}</p>
    `;
    container.appendChild(card);
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Chama renderização ao mostrar portal
function showPortal() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("portalPage").style.display = "block";
  renderNews();
}

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

  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  if (user) {
    showPortal();
    errorMsg.style.opacity = "0";
  } else {
    errorMsg.textContent = "Email ou senha incorretos.";
    errorMsg.style.opacity = "1";
  }
});

// ======== Usuário administrador ========
const adminUser = { username: "admin", password: "admin123" };

// ======== Navegação Login Admin ========
document.getElementById("goToAdminLogin").addEventListener("click", function(event){
  event.preventDefault();
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("adminLoginPage").style.display = "block";
});
document.getElementById("backToUserLogin").addEventListener("click", function(event){
  event.preventDefault();
  document.getElementById("adminLoginPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
});

// ======== Login Admin ========
document.getElementById("adminLoginForm").addEventListener("submit", function(event){
  event.preventDefault();
  const user = document.getElementById("adminUser").value.trim();
  const pass = document.getElementById("adminPass").value.trim();
  const errorMsg = document.getElementById("adminErrorMsg");
  errorMsg.style.opacity = "0";
  if(user === adminUser.username && pass === adminUser.password) {
    document.getElementById("adminLoginPage").style.display = "none";
    document.getElementById("adminPortalPage").style.display = "block";
    renderAdminNews();
  } else {
    errorMsg.textContent = "Usuário ou senha incorretos.";
    errorMsg.style.opacity = "1";
  }
});

// ======== Criar Nova Notícia ========
document.getElementById("createNewsForm").addEventListener("submit", function(event){
  event.preventDefault();
  const title = document.getElementById("newsTitle").value.trim();
  const content = document.getElementById("newsContent").value.trim();
  if(title && content) {
    newsList.push({
      title,
      content,
      date: new Date().toISOString().slice(0,10)
    });
    renderAdminNews();
    document.getElementById("newsTitle").value = "";
    document.getElementById("newsContent").value = "";
  }
});

// ======== Renderizar e Editar Notícias Admin ========
function renderAdminNews() {
  const container = document.getElementById("adminNewsContainer");
  if (!container) return;
  container.innerHTML = "";
  newsList.sort((a, b) => new Date(b.date) - new Date(a.date));
  newsList.forEach((news, idx) => {
    const card = document.createElement("div");
    card.className = "news-card admin-edit-card";
    card.innerHTML = `
      <span style='font-size:13px;color:#666;'>${formatDate(news.date)}</span>
      <input type='text' value='${news.title}' class='edit-title' />
      <textarea class='edit-content'>${news.content}</textarea>
      <button class='save-news' data-idx='${idx}'>Salvar</button>
    `;
    container.appendChild(card);
  });
  // Adiciona evento de salvar
  Array.from(container.getElementsByClassName('save-news')).forEach(btn => {
    btn.onclick = function() {
      const i = parseInt(btn.getAttribute('data-idx'));
      const title = btn.parentElement.querySelector('.edit-title').value.trim();
      const content = btn.parentElement.querySelector('.edit-content').value.trim();
      if(title && content) {
        newsList[i].title = title;
        newsList[i].content = content;
        renderAdminNews();
        renderNews();
      }
    };
  });
}

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

  if (newPassword.length < 8) {
    registerError.textContent = "A senha deve ter no mínimo 8 caracteres.";
    registerError.style.opacity = "1";
    return;
  }

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

function logoutAdmin() {
  document.getElementById("adminPortalPage").style.display = "none";
  document.getElementById("adminLoginPage").style.display = "block";
}
