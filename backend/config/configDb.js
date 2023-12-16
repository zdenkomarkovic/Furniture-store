require('dotenv').config();
const whiteList = ['http://localhost:63342', 'http://localhost:5501'];
// const username = 'zdenkostaff';
// const password = 'iCv0kKLRqzd9IbvS';

// const dbUrl = `mongodb+srv://${username}:${password}@furniture-store.bafeqkg.mongodb.net/?retryWrites=true&w=majority`;
// module.exports = dbUrl;

module.exports = {
  JWT_KEY: process.env.JWT_KEY,
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  CORS_OPTIONS: {
    origin: (origin, cb) => {
      if (whiteList.includes(origin)) {
        // cb(null, true)
      } else {
        // cb(new Error("Not allowed by CORS"))
      }
      cb(null, true);
    },
  },
};
