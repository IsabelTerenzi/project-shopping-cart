function addEventos() {
  const add = document.querySelectorAll('.item__add');
  add.forEach((botao) => botao.addEventListener('click', cartItemClickListener));
}

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartItemClickListener(event) {
 const produto = event.target.parentElement.querySelector('.item__sku').innerText;
 const lista = document.querySelector('.cart__items');
 const resultadosItem = await fetchItem(produto);
 const cadaItem = { 
  sku: resultadosItem.id,
  name: resultadosItem.title,
  salePrice: resultadosItem.price,
};
const criaItem = createCartItemElement(cadaItem);
  lista.appendChild(criaItem);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const chamaFetchProduct = async () => {
  const sessaoElementos = document.querySelector('.items');
  const resultados = await fetchProducts('computador');
  resultados.results.forEach((resultado) => {
    const criarElementos = createProductItemElement({ sku: resultado.id,
      name: resultado.title,
      image: resultado.thumbnail,
});
    sessaoElementos.appendChild(criarElementos); 
  });
};

/* A função chamaFetchProduct vai buscar a section que contém os elementos com a classe items,
vai chamar o resultado da FetchProducts já com o parâmetro 'computador', da categoria que queremos
e armazenar em uma constante. Então ela vai acessar o array results do objeto json e para cada resultado,
ou seja, para cada produto recebido, vou armazenar em uma constante criarElementos, que terá
o resultado da função createProductItemElement, que cria os elementos, atribuindo cada chave ao valor
acessado no array results, onde precisamos do id, do title e da thumbnail. Então vou appendar o elemento filho
criarElementos no elemento pai sessaoElementos, colocando os produtos na tela do site.
*/

window.onload = async () => {
  await chamaFetchProduct();
  addEventos();
};
