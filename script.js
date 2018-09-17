const btnBusca = document.getElementById('btn-busca');
btnBusca.addEventListener('click', trazBusca);
let docs =[];

function buscaPalavra() {
  return document.getElementById("campo-busca").value;
}

function erro() {
  console.log('erro')
}

function trazBusca(event) {
  event.preventDefault(); //evita refresh na pagina
  const pegarNoticia = new XMLHttpRequest();
  pegarNoticia.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?
  q=${buscaPalavra()}&api-key=933bded527e54710a13e6df31e1b0451`);
  pegarNoticia.onload = carregaPosts;
  pegarNoticia.onerror = erro; //tratar erros
  pegarNoticia.send(); //para enviar os dados
}

function carregaPosts(){
  docs = JSON.parse(this.responseText)['response']['docs'];
  exibePosts();
}

function exibePosts() {
  let exibeBusca = document.getElementById('exibe-busca');
  exibeBusca.innerHTML = `
  <div class ='area-noticia'> ${docs.map(doc => `
    <div class ='noticia'>
      <h3>${doc.headline.main}</h3>
      <p>${doc.snippet}</p>
      <a href='${doc.web_url}'>Link para original</a>
    </div>
    `).join("")};
  </div>`;
}
