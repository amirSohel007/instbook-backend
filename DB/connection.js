const mongoose = require("mongoose");
const connect = mongoose.connect;

//Connect databse
function connectDB() {
  connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false  },
    () => console.log("DB Connected !")
  );
}

module.exports = connectDB;
