module.exports = {
  db: {
    operatorsAliases: false,
    dialect: 'postgres',
    name: 'hmlbdname',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    pool: {
      min: process.env.POSTGRES_MIN_POOL || 0,
      max: process.env.POSTGRES_MAX_POOL || 50,
      idle: 10000,
    },
    logging: false,
    timezone: 'America/Sao_Paulo',
  },
  externals: {
    randomUser: 'https://randomuser.me/',
  },
  log: 'info',
  secret: 'someSecretOrKey',
};
