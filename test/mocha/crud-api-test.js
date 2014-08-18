/* jslint node: true*/
'use strict';

var server = require('../../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

describe('crud api for resource items', function(){

  it('creates a new item', function(done){
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/entries')
      .req(function(req){
        req.send({
          "entryName" : "some info",
          "entryType" : "hyperlink",
          "entryDesc" : "a link to somewhere about this thing",
          "entryLink" : "http://some.link.com"
        });
      })
      .res(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.entryName).to.eql('some info');
        expect(res.body.entryType).to.eql('hyperlink');
        expect(res.body.entryDesc).to.eql('a link to somewhere about this thing');
        expect(res.body.entryLink).to.eql('http://some.link.com');
        done();
      });
  });


});
