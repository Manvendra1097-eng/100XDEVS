interface User {
  readonly _id: number;
  email: string;
  userId: number;
  googleId?: string;
  startTrail: () => string;
  startTrail1(): number;
  getCoupon(couponname: string, value: number): number;
}

// const user1: User = {
//   _id: 9753516,
//   email: 'm@h.com',
//   userId: 123,
//   startTrail: () => {
//     return 'trail started';
//   },
//   startTrail1() {
//     return 5;
//   },
//   getCoupon: (name: 'maven01') => {
//     return 10;
//   },
// };

// interface and type
interface User {
  githubToken: string;
}

const user1: User = {
  _id: 9753516,
  email: 'm@h.com',
  userId: 123,
  githubToken: '3455555',
  startTrail: () => {
    return 'trail started';
  },
  startTrail1() {
    return 5;
  },
  getCoupon: (name: 'maven01') => {
    return 10;
  },
};

// inheritance

interface Admin extends User {
  role: 'admin' | 'ta' | 'sadmin';
}

const admin: Admin = {
  _id: 9753516,
  email: 'm@h.com',
  userId: 123,
  githubToken: '3455555',
  role: 'admin',
  startTrail: () => {
    return 'trail started';
  },
  startTrail1() {
    return 5;
  },
  getCoupon: (name: 'maven01') => {
    return 10;
  },
};
