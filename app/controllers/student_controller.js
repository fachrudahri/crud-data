'use strict';

const db = require('../config/mysql_config');
const studentRepository = require('../repositories/student_repository');
const Student = require('../domains/student');


const homeStudent = (req, res, next) => {
    res.render('index', {'title': 'Solusi Titipan Anda | Solvee SAJA BRO'});
};

const saveStudentForm = (req, res, next) => {
    res.render('register', {'title': 'Register Data Student'});
};
const saveStudent = (req, res, next) => {
    if(!req.body) {
        next('semua field harus di isi');
    }
    const data = req.body;
    const student = new Student(data.code, data.name.toUpperCase(), data.departement, data.age);
    const studentRepo = new studentRepository(db);
    studentRepo.save(student, result => {
        res.redirect('/');
    }, err => {
        if(err) {
            next(err);
        }
    });
};

const updateStudentForm = (req, res, next) => {
    if(!req.params) {
        next('parameter tidak ada');
    }
    const code = req.params.code;
    const studentRepo = new studentRepository(db);
    studentRepo.findOne(code, result => {
        res.render('update', {'student': result,'title': 'Update Data Student'});
    }, err => {
        if(err) {
            next(err);
        }
    });
};

const updateStudent = (req, res, next) => {
    if(!req.body) {
        next('semua field harus di isi');
    }
    const data = req.body;
    const student = new Student(data.code, data.name.toUpperCase(), data.departement, data.age);
    const studentRepo = new studentRepository(db);
    studentRepo.update(student, result => {
        res.redirect('/');
    }, err => {
        if(err) {
            next(err);
        }
    });
};

const deleteStudent = (req, res, next) => {
    if(!req.params) {
        next('parameter tidak ada');
    }
    const code = req.params.code;
    const studentRepo = new studentRepository(db);
    studentRepo.delete(code, result => {
        res.redirect('/');
    }, err => {
        if(err) {
            next(err);
        }
    });
};

const findStudent = (req, res, next) => {
    if(!req.params) {
        next('parameter tidak ada');
    }
    const code = req. params.code;
    const studentRepo = new studentRepository(db);
    studentRepo.findOne(code, result => {
        res.render('detail', {'student': result,'title': `Detail Student ${code}`});
    }, err => {
        if(err) {
            next(err);
        };
    });
};

const findAllStudent = (req, res, next) => {
    const studentRepo = new studentRepository(db);
    studentRepo.findAll(result => {
        res.render('databases', {'students': result, 'title': 'Data Student Muding'});
    }, err => {
        if(err) {
            next(err);
        }
    });
};

module.exports =  {
    homeStudent: homeStudent,
    saveStudentForm: saveStudentForm,
    saveStudent: saveStudent,
    updateStudentForm: updateStudentForm,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent,
    findStudent: findStudent,
    findAllStudent: findAllStudent
}
