let chai = require('chai');
let app = require('../server')
let assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
let should = chai.should()
let chaiHttp = require('chai-http')
chai.use(chaiHttp)


describe('Server test', ()=>{
  before(()=>{console.log('before test')})
  after(()=>{console.log('after test')})

  describe('get/getUsers', ()=>{
    it("it should Get all the users", (done)=>{
      chai.request(app).get('/getUsers').end((err, res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array')
        done();
      })
    })
  })


  describe('get/getGroups', ()=>{
    it("it should Get all the Groups", (done)=>{
      chai.request(app).get('/getGroups').end((err, res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array')
        done();
      })
    })
  })


  describe('post/addUser', ()=>{
    it("it should add a User", (done)=>{
      chai.request(app).post('/addUser').type('form')
      .send({name: "tester", email : "Test@email.com", password: "test", role: "tester"})
      .end((err, res)=>{

        res.should.have.status(200);
        console.log(res.body)
        done();
      })
    })
  })

  describe('post/addUser', ()=>{
    it("it should not add a User", (done)=>{
      chai.request(app).post('/addUser').type('form')
      .send({name: "tester", email : "Test@email.com", password: "test", role: "tester"})
      .end((err, res)=>{

        assert.equal(res.body.err,"duplicate items");
        console.log(res.body)
        done();
      })
    })
  })

  describe('post/createGroup', ()=>{
    it("it should create a Group", (done)=>{
      userid = new ObjectId("615a0c8ccc94c2346318906b")
      chai.request(app).post('/createGroup').type('form')
      .send({name: "testGroup", users:[{name:'tester', id:userid }]})
      .end((err, res)=>{

        res.should.have.status(200);
        console.log(res.body)
        done();
      })
    })
  })

    describe('post/createGroup', ()=>{
    it("it should NOT create a Group", (done)=>{
      userid = new ObjectId("615a0c8ccc94c2346318906b")
      chai.request(app).post('/createGroup').type('form')
      .send({name: "testGroup", users:[{name:'tester', id:userid }]})
      .end((err, res)=>{

        assert.equal(res.body.err,"duplicate items");
        console.log(res.body)
        done();
      })
    })
  })

  describe('post/addUsertoGroup', ()=>{
    it("it should add User to Group", (done)=>{
      userid = new ObjectId("615a0daa0c96f46cf1bfc98d")
      groupid = new ObjectId("615a0f61845ea852da002887")
      chai.request(app).post('/addUsertoGroup').type('form')
      .send({group: "615a0f61845ea852da002887", new: [{name : "tester2" ,id : userid}]})
      .end((err, res)=>{

        res.should.have.status(200);
        console.log(res.body)
        done();
      })
    })
  })
    describe('post/addUsertoGroup', ()=>{
    it("it should NOT add User to Group", (done)=>{
   
      chai.request(app).post('/addUsertoGroup').type('form')
      .send({group: "615a0f61845ea852da333333", new: [{name : "tester2" ,id : "some"}]})
      .end((err, res)=>{

        
        console.log(res.body)
        done();
      })
    })
  })




   describe('post/deleteuserfromGroup', ()=>{
    it("it should delete user from Group because wrong group provided", (done)=>{
      userid = new ObjectId("615a0daa0c96f46cf1bfc98d")
      groupid = new ObjectId("615a0f61845ea852da002887")
      chai.request(app).post('/deleteuserfromGroup').type('form')
      .send({group: {_id : "615a0f61845ea852da002887"}, userSelected: {name : "tester2" ,id : "615a0daa0c96f46cf1bfc98d"}})
      .end((err, res)=>{

        res.should.have.status(200);
        console.log(res.body)
        done();
      })
    })
  })



  describe('post/login', ()=>{
    it("it should login", (done)=>{
      userid = new ObjectId("615a0daa0c96f46cf1bfc98d")
      groupid = new ObjectId("615a0f61845ea852da002887")
      chai.request(app).post('/login').type('form')
      .send({userName:"tester", password: "test" })
      .end((err, res)=>{

        res.should.have.status(200);
        assert.equal(res.body.message, "Success");
        console.log(res.body)
        done();
      })
    })
  })

  describe('post/login', ()=>{
    it("it should NOT login", (done)=>{

      chai.request(app).post('/login').type('form')
      .send({userName:"tester", password: "something" })
      .end((err, res)=>{

        // res.should.have.status(200);
        assert.equal(res.body.message, "Error");
        console.log(res.body)
        done();
      })
    })
  })

  
  describe('post/deleteGroup', ()=>{
    it("it should delete a group", (done)=>{

      chai.request(app).post('/deleteGroup').type('form')
      .send({_id : "615a0f61845ea852da002887" } )
      .end((err, res)=>{

        res.should.have.status(200);
        res.body.should.be.a('array')
        console.log(res.body)
        done();
      })
    })
  })

  describe('post/User', ()=>{
    it("it should delete a User", (done)=>{

      chai.request(app).post('/deleteUser').type('form')
      .send({_id : "615a0daa0c96f46cf1bfc98d" } )
      .end((err, res)=>{

        res.should.have.status(200);
        res.body.should.be.a('array')
        console.log(res.body)
        done();
      })
    })
  })


})