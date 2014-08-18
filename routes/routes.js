var Entry = require('../models/entry');

module.exports = function(app) {

  var baseUrl = '/api/v_0_0_1';

  function handle(res, err, data){
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  }

  // Index
  app.get(baseUrl, function(req,res){
    res.json({"msg": "Welcome to the FSJE Resource Catalogue."});
  });

  /**
   * CRUD API FOR ENTRIES
   */

  // Create, Read, Update, Destroy

  // get all
  app.get(baseUrl + '/entries', function(req,res){
    Entry.find( {}, function(err, entries){
      handle(res,err,entries);
    });
  });

  // get one (read)
  app.get(baseUrl + '/entries/:id', function(req,res){
    Entry.findOne( {'_id' : req.params.id}, function(err, entry){
      handle(res,err,entry);
    });
  });

  // post (create)
  app.post(baseUrl + '/entries', function(req,res){
    var entry = new Entry(req.body);
    entry.save(function(err,entry){
      handle(res,err,entry);
    });
  });

  // put (update)
  app.put(baseUrl + '/entries/:id', function(req,res){
    var entry = req.body;
    delete entry._id;
    Entry.findOneAndUpdate({"_id":req.params.id}, entry, function(err, entry){
      handle(res,err,entry);
    });
  });

  // delete (destroy)
  app.delete(baseUrl + '/entries/:id', function(req,res){
    Entry.remove({"_id":req.params.id}, function(err, entry){
      handle(res,err,{"msg":"deleted"});
    });
  });
  // ___ end
};
