import index = require('../src/index');

describe('Given the SimpleDI library it', () => {
  it('Should provide the SimpleDI interface', () => {
    expect(index.SimpleDI).toBeDefined();
    expect(index.SimpleDI.register).toBeDefined();
    expect(typeof index.SimpleDI.register).toEqual('function');
  });

  it('Should provide the Inject decorator', () => {
    expect(index.Inject).toBeDefined();
    expect(typeof index.Inject).toEqual('function');
  });
});
