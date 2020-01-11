'use strict';

const Student = function(code, name, departement, age) {
    this.code = code;
    this.name = name;
    this.departement = departement;
    this.age = age;
};

module.exports = Student;