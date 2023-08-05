const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nathanschrader:fCru4S6fDd8R6NkR@cluster0.shqgo6y.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDV Connection read!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
