
module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  postgres: {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 3000,
    database: process.env.PG_DATABASE || 'myapp',
    user: process.env.PG_USER || 'user',
    password: process.env.PG_PASSWORD || 'password'
  }
};


