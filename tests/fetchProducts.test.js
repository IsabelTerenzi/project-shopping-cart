require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProducts é uma função', async () => {
    await expect(typeof fetchProducts).toBe('function');
  })
  it('Verifica se ao passar como argumento "computador", a função fetch é chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })
  it('Verifica se ao chamar a função com o argumento "computador", o fetch utiliza o endpoint especificado', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })
  it('Verifica se o retorno da função é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const json = await fetchProducts('computador')
    expect(computadorSearch).toEqual(json);
  })
  it('Verifica se ao chamar a função sem argumento, ela retorna um erro', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error.message).toBe('You must provide an url');
    }
  })
});
