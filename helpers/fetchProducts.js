const fetchProducts = async (categoria) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${categoria}`;
  try {
  const resultado = await fetch(url);
  const json = await resultado.json();
  return json;
  } catch (error) {
    console.log(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}