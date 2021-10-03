var assert = require('assert');
var app = require('../server');
var http = require('http');


describe('Server test', ()=>{
  before(()=>{console.log('before test')})
  after(()=>{console.log('after test')})

  describe('get/read', ()=>{
    it('should return all products', ()=>{
      http.get('http://localhost:3000/read', function(response){
        assert.equal(response.statusCode, 200);

        var body = "";
        response.on('data', function(d){body += d});
        response.on('end', function(){
          assert.equal(body, "Hello Mocha");
        })
      })
    })
  })

})