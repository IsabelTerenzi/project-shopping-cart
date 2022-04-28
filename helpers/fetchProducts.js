const fetchProducts = async (categoria) => {
  try {
  const resultado = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${categoria}`);
  const json = await resultado.json();
  return json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
/* a função FetchProducts seŕa assíncrona e irá receber como parâmetro, uma categoria de produto,
no caso, 'computador'. Então o fetch irá fazer a requisição da API com o link e armazenar isso
na constante resultado. Mas não precisamos de todo o conteúdo da API, e sim, apenas o objeto json,
então vamos acessar apenas essas informações e também armazená-las em uma constante, a json.
Caso o parâmetro não seja uma categoria, o código cai no catch e pega um erro e o retorna.
*/