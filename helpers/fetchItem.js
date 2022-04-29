const fetchItem = async (id) => {
  try {
    const item = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const json = await item.json();
    return json;
  } catch (error) {
    return error;
  }
};

/* Essa função é igual a fetchProduct, mas nessa iremos pegar a informação de cada produto
através do seu id. 
*/

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
