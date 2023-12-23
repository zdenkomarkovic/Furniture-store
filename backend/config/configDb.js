require("dotenv").config();
const allowedOrigins = [
  "http://localhost:5173",
  "https://furniture-store-r4p8.vercel.app",
];

module.exports = {
  JWT_KEY: process.env.JWT_KEY,
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  CORS_OPTIONS: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
};
