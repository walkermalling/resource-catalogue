/* jslint node: true*/
'use strict';

var server = require('../../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

describe('crud api for resource items', function(){

  var testBody;

  // gets all entries in collection

  it('gets all entries', function(done){
    chai.request('http://localhost:3000')
      .get('/api/v_0_0_1/entries')
      .res(function(res){
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.be.true;
        if( res.body.length ){
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]).to.have.property("entryName");
        }
        done();
      });
  });

  it('creates a new item', function(done){  // post
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
        testBody = res.body;
        done();
      });
  });

  it('looks up an item by id', function(done){
    chai.request('http://localhost:3000')
      .get('/api/v_0_0_1/entries/' + testBody._id)
      .res(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.entryName).to.eql(testBody.entryName);
        expect(res.body.entryType).to.eql(testBody.entryType);
        expect(res.body.entryDesc).to.eql(testBody.entryDesc);
        expect(res.body.entryLink).to.eql(testBody.entryLink);
        done();
      });
  });

  it('updates an item by id', function(done){
    chai.request('http://localhost:3000')
      .put('/api/v_0_0_1/entries/' + testBody._id)
      .req(function(req){
        req.send({
          "entryName" : "some OTHER info",
          "entryDesc" : "a link to somewhere ELSE about this OTHER thing",
          "entryLink" : "http://some.other.link.com"
        });
      })
      .res(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.entryName).to.eql('some OTHER info');
        expect(res.body.entryType).to.eql(testBody.entryType);
        expect(res.body.entryDesc).to.eql('a link to somewhere ELSE about this OTHER thing');
        expect(res.body.entryLink).to.eql('http://some.other.link.com');
        done();
      });
  });

    it('deletes a note', function(done){
    chai.request('http://localhost:3000')
      .del( '/api/v_0_0_1/entries/' + testBody._id )
      .res( function(res){
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('deleted');
        done();
      });
  });


});
