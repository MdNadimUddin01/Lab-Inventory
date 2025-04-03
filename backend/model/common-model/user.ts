export enum Role {
  admin = "Admin",
  student = "Student",
}

export class User {
  name: string;
  email: string;
  password: string;
  role: Role;
  phoneNnumber: number;
  creationDate: Date;
  updatedDate: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    role: Role = Role.student,
    phoneNumber: number,
    creationDate: Date,
    updatedDate: Date
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.creationDate = creationDate;
    this.updatedDate = updatedDate;
    this.phoneNnumber = phoneNumber;
  }

  static getDefaultUser() {
    return new User(
      "",
      "",
      "",
      Role.student,
      0,
      new Date(Date.now()),
      new Date(Date.now())
    );
  }

  static JsonToClass(userObject) {
    let user: User = null;

    if (userObject) {
        user.name = userObject.name;
        user.email = userObject.email;
        user.password = userObject.password;
        user.role = userObject.role;
        user.creationDate = userObject.creationDate;
        user.updatedDate = userObject.updatedDate;
        user.phoneNnumber = userObject.phoneNumber;
    }

    return user 
  }
}
