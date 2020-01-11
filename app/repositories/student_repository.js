'use strict';

const Student = require('../domains/student');

const studentRepository = function(db) {
    this.db = db;
}

studentRepository.prototype = {
    save: function(s, cb, errCb) {
        const db = this.db;
        const data = {code: s.code, name: s.name, departement: s.departement, age: s.age};
        const query = 'INSERT INTO student SET ?';
        db.query(query, data, (err, result) => {
            if(err) {
                errCb(err)
            }
            cb(result);
        });
    },

    update: function(s, cb, errCb) {
        const db = this.db;
        const data = [s.name, s.departement, s.age, s.code];
        const query = 'UPDATE student SET name = ?, departement = ?, age = ? WHERE code = ?';
        db.query(query, data, (err, result) => {
            if(err) {
                errCb(err);
            }
            cb(result);
        });
    },

    delete: function(code, cb, errCb) {
        const db = this.db;
        const query = 'DELETE FROM student WHERE code = ?';
        db.query(query, [code], (err, result) => {
            if(err) {
                errCb(err);
            }
            cb(result);
        });
    },

    findOne: function(code, cb, errCb) {
        const db = this.db;
        const query = 'SELECT * FROM student WHERE code = ?';
        db.query(query, [code], (err, results, fields) => {
            if(err) {
                errCb(err);
            }
            const result = results[0];
            if(!result) {
                cb(`data dengan code = ${code} tidak ditemukan`);
            }
            const student = new Student(result.code, result.name, result.departement, result.age);
            cb(student);
        });
    },

    findAll: function(cb, errCb) {
        const db = this.db;
        const query = 'SELECT * FROM student';
        db.query(query, (err, results, fields) => {
            if(err) {
                errCb(err);
            }
            const getAll = [];
            // for(let i in results)
            for(let i=0 ; i<results.length ; i++) {
                const get = results[i];
                const student = new Student(get.code, get.name, get.departement, get.age);
                getAll.push(student);
            };
            cb(getAll);
        });
    }
};

module.exports = studentRepository;