module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;
  mongoose.connect(config.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
  });
  database.on("error", (error) =>
    console.log(`Connection to database failed: ${error}`)
  );
  database.on("connected", () => console.log("Connected to database"));
  database.on("disconnected", () => console.log("Disconnected from database"));
  process.on("SIGINT", () => {
    database.close(() => {
      console.log("Connection closed");
      process.exit(0);
    });
  });
};
