var app         = require('../../app.js');
var request     = require('supertest');
var agent       = request.agent(app);
var chai        = require('chai'),
    should      = chai.should();

var mysql       = require('mysql');

var email      = 'testrecord@gmail.com';
var newAdmin   = '';

before(function(done) {
    newAdmin = {
        "email_address": "testrecord@gmail.com",
        "password": "test12345",
        "first_name": "Amanda",
        "last_name": "Peterson"
    }

    done()
});

describe('',function() {
    describe('', function() {
        it('Create', function(done) {
            agent
            .post('/users')
            .send(newAdmin)
            .expect(200)
            .end(function(err, response) {
                if(err) {
                    done(err);
                } else {
                    done();                     
                }
            });
        });
    });
});

describe('',function() {
    describe('', function() {
        it('Search', function(done) {
            agent
                .get('/users/'+email)
                .expect(200)
                .end(function(viewError, response){
                    if(viewError) {
                        done(viewError)
                    } else {
                        response.body[0].should.have.property('email_address');
                        response.body[0].should.have.property('last_name');
                        response.body[0].should.have.property('first_name');
                        response.body[0].should.have.property('password');
                        done();
                    }
                })
        });
    });
})

describe('',function() {
    describe('', function() {
        it('Delete', function(done) {
            agent
                .delete('/users/'+email+'/delete')
                .expect(200)
                .end(function(err, response) {
                    if(err) {
                        done(err);
                    } else {
                        done();                     
                    }
            });
        });
    });
})