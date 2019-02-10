module.exports = {
  db: {
    operatorsAliases: false,
    dialect: 'postgres',
    name: 'bdname',
    host: process.env.POSTGRES_HOST || 'localhost/bdhost',
    username: process.env.POSTGRES_USER || 'bdusername',
    password: process.env.POSTGRES_PASSWORD || 'bdpassword',
    database: process.env.POSTGRES_DATABASE || 'bdschema',
    port: process.env.POSTGRES_PORT || 5432,
    pool: {
      min: process.env.POSTGRES_MIN_POOL || 0,
      max: process.env.POSTGRES_MAX_POOL || 50,
      idle: 10000,
    },
    logging: true,
    timezone: 'America/Sao_Paulo',
  },
  externals: {
    randomUser: 'https://randomuser.me/',
  },
  log: 'info',
  secret: 'someSecretOrKey',
};
