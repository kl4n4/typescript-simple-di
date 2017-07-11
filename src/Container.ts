export class Container {
  private injectProperties: { [key: string]: Array<{ target: any, key: string}> } = {};

  public constructor(private providers: any[] = [], private services: { [name: string]: any } = {}) {}

  register(...serviceClasses: any[]): void {
    this.providers.push(...serviceClasses);
    serviceClasses.forEach((serviceClass) => {
      let service = serviceClass;
      if (service instanceof Function) {
        service = new serviceClass();
      }
      this.add(service);
    });
  }

  registerByName(name: string, serviceClass: any): void {
    let service = serviceClass;
    if (service instanceof Function) {
      service = new serviceClass();
    }
    this.addByName(name, service);
  }

  get(name: string): any {
    return this.services[name];
  }

  getByType<T>(c: new () => T): T {
    return this.get(c.name.toLowerCase());
  }

  getAll(): { [name: string]: any } {
    return Object.assign({}, this.services);
  }

  addInjectProperty(target: any, key: string): void {
    if (target) {
      this.getInjectProperty(key.toLowerCase()).push({ target, key });
      this.inject(target, key, this.services[key.toLowerCase()]);
    }
  }

  private add(service: any): any {
    return this.addByName(service.constructor.name, service);
  }

  private addByName(name: string, service: any): any {
    this.services[name] = service;
    this.services[name.toLowerCase()] = service;
    this.injectIntoProperties(service, name);
    return this.get(name);
  }

  private inject(target: any, propertyKey: string, service: any) {
    if (target && service) {
      target[propertyKey] = service;
    }
  }

  private injectIntoProperties(service: any, name: string = service.constructor.name) {
    this.getInjectProperty(name.toLowerCase()).forEach((property) => {
      this.inject(property.target, property.key, service);
    });
  }

  private getInjectProperty(key: string) {
    if (!this.injectProperties[key]) {
      this.injectProperties[key] = [];
    }
    return this.injectProperties[key];
  }
}

export default Container;
