const { connect, model, connection } = require("mongoose");
const PathMapSchema = require("./PathMapSchema.js");
console.log(`mongodb://${"localhost" && process.env.MONGOADDR}/bike_tea`);
connect(
  `mongodb://${"localhost" && process.env.MONGOADDR}/bike_tea`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

let db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongo/bike_tea");
});

let PathMap = model("PathMap", PathMapSchema);

module.exports = PathMap;
