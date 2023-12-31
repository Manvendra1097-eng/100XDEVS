// union - may be string or number
// now you allowd score to store string or number
let score: string | number = 33;

// with custom type

type User = {
  name: string;
  id: number;
};

type Admin = {
  username: string;
  id: number;
};
// it is allowed
let manvendra: User | Admin = { name: 'Manvendra', id: 334 };
manvendra = { username: 'Manvendra', id: 334 };

// with function
function getDbId(id: number | string) {
  // make api call
  console.log(`DB id is: ${id}`);
}

getDbId(3);
getDbId('4');

function getDbId2(id: number | string) {
  // make api call
  // id.toUpperCase() -> giving error as it is work as new type string and number so below code
  // need to verify that id is string
  if (typeof id === 'string') {
    id.toUpperCase();
  }

  console.log(`DB id is: ${id}`);
}

// with array
// const data:number[]=[1,2,3,'4'] giving error for '4
// it still mix is not allowed
// const data: number[] | string[] = [1, 2, 3, '4'];
const data: number[] | string[] = [1, 2, 3, 4];
// like below you can do mix value
const data1: (number | string)[] = [1, 2, '3', '4'];

// strick type
let pi: 3.14 = 3.14;

let seatAllowd: 'alise' | 'window' | 'middle';
