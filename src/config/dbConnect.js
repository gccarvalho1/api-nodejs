import mongoose from "mongoose";

async function conectaNaDb() {

  mongoose.connect(process.env.DB_CONNECTION_STRING);


  return mongoose.connection;
}

export default conectaNaDb;
