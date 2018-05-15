// Here I can also cast stuff to their proper datatype, after dotenv has made them all strings...

const config = {
  development: {
    app: {
      url: process.env.APP_URL || 'node.app',
    },
    database: {
      url: process.env.DATABASE_URL || 'mongodb://localhost/investor_center',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'jwt-secret',
    },
    session: {
      secret: process.env.SESSION_SECRET || 'session-secret', // should be the same as the secret used by cookie parser
    },
    server: {
      port: process.env.PORT || '3000',
    },
    socketio: {
      debug: process.env.DEBUG || null,
    },
  },
  production: {
    app: {
      url: process.env.APP_URL || 'node.app',
    },
    database: {
      url: process.env.DATABASE_URL || 'mongodb://localhost/investor_center',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'jwt-secret',
    },
    session: {
      secret: process.env.SESSION_SECRET || 'session-secret', // should be the same as the secret used by cookie parser
    },
    server: {
      port: process.env.PORT || '3000',
    },
    socketio: {
      debug: process.env.DEBUG || null,
    },
  },
  test: {
    app: {
      url: process.env.APP_URL || 'node.app',
    },
    database: {
      url: process.env.DATABASE_URL || 'mongodb://localhost/investor_center',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'jwt-secret',
    },
    session: {
      secret: process.env.SESSION_SECRET || 'session-secret', // should be the same as the secret used by cookie parser
    },
    server: {
      port: process.env.PORT || '7357',
    },
    socketio: {
      debug: process.env.DEBUG || null,
    },
  },
};

config.get = function get() {
  if (process.env.NODE_ENV === 'test') {
    return this.test;
  } else if (process.env.NODE_ENV === 'production') {
    return this.production;
  }
  return this.development;
};

module.exports = config;
