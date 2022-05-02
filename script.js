const botaoEsvazia = document.querySelector('.empty-cart');
const cartItems = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
 /* funçao que cria um evento de clique para que toda vez que um item do carrinho for clicado,
 ele ser removido do carrinho. E também chama a saveCartItems, para que ao clicar no item para
 removê-lo, também o remove do local storage.
 */
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
 }

 function createCartItemElement({ sku, name, salePrice }) {
   const li = document.createElement('li');
   li.className = 'cart__item';
   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
   li.addEventListener('click', cartItemClickListener);
   return li;
 }

 /* a função é chamada na createProductItemElement, recebendo um evento como parâmetro, que
 ao acionado, busca o elemento pai de onde foi clicado, ou seja, o id (sku), o title (name)
 e a thumbnail (image) de cada produto, buscando o innerText disso, aguardando a fetchItem,
 que vai fazer a requisição da API pelo id, e então para irá armazenar em uma constante apenas
 o id, o nome e o preço de cada produto, para adicionar ao carrinho. Então esse elemento será
 appendado para que apareçam no carrinho. Com a criação desses elementos, a função que salva
 no local storage também é chamada, para que os itens do carrinho sejam salvos ĺá.
 */

 async function addAoCarrinho(event) {
  const produto = event.target.parentElement.querySelector('.item__sku').innerText;
  const resultadosItem = await fetchItem(produto);
  const cadaItem = { 
  sku: resultadosItem.id,
  name: resultadosItem.title,
  salePrice: resultadosItem.price,
};
const criaItem = createCartItemElement(cadaItem);
cartItems.appendChild(criaItem);
saveCartItems(cartItems.innerHTML);
}

/* função já implementada com o projeto, com a adição de uma constante add que busca o botão de adicionar
ao carrinho e cria o evento de clique para cada um deles, a medida que os elementos da lista de produtos
são criados.
*/

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const add = document.querySelectorAll('.item__add');
  add.forEach((botao) => botao.addEventListener('click', addAoCarrinho));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

/* A função chamaFetchProduct vai buscar a section que contém os elementos com a classe items,
vai chamar o resultado da FetchProducts já com o parâmetro 'computador', da categoria que queremos
e armazenar em uma constante. Então ela vai acessar o array results do objeto json e para cada resultado,
ou seja, para cada produto recebido, vou armazenar em uma constante criarElementos, que terá
o resultado da função createProductItemElement, que cria os elementos, atribuindo cada chave ao valor
acessado no array results, onde precisamos do id, do title e da thumbnail. Então vou appendar o elemento filho
criarElementos no elemento pai sessaoElementos, colocando os produtos na tela do site.
*/

async function chamaFetchProducts() {
  const sessaoElementos = document.querySelector('.items');
  const resultados = await fetchProducts('computador');
  resultados.results.forEach((resultado) => {
    const criarElementos = createProductItemElement({ sku: resultado.id,
      name: resultado.title,
      image: resultado.thumbnail,
});
    sessaoElementos.appendChild(criarElementos);
  });
}

async function enquantoCarrega() {
  const sessaoElementos = document.querySelector('.items');
  const texto = document.createElement('p');
  texto.classList = 'loading';
  texto.innerText = 'carregando...';
  sessaoElementos.appendChild(texto);
  await chamaFetchProducts(); 
  texto.remove();
}

/* ação implementada no botão 'esvaziar carrinho', chamado no topo do arquivo, com a constante botaoEsvazia,
adicionando um clique que limpa o HTML inteiro do carrinho, além de limpar o local storage.
*/
  botaoEsvazia.addEventListener('click', () => {
    cartItems.innerHTML = '';
    localStorage.clear();
  });

window.onload = () => {
  enquantoCarrega();
  cartItems.innerHTML = getSavedCartItems();
  const itens = document.querySelectorAll('.cart__item');
  itens.forEach((botao) => botao.addEventListener('click', cartItemClickListener));
};