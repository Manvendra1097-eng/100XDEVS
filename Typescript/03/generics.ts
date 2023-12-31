// class User {
//   constructor(public name: string, public age: number) {}
// }

// const user = new User('man',12)

// console.log(user.name)

const score: Array<number> = [];

function identity<T>(arg: T): T {
  return arg;
}

function getProduct<T>(products: T[]): T {
  return products[3];
}

// convert to arrow fn

const getProductArr = <T>(products: T[]): T => {
  return products[3];
};

// using Type Parameters in Generic Constraints

interface DB {
  connection: string;
  username: string;
  password: string;
}

function anFn<T, U extends DB>(va1: T, va2: U): object {
  return {
    va1,
    va2,
  };
}

// anFn(3, '4'); exxtends Number cause issue
anFn(3, { connection: 'string', username: 'string', password: 'string' });

// example
interface Quiz {
  name: string;
  type: string;
}
interface Course {
  name: string;
  author: string;
  subject: string;
}

class Sellable<T> {
  public cart: T[] = [];
  addToCart(product: T) {
    this.cart.push(product);
  }
}
