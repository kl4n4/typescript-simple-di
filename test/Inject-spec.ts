import { Inject, SimpleDI } from '../src/SimpleDI';

describe('Given an initialized SimpleDI container and the inject decorator it', () => {

  const decorator = Inject;
  SimpleDI.registerByName('vip', { value: 'important' });
  SimpleDI.registerByName('test', 'important');

  it('Should be able to inject an object into a property of a target object', () => {
    const target: any = { vip: undefined };
    decorator()(target, 'vip');
    expect(target.vip).toBeDefined();
    expect(target.vip.value).toEqual('important');
  });

  it('Should be able to inject an named object into a property of a target object', () => {
    const target: any = { vip: undefined };
    decorator('test')(target, 'vip');
    expect(target.vip).toBeDefined();
    expect(target.vip).toEqual('important');
  });

  it('Should be able to inject an object into a property of a target object with metadata', () => {
    const target: any = { vip: undefined };
    Reflect.defineMetadata('design:type', Object, target, 'vip');
    decorator('vip')(target, 'vip');
    expect(target.vip).toBeDefined();
    expect(target.vip.value).toEqual('important');
  });

});
