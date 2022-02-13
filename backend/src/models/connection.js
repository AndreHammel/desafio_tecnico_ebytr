const { MongoClient } = require('mongodb');

const MONGO_DB_URL = `mongodb://${process.env.HOSTNAME}`;

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(process.env.DATABASE))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
