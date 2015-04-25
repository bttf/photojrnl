var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Profile = mongoose.model('Profile');

module.exports = function (app) {
  app.use('/profiles', router);
};

router.get('/', function (req, res, next) {
  Profile.find(function (err, profiles) {
    if (err) {
      return res.send(err);
    }
    res.json({
      profiles: profiles 
    });
  });
});

router.get('/:id', function(req, res, next) {
  Profile.findById(req.params.id, function(err, profile) {
    if (err) {
      return res.send(err);
    }
    res.json({
      profile: profiles 
    });
  });
});

router.post('/', function(req, res, next) {
  var profile = new Profile();
  for (var key in req.body.profile) {
    profile[key] = req.body.profile[key];
  }

  profile.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.json({
      profile: profile
    });
  });
});

router.put('/:id', function(req, res, next) {
  Profile.findById(req.params.id, function(err, profile) {
    if (err) {
      return res.send(err);
    }
    var p = req.body.profile;
    console.log('shitbrains', p);
    for (var key in p) {
      profile[key] = p[key];
    }
    profile.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.json({
        profile: profile
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Profile.remove({
    _id: req.params.id
  }, function(err, profile) {
    if (err) {
      return res.send(err);
    }
    res.json({});
  });
});

