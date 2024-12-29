import { MongoClient } from "mongodb";
import { data } from "./sample-data.js";
import { config } from "dotenv";
config();

async function pushDataToMongo() {
  const uri = process.env.DATABASE_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("eWallet");
    const users = database.collection("users");
    const transactions = database.collection("transactions");
    const balances = database.collection("balances");

    await users.insertMany(data.users);
    await transactions.insertMany(data.transactions);
    await balances.insertMany(data.balances);

    console.log("Data inserted successfully!");
  }
  catch (error) {
    console.error("Error: ", error);
  }
  finally {
    await client.close();
  }
}

pushDataToMongo();