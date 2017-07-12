import { Inject, SimpleDI } from '../src/SimpleDI';

describe('Given an initialized SimpleDI container and the inject decorator it', () => {

  const decorator = Inject;
  SimpleDI.registerByName('vip', { value: 'important' });

  it('Should be able to inject an object into a property of a target object', () => {
    const target: any = { vip: undefined };
    decorator(target, 'vip');
    expect(target.vip).toBeDefined();
    expect(target.vip.value).toEqual('important');
  });

});
