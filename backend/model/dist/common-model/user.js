"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
var Role;
(function (Role) {
    Role["admin"] = "Admin";
    Role["student"] = "Student";
})(Role || (exports.Role = Role = {}));
class User {
    constructor(name, email, password, role = Role.student, phoneNumber, creationDate, updatedDate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.creationDate = creationDate;
        this.updatedDate = updatedDate;
        this.phoneNnumber = phoneNumber;
    }
    static getDefaultUser() {
        return new User("", "", "", Role.student, 0, new Date(Date.now()), new Date(Date.now()));
    }
    static JsonToClass(userObject) {
        let user = null;
        if (userObject) {
            user.name = userObject.name;
            user.email = userObject.email;
            user.password = userObject.password;
            user.role = userObject.role;
            user.creationDate = userObject.creationDate;
            user.updatedDate = userObject.updatedDate;
            user.phoneNnumber = userObject.phoneNumber;
        }
        return user;
    }
}
exports.User = User;
