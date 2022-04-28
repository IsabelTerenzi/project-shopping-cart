require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', async () => {
    await expect(typeof fetchItem).toBe('function');
  })
  it('Verifica se ao executar a função com o argumento "MLB1615760527", fetch é chamada', async () => {

  })
  it('Verifica se ao chamar a função com o argumento "MLB1615760527", fetch utiliza o endpoint esperado', async () => {

  })
  it('Verifica se o retorno da função com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {

  })
  it('Verifica se ao chamar a função sem argumento, retorna um erro', async () => {
    
  })
});
