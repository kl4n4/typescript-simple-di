import index = require('../src/index');

describe('Given the SimpleCI library it', () => {
  it('Should provide the SimpleCI interface', () => {
    expect(index.SimpleCI).toBeDefined();
    expect(index.SimpleCI.register).toBeDefined();
    expect(typeof index.SimpleCI.register).toEqual('function');
  });

  it('Should provide the Inject decorator', () => {
    expect(index.Inject).toBeDefined();
    expect(typeof index.Inject).toEqual('function');
  });
});
