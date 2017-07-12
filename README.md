# Simple DI
A lean and simple Dependency Injection library for TypeScript

## Install

```
npm install --save typescript-simple-di
```

## Usage

First you need to register all classes/objects you want make available in your DI container
```typescript
import { SimpleDI } from 'typescript-simple-di';

// register either classes or objects - name will automatically generated from the class name (e.g. the class UserService will become available as userservice)
SimpleDI.register(
  UserService,
  new Kong(process.env.KONG_API || 'http://kong.platform.local:8001'),
);

// or register with a custom name
SimpleDI.registerByName('my-user-service', new UserService());
```

To retreive the objects from your IoC container again you can either access them via the `SimpleDI` interface
```typescript
// get an object by its name (will return type 'any')
const us = SimpleDI.get('userservice');
// or if you want it typed correctly
const usTyped = SimpleDI.get<UserService>('userservice');

// get an object by its type
const kong = SimpleDI.getByType(Kong);
```

Another way would be to use injection - therefore you need the `Inject` decorator
```typescript
import { Inject } from 'typescript-simple-di';
```

You can annotate your property like that:
```typescript
class MyClass {
  @Inject()
  private userService: UserService;

  @Inject('my-user-service')
  private myUs: UserService;
}
```
**Note: this decorator only works for classes!** 
If no name is specified in the `Inject` decorator it will fallback to the property type or if that's not possible the property name and inject the object with this name. So in this case above it will essentially assign/inject the result of `SimpleDI.get('kong')` to this class property.
