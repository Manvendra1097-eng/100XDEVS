// const user: Array<string | number> = ['hc', 1];
// tuples- strick order
const user: [string, number, boolean] = ['hc', 1, true];

type User = [number, string];

const newUser: User = [112, 'cf@sd.com'];
newUser[1] = 'mnb.com';

newUser.push('true');
