class User {
  email: string;
  name: string;
  private readonly city: string = 'Jaipur';
  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}

const manv = new User('m@m,com', 'manvendra');

// manv.city yell at us as it is private

class User1 {
  private _courseCount: number = 1;
  private readonly city: string = 'Jaipur';
  constructor(public email: string, public name: string) {}

  get getAppleEmail(): string {
    return `apple${this.email}`;
  }

  get courseCount(): number {
    return this._courseCount;
  }

  set courseCount(num: number) {
    this._courseCount = num;
  }
}

// getter and setter

const manv1 = new User1('m@m,com', 'manvendra');
