require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', async () => {
    await expect(typeof fetchItem).toBe('function');
  })
  it('Verifica se ao executar a função com o argumento "MLB1615760527", fetch é chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it('Verifica se ao chamar a função com o argumento "MLB1615760527", fetch utiliza o endpoint esperado', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  it('Verifica se o retorno da função com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const produto = await fetchItem('MLB1615760527')
    expect(produto).toEqual(item);
  })
  it('Verifica se ao chamar a função sem argumento, retorna um erro', async () => {
    const busca = await fetchItem();
    expect(busca).toEqual(new Error('You must provide an url'));
  })
});
