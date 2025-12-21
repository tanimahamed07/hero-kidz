const uri = process.env.MONGODB_URI;
const dname = process.env.Db_NAME;
const collections = {
PRODUCTS:'products',
}
const { MongoClient, ServerApiVersion } = require('mongodb');
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbConnect=(cname)=> {
    return client.db(dname).collection(cname);
}