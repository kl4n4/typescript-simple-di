import { Container } from './Container';

// export function Injectable(constructor: any) {
//   Services.add(new constructor());
// }

export function Inject(target: Object, propertyKey: string) {
  SimpleCI.addInjectProperty(target, propertyKey);
}


export class SimpleCI {
  private static container: Container;

  private static getContainer(): Container {
    if (!SimpleCI.container) {
      SimpleCI.container = new Container();
    }
    return SimpleCI.container;
  }

  static register(...serviceClasses: any[]): void {
    this.getContainer().register(...serviceClasses);
  }

  static registerByName(name: string, serviceClass: any): void {
    this.getContainer().registerByName(name, serviceClass);
  }

  static addInjectProperty(target: any, key: string): void {
    this.getContainer().addInjectProperty(target, key);
  }

  static get(name: string): any {
    return this.getContainer().get(name);
  }

  static getByType<T>(c: new () => T): T {
    return this.getContainer().getByType(c);
  }

  static getAll(): { [name: string]: any } {
    return this.getContainer().getAll();
  }

  private constructor() {}
}

export default SimpleCI;
