// Lista de projetos exibidos na seção Projetos
const listaProjetos = [
  {
    titulo: "GamesHub Edu",
    descricao: "Plataforma de jogos educativos em formato quiz, com busca por nome, filtro por matéria e faixa etária indicada.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    link: "",
    imagem: "img/gameshubedu.png",
    alt: "Tela inicial do GamesHub Edu com lista de jogos quiz, campo de busca e filtro por matéria."
  },
  {
    titulo: "RPG Magic Dice",
    descricao: "Site de rolagem de dados para RPG e venda de RPGs, com página inicial, dados, fichas, livros de regras e campanhas gratuitas.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    link: "",
    imagem: "img/rpgmagicdice.png",
    alt: "Página inicial do RPG Magic Dice com menu, capas das campanhas Realm of Legends e Crônicas de Aetheria e um mago acenando."
  },
  {
    titulo: "CineBook",
    descricao: "Projeto de avaliação de livros e filmes, com tela inicial para iniciar sessão ou criar conta.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    link: "",
    imagem: "img/cinebook.png",
    alt: "Tela inicial do CineBook com logo de livro e claquete dourados em fundo escuro e botão Iniciar sessão."
  }
];

// Retorna a saudação de acordo com a hora recebida (0 a 23)
function obterSaudacao(hora) {
  if (hora < 12) {
    return "Bom dia";
  } else if (hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

// Mostra a saudação dinâmica no hero
function mostrarSaudacao() {
  const horaAtual = new Date().getHours();
  document.getElementById("saudacao").textContent = obterSaudacao(horaAtual) + "! Eu sou";
}

// Abre ou fecha o menu no celular e atualiza o aria-expanded
function alternarMenu() {
  const botaoMenu = document.getElementById("botaoMenu");
  const menu = document.getElementById("menuPrincipal");
  const estaAberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(estaAberto));
  botaoMenu.setAttribute("aria-label", estaAberto ? "Fechar menu" : "Abrir menu");
}

// Fecha o menu depois de clicar em um link (celular)
function fecharMenu() {
  document.getElementById("menuPrincipal").classList.remove("aberto");
  const botaoMenu = document.getElementById("botaoMenu");
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
}

// Alterna entre tema escuro e claro e guarda a escolha no localStorage
function alternarTema() {
  const temaClaroAtivo = document.body.classList.toggle("tema-claro");
  try {
    localStorage.setItem("temaPortfolio", temaClaroAtivo ? "claro" : "escuro");
  } catch (erro) {
    // localStorage indisponível: o tema só não será lembrado
  }
}

// Aplica o tema salvo anteriormente, se existir
function carregarTemaSalvo() {
  try {
    if (localStorage.getItem("temaPortfolio") === "claro") {
      document.body.classList.add("tema-claro");
    }
  } catch (erro) {
    // ignora
  }
}

// Insere o ano atual no rodapé
function inserirAnoAtual() {
  document.getElementById("anoAtual").textContent = new Date().getFullYear();
}

// Cria os cards de projetos a partir do array listaProjetos
function criarCardsProjetos() {
  const grade = document.getElementById("gradeProjetos");
  listaProjetos.forEach(function (projeto) {
    const card = document.createElement("article");
    card.className = "card-projeto";

    const imagem = document.createElement("img");
    imagem.src = projeto.imagem;
    imagem.alt = projeto.alt;
    imagem.loading = "lazy";

    const corpo = document.createElement("div");
    corpo.className = "card-corpo";

    const titulo = document.createElement("h3");
    titulo.textContent = projeto.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = projeto.descricao;

    const listaTecnologias = document.createElement("ul");
    listaTecnologias.className = "tecnologias";
    projeto.tecnologias.forEach(function (tecnologia) {
      const item = document.createElement("li");
      item.textContent = tecnologia;
      listaTecnologias.appendChild(item);
    });

    corpo.append(titulo, descricao, listaTecnologias);

    if (projeto.link) {
      const link = document.createElement("a");
      link.href = projeto.link;
      link.textContent = "Ver projeto";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      corpo.appendChild(link);
    } else {
      const emBreve = document.createElement("span");
      emBreve.className = "em-breve";
      emBreve.textContent = "Em breve";
      corpo.appendChild(emBreve);
    }

    card.append(imagem, corpo);
    grade.appendChild(card);
  });
}

// Mostra o botão de voltar ao topo só depois de rolar a página
function controlarBotaoTopo() {
  document.getElementById("botaoTopo").classList.toggle("visivel", window.scrollY > 400);
}

// Escreve ou limpa a mensagem de erro de um campo
function mostrarErro(idErro, texto) {
  document.getElementById(idErro).textContent = texto;
}

// Valida o formulário e retorna true (tudo certo) ou false (há erros)
function validarFormulario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const consentimento = document.getElementById("consentimento").checked;
  let formularioValido = true;

  if (nome === "") {
    mostrarErro("erroNome", "Preencha o seu nome.");
    formularioValido = false;
  } else {
    mostrarErro("erroNome", "");
  }

  if (email === "") {
    mostrarErro("erroEmail", "Preencha o seu e-mail.");
    formularioValido = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    mostrarErro("erroEmail", "Digite um e-mail válido, com @ e ponto.");
    formularioValido = false;
  } else {
    mostrarErro("erroEmail", "");
  }

  if (mensagem === "") {
    mostrarErro("erroMensagem", "Escreva uma mensagem.");
    formularioValido = false;
  } else if (mensagem.length < 20) {
    mostrarErro("erroMensagem", "A mensagem precisa ter pelo menos 20 caracteres.");
    formularioValido = false;
  } else {
    mostrarErro("erroMensagem", "");
  }

  if (!consentimento) {
    mostrarErro("erroConsentimento", "Marque o consentimento para continuar.");
    formularioValido = false;
  } else {
    mostrarErro("erroConsentimento", "");
  }

  return formularioValido;
}

// Trata o envio: valida, mostra sucesso e limpa o formulário
function tratarEnvio(evento) {
  evento.preventDefault();
  const mensagemSucesso = document.getElementById("mensagemSucesso");
  mensagemSucesso.textContent = "";
  if (validarFormulario()) {
    document.getElementById("formContato").reset();
    mensagemSucesso.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
  }
}

// Liga todos os eventos e inicia a página
function iniciarPagina() {
  carregarTemaSalvo();
  mostrarSaudacao();
  inserirAnoAtual();
  criarCardsProjetos();
  document.getElementById("botaoMenu").addEventListener("click", alternarMenu);
  document.querySelectorAll("#menuPrincipal a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
  });
  document.getElementById("botaoTema").addEventListener("click", alternarTema);
  document.getElementById("formContato").addEventListener("submit", tratarEnvio);
  document.getElementById("botaoTopo").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", controlarBotaoTopo);
}

iniciarPagina();
