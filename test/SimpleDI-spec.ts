import { SimpleDI } from '../src/SimpleDI';

class Dismisser {
  sayBye(name?: string): string {
    return `Good bye ${name || 'World'}!`;
  }
}

describe('Given the SimpleDI interface it', () => {
  beforeEach(() => {
    // reset singleton
    (SimpleDI as any).container = null;
  });

  it('Should be able to register a class', () => {
    SimpleDI.register(Dismisser);
    const services = Object.keys(SimpleDI.getAll());
    expect(services.indexOf('dismisser')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(2);
  });

  it('Should be able to register an object with custom name', () => {
    SimpleDI.registerByName('my-dismisser', new Dismisser());
    const services = Object.keys(SimpleDI.getAll());
    expect(services.indexOf('dismisser')).toBeGreaterThanOrEqual(-1);
    expect(services.indexOf('my-dismisser')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(1);
  });

  it('Should be able to get an object by name', () => {
    SimpleDI.register(new Dismisser());
    const services = Object.keys(SimpleDI.getAll());
    expect(services.indexOf('dismisser')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(2);
  });

  it('Should be able to get an object by custom name', () => {
    // register object
    SimpleDI.registerByName('my-dismisser', new Dismisser());

    const dismisser = SimpleDI.get('my-dismisser');
    expect(dismisser).toBeDefined();
    expect(dismisser.sayBye).toBeDefined();
  });

  it('Should be able to get an object by type', () => {
    // register object
    SimpleDI.register(new Dismisser());

    const dismisser = SimpleDI.getByType(Dismisser);
    expect(dismisser).toBeDefined();
    expect(dismisser.sayBye).toBeDefined();
  });

  it('Should be able to add an inject property', () => {
    // register object
    SimpleDI.registerByName('dismisser', new Dismisser());

    const target: any = { dismisser: undefined };
    SimpleDI.addInjectProperty(target, 'dismisser');
    expect(target.dismisser).toBeDefined();
    expect(target.dismisser.sayBye).toBeDefined();
  });
});
