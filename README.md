# Simple DI
A lean and simple Dependency Injection library for TypeScript

## Install

```
npm install --save typescript-simple-di
```

## Usage

First you need to register all classes/objects you want make available in your DI container
```typescript
import { SimpleCI } from 'typescript-simple-di';

// register either classes or objects - name will automatically generated from the class name (e.g. the class UserService will become available as userservice)
SimpleCI.register(
  UserService,
  new Kong(process.env.KONG_API || 'http://kong.platform.local:8001'),
);

// or register with a custom name
SimpleCI.registerByName('my-user-service', new UserService());
```

To retreive the objects from your IoC container again you can either access them via the `SimpleCI` interface
```typescript
// get an object by its name (will return type 'any')
const us = SimpleCI.get('userservice');
// or if you want it typed correctly
const usTyped = SimpleCI.get<UserService>('userservice');

// get an object by its type
const kong = SimpleCI.getByType(Kong);
```

Another way would be to use injection - therefore you need the `Inject` decorator
```typescript
import { Inject } from 'typescript-simple-di';
```

You can annotate your property like that:
```typescript
class MyClass {
  @Inject
  private kong: Kong;
}
```
**Note: this works for classes only!** The `Inject` decorator will use the property name and inject the object with this name. So in this case it will essentially assign/inject the result of `SimpleCI.get('userservice')` to this class property.
