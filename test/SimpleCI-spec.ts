import { SimpleCI } from '../src/SimpleCI';

class Dismisser {
  sayBye(name?: string): string {
    return `Good bye ${name || 'World'}!`;
  }
}

describe('Given the SimpleCI interface it', () => {
  beforeEach(() => {
    // reset singleton
    (SimpleCI as any).container = null;
  });

  it('Should be able to register a class', () => {
    SimpleCI.register(Dismisser);
    const services = Object.keys(SimpleCI.getAll());
    expect(services.indexOf('dismisser')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(2);
  });

  it('Should be able to register an object with custom name', () => {
    SimpleCI.registerByName('my-dismisser', new Dismisser());
    const services = Object.keys(SimpleCI.getAll());
    expect(services.indexOf('dismisser')).toBeGreaterThanOrEqual(-1);
    expect(services.indexOf('my-dismisser')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(1);
  });

  it('Should be able to get an object by name', () => {
    SimpleCI.register(new Dismisser());
    const services = Object.keys(SimpleCI.getAll());
    expect(services.indexOf('dismisser')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(2);
  });

  it('Should be able to get an object by custom name', () => {
    // register object
    SimpleCI.registerByName('my-dismisser', new Dismisser());

    const dismisser = SimpleCI.get('my-dismisser');
    expect(dismisser).toBeDefined();
    expect(dismisser.sayBye).toBeDefined();
  });

  it('Should be able to get an object by type', () => {
    // register object
    SimpleCI.register(new Dismisser());

    const dismisser = SimpleCI.getByType(Dismisser);
    expect(dismisser).toBeDefined();
    expect(dismisser.sayBye).toBeDefined();
  });

  it('Should be able to add an inject property', () => {
    // register object
    SimpleCI.registerByName('dismisser', new Dismisser());

    const target: any = { dismisser: undefined };
    SimpleCI.addInjectProperty(target, 'dismisser');
    expect(target.dismisser).toBeDefined();
    expect(target.dismisser.sayBye).toBeDefined();
  });
});
