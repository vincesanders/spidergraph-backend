// Update with your config settings.

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations/test'
    },
    seeds: {
      directory: './data/seeds/test'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations/dev'
    },
    seeds: {
      directory: './data/seeds/dev'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/spider.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations/production'
    },
    seeds: {
      directory: './data/seeds/production'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }
};
