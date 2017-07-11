import { Inject, SimpleCI } from '../src/SimpleCI';

describe('Given an initialized SimpleCI container and the inject decorator it', () => {

  const decorator = Inject;
  SimpleCI.registerByName('vip', { value: 'important' });

  it('Should be able to inject an object into a property of a target object', () => {
    const target: any = { vip: undefined };
    decorator(target, 'vip');
    expect(target.vip).toBeDefined();
    expect(target.vip.value).toEqual('important');
  });

});
