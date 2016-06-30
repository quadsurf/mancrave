// Update with your config settings.
//process.env.DATABASE_URL

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://user:pwSenha7@aws-us-east-1-portal.16.dblayer.com:11083/manstore',
    debug: true,
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
  production: {
    client: 'pg',
    connection: 'postgres://user:pwSenha7@aws-us-east-1-portal.16.dblayer.com:11083/manstore',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
