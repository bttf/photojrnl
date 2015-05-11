var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Photo = mongoose.model('Photo'),
  Profile = mongoose.model('Profile');

module.exports = function (app) {
  app.use('/', router);
  app.use('/work', router);
  app.use('/about', router);
  app.use('/contact', router);
};

router.get('/', function (req, res, next) {
  Profile.findOne(function(err, profile) {
    if (err) { return next(err); }
    if (!profile) { return next('No profile found.'); }
    res.render('index', {
      fullName: profile.firstName + ' ' + profile.lastName,
      subtitle: profile.subtitle
    });
  });
});

router.get('/work', function (req, res, next) {
  Photo.find(function(err, photos) {
    res.render('work', { photos: photos });
  });
});

router.get('/about', function (req, res, next) {
  Profile.findOne(function(err, profile) {
    res.render('about', {
      location: profile.location,
      aboutDesc: profile.aboutDesc,
      favQuote: profile.favoriteQuote,
      favQuoteAuthor: profile.favQuoteAuthor
    });
  });
});

router.get('/contact', function (req, res, next) {
  Profile.findOne(function(err, profile) {
    res.render('contact', {
      contactDesc: profile.contactDesc,
      phone: profile.phone,
      email: profile.email,
      twitter: profile.twitter,
      facebook: profile.facebook,
      instagram: profile.instagram
    });
  });
});
