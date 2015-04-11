var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tapas-barua-photography'
    },
    port: 3000,
    db: 'mongodb://localhost/tapas-barua-photography-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tapas-barua-photography'
    },
    port: 3000,
    db: 'mongodb://localhost/tapas-barua-photography-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tapas-barua-photography'
    },
    port: 3000,
    db: 'mongodb://localhost/tapas-barua-photography-production'
  }
};

module.exports = config[env];
