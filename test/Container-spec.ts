import { Container } from '../src/Container';

class Greeter {
  sayHello(name?: string): string {
    return `Hello ${name || 'World'}!`;
  }
}

describe ('Given an IoC container it', () => {
  let container: Container;
  beforeEach(() => {
    container = new Container();
    const services = Object.keys(container.getAll());
    expect(services.length).toEqual(0);
  });

  it('Should be able to register a class', () => {
    container.register(Greeter);
    const services = Object.keys(container.getAll());
    expect(services.indexOf('greeter')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(2);
  });

  it('Should be able to register a class with custom name', () => {
    container.registerByName('my-greeter', Greeter);
    const services = Object.keys(container.getAll());
    expect(services.indexOf('greeter')).toBeGreaterThanOrEqual(-1);
    expect(services.indexOf('my-greeter')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(1);
  });

  it('Should be able to register an object with custom name', () => {
    container.registerByName('my-greeter', new Greeter());
    const services = Object.keys(container.getAll());
    expect(services.indexOf('greeter')).toBeGreaterThanOrEqual(-1);
    expect(services.indexOf('my-greeter')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(1);
  });

  it('Should be able to get an object by name', () => {
    container.register(new Greeter());
    const services = Object.keys(container.getAll());
    expect(services.indexOf('greeter')).toBeGreaterThanOrEqual(0);
    expect(services.length).toEqual(2);
  });

  it('Should be able to get an object by custom name', () => {
    // register object
    container.registerByName('my-greeter', new Greeter());

    const greeter = container.get<Greeter>('my-greeter');
    expect(greeter).toBeDefined();
    expect(greeter.sayHello).toBeDefined();
  });

  it('Should be able to get an object by type', () => {
    // register object
    container.register(new Greeter());

    const greeter = container.getByType(Greeter);
    expect(greeter).toBeDefined();
    expect(greeter.sayHello).toBeDefined();
  });

  it('Should be able to add an inject property', () => {
    // register object
    container.registerByName('greeter', new Greeter());

    const target: any = { greeter: undefined };
    container.addInjectProperty(target, 'greeter');
    expect(target.greeter).toBeDefined();
    expect(target.greeter.sayHello).toBeDefined();
  });

  it('Should be able to add an inject property before service is registered', () => {
    const target: any = { greeter: undefined };
    container.addInjectProperty(target, 'greeter');
    expect(target.greeter).toBeUndefined();

    // register object
    container.registerByName('greeter', new Greeter());

    expect(target.greeter).toBeDefined();
    expect(target.greeter.sayHello).toBeDefined();
  });

});
